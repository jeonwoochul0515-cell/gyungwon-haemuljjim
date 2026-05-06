import { cn } from "../../lib/cn";

interface DishPlaceholderProps {
  label?: string;
  className?: string;
  variant?: "red" | "dark" | "cream";
}

/**
 * 메뉴 사진을 받기 전까지 사용할 placeholder.
 * 실제 사진을 받으면 <img> 로 교체.
 */
export function DishPlaceholder({
  label = "사진 준비중",
  className,
  variant = "red",
}: DishPlaceholderProps) {
  const palette = {
    red: "from-brand-red to-brand-red-deep text-white/85",
    dark: "from-brand-charcoal to-brand-ink text-white/85",
    cream: "from-brand-gold-soft to-brand-cream text-brand-ink/70",
  }[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br",
        palette,
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-15 mix-blend-overlay"
      >
        <defs>
          <radialGradient id="g1" cx="30%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#g1)" />
      </svg>

      {/* 김 (steam) 모티프 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-1/2 flex justify-center gap-3">
        <span
          className="block h-12 w-1 rounded-full bg-white/20 blur-sm animate-steam"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="block h-16 w-1 rounded-full bg-white/25 blur-sm animate-steam"
          style={{ animationDelay: "0.6s" }}
        />
        <span
          className="block h-10 w-1 rounded-full bg-white/20 blur-sm animate-steam"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      <div className="relative flex h-full min-h-[180px] flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="text-3xl font-display font-extrabold tracking-tight">
          慶
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
          {label}
        </span>
      </div>
    </div>
  );
}
