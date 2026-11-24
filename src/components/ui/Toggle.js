export default function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="min-w-0">
        <p className="font-ui text-sm font-semibold text-text">{label}</p>
        <p className="mt-1 font-ui text-xs leading-5 text-text-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-label={label}
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 flex-none rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${checked ? "bg-primary" : "bg-[#D8CDD2]"}`}
      >
        <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}
