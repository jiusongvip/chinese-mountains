// Dump every <script> and <link> in built home page to diagnose island hydration.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const h = readFileSync(path.join(DIST, "index.html"), "utf8");

const scripts = [...h.matchAll(/<script[\s\S]*?<\/script>/g)].map((m) => m[0]);
console.log(`script blocks: ${scripts.length}`);
scripts.forEach((t, i) => {
  const src = (t.match(/src="([^"]*)"/) || [])[1] || "NONE";
  const type = (t.match(/type="([^"]*)"/) || [])[1] || "NONE";
  console.log(`  #${i} type=${type} src=${src} len=${t.length}`);
});

const links = [...h.matchAll(/<link[^>]*rel="(?:modulepreload|preload)"[^>]*>/g)].map((m) => m[0]);
console.log(`\nmodulepreload/preload links: ${links.length}`);
links.slice(0, 12).forEach((l) => console.log("  ", l.slice(0, 140)));

const astroRefs = [...h.matchAll(/\/_astro\/[^"')>]+/g)].map((m) => m[0]);
console.log("\n_astro refs:", astroRefs.length, [...new Set(astroRefs)].join(", "));
