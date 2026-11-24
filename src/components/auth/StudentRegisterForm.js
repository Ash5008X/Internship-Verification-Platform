
"use client";

import { useState } from "react";
import { studentRegisterSchema } from "@/lib/validations/auth";

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

export default function RegisterForm({
    onToggle,
    onSwitchToRecruiter,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordValue, setPasswordValue] = useState("");

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const currentYear = new Date().getFullYear();

    const graduationYears = Array.from(
        { length: 8 },
        (_, index) => currentYear + index
    );

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

        const validation = studentRegisterSchema.safeParse({
            name: formData.get("name"),
            email: formData.get("email"),
            college: formData.get("college"),
            degree: formData.get("degree"),
            graduationYear: formData.get("graduationYear"),
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

            const response = await fetch("/api/auth/register/student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    college: data.college,
                    degree: data.degree,
                    graduationYear: data.graduationYear,
                    password: data.password,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Registration failed."
                );
            }

            setMessage("Account created successfully. Redirecting...");

            window.location.href = "/home";
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
                    YOUR JOURNEY STARTS HERE
                </p>

                <h2 className="auth-form-title">
                    Join us.
                </h2>

                <p className="auth-form-subtitle">
                    Create your student account in a few simple steps.
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
                            className={getInputClass("name")}
                            type="text"
                            name="name"
                            placeholder="Your full name"
                            autoComplete="name"
                            minLength={2}
                            maxLength={80}
                            required
                            aria-invalid={!!errors.name}
                            onChange={() => clearFieldError("name")}
                        />

                        <FieldError message={errors.name} />
                    </label>

                    {/* Email */}
                    <label className="auth-field">
                        <span className="auth-label">
                            College email
                        </span>

                        <input
                            className={getInputClass("email")}
                            type="email"
                            name="email"
                            placeholder="you@college.edu"
                            autoComplete="email"
                            required
                            aria-invalid={!!errors.email}
                            onChange={() => clearFieldError("email")}
                        />

                        <FieldError message={errors.email} />
                    </label>

                    {/* College */}
                    <label className="auth-field">
                        <span className="auth-label">
                            College / university
                        </span>

                        <input
                            className={getInputClass("college")}
                            type="text"
                            name="college"
                            placeholder="Your institution"
                            autoComplete="organization"
                            maxLength={120}
                            required
                            aria-invalid={!!errors.college}
                            onChange={() => clearFieldError("college")}
                        />

                        <FieldError message={errors.college} />
                    </label>

                    {/* Degree and Graduation */}
                    <div className="auth-field-row">
                        <label className="auth-field">
                            <span className="auth-label">
                                Degree
                            </span>

                            <select
                                className={`auth-input auth-select ${
                                    errors.degree ? "!border-red-500" : ""
                                }`}
                                name="degree"
                                required
                                defaultValue=""
                                aria-invalid={!!errors.degree}
                                onChange={() => clearFieldError("degree")}
                            >
                                <option value="" disabled>
                                    Select degree
                                </option>

                                <option value="BTech">B.Tech</option>
                                <option value="BE">B.E.</option>
                                <option value="BSc">B.Sc.</option>
                                <option value="BCA">BCA</option>
                                <option value="MTech">M.Tech</option>
                                <option value="MSc">M.Sc.</option>
                                <option value="MCA">MCA</option>
                                <option value="Other">Other</option>
                            </select>

                            <FieldError message={errors.degree} />
                        </label>

                        <label className="auth-field">
                            <span className="auth-label">
                                Graduation year
                            </span>

                            <select
                                className={`auth-input auth-select ${
                                    errors.graduationYear
                                        ? "!border-red-500"
                                        : ""
                                }`}
                                name="graduationYear"
                                defaultValue=""
                                required
                                aria-invalid={!!errors.graduationYear}
                                onChange={() =>
                                    clearFieldError("graduationYear")
                                }
                            >
                                <option value="" disabled>
                                    Select year
                                </option>

                                {graduationYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>

                            <FieldError message={errors.graduationYear} />
                        </label>
                    </div>

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
                            I agree to the terms and understand that account details must be
                            accurate.
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
                                : "Create account"}
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
                        Want to hire interns?{" "}
                        <button
                            className="auth-toggle-btn"
                            type="button"
                            onClick={onSwitchToRecruiter}
                        >
                            Register as a recruiter
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
            </div>
        </div>
    );
}
