export function AccountSkeleton() {
  return (
    <div className="flex items-center gap-2.5 px-1 py-1" aria-label="Loading account">
      <div className="h-9 w-9 animate-pulse rounded-full bg-surface-alt" />
      <div className="hidden space-y-2 sm:block">
        <div className="h-2.5 w-20 animate-pulse rounded bg-surface-alt" />
        <div className="h-2 w-12 animate-pulse rounded bg-surface-alt" />
      </div>
      <div className="h-3 w-3 animate-pulse rounded bg-surface-alt" />
    </div>
  );
}

export function NavigationSkeleton({ recruiter = false }) {
  const items = recruiter
    ? ["Dashboard", "Internships", "Applications", "Feedback"]
    : ["Home", "Browse Internships", "Student Experiences", "My Bookmarks", "My Feedback", "Applications"];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-between px-3 py-4" aria-label="Loading navigation">
      <div>
        <div className="mb-5 ml-3 h-2.5 w-20 animate-pulse rounded bg-surface-alt" />
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-xl px-3 py-3">
              <div className="h-5 w-5 animate-pulse rounded-md bg-surface-alt" />
              <div className={`h-2.5 animate-pulse rounded bg-surface-alt ${index % 2 ? "w-32" : "w-24"}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-border bg-surface p-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 animate-pulse rounded-lg bg-surface-alt" />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 w-24 animate-pulse rounded bg-surface-alt" />
            <div className="h-2 w-16 animate-pulse rounded bg-surface-alt" />
          </div>
        </div>
        <div className="mt-3 h-2 w-3/4 animate-pulse rounded bg-surface-alt" />
      </div>
    </div>
  );
}
