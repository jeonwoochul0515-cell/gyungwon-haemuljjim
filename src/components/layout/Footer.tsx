import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon as Instagram } from "../ui/InstagramIcon";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-gray-line bg-brand-ink text-white">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display font-extrabold">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-red text-white text-sm">
              慶
            </span>
            <span className="text-lg">
              경원<span className="text-brand-red">해물찜</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
            2020년 경상남도 창원시 사림동에서 시작된 해물찜·아구찜 전문 프랜차이즈.
            본사가 식자재를 직공급해 모든 매장에서 같은 맛, 같은 신선도를 약속합니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/kwfood_0437/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-white hover:text-white"
            >
              <Instagram className="h-4 w-4" />
              @kwfood_0437
            </a>
            <a
              href="tel:1522-3862"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-white hover:text-white"
            >
              <Phone className="h-4 w-4" />
              1522-3862
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white/60">
            바로가기
          </h4>
          <ul className="space-y-2 text-sm text-white/85">
            <li><Link to="/about" className="hover:text-white">브랜드 스토리</Link></li>
            <li><Link to="/menu" className="hover:text-white">메뉴</Link></li>
            <li><Link to="/stores" className="hover:text-white">매장 찾기</Link></li>
            <li><Link to="/franchise" className="hover:text-white">가맹 문의</Link></li>
            <li><Link to="/contact" className="hover:text-white">고객센터</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white/60">
            본사
          </h4>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span>경상남도 창원시 의창구 사림로 106, 1층 (사림동)</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span>1522-3862</span>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span>kkh5817@naver.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} 경원해물찜 (경원0427) · 대표 김경희 · 사업자등록번호
            208-11-53539
          </div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white/80">개인정보처리방침</Link>
            <Link to="/terms" className="hover:text-white/80">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
