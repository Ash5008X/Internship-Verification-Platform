import { NextResponse } from "next/server";
import { assessInternship } from "@/lib/verification/verificationService";

export async function POST(request, { params }) {
    try {
        const { internshipId } = await params;

        let body = {};
        try {
            body = await request.json();
        } catch {
            body = {};
        }

        if (!body || typeof body !== "object" || Array.isArray(body)) {
            return NextResponse.json({
                success: false,
                message: "Invalid assessment signals.",
            }, { status: 400 });
        }

        const allowedSignals = [
            "applicationFeeRequired",
            "upfrontPaymentRequired",
            "requiresManualReview",
        ];

        for (const key of allowedSignals) {
            if (Object.hasOwn(body, key) && typeof body[key] !== "boolean") {
                return NextResponse.json({
                    success: false,
                    message: `Invalid assessment signal: ${key}.`,
                }, { status: 400 });
            }
        }

        const signals = Object.fromEntries(
            allowedSignals
                .filter((key) => Object.hasOwn(body, key))
                .map((key) => [key, body[key]])
        );

        const result = await assessInternship(internshipId, { signals });

        return NextResponse.json({
            success: true,
            message: "Internship assessment completed.",
            data: result,
        }, { status: 200 });

    } catch (error) {
        console.error("Assessment API Error:", error);

        const status =
            error.message === "Invalid internship ID."
                ? 400
                : error.message === "Internship not found." ||
                  error.message === "Associated company not found."
                    ? 404
                    : 500;

        return NextResponse.json({
            success: false,
            message: error.message || "Assessment failed.",
        }, { status });
    }
}