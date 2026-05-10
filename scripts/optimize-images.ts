// src/assets 안의 JPEG/PNG를 max-width로 리사이즈하고 mozjpeg 품질로 재압축
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import sharp from "sharp";

const ASSETS_DIR = "src/assets";
const MAX_WIDTH = 1600;
const QUALITY = 80;
const SKIP = new Set(["react.svg", "vite.svg"]);

async function main() {
  const here = path.dirname(url.fileURLToPath(import.meta.url));
  const dir = path.resolve(here, "..", ASSETS_DIR);
  const files = await fs.readdir(dir);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    if (SKIP.has(file)) continue;
    if (!/\.(jpe?g|png)$/i.test(file)) continue;

    const full = path.join(dir, file);
    const inputBuf = await fs.readFile(full); // 핸들 즉시 해제 (Windows lock 회피)
    const before = inputBuf.length;

    const buf = await sharp(inputBuf)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();

    // 항상 .jpg로 통일 저장 (png였더라도 사진엔 jpg가 적합)
    const outPath = full.replace(/\.png$/i, ".jpg");
    await fs.writeFile(outPath, buf);
    if (outPath !== full) await fs.unlink(full);

    const after = buf.length;
    totalBefore += before;
    totalAfter += after;
    console.log(
      `${file.padEnd(28)}  ${(before / 1024).toFixed(0).padStart(7)}KB → ${(after / 1024)
        .toFixed(0)
        .padStart(5)}KB  (${((after / before) * 100).toFixed(0)}%)`
    );
  }

  console.log(
    `\n총 ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(
      1
    )}MB  (${((totalAfter / totalBefore) * 100).toFixed(0)}%)`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
