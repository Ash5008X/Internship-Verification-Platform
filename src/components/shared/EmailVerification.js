
"use client";

import { useEffect, useRef, useState } from "react";

export default function EmailVerification({ email, isVerified, onVerified }) {
    const [isOpen, setIsOpen] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [resendAfter, setResendAfter] = useState(0);

    const inputRefs = useRef([]);

    useEffect(() => {
        if (resendAfter <= 0) return;

        const timer = setTimeout(() => {
            setResendAfter((previous) => previous - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [resendAfter]);

    async function readResponse(response) {
        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
            throw new Error(
                "Verification API is unavailable. Please check the API route."
            );
        }

        return response.json();
    }

    async function sendOTP() {
        setSending(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch(
                "/api/auth/send-verification-otp",
                {
                    method: "POST",
                    credentials: "include",
                    cache: "no-store",
                }
            );

            const result = await readResponse(response);

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Unable to send OTP.");
            }

            if (result.alreadyVerified) {
                onVerified?.();
                setIsOpen(false);
                return;
            }

            setOtp(["", "", "", "", "", ""]);
            setIsOpen(true);
            setResendAfter(result.resendAfter || 60);
            setMessage(`Code sent to ${email}`);

            setTimeout(() => inputRefs.current[0]?.focus(), 100);

        } catch (err) {
            setError(err.message || "Unable to send verification code.");
        } finally {
            setSending(false);
        }
    }

    function updateDigit(index, value) {
        const digit = value.replace(/\D/g, "").slice(-1);

        setOtp((previous) => {
            const updated = [...previous];
            updated[index] = digit;
            return updated;
        });

        setError("");

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index, event) {
        if (
            event.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus();
        }

        if (event.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (event.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handlePaste(event) {
        event.preventDefault();

        const pasted = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (!pasted) return;

        const digits = pasted.split("");

        setOtp([
            ...digits,
            ...Array(6 - digits.length).fill(""),
        ]);

        inputRefs.current[Math.min(digits.length, 5)]?.focus();
    }

    async function verifyOTP(event) {
        event.preventDefault();

        const code = otp.join("");

        if (!/^\d{6}$/.test(code)) {
            setError("Please enter all six digits.");
            return;
        }

        setVerifying(true);
        setError("");

        try {
            const response = await fetch(
                "/api/auth/verify-email",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ otp: code }),
                }
            );

            const result = await readResponse(response);

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Invalid verification code."
                );
            }

            setIsOpen(false);
            setMessage("Email successfully verified!");

            onVerified?.(result.user || result.data || null);

            window.location.reload();

        } catch (err) {
            setError(err.message || "Verification failed.");
        } finally {
            setVerifying(false);
        }
    }

    if (isVerified) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span>✓</span> Verified
            </span>
        );
    }

    return (
        <>
            <div className="mt-2">
                <button
                    type="button"
                    onClick={sendOTP}
                    disabled={sending}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                    {sending ? "Sending OTP..." : "Verify email"}
                </button>

                {error && !isOpen && (
                    <p className="mt-2 text-sm text-red-600" role="alert">
                        {error}
                    </p>
                )}

                {message && !isOpen && (
                    <p className="mt-2 text-sm text-emerald-600">
                        {message}
                    </p>
                )}
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setIsOpen(false);
                            setError("");
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="verification-title"
                        className="relative w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl sm:p-8"
                    >
                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen(false);
                                setError("");
                            }}
                            aria-label="Close verification dialog"
                            className="absolute right-5 top-5 rounded-full p-2 text-text-secondary transition hover:bg-surface-alt hover:text-text"
                        >
                            ✕
                        </button>

                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <path d="m3 7 9 6 9-6" />
                                </svg>
                            </div>

                            <h2
                                id="verification-title"
                                className="font-display text-2xl font-bold text-text"
                            >
                                Verify your email
                            </h2>

                            <p className="mt-2 text-sm text-text-secondary">
                                We've sent a six-digit verification code to
                            </p>

                            <p className="mt-1 break-all text-sm font-semibold text-primary">
                                {email}
                            </p>
                        </div>

                        <form onSubmit={verifyOTP}>
                            <div className="mb-5 flex justify-center gap-2 sm:gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(element) => {
                                            inputRefs.current[index] = element;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete={index === 0 ? "one-time-code" : "off"}
                                        maxLength={1}
                                        value={digit}
                                        onChange={(event) =>
                                            updateDigit(index, event.target.value)
                                        }
                                        onKeyDown={(event) =>
                                            handleKeyDown(index, event)
                                        }
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        aria-label={`OTP digit ${index + 1}`}
                                        className="h-12 w-10 rounded-xl border border-border bg-surface text-center text-xl font-bold text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-14 sm:w-12"
                                    />
                                ))}
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="mb-4 text-center text-sm text-red-600"
                                >
                                    {error}
                                </p>
                            )}

                            <div className="mb-5 flex items-center justify-center gap-2 text-sm">
                                <span className="text-text-secondary">
                                    Didn't receive the code?
                                </span>

                                <button
                                    type="button"
                                    onClick={sendOTP}
                                    disabled={sending || resendAfter > 0}
                                    className="font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {resendAfter > 0
                                        ? `Resend in ${resendAfter}s`
                                        : "Resend OTP"}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={verifying || otp.some((digit) => !digit)}
                                className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {verifying ? "Verifying..." : "Verify email"}
                            </button>

                            <p className="mt-4 text-center text-xs text-text-muted">
                                Your verification code expires in 5 minutes.
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
