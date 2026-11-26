
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomInt, createHash } from "crypto";

import { connectDB } from "@/config/db";
import User from "@/models/User";
import EmailVerification from "@/models/EmailVerification";

import { verifyAuthToken } from "@/lib/auth/auth";
import { sendVerificationEmail } from "@/lib/email/sendVerificationEmail";

export const runtime = "nodejs";

const OTP_EXPIRY = 5 * 60 * 1000;
const RESEND_COOLDOWN = 60 * 1000;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_SENDS_PER_HOUR = 5;

function hashOTP(otp) {
    return createHash("sha256")
        .update(otp)
        .digest("hex");
}

export async function POST() {
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

        await connectDB();

        // 2. Retrieve the authenticated user
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

        // 3. Check whether email is already verified
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

        const now = new Date();

        // 4. Generate a cryptographically secure 6-digit OTP
        const otp = randomInt(100000, 1000000).toString();
        const otpHash = hashOTP(otp);

        // 5. Check existing OTP and rate limits
        let verification = await EmailVerification.findOne({
            userId: user._id,
        });

        if (verification) {
            const elapsed = now.getTime() -
                verification.lastSentAt.getTime();

            if (elapsed < RESEND_COOLDOWN) {
                const remaining = Math.ceil(
                    (RESEND_COOLDOWN - elapsed) / 1000
                );

                return NextResponse.json(
                    {
                        success: false,
                        message: `Please wait ${remaining} seconds before requesting another OTP.`,
                        retryAfter: remaining,
                    },
                    { status: 429 }
                );
            }

            const windowElapsed = now.getTime() -
                verification.windowStartedAt.getTime();

            if (windowElapsed >= RATE_LIMIT_WINDOW) {
                verification.sendCount = 0;
                verification.windowStartedAt = now;
            }

            if (verification.sendCount >= MAX_SENDS_PER_HOUR) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "OTP request limit reached. Try again later.",
                    },
                    { status: 429 }
                );
            }

            verification.otpHash = otpHash;
            verification.expiresAt = new Date(
                now.getTime() + OTP_EXPIRY
            );
            verification.lastSentAt = now;
            verification.attempts = 0;
            verification.sendCount += 1;

        } else {
            verification = new EmailVerification({
                userId: user._id,
                otpHash,
                expiresAt: new Date(now.getTime() + OTP_EXPIRY),
                lastSentAt: now,
                attempts: 0,
                sendCount: 1,
                windowStartedAt: now,
            });
        }

        // 6. Save OTP hash before sending the email
        await verification.save();

        // 7. Send OTP using the shared email service
        try {
            await sendVerificationEmail(
                user.email,
                otp,
                user.name
            );
        } catch (emailError) {
            console.error("OTP email delivery error:", emailError);

            // Invalidate the OTP if delivery fails
            await EmailVerification.deleteOne({
                _id: verification._id,
            });

            return NextResponse.json(
                {
                    success: false,
                    message: "Unable to send the verification email. Please try again later.",
                },
                { status: 502 }
            );
        }

        // 8. Return success without exposing the OTP
        return NextResponse.json(
            {
                success: true,
                message: "Verification OTP sent successfully.",
                expiresIn: 300,
                resendAfter: 60,
                email: user.email,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Send verification OTP error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while sending the verification OTP.",
            },
            { status: 500 }
        );
    }
}
