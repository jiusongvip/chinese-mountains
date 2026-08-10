// Update mountains-data.json images arrays with the new real photos.
// Usage: node scripts/update-images.mjs
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(SCRIPT_DIR, "..", "src", "data", "mountains-data.json");

const PIXABAY = "Pixabay (CC0)";
const PEXELS = "Pexels";
const SITE = "Chinese Mountains";

// id -> new images array
const UPDATES = {
  huangshan: [
    { src: "/images/mountains/huangshan.webp", alt: "Huangshan granite peak rising above the sea of clouds at sunrise", credit: PIXABAY },
    { src: "/images/mountains/huangshan-2.webp", alt: "Sea of clouds rolling between Huangshan's weathered granite pinnacles", credit: PIXABAY },
    { src: "/images/mountains/huangshan-3.webp", alt: "Huangshan pine tree clinging to a granite cliff with distant peaks beyond", credit: PIXABAY },
  ],
  everest: [
    { src: "/images/mountains/everest.webp", alt: "Mount Everest north face seen from the Tibetan plateau", credit: PIXABAY },
    { src: "/images/mountains/everest-2.webp", alt: "Mount Everest summit pyramid towering over the Himalaya", credit: PIXABAY },
    { src: "/images/mountains/everest-3.webp", alt: "Everest and its glacial valleys viewed from a high vantage point", credit: PIXABAY },
  ],
  zhangjiajie: [
    { src: "/images/mountains/zhangjiajie.webp", alt: "Zhangjiajie's quartz-sandstone pillars rising from subtropical forest", credit: PIXABAY },
    { src: "/images/mountains/zhangjiajie-2.webp", alt: "Sandstone pillar of Zhangjiajie shrouded in morning mist", credit: PIXABAY },
    { src: "/images/mountains/zhangjiajie-3.webp", alt: "Zhangjiajie rock pillar towering over the treeline", credit: PIXABAY },
  ],
  huashan: [
    { src: "/images/mountains/huashan.webp", alt: "Granite cliffside path of Mount Hua winding up the sheer face", credit: PIXABAY },
    { src: "/images/mountains/huashan-2.webp", alt: "Stone steps carved into the near-vertical cliff of Mount Hua", credit: PIXABAY },
    { src: "/images/mountains/huashan-3.webp", alt: "The Plank Walk of Mount Hua with the summit ridge beyond", credit: PIXABAY },
  ],
  emeishan: [
    { src: "/images/mountains/emeishan.webp", alt: "Golden Summit temple of Mount Emei above a sea of clouds", credit: PEXELS },
    { src: "/images/mountains/emeishan-2.webp", alt: "Misty forest trail on the slopes of Mount Emei", credit: PEXELS },
    { src: "/images/mountains/emeishan-3.webp", alt: "Mount Emei summit at dusk with prayer flags", credit: PEXELS },
  ],
  guilin: [
    { src: "/images/mountains/guilin.webp", alt: "Karst peaks of Guilin reflected in the Li River", credit: PEXELS },
    { src: "/images/mountains/guilin-2.webp", alt: "Guilin karst towers rising from mist over the river valley", credit: PEXELS },
    { src: "/images/mountains/guilin-3.webp", alt: "Li River karst landscape with a bamboo raft", credit: PEXELS },
  ],
  gongga: [
    { src: "/images/mountains/gongga.webp", alt: "Gongga Shan (Minya Konka) summit glowing at sunrise", credit: PEXELS },
    { src: "/images/mountains/gongga-2.webp", alt: "Gongga Shan glacier tongue descending into the valley", credit: PEXELS },
    { src: "/images/mountains/gongga-3.webp", alt: "Minya Konka massif seen across the valley", credit: PEXELS },
  ],
  "namcha-barwa": [
    { src: "/images/mountains/namcha-barwa.webp", alt: "Namcha Barwa peak towering above the Yarlung Tsangpo gorge", credit: PEXELS },
    { src: "/images/mountains/namcha-barwa-2.webp", alt: "Namcha Barwa seen from the valley approach", credit: SITE },
  ],
  "meili-snow": [
    { src: "/images/mountains/meili-snow.webp", alt: "Kawagarbo, the highest peak of Meili Snow Mountain, at golden sunrise", credit: PEXELS },
    { src: "/images/mountains/meili-snow-2.webp", alt: "Meili Snow Mountain ridge line above the cloud sea", credit: PEXELS },
    { src: "/images/mountains/meili-snow-3.webp", alt: "Snowy crest of Meili Snow Mountain glowing at golden hour", credit: PEXELS },
  ],
  kailash: [
    { src: "/images/mountains/kailash.webp", alt: "Mount Kailash's pyramid-shaped peak in western Tibet", credit: SITE },
    { src: "/images/mountains/kailash-2.webp", alt: "Mount Kailash south face and the pilgrims' kora path", credit: SITE },
    { src: "/images/mountains/kailash-3.webp", alt: "Mount Kailash seen at dusk from the plains below", credit: SITE },
  ],
};

const raw = await readFile(DATA_FILE, "utf8");
const data = JSON.parse(raw);
let updated = 0;
for (const m of data.mountains) {
  if (UPDATES[m.id]) {
    m.images = UPDATES[m.id];
    updated++;
  }
}
await writeFile(DATA_FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`Updated images for ${updated} mountains`);
