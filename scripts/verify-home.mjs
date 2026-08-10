// Verify homepage enrichment and explore unesco filter in dist output.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const home = readFileSync(path.join(DIST, "index.html"), "utf8");

const checks = [
  ["Photo strip section", home.includes("Photos of China's Mountains")],
  ["Photo strip cards (huangshan-2)", home.includes("/images/mountains/huangshan-2.webp")],
  ["Records section", home.includes("China's Mountain Records")],
  ["Highest Peak card", home.includes("8,848m")],
  ["Highest mountains leaderboard", home.includes("Highest Mountains in China")],
  ["Toughest mountains leaderboard", home.includes("Toughest Mountains in China")],
  ["Explore by Type", home.includes("Explore by Type")],
  ["UNESCO type card", home.includes("/explore?unesco=1")],
  ["Guides & Articles", home.includes("Guides & Articles")],
  ["Blog card link", home.includes("/blog/first-timer-guide-2026")],
  ["Guide card link", home.includes("/guides/spring")],
  ["FAQ count", (home.match(/"@type": "Question"/g) || []).length],
  ["FAQ highest mountain", home.includes("highest mountain in China")],
  ["FAQ extreme peaks", home.includes("most dangerous or extreme")],
  ["Gallery link", home.includes("/gallery")],
];
let fail = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${!ok ? "" : ""}`);
  if (!ok) fail++;
}

const explore = readFileSync(path.join(DIST, "explore/index.html"), "utf8");
console.log("\nexplore unesco btn:", explore.includes('/explore?unesco=1"'));
console.log("explore data-unesco:", (explore.match(/data-unesco="1"/g) || []).length);
console.log("explore unesco script:", explore.includes('const unesco = params.get("unesco")'));

console.log(fail === 0 ? "\nALL PASS" : `\n${fail} FAILURES`);
