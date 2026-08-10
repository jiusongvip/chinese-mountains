// Upgrade thin mountain content (cangshan, mingsha) to 3000+ chars.
// Usage: node scripts/upgrade-content.mjs
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(SCRIPT_DIR, "..", "src", "data", "mountains-data.json");

const UPGRADES = {
  cangshan: {
    significance:
      "Mount Cangshan was sacred to the Bai people of Dali long before Buddhism arrived. During the Nanzhao and Dali kingdoms (8th-13th centuries), its slopes became one of the most important Buddhist centers in southwest China — the famous Three Pagodas of Chongsheng Temple sit at its base, and more than a dozen monasteries once dotted its ravines. The range also enters Chinese literature through Xu Xiake's Travels, whose author spent weeks exploring its peaks and springs in 1639, and through the wuxia novel Demi-Gods and Semi-Devils, which made the mountain's fictional martial-arts school famous worldwide. Today the 19 peaks and 18 streams remain the spiritual backdrop of Dali, and the 'Cangshan Snow' pairing with 'Erhai Moon' is one of the four celebrated scenic wonders of the region.",
    highlights: [
      "Ximatan (Washing Horse Pond) cable car — one of the longest in China — lifts you from 2,200m to nearly 4,000m in about 40 minutes, ending beside an alpine lake where legend says Kublai Khan's cavalry watered their horses",
      "The Jade Belt Cloud Road, an 18km flat stone path at 2,600m, threads along the mountainside through pines, rhododendrons, and 18 rushing streams — the gentlest way to experience the range",
      "Cangshan Snow with Erhai Moon: in winter the white peaks reflect in the lake below, completing Dali's famous 'wind, flower, snow, moon' quartet",
      "Alpine rhododendron forests explode into bloom along the upper trails in May, above the cloud line",
      "Gantong Temple and Jizhao Nunnery — two quiet Buddhist retreats on the western slopes where monks serve tea to hikers (the nunnery's vegetarian lunch is a local institution)",
      "A 3-4 day traverse of the full 19-peak ridgeline for experienced hikers, with bivouac camps and spectacular views of Erhai Lake 2,000m below",
    ],
    whenToGo:
      "March to May is the classic season: clear skies, blooming rhododendrons on the upper slopes, and daytime temperatures of 15-25 C in Dali. May in particular pairs the flower season with the famous 'Jade Belt Clouds' — a ribbon of cloud that wraps around the mountainside at 2,600m. June to August is the rainy season: expect afternoon showers and heavy mist, though the rain keeps trails green and the air fresh, and the 3,000m+ upper stations stay pleasantly cool when Dali's streets bake at 28 C+. September to November is the most stable window — crisp air, long visibility, and the best chance of seeing both the peaks and Erhai Lake in one frame. December to February brings the signature Cangshan snow: the summit stays below freezing, trails can be icy, and the Ximatan cable car sometimes closes for wind — but the snow-covered ridgeline above a warm, sunny Dali is one of southwest China's most iconic winter views.",
    howToGetThere:
      "By Air: fly to Dali Airport (DLU) — direct flights from Kunming (about 1 hour), plus connections from Chengdu, Chongqing, and Xi'an; from the airport, a 40-minute taxi to Dali Old Town costs about CNY 80. By Train: the Kunming-Dali high-speed line reaches Dali Station in about 2 hours, and the Lijiang-Dali section adds 1.5 hours from the north; from Dali Station, taxi or bus 8 to the old town (20-30 minutes). Getting to the Mountain: the mountain rises directly behind Dali Old Town — walk or cycle to the foot in 20 minutes, or take bus 4 to the cable car stations. Three cable cars serve different routes: the Gantong line (south) climbs to the Jade Belt Cloud Road; the Zhonghe line (center) is the gentlest, for forest walks; and the Ximatan line (north) is the big one, rising to 3,900m with the ridge walk and alpine lake. Entry fee is CNY 40 for the national park; the Ximatan cable car is CNY 335 round trip, the others roughly CNY 120. Reserve Ximatan tickets online in summer and Golden Week — capacity is limited at altitude.",
    faqs: [
      { q: "Which cable car should I take?", a: "Gantong Cable Car for the full alpine experience reaching 3,900m with ridge walk access. Zhonghe Cable Car for a gentler forest walk at 2,600m with temples and streams." },
      { q: "Is altitude sickness a concern?", a: "At 3,900m, yes. Spend a day in Dali at 1,970m before taking the high cable car. Move slowly on summit trails." },
      { q: "Can I hike the full 19 peaks?", a: "The 50km ridge traverse takes 3-4 days for experienced hikers. Requires bivouac gear and GPS. Not a maintained trail." },
      { q: "How many days should I plan for Cangshan?", a: "One full day covers the classic route: Ximatan cable car up, ridge walk, then the Jade Belt Cloud Road down to Gantong. A second day lets you hike the Jade Belt Road from the Zhonghe station and visit the Gantong Temple and Jizhao Nunnery at a relaxed pace. The mountain combines naturally with Erhai Lake, the Three Pagodas, and Dali Old Town for a 2-3 day trip." },
      { q: "Does the Ximatan cable car close in winter?", a: "Yes, occasionally. From December to February the upper station can close for strong wind, ice, or heavy snow — sometimes for days at a time. Check the official WeChat status the morning of your visit, and have the Zhonghe or Gantong line as a backup plan. The lower Jade Belt Cloud Road trails remain open all year." },
    ],
  },
  mingsha: {
    faqs: [
      { q: "Why has the lake never been buried?", a: "Prevailing winds circulate in a pattern that sweeps sand up the western slope and deposits it on the eastern side, maintaining the depression. Natural wind engineering preserved this for millennia." },
      { q: "Can I combine with Mogao Caves?", a: "Absolutely. Mogao in the morning, Mingsha in the afternoon is the classic Dunhuang day. Book Mogao tickets weeks ahead." },
      { q: "What should I wear and bring to the dunes?", a: "Surface sand hits 50-60 C by midday in summer, so cover up: long sleeves, hat, sunglasses, and a face scarf for wind. Rent gaiters or sand shoes at the entrance (about CNY 15-20) — loose sand makes ordinary sneakers miserable. Carry water; there are few shade points on the dunes. The best hours are the first two after opening and the last three before sunset, when the light turns the sand gold." },
      { q: "Is it worth staying for sunset or camping?", a: "Yes — sunset is the single best moment: the dunes turn amber, the camel caravans silhouette against the ridge, and Crescent Moon Lake reflects the fading light. Enter three hours before closing to reach a good viewpoint. There are basic glamping setups and camel-trekking night tours inside the park, but most visitors prefer to sleep in Dunhuang city (only 6km away) and return the next morning — the dawn light is equally spectacular and far quieter." },
      { q: "Is Crescent Moon Lake natural and can I swim?", a: "The lake's outline is natural and protected, but groundwater levels dropped through the 20th century, so since the 1980s it has been maintained with managed water levels (roughly 4-5m deep). Swimming is not allowed — the shore is roped off. The best photography point is the south viewing platform, which frames the pagoda, the crescent, and the dune ridge in one shot." },
    ],
  },
};

const raw = await readFile(DATA_FILE, "utf8");
const data = JSON.parse(raw);
let updated = 0;
for (const m of data.mountains) {
  const up = UPGRADES[m.slug];
  if (!up) continue;
  if (up.significance) m.culture.significance = up.significance;
  if (up.highlights) m.highlights = up.highlights;
  if (up.whenToGo) m.whenToGo = up.whenToGo;
  if (up.howToGetThere) m.howToGetThere = up.howToGetThere;
  if (up.faqs) m.faqs = up.faqs;
  updated++;
}
await writeFile(DATA_FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`Upgraded ${updated} mountains`);
