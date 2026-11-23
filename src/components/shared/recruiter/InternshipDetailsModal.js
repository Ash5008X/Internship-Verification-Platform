"use client";

export default function InternshipDetailsModal({
    internship,
    onClose,
}) {
    if (!internship) return null;

    const assessment = internship.riskAssessment;

    const formatStatus = (value) => {
        if (!value) return "Not specified";

        return value
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const formatDate = (value) => {
        if (!value) return "Not specified";

        return new Date(value).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const formatLocation = () => {
        const location = internship.location || {};

        return [
            location.city,
            location.state,
            location.country,
        ]
            .filter(Boolean)
            .join(", ") || internship.workMode || "Not specified";
    };

    const formatStipend = () => {
        const stipend = internship.stipend || {};

        if (!stipend.amount) return "Unpaid / Unspecified";

        return `${stipend.currency || "INR"} ${stipend.amount} / ${stipend.period || "unspecified"}`;
    };

    const severityStyles = {
        low: "bg-success/10 text-success",
        medium: "bg-amber-500/10 text-amber-600",
        high: "bg-red-500/10 text-red-600",
        critical: "bg-red-500/10 text-red-600",
    };

    const verificationStyles = {
        passed: "bg-success/10 text-success",
        failed: "bg-red-500/10 text-red-600",
    };

    return (
        <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
                    <div className="min-w-0">
                        <p className="font-ui text-[10px] font-bold uppercase tracking-wider text-primary">
                            Internship overview
                        </p>

                        <h2 className="mt-1 font-display text-xl font-bold text-text">
                            {internship.title}
                        </h2>

                        <p className="mt-1 font-ui text-xs text-text-secondary">
                            {internship.category} · {formatLocation()}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close details"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary hover:bg-surface-alt"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
                    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-xl bg-surface-alt p-3">
                            <p className="text-[10px] font-bold uppercase text-text-muted">
                                Listing status
                            </p>
                            <p className="mt-2 text-sm font-bold text-text">
                                {formatStatus(internship.status)}
                            </p>
                        </div>

                        <div className="rounded-xl bg-surface-alt p-3">
                            <p className="text-[10px] font-bold uppercase text-text-muted">
                                Applicants
                            </p>
                            <p className="mt-2 text-lg font-bold text-text">
                                {internship.applicantCount || 0}
                            </p>
                        </div>

                        <div className="rounded-xl bg-surface-alt p-3">
                            <p className="text-[10px] font-bold uppercase text-text-muted">
                                Stipend
                            </p>
                            <p className="mt-2 text-sm font-bold text-text">
                                {formatStipend()}
                            </p>
                        </div>

                        <div className="rounded-xl bg-surface-alt p-3">
                            <p className="text-[10px] font-bold uppercase text-text-muted">
                                Deadline
                            </p>
                            <p className="mt-2 text-sm font-bold text-text">
                                {formatDate(internship.applicationDeadline)}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-ui text-sm font-bold text-text">
                            Description
                        </h3>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-text-secondary">
                            {internship.description || "No description provided."}
                        </p>
                    </section>

                    <section className="grid gap-4 sm:grid-cols-2">
                        {[
                            {
                                title: "Required skills",
                                skills: internship.requiredSkills,
                                style: "bg-rose-soft text-primary",
                            },
                            {
                                title: "Preferred skills",
                                skills: internship.preferredSkills,
                                style: "bg-surface-alt text-text-secondary",
                            },
                        ].map((group) => (
                            <div key={group.title}>
                                <h3 className="font-ui text-xs font-bold text-text">
                                    {group.title}
                                </h3>

                                <div className="mt-2 flex flex-wrap gap-2">
                                    {group.skills?.length ? (
                                        group.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className={`rounded-full px-2.5 py-1 text-[11px] ${group.style}`}
                                            >
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-text-muted">
                                            Not specified
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="border-t border-border pt-5">
                        <h3 className="font-ui text-sm font-bold text-text">
                            Automated risk assessment
                        </h3>

                        <p className="mt-1 text-[11px] text-text-muted">
                            Latest saved assessment. Opening this panel does not rerun verification.
                        </p>

                        {assessment ? (
                            <div className="mt-4 space-y-4">
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    <div className="rounded-xl border border-border p-3">
                                        <p className="text-[10px] font-bold uppercase text-text-muted">
                                            Risk score
                                        </p>
                                        <p className="mt-1 text-2xl font-bold text-text">
                                            {assessment.score}
                                            <span className="text-xs text-text-muted">
                                                {" "}/ 100
                                            </span>
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-border p-3">
                                        <p className="text-[10px] font-bold uppercase text-text-muted">
                                            Severity
                                        </p>
                                        <span
                                            className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-bold ${severityStyles[assessment.severity] || "bg-surface-alt text-text"}`}
                                        >
                                            {formatStatus(assessment.severity)}
                                        </span>
                                    </div>

                                    <div className="rounded-xl border border-border p-3">
                                        <p className="text-[10px] font-bold uppercase text-text-muted">
                                            Decision
                                        </p>
                                        <p className="mt-2 text-sm font-bold text-text">
                                            {formatStatus(assessment.decision)}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-border p-3">
                                        <p className="text-[10px] font-bold uppercase text-text-muted">
                                            Assessed on
                                        </p>
                                        <p className="mt-2 text-xs font-semibold text-text">
                                            {formatDate(assessment.assessedAt)}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-ui text-xs font-bold text-text">
                                        Assessment reasons
                                    </h4>

                                    {assessment.reasons?.length ? (
                                        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-text-secondary">
                                            {assessment.reasons.map((reason, index) => (
                                                <li key={index}>{reason}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="mt-2 text-xs text-text-muted">
                                            No additional reasons recorded.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h4 className="font-ui text-xs font-bold text-text">
                                        Triggered rules
                                    </h4>

                                    {assessment.triggeredRules?.length ? (
                                        <div className="mt-2 space-y-2">
                                            {assessment.triggeredRules.map((rule, index) => (
                                                <div
                                                    key={`${rule.ruleId}-${index}`}
                                                    className="rounded-xl border border-border p-3"
                                                >
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <p className="text-xs font-bold text-text">
                                                            {rule.ruleId}
                                                        </p>

                                                        <span className="text-[10px] font-bold text-primary">
                                                            Weight: {rule.weight}
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 text-xs text-text-secondary">
                                                        {rule.description}
                                                    </p>

                                                    {rule.observed && (
                                                        <p className="mt-1 text-[11px] text-text-muted">
                                                            Observed: {String(rule.observed)}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="mt-2 text-xs text-text-muted">
                                            No risk rules were triggered.
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4 rounded-xl border border-dashed border-border bg-surface-alt p-5 text-center">
                                <p className="text-sm font-semibold text-text">
                                    No assessment available
                                </p>
                                <p className="mt-1 text-xs text-text-muted">
                                    No saved completed assessment was found.
                                </p>
                            </div>
                        )}

                        <div className="mt-5">
                            <h4 className="font-ui text-xs font-bold text-text">
                                Company verification checks
                            </h4>

                            {internship.verificationChecks?.length ? (
                                <div className="mt-2 space-y-2">
                                    {internship.verificationChecks.map((check) => (
                                        <div
                                            key={check.id}
                                            className="flex flex-col gap-2 rounded-xl border border-border p-3 sm:flex-row sm:items-start sm:justify-between"
                                        >
                                            <div>
                                                <p className="text-xs font-bold text-text">
                                                    {formatStatus(check.checkType)}
                                                </p>

                                                {check.notes && (
                                                    <p className="mt-1 text-xs leading-5 text-text-secondary">
                                                        {check.notes}
                                                    </p>
                                                )}

                                                {check.evidence && (
                                                    <p className="mt-1 break-all text-[10px] text-text-muted">
                                                        Evidence:{" "}
                                                        {typeof check.evidence === "string"
                                                            ? check.evidence
                                                            : JSON.stringify(check.evidence)}
                                                    </p>
                                                )}
                                            </div>

                                            <span
                                                className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-bold ${verificationStyles[check.status] || "bg-amber-500/10 text-amber-600"}`}
                                            >
                                                {formatStatus(check.status)}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                            ) : (
                                <p className="mt-2 text-xs text-text-muted">
                                    No verification records are linked to this assessment.
                                </p>
                            )}
                        </div>
                    </section>
                </div>

                <div className="flex justify-end border-t border-border px-5 py-4 sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-white hover:opacity-90"
                    >
                        Close details
                    </button>
                </div>
            </div>
        </div>
    );
}