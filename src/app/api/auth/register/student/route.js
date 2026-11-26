
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/config/db";
import User from "@/models/User";
import {
    createAuthToken,
    getAuthCookieOptions,
} from "@/lib/auth/auth";
import { studentRegisterSchema } from "@/lib/validations/auth";

export async function POST(request) {
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

        const validation = studentRegisterSchema.safeParse(body);

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
            name,
            email,
            college,
            degree,
            graduationYear,
            password,
        } = validation.data;

        await connectDB();

        const existingUser = await User.findOne({ email }).select("_id");

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "An account with this email already exists.",
                },
                { status: 409 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            passwordHash,
            role: "student",
            status: "pending_verification",
            profile: {
                college,
                degree,
                graduationYear,
            },
        });

        const token = createAuthToken(user);

        const response = NextResponse.json(
            {
                success: true,
                message: "Student account created. Please verify your email to activate your account.",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                    isEmailVerified: user.isEmailVerified,
                    profile: user.profile,
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
        if (error.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    message: "An account with this email already exists.",
                },
                { status: 409 }
            );
        }

        console.error("Student registration error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to create your account.",
            },
            { status: 500 }
        );
    }
}
