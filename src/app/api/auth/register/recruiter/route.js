
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/config/db";
import User from "@/models/User";
import Company from "@/models/Company";
import {
    createAuthToken,
    getAuthCookieOptions,
} from "@/lib/auth/auth";
import { recruiterRegisterSchema } from "@/lib/validations/auth";

export async function POST(request) {
    let createdUser = null;

    try {
        let body;

        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid request body.",
                },
                { status: 400 }
            );
        }

        const validation = recruiterRegisterSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please correct the validation errors.",
                    errors: validation.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const {
            fullName,
            workEmail,
            companyName,
            companyWebsite,
            jobTitle,
            password,
        } = validation.data;

        await connectDB();

        const website = companyWebsite
            ? new URL(companyWebsite).origin
            : null;

        const domain = companyWebsite
            ? new URL(companyWebsite).hostname.toLowerCase().replace(/^www\./, "")
            : null;

        const normalizedName = companyName
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();

        const existingUser = await User.findOne({
            email: workEmail,
        }).select("_id");

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "An account with this email already exists.",
                },
                { status: 409 }
            );
        }

        const existingCompany = await Company.findOne({
            normalizedName,
        }).select("_id");

        if (existingCompany) {
            return NextResponse.json(
                {
                    success: false,
                    message: "This company is already registered. Contact its existing account owner.",
                },
                { status: 409 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 12);

        createdUser = await User.create({
            name: fullName,
            email: workEmail,
            passwordHash,
            role: "recruiter",
            status: "pending_verification",
            recruiterProfile: {
                jobTitle,
            },
        });

        const company = await Company.create({
            name: companyName,
            normalizedName,
            website,
            domain,
            contactEmail: workEmail,
            identityStatus: "pending",
            createdBy: createdUser._id,
        });

        const token = createAuthToken(createdUser);

        const response = NextResponse.json(
            {
                success: true,
                message: "Recruiter account created. Please verify your email to activate your account.",
                user: {
                    id: createdUser._id,
                    name: createdUser.name,
                    email: createdUser.email,
                    role: createdUser.role,
                    status: createdUser.status,
                    isEmailVerified: createdUser.isEmailVerified,
                    recruiterProfile: createdUser.recruiterProfile,
                },
                company: {
                    id: company._id,
                    name: company.name,
                    identityStatus: company.identityStatus,
                },
            },
            { status: 201 }
        );

        response.cookies.set(
            "interncheck_token",
            token,
            getAuthCookieOptions()
        );

        return response;
    } catch (error) {
        if (createdUser?._id) {
            await User.deleteOne({
                _id: createdUser._id,
            }).catch(() => {});
        }

        if (error.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    message: "This account or company is already registered.",
                },
                { status: 409 }
            );
        }

        console.error("Recruiter registration error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to create your recruiter account.",
            },
            { status: 500 }
        );
    }
}
