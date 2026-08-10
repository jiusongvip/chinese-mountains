// Verify multi-image integration in dist output.
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");

const html = readFileSync(path.join(DIST, "mountains/huangshan/index.html"), "utf8");
console.log("huangshan-2 in html:", html.includes("/images/mountains/huangshan-2.webp"));
console.log("huangshan-3 in html:", html.includes("/images/mountains/huangshan-3.webp"));
console.log("gallery-thumb count:", (html.match(/gallery-thumb/g) || []).length);
console.log("hero-photo id:", html.includes('id="hero-photo"'));
console.log("credit Pixabay:", html.includes("Pixabay (CC0)"));

const files = readdirSync(path.join(DIST, "images/mountains"));
const multi = files.filter((f) => /-(2|3)\.webp$/.test(f));
console.log("dist multi-image files:", multi.length, multi.join(", "));
console.log("kailash-2:", files.includes("kailash-2.webp"));
console.log("namcha-barwa-2:", files.includes("namcha-barwa-2.webp"));
console.log("meili-snow-2:", files.includes("meili-snow-2.webp"));

// sample other pages
for (const slug of ["everest", "kailash", "meili-snow", "namcha-barwa"]) {
  const h = readFileSync(path.join(DIST, "mountains", slug, "index.html"), "utf8");
  const thumbs = (h.match(/gallery-thumb/g) || []).length;
  console.log(`${slug}: thumbs=${thumbs}, hero=${h.includes('id="hero-photo"')}`);
}
