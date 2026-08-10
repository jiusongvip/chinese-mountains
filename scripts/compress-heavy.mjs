// Re-compress images over 300KB to the site standard (<300KB, width<=1600).
import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "mountains");

const TARGETS = ["hengshan-shanxi", "hengshan-hunan", "jade-dragon", "hailuogou", "tianmen", "kanas"];

for (const slug of TARGETS) {
  const src = path.join(OUT, `${slug}.webp`);
  const input = await readFile(src); // fully read to release the file handle
  let quality = 82;
  let width = 1600;
  let buf = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toBuffer();
  while (buf.length > 300 * 1024 && (quality > 50 || width > 1000)) {
    if (quality > 50) quality -= 8;
    else width -= 300;
    buf = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toBuffer();
  }
  const tmp = src + ".tmp";
  await writeFile(tmp, buf);
  await rename(tmp, src);
  const meta = await sharp(buf).metadata();
  console.log(`OK   ${slug.padEnd(20)} ${(buf.length / 1024).toFixed(0)} KB  q=${quality} w=${width}  ${meta.width}x${meta.height}`);
}
