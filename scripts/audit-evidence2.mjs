// Supplementary evidence: JS payload per page, lazy loading, heavy images, og images.
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

// 1) scripts per page (non-inline)
for (const rel of ["index.html", "mountains/huangshan/index.html", "blog/first-timer-guide-2026/index.html", "compare/index.html", "privacy/index.html"]) {
  const h = readFileSync(path.join(DIST, rel), "utf8");
  const scripts = [...h.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  console.log(`[${rel}] scripts: ${scripts.length}`);
  scripts.forEach((s) => {
    if (s.startsWith("/_astro/")) {
      const f = path.join(DIST, s.replace(/^\//, ""));
      console.log(`   ${s} ${(statSync(f).size / 1024).toFixed(0)}KB`);
    } else console.log(`   ${s}`);
  });
}

// 2) lazy loading on image-heavy pages
for (const rel of ["index.html", "best/index.html", "explore/index.html", "gallery/index.html", "mountains/huangshan/index.html"]) {
  const h = readFileSync(path.join(DIST, rel), "utf8");
  const imgs = [...h.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  const lazy = imgs.filter((i) => /loading="lazy"/.test(i)).length;
  const eager = imgs.filter((i) => /loading="eager"/.test(i)).length;
  const none = imgs.length - lazy - eager;
  console.log(`[${rel}] imgs=${imgs.length} lazy=${lazy} eager=${eager} no-attr=${none}`);
}

// 3) heavy images
const imgDir = path.join(DIST, "images", "mountains");
const heavy = readdirSync(imgDir)
  .filter((f) => /\.(webp|jpg|png)$/i.test(f))
  .map((f) => [f, statSync(path.join(imgDir, f)).size])
  .filter(([, s]) => s > 300 * 1024)
  .sort((a, b) => b[1] - a[1]);
console.log("\n>300KB images:");
heavy.forEach(([f, s]) => console.log(`   ${f} ${(s / 1024).toFixed(0)}KB`));

// 4) og:image on a mountain page + sitemap 404 check
const mt = readFileSync(path.join(DIST, "mountains", "huangshan", "index.html"), "utf8");
const og = (mt.match(/<meta property="og:image" content="([^"]+)"/) || [])[1];
console.log("\nhuangshan og:image:", og);

const sm = readFileSync(path.join(DIST, "sitemap-0.xml"), "utf8");
console.log("sitemap contains /404:", sm.includes("/404"));
console.log("sitemap lastmod sample:", [...sm.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].slice(0, 3).map((m) => m[1]).join(" | "));

// 5) FAQPage on mountain page matches visible FAQ text?
const faqLd = (mt.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || []).map((s) => s);
console.log("\nmountain page JSON-LD blocks:", faqLd.length);
const visFAQ = (mt.match(/<h2[^>]*>FAQ/gs) || []).length;
console.log("visible FAQ heading present:", visFAQ > 0);

// 6) title entity check on blog post
const blog = readFileSync(path.join(DIST, "blog", "first-timer-guide-2026", "index.html"), "utf8");
console.log("\nblog title raw:", (blog.match(/<title>(.*?)<\/title>/s) || [])[1]);

// 7) check hreflang / alternate / og:type / twitter on home
const home = readFileSync(path.join(DIST, "index.html"), "utf8");
console.log("home hreflang:", home.includes("hreflang"), "| og:type:", home.includes('property="og:type"'), "| twitter:card:", home.includes('name="twitter:card"'));
