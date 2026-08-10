// Verify F1-F3 fixes in dist output.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

let fail = 0;
const check = (ok, msg) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}`);
  if (!ok) fail++;
};

// F1: no lastmod anywhere in sitemap
const smFiles = ["sitemap-index.xml", "sitemap-0.xml"].filter((f) => existsSync(path.join(DIST, f)));
for (const f of smFiles) {
  const sm = readFileSync(path.join(DIST, f), "utf8");
  check(!/<lastmod>/.test(sm), `F1 no <lastmod> in ${f}`);
}

// F2: no third-party CSS; local refs present
for (const rel of ["index.html", "mountains/huangshan/index.html"]) {
  const h = readFileSync(path.join(DIST, rel), "utf8");
  check(!/cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com/.test(h), `F2 ${rel} no external css`);
  check(h.includes('href="/fonts/geist.css"'), `F2 ${rel} local geist css`);
  check(h.includes('href="/leaflet/leaflet.css"'), `F2 ${rel} local leaflet css`);
}
check(existsSync(path.join(DIST, "fonts", "geist.css")), "F2 dist has fonts/geist.css");
check(existsSync(path.join(DIST, "fonts", "Geist-Variable.woff2")), "F2 dist has Geist-Variable.woff2");
check(existsSync(path.join(DIST, "leaflet", "leaflet.css")), "F2 dist has leaflet/leaflet.css");
check(existsSync(path.join(DIST, "leaflet", "images", "marker-icon.png")), "F2 dist has leaflet/images");

// F3: no image > 300KB in dist
const imgDir = path.join(DIST, "images", "mountains");
const all = readdirSync(imgDir).filter((f) => /\.(webp|jpg|png)$/i.test(f));
const heavy = all.filter((f) => statSync(path.join(imgDir, f)).size > 300 * 1024);
check(heavy.length === 0, `F3 all ${all.length} images < 300KB${heavy.length ? " : " + heavy.join(",") : ""}`);

console.log(fail ? `\n${fail} check(s) FAILED` : "\nAll checks passed.");
