// Check whether leaflet tiles actually loaded (network) in the rendered DOM.
import { readFileSync } from "node:fs";

const h = readFileSync("C:/Users/nec10/AppData/Local/Temp/cm-dom.html", "utf8");

const tiles = [...h.matchAll(/<img class="leaflet-tile[^>]*src="([^"]+)"/g)].map((m) => m[1]);
console.log("tile srcs:", tiles.length);
console.log([...new Set(tiles.map((t) => t.split("/").slice(3, 5).join("/")))].join("\n"));

const markerCount = (h.match(/mountain-marker/g) || []).length;
console.log("marker divs:", markerCount);
const markerLatLng = [...h.matchAll(/style="transform: translate3d\(([^)]+)\)"/g)].length;
console.log("marker transforms:", markerLatLng);
