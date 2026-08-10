// Integrate Siguniang photos: local PNG (main) + cc0.cn download (2nd).
// Usage: node scripts/integrate-siguniang.mjs
import sharp from "sharp";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(path.join(SCRIPT_DIR, ".."));
const TMP = path.join(SCRIPT_DIR, ".img-tmp");
const OUT = path.resolve(path.join(ROOT, "public", "images", "mountains"));
const DATA_FILE = path.join(ROOT, "src", "data", "mountains-data.json");

const LOCAL = "C:/Users/nec10/Downloads/网站图/四姑娘山.png";
const NET_URL = "https://img.cc0.cn/pixabay/201910282322085658.jpg!cc0.cn.jpg";

// 1) download network image
await mkdir(TMP, { recursive: true });
const netBuf = await fetch(NET_URL).then((r) => {
  if (!r.ok) throw new Error(`download failed: ${r.status}`);
  return r.arrayBuffer();
});
await writeFile(path.join(TMP, "siguniang-net.jpg"), Buffer.from(netBuf));
console.log("downloaded siguniang-net.jpg", (netBuf.byteLength / 1024).toFixed(0), "KB");

// 2) convert both to webp
async function toWebp(src, destName, credit) {
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
  console.log(`OK   ${destName.padEnd(22)} ${(buf.length / 1024).toFixed(0)} KB  q=${quality} w=${width}  ${meta.width}x${meta.height}  (${credit})`);
}

await toWebp(LOCAL, "siguniang.webp", "local");
await toWebp(path.join(TMP, "siguniang-net.jpg"), "siguniang-2.webp", "cc0.cn");

// 3) update data
const data = JSON.parse(await readFile(DATA_FILE, "utf8"));
const m = data.mountains.find((x) => x.slug === "siguniang");
m.images = [
  { src: "/images/mountains/siguniang.webp", alt: "The Four Sisters peaks of Mount Siguniang in western Sichuan", credit: "Chinese Mountains" },
  { src: "/images/mountains/siguniang-2.webp", alt: "Mount Siguniang's snow-covered ridges seen from the valley", credit: "Pixabay (CC0)" },
];
await writeFile(DATA_FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log("data updated: siguniang now has", m.images.length, "images");
