// Measure per-mountain content length from data (everything rendered on the page body).
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  readFileSync(path.join(SCRIPT_DIR, "..", "src", "data", "mountains-data.json"), "utf8")
);

const rows = data.mountains.map((m) => {
  const parts = {
    description: m.description ?? "",
    significance: m.culture?.significance ?? "",
    tagline: m.tagline ?? "",
    highlights: (m.highlights ?? []).join(" "),
    whenToGo: m.whenToGo ?? "",
    howToGetThere: m.howToGetThere ?? "",
    faqs: (m.faqs ?? []).map((f) => f.q + " " + f.a).join(" "),
  };
  const total = Object.values(parts).reduce((s, v) => s + v.length, 0);
  return { name: m.name.en, slug: m.slug, total, ...Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, v.length])) };
});

rows.sort((a, b) => a.total - b.total);
console.log("slug".padEnd(24), "total".padStart(6), "desc".padStart(5), "sign".padStart(5), "high".padStart(5), "when".padStart(5), "howTo".padStart(5), "faq".padStart(5));
for (const r of rows) {
  console.log(
    r.slug.padEnd(24),
    String(r.total).padStart(6),
    String(r.description).padStart(5),
    String(r.significance).padStart(5),
    String(r.highlights).padStart(5),
    String(r.whenToGo).padStart(5),
    String(r.howToGetThere).padStart(5),
    String(r.faqs).padStart(5)
  );
}
const under = rows.filter((r) => r.total < 3000);
console.log(`\nUnder 3000 chars: ${under.length}/${rows.length}`);
console.log("total all:", rows.reduce((s, r) => s + r.total, 0));
