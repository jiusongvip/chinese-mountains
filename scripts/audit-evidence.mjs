// Pre-launch SEO evidence collection: scan dist output, sitemap, robots, pages.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

// ---------- 1. page inventory ----------
const htmlFiles = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) htmlFiles.push(p);
  }
})(DIST);
console.log("=== PAGES:", htmlFiles.length);
console.log(htmlFiles.map((p) => p.replace(DIST + path.sep, "").replace(/\\/g, "/")).join("\n"));

// ---------- 2. sitemap ----------
const smIndex = existsSync(path.join(DIST, "sitemap-index.xml"))
  ? readFileSync(path.join(DIST, "sitemap-index.xml"), "utf8")
  : "NOT FOUND";
console.log("\n=== sitemap-index.xml ===");
console.log(smIndex.slice(0, 600));
const smFiles = readdirSync(DIST).filter((f) => /^sitemap-\d+\.xml$/.test(f));
let urlCount = 0;
const hosts = new Set();
const lastmods = new Set();
for (const f of smFiles) {
  const xml = readFileSync(path.join(DIST, f), "utf8");
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  urlCount += urls.length;
  urls.forEach((u) => hosts.add(new URL(u).host));
  [...xml.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].forEach((m) => lastmods.add(m[1].slice(0, 10)));
}
console.log(`sitemap files: ${smFiles.length}, total URLs: ${urlCount}, hosts: ${[...hosts].join(",")}`);
console.log("lastmod dates:", [...lastmods].join(", "));

// ---------- 3. robots ----------
console.log("\n=== robots.txt (dist) ===");
console.log(readFileSync(path.join(DIST, "robots.txt"), "utf8"));

// ---------- 4. per-page checks ----------
const checks = [];
function checkPage(rel, label) {
  const p = path.join(DIST, rel, "index.html");
  if (!existsSync(p)) {
    checks.push({ label, missing: true });
    return;
  }
  const h = readFileSync(p, "utf8");
  const title = (h.match(/<title>(.*?)<\/title>/s) || [])[1] ?? "";
  const desc = (h.match(/<meta name="description" content="(.*?)"/s) || [])[1] ?? "";
  const canonical = (h.match(/<link rel="canonical" href="(.*?)"/) || [])[1] ?? "";
  const h1s = [...h.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  const robots = (h.match(/<meta name="robots" content="(.*?)"/) || [])[1] ?? "";
  const ldTypes = [...h.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((m) => m[1]);
  const imgs = [...h.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((i) => !/alt=/.test(i));
  const external = [...new Set([...h.matchAll(/<(?:link|script)[^>]+href="(https?:\/\/[^"]+)"/g)].map((m) => new URL(m[1]).host))];
  const aCount = (h.match(/<a /g) || []).length;
  checks.push({
    label,
    missing: false,
    title: title.slice(0, 90),
    titleLen: title.length,
    descLen: desc.length,
    desc,
    canonical,
    h1: h1s,
    robots,
    ldTypes: [...new Set(ldTypes)],
    imgs: imgs.length,
    noAlt: noAlt.length,
    external,
    aCount,
  });
}

checkPage("", "HOME /");
checkPage("mountains/huangshan", "MT huangshan");
checkPage("mountains/cangshan", "MT cangshan");
checkPage("best", "BEST");
checkPage("explore", "EXPLORE");
checkPage("gallery", "GALLERY");
checkPage("compare", "COMPARE");
checkPage("blog", "BLOG index");
checkPage("blog/first-timer-guide-2026", "BLOG post");
checkPage("guides/spring", "GUIDE spring");
checkPage("about", "ABOUT");
checkPage("contact", "CONTACT");
checkPage("privacy", "PRIVACY");

for (const c of checks) {
  if (c.missing) {
    console.log(`\n[MISSING] ${c.label}`);
    continue;
  }
  console.log(`\n[${c.label}] title(${c.titleLen}) h1=[${c.h1.join(" | ")}] desc(${c.descLen}) canonical=${c.canonical} robots=${c.robots || "none"} imgs=${c.imgs}(noAlt ${c.noAlt}) links=${c.aCount}`);
  console.log(`   ldTypes: ${c.ldTypes.join(", ") || "NONE"}`);
  console.log(`   desc: ${c.desc.slice(0, 120)}`);
  if (c.external.length) console.log(`   external: ${c.external.join(", ")}`);
}

// ---------- 5. 404 page ----------
const p404 = path.join(DIST, "404.html");
if (existsSync(p404)) {
  const h = readFileSync(p404, "utf8");
  const robots = (h.match(/<meta name="robots" content="(.*?)"/) || [])[1] ?? "";
  const title = (h.match(/<title>(.*?)<\/title>/s) || [])[1] ?? "";
  const canonical = (h.match(/<link rel="canonical" href="(.*?)"/) || [])[1] ?? "";
  console.log(`\n=== 404.html robots=${robots || "none"} title=${title.slice(0, 60)} canonical=${canonical}`);
}

// ---------- 6. image files ----------
const imgDir = path.join(DIST, "images", "mountains");
const imgs = readdirSync(imgDir).filter((f) => /\.(webp|jpg|png)$/i.test(f));
const sizes = imgs.map((f) => [f, statSync(path.join(imgDir, f)).size]);
const over300 = sizes.filter(([, s]) => s > 300 * 1024);
const over100 = sizes.filter(([, s]) => s > 100 * 1024);
console.log(`\n=== images: ${imgs.length} files; >300KB: ${over300.length}; >100KB: ${over100.length}`);
console.log("formats:", imgs.reduce((acc, f) => ((acc[f.split(".").pop()] = (acc[f.split(".").pop()] || 0) + 1), acc), {}));
const ogDefault = existsSync(path.join(DIST, "images", "og-default.png"));
console.log("og-default.png exists:", ogDefault);

// ---------- 7. HTML size ----------
const homeHtml = readFileSync(path.join(DIST, "index.html"), "utf8");
const textOnly = homeHtml.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
console.log(`\n=== HOME: html ${(homeHtml.length / 1024).toFixed(0)}KB, visible-text ${textOnly.length} chars`);
