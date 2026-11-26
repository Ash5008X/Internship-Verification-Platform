
import "server-only";
import nodemailer from "nodemailer";

function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    })[character]);
}

export async function sendVerificationEmail(email, otp, name) {
    const sender = process.env.GMAIL_USER;
    const password = process.env.GMAIL_APP_PASSWORD;

    if (!sender || !password) {
        throw new Error("Gmail SMTP credentials are not configured.");
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: sender,
            pass: password.replace(/\s/g, ""),
        },
    });

    const safeName = escapeHtml(name);

    const result = await transporter.sendMail({
        from: {
            name: "InternCheck",
            address: sender,
        },
        to: email,
        subject: "Verify your InternCheck email address",
        text: `Hello ${name},

Your InternCheck verification code is ${otp}.

This code expires in 5 minutes.

If you did not request this code, ignore this email.

InternCheck Team`,
        html: `
            <div style="font-family:Arial;padding:30px;background:#f7f3f5;color:#30252a">
                <div style="max-width:480px;margin:auto;padding:30px;background:white;border-radius:14px">
                    <h2 style="color:#812044">InternCheck</h2>
                    <h2>Verify your email address</h2>
                    <p>Hello ${safeName},</p>
                    <p>Use the following OTP to verify your account:</p>
                    <div style="padding:22px;background:#f8edf1;border-radius:10px;text-align:center;font-size:32px;font-weight:bold;letter-spacing:10px;color:#812044">
                        ${otp}
                    </div>
                    <p>This code expires in <strong>5 minutes</strong>.</p>
                    <p style="color:#888;font-size:12px">
                        If you did not request this code, ignore this email.
                    </p>
                    <hr />
                    <p style="color:#999;font-size:12px">
                        InternCheck · Verified Internships
                    </p>
                </div>
            </div>
        `,
    });

    return result;
}
