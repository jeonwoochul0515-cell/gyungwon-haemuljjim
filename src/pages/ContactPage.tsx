import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { InstagramIcon as Instagram } from "../components/ui/InstagramIcon";
import { Reveal } from "../components/ui/Reveal";

const schema = z.object({
  name: z.string().min(1, "이름을 입력해 주세요"),
  email: z.string().email("정확한 이메일을 입력해 주세요").optional().or(z.literal("")),
  phone: z
    .string()
    .min(9, "정확한 연락처를 입력해 주세요")
    .regex(/^[0-9-+ ()]+$/, "숫자만 입력해 주세요"),
  category: z.string().min(1, "문의 유형을 선택해 주세요"),
  message: z.string().min(5, "내용을 5자 이상 입력해 주세요"),
});
type Values = z.infer<typeof schema>;

export default function ContactPage() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Values) => {
    const endpoint = (import.meta as any).env?.VITE_FORM_ENDPOINT;
    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, source: "contact-form" }),
        });
      } else {
        const subject = encodeURIComponent(`[경원해물찜 문의 - ${values.category}]`);
        const body = encodeURIComponent(
          `이름: ${values.name}\n연락처: ${values.phone}\n이메일: ${values.email ?? ""}\n\n${values.message}`
        );
        window.location.href = `mailto:kkh5817@naver.com?subject=${subject}&body=${body}`;
      }
      setDone(true);
    } catch {
      // noop
    }
  };

  return (
    <>
      <Helmet>
        <title>고객센터 — 경원해물찜</title>
      </Helmet>

      <section className="bg-brand-cream pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-x">
          <Reveal>
            <span className="heading-eyebrow">CONTACT</span>
            <h1 className="font-display text-display-xl font-extrabold text-brand-ink">
              궁금한 점이 있으신가요?
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-brand-ink/70">
              매장 이용·매뉴 문의는 가까운 매장에, 가맹·제휴 문의는 본사로 연락 주세요.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container-x grid gap-12 md:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="font-display text-display-md font-extrabold text-brand-ink">
                본사 연락처
              </h2>
              <p className="mt-2 text-brand-ink/65">
                경상남도 창원시 의창구 사림동 본사
              </p>
            </Reveal>

            <ul className="mt-8 space-y-3">
              <Item icon={<Phone className="h-5 w-5" />} label="가맹·제휴 문의" value="1522-3862" href="tel:1522-3862" />
              <Item
                icon={<Mail className="h-5 w-5" />}
                label="이메일"
                value="kkh5817@naver.com"
                href="mailto:kkh5817@naver.com"
              />
              <Item
                icon={<MapPin className="h-5 w-5" />}
                label="본사 주소"
                value="경상남도 창원시 의창구 사림로 106, 1층 (사림동)"
              />
              <Item
                icon={<Instagram className="h-5 w-5" />}
                label="인스타그램"
                value="@kwfood_0437"
                href="https://www.instagram.com/kwfood_0437/"
              />
            </ul>

            <Reveal>
              <div className="mt-10 rounded-2xl bg-brand-cream p-6">
                <h3 className="font-bold text-brand-ink">자주 묻는 질문</h3>
                <ul className="mt-4 space-y-4 text-sm">
                  <Faq q="배달이 되나요?" a="매장에 따라 다릅니다. 가까운 매장으로 직접 문의 부탁드립니다." />
                  <Faq q="단체 예약이 가능한가요?" a="대부분의 매장에서 단체석 운영 중입니다. 매장에 직접 문의해 주세요." />
                  <Faq q="맵기 조절이 가능한가요?" a="네. 5단계로 조절되며 주문 시 맵기를 알려주시면 됩니다." />
                  <Faq q="가맹 상담은 어떻게 받나요?" a="가맹문의 페이지의 폼 작성 또는 본사 1522-3862로 연락 주세요." />
                </ul>
              </div>
            </Reveal>
          </div>

          <div>
            {done ? (
              <div className="card-soft p-8 md:p-10 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-red text-white">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-extrabold text-brand-ink">
                  문의가 접수되었습니다
                </h3>
                <p className="mt-3 text-brand-ink/70">빠르게 회신드리겠습니다. 감사합니다.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-soft p-6 md:p-8 space-y-5"
              >
                <Reveal>
                  <h2 className="font-display text-display-md font-extrabold text-brand-ink">
                    문의하기
                  </h2>
                </Reveal>

                <div>
                  <label className="label" htmlFor="c-name">이름 *</label>
                  <input id="c-name" {...register("name")} className="input" />
                  {errors.name && <p className="mt-1 text-xs text-brand-red">{errors.name.message}</p>}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="c-phone">연락처 *</label>
                    <input id="c-phone" {...register("phone")} className="input" placeholder="010-0000-0000" />
                    {errors.phone && <p className="mt-1 text-xs text-brand-red">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="label" htmlFor="c-email">이메일</label>
                    <input id="c-email" {...register("email")} className="input" placeholder="example@email.com" />
                    {errors.email && <p className="mt-1 text-xs text-brand-red">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="label" htmlFor="c-category">문의 유형 *</label>
                  <select id="c-category" {...register("category")} className="input">
                    <option value="">선택해 주세요</option>
                    <option>매장 이용·예약 문의</option>
                    <option>메뉴·서비스 관련</option>
                    <option>홍보·제휴·미디어</option>
                    <option>기타</option>
                  </select>
                  {errors.category && <p className="mt-1 text-xs text-brand-red">{errors.category.message}</p>}
                </div>

                <div>
                  <label className="label" htmlFor="c-message">내용 *</label>
                  <textarea id="c-message" rows={6} {...register("message")} className="input" />
                  {errors.message && <p className="mt-1 text-xs text-brand-red">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary w-full disabled:opacity-60"
                >
                  {isSubmitting ? "제출 중…" : (<>문의 보내기 <Send className="h-4 w-4" /></>)}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Item({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <li className="flex items-start gap-4 rounded-2xl border border-brand-gray-line bg-white p-5 transition hover:border-brand-red">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-red-soft text-brand-red">
        {icon}
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-brand-gray">{label}</div>
        <div className="mt-1 text-base font-bold text-brand-ink">{value}</div>
      </div>
    </li>
  );
  if (href)
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  return inner;
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <li>
      <div className="font-semibold text-brand-ink">Q. {q}</div>
      <div className="mt-1 text-brand-ink/70">A. {a}</div>
    </li>
  );
}
