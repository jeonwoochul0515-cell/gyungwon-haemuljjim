import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>찾으시는 페이지가 없습니다 — 경원해물찜</title>
      </Helmet>
      <section className="container-x py-24 text-center">
        <div className="mx-auto max-w-md">
          <div className="font-display text-7xl font-extrabold text-brand-red">404</div>
          <h1 className="mt-4 font-display text-2xl font-extrabold text-brand-ink">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="mt-3 text-brand-ink/70">
            주소가 변경되었거나, 더 이상 존재하지 않는 페이지일 수 있습니다.
          </p>
          <Link to="/" className="btn btn-lg btn-primary mt-8">
            홈으로 돌아가기
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
