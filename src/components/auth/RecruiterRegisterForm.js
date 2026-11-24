
"use client";

import { useState } from "react";
import { recruiterRegisterSchema } from "@/lib/validations/auth";

function FieldError({ message }) {
    if (!message) return null;

    return (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
            {message}
        </p>
    );
}

function PasswordRequirements({ password }) {
    const rules = [
        {
            label: "At least 8 characters",
            valid: password.length >= 8,
        },
        {
            label: "One uppercase letter",
            valid: /[A-Z]/.test(password),
        },
        {
            label: "One lowercase letter",
            valid: /[a-z]/.test(password),
        },
        {
            label: "One number",
            valid: /[0-9]/.test(password),
        },
        {
            label: "One special character",
            valid: /[^A-Za-z0-9]/.test(password),
        },
    ];

    return (
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {rules.map((rule) => (
                <div
                    key={rule.label}
                    className={`flex items-center gap-2 text-xs transition-colors ${
                        rule.valid
                            ? "text-emerald-600"
                            : "text-text-muted"
                    }`}
                >
                    <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            rule.valid
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-surface-alt text-text-muted"
                        }`}
                    >
                        {rule.valid ? "✓" : "○"}
                    </span>

                    {rule.label}
                </div>
            ))}
        </div>
    );
}

export default function RecruiterRegisterForm({
    onToggle,
    onSwitchToStudent,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordValue, setPasswordValue] = useState("");

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    function clearFieldError(field) {
        setErrors((previous) => ({
            ...previous,
            [field]: "",
        }));

        setMessage("");
    }

    function getInputClass(field) {
        return `auth-input ${
            errors[field]
                ? "!border-red-500 focus:!border-red-500"
                : ""
        }`;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setErrors({});

        const formData = new FormData(event.currentTarget);

        const validation = recruiterRegisterSchema.safeParse({
            fullName: formData.get("fullName"),
            workEmail: formData.get("workEmail"),
            companyName: formData.get("companyName"),
            companyWebsite: formData.get("companyWebsite") || "",
            jobTitle: formData.get("jobTitle"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            terms: formData.get("terms") === "on",
        });

        if (!validation.success) {
            const fieldErrors = {};

            validation.error.issues.forEach((issue) => {
                const field = issue.path[0];

                if (field && !fieldErrors[field]) {
                    fieldErrors[field] = issue.message;
                }
            });

            setErrors(fieldErrors);

            return;
        }

        setLoading(true);

        try {
            const data = validation.data;

            const response = await fetch("/api/auth/register/recruiter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: data.fullName,
                    workEmail: data.workEmail,
                    companyName: data.companyName,
                    companyWebsite: data.companyWebsite,
                    jobTitle: data.jobTitle,
                    password: data.password,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Registration failed."
                );
            }

            setMessage("Recruiter account created. Redirecting...");

            window.location.href = "/recruiter/dashboard";
        } catch (error) {
            setMessage(
                error.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-form-panel">
            <div className="auth-form-content auth-form-content--register">

                <p className="auth-form-kicker">
                    RECRUITER REGISTRATION
                </p>

                <h2 className="auth-form-title">
                    Build trust with talent.
                </h2>

                <p className="auth-form-subtitle">
                    Create your recruiter account to share internship
                    opportunities with students.
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {/* Full Name */}
                    <label className="auth-field">
                        <span className="auth-label">
                            Full name
                        </span>

                        <input
                            className={getInputClass("fullName")}
                            type="text"
                            name="fullName"
                            placeholder="Your full name"
                            autoComplete="name"
                            minLength={2}
                            maxLength={80}
                            required
                            aria-invalid={!!errors.fullName}
                            onChange={() => clearFieldError("fullName")}
                        />

                        <FieldError message={errors.fullName} />
                    </label>

                    {/* Work Email */}
                    <label className="auth-field">
                        <span className="auth-label">
                            Work email
                        </span>

                        <input
                            className={getInputClass("workEmail")}
                            type="email"
                            name="workEmail"
                            placeholder="you@company.com"
                            autoComplete="email"
                            required
                            aria-invalid={!!errors.workEmail}
                            onChange={() => clearFieldError("workEmail")}
                        />

                        <FieldError message={errors.workEmail} />
                    </label>

                    {/* Company Name */}
                    <label className="auth-field">
                        <span className="auth-label">
                            Company name
                        </span>

                        <input
                            className={getInputClass("companyName")}
                            type="text"
                            name="companyName"
                            placeholder="Your company name"
                            autoComplete="organization"
                            maxLength={120}
                            required
                            aria-invalid={!!errors.companyName}
                            onChange={() => clearFieldError("companyName")}
                        />

                        <FieldError message={errors.companyName} />
                    </label>

                    {/* Company Website */}
                    <label className="auth-field">
                        <span className="auth-label">
                            Company website
                            <span> (Optional)</span>
                        </span>

                        <input
                            className={getInputClass("companyWebsite")}
                            type="url"
                            name="companyWebsite"
                            placeholder="https://company.com"
                            autoComplete="url"
                            aria-invalid={!!errors.companyWebsite}
                            onChange={() => clearFieldError("companyWebsite")}
                        />

                        <FieldError message={errors.companyWebsite} />
                    </label>

                    {/* Job Title */}
                    <label className="auth-field">
                        <span className="auth-label">
                            Job title
                        </span>

                        <input
                            className={getInputClass("jobTitle")}
                            type="text"
                            name="jobTitle"
                            placeholder="e.g. HR Manager"
                            autoComplete="organization-title"
                            required
                            aria-invalid={!!errors.jobTitle}
                            onChange={() => clearFieldError("jobTitle")}
                        />

                        <FieldError message={errors.jobTitle} />
                    </label>

                    {/* Password */}
                    <label className="auth-field">
                        <span className="auth-label">
                            Password
                        </span>

                        <span className="auth-password-wrap">
                            <input
                                className={getInputClass("password")}
                                type={
                                    showPassword ? "text" : "password"
                                }
                                name="password"
                                placeholder="Create a strong password"
                                autoComplete="new-password"
                                required
                                value={passwordValue}
                                onChange={(event) => {
                                    setPasswordValue(event.target.value);
                                    clearFieldError("password");
                                    clearFieldError("confirmPassword");
                                }}
                                aria-invalid={!!errors.password}
                            />

                            <button
                                className="auth-password-toggle"
                                type="button"
                                onClick={() =>
                                    setShowPassword((value) => !value)
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </span>

                        <PasswordRequirements password={passwordValue} />

                        <FieldError message={errors.password} />
                    </label>

                    {/* Confirm Password */}
                    <label className="auth-field">
                        <span className="auth-label">
                            Confirm password
                        </span>

                        <span className="auth-password-wrap">
                            <input
                                className={getInputClass("confirmPassword")}
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                placeholder="Enter your password again"
                                autoComplete="new-password"
                                required
                                aria-invalid={!!errors.confirmPassword}
                                onChange={() =>
                                    clearFieldError("confirmPassword")
                                }
                            />

                            <button
                                className="auth-password-toggle"
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword((value) => !value)
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </span>

                        <FieldError message={errors.confirmPassword} />
                    </label>

                    {/* Terms */}
                    <label className="auth-remember auth-terms">
                        <input
                            type="checkbox"
                            name="terms"
                            required
                            onChange={() => clearFieldError("terms")}
                        />

                        <span>
                            I agree to the terms and confirm that my
                            company and account details are accurate.
                        </span>
                    </label>

                    <FieldError message={errors.terms} />

                    {/* API Message */}
                    {message && (
                        <p
                            className="auth-message"
                            role="status"
                        >
                            {message}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        className="auth-submit-btn"
                        type="submit"
                        disabled={loading}
                    >
                        <span>
                            {loading
                                ? "Creating account..."
                                : "Create recruiter account"}
                        </span>

                        <span
                            className="auth-btn-arrow"
                            aria-hidden="true"
                        >
                            ↗
                        </span>
                    </button>
                </form>

                <div className="auth-mobile-only">
                    <p>
                        Registering as a student?{" "}
                        <button
                            className="auth-toggle-btn"
                            type="button"
                            onClick={onSwitchToStudent}
                        >
                            Switch to student
                        </button>
                    </p>
                </div>

                <div className="auth-toggle-link">
                    <p>
                        Already have an account?{" "}
                        <button
                            className="auth-toggle-btn"
                            type="button"
                            onClick={onToggle}
                        >
                            Sign in
                        </button>
                    </p>
                </div>

                <p className="auth-legal-note">
                    Recruiter accounts may require company verification
                    before internship listings can be published.
                </p>
            </div>
        </div>
    );
}
