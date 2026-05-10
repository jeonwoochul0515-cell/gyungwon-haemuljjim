// 카카오 Local REST API로 stores.ts의 점포 주소를 좌표로 변환해 JSON에 저장
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import dotenv from "dotenv";
import { stores } from "../src/data/stores.js";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

const KEY = process.env.KAKAO_REST_KEY;

if (!KEY) {
  console.error(
    "\n✗ KAKAO_REST_KEY 환경변수가 없습니다.\n" +
      "  website/.env 파일에 다음 줄을 추가해 주세요\n\n" +
      "    KAKAO_REST_KEY=발급받은_REST_API_키\n\n" +
      "  카카오 디벨로퍼스 → 내 애플리케이션 → 앱 키 → REST API 키\n"
  );
  process.exit(1);
}

interface KakaoDoc {
  x: string;
  y: string;
  address?: { region_1depth_name?: string; address_name?: string };
  road_address?: { region_1depth_name?: string; address_name?: string };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function geocodeQuery(query: string): Promise<KakaoDoc | null> {
  const u =
    "https://dapi.kakao.com/v2/local/search/address.json?query=" +
    encodeURIComponent(query);
  const res = await fetch(u, {
    headers: { Authorization: `KakaoAK ${KEY}` },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { documents?: KakaoDoc[] };
  return data.documents?.[0] ?? null;
}

interface MinimalStore {
  slug: string;
  name: string;
  address: string;
  addressLot?: string;
}

function variants(s: MinimalStore): string[] {
  const out = new Set<string>();
  const push = (v?: string) => {
    if (!v) return;
    const t = v.trim();
    if (t.length > 5) out.add(t);
  };
  if (s.address) {
    push(s.address);
    push(s.address.replace(/,?\s*\d+층.*$/u, ""));
    push(s.address.replace(/\s+\S+빌딩.*$/u, ""));
    push(s.address.replace(/\s+\d+호.*$/u, ""));
    push(s.address.replace(/\s*\([^)]*\)\s*$/u, ""));
    push(s.address.split(",")[0]);
  }
  push(s.addressLot);
  return [...out];
}

async function main() {
  const out: Record<string, [number, number]> = {};
  const misses: { slug: string; name: string; address: string }[] = [];

  console.log(`\n→ ${stores.length}개 점포 지오코딩 시작\n`);

  for (const s of stores) {
    let doc: KakaoDoc | null = null;
    let usedQuery = "";
    for (const q of variants(s)) {
      doc = await geocodeQuery(q);
      await sleep(150);
      if (doc) {
        usedQuery = q;
        break;
      }
    }
    if (doc) {
      out[s.slug] = [Number(doc.y), Number(doc.x)];
      const tag = usedQuery === s.address ? "  " : "↻ ";
      console.log(
        `✓ ${tag}${s.slug.padEnd(20)} ${s.name.padEnd(12)} [${doc.y}, ${doc.x}]`
      );
    } else {
      misses.push({ slug: s.slug, name: s.name, address: s.address });
      console.warn(
        `✗   ${s.slug.padEnd(20)} ${s.name.padEnd(12)} MISS — ${s.address}`
      );
    }
  }

  const here = path.dirname(url.fileURLToPath(import.meta.url));
  const outPath = path.resolve(here, "../src/data/stores.geocoded.json");
  await fs.writeFile(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

  const ok = Object.keys(out).length;
  const total = stores.length;
  console.log(
    `\n✓ ${ok}/${total} 좌표를 ${path.relative(process.cwd(), outPath)}에 저장`
  );
  if (misses.length) {
    console.log(`\n✗ ${misses.length}개 점포는 카카오에서 좌표를 못 찾았습니다`);
    misses.forEach((m) => console.log(`  - ${m.slug} ${m.name} (${m.address})`));
    console.log(
      "\n  → stores.ts의 storeCoords 폴백에 수동 입력하거나, 주소를 정정 후 재실행"
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
