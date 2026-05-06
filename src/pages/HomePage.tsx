import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, MapPin, Sparkles, Users, Award } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { Stat } from "../components/ui/Stat";
import { DishPlaceholder } from "../components/ui/DishPlaceholder";
import { signature } from "../data/menu";
import { stores } from "../data/stores";

export default function HomePage() {
  const storeCount = stores.length;
  const cityCount = new Set(
    stores.map((s) => s.region.replace("경남-", ""))
  ).size;

  return (
    <>
      <Helmet>
        <title>경원해물찜 — 경남에서 시작된 해물찜·아구찜의 명가</title>
        <meta
          name="description"
          content="2020년 사림동에서 시작된 경원해물찜. 본사가 직접 식자재를 공급하는 가맹 시스템으로 전국 30+ 가맹점을 운영합니다. 맵기 5단계, 마무리는 시그니처 볶음밥."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-cream to-white pt-12 pb-20 md:pt-20 md:pb-32">
        {/* deco */}
        <div className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-brand-red-soft blur-3xl md:h-96 md:w-96" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-gold-soft blur-3xl md:h-96 md:w-96" />

        <div className="container-x relative grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <span className="badge">
              <Sparkles className="h-3.5 w-3.5" />
              SINCE 2020 · CHANGWON
            </span>
            <h1 className="mt-4 font-display text-display-xl font-extrabold text-balance text-brand-ink">
              경남이 인정한
              <br />
              <span className="text-brand-red">해물찜·아구찜</span>의 맛.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-brand-ink/75 md:text-lg">
              그날의 신선한 해산물과 아삭한 콩나물 한 가득.
              <br className="hidden md:block" />
              본사가 직접 식자재를 공급해 어느 매장에서든 같은 맛을 약속합니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu" className="btn btn-lg btn-primary">
                메뉴 보기
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/stores" className="btn btn-lg btn-outline">
                <MapPin className="h-5 w-5" />
                가까운 매장 찾기
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md">
              <Stat value={`${storeCount}+`} label="전국 가맹점" hint="2026년 기준" />
              <Stat value="6년" label="브랜드 운영" hint="2020.03~" />
              <Stat value="5단계" label="맵기 조절" hint="순한맛~매운맛" />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <DishPlaceholder
                label="시그니처 해물찜"
                variant="red"
                className="aspect-[4/5] w-full"
              />
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-4 shadow-card md:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-red text-white">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-brand-gray">시그니처</div>
                    <div className="font-bold text-brand-ink">아삭한 콩나물 + 신선 해물</div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-brand-ink p-4 text-white shadow-card md:block">
                <div className="text-xs text-white/60">평균 평점</div>
                <div className="font-display text-2xl font-extrabold tabular">★ 4.5 / 5.0</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <span className="heading-eyebrow">우리의 약속</span>
              <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                왜 경원해물찜인가
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-brand-ink/70">
                같은 양념, 같은 식자재, 같은 매뉴얼. 본점부터 30개 가맹점까지 — 어디서 드셔도 그 맛이
                흔들리지 않도록 본사가 직접 공급하고 관리합니다.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "신선한 식자재 직공급",
                body:
                  "경남 본사에서 매일 신선한 해산물과 콩나물을 직접 손질해 가맹점으로 공급합니다.",
              },
              {
                icon: <Flame className="h-6 w-6" />,
                title: "맵기 5단계 표준화",
                body:
                  "안 매워요부터 아주 매워요까지 — 손님 한 분 한 분의 입맛에 맞게 조절합니다.",
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: "6년 경력의 본사 노하우",
                body:
                  "2020년 사림동에서 시작해 지금은 전국 30+ 점포. 검증된 맛과 운영 시스템.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="card-soft h-full p-7">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-red-soft text-brand-red">
                    {c.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-brand-ink">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-ink/70">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature menus */}
      <section className="section bg-brand-cream">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="heading-eyebrow">SIGNATURE</span>
                <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                  시그니처 메뉴
                </h2>
              </div>
              <Link to="/menu" className="btn btn-md btn-ghost">
                전체 메뉴 보기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {signature.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.08}>
                <div className="card-soft overflow-hidden">
                  <DishPlaceholder
                    label={item.name}
                    variant={i % 2 === 0 ? "red" : "dark"}
                    className="aspect-[4/3] w-full rounded-none"
                  />
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-brand-ink">{item.name}</h3>
                      {item.badge && (
                        <span className="badge bg-brand-gold-soft text-brand-ink">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="line-clamp-2 text-sm text-brand-ink/65">{item.description}</p>
                    {item.prices && (
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-display text-xl font-extrabold text-brand-red tabular">
                          {item.prices[0].price.toLocaleString()}
                        </span>
                        <span className="text-xs text-brand-gray">
                          원 ~ {item.prices[item.prices.length - 1].price.toLocaleString()}원
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stores */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="heading-eyebrow">STORES</span>
                <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                  가까운 매장을 찾아보세요
                </h2>
                <p className="mt-3 max-w-xl text-pretty text-brand-ink/70">
                  창원·김해·진주·통영·거제·부산·광주까지, 우리 동네 경원해물찜.
                </p>
              </div>
              <Link to="/stores" className="btn btn-md btn-ghost">
                전체 매장 보기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
            {stores.slice(0, 8).map((store, i) => (
              <Reveal key={store.slug} delay={i * 0.04}>
                <Link
                  to={`/stores#${store.slug}`}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-brand-gray-line bg-white p-5 transition-all hover:border-brand-red hover:shadow-card"
                >
                  <span className="text-xs font-bold text-brand-red">
                    {store.region.replace("경남-", "")}
                  </span>
                  <span className="text-base font-bold text-brand-ink">
                    {store.name}
                  </span>
                  <span className="line-clamp-1 text-sm text-brand-ink/60">
                    {store.address}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-brand-cream p-6 text-sm text-brand-ink/75 md:p-8">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-brand-red" />
              <span className="font-semibold text-brand-ink">
                현재 약 {storeCount}개점 운영 · {cityCount}개 도시
              </span>
            </div>
            <p className="mt-2">
              가맹점은 본사가 식자재를 직접 공급하며 동일한 매뉴얼로 운영됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* Franchise CTA */}
      <section className="section bg-brand-ink text-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-red blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-gold blur-3xl" />
        </div>
        <div className="container-x relative">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Reveal>
              <span className="badge bg-brand-red text-white">
                FRANCHISE
              </span>
              <h2 className="mt-4 font-display text-display-lg font-extrabold text-balance">
                30+ 가맹점이 선택한
                <br />
                검증된 외식 브랜드
              </h2>
              <p className="mt-5 max-w-lg text-pretty text-white/75 md:text-lg">
                본사 식자재 직공급 · 5단계 맵기 표준 · 6년의 운영 노하우.
                <br />
                지역별 상권을 본사가 직접 분석해 드립니다.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/franchise" className="btn btn-lg btn-primary">
                  창업 상담 신청
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="tel:1522-3862"
                  className="btn btn-lg btn-outline border-white/30 text-white hover:bg-white hover:text-brand-ink"
                >
                  본사 1522-3862
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
                  <div className="text-xs text-white/50">예상 창업비용</div>
                  <div className="mt-2 font-display text-3xl font-extrabold tabular">
                    7,992<span className="text-base text-white/60">만원~</span>
                  </div>
                  <div className="mt-2 text-xs text-white/55">
                    *33㎡ 기준, 본사 상담 시 정확한 비용 안내
                  </div>
                </div>
                <div className="rounded-2xl bg-brand-red p-6">
                  <div className="text-xs text-white/70">현재 모집 지역</div>
                  <div className="mt-2 font-display text-3xl font-extrabold">한정</div>
                  <div className="mt-2 text-xs text-white/80">
                    상권 보호를 위해 지역별 모집 인원을 제한합니다.
                  </div>
                </div>
                <div className="col-span-2 rounded-2xl bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-brand-gold" />
                    <span className="font-semibold">왜 지금이 적기인가요?</span>
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    본사는 안정적인 식자재 공급망을 갖추고 가맹사업을 본격 확장 중입니다.
                    부산·광주·전남까지 진출했으며, 현재 인접 신도시 상권 우선 검토 단계입니다.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
