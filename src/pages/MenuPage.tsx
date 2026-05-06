import { Helmet } from "react-helmet-async";
import { Reveal } from "../components/ui/Reveal";
import { DishPlaceholder } from "../components/ui/DishPlaceholder";
import { signature, sides, banchan, spicyLevels } from "../data/menu";
import { Flame, Info } from "lucide-react";

export default function MenuPage() {
  return (
    <>
      <Helmet>
        <title>메뉴 — 경원해물찜</title>
        <meta
          name="description"
          content="경원해물찜의 시그니처 해물찜·아구찜·섞어찜과 사이드. 매장별로 가격은 일부 다를 수 있습니다."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-cream pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-x">
          <Reveal>
            <span className="heading-eyebrow">MENU</span>
            <h1 className="font-display text-display-xl font-extrabold text-balance text-brand-ink">
              한 그릇에 담은
              <br />
              <span className="text-brand-red">그날의 바다</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-brand-ink/75 md:text-lg">
              본사가 직접 손질해 매일 공급하는 신선한 해산물과 아삭한 콩나물.
              매장별로 가격과 구성은 일부 차이가 있을 수 있습니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Signature */}
      <section className="section-tight bg-white">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-display-md font-extrabold text-brand-ink">
              시그니처
            </h2>
            <p className="mt-2 text-brand-ink/65">
              경원해물찜의 정체성. 큰 사이즈일수록 해산물이 더 풍성해집니다.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {signature.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.06}>
                <article className="card-soft overflow-hidden">
                  <DishPlaceholder
                    label={m.name}
                    variant={i % 2 === 0 ? "red" : "dark"}
                    className="aspect-[16/10] w-full rounded-none"
                  />
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-2xl font-extrabold text-brand-ink">
                        {m.name}
                      </h3>
                      {m.badge && (
                        <span className="badge bg-brand-gold-soft text-brand-ink">
                          {m.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-brand-ink/70">{m.description}</p>

                    {m.prices && (
                      <div className="mt-5 grid grid-cols-3 gap-2">
                        {m.prices.map((p) => (
                          <div
                            key={p.label}
                            className="rounded-xl border border-brand-gray-line bg-white p-3 text-center"
                          >
                            <div className="text-xs text-brand-gray">{p.label}</div>
                            {p.serves && (
                              <div className="text-[10px] text-brand-gray">{p.serves}</div>
                            )}
                            <div className="mt-1 font-display text-lg font-extrabold text-brand-ink tabular">
                              {p.price.toLocaleString()}
                              <span className="text-xs font-normal text-brand-gray">원</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Spicy guide */}
      <section className="section bg-brand-cream">
        <div className="container-x">
          <Reveal>
            <div className="mb-10 flex items-center gap-3">
              <Flame className="h-6 w-6 text-brand-red" />
              <h2 className="font-display text-display-md font-extrabold text-brand-ink">
                맵기는 5단계로 조절됩니다
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-5">
            {spicyLevels.map((s, i) => (
              <Reveal key={s.level} delay={i * 0.05}>
                <div
                  className="rounded-2xl p-5 text-brand-ink"
                  style={{ background: s.color }}
                >
                  <div className="font-display text-3xl font-extrabold tabular">
                    {s.level}
                  </div>
                  <div className="mt-2 text-base font-bold">{s.name}</div>
                  <div className="mt-1 text-xs text-brand-ink/65">{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sides + banchan */}
      <section className="section-tight bg-white">
        <div className="container-x grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <Reveal>
              <h2 className="font-display text-display-md font-extrabold text-brand-ink">
                사이드 메뉴
              </h2>
              <p className="mt-2 text-brand-ink/65">
                해물찜과 함께 즐기면 더 좋은 사이드. 마무리 볶음밥은 절대 빼놓지 마세요.
              </p>
            </Reveal>
            <div className="mt-8 divide-y divide-brand-gray-line">
              {sides.map((s) => (
                <div
                  key={s.slug}
                  className="flex items-center justify-between gap-6 py-5"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-brand-ink">{s.name}</h3>
                      {s.badge && (
                        <span className="badge bg-brand-red text-white">{s.badge}</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-brand-ink/65">{s.description}</p>
                  </div>
                  {s.price !== undefined && (
                    <div className="font-display text-xl font-extrabold text-brand-ink tabular shrink-0">
                      {s.price.toLocaleString()}
                      <span className="text-xs text-brand-gray">원</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="font-display text-display-md font-extrabold text-brand-ink">
                기본 반찬
              </h2>
              <p className="mt-2 text-brand-ink/65">
                매장에서 무료로 제공됩니다.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {banchan.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 rounded-xl border border-brand-gray-line bg-brand-cream px-4 py-3"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-red text-white text-xs">
                    ✓
                  </span>
                  <span className="font-semibold text-brand-ink">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-brand-cream py-12">
        <div className="container-x">
          <div className="flex items-start gap-3 rounded-2xl bg-white p-5 text-sm text-brand-ink/70 md:p-6">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
            <div>
              <strong className="text-brand-ink">사진과 실제 메뉴는 다를 수 있습니다.</strong>{" "}
              지점별 가격·구성·옵션은 매장 사정에 따라 일부 차이가 있을 수 있으며, 정확한 사항은
              매장으로 직접 문의해 주세요.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
