import Link from "next/link";

export default function PublicPage({ eyebrow="INTERNCHECK", title, description, updated="PLATFORM INFORMATION", sections=[], children, notice }) {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-rose/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="perspective-grid absolute inset-0 opacity-30" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex items-center gap-2 font-mono text-[11px] text-text-muted">
          <Link href="/" className="transition hover:text-primary">HOME</Link><span>/</span>
          <span className="text-primary">INTERNCHECK</span><span>/</span><span>{eyebrow.toUpperCase()}</span>
        </div>
        <section className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-sm sm:p-10 lg:p-12">
          <div className="absolute right-0 top-0 h-full w-1.5 bg-primary" />
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-rose-soft/60 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-mono text-[10px] font-medium tracking-wider text-primary">{eyebrow.toUpperCase()}</span>
          </div>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-rose">INTERNCHECK / {eyebrow.toUpperCase()}</p>
          <h1 className="font-display text-4xl tracking-tight text-text sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">{description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
            <div><p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Last updated</p><p className="mt-1 text-sm font-semibold text-text">24 November 2026</p></div>
            <div className="h-8 w-px bg-border" />
            <div><p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Document</p><p className="mt-1 text-sm font-semibold text-text">{eyebrow}</p></div>
            <div className="h-8 w-px bg-border" />
            <div><p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Sections</p><p className="mt-1 font-number text-sm font-semibold text-text">{String(sections.length).padStart(2,"0")}</p></div>
          </div>
        </section>
        {notice && <div className="mb-8 flex gap-3 rounded-xl border border-warning/20 bg-warning-bg/50 p-4"><span className="mt-0.5 text-warning">ⓘ</span><p className="text-xs leading-6 text-text-secondary">{notice}</p></div>}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-8">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between"><h2 className="font-ui text-sm font-extrabold text-text">On this page</h2><span className="font-mono text-[10px] text-text-muted">INDEX</span></div>
              <nav className="max-h-[65vh] space-y-1 overflow-y-auto pr-2">
                {sections.map((s,i)=><a key={s.id} href={`#${s.id}`} className="group flex items-start gap-3 rounded-lg px-3 py-2.5 text-xs text-text-secondary transition hover:bg-rose-soft/50 hover:text-primary"><span className="font-mono text-[10px] text-text-muted group-hover:text-primary">{String(i+1).padStart(2,"0")}</span><span>{s.title}</span></a>)}
              </nav>
              <div className="mt-5 border-t border-border pt-4"><p className="text-xs leading-5 text-text-muted">Need assistance with this page?</p><Link href="/support" className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">Contact Support ↗</Link></div>
            </div>
          </aside>
          <article className="min-w-0 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-9 lg:p-10">
            <div className="mb-8 border-b border-border pb-6"><p className="font-mono text-[10px] tracking-[0.2em] text-rose">INTERNCHECK / {eyebrow.toUpperCase()}</p><h2 className="mt-3 font-display text-2xl text-text sm:text-3xl">Everything you need to know.</h2><p className="mt-3 text-sm leading-7 text-text-secondary">{description}</p></div>
            {children}
            <div className="space-y-9">
              {sections.map((s,i)=><section key={s.id} id={s.id} className="scroll-mt-10 border-b border-border pb-8 last:border-0 last:pb-0">
                <h3 className="font-ui text-base font-extrabold tracking-tight text-text sm:text-lg">{i+1}. {s.title}</h3>
                <div className="mt-4 space-y-3">{(s.content||[]).map((p,j)=><p key={j} className="text-sm leading-7 text-text-secondary">{p}</p>)}</div>
                {s.bullets && <ul className="mt-4 space-y-3">{s.bullets.map((b,j)=><li key={j} className="flex items-start gap-3 text-sm leading-6 text-text-secondary"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose"/>{b}</li>)}</ul>}
              </section>)}
            </div>
            <div className="mt-10 rounded-xl border border-primary/15 bg-rose-soft/30 p-5"><p className="font-ui text-sm font-bold text-text">Thank you for being part of InternCheck.</p><p className="mt-2 text-xs leading-6 text-text-secondary">We believe better information leads to better career decisions. Help us maintain a transparent and respectful internship community.</p></div>
          </article>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4">
          <Link href="/" className="text-sm font-semibold text-text-secondary transition hover:text-primary">← Back to Home</Link>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-text-muted"><Link href="/terms" className="hover:text-primary">Terms</Link><Link href="/privacy" className="hover:text-primary">Privacy</Link><Link href="/cookies" className="hover:text-primary">Cookies</Link><Link href="/support" className="hover:text-primary">Support</Link></div>
        </div>
      </div>
    </main>
  );
}
