
import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        otpHash: {
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        lastSentAt: {
            type: Date,
            required: true,
        },

        attempts: {
            type: Number,
            default: 0,
        },

        sendCount: {
            type: Number,
            default: 1,
        },

        windowStartedAt: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

emailVerificationSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

const EmailVerification =
    mongoose.models.EmailVerification ||
    mongoose.model("EmailVerification", emailVerificationSchema);

export default EmailVerification;
