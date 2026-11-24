export default function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  required = false,
  variant = "default",
}) {
  const inputClassName = variant === "student"
    ? "w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    : "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text transition-all placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-70";

  return (
    <label className="block space-y-2">
      <span className="font-ui text-xs font-semibold text-text-secondary">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </span>
      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClassName}
      />
    </label>
  );
}
