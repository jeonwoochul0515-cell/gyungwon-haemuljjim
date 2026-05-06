import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "../../lib/cn";

const NAV = [
  { to: "/about", label: "브랜드" },
  { to: "/menu", label: "메뉴" },
  { to: "/stores", label: "매장찾기" },
  { to: "/franchise", label: "가맹문의", emphasize: true },
  { to: "/contact", label: "고객센터" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-brand-gray-line/60"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2 font-display font-extrabold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-red text-white text-sm shadow-card">
            慶
          </span>
          <span className="text-lg md:text-xl">
            경원<span className="text-brand-red">해물찜</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  item.emphasize
                    ? "bg-brand-red text-white hover:bg-brand-red-deep"
                    : isActive
                    ? "text-brand-red"
                    : "text-brand-ink/80 hover:text-brand-ink"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="tel:1522-3862"
            className="ml-2 hidden items-center gap-2 rounded-full border border-brand-ink/15 px-4 py-2 text-sm font-bold text-brand-ink transition-colors hover:border-brand-ink lg:inline-flex"
          >
            <Phone className="h-4 w-4" />
            1522-3862
          </a>
        </nav>

        <button
          aria-label="메뉴"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full bg-brand-ink/5 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-brand-gray-line bg-white transition-[max-height] duration-300",
          open ? "max-h-[420px]" : "max-h-0"
        )}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-4 py-3 text-base font-semibold",
                  item.emphasize
                    ? "bg-brand-red text-white"
                    : isActive
                    ? "bg-brand-red-soft text-brand-red"
                    : "text-brand-ink hover:bg-brand-ink/5"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="tel:1522-3862"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-brand-ink/15 px-4 py-3 text-base font-bold text-brand-ink"
          >
            <Phone className="h-4 w-4" />
            본사 1522-3862
          </a>
        </div>
      </div>
    </header>
  );
}
