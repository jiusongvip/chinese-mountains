// Final checks: inline scripts, FAQ visible headings, WebSite SearchAction.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

for (const rel of ["index.html", "mountains/huangshan/index.html"]) {
  const h = readFileSync(path.join(DIST, rel), "utf8");
  const inlineScripts = [...h.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)];
  let totalJS = 0;
  inlineScripts.forEach((m) => (totalJS += m[1].length));
  console.log(`[${rel}] inline <script> blocks: ${inlineScripts.length}, total inline JS: ${(totalJS / 1024).toFixed(0)}KB`);
  // find the largest inline block source
  if (inlineScripts.length) {
    const biggest = inlineScripts.reduce((a, b) => (b[1].length > a[1].length ? b : a));
    console.log(`   biggest block starts: ${biggest[1].slice(0, 120).replace(/\s+/g, " ")}`);
  }
}

// FAQ visible headings on mountain + best pages
for (const rel of ["mountains/huangshan/index.html", "best/index.html"]) {
  const h = readFileSync(path.join(DIST, rel), "utf8");
  const h2s = [...h.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  console.log(`\n[${rel}] h2 headings: ${h2s.join(" | ")}`);
}

// SearchAction on home
const home = readFileSync(path.join(DIST, "index.html"), "utf8");
const ws = home.match(/WebSite[\s\S]{0,600}/);
console.log("\nWebSite JSON-LD snippet:", ws ? ws[0].slice(0, 400) : "none");
