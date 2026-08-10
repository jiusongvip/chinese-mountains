// Analyze headless-Chrome rendered DOM for island hydration state.
import { readFileSync } from "node:fs";

const h = readFileSync("C:/Users/nec10/AppData/Local/Temp/cm-dom.html", "utf8");

console.log("leaflet-container:", h.includes('class="leaflet-container'));
console.log("leaflet-tile:", h.includes("leaflet-tile"));
console.log("Loading map text:", h.includes("Loading map"));
console.log("mountain-marker:", h.includes("mountain-marker"));
console.log("astro-island count:", (h.match(/astro-island/g) || []).length);
console.log("astro-island without ssr (hydrated):", (h.match(/<astro-island(?![\s\S]{0,300}ssr)[\s\S]{0,200}client="load"/g) || []).length);
// check for the map's inner ref div
const idx = h.indexOf("min-h-[400px]");
console.log("\nmap ref div context:", idx > -1 ? h.slice(idx, idx + 400) : "NOT FOUND");
