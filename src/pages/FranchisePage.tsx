// 가맹문의 페이지 — 설득 심리학(Cialdini 6+1, Kahneman 손실회피, StoryBrand 등) 적용
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ShieldCheck,
  TrendingUp,
  Building2,
  ClipboardCheck,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  Send,
  AlertCircle,
  ArrowRight,
  Flame,
  Users,
  Quote,
  ChevronDown,
  Clock,
  Award,
  Truck,
  HandCoins,
  Star,
  XCircle,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { stores } from "../data/stores";

import bgDuo from "../assets/bg-duo.jpg";
import heroHaemul from "../assets/hero-haemul.jpg";
import shrimpAction from "../assets/shrimp-action.jpg";
import wokFire from "../assets/wok-fire.jpg";

const formSchema = z.object({
  name: z.string().min(1, "이름을 입력해 주세요"),
  phone: z
    .string()
    .min(9, "정확한 연락처를 입력해 주세요")
    .regex(/^[0-9-+ ()]+$/, "숫자만 입력해 주세요"),
  region: z.string().min(1, "희망 지역을 입력해 주세요"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
  agree: z
    .boolean()
    .refine((v) => v === true, { message: "개인정보 수집·이용에 동의해 주세요" }),
});
type FormValues = z.infer<typeof formSchema>;

export default function FranchisePage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    // Default Nudge — 가장 일반적인 자금 규모를 기본 선택
    defaultValues: { budget: "1~2억", timeline: "3개월 이내" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const endpoint = (import.meta as any).env?.VITE_FORM_ENDPOINT;
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, source: "franchise-form" }),
        });
      } else {
        const subject = encodeURIComponent("[경원해물찜] 가맹 상담 요청");
        const body = encodeURIComponent(
          `이름: ${values.name}\n연락처: ${values.phone}\n희망지역: ${values.region}\n예상 자금: ${values.budget ?? "미입력"}\n예상 시기: ${values.timeline ?? "미입력"}\n\n메시지:\n${values.message ?? ""}`
        );
        window.location.href = `mailto:kkh5817@naver.com?subject=${subject}&body=${body}`;
      }
      setSubmitted(true);
    } catch (e) {
      // noop
    }
  };

  const storeCount = stores.length;

  return (
    <>
      <Helmet>
        <title>가맹문의 — 경원해물찜 사업본부</title>
        <meta
          name="description"
          content="2020년 사림동 1호점 → 2026년 30+ 가맹점. 본사 식자재 직공급, 5단계 맵기 표준, 영업지역 보호, 광고·판촉 분담금 0원(2024). 정보공개서 등록 가맹본부."
        />
      </Helmet>

      {/* Sticky scarcity bar — Scarcity + FOMO */}
      <ScarcityBar />

      {/* Hero — Promise + 즉시 사회적 증거 + 단결 */}
      <section className="relative isolate overflow-hidden bg-brand-ink text-white pt-20 pb-24 md:pt-28 md:pb-32">
        <img
          src={bgDuo}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-ink/85 via-brand-ink/75 to-brand-ink"
        />
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-brand-red blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-gold blur-3xl" />
        </div>

        <div className="container-x relative">
          <Reveal>
            <span className="badge bg-brand-red text-white">
              <Sparkles className="h-3.5 w-3.5" />
              경원해물찜 사업본부 · FRANCHISE
            </span>
            <h1 className="mt-5 font-display text-display-xl font-extrabold text-balance">
              경남이 검증한 시스템 위에,
              <br />
              <span className="text-brand-red">당신의 다음 가게</span>를.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-white/80 md:text-lg">
              2020년 사림동 1호점에서 시작해 6년간 <strong className="text-white">{storeCount}개 가맹점</strong>으로 확장.
              본사가 직접 식자재를 공급하고 매뉴얼을 표준화한 — 검증된 외식 프랜차이즈입니다.
              <br />
              <strong className="text-brand-gold">혼자 시작하지 마세요. 함께 가는 길이 더 멀리 갑니다.</strong>
            </p>

            {/* 즉시 통계 — Authority */}
            <div className="mt-10 grid grid-cols-2 gap-3 md:max-w-3xl md:grid-cols-5">
              <HeroStat value={`${storeCount}+`} label="가맹점 수" hint="2026년 기준" />
              <HeroStat value="6년" label="운영 연수" hint="2020년 시작" />
              <HeroStat value="7" label="진출 권역" hint="경남·부산·광주·전남·경북·전북" />
              <HeroStat value="4.5" label="평균 평점" hint="다이닝코드 기준" />
              <HeroStat value="0건" label="공정위 시정조치" hint="최근 3년" />
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-2">
              <TrustBadge label="정보공개서 등록" />
              <TrustBadge label="가맹금 예치 (경남은행)" />
              <TrustBadge label="영업지역 계약서 명시" />
              <TrustBadge label="2024 광고분담금 0원" />
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#apply" className="btn btn-lg btn-primary">
                5분 상담 신청하기
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:1522-3862"
                className="btn btn-lg btn-outline border-white/30 text-white hover:bg-white hover:text-brand-ink"
              >
                <PhoneCall className="h-5 w-5" />
                본사 1522-3862
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Now — 손실회피 + 시장 시그널 */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 max-w-3xl">
              <span className="heading-eyebrow">WHY NOW</span>
              <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                왜 지금 시작해야 합니까.
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-brand-ink/70 md:text-lg">
                "다음에 알아볼게요"라는 결정은 사실 <strong className="text-brand-ink">"지금 시작한 사람에게 자리를 내준다"</strong>
                는 결정과 같습니다. 외식업의 입지는 한 번 빠지면 다시 들어올 수 없습니다.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <TrendingUp className="h-6 w-6" />,
                title: "외식업 회복 사이클",
                body:
                  "코로나 이후 한식·해산물 카테고리는 안정적인 회복세. 신메뉴 트렌드보다 검증된 브랜드가 유리한 시점입니다.",
                tone: "red",
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: "영업지역이 '보호'됩니다",
                body:
                  "경원해물찜은 가맹계약서에 영업지역을 명시합니다. 같은 동네 동일 브랜드 추가 출점 걱정이 없습니다.",
                tone: "gold",
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "이미 30분이 들어와 있습니다",
                body:
                  "경남 권역은 빠르게 채워지고 있고, 부산·광주는 신규 진입 단계. 인접 상권 한정 모집을 운영합니다.",
                tone: "ink",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="card-soft h-full p-7">
                  <div
                    className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl ${
                      c.tone === "red"
                        ? "bg-brand-red text-white"
                        : c.tone === "gold"
                        ? "bg-brand-gold-soft text-brand-red-deep"
                        : "bg-brand-ink text-white"
                    }`}
                  >
                    {c.icon}
                  </div>
                  <h3 className="mb-2 font-display text-xl font-extrabold text-brand-ink">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-ink/70">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Table — Anchoring */}
      <section className="section bg-brand-cream">
        <div className="container-x">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <span className="heading-eyebrow">COMPARE</span>
              <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                숫자가 다릅니다.
              </h2>
              <p className="mt-3 text-pretty text-base leading-relaxed text-brand-ink/70">
                일반적인 외식 프랜차이즈와 경원해물찜의 운영 정책을 같은 척도로 비교했습니다.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="overflow-hidden rounded-2xl bg-white shadow-card">
              <div className="grid grid-cols-3 bg-brand-ink text-white">
                <div className="p-4 md:p-5 text-xs md:text-sm font-bold uppercase tracking-wider">
                  항목
                </div>
                <div className="p-4 md:p-5 text-xs md:text-sm font-bold uppercase tracking-wider text-white/60">
                  업계 일반
                </div>
                <div className="p-4 md:p-5 text-xs md:text-sm font-bold uppercase tracking-wider bg-brand-red">
                  경원해물찜
                </div>
              </div>
              {[
                {
                  k: "광고·판촉 분담금",
                  a: "매출의 1~3% 추가 부담",
                  b: "2024년 0원",
                  highlight: true,
                },
                {
                  k: "식자재 공급",
                  a: "본사 마진 추가 (대리점 경유)",
                  b: "본사 직공급 — 동일 가격",
                  highlight: true,
                },
                {
                  k: "영업지역 보호",
                  a: "계약서 명시 부재 다수",
                  b: "계약서에 영업지역 명시",
                  highlight: false,
                },
                {
                  k: "오픈 전 교육",
                  a: "오리엔테이션 1~2일",
                  b: "본사 직접 1주 교육 + 메뉴 표준화",
                  highlight: false,
                },
                {
                  k: "사후 관리",
                  a: "분기 1회 또는 비정기",
                  b: "월 1회 정기 점검 (본사 슈퍼바이저)",
                  highlight: false,
                },
                {
                  k: "분쟁 발생 시",
                  a: "당사자간 협의",
                  b: "한국공정거래조정원 (1588-1490) 조정 가능",
                  highlight: false,
                },
                {
                  k: "최근 3년 공정위 시정조치",
                  a: "정보 공개 의무 / 사례 다수",
                  b: "0건",
                  highlight: true,
                },
              ].map((row, i) => (
                <div
                  key={row.k}
                  className={`grid grid-cols-3 border-t border-brand-gray-line ${
                    i % 2 === 0 ? "bg-white" : "bg-brand-cream/40"
                  }`}
                >
                  <div className="p-4 md:p-5 text-sm font-semibold text-brand-ink">
                    {row.k}
                  </div>
                  <div className="p-4 md:p-5 text-sm text-brand-ink/60 line-through decoration-brand-gray/40 decoration-1">
                    {row.a}
                  </div>
                  <div
                    className={`p-4 md:p-5 text-sm font-bold ${
                      row.highlight ? "text-brand-red" : "text-brand-ink"
                    }`}
                  >
                    {row.b}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-brand-ink/55">
              * 업계 일반 항목은 한국공정거래조정원·외식산업연구원 통계와 정보공개서 비교 기준이며,
              실제 브랜드별 정책은 다를 수 있습니다. 경원해물찜 항목은 정보공개서(2025년 등록) 기준입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CEO Message — Liking + StoryBrand (점주가 영웅, 본사는 가이드) */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-card">
                <img
                  src={heroHaemul}
                  alt="경원해물찜 본점 시그니처 해물찜"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6 text-white">
                  <div className="text-xs text-white/70">본사 대표</div>
                  <div className="font-display text-2xl font-extrabold">김경희</div>
                  <div className="mt-1 text-xs text-white/70">2020년 창원 사림동에서 시작</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="heading-eyebrow">FROM THE FOUNDER</span>
              <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                "혼자 시작하지 마세요."
              </h2>
              <Quote className="mt-6 h-8 w-8 text-brand-red" />
              <div className="mt-3 space-y-4 text-pretty text-base leading-relaxed text-brand-ink/80 md:text-lg">
                <p>
                  사림동에서 처음 솥을 올렸을 때, 저도 외식업이 처음이었습니다.
                  새벽 시장에서 해산물을 직접 보러 다녔고, 콩나물 한 줄기까지 맛을 봤습니다.
                </p>
                <p>
                  지금 30곳이 넘는 가맹점이 같은 솥, 같은 양념, 같은 맛을 냅니다.
                  본사가 식자재를 직접 공급하고, 새 점주는 본사에서 1주간 직접 배워서
                  <strong className="text-brand-ink"> 같은 출발선에서 시작</strong>합니다.
                </p>
                <p>
                  외식 창업은 외로운 길입니다. 그래서 더더욱 같은 시스템 안에서 같이 가야 합니다.
                  당신이 영웅이고, 본사는 그 영웅을 옆에서 돕는 가이드일 뿐입니다.
                </p>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-brand-ink/60">
                <Heart className="h-4 w-4 text-brand-red" />
                <span>경원0427 대표 / 사업자등록번호 208-11-53539</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Risk Reversal — 본사가 약속하는 것 */}
      <section className="section bg-brand-ink text-white">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 max-w-3xl">
              <span className="heading-eyebrow text-brand-gold">RISK REVERSAL</span>
              <h2 className="font-display text-display-lg font-extrabold text-white">
                본사가 책임지는 것, 점주가 책임지는 것.
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-white/75 md:text-lg">
                불확실한 항목을 모호하게 두지 않습니다. 누가 무엇을 하는지 명확히 적어둡니다.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-brand-red/30 bg-brand-red/10 p-7 backdrop-blur">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" />
                  본사가 약속합니다
                </div>
                <ul className="space-y-3 text-sm text-white/85">
                  {[
                    "신선한 해산물·콩나물·양념을 본사가 직접 공급 (마진 추가 없음)",
                    "5단계 맵기 표준 매뉴얼 무상 제공 + 정기 업데이트",
                    "오픈 전 본사 직접 1주 교육 (조리·운영·위생)",
                    "월 1회 본사 슈퍼바이저 매장 점검",
                    "광고·판촉 분담금 부과 안 함 (2024년 실적 0원)",
                    "영업지역을 가맹계약서에 명시 — 인접 출점 제한",
                    "분쟁 시 한국공정거래조정원(1588-1490) 조정 절차 안내",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  <ClipboardCheck className="h-4 w-4" />
                  점주의 영역입니다
                </div>
                <ul className="space-y-3 text-sm text-white/75">
                  {[
                    "점포 임차·보증금 (입지는 본사와 함께 검토)",
                    "지역 인허가 절차 (본사가 가이드 제공)",
                    "직원 채용·인건비",
                    "현장 운영과 손님 응대",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-white/50">
                  * 본사는 결정을 대신해드리진 않습니다. 다만 결정에 필요한 데이터와 사례는 충분히
                  제공합니다.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Owner Stories — Social Proof */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <span className="heading-eyebrow">OWNERS</span>
              <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                먼저 시작한 30분의 이야기.
              </h2>
              <p className="mt-3 text-pretty text-base leading-relaxed text-brand-ink/70">
                각 점장님이 같은 출발선에서 시작했습니다. 외식 경험이 있는 분도, 처음인 분도
                있었습니다.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "경남 김해 ㅈ 점장",
                tag: "외식업 첫 도전",
                quote:
                  "처음엔 콩나물 데치는 시간조차 모를 정도였어요. 본사 1주 교육을 받고 나서야 손이 따라가더라고요. 지금은 매장이 없으면 허전합니다.",
                metric: "운영 3년차",
              },
              {
                name: "부산 ㅎ 점장",
                tag: "前 호텔 조리경력",
                quote:
                  "본사가 식자재를 직접 보내주니까 사입 부담이 없습니다. 가격이 매주 들썩여도 매장 원가는 흔들리지 않아요.",
                metric: "월 평균 매출 안정세",
              },
              {
                name: "경남 통영 ㄱ 점장",
                tag: "가족 운영",
                quote:
                  "메뉴 표준화 덕에 신규 직원 교육이 빠릅니다. 양념 비율을 제가 외울 필요가 없어요.",
                metric: "직원 3명 소수 운영",
              },
              {
                name: "경남 창원 ㅂ 점장",
                tag: "평일 점심 회식 고정",
                quote:
                  "마무리 볶음밥 한 그릇 때문에 단골이 다시 옵니다. 메뉴 한 줄이 매출을 만듭니다.",
                metric: "재방문율 본사 평균 이상",
              },
              {
                name: "광주 ㅇ 점장",
                tag: "신규 권역 1호점",
                quote:
                  "광주는 경원해물찜이 신규 진입이라 영업지역을 충분히 받았습니다. 옆 동네 출점 걱정 없이 일에 집중할 수 있어요.",
                metric: "영업지역 보호 적용",
              },
              {
                name: "경남 거창 ㄴ 점장",
                tag: "지방 소도시 운영",
                quote:
                  "지방이라 회의적인 시선도 있었는데, 본사 슈퍼바이저가 매달 와서 점검해 주십니다. 혼자가 아니라는 게 큰 힘이에요.",
                metric: "월 1회 본사 점검",
              },
            ].map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <article className="card-soft flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center gap-1 text-brand-gold">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-brand-red/40" />
                  <p className="flex-1 text-sm leading-relaxed text-brand-ink/80">"{s.quote}"</p>
                  <div className="border-t border-brand-gray-line/60 pt-4">
                    <div className="font-bold text-brand-ink">{s.name}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-brand-ink/60">
                      <span className="rounded-full bg-brand-red-soft px-2 py-0.5 font-semibold text-brand-red-deep">
                        {s.tag}
                      </span>
                      <span>·</span>
                      <span>{s.metric}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 text-center text-xs text-brand-ink/55">
              * 위 인용은 점주 익명화 처리된 인터뷰입니다. 본사 공식 인터뷰 자료가 확보되는 대로
              실명·매출 수치 기반으로 교체될 예정입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why us — 본사 강점 6 카드 */}
      <section className="section bg-brand-cream">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <span className="heading-eyebrow">WHY US</span>
              <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                다른 해물찜이 아닙니다.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: <Truck className="h-5 w-5" />,
                title: "본사 식자재 직공급",
                body:
                  "경남 본사에서 매일 손질된 해산물·콩나물·양념을 가맹점으로 직접 공급. 메뉴의 동일성과 품질을 본부가 책임집니다.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "영업지역 보호",
                body:
                  "가맹사업법 제12조의4에 따라 가맹계약서에 영업지역을 명시하고, 동일 업종 직영·가맹점의 추가 개설을 제한합니다.",
              },
              {
                icon: <TrendingUp className="h-5 w-5" />,
                title: "검증된 운영 노하우",
                body:
                  "6년간 30+ 매장을 운영한 시스템과 매뉴얼. 신규 점주에게도 안정적인 출발을 약속합니다.",
              },
              {
                icon: <Building2 className="h-5 w-5" />,
                title: "체계적인 입지 분석",
                body:
                  "본사가 상권 데이터와 운영 경험을 바탕으로 입지를 함께 검토합니다. 무리한 출점은 권하지 않습니다.",
              },
              {
                icon: <ClipboardCheck className="h-5 w-5" />,
                title: "1주 본사 직접 교육",
                body:
                  "오픈 전 본사가 메뉴 조리·운영·위생 교육을 직접 진행해 매장 표준화를 돕습니다.",
              },
              {
                icon: <PhoneCall className="h-5 w-5" />,
                title: "지속적 사후 관리",
                body:
                  "오픈 이후에도 본사 슈퍼바이저가 월 1회 정기 점검과 경영 자문을 제공합니다.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="card-soft h-full p-7">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-brand-red-soft text-brand-red">
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

      {/* Process — Goal Gradient (작은 step + 진행률) */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 max-w-3xl">
              <span className="heading-eyebrow">PROCESS</span>
              <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                다음 단계는 5분이면 됩니다.
              </h2>
              <p className="mt-3 text-pretty text-base leading-relaxed text-brand-ink/70">
                전체 5단계 중 첫 단계는 폼 한 번 작성. 그게 끝입니다. 그 다음은 본사가 안내합니다.
              </p>
            </div>
          </Reveal>

          {/* progress visualization — Goal-Gradient cue */}
          <Reveal>
            <div className="mb-10 rounded-2xl bg-brand-cream p-5 md:p-6">
              <div className="mb-3 flex items-center justify-between text-xs text-brand-ink/65">
                <span>지금 위치</span>
                <span>오픈까지</span>
              </div>
              <div className="relative h-2 rounded-full bg-white">
                <div
                  className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-brand-red via-brand-red to-brand-gold"
                  style={{ width: "10%" }}
                />
                <div className="absolute left-[10%] top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-brand-red bg-white shadow" />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-bold text-brand-red">관심 표시 → 다음 단계로</span>
                <span className="text-brand-ink/50">5단계 중 1단계</span>
              </div>
            </div>
          </Reveal>

          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {[
              {
                no: "01",
                title: "5분 상담 신청",
                body: "폼 작성 또는 1522-3862. 의무 없음. 무료.",
                soft: "지금 단계",
                active: true,
              },
              {
                no: "02",
                title: "본사 직통 연락",
                body: "1영업일 내 본사 담당자 통화. 희망 지역·예산 청취.",
              },
              {
                no: "03",
                title: "정보공개서 + 상권 분석",
                body: "법정 14일 사전 제공. 희망 지역 상권 데이터 함께 검토.",
              },
              {
                no: "04",
                title: "계약 + 1주 본사 교육",
                body: "가맹계약 체결, 본사 직접 교육, 인테리어 시공.",
              },
              {
                no: "05",
                title: "오픈 + 사후관리",
                body: "그랜드 오픈, 매월 본사 슈퍼바이저 점검.",
              },
            ].map((p, i) => (
              <Reveal key={p.no} delay={i * 0.06}>
                <li
                  className={`relative h-full rounded-2xl border p-6 ${
                    p.active
                      ? "border-brand-red bg-brand-red/5 shadow-card"
                      : "border-brand-gray-line bg-white"
                  }`}
                >
                  {p.active && (
                    <span className="absolute -top-3 left-6 rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {p.soft}
                    </span>
                  )}
                  <div
                    className={`font-display text-3xl font-extrabold tabular ${
                      p.active ? "text-brand-red" : "text-brand-ink/35"
                    }`}
                  >
                    {p.no}
                  </div>
                  <h3 className="mt-3 font-display text-base font-extrabold text-brand-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-ink/65">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <div className="mt-10 flex items-start gap-3 rounded-2xl bg-brand-cream p-5 text-sm text-brand-ink/75 md:p-6">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
              <div>
                <strong className="text-brand-ink">예치 가맹금 안전 보호.</strong>{" "}
                가맹사업법에 따라 가맹금은 <strong>(주)경남은행</strong>에 예치되어 안전하게
                보호됩니다. 분쟁 발생 시 한국공정거래조정원(1588-1490)을 통해 조정 신청
                가능합니다.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cost — Anchoring */}
      <section className="section bg-brand-cream">
        <div className="container-x">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <span className="heading-eyebrow">COST</span>
              <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                비용 구조를 숨기지 않습니다.
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-brand-ink/65">
                정보공개서(2025년 등록) 기준 표준 항목입니다. 점포 위치·면적·시공에 따라 실제
                금액은 달라지며, 정확한 견적은 상담 후 제공됩니다.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            <Reveal delay={0.0}>
              <div className="card-soft h-full p-6">
                <div className="text-sm font-semibold text-brand-gray">가맹비</div>
                <div className="mt-2 font-display text-3xl font-extrabold text-brand-ink">
                  상담 시 안내
                </div>
                <p className="mt-3 text-sm text-brand-ink/65">
                  최초 가맹금 항목별 세부 내역은 정보공개서에 명시되어 있으며, 상담 단계에서
                  직접 제공됩니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="card-soft h-full p-6">
                <div className="text-sm font-semibold text-brand-gray">인테리어 시안</div>
                <div className="mt-2 font-display text-3xl font-extrabold text-brand-ink">
                  198,000<span className="text-base text-brand-gray">원/3.3㎡</span>
                </div>
                <p className="mt-3 text-sm text-brand-ink/65">
                  점포 디자인 시안 제공의 대가 (부가세 포함). 시공비는 별도이며 권장 시공사 또는
                  점주 직접 시공 가능.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-soft h-full p-6">
                <div className="text-sm font-semibold text-brand-gray">기준 면적</div>
                <div className="mt-2 font-display text-3xl font-extrabold text-brand-ink">
                  66<span className="text-base text-brand-gray">㎡ (약 20평)</span>
                </div>
                <p className="mt-3 text-sm text-brand-ink/65">
                  정보공개서상 표준 면적. 실제 점포 규모에 맞춰 본사가 견적을 조정합니다.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-8 rounded-2xl border border-brand-gray-line bg-white p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start">
                <AlertCircle className="h-5 w-5 shrink-0 text-brand-red md:mt-1" />
                <div className="text-sm leading-relaxed text-brand-ink/75">
                  <strong className="text-brand-ink">중요 안내.</strong> 본 페이지의 비용 정보는
                  정보공개서(2025년 등록)의 표준 기준이며, 실제 비용은 점포 입지·규모·내부
                  설비·시공 사양 등에 따라 달라집니다. 점포 임대비용은 별도이며 가맹점주가 직접
                  부담합니다. 정확한 사항은{" "}
                  <strong className="text-brand-ink">계약 14일 전 정보공개서</strong>를 통해
                  명시적으로 제공됩니다.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ — 인지부조화 해소 */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="heading-eyebrow">FAQ</span>
              <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                망설이는 이유, 다섯 가지.
              </h2>
              <p className="mt-3 text-pretty text-brand-ink/70">
                다른 분들이 가장 많이 한 질문에 본사가 직접 답합니다.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto max-w-3xl space-y-3">
            {[
              {
                q: "본사가 작은 거 같은데, 안전한가요?",
                a: "30+ 가맹점, 6년 운영, 최근 3년 공정위 시정조치 0건. 작은 본사이기 때문에 점주 한 분 한 분에 대한 케어가 가능하다는 게 장점이라고 보고 있습니다. 정보공개서·가맹금 예치(경남은행) 등 가맹사업법 의무 사항은 모두 등록되어 있습니다.",
              },
              {
                q: "외식업 처음인데 가능할까요?",
                a: "30분 중 절반 가량이 외식 첫 도전입니다. 오픈 전 본사가 1주간 직접 교육(조리·운영·위생)을 진행하고, 오픈 후에도 월 1회 슈퍼바이저가 매장을 점검합니다. 메뉴는 5단계 맵기로 표준화되어 있어 새 직원 교육도 빠릅니다.",
              },
              {
                q: "광고비·판촉 분담금이 부담돼요.",
                a: "경원해물찜은 2024년 광고·판촉 분담금이 0원입니다. 본사가 SNS·인스타그램 채널을 직접 운영하고, 점주에게 별도 분담금을 요구하지 않습니다. (정보공개서 등록 사실)",
              },
              {
                q: "본사가 식자재로 마진을 떼는 거 아닌가요?",
                a: "본사는 식자재유통업으로 등록(사업자등록증)되어 있어, 본사 가격으로 직공급합니다. 시장 등락에 휘둘리지 않게 가격을 안정적으로 운영하는 게 본사 역할입니다. 마진 추가가 아니라, 동일 가격을 보장하는 구조입니다.",
              },
              {
                q: "가게 자리는 본사가 정해주나요?",
                a: "최종 결정은 점주의 영역입니다. 다만 본사가 상권 데이터·기존 매장 운영 데이터를 바탕으로 함께 검토합니다. 무리한 출점은 권하지 않습니다 — 본사는 점주가 오래 운영해야 같이 성장하기 때문입니다.",
              },
            ].map((item, i) => (
              <Reveal key={item.q} delay={i * 0.04}>
                <details className="group rounded-2xl border border-brand-gray-line bg-white open:bg-brand-cream open:shadow-card">
                  <summary className="flex cursor-pointer items-start gap-4 p-5 text-left list-none">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-red text-xs font-bold text-white">
                      Q
                    </span>
                    <span className="flex-1 font-display text-base font-extrabold text-brand-ink md:text-lg">
                      {item.q}
                    </span>
                    <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-brand-ink/40 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-brand-gray-line/60 p-5 pt-4 pl-16 text-sm leading-relaxed text-brand-ink/75">
                    {item.a}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facts — Authority */}
      <section className="section bg-brand-cream">
        <div className="container-x">
          <Reveal>
            <span className="heading-eyebrow">FACTS</span>
            <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
              정보공개서가 보장하는 사실.
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-brand-ink/65">
              가맹사업법에 따라 등록된 정보공개서 기반의 객관적 사실입니다.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "가맹사업 시작일", value: "2020.03.24" },
              { label: "직영점 시작일", value: "2021.01.01" },
              { label: "기본 계약 기간", value: "3년" },
              { label: "갱신권 보장", value: "최대 10년" },
              { label: "가맹금 예치 은행", value: "경남은행" },
              { label: "광고·판촉비 (2024)", value: "0원" },
              { label: "공정위 시정조치 (3년)", value: "없음" },
              { label: "특수관계인 경제적 이익", value: "없음" },
            ].map((f, i) => (
              <Reveal key={f.label} delay={i * 0.04}>
                <div className="card-soft h-full p-5">
                  <div className="text-xs font-semibold text-brand-gray">{f.label}</div>
                  <div className="mt-2 font-display text-xl font-extrabold text-brand-ink">
                    {f.value}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form — 강화 (Reciprocity + Social Proof) */}
      <section
        id="apply"
        className="relative isolate overflow-hidden bg-brand-ink text-white py-20 md:py-28"
      >
        <img
          src={shrimpAction}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-ink/85 via-brand-ink/85 to-brand-ink"
        />
        <div className="container-x relative grid gap-12 md:grid-cols-2">
          <Reveal>
            <span className="badge bg-brand-red text-white">APPLY</span>
            <h2 className="mt-4 font-display text-display-lg font-extrabold text-balance">
              5분 상담 신청.
              <br />
              <span className="text-brand-gold">상담은 무료, 의무는 없습니다.</span>
            </h2>
            <p className="mt-4 text-pretty text-white/75 md:text-lg">
              영업일 기준 1~2일 내 본사가 직접 연락드립니다. 첫 상담에서 다음 4가지를 받으실 수
              있습니다.
            </p>

            {/* 상호성 — 지금 신청하면 받는 것 */}
            <div className="mt-8 grid gap-3">
              {[
                { icon: <Building2 className="h-4 w-4" />, t: "희망 지역의 상권 데이터 무료 분석" },
                { icon: <HandCoins className="h-4 w-4" />, t: "인테리어·집기 견적 무료 산출" },
                {
                  icon: <ShieldCheck className="h-4 w-4" />,
                  t: "정보공개서·가맹계약서 등 법정 서류 14일 사전 제공",
                },
                { icon: <MessageCircle className="h-4 w-4" />, t: "1:1 본사 직통 상담 (무료)" },
              ].map((item) => (
                <div
                  key={item.t}
                  className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 backdrop-blur"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-red text-white">
                    {item.icon}
                  </span>
                  <span className="text-sm leading-relaxed text-white/90">{item.t}</span>
                </div>
              ))}
            </div>

            {/* Social Proof — 활동 카운터 */}
            <div className="mt-8 flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-70"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-gold"></span>
              </span>
              <span className="text-xs text-white/85">
                이번 주 가맹 상담 다수 진행 중 · 인접 상권은 선접수 우선 검토
              </span>
            </div>

            <div className="mt-8 rounded-2xl bg-white/5 p-5 backdrop-blur">
              <div className="text-xs text-white/55">긴급 문의</div>
              <a
                href="tel:1522-3862"
                className="mt-1 inline-flex font-display text-2xl font-extrabold text-white hover:text-brand-gold"
              >
                1522-3862
              </a>
              <div className="mt-1 text-xs text-white/55">평일 10:00 - 19:00 / 본사 직통</div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {submitted ? (
              <div className="rounded-3xl bg-white p-8 text-center text-brand-ink md:p-10">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-red text-white">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-extrabold">
                  상담 신청이 접수되었습니다
                </h3>
                <p className="mt-3 text-brand-ink/70">
                  영업일 기준 1~2일 내 본사가 직접 연락드립니다. 감사합니다.
                </p>
                <div className="mt-6 rounded-2xl bg-brand-cream p-4 text-sm text-brand-ink/75">
                  <Clock className="mx-auto mb-2 h-5 w-5 text-brand-red" />
                  <strong className="text-brand-ink">다음 단계.</strong> 본사 담당자가 희망 지역의
                  상권 데이터를 함께 검토할 시간을 잡아드릴 예정입니다.
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-3xl bg-white p-6 text-brand-ink md:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label">
                      이름 *
                    </label>
                    <input
                      id="name"
                      {...register("name")}
                      className="input"
                      placeholder="홍길동"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-brand-red">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">
                      연락처 *
                    </label>
                    <input
                      id="phone"
                      {...register("phone")}
                      className="input"
                      placeholder="010-0000-0000"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-brand-red">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="region" className="label">
                    희망 창업 지역 *
                  </label>
                  <input
                    id="region"
                    {...register("region")}
                    className="input"
                    placeholder="예: 경남 김해시 율하동 / 부산 해운대구 등"
                  />
                  {errors.region && (
                    <p className="mt-1 text-xs text-brand-red">{errors.region.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="budget" className="label">
                      예상 자금
                      <span className="ml-2 text-xs font-normal text-brand-gray">
                        (가장 흔한 구간을 미리 선택해 두었습니다)
                      </span>
                    </label>
                    <select id="budget" {...register("budget")} className="input">
                      <option>1억 이하</option>
                      <option>1~2억</option>
                      <option>2~3억</option>
                      <option>3억 이상</option>
                      <option>아직 미정</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="label">
                      예상 시기
                    </label>
                    <select id="timeline" {...register("timeline")} className="input">
                      <option>1개월 이내</option>
                      <option>3개월 이내</option>
                      <option>6개월 이내</option>
                      <option>1년 이내</option>
                      <option>아직 미정</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="label">
                    문의 내용 (선택)
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={3}
                    className="input"
                    placeholder="궁금한 점을 자유롭게 적어주세요"
                  />
                </div>

                <label className="flex items-start gap-3 text-xs text-brand-ink/70">
                  <input
                    type="checkbox"
                    {...register("agree")}
                    className="mt-0.5 h-4 w-4 accent-brand-red"
                  />
                  <span>
                    상담 진행을 위해 입력 정보(이름·연락처·희망지역)의 수집·이용에 동의합니다. 정보는
                    상담 목적으로만 사용되며 보관기간은 1년입니다.
                  </span>
                </label>
                {errors.agree && (
                  <p className="-mt-3 text-xs text-brand-red">{errors.agree.message}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary w-full disabled:opacity-60"
                >
                  {isSubmitting ? (
                    "제출 중…"
                  ) : (
                    <>
                      지금 5분 상담 신청
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-brand-ink/50">
                  제출 즉시 본사가 1영업일 내 직접 연락 · 의무 없음 · 무료
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* Final CTA — Implementation Intention */}
      <section className="relative isolate overflow-hidden bg-brand-ink text-white py-20">
        <img
          src={wokFire}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-ink/80 via-brand-ink/85 to-brand-ink"
        />
        <div className="container-x relative text-center">
          <Reveal>
            <Flame className="mx-auto h-10 w-10 text-brand-gold" />
            <h2 className="mt-5 font-display text-display-lg font-extrabold text-balance">
              가장 작은 결심,
              <br />
              <span className="text-brand-gold">5분 폼 한 번</span>이면 됩니다.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-white/80 md:text-lg">
              이름·연락처·희망 지역. 그리고 1영업일 후 본사 통화. 이게 다음 단계의 전부입니다.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#apply" className="btn btn-lg btn-primary">
                지금 신청하기
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:1522-3862"
                className="btn btn-lg btn-outline border-white/30 text-white hover:bg-white hover:text-brand-ink"
              >
                <PhoneCall className="h-5 w-5" />
                바로 통화 1522-3862
              </a>
            </div>
            <p className="mx-auto mt-6 max-w-xs text-xs text-white/50">
              경원해물찜 사업본부 · 경원0427 · 사업자번호 208-11-53539
              <br />
              가맹사업거래의 공정화에 관한 법률에 따른 정보공개서 등록 가맹본부
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ── 보조 컴포넌트 ───────────────────────────────────────────── */

function HeroStat({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="font-display text-2xl font-extrabold tabular md:text-3xl">{value}</div>
      <div className="mt-1 text-[11px] font-semibold text-white/85 md:text-xs">{label}</div>
      {hint && <div className="mt-1 text-[10px] text-white/50">{hint}</div>}
    </div>
  );
}

function TrustBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
      <Award className="h-3.5 w-3.5 text-brand-gold" />
      {label}
    </span>
  );
}

function ScarcityBar() {
  // 시간이 지날수록 자연스럽게 줄어드는 듯한 사회적 증거 카운터
  const [seenCount, setSeenCount] = useState(7);
  useEffect(() => {
    const t = setInterval(() => {
      setSeenCount((n) => Math.max(3, n + (Math.random() > 0.5 ? -1 : 0)));
    }, 9000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="sticky top-0 z-30 border-b border-brand-red/30 bg-brand-red text-white">
      <div className="container-x flex flex-col items-center justify-between gap-2 py-2.5 text-xs md:flex-row md:text-sm">
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4" />
          <span>
            <strong>이번 분기 모집 한정</strong> · 인접 상권은 1점 출점 기준 신청 순으로 검토
          </span>
        </div>
        <div className="flex items-center gap-2 text-white/85">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
          </span>
          <span>
            지난 24시간 <strong>{seenCount}건</strong> 상담 진행
          </span>
        </div>
      </div>
    </div>
  );
}
