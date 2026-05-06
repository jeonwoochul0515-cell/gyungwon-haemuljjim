import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { MapPin, Phone, Clock, Search, ShieldCheck } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { stores, regionGroups, type Region } from "../data/stores";
import { cn } from "../lib/cn";

export default function StoresPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Region>("all");

  const filtered = useMemo(() => {
    return stores.filter((s) => {
      if (filter !== "all" && s.region !== filter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        (s.addressLot ?? "").toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: stores.length };
    stores.forEach((s) => {
      map[s.region] = (map[s.region] ?? 0) + 1;
    });
    return map;
  }, []);

  return (
    <>
      <Helmet>
        <title>매장 찾기 — 경원해물찜</title>
        <meta
          name="description"
          content="전국 30+ 경원해물찜 매장. 지역별 필터와 검색으로 가까운 매장을 찾아보세요."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-cream pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-x">
          <Reveal>
            <span className="heading-eyebrow">FIND A STORE</span>
            <h1 className="font-display text-display-xl font-extrabold text-balance text-brand-ink">
              전국 <span className="text-brand-red">{stores.length}+</span>개 매장
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-brand-ink/75 md:text-lg">
              경남 전역과 부산·광주·전남까지. 가까운 매장에서 같은 맛을 만나보세요.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Search + filter */}
      <section className="sticky top-16 z-40 border-y border-brand-gray-line bg-white/90 backdrop-blur md:top-20">
        <div className="container-x py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="점포명 또는 지역 검색"
                className="input pl-10"
              />
            </div>
            <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
              <div className="flex gap-2 pb-1 md:pb-0">
                <FilterChip
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                  label="전체"
                  count={counts.all}
                />
                {regionGroups.map((g) => (
                  <FilterChip
                    key={g.id}
                    active={filter === g.id}
                    onClick={() => setFilter(g.id)}
                    label={g.label}
                    count={counts[g.id] ?? 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="section-tight bg-brand-cream">
        <div className="container-x">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-brand-ink/60">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s, i) => (
                <Reveal key={s.slug} delay={Math.min(i * 0.03, 0.4)}>
                  <article
                    id={s.slug}
                    className="card-soft flex h-full flex-col p-6"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="badge">
                        {s.region.replace("경남-", "")}
                      </span>
                      {s.verified === "본사" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-gold-soft px-2.5 py-0.5 text-[10px] font-bold text-brand-ink">
                          <ShieldCheck className="h-3 w-3" />
                          본사 검수
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-extrabold text-brand-ink">
                      {s.name}
                    </h3>

                    <ul className="mt-4 space-y-2.5 text-sm text-brand-ink/75">
                      <li className="flex gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                        <span>{s.address}</span>
                      </li>
                      {s.phone && (
                        <li className="flex gap-2">
                          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                          <a href={`tel:${s.phone.replace(/-/g, "")}`} className="hover:text-brand-red">
                            {s.phone}
                          </a>
                        </li>
                      )}
                      {(s.hours || s.closed) && (
                        <li className="flex gap-2">
                          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                          <span>
                            {s.hours}
                            {s.break && (
                              <span className="block text-xs text-brand-gray">
                                브레이크 {s.break}
                              </span>
                            )}
                            {s.closed && (
                              <span className="block text-xs text-brand-gray">
                                {s.closed} 휴무
                              </span>
                            )}
                          </span>
                        </li>
                      )}
                    </ul>

                    {s.phone && (
                      <a
                        href={`https://map.naver.com/p/search/${encodeURIComponent(
                          "경원해물찜 " + s.name
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-md btn-outline mt-5 w-full"
                      >
                        지도에서 보기
                      </a>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footnote */}
      <section className="bg-white py-12">
        <div className="container-x">
          <div className="rounded-2xl bg-brand-cream p-6 text-sm text-brand-ink/70 md:p-8">
            <strong className="text-brand-ink">매장 정보 안내.</strong>{" "}
            매장 사정에 따라 영업시간·휴무일이 변동될 수 있습니다. 방문 전 매장으로 직접
            확인해 주세요. 일부 신규/이전 매장은 본사로 문의(1522-3862) 부탁드립니다.
          </div>
        </div>
      </section>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
        active
          ? "bg-brand-red text-white shadow-card"
          : "bg-brand-ink/5 text-brand-ink/70 hover:bg-brand-ink/10"
      )}
    >
      {label}
      <span
        className={cn(
          "ml-2 rounded-full px-1.5 text-[10px] tabular",
          active ? "bg-white/20" : "bg-brand-ink/10"
        )}
      >
        {count}
      </span>
    </button>
  );
}
