
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const inputClass =
    "w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10";

const statusLabels = {
    applied: "Applied",
    interviewed: "Interviewed",
    offered: "Offered",
    interned: "Interned",
    completed: "Completed",
    rejected: "Rejected",
    withdrawn: "Withdrawn",
};

const statusStyles = {
    applied: "border-violet-500/20 bg-violet-500/10 text-violet-600",
    interviewed: "border-purple-500/20 bg-purple-500/10 text-purple-600",
    offered: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
    interned: "border-primary/20 bg-primary/10 text-primary",
    completed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
    rejected: "border-red-500/20 bg-red-500/10 text-red-500",
    withdrawn: "border-border bg-surface-alt text-text-muted",
};

function formatDate(value) {
    if (!value) return "Date unavailable";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function StatusBadge({ status }) {
    return (
        <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                statusStyles[status] ||
                "border-border bg-surface-alt text-text-muted"
            }`}
        >
            {statusLabels[status] || status || "Unknown"}
        </span>
    );
}

function Rating({ value }) {
    if (!value) {
        return (
            <span className="text-xs text-text-muted">
                No rating
            </span>
        );
    }

    return (
        <div
            className="flex items-center gap-1.5"
            aria-label={`Rated ${value} out of 5`}
        >
            <span className="text-amber-400">★</span>
            <span className="text-sm font-semibold text-text">
                {value}/5
            </span>
        </div>
    );
}

function FeedbackCard({ item }) {
    const [expanded, setExpanded] = useState(false);

    const hasImprovements = Boolean(item.improvements?.trim());
    const hasReply = Boolean(item.recruiterReply?.trim());

    return (
        <article className="rounded-2xl border border-border bg-surface p-4 sm:p-5">

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                        {item.company?.name || "Company"}
                    </p>

                    <h3 className="mt-1 text-sm font-bold text-text">
                        {item.internship?.title || "Internship"}
                    </h3>

                    <p className="mt-1 text-xs text-text-muted">
                        Submitted {formatDate(item.createdAt)}
                    </p>
                </div>

                <StatusBadge status={item.employmentStatus} />
            </div>

            {/* Experience */}
            <div className="mt-4 rounded-xl bg-background p-3.5">
                <p className="mb-1.5 text-xs font-semibold text-text">
                    Your experience
                </p>

                <p
                    className={`whitespace-pre-line break-words text-sm leading-6 text-text-secondary ${
                        expanded ? "" : "line-clamp-3"
                    }`}
                >
                    {item.experience || "No experience details provided."}
                </p>
            </div>

            {/* Improvements */}
            {hasImprovements && (
                <div className="mt-2.5 rounded-xl bg-background p-3.5">
                    <p className="mb-1.5 text-xs font-semibold text-text">
                        Field of improvements
                    </p>

                    <p
                        className={`whitespace-pre-line break-words text-sm leading-6 text-text-secondary ${
                            expanded ? "" : "line-clamp-2"
                        }`}
                    >
                        {item.improvements}
                    </p>
                </div>
            )}

            {/* Rating and recruiter status */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                <Rating value={item.rating} />

                {hasReply && (
                    <span className="text-xs font-semibold text-primary">
                        Recruiter replied
                    </span>
                )}
            </div>

            {/* Recruiter reply */}
            {hasReply && (
                <div className="mt-3 rounded-xl border border-primary/15 bg-rose-soft/40 p-3.5">

                    <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 10h8M8 14h5m-9 7 1.2-3.6A8 8 0 1 1 20 16.5L21 20l-4-1"
                                />
                            </svg>
                        </span>

                        <p className="text-xs font-semibold text-primary">
                            Response from Recruiter
                        </p>
                    </div>

                    <p
                        className={`mt-2 whitespace-pre-line break-words text-sm leading-6 text-text-secondary ${
                            expanded ? "" : "line-clamp-2"
                        }`}
                    >
                        {item.recruiterReply}
                    </p>
                </div>
            )}

            {/* Read feedback / Show less */}
            <div className="mt-3 flex justify-end">
                <button
                    type="button"
                    onClick={() => setExpanded((previous) => !previous)}
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-text-secondary transition hover:border-primary hover:text-primary"
                >
                    {expanded ? "Show Less" : "Read Feedback"}
                </button>
            </div>
        </article>
    );
}

function LoadingCard() {
    return (
        <div className="animate-pulse rounded-2xl border border-border bg-surface p-5">
            <div className="h-3 w-1/3 rounded bg-surface-alt" />
            <div className="mt-4 h-5 w-2/3 rounded bg-surface-alt" />
            <div className="mt-4 h-3 w-full rounded bg-surface-alt" />
            <div className="mt-2 h-3 w-5/6 rounded bg-surface-alt" />
        </div>
    );
}

function EmptyFeedback() {
    return (
        <div className="rounded-2xl border border-dashed border-border bg-surface px-5 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-soft text-primary">
                <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.7}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h8M8 14h5m-8 6 1.2-3.6A8 8 0 1 1 20 16.5L21 20l-4-1"
                    />
                </svg>
            </div>

            <h3 className="mt-4 font-display text-lg font-bold text-text">
                No feedback submitted yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-muted">
                Share your internship experience to help other students make
                informed decisions.
            </p>
        </div>
    );
}

export default function FeedbackPage() {
    const [feedbackItems, setFeedbackItems] = useState([]);
    const [eligibleApplications, setEligibleApplications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        applicationId: "",
        experience: "",
        improvements: "",
        rating: 0,
    });

    const fetchFeedback = useCallback(async (signal) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/feedback", {
                credentials: "include",
                cache: "no-store",
                signal,
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Unable to load feedback."
                );
            }

            setFeedbackItems(
                Array.isArray(result.data) ? result.data : []
            );

            setEligibleApplications(
                Array.isArray(result.eligibleApplications)
                    ? result.eligibleApplications
                    : []
            );
        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err.message || "Unable to load feedback.");
            }
        } finally {
            if (!signal?.aborted) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        fetchFeedback(controller.signal);

        return () => controller.abort();
    }, [fetchFeedback]);

    const stats = useMemo(() => {
        const ratedItems = feedbackItems.filter(
            (item) => Number(item.rating) > 0
        );

        const ratingTotal = ratedItems.reduce(
            (sum, item) => sum + Number(item.rating),
            0
        );

        return {
            total: feedbackItems.length,
            average: ratedItems.length
                ? (ratingTotal / ratedItems.length).toFixed(1)
                : "0.0",
        };
    }, [feedbackItems]);

    function updateForm(key, value) {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }));
    }

    function resetForm() {
        setForm({
            applicationId: "",
            experience: "",
            improvements: "",
            rating: 0,
        });

        setSubmitError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setSubmitError("");
        setSuccessMessage("");

        if (!form.applicationId) {
            setSubmitError("Please select an internship.");
            return;
        }

        if (form.experience.trim().length < 20) {
            setSubmitError(
                "Please describe your experience in at least 20 characters."
            );
            return;
        }

        if (!form.rating) {
            setSubmitError("Please select a rating.");
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    applicationId: form.applicationId,
                    experience: form.experience.trim(),
                    improvements: form.improvements.trim(),
                    rating: form.rating,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Unable to submit feedback."
                );
            }

            if (result.data) {
                setFeedbackItems((previous) => [
                    result.data,
                    ...previous,
                ]);
            } else {
                await fetchFeedback();
            }

            setEligibleApplications((previous) =>
                previous.filter(
                    (item) => item.applicationId !== form.applicationId
                )
            );

            resetForm();
            setShowForm(false);

            setSuccessMessage(
                "Your feedback has been published successfully."
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } catch (err) {
            setSubmitError(
                err.message ||
                    "Something went wrong while submitting feedback."
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-full w-full bg-background font-ui text-text antialiased">
            <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

                {/* Page Header */}
                <section className="mb-7">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />

                        <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                            Student Portal
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="font-display text-3xl tracking-tight text-text sm:text-4xl">
                                My Feedback.
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm leading-6 text-text-secondary">
                                Share your internship experience and help
                                other students make better-informed decisions.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setShowForm((previous) => !previous);
                                setSubmitError("");
                            }}
                            disabled={
                                !showForm &&
                                eligibleApplications.length === 0
                            }
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className="text-lg leading-none">+</span>

                            {showForm
                                ? "Close feedback form"
                                : "Share your experience"}
                        </button>
                    </div>
                </section>

                {/* Success Message */}
                {successMessage && (
                    <div
                        role="status"
                        className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-600"
                    >
                        <span>{successMessage}</span>

                        <button
                            type="button"
                            onClick={() => setSuccessMessage("")}
                            aria-label="Dismiss success message"
                            className="font-bold"
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div
                        role="alert"
                        className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500"
                    >
                        <span>{error}</span>

                        <button
                            type="button"
                            onClick={() => fetchFeedback()}
                            className="font-semibold underline underline-offset-2"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Statistics */}
                <section className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                    {[
                        {
                            label: "Total feedback",
                            value: stats.total,
                            description: "Experiences shared",
                        },
                        {
                            label: "Average rating",
                            value: stats.average,
                            description: "Out of 5 stars",
                        },
                        {
                            label: "Recruiter responses",
                            value: feedbackItems.filter(
                                (item) => Boolean(item.recruiterReply)
                            ).length,
                            description: "Responses received",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="min-w-0 rounded-2xl border border-border bg-surface p-4 sm:p-5"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted sm:text-xs">
                                {stat.label}
                            </p>

                            <p className="mt-3 font-display text-2xl font-bold text-text sm:text-3xl">
                                {loading ? "–" : stat.value}
                            </p>

                            <p className="mt-1 text-[11px] leading-5 text-text-secondary sm:text-xs">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Feedback Submission Form */}
                {showForm && (
                    <section className="mb-8 overflow-hidden rounded-2xl border border-border bg-surface">
                        <div className="border-b border-border p-5 sm:p-6">
                            <h2 className="font-display text-xl font-bold text-text">
                                Share your internship experience
                            </h2>

                            <p className="mt-1 text-sm text-text-secondary">
                                Your application status is fetched
                                automatically and cannot be edited here.
                                Your feedback will be published immediately.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-5 sm:p-6"
                        >
                            {/* Application Selection */}
                            <div>
                                <label
                                    htmlFor="feedback-application"
                                    className="mb-2 block text-xs font-semibold text-text-secondary"
                                >
                                    Company and internship{" "}
                                    <span className="text-primary">*</span>
                                </label>

                                <select
                                    id="feedback-application"
                                    required
                                    value={form.applicationId}
                                    onChange={(event) =>
                                        updateForm(
                                            "applicationId",
                                            event.target.value
                                        )
                                    }
                                    className={inputClass}
                                >
                                    <option value="">
                                        Select an internship
                                    </option>

                                    {eligibleApplications.map((item) => (
                                        <option
                                            key={item.applicationId}
                                            value={item.applicationId}
                                        >
                                            {item.internshipTitle} ·{" "}
                                            {item.companyName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Employment Status */}
                            {form.applicationId &&
                                (() => {
                                    const selected =
                                        eligibleApplications.find(
                                            (item) =>
                                                item.applicationId ===
                                                form.applicationId
                                        );

                                    return selected ? (
                                        <div className="rounded-xl border border-border bg-background p-4">
                                            <p className="text-xs font-semibold text-text-secondary">
                                                Employment status · Fetched
                                                from your application
                                            </p>

                                            <div className="mt-2">
                                                <StatusBadge
                                                    status={
                                                        selected.employmentStatus
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ) : null;
                                })()}

                            {/* Experience */}
                            <div>
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <label
                                        htmlFor="feedback-experience"
                                        className="text-xs font-semibold text-text-secondary"
                                    >
                                        Your experience{" "}
                                        <span className="text-primary">*</span>
                                    </label>

                                    <span className="text-[11px] text-text-muted">
                                        {form.experience.length}/5000
                                    </span>
                                </div>

                                <textarea
                                    id="feedback-experience"
                                    required
                                    minLength={20}
                                    maxLength={5000}
                                    rows={6}
                                    value={form.experience}
                                    onChange={(event) =>
                                        updateForm(
                                            "experience",
                                            event.target.value
                                        )
                                    }
                                    placeholder="Describe your overall experience with the application process, interviews, work environment, mentorship, compensation, and outcome..."
                                    className={`${inputClass} resize-y`}
                                />
                            </div>

                            {/* Improvements */}
                            <div>
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <label
                                        htmlFor="feedback-improvements"
                                        className="text-xs font-semibold text-text-secondary"
                                    >
                                        Field of improvements
                                    </label>

                                    <span className="text-[11px] text-text-muted">
                                        {form.improvements.length}/2000
                                    </span>
                                </div>

                                <textarea
                                    id="feedback-improvements"
                                    maxLength={2000}
                                    rows={3}
                                    value={form.improvements}
                                    onChange={(event) =>
                                        updateForm(
                                            "improvements",
                                            event.target.value
                                        )
                                    }
                                    placeholder="What could the company improve for future interns?"
                                    className={`${inputClass} resize-y`}
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="mb-2 block text-xs font-semibold text-text-secondary">
                                    Overall rating{" "}
                                    <span className="text-primary">*</span>
                                </label>

                                <div
                                    className="flex flex-wrap items-center gap-2"
                                    role="radiogroup"
                                    aria-label="Overall rating"
                                >
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            role="radio"
                                            aria-checked={form.rating === star}
                                            aria-label={`${star} out of 5 stars`}
                                            onClick={() =>
                                                updateForm("rating", star)
                                            }
                                            className={`rounded-xl border px-3 py-2 text-2xl transition ${
                                                form.rating >= star
                                                    ? "border-amber-400/40 bg-amber-400/10 text-amber-500"
                                                    : "border-border bg-background text-text-muted hover:border-amber-400/40"
                                            }`}
                                        >
                                            ★
                                        </button>
                                    ))}

                                    <span className="ml-1 text-xs text-text-muted">
                                        {form.rating
                                            ? `${form.rating} out of 5`
                                            : "Select a rating"}
                                    </span>
                                </div>
                            </div>

                            {/* Notice */}
                            <div className="rounded-xl border border-border bg-background p-4">
                                <p className="text-xs leading-5 text-text-secondary">
                                    Submit an honest account of your own
                                    experience. Avoid including passwords,
                                    private contact details, or other sensitive
                                    information. Your feedback will be
                                    published immediately.
                                </p>
                            </div>

                            {/* Submit Error */}
                            {submitError && (
                                <p
                                    role="alert"
                                    className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500"
                                >
                                    {submitError}
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetForm();
                                        setShowForm(false);
                                    }}
                                    disabled={submitting}
                                    className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-text-secondary transition hover:bg-background disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        submitting ||
                                        eligibleApplications.length === 0
                                    }
                                    className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : "Publish feedback"}
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                {/* No Eligible Applications */}
                {eligibleApplications.length === 0 && !loading && (
                    <div className="mb-7 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-secondary">
                        You currently have no eligible applications without
                        feedback. Once you apply to an internship, it will
                        appear here.
                    </div>
                )}

                {/* Feedback History */}
                <section>
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <h2 className="font-display text-xl font-bold text-text">
                                Your feedback history
                            </h2>

                            <p className="mt-1 text-sm text-text-secondary">
                                Review your submissions and responses from
                                recruiters.
                            </p>
                        </div>

                        {!loading && (
                            <span className="text-xs text-text-muted">
                                {feedbackItems.length} submissions
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                            {[1, 2, 3, 4].map((item) => (
                                <LoadingCard key={item} />
                            ))}
                        </div>
                    ) : feedbackItems.length === 0 ? (
                        <EmptyFeedback />
                    ) : (
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                            {feedbackItems.map((item) => (
                                <FeedbackCard
                                    key={item._id}
                                    item={item}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
