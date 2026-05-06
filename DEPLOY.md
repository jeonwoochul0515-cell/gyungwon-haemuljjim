# 배포 가이드 — Cloudflare Pages

> 경원해물찜 홈페이지를 GitHub + Cloudflare Pages에 배포하는 절차.

---

## 1️⃣ GitHub 저장소 생성

### A) GitHub CLI 사용 (권장)

```powershell
# GitHub 로그인 (브라우저 열림)
gh auth login

# 저장소 생성 + 푸시
cd c:\Users\jeonw\.antigravity\gyungwon\website
gh repo create gyungwon-haemuljjim --public --source=. --remote=origin --push
```

### B) 수동 (GitHub 웹)

1. <https://github.com/new> 에서 새 저장소 만들기 (예: `gyungwon-haemuljjim`)
2. 로컬에서 push:

```powershell
cd c:\Users\jeonw\.antigravity\gyungwon\website
git remote add origin https://github.com/<USERNAME>/gyungwon-haemuljjim.git
git branch -M main
git push -u origin main
```

---

## 2️⃣ Cloudflare Pages 연결

1. <https://dash.cloudflare.com/> 로그인 → **Pages** → **Create a project** → **Connect to Git**
2. GitHub 계정 연결 → `gyungwon-haemuljjim` 저장소 선택
3. **Build settings**:

| 항목 | 값 |
|---|---|
| Project name | `gyungwon-haemuljjim` |
| Production branch | `main` |
| Framework preset | **Vite** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | (비워두기) |

4. **Environment variables (Production)**:

| Key | Value |
|---|---|
| `NODE_VERSION` | `20` |
| `VITE_FORM_ENDPOINT` | `/api/contact` |
| `FORM_WEBHOOK_URL` | (선택) Discord/Slack/Make.com Webhook URL |
| `FORM_TO_EMAIL` | `kkh5817@naver.com` |

5. **Save and Deploy** → 첫 빌드 시작
6. 완료 시 `<project>.pages.dev` 도메인이 발급됩니다.

---

## 3️⃣ 커스텀 도메인 (선택)

1. Pages 프로젝트 → **Custom domains** → **Set up a custom domain**
2. 예: `gyungwon-jjim.com` 또는 `kwfood0427.com` 입력
3. Cloudflare가 안내하는 DNS 레코드를 도메인 등록처에 등록
4. 자동으로 HTTPS 발급

---

## 4️⃣ 폼 백엔드 활성화

`functions/api/contact.ts` 가 자동 배포됩니다 (Cloudflare Pages Functions).

### 알림 받기

**옵션 A — Discord/Slack Webhook** (가장 간단)

1. Discord 서버 → 채널 설정 → 통합 → 웹후크 추가 → URL 복사
2. Cloudflare Pages 환경변수에 `FORM_WEBHOOK_URL` = 복사한 URL 등록
3. 폼 제출 시 디스코드 채널에 즉시 알림 도착

**옵션 B — 본사 이메일 (kkh5817@naver.com)**

`functions/api/contact.ts` 의 MailChannels 부분 활성화.
도메인 검증(SPF/DKIM)이 필요하므로 커스텀 도메인 연결 후 진행 권장.

**옵션 C — Make.com / Zapier 자동화**

`FORM_WEBHOOK_URL` 에 Make.com Webhook 등록 → 카카오 알림톡, 네이버 메일, Google Sheets 등 원하는 곳으로 라우팅.

---

## 5️⃣ 배포 후 점검

- [ ] `/` 홈 화면 정상 렌더
- [ ] 모든 라우트 (`/about`, `/menu`, `/stores`, `/franchise`, `/contact`) 직접 접근 가능 (SPA fallback)
- [ ] 매장 검색·필터 동작
- [ ] 가맹문의 폼 제출 → 본사 알림 도착
- [ ] 모바일에서 햄버거 메뉴 정상
- [ ] favicon 노출

---

## 6️⃣ 메뉴 사진 추가 절차

1. `public/images/menu/` 디렉토리에 이미지 업로드 (예: `haemul-jjim.jpg`, 1600x1200 권장)
2. `src/data/menu.ts` 의 각 메뉴 객체에 `image: "/images/menu/haemul-jjim.jpg"` 추가
3. `HomePage.tsx`, `MenuPage.tsx` 의 `<DishPlaceholder>` 를 `<img>` 로 교체
4. push → Cloudflare Pages 자동 재배포

---

## 7️⃣ 트러블슈팅

| 증상 | 원인 / 해결 |
|---|---|
| 직접 URL 접근 시 404 | `public/_redirects` 가 있는지 확인 |
| 빌드 실패 | Cloudflare 환경변수 `NODE_VERSION=20` 확인 |
| 폰트가 안 보임 | Pretendard CDN 차단 — 네트워크 정책 확인 |
| Functions 동작 안 함 | `functions/` 디렉토리가 루트에 있는지 확인 |

---

## 8️⃣ 향후 확장

- 카카오맵 SDK 연동 (점포별 위·경도 추가 후 `<StoreMap>` 컴포넌트 추가)
- 다국어 (i18next로 한/영/일 지원)
- 인스타그램 게시물 자동 임베드 (Instagram Graph API)
- 가맹점 권한별 관리자 페이지 (Cloudflare Access + Pages Functions)
