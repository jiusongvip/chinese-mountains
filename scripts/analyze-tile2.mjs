// Inspect leaflet tile container markup in rendered DOM.
import { readFileSync } from "node:fs";

const h = readFileSync("C:/Users/nec10/AppData/Local/Temp/cm-dom.html", "utf8");

const start = h.indexOf("leaflet-tile-container");
const end = h.indexOf("leaflet-zoom-animated", start);
console.log("tile container markup:");
console.log(h.slice(start, start + 2500));
