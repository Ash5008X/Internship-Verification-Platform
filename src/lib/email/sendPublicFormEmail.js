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

export async function sendPublicFormEmail({ kind, name, email, category, subject, details, url, priority }) {
    const sender = process.env.GMAIL_USER;
    const password = process.env.GMAIL_APP_PASSWORD;

    if (!sender || !password) {
        throw new Error("Gmail SMTP credentials are not configured.");
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: sender, pass: password.replace(/\s/g, "") },
    });

    const formNames = {
        contact: "Contact message",
        support: "Support request",
        issue: "Platform issue report",
        listing: "Internship listing report",
    };
    const label = formNames[kind] || "Public form submission";
    const fields = [
        ["Form", label], ["Name", name], ["Email", email],
        ["Category", category], ["Priority", priority || "Not specified"],
        ["Subject", subject], ["Relevant URL", url || "Not provided"],
        ["Details", details],
    ];
    const safeFields = fields.map(([key, value]) => `<tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top">${escapeHtml(key)}</td><td style="padding:10px;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("");
    const text = fields.map(([key, value]) => `${key}: ${value || "Not provided"}`).join("\n\n");

    return transporter.sendMail({
        from: { name: "InternCheck Website", address: sender },
        to: sender,
        replyTo: { name, address: email },
        subject: `[InternCheck ${label}] ${subject}`,
        text,
        html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#30252a"><h2 style="color:#812044">InternCheck · ${escapeHtml(label)}</h2><p>A new submission was received through the public website.</p><table style="width:100%;border-collapse:collapse">${safeFields}</table></div>`,
    });
}
