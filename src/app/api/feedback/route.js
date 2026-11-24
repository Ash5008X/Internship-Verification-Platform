import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/config/db";
import { getCurrentUser } from "@/lib/auth/session";

import StudentExperience from "@/models/StudentExperience";
import Application from "@/models/Application";
import Internship from "@/models/Internship";
import Company from "@/models/Company";

const VALID_STATUSES = [
    "applied",
    "interviewed",
    "offered",
    "interned",
    "completed",
    "rejected",
    "withdrawn",
];

async function getStudent() {
    const user = await getCurrentUser();

    if (!user) {
        return {
            user: null,
            response: NextResponse.json(
                { success: false, message: "Please log in first." },
                { status: 401 }
            ),
        };
    }

    if (user.role !== "student") {
        return {
            user: null,
            response: NextResponse.json(
                { success: false, message: "Student account required." },
                { status: 403 }
            ),
        };
    }

    return { user, response: null };
}

function mapApplicationStatus(status) {
    if (status === "interviewing") return "interviewed";
    return VALID_STATUSES.includes(status) ? status : null;
}

function serializeFeedback(item) {
    const internship = item.internshipId;
    const company = item.companyId;

    return {
        _id: item._id.toString(),
        internship: internship
            ? {
                  _id: internship._id.toString(),
                  title: internship.title || "Internship",
              }
            : null,
        company: company
            ? {
                  _id: company._id.toString(),
                  name: company.name || "Company",
              }
            : null,
        employmentStatus: item.employmentStatus,
        experience: item.experience || item.feedback || "",
        improvements: item.improvements || "",
        rating: item.rating ?? null,
        moderationStatus: item.moderationStatus || "pending",
        recruiterReply: item.recruiterReply || "",
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    };
}

// GET /api/feedback
export async function GET() {
    try {
        const { user, response } = await getStudent();
        if (response) return response;

        await connectDB();

        const [feedbackItems, applications] = await Promise.all([
            StudentExperience.find({ studentId: user._id })
                .populate({
                    path: "internshipId",
                    model: Internship,
                    select: "title",
                })
                .populate({
                    path: "companyId",
                    model: Company,
                    select: "name",
                })
                .sort({ createdAt: -1 })
                .lean(),

            Application.find({
                userId: user._id,
                status: {
                    $in: [
                        "applied",
                        "interviewing",
                        "offered",
                        "rejected",
                        "withdrawn",
                    ],
                },
            })
                .populate({
                    path: "internshipId",
                    model: Internship,
                    select: "title companyId",
                    populate: {
                        path: "companyId",
                        model: Company,
                        select: "name",
                    },
                })
                .sort({ updatedAt: -1 })
                .lean(),
        ]);

        const submittedInternshipIds = new Set(
            feedbackItems
                .filter((item) => item.internshipId?._id)
                .map((item) => String(item.internshipId._id))
        );

        const eligibleApplications = applications
            .filter((application) => {
                const internship = application.internshipId;

                return (
                    internship?._id &&
                    internship.companyId?._id &&
                    mapApplicationStatus(application.status) &&
                    !submittedInternshipIds.has(String(internship._id))
                );
            })
            .map((application) => ({
                applicationId: application._id.toString(),
                internshipId: application.internshipId._id.toString(),
                internshipTitle:
                    application.internshipId.title || "Internship",
                companyId:
                    application.internshipId.companyId._id.toString(),
                companyName:
                    application.internshipId.companyId.name || "Company",
                employmentStatus: mapApplicationStatus(application.status),
            }));

        return NextResponse.json({
            success: true,
            data: feedbackItems.map(serializeFeedback),
            eligibleApplications,
        });
    } catch (error) {
        console.error("Fetch student feedback error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to fetch your feedback.",
            },
            { status: 500 }
        );
    }
}

// POST /api/feedback
// Employment status and company are derived from the student's application.
export async function POST(request) {
    try {
        const { user, response } = await getStudent();
        if (response) return response;

        let body;

        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, message: "Invalid request body." },
                { status: 400 }
            );
        }

        const {
            applicationId,
            experience,
            improvements,
            rating,
        } = body || {};

        if (!mongoose.isValidObjectId(applicationId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Select a valid internship application.",
                },
                { status: 400 }
            );
        }

        if (
            typeof experience !== "string" ||
            experience.trim().length < 20 ||
            experience.trim().length > 5000
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Experience must contain between 20 and 5000 characters.",
                },
                { status: 400 }
            );
        }

        if (
            typeof improvements !== "string" ||
            improvements.trim().length > 2000
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Field of improvements cannot exceed 2000 characters.",
                },
                { status: 400 }
            );
        }

        const numericRating = Number(rating);

        if (
            !Number.isInteger(numericRating) ||
            numericRating < 1 ||
            numericRating > 5
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please select a rating from 1 to 5.",
                },
                { status: 400 }
            );
        }

        await connectDB();

        const application = await Application.findOne({
            _id: applicationId,
            userId: user._id,
        })
            .populate({
                path: "internshipId",
                select: "title companyId",
                populate: {
                    path: "companyId",
                    select: "_id name",
                },
            })
            .lean();

        if (
            !application ||
            !application.internshipId ||
            !application.internshipId.companyId
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "The selected application could not be found.",
                },
                { status: 404 }
            );
        }

        const employmentStatus = mapApplicationStatus(application.status);

        if (!employmentStatus) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Feedback is not available for this application status.",
                },
                { status: 400 }
            );
        }

        const internshipId = application.internshipId._id;

        const existingFeedback = await StudentExperience.findOne({
            studentId: user._id,
            internshipId,
        }).select("_id");

        if (existingFeedback) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "You have already submitted feedback for this internship.",
                },
                { status: 409 }
            );
        }

        const feedback = await StudentExperience.create({
            studentId: user._id,
            internshipId,
            companyId: application.internshipId.companyId._id,
            employmentStatus,
            experience: experience.trim(),
            improvements: improvements.trim(),
            rating: numericRating,
            moderationStatus: "approved",
        });

        const populated = await StudentExperience.findById(feedback._id)
            .populate({
                path: "internshipId",
                model: Internship,
                select: "title",
            })
            .populate({
                path: "companyId",
                model: Company,
                select: "name",
            })
            .lean();

        return NextResponse.json(
            {
                success: true,
                message: "Your feedback has been submitted.",
                data: serializeFeedback(populated),
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create student feedback error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to submit your feedback.",
            },
            { status: 500 }
        );
    }
}