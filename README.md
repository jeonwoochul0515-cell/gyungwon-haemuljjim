# 경원해물찜 공식 홈페이지

> 경상남도 창원시 사림동에서 시작된 해물찜·아구찜 프랜차이즈 **경원해물찜0427** 의 공식 홈페이지.

[![React](https://img.shields.io/badge/React-19-61DAFB)]() [![Vite](https://img.shields.io/badge/Vite-Latest-646CFF)]() [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)]() [![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4)]()

## 🍲 브랜드 소개

- **상호**: 경원해물찜0427 (가맹본부 경원0427)
- **대표**: 김경희
- **본사**: 경상남도 창원시 의창구 사림로 106, 1층 (사림동)
- **가맹문의**: 1522-3862 / kkh5817@naver.com
- **인스타그램**: [@kwfood_0437](https://www.instagram.com/kwfood_0437/)
- **운영점포**: 약 30+ 개 (경남·부산·광주·전남·경북·전북)

---

## 🛠 기술 스택

- **Framework**: React 19 + TypeScript
- **Build**: Vite (rolldown)
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Form**: react-hook-form + zod
- **Animation**: framer-motion
- **Icons**: lucide-react
- **Deployment**: Cloudflare Pages
- **Form Backend**: Cloudflare Pages Functions (`/functions/api/contact.ts`)

---

## 🚀 로컬 개발

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # 프로덕션 빌드 → dist/
npm run preview      # 빌드 결과 로컬 미리보기
```

## 📁 디렉토리 구조

```
src/
├─ components/
│  ├─ layout/        # Header, Footer, Layout
│  └─ ui/            # Reveal, Stat, DishPlaceholder, InstagramIcon
├─ pages/            # 9개 페이지 (Home, About, Menu, Stores, Franchise, Contact, Privacy, Terms, NotFound)
├─ data/
│  ├─ stores.ts      # 가맹점 마스터 데이터 (32+ 점포)
│  └─ menu.ts        # 메뉴 마스터 데이터
├─ lib/cn.ts         # className util
├─ App.tsx           # 라우터 (lazy loading)
├─ main.tsx
└─ index.css         # Tailwind + Pretendard
public/
├─ _redirects        # Cloudflare Pages SPA 라우팅
├─ favicon.svg
├─ robots.txt
└─ sitemap.xml
functions/
└─ api/contact.ts    # Cloudflare Pages Function (폼 수신)
```

---

## 🎨 디자인 토큰

| 항목 | 값 |
|---|---|
| Primary | `#C8102E` (브랜드 레드) |
| Primary Deep | `#8E0B20` |
| Background | `#FAF7F2` (크림) |
| Ink (텍스트) | `#0E0E0E` |
| Accent | `#F5C518` (콩나물 옐로) |
| 한글 폰트 | Pretendard |

---

## 🧠 적용된 설득 심리학

이 홈페이지는 외식·가맹사업 도메인의 의사결정 패턴을 고려해 다음 심리학 원리를 디자인에 반영했습니다.

- **사회적 증거 (Social Proof)** — "전국 30+ 가맹점", 평균 평점 4.5/5, 인스타 노출
- **권위 (Authority)** — 정보공개서 등록 사실, 6년 운영, 본사 직공급
- **희소성 (Scarcity)** — "현재 모집 지역 한정", 영업지역 보호
- **일관성 (Consistency)** — 작은 액션(상담 폼) → 큰 액션(계약)으로의 단계적 유도
- **호혜성 (Reciprocity)** — 무료 상담, 무료 상권 분석
- **호감 (Liking)** — 김경희 대표 인사말 ("내 가족에게 내놓는 음식")
- **앵커링 (Anchoring)** — 메뉴 가격을 대→소 순으로 제시해 합리적 인식 유도
- **손실 회피 (Loss Aversion)** — "정보공개서 14일 사전 제공"으로 안전감 강조
- **스토리텔링** — 2020년 사림동 → 30+ 점포의 6년 여정

---

## 📊 가맹점 데이터 (`src/data/stores.ts`)

손글씨 명부, 본사 직접 검수, 다이닝코드/식신/네이버 플레이스 교차 검증을 모두 반영한 정본.

검증 등급:
- `본사`: 본사 직접 회신
- `외부`: 다이닝코드/식신 등 외부 인덱스 매칭
- `교차`: 본사 + 외부 자료 일치
- `미확정`: 추가 확인 필요

## 📝 메뉴 사진 추가 안내

현재 모든 메뉴는 `<DishPlaceholder>` 컴포넌트로 렌더되고 있습니다. 사진 수령 시:

1. `public/images/menu/` 디렉토리에 이미지 업로드 (예: `haemul-jjim.jpg`)
2. `src/data/menu.ts` 의 각 메뉴 객체에 `imagePlaceholder` 대신 `image` 필드 추가
3. `MenuPage.tsx`, `HomePage.tsx` 의 `<DishPlaceholder>` 를 `<img>` 로 교체

`src/components/ui/DishPlaceholder.tsx` 의 인터페이스는 `<img>` 와 동일한 비율을 사용하도록 설계되어 교체가 용이합니다.

---

## ☁️ Cloudflare Pages 배포

상세 절차는 [DEPLOY.md](./DEPLOY.md) 참고.

### 빠른 가이드

1. GitHub 저장소 생성 → push
2. Cloudflare Pages → "Connect to Git"
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `20`
4. 환경변수: `VITE_FORM_ENDPOINT=/api/contact`
5. (선택) 폼 알림용 `FORM_WEBHOOK_URL` 등록

---

## 📄 정보공개서 (Disclosure)

본 홈페이지의 가맹문의 페이지에 노출된 정보는 본사가 제공한 **정보공개서(2025년)** 를 기준으로 합니다.

- 가맹사업 시작일: 2020.03.24
- 직영점 시작일: 2021.01.01
- 기본 계약: 3년 / 갱신 2년 / 최대 10년 갱신권
- 가맹금 예치: 경남은행
- 점포 디자인 시안: 3.3㎡당 198,000원 (부가세 포함)
- 계약 14일 전 정보공개서 제공 (가맹사업법 준수)

---

## 📬 연락처

문의: kkh5817@naver.com / 1522-3862

---

© 2026 경원해물찜 (경원0427)
