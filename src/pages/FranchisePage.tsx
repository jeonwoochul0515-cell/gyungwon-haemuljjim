import { Helmet } from "react-helmet-async";
import { useState } from "react";
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
} from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { Stat } from "../components/ui/Stat";

const formSchema = z.object({
  name: z.string().min(1, "이름을 입력해 주세요"),
  phone: z
    .string()
    .min(9, "정확한 연락처를 입력해 주세요")
    .regex(/^[0-9-+ ()]+$/, "숫자만 입력해 주세요"),
  region: z.string().min(1, "희망 지역을 입력해 주세요"),
  budget: z.string().optional(),
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
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: FormValues) => {
    try {
      // Cloudflare Pages Function 또는 외부 폼 서비스로 연결.
      // 환경변수 VITE_FORM_ENDPOINT 설정 시 그 endpoint로 POST.
      const endpoint = (import.meta as any).env?.VITE_FORM_ENDPOINT;
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, source: "franchise-form" }),
        });
      } else {
        // fallback: 본사 메일 클라이언트 열기
        const subject = encodeURIComponent("[경원해물찜] 가맹 상담 요청");
        const body = encodeURIComponent(
          `이름: ${values.name}\n연락처: ${values.phone}\n희망지역: ${values.region}\n예상 자금: ${values.budget ?? "미입력"}\n\n메시지:\n${values.message ?? ""}`
        );
        window.location.href = `mailto:kkh5817@naver.com?subject=${subject}&body=${body}`;
      }
      setSubmitted(true);
    } catch (e) {
      // noop
    }
  };

  return (
    <>
      <Helmet>
        <title>가맹문의 — 경원해물찜</title>
        <meta
          name="description"
          content="6년 운영, 30+ 가맹점의 검증된 시스템. 본사 식자재 직공급, 5단계 맵기 표준, 영업지역 보호. 정보공개서 등록 완료."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-ink text-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-brand-red blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-gold blur-3xl" />
        </div>
        <div className="container-x relative">
          <Reveal>
            <span className="badge bg-brand-red text-white">FRANCHISE</span>
            <h1 className="mt-4 font-display text-display-xl font-extrabold text-balance">
              경험으로 검증된
              <br />
              <span className="text-brand-red">해물찜 프랜차이즈</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-white/75 md:text-lg">
              경원해물찜은 2020년 사림동에서 시작해 6년간 30+ 가맹점을 안정적으로 운영해 온
              검증된 외식 프랜차이즈입니다. 본사가 직접 식자재를 공급해 어느 매장이든 같은
              맛, 같은 신선도를 약속합니다.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 md:max-w-2xl md:grid-cols-4">
              <Stat value="30+" label="가맹점 수" hint="2026년 기준" className="bg-white/5 border-white/10 text-white" />
              <Stat value="6년" label="브랜드 운영" hint="2020년 시작" className="bg-white/5 border-white/10 text-white" />
              <Stat value="3년" label="기본 계약" hint="갱신 2년·최대 10년" className="bg-white/5 border-white/10 text-white" />
              <Stat value="66㎡" label="기준 면적" hint="33㎡ 기준 시안 별도" className="bg-white/5 border-white/10 text-white" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why us */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <span className="heading-eyebrow">WHY US</span>
              <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
                왜 경원해물찜인가
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: <Sparkles />,
                title: "본사 식자재 직공급",
                body:
                  "신선한 해산물과 콩나물을 본사가 직접 손질해 가맹점으로 공급. 메뉴의 동일성과 품질을 본부가 책임집니다.",
              },
              {
                icon: <ShieldCheck />,
                title: "영업지역 보호",
                body:
                  "가맹사업법 제12조의4에 따라 가맹계약서에 영업지역을 명시하고, 동일 업종 직영·가맹점의 추가 개설을 제한합니다.",
              },
              {
                icon: <TrendingUp />,
                title: "검증된 운영 노하우",
                body:
                  "6년간 30+ 매장을 운영한 시스템과 매뉴얼. 신규 점주에게도 안정적인 출발을 약속합니다.",
              },
              {
                icon: <Building2 />,
                title: "체계적인 입지 분석",
                body:
                  "본사가 상권 데이터와 운영 경험을 바탕으로 입지를 함께 검토합니다. 무리한 출점은 권하지 않습니다.",
              },
              {
                icon: <ClipboardCheck />,
                title: "체계적 교육·훈련",
                body:
                  "가맹점 오픈 전 본사가 직접 메뉴 조리·운영 교육을 진행해 매장 표준화를 돕습니다.",
              },
              {
                icon: <PhoneCall />,
                title: "지속적 사후 관리",
                body:
                  "오픈 이후에도 본사가 정기 점검과 경영 자문을 제공합니다. 함께 성장하는 파트너십.",
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

      {/* Process */}
      <section className="section bg-brand-cream">
        <div className="container-x">
          <Reveal>
            <span className="heading-eyebrow">PROCESS</span>
            <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
              상담부터 오픈까지
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {[
              {
                no: "01",
                title: "상담 신청",
                body: "홈페이지 폼 또는 본사 1522-3862로 상담 신청",
              },
              {
                no: "02",
                title: "정보공개서 제공",
                body: "가맹사업법에 따라 계약 14일 전 정보공개서 제공",
              },
              {
                no: "03",
                title: "상권 분석·입지 협의",
                body: "본사 담당자와 함께 상권 분석 및 입지 검토",
              },
              {
                no: "04",
                title: "계약 체결 + 교육",
                body: "가맹계약 체결, 본사 교육·훈련 이수, 인테리어",
              },
              {
                no: "05",
                title: "오픈 + 사후 관리",
                body: "그랜드 오픈, 이후 본사 정기 관리·경영 자문",
              },
            ].map((p, i) => (
              <Reveal key={p.no} delay={i * 0.06}>
                <li className="card-soft h-full p-6">
                  <div className="font-display text-3xl font-extrabold text-brand-red tabular">
                    {p.no}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-extrabold text-brand-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-ink/65">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <div className="mt-10 flex items-start gap-3 rounded-2xl bg-white p-5 text-sm text-brand-ink/75 md:p-6">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
              <div>
                <strong className="text-brand-ink">예치 가맹금 안전 보호.</strong>{" "}
                가맹사업법에 따라 가맹금은 <strong>(주)경남은행</strong>에 예치되어
                안전하게 보호됩니다. 분쟁이 발생하면 한국공정거래조정원
                (1588-1490)을 통해 조정을 신청할 수 있습니다.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cost */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <span className="heading-eyebrow">COST</span>
            <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
              개점 비용 안내
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-brand-ink/65">
              아래는 정보공개서에 등록된 표준 기준입니다. 점포 위치·면적·인테리어 사양에
              따라 실제 금액은 달라질 수 있으며, 정확한 견적은 상담 후 제공됩니다.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Reveal delay={0.0}>
              <div className="card-soft h-full p-6">
                <div className="text-sm font-semibold text-brand-gray">가맹비</div>
                <div className="mt-2 font-display text-3xl font-extrabold text-brand-ink">
                  상담 시 안내
                </div>
                <p className="mt-3 text-sm text-brand-ink/65">
                  최초 가맹금 항목별 세부 내역은 정보공개서에 명시되어 있으며, 상담
                  단계에서 직접 제공해 드립니다.
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
                  점포 디자인 시안 제공의 대가 (부가세 포함). 시공비는 별도이며 권장
                  시공사 또는 점주 직접 시공 가능.
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
            <div className="mt-8 rounded-2xl border border-brand-gray-line bg-brand-cream p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start">
                <AlertCircle className="h-5 w-5 shrink-0 text-brand-red md:mt-1" />
                <div className="text-sm leading-relaxed text-brand-ink/75">
                  <strong className="text-brand-ink">중요 안내.</strong> 본 페이지의 비용
                  정보는 정보공개서(2025년 등록)의 표준 기준이며, 실제 비용은 점포의 입지·규모·내부
                  설비·시공 사양 등에 따라 달라집니다. 또한 점포 임대비용은 별도이며 가맹점주가
                  직접 부담합니다. 정확한 사항은{" "}
                  <strong className="text-brand-ink">계약 14일 전 정보공개서</strong>를 통해
                  명시적으로 제공됩니다.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Strengths grid */}
      <section className="section bg-brand-cream">
        <div className="container-x">
          <Reveal>
            <span className="heading-eyebrow">FACTS</span>
            <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
              정보공개서가 보장하는 사실
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

      {/* Form */}
      <section id="apply" className="section bg-white">
        <div className="container-x grid gap-12 md:grid-cols-2">
          <Reveal>
            <span className="heading-eyebrow">APPLY</span>
            <h2 className="font-display text-display-lg font-extrabold text-brand-ink">
              가맹 상담 신청
            </h2>
            <p className="mt-4 text-pretty text-brand-ink/70">
              정보공개서 자격을 갖춘 본사 담당자가 영업일 기준 1~2일 내 직접 연락드립니다.
              <strong className="text-brand-ink"> 상담은 무료이며 의무는 없습니다.</strong>
            </p>

            <div className="mt-8 space-y-4 text-sm text-brand-ink/75">
              <CheckLine>희망 지역의 상권 데이터·예상 매출 시뮬레이션 제공</CheckLine>
              <CheckLine>인테리어·집기 견적 무료 산출</CheckLine>
              <CheckLine>정보공개서·가맹계약서 등 법정 서류 14일 사전 제공</CheckLine>
              <CheckLine>창업 자금 마련 방안 컨설팅</CheckLine>
            </div>

            <div className="mt-10 rounded-2xl bg-brand-cream p-5">
              <div className="text-xs text-brand-gray">긴급 문의</div>
              <a
                href="tel:1522-3862"
                className="mt-1 inline-flex font-display text-2xl font-extrabold text-brand-ink hover:text-brand-red"
              >
                1522-3862
              </a>
              <div className="mt-1 text-xs text-brand-gray">
                평일 10:00 - 19:00 / 본사 직통
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {submitted ? (
              <div className="card-soft p-8 md:p-10 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-red text-white">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-extrabold text-brand-ink">
                  상담 신청이 접수되었습니다
                </h3>
                <p className="mt-3 text-brand-ink/70">
                  영업일 기준 1~2일 내 본사에서 연락드립니다. 감사합니다.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-soft p-6 md:p-8 space-y-5"
              >
                <div>
                  <label htmlFor="name" className="label">
                    이름 *
                  </label>
                  <input id="name" {...register("name")} className="input" placeholder="홍길동" />
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

                <div>
                  <label htmlFor="region" className="label">
                    희망 창업 지역 *
                  </label>
                  <input
                    id="region"
                    {...register("region")}
                    className="input"
                    placeholder="예: 경남 김해시 율하동, 부산 해운대구 등"
                  />
                  {errors.region && (
                    <p className="mt-1 text-xs text-brand-red">{errors.region.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="budget" className="label">
                    예상 자금 (선택)
                  </label>
                  <select id="budget" {...register("budget")} className="input">
                    <option value="">선택해 주세요</option>
                    <option>1억 이하</option>
                    <option>1~2억</option>
                    <option>2~3억</option>
                    <option>3억 이상</option>
                    <option>아직 미정</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="label">
                    문의 내용 (선택)
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={4}
                    className="input"
                    placeholder="궁금한 점을 자유롭게 적어주세요"
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-brand-ink/75">
                  <input
                    type="checkbox"
                    {...register("agree")}
                    className="mt-0.5 h-4 w-4 accent-brand-red"
                  />
                  <span>
                    상담 진행을 위해 입력 정보(이름·연락처·희망지역)의 수집·이용에
                    동의합니다. 정보는 상담 목적으로만 사용되며 보관기간은 1년입니다.
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
                      상담 신청하기
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* Disclosure note */}
      <section className="bg-brand-ink py-12 text-white">
        <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-sm text-brand-gold">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-bold">법적 고지</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              경원해물찜0427(가맹본부 경원0427, 사업자번호 208-11-53539)은 「가맹사업거래의
              공정화에 관한 법률」에 따라 정보공개서를 등록하여 운영 중입니다. 가맹 계약 체결 전
              반드시 정보공개서를 정독해 주시기 바랍니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:1522-3862"
              className="btn btn-md btn-outline border-white/30 text-white hover:bg-white hover:text-brand-ink"
            >
              본사 1522-3862
            </a>
            <a href="#apply" className="btn btn-md btn-primary">
              상담 신청
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function CheckLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
      <span>{children}</span>
    </div>
  );
}
