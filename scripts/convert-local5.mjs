// Convert 5 local mountain photos to optimized WebP (replace existing main images).
// Usage: node scripts/convert-local5.mjs
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(path.join(SCRIPT_DIR, "..", "public", "images", "mountains"));

const JOBS = [
  { src: "C:/Users/nec10/Downloads/网站图/雁荡山.png", dest: "yandang.webp" },
  { src: "C:/Users/nec10/Downloads/网站图/天山.png", dest: "tianshan.webp" },
  { src: "C:/Users/nec10/Downloads/网站图/梵净山.png", dest: "fanjing.webp" },
  { src: "C:/Users/nec10/Downloads/网站图/丹霞山.png", dest: "danxia.webp" },
  { src: "C:/Users/nec10/Downloads/网站图/青城山.png", dest: "qingcheng.webp" },
];

async function toWebp(src, destName) {
  const dest = path.join(OUT, destName);
  let quality = 82;
  let width = 1600;
  let buf = await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toBuffer();
  while (buf.length > 300 * 1024 && (quality > 50 || width > 1000)) {
    if (quality > 50) {
      quality -= 8;
    } else {
      width -= 300;
    }
    buf = await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toBuffer();
  }
  await writeFile(dest, buf);
  const meta = await sharp(buf).metadata();
  console.log(`OK   ${destName.padEnd(22)} ${(buf.length / 1024).toFixed(0)} KB  q=${quality} w=${width}  ${meta.width}x${meta.height}`);
}

for (const job of JOBS) {
  await toWebp(job.src, job.dest);
}
console.log("done");
