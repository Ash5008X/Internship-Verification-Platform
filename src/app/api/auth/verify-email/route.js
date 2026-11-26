
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

import { connectDB } from "@/config/db";
import User from "@/models/User";
import EmailVerification from "@/models/EmailVerification";

import { verifyAuthToken } from "@/lib/auth/auth";

export const runtime = "nodejs";

const MAX_ATTEMPTS = 5;

function hashOTP(otp) {
    return createHash("sha256")
        .update(otp)
        .digest("hex");
}

function compareHashes(first, second) {
    const firstBuffer = Buffer.from(first, "hex");
    const secondBuffer = Buffer.from(second, "hex");

    if (firstBuffer.length !== secondBuffer.length) {
        return false;
    }

    return timingSafeEqual(firstBuffer, secondBuffer);
}

export async function POST(request) {
    try {
        // 1. Authenticate the current user
        const cookieStore = await cookies();
        const token = cookieStore.get("interncheck_token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please log in to verify your email.",
                },
                { status: 401 }
            );
        }

        const payload = verifyAuthToken(token);

        if (!payload?.sub) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Your session is invalid. Please log in again.",
                },
                { status: 401 }
            );
        }

        // 2. Parse and validate OTP
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

        const otp = String(body?.otp || "").trim();

        if (!/^\d{6}$/.test(otp)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter a valid six-digit OTP.",
                },
                { status: 400 }
            );
        }

        await connectDB();

        // 3. Retrieve the authenticated user
        const user = await User.findById(payload.sub).select(
            "_id name email role isEmailVerified status"
        );

        if (!user || user.role !== payload.role) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User account not found.",
                },
                { status: 404 }
            );
        }

        if (user.status === "suspended") {
            return NextResponse.json(
                {
                    success: false,
                    message: "This account has been suspended.",
                },
                { status: 403 }
            );
        }

        // 4. Prevent unnecessary verification
        if (user.isEmailVerified) {
            return NextResponse.json(
                {
                    success: true,
                    alreadyVerified: true,
                    message: "Your email is already verified.",
                },
                { status: 200 }
            );
        }

        // 5. Retrieve the stored OTP
        const verification = await EmailVerification.findOne({
            userId: user._id,
        });

        if (!verification) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No active verification request found. Please request a new OTP.",
                },
                { status: 404 }
            );
        }

        // 6. Check OTP expiration
        if (verification.expiresAt.getTime() <= Date.now()) {
            await EmailVerification.deleteOne({
                _id: verification._id,
            });

            return NextResponse.json(
                {
                    success: false,
                    message: "Your OTP has expired. Please request a new one.",
                    expired: true,
                },
                { status: 400 }
            );
        }

        // 7. Enforce maximum verification attempts
        if (verification.attempts >= MAX_ATTEMPTS) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Too many incorrect attempts. Please request a new OTP.",
                },
                { status: 429 }
            );
        }

        // 8. Compare the submitted OTP with its stored hash
        const submittedHash = hashOTP(otp);

        const isValid = compareHashes(
            submittedHash,
            verification.otpHash
        );

        if (!isValid) {
            verification.attempts += 1;
            await verification.save();

            const remainingAttempts =
                MAX_ATTEMPTS - verification.attempts;

            return NextResponse.json(
                {
                    success: false,
                    message: remainingAttempts > 0
                        ? "Incorrect OTP. Please try again."
                        : "Too many incorrect attempts. Please request a new OTP.",
                    remainingAttempts,
                },
                {
                    status: remainingAttempts > 0 ? 400 : 429,
                }
            );
        }

        // 9. Activate the account after successful verification
        const updatedUser = await User.findOneAndUpdate(
            {
                _id: user._id,
                isEmailVerified: false,
                status: { $ne: "suspended" },
            },
            {
                $set: {
                    isEmailVerified: true,
                    status: "active",
                },
            },
            {
                new: true,
                runValidators: true,
            }
        ).select(
            "_id name email role isEmailVerified status profile recruiterProfile"
        );

        if (!updatedUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unable to update your account. Please try again.",
                },
                { status: 409 }
            );
        }

        // 10. Remove the successfully used OTP
        await EmailVerification.deleteOne({
            _id: verification._id,
        });

        // 11. Return updated account details
        return NextResponse.json(
            {
                success: true,
                message: "Your email has been successfully verified.",
                user: {
                    id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    isEmailVerified: updatedUser.isEmailVerified,
                    status: updatedUser.status,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Verify email error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while verifying your email.",
            },
            { status: 500 }
        );
    }
}
