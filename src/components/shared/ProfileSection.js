export default function ProfileSection({ title, description, children }) {
  return (
    <section className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
      <div className="border-b border-border px-5 py-5 sm:px-6">
        <h2 className="font-display text-lg font-bold text-text">{title}</h2>
        <p className="mt-1 font-ui text-xs text-text-muted">{description}</p>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}
