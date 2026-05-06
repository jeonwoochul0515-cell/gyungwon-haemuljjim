import { Helmet } from "react-helmet-async";

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>이용약관 — 경원해물찜</title>
      </Helmet>
      <section className="container-x py-16 md:py-24">
        <h1 className="font-display text-display-md font-extrabold text-brand-ink">
          홈페이지 이용약관
        </h1>
        <p className="mt-4 text-sm text-brand-gray">시행일자: 2026년 5월 6일</p>

        <div className="mt-8 space-y-6 text-brand-ink/80 leading-relaxed">
          <p>
            본 약관은 경원해물찜(이하 "회사")이 운영하는 공식 홈페이지(이하 "사이트")의
            이용에 관한 사항을 규정합니다.
          </p>
          <Section title="제1조 (목적)">
            본 약관은 사이트 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임 사항,
            기타 필요한 사항을 규정함을 목적으로 합니다.
          </Section>
          <Section title="제2조 (서비스의 제공)">
            회사는 본 사이트를 통해 브랜드 정보, 메뉴, 매장 안내, 가맹 상담 등 정보 제공
            서비스를 운영합니다.
          </Section>
          <Section title="제3조 (이용자의 의무)">
            이용자는 본 사이트의 정보를 무단 복제·배포해서는 안 되며, 회사의 명예를 훼손하는
            행위를 해서는 안 됩니다.
          </Section>
          <Section title="제4조 (저작권)">
            본 사이트 내 모든 콘텐츠(텍스트, 이미지, 디자인)에 대한 저작권은 회사 또는
            정당한 권리자에게 있습니다.
          </Section>
          <Section title="제5조 (책임의 제한)">
            본 사이트의 정보는 게재 시점의 정보를 기준으로 하며, 매장 운영시간·메뉴·가격은
            매장 사정에 따라 변경될 수 있습니다.
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
