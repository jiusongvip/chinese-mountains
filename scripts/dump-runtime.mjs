// Full dump of the Astro island runtime + script order in built HTML.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const h = readFileSync(path.join(DIST, "index.html"), "utf8");

const scripts = [...h.matchAll(/<script[\s\S]*?<\/script>/g)].map((m) => m[0]);
scripts.forEach((t, i) => {
  const isLD = /ld\+json/.test(t);
  console.log(`\n===== block ${i} ${isLD ? "(ld+json)" : ""} =====`);
  if (!isLD) console.log(t.slice(0, 2000));
});

// Where are islands relative to the runtime script?
const islandIdx = h.indexOf("<astro-island");
const runtimeIdx = h.indexOf("class y extends HTMLElement");
const loadEventIdx = h.indexOf("astro:load");
console.log(`\nisland first at ${islandIdx}, runtime class at ${runtimeIdx}, load event at ${loadEventIdx}`);
console.log(`runtime BEFORE islands: ${runtimeIdx < islandIdx}`);
