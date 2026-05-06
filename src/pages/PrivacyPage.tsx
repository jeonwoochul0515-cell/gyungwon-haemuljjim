import { Helmet } from "react-helmet-async";

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>개인정보처리방침 — 경원해물찜</title>
      </Helmet>
      <section className="container-x py-16 md:py-24 prose-styled">
        <h1 className="font-display text-display-md font-extrabold text-brand-ink">
          개인정보처리방침
        </h1>
        <p className="mt-4 text-sm text-brand-gray">시행일자: 2026년 5월 6일</p>

        <div className="mt-8 space-y-6 text-brand-ink/80 leading-relaxed">
          <Section title="1. 수집하는 개인정보 항목">
            가맹 상담·일반 문의 시 이름, 연락처, 이메일, 희망 지역, 예상 자금, 문의 내용을
            수집합니다.
          </Section>
          <Section title="2. 개인정보의 수집·이용 목적">
            상담 및 문의 응대, 가맹 계약 관련 안내, 본사와의 커뮤니케이션 외 다른 목적으로는
            사용되지 않습니다.
          </Section>
          <Section title="3. 개인정보의 보유·이용 기간">
            수집된 개인정보는 수집 목적 달성 후 1년간 보관 후 파기됩니다. 단, 관계 법령에 따라
            보존 의무가 있는 경우 해당 기간 동안 보관합니다.
          </Section>
          <Section title="4. 개인정보의 제3자 제공">
            원칙적으로 개인정보를 외부에 제공하지 않습니다. 단, 이용자의 동의가 있거나 관계
            법령에 의한 경우는 예외입니다.
          </Section>
          <Section title="5. 이용자의 권리">
            이용자는 본인의 개인정보 열람, 수정, 삭제, 처리정지를 요구할 수 있으며, 본사
            이메일(kkh5817@naver.com)로 요청 시 지체 없이 처리합니다.
          </Section>
          <Section title="6. 개인정보 보호 책임자">
            성명: 김경희 (대표) · 연락처: 1522-3862 · 이메일: kkh5817@naver.com
          </Section>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-brand-ink">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}
