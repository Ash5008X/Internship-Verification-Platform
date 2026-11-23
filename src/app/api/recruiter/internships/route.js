import { NextResponse } from "next/server";

import { connectDB } from "@/config/db";
import { requireRecruiter } from "@/lib/auth/requireRecruiter";
import { getRecruiterCompany } from "@/lib/auth/getRecruiterCompany";

import Internship from "@/models/Internship";
import Application from "@/models/Application";
import RiskAssessment from "@/models/RiskAssessment";
import VerificationRecord from "@/models/VerificationRecord";

const ALLOWED_STATUSES = [
    "draft",
    "pending",
    "active",
    "rejected",
    "expired",
    "withdrawn",
];

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function serializeInternship(internship, applicantCounts, assessmentData) {
    const locationParts = [
        internship.location?.city,
        internship.location?.state,
        internship.location?.country,
    ].filter(Boolean);

    const stipend = internship.stipend || {};

    const applicantCount =
        applicantCounts.get(internship._id.toString()) || 0;

    return {
        _id: internship._id,
        title: internship.title,
        description: internship.description,
        category: internship.category,
        requiredSkills: internship.requiredSkills || [],
        preferredSkills: internship.preferredSkills || [],

        stipend: {
            amount: stipend.amount ?? null,
            currency: stipend.currency || "INR",
            period: stipend.period || "unspecified",
        },

        duration: internship.duration || {},
        workMode: internship.workMode || "unspecified",
        location: internship.location || {},

        locationLabel:
            locationParts.length > 0
                ? locationParts.join(", ")
                : internship.workMode || "Not specified",

        eligibility: internship.eligibility || {},
        applicationMethod: internship.applicationMethod,
        applicationUrl: internship.applicationUrl || null,
        applicationDeadline: internship.applicationDeadline || null,
        status: internship.status,
        applicantCount,

        riskAssessment: assessmentData?.assessment || null,
        verificationChecks: assessmentData?.verificationChecks || [],

        createdAt: internship.createdAt,
        updatedAt: internship.updatedAt,
    };
}

export async function GET(request) {
    try {
        const { user, error } = await requireRecruiter();

        if (error) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.message,
                },
                { status: error.status }
            );
        }

        await connectDB();

        const company = await getRecruiterCompany(user._id);

        if (!company) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No company is associated with this recruiter.",
                },
                { status: 404 }
            );
        }

        const { searchParams } = new URL(request.url);

        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 20);

        const status = searchParams.get("status") || "";
        const search = (searchParams.get("search") || "").trim();

        if (
            !Number.isInteger(page) ||
            page < 1 ||
            !Number.isInteger(limit) ||
            limit < 1 ||
            limit > 100
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid pagination parameters.",
                },
                { status: 400 }
            );
        }

        if (status && !ALLOWED_STATUSES.includes(status)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid internship status filter.",
                },
                { status: 400 }
            );
        }

        const filters = {
            companyId: company._id,
            createdBy: user._id,
        };

        if (status) {
            filters.status = status;
        }

        if (search) {
            const expression = new RegExp(escapeRegex(search), "i");

            filters.$or = [
                { title: expression },
                { description: expression },
                { category: expression },
                { requiredSkills: expression },
                { preferredSkills: expression },
            ];
        }

        const ownershipFilter = {
            companyId: company._id,
            createdBy: user._id,
        };

        const [
            internships,
            total,
            allInternshipIds,
            groupedStats,
        ] = await Promise.all([
            Internship.find(filters)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),

            Internship.countDocuments(filters),

            Internship.find(ownershipFilter)
                .select("_id")
                .lean(),

            Internship.aggregate([
                { $match: ownershipFilter },
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 },
                    },
                },
            ]),
        ]);

        const internshipIds = allInternshipIds.map(
            (internship) => internship._id
        );

        const assessments = internshipIds.length
            ? await RiskAssessment.find({
                  internshipId: { $in: internshipIds },
                  status: { $in: ["completed", "needs_review"] },
              })
                  .sort({ assessedAt: -1 })
                  .lean()
            : [];

        const applicationCounts = await Application.aggregate([
            {
                $match: {
                    internshipId: { $in: internshipIds },
                    status: {
                        $in: [
                            "applied",
                            "interviewing",
                            "offered",
                            "rejected",
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: "$internshipId",
                    count: { $sum: 1 },
                },
            },
        ]);

        const applicantCounts = new Map(
            applicationCounts.map((item) => [
                item._id.toString(),
                item.count,
            ])
        );

        const latestAssessments = new Map();

        for (const assessment of assessments) {
            const internshipKey = assessment.internshipId.toString();

            if (!latestAssessments.has(internshipKey)) {
                latestAssessments.set(internshipKey, assessment);
            }
        }

        const verificationIds = assessments.flatMap((assessment) =>
            (assessment.evidenceRefs || [])
                .filter(
                    (reference) =>
                        reference.sourceType === "verification"
                )
                .map((reference) => reference.sourceId)
        );

        const verificationRecords = verificationIds.length
            ? await VerificationRecord.find({
                  _id: { $in: verificationIds },
              }).lean()
            : [];

        const verificationById = new Map(
            verificationRecords.map((record) => [
                record._id.toString(),
                record,
            ])
        );

        const assessmentDataByInternship = new Map();

        for (const [internshipId, assessment] of latestAssessments) {
            const checks = (assessment.evidenceRefs || [])
                .filter(
                    (reference) =>
                        reference.sourceType === "verification"
                )
                .map((reference) =>
                    verificationById.get(reference.sourceId.toString())
                )
                .filter(Boolean)
                .map((record) => ({
                    id: record._id,
                    checkType: record.checkType,
                    status: record.status,
                    method: record.method,
                    notes: record.notes || "",
                    evidence: record.evidence || null,
                    checkedAt: record.checkedAt,
                }));

            assessmentDataByInternship.set(internshipId, {
                assessment: {
                    id: assessment._id,
                    score: assessment.score,
                    severity: assessment.severity,
                    decision: assessment.decision,
                    status: assessment.status,
                    reasons: assessment.reasons || [],
                    triggeredRules: assessment.triggeredRules || [],
                    ruleSetVersion: assessment.ruleSetVersion,
                    confidence: assessment.confidence ?? null,
                    assessedAt: assessment.assessedAt,
                },
                verificationChecks: checks,
            });
        }

        const stats = {
            total: 0,
            draft: 0,
            pending: 0,
            active: 0,
            rejected: 0,
            expired: 0,
            withdrawn: 0,
            applicants: 0,
        };

        for (const item of groupedStats) {
            stats[item._id] = item.count;
            stats.total += item.count;
        }

        for (const item of applicationCounts) {
            stats.applicants += item.count;
        }

        const data = internships.map((internship) =>
            serializeInternship(
                internship,
                applicantCounts,
                assessmentDataByInternship.get(
                    internship._id.toString()
                )
            )
        );

        return NextResponse.json({
            success: true,
            data,
            stats,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPreviousPage: page > 1,
            },
        });
    } catch (error) {
        console.error("GET recruiter internships error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to fetch recruiter internships.",
            },
            { status: 500 }
        );
    }
}