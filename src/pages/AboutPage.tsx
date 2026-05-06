import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Sparkles, ShieldCheck, Compass } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { DishPlaceholder } from "../components/ui/DishPlaceholder";

const VALUES = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "신선",
    body: "그날의 해산물을 본사에서 직접 손질해 매일 가맹점으로 공급합니다.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "정성",
    body: "콩나물 한 줄기, 양념 한 스푼까지 — 어머니의 손맛을 매장 매뉴얼로 표준화했습니다.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "신뢰",
    body: "본점부터 모든 가맹점까지 동일한 식자재·동일한 양념으로 같은 맛을 약속합니다.",
  },
  {
    icon: <Compass className="h-5 w-5" />,
    title: "동행",
    body: "가맹점주는 우리의 가족. 상권 분석부터 운영까지 본사가 함께 갑니다.",
  },
];

const TIMELINE = [
  { year: "2020.03", title: "사림동 본점 오픈", body: "경상남도 창원시 의창구 사림로에서 첫 매장 시작." },
  { year: "2021", title: "경남 권역 확장", body: "진주·김해·통영·거제 등 경남 주요 도시로 가맹점 확대." },
  { year: "2023", title: "부산·광주 진출", body: "부산 화명·반여, 광주 임호점 등 광역시 진출." },
  { year: "2024", title: "30개점 돌파", body: "전국 30개 가맹점 운영 체계 구축, 식자재 공급망 정비." },
  { year: "2026", title: "본사 가맹사업 본격화", body: "공식 홈페이지 오픈 및 신규 상권 모집 강화." },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>브랜드 스토리 — 경원해물찜</title>
        <meta
          name="description"
          content="2020년 경상남도 창원시 사림동에서 시작된 경원해물찜의 6년의 여정. 김경희 대표의 인사말과 브랜드 핵심 가치."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-brand-cream pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="container-x">
          <Reveal>
            <span className="heading-eyebrow">OUR STORY</span>
            <h1 className="font-display text-display-xl font-extrabold text-balance text-brand-ink">
              한 그릇의 정성으로
              <br />
              <span className="text-brand-red">6년</span>을 이어온 이야기.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-brand-ink/75 md:text-lg">
              2020년 봄, 경상남도 창원시 사림동의 작은 가게에서 경원해물찜이 시작됐습니다.
              "내 가족에게 내놓을 수 있는 한 그릇" — 그 한 가지 원칙이 지금의 30+ 가맹점이
              되었습니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CEO message */}
      <section className="section bg-white">
        <div className="container-x grid items-center gap-12 md:grid-cols-5">
          <Reveal className="md:col-span-2">
            <DishPlaceholder
              label="김경희 대표"
              variant="dark"
              className="aspect-[4/5] w-full"
            />
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3">
            <span className="heading-eyebrow">CEO MESSAGE</span>
            <h2 className="font-display text-display-md font-extrabold text-brand-ink">
              "우리 식구가 먹는 음식이라 생각하고 만듭니다."
            </h2>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-brand-ink/75 md:text-lg">
              <p>
                안녕하세요, 경원해물찜 대표 김경희입니다.
              </p>
              <p>
                2020년 사림동의 작은 가게에서 시작했을 때, 저는 한 가지만 약속했습니다.
                <strong className="text-brand-ink">"내가 내 가족에게 내놓을 수 있는 음식만 손님께 드린다."</strong>
              </p>
              <p>
                해물찜은 단순한 한 그릇이 아닙니다. 어머니가 차려주시던 푸짐한 한 상의 기억이고,
                가족이 둘러앉아 나누는 따뜻한 시간입니다. 그 가치를 지키기 위해 본사가 직접
                식자재를 손질하고 가맹점에 공급합니다.
              </p>
              <p>
                지금 30개가 넘는 매장이 함께 합니다. 각 매장의 사장님 한 분 한 분이 우리 가족이고,
                여러분 한 분 한 분이 우리의 자부심입니다.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-red text-white font-bold">
                金
              </div>
              <div>
                <div className="font-bold text-brand-ink">김경희</div>
                <div className="text-sm text-brand-gray">경원해물찜 대표</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-brand-cream">
        <div className="container-x">
          <Reveal>
            <span className="heading-eyebrow">CORE VALUES</span>
            <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
              우리가 지키는 네 가지
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="card-soft h-full p-7">
                  <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-brand-red text-white">
                    {v.icon}
                  </div>
                  <div className="mb-2 font-display text-2xl font-extrabold text-brand-ink">
                    {v.title}
                  </div>
                  <p className="text-sm leading-relaxed text-brand-ink/70">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <span className="heading-eyebrow">JOURNEY</span>
            <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
              6년의 여정
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-[160px_1fr]">
            <div className="hidden md:block" />
            <div className="relative">
              <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-brand-gray-line md:left-[-100px]" />
              <ul className="space-y-10">
                {TIMELINE.map((t, i) => (
                  <Reveal key={t.year} delay={i * 0.05}>
                    <li className="relative pl-8 md:pl-0">
                      <span className="absolute -left-1 top-2 h-3 w-3 rounded-full bg-brand-red md:left-[-104px]" />
                      <div className="font-display text-sm font-bold uppercase tracking-widest text-brand-red md:absolute md:-left-[160px] md:top-1.5">
                        {t.year}
                      </div>
                      <h3 className="font-display text-xl font-extrabold text-brand-ink">
                        {t.title}
                      </h3>
                      <p className="mt-2 text-brand-ink/70">{t.body}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-ink text-white">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="font-display text-display-lg font-extrabold text-balance">
              더 많은 동네에서, 같은 맛으로.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              경원해물찜은 지금도 함께할 가맹점주를 찾고 있습니다.
              검증된 맛과 본사 시스템으로 안정적인 출발을 약속합니다.
            </p>
            <Link to="/franchise" className="btn btn-lg btn-primary mt-8">
              창업 상담 신청
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
