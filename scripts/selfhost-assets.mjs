// Self-host third-party CSS assets: leaflet.css + images from node_modules,
// and Geist Sans/Mono woff2 fonts from jsDelivr (pinned version).
import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

// ---------- 1. Leaflet: copy css + images from node_modules ----------
const LEAF_SRC = path.join(ROOT, "node_modules", "leaflet", "dist");
const LEAF_PUB = path.join(PUBLIC, "leaflet");
await mkdir(path.join(LEAF_PUB, "images"), { recursive: true });

await copyFile(path.join(LEAF_SRC, "leaflet.css"), path.join(LEAF_PUB, "leaflet.css"));
for (const img of ["layers.png", "layers-2x.png", "marker-icon.png", "marker-icon-2x.png", "marker-shadow.png"]) {
  await copyFile(path.join(LEAF_SRC, "images", img), path.join(LEAF_PUB, "images", img));
}
console.log("OK  leaflet css + images copied to public/leaflet/");

// ---------- 2. Geist font: pin version, fetch variable woff2 + write @font-face ----------
const GEIST_VER = "1.7.2"; // pinned; bump deliberately
const FONT_URL = `https://cdn.jsdelivr.net/npm/geist@${GEIST_VER}/dist/fonts/geist-sans/Geist-Variable.woff2`;

async function fetchBuf(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

await mkdir(path.join(PUBLIC, "fonts"), { recursive: true });
const buf = await fetchBuf(FONT_URL);
await writeFile(path.join(PUBLIC, "fonts", "Geist-Variable.woff2"), buf);
console.log(`OK  font Geist-Variable.woff2 ${(buf.length / 1024).toFixed(0)}KB`);

const css = `/* Geist Sans (variable), self-hosted from geist@${GEIST_VER} */
@font-face {
  font-family: "Geist";
  src: url("/fonts/Geist-Variable.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
`;
await writeFile(path.join(PUBLIC, "fonts", "geist.css"), css);
console.log("OK  css fonts/geist.css");

console.log("Done.");
