import { cn } from "../../lib/cn";

interface StatProps {
  value: string;
  label: string;
  hint?: string;
  className?: string;
}

export function Stat({ value, label, hint, className }: StatProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-2xl border border-brand-gray-line/70 bg-white p-5 md:p-6",
        className
      )}
    >
      <span className="font-display text-3xl font-extrabold tracking-tight text-brand-ink md:text-4xl tabular">
        {value}
      </span>
      <span className="text-sm font-semibold text-brand-ink/85">{label}</span>
      {hint && <span className="text-xs text-brand-gray">{hint}</span>}
    </div>
  );
}
