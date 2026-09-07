// Regenerate thumbs/320, thumbs/640, thumbs/960 from the original
// public/images/mountains/*.webp masters with tuned quality targets:
//   320 -> <18KB, 640 -> <40KB, 960 -> <85KB (steps down to q=58)
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const MOUNTAINS = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "mountains");
const THUMBS = path.join(MOUNTAINS, "thumbs");

const RULES = {
  320: { limit: 18 * 1024, qStart: 74, qFloor: 58 },
  640: { limit: 40 * 1024, qStart: 74, qFloor: 58 },
  960: { limit: 85 * 1024, qStart: 74, qFloor: 58 },
};

const masters = (await readdir(MOUNTAINS, { withFileTypes: true }))
  .filter((e) => e.isFile() && e.name.endsWith(".webp"))
  .map((e) => e.name);

let totalBefore = 0, totalAfter = 0;

for (const [dir, rule] of Object.entries(RULES)) {
  const folder = path.join(THUMBS, dir);
  const width = Number(dir);
  let before = 0, after = 0, changed = 0;
  for (const name of masters) {
    const thumbPath = path.join(folder, name);
    const master = await readFile(path.join(MOUNTAINS, name));
    let quality = rule.qStart;
    let buf = await sharp(master).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toBuffer();
    while (buf.length > rule.limit && quality > rule.qFloor) {
      quality -= 4;
      buf = await sharp(master).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toBuffer();
    }
    const existing = await readFile(thumbPath).catch(() => null);
    if (existing) before += existing.length;
    if (!existing || buf.length < existing.length) {
      await writeFile(thumbPath, buf);
      after += buf.length;
      changed++;
      if (existing) console.log(`${dir}/${name}: ${(existing.length / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB (q${quality})`);
    } else {
      after += existing.length;
    }
  }
  totalBefore += before; totalAfter += after;
  console.log(`== ${dir}px: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${changed} files updated)`);
}
console.log(`== TOTAL: ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfter / 1024).toFixed(0)}KB`);
