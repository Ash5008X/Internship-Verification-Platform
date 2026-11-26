"use client";

import { useEffect } from "react";

export default function RouteError({ error, reset, title = "Something went wrong", description = "We couldn't load this page right now. Please try again." }) {
  useEffect(() => {
    if (error) console.error("InternCheck route error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[65vh] w-full items-center justify-center bg-background px-4 py-10 sm:px-6">
      <section role="alert" className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 text-center shadow-sm sm:p-9">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-soft text-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M10.3 3.9 2.7 17.2A2 2 0 0 0 4.4 20h15.2a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          </svg>
        </div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">InternCheck · Error</p>
        <h1 className="font-display text-2xl font-bold text-text sm:text-3xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-text-muted">{description}</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => reset()} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Try again</button>
          <button type="button" onClick={() => window.location.reload()} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Reload page</button>
        </div>
      </section>
    </main>
  );
}
