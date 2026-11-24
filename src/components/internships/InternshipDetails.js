import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import MatchBadge from "./MatchBadge";
import SkillChips from "./SkillChips";
import InternshipMeta from "./InternshipMeta";

function ApplicantLabel({ count }) {
  return count >= 100 ? "100+ applicants" : "Below 100 applicants";
}

function DetailSection({ title, children }) {
  return (
    <section>
      <h3 className="font-ui text-[11px] font-bold uppercase tracking-wider text-text-muted mb-3">
        {title}
      </h3>
      {children}
    </section>
  );
}

function SkillSection({ title, skills = [] }) {
  if (!skills.length) return null;

  return (
    <DetailSection title={title}>
      <SkillChips skills={skills} size="sm" />
    </DetailSection>
  );
}

/**
 * Detailed view for the selected internship in the split discovery layout.
 */
export default function InternshipDetails({
  internship,
  userSkills = [],
  onToggleBookmark,
  onApply,
  isApplied = false,
}) {
  if (!internship) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-8 text-center">
        <p className="text-xs text-text-muted">
          Select an internship to view details
        </p>
      </div>
    );
  }

  const {
    id,
    role,
    company,
    companyDomain,
    category,
    location,
    workMode,
    duration,
    stipend,
    applicationDeadline,
    matchPercentage,
    applicationType,
    description,
    skills = [],
    preferredSkills = [],
    eligibility = {},
    isBookmarked,
    initials,
    postedTime,
    applicantsCount = 0,
  } = internship;

  const isEasyApply = applicationType === "Easy Apply";
  const degrees = eligibility.degrees || [];
  const graduationYears = eligibility.graduationYears || [];
  const otherRequirements = eligibility.otherRequirements || "";
  const minimumExperienceMonths = eligibility.minimumExperienceMonths;

  return (
  <div className="rounded-[var(--radius-lg)] border border-border bg-surface shadow-xs overflow-hidden">
    <div className="p-5 sm:p-6 border-b border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <Avatar
            name={company}
            initials={initials}
            size="lg"
            className="rounded-[var(--radius-md)] shrink-0"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
              <h2 className="font-ui font-extrabold text-lg sm:text-xl text-text leading-tight">
                {role}
              </h2>

              <div className="text-right shrink-0">
                <span className="font-number font-extrabold text-base sm:text-lg text-text whitespace-nowrap">
                  {stipend}
                </span>
                <span className="text-text-muted text-xs block font-ui">
                  Fixed Stipend
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {category && (
                <span className="font-ui text-sm text-text-secondary">
                  {category}
                </span>
              )}
              {category && (
                <span className="w-1 h-1 rounded-full bg-border-strong shrink-0" />
              )}
              <span className="font-ui font-medium text-sm text-text-secondary">
                {location}
              </span>
            </div>

            {companyDomain && (
              <p className="font-mono text-xs text-text-muted mt-1">
                {company} · {companyDomain}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-border/70">
        <InternshipMeta
          location={location}
          workMode={workMode}
          duration={duration}
          deadline={applicationDeadline}
        />

        <div className="mt-2 flex items-center gap-3 text-[11px] text-text-muted">
          <span>Posted {postedTime}</span>
          <span>•</span>
          <span><ApplicantLabel count={applicantsCount} /></span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 flex-wrap sm:flex-nowrap">
        <Button
          variant={isApplied ? "secondary" : "primary"}
          size="md"
          fullWidth
          disabled={isApplied}
          onClick={() => !isApplied && onApply?.(internship)}
        >
          {isApplied
            ? "Already Applied"
            : isEasyApply
              ? "Easy Apply"
              : "Apply on Company Website"}
        </Button>

        <Button
          variant={isBookmarked ? "soft" : "secondary"}
          size="md"
          className="sm:w-auto shrink-0"
          onClick={() => onToggleBookmark && onToggleBookmark(id)}
          icon={
            <svg
              className={`w-4 h-4 ${isBookmarked ? "fill-primary text-primary" : "text-text-secondary"}`}
              fill={isBookmarked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          }
        >
          {isBookmarked ? "Saved" : "Bookmark"}
        </Button>
      </div>
    </div>

    <div className="p-5 sm:p-6 space-y-7">
      <DetailSection title="About the Role">
        <div className="font-ui text-sm sm:text-base text-text-secondary leading-relaxed whitespace-pre-wrap break-words">
          {description || "No description provided."}
        </div>
      </DetailSection>

      <SkillSection title="Required Skills" skills={skills} />
      <SkillSection title="Preferred Skills" skills={preferredSkills} />

      {(degrees.length > 0 || graduationYears.length > 0 || minimumExperienceMonths !== null || otherRequirements) && (
        <DetailSection title="Eligibility">
          <div className="space-y-4">
            {degrees.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-text mb-2">Eligible Degrees</p>
                <div className="flex flex-wrap gap-2">
                  {degrees.map((degree) => (
                    <span key={degree} className="rounded-full border border-border bg-surface-alt px-3 py-1.5 text-xs text-text-secondary">
                      {degree}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {graduationYears.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-text mb-2">Graduation Years</p>
                <div className="flex flex-wrap gap-2">
                  {graduationYears.map((year) => (
                    <span key={year} className="rounded-full border border-border bg-surface-alt px-3 py-1.5 text-xs text-text-secondary">
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {minimumExperienceMonths !== null && minimumExperienceMonths !== undefined && (
              <div>
                <p className="text-xs font-semibold text-text mb-1">Minimum Experience</p>
                <p className="text-sm text-text-secondary">
                  {minimumExperienceMonths} months
                </p>
              </div>
            )}

            {otherRequirements && (
              <div>
                <p className="text-xs font-semibold text-text mb-1">Other Requirements</p>
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap break-words">
                  {otherRequirements}
                </p>
              </div>
            )}
          </div>
        </DetailSection>
      )}

      <section className="rounded-[var(--radius-md)] border border-border bg-surface-alt/40 p-3.5 text-xs text-text-muted">
        <div className="flex items-center gap-2 text-text font-medium mb-1">
          <svg
            className="w-4 h-4 text-text-muted shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <span>Application Method</span>
        </div>
        <p>
          {isEasyApply
            ? "Your InternCheck student profile and verified skills will be submitted directly to the employer's review portal without fee redirects."
            : `Applications for this position are hosted on ${companyDomain || "the company's website"}.`}
        </p>
      </section>
    </div>
  </div>
)};