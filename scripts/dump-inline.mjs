// Show inline script contents (non JSON-LD) of built home page.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const h = readFileSync(path.join(DIST, "index.html"), "utf8");

const scripts = [...h.matchAll(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/g)].map((m) => m[0]);
scripts.forEach((t, i) => {
  const inner = t.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
  console.log(`\n===== block ${i} (${inner.length} chars) =====`);
  console.log(inner.slice(0, 600));
});
