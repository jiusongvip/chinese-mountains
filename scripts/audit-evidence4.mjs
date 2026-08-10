// Inspect all <script> blocks in built HTML.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");

for (const rel of ["index.html", "mountains/huangshan/index.html", "explore/index.html"]) {
  const h = readFileSync(path.join(DIST, rel), "utf8");
  const blocks = [...h.matchAll(/<script[\s\S]*?<\/script>/g)].map((m) => m[0]);
  console.log(`[${rel}] script blocks: ${blocks.length}`);
  blocks.forEach((t, i) => {
    const src = (t.match(/src="([^"]*)"/) || [])[1] || "NONE";
    const type = (t.match(/type="([^"]*)"/) || [])[1] || "NONE";
    console.log(`  #${i} type=${type} src=${src} inlineLen=${t.length - t.indexOf(">") - 9}`);
  });
}
