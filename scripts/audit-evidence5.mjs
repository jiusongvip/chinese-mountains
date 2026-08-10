// Dump inline script contents of home page to verify React island hydration.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const h = readFileSync(path.join(DIST, "index.html"), "utf8");
const blocks = [...h.matchAll(/<script[\s\S]*?<\/script>/g)].map((m) => m[0]);
blocks.forEach((t, i) => {
  console.log(`\n===== block ${i} (${t.length} chars) =====`);
  console.log(t.slice(0, 800));
});
