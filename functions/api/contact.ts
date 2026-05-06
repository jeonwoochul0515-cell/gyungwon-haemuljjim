/**
 * Cloudflare Pages Function - 문의·가맹 폼 수신.
 *
 * 환경 변수 (Cloudflare Pages 설정에서 등록):
 *   - FORM_WEBHOOK_URL : 외부 Webhook(예: 디스코드/슬랙/네이버워크스/Make.com)
 *   - FORM_TO_EMAIL    : 본사 메일 (kkh5817@naver.com 권장)
 *
 * Webhook 또는 외부 메일 발송 서비스(Resend, MailChannels 등)와 결합해
 * 본사로 직접 알림이 가도록 구성.
 *
 * 클라이언트 환경변수 VITE_FORM_ENDPOINT 를 "/api/contact" 로 설정하면 호출됩니다.
 */

interface Env {
  FORM_WEBHOOK_URL?: string;
  FORM_TO_EMAIL?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const data = await request.json<Record<string, unknown>>();

    // 1) Webhook 으로 알림
    if (env.FORM_WEBHOOK_URL) {
      const text = Object.entries(data)
        .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`)
        .join("\n");
      await fetch(env.FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content: `[경원해물찜 문의]\n${text}` }),
      });
    }

    // 2) MailChannels 무료 메일(Workers/Pages에서 사용 가능) — 도메인 검증 후 활성화
    // const to = env.FORM_TO_EMAIL ?? "kkh5817@naver.com";
    // ... fetch("https://api.mailchannels.net/tx/v1/send", { ... })

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
};

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
