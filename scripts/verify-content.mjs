// Verify per-mountain page content depth (3000+ chars) and Mountain Facts section.
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = JSON.parse(
  readFileSync(path.join(ROOT, "src", "data", "mountains-data.json"), "utf8")
);

// 1) Data-level text length per mountain (everything rendered on page)
const rows = DATA.mountains.map((m) => {
  const text = [
    m.description ?? "",
    m.tagline ?? "",
    m.culture?.significance ?? "",
    (m.highlights ?? []).join(" "),
    m.whenToGo ?? "",
    m.howToGetThere ?? "",
    (m.faqs ?? []).map((f) => f.q + " " + f.a).join(" "),
  ].join(" ");
  return { name: m.name.en, slug: m.slug, len: text.length };
});
rows.sort((a, b) => a.len - b.len);
const min = rows[0];
const under = rows.filter((r) => r.len < 3000);
console.log(`Mountains >= 3000 chars: ${rows.length - under.length}/${rows.length}`);
console.log(`Shortest: ${min.name} (${min.len})`);
if (under.length) {
  console.log("UNDER 3000:", under.map((r) => `${r.name} ${r.len}`).join(", "));
}

// 2) Rendered HTML checks on a few representative pages
const checkPages = ["cangshan", "mingsha", "huangshan", "everest"];
for (const slug of checkPages) {
  const file = path.join(ROOT, "dist", "mountains", slug, "index.html");
  const html = readFileSync(file, "utf8");
  // strip scripts/styles to approximate visible text
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  console.log(
    `${slug.padEnd(14)} visible-text:${String(visible.length).padStart(5)}  MountainFacts:${html.includes("Mountain Facts")}  FAQs:${html.includes("FAQ")}`
  );
}
