// Convert downloaded photos to optimized WebP (max width 1600, target <300KB).
// Usage: node scripts/convert-images.mjs
import sharp from "sharp";
import { readdir, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const TMP = path.join(SCRIPT_DIR, ".img-tmp");
const OUT = path.resolve(path.join(SCRIPT_DIR, "..", "public", "images", "mountains"));
const KAILASH_SRC = "C:\\Users\\nec10\\Downloads\\网站图";

// tempName -> final webp name (first image of each mountain replaces the old main image)
const MAP = {
  "huangshan-1.jpg": "huangshan.webp",
  "huangshan-2.jpg": "huangshan-2.webp",
  "huangshan-3.jpg": "huangshan-3.webp",
  "everest-1.jpg": "everest.webp",
  "everest-2.jpg": "everest-2.webp",
  "everest-3.jpg": "everest-3.webp",
  "zhangjiajie-1.jpg": "zhangjiajie.webp",
  "zhangjiajie-2.jpg": "zhangjiajie-2.webp",
  "zhangjiajie-3.jpg": "zhangjiajie-3.webp",
  "huashan-1.jpg": "huashan.webp",
  "huashan-2.jpg": "huashan-2.webp",
  "huashan-3.jpg": "huashan-3.webp",
  "emeishan-1.jpg": "emeishan.webp",
  "emeishan-2.jpg": "emeishan-2.webp",
  "emeishan-3.jpg": "emeishan-3.webp",
  "guilin-1.jpg": "guilin.webp",
  "guilin-2.jpg": "guilin-2.webp",
  "guilin-3.jpg": "guilin-3.webp",
  "gongga-1.jpg": "gongga.webp",
  "gongga-2.jpg": "gongga-2.webp",
  "gongga-3.jpg": "gongga-3.webp",
  "namcha-1.jpg": "namcha-barwa.webp",
  "meili-1.jpg": "meili-snow.webp",
  "meili-2.jpg": "meili-snow-2.webp",
  "meili-3.jpg": "meili-snow-3.webp",
  "kailash-1.png": "kailash.webp",
  "kailash-2.png": "kailash-2.webp",
  "kailash-3.png": "kailash-3.webp",
};

// Backup old namcha-barwa main image as its second photo (only 1 new unique photo available)
await copyFile(path.join(OUT, "namcha-barwa.webp"), path.join(OUT, "namcha-barwa-2.webp"));

// Copy local Kailash PNGs into the temp dir
for (let i = 1; i <= 3; i++) {
  await copyFile(path.join(KAILASH_SRC, `Kailash（冈仁波齐）${i}.png`), path.join(TMP, `kailash-${i}.png`));
}

async function toWebp(srcName, destName) {
  const src = path.join(TMP, srcName);
  const dest = path.join(OUT, destName);
  let quality = 82;
  let width = 1600;
  let buf = await sharp(src)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer();
  while (buf.length > 300 * 1024 && (quality > 50 || width > 1000)) {
    if (quality > 50) {
      quality -= 8;
    } else {
      width -= 300;
    }
    buf = await sharp(src)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
  }
  await writeFile(dest, buf);
  const meta = await sharp(buf).metadata();
  console.log(
    `OK   ${destName.padEnd(22)} ${(buf.length / 1024).toFixed(0)} KB  q=${quality} w=${width}  ${meta.width}x${meta.height}`
  );
}

const files = await readdir(TMP);
let ok = 0;
for (const [srcName, destName] of Object.entries(MAP)) {
  if (!files.includes(srcName)) {
    console.error(`MISSING ${srcName}`);
    continue;
  }
  try {
    await toWebp(srcName, destName);
    ok++;
  } catch (err) {
    console.error(`FAIL ${srcName}: ${err.message}`);
  }
}
console.log(`\nConverted ${ok}/${Object.keys(MAP).length}`);
