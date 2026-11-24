import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/config/db";
import { requireRecruiter } from "@/lib/auth/requireRecruiter";
import { getRecruiterCompany } from "@/lib/auth/getRecruiterCompany";
import StudentExperience from "@/models/StudentExperience";
import Notification from "@/models/Notification";

export async function PATCH(request, { params }) {
    try {
        const { user, error } = await requireRecruiter();

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
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

        const { feedbackId } = await params;

        if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
            return NextResponse.json(
                { success: false, message: "Invalid feedback ID." },
                { status: 400 }
            );
        }

        const body = await request.json();
        const reply =
            typeof body.reply === "string" ? body.reply.trim() : "";

        if (!reply) {
            return NextResponse.json(
                { success: false, message: "Reply cannot be empty." },
                { status: 400 }
            );
        }

        if (reply.length > 3000) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Reply cannot exceed 3000 characters.",
                },
                { status: 400 }
            );
        }

        const feedback = await StudentExperience.findOne({
            _id: feedbackId,
            companyId: company._id,
        });

        if (!feedback) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Feedback not found for your company.",
                },
                { status: 404 }
            );
        }

        const isNewReply = feedback.recruiterReply !== reply;

        feedback.recruiterReply = reply;
        await feedback.save();

        if (isNewReply) {
            await Notification.create({
                userId: feedback.studentId,
                type: "experience_update",
                title: "Recruiter replied to your feedback",
                message: `${company.name || "The company"} has responded to your experience.`,
                entityType: "experience",
                entityId: feedback._id,
            });
        }

        return NextResponse.json({
            success: true,
            message: "Reply submitted successfully.",
            data: {
                _id: feedback._id.toString(),
                recruiterReply: feedback.recruiterReply,
            },
        });
    } catch (error) {
        console.error("Recruiter feedback reply error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to submit your reply.",
            },
            { status: 500 }
        );
    }
}