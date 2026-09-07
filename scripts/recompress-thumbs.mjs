// Re-compress thumb sizes 640/960 with tighter quality targets.
// 640 -> <35KB, 960 -> <80KB by stepping quality down, floor q=55.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "mountains", "thumbs");

const RULES = {
  "640": { limit: 35 * 1024, qStart: 76, qFloor: 52 },
  "960": { limit: 80 * 1024, qStart: 74, qFloor: 52 },
};

for (const [dir, rule] of Object.entries(RULES)) {
  const folder = path.join(ROOT, dir);
  const files = (await readdir(folder)).filter((f) => f.endsWith(".webp"));
  let before = 0, after = 0, changed = 0;
  for (const f of files) {
    const src = path.join(folder, f);
    const input = await readFile(src);
    before += input.length;
    if (input.length <= rule.limit) { after += input.length; continue; }
    let quality = rule.qStart;
    let buf = await sharp(input).webp({ quality }).toBuffer();
    while (buf.length > rule.limit && quality > rule.qFloor) {
      quality -= 4;
      buf = await sharp(input).webp({ quality }).toBuffer();
    }
    if (buf.length < input.length) {
      await writeFile(src, buf);
      after += buf.length;
      changed++;
      console.log(`${dir}/${f}: ${(input.length / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB (q${quality})`);
    } else {
      after += input.length;
    }
  }
  console.log(`== ${dir}px: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${changed} files recompressed)`);
}
