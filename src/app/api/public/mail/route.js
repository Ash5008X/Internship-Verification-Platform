import { NextResponse } from "next/server";
import { sendPublicFormEmail } from "@/lib/email/sendPublicFormEmail";

export const runtime = "nodejs";

const ALLOWED_KINDS = new Set(["contact", "support", "issue", "listing"]);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
    try {
        const body = await request.json();
        const kind = String(body?.kind || "");
        const name = String(body?.name || "").trim();
        const email = String(body?.email || "").trim().toLowerCase();
        const category = String(body?.category || "").trim();
        const subject = String(body?.subject || "").trim();
        const details = String(body?.details || "").trim();
        const url = String(body?.url || "").trim();
        const priority = body?.priority === "high" ? "high" : "normal";

        if (!ALLOWED_KINDS.has(kind)) {
            return NextResponse.json({ success: false, message: "Invalid form type." }, { status: 400 });
        }
        if (!name || name.length > 100 || !EMAIL_REGEX.test(email) || email.length > 254 || !category || category.length > 120 || !subject || subject.length > 180 || details.length < 20 || details.length > 5000) {
            return NextResponse.json({ success: false, message: "Please check the form fields and try again." }, { status: 400 });
        }
        if ((kind === "listing" || kind === "issue") && (!/^https?:\/\/.+/i.test(url) || url.length > 2000)) {
            return NextResponse.json({ success: false, message: "Please provide a valid page or listing URL." }, { status: 400 });
        }

        await sendPublicFormEmail({ kind, name, email, category, subject, details, url, priority });
        return NextResponse.json({ success: true, message: "Your message has been sent successfully." });
    } catch (error) {
        console.error("Public form email error:", error);
        return NextResponse.json({ success: false, message: "We couldn't send your message right now. Please try again later." }, { status: 500 });
    }
}
