// Convert local Mingsha photo to optimized WebP (replace existing main image).
// Usage: node scripts/convert-mingsha.mjs
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(path.join(SCRIPT_DIR, "..", "public", "images", "mountains"));

const SRC = "C:/Users/nec10/Downloads/网站图/鸣沙山.png";
const DEST = "mingsha.webp";

let quality = 82;
let width = 1600;
let buf = await sharp(SRC).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toBuffer();
while (buf.length > 300 * 1024 && (quality > 50 || width > 1000)) {
  if (quality > 50) {
    quality -= 8;
  } else {
    width -= 300;
  }
  buf = await sharp(SRC).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toBuffer();
}
await writeFile(path.join(OUT, DEST), buf);
const meta = await sharp(buf).metadata();
console.log(`OK   ${DEST} ${(buf.length / 1024).toFixed(0)} KB  q=${quality} w=${width}  ${meta.width}x${meta.height}`);
