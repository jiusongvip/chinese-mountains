import { mountains } from "./mountains";

export interface GuideData {
  slug: string;
  title: string;
  description: string;
  image: string;
  months: string[];
  difficulty: string[];
  excludeIds?: string[];
  content: { type: "p" | "h2" | "h3" | "ul"; text?: string; items?: string[] }[];
}

export const allGuides: GuideData[] = [
  {
    slug: "spring",
    title: "Spring Peaks",
    description: "Azaleas blooming across mountainsides, fresh green foliage, and comfortable temperatures make spring (March through May) the most enchanting season for mountain travel in China.",
    image: "/images/mountains/huangshan.webp",
    months: ["March", "April", "May"],
    difficulty: [],
    content: [
      { type: "h2", text: "Why Spring?" },
      { type: "p", text: "Spring in the Chinese mountains is a sensory feast. Cherry and azalea blossoms carpet the slopes in pink and red, morning mists linger poetically among peaks, and temperatures hover between 10-25 C depending on elevation — warm enough for comfortable hiking but cool enough to keep the crowds manageable." },
      { type: "h3", text: "What to Expect" },
      { type: "ul", items: ["Wildflowers and blooming azaleas at mid-elevations (500-2000m)", "Morning sea-of-clouds phenomena are common, especially at Huangshan and Sanqing", "Crowds pick up around Qingming Festival (early April) and Labor Day (May 1-5)", "Some high-altitude trails (above 3000m) may still have residual snow in March"] },
      { type: "h3", text: "Packing Tips" },
      { type: "ul", items: ["Layered clothing: mornings are chilly, afternoons warm", "Rain jacket or umbrella for spring showers", "Comfortable hiking shoes with good grip for damp trails", "Camera with polarizing filter for misty landscapes"] },
      { type: "h2", text: "Why Trust Our Picks?" },
      { type: "p", text: "We rate every mountain on scenery, hiking quality, cultural value, and accessibility. The mountains featured below all peak during the spring months, offering the best balance of weather, scenery, and visitor experience." },
    ],
  },
  {
    slug: "summer",
    title: "Summer Escapes",
    description: "Escape the heat by heading to high-altitude refuges, lush alpine valleys, and wildflower meadows. Summer (June through August) opens up China\"s most remote mountain regions.",
    image: "/images/mountains/tianshan.webp",
    months: ["June", "July", "August"],
    difficulty: [],
    content: [
      { type: "h2", text: "Why Summer?" },
      { type: "p", text: "While China\"s lowlands swelter in 35 C+ heat, the mountains offer a natural air conditioner. At 2500m+, daytime temperatures hover around 18-25 C. This is the window for accessing China\"s most spectacular high-altitude destinations: the Tianshan in Xinjiang, the alpine valleys of western Sichuan, and the remote peaks of Yunnan." },
      { type: "h3", text: "What to Expect" },
      { type: "ul", items: ["Wildflowers in full bloom at alpine meadows (2500-4000m)", "Long daylight hours — sunrise at 5:30am, sunset after 8pm", "Monsoon rains in southern and eastern mountains (bring waterproof gear)", "Peak domestic tourism season — book accommodations early"] },
      { type: "h3", text: "Packing Tips" },
      { type: "ul", items: ["Sun protection: SPF 50+, wide-brim hat, UV-blocking sunglasses", "Quick-dry hiking clothes and reliable rain gear", "Hydration system — summer hiking demands 3-4L per day", "Insect repellent for lower elevations"] },
      { type: "h2", text: "Why Trust Our Picks?" },
      { type: "p", text: "Summer mountain selection is about altitude. We prioritize peaks above 2500m where temperatures stay comfortable, and note which ones offer tree cover or cable cars for relief on particularly hot days." },
    ],
  },
  {
    slug: "autumn",
    title: "Autumn Gold",
    description: "Crisp air, golden foliage, and the clearest mountain views of the year. September through November is widely considered the best season for Chinese mountain photography.",
    image: "/images/mountains/huangshan.webp",
    months: ["September", "October", "November"],
    difficulty: [],
    content: [
      { type: "h2", text: "Why Autumn?" },
      { type: "p", text: "Ask any Chinese landscape photographer and they\"ll tell you: autumn is the season. Humidity drops, revealing crystal-clear visibility across vast distances. Deciduous trees at mid-elevations turn brilliant red, orange, and gold. The \"sea of clouds\" phenomenon at Huangshan reaches its annual peak in October. And with summer crowds gone, trails feel almost private." },
      { type: "h3", text: "What to Expect" },
      { type: "ul", items: ["Best visibility of the year — ideal for photography", "Autumn foliage at mid-elevations peaks in October", "Golden Week (Oct 1-7) brings massive crowds — plan around it", "November temperatures drop fast above 2000m, some facilities begin closing"] },
      { type: "h3", text: "Packing Tips" },
      { type: "ul", items: ["Warm layers: mornings near freezing at elevation even in September", "Gloves and a warm hat for sunrise viewings", "Thermos for hot tea or coffee at scenic overlooks", "Tripod for low-light autumn sunrise photography"] },
      { type: "h2", text: "Why Trust Our Picks?" },
      { type: "p", text: "Autumn is competitive — every mountain looks good. We select for exceptional foliage, cloud-sea probability, and peak accessibility. Some mountains look better in autumn than any other season." },
    ],
  },
  {
    slug: "winter",
    title: "Winter Wonder",
    description: "Snow-dusted temples, frozen waterfalls, empty trails, and the surreal beauty of rime ice on pine branches. Winter (December through February) offers a completely different mountain experience.",
    image: "/images/mountains/jade-dragon.webp",
    months: ["December", "January", "February"],
    difficulty: [],
    content: [
      { type: "h2", text: "Why Winter?" },
      { type: "p", text: "Winter is the mountains\" best-kept secret. Tourist numbers drop by 70-90%, hotel prices plummet, and the landscapes transform into something out of a classical Chinese ink painting. Snow-covered peaks, frozen waterfalls, and rime ice glittering on pine needles create a silent, monochromatic beauty that summer visitors never see." },
      { type: "h3", text: "What to Expect" },
      { type: "ul", items: ["Rime ice and snow scenery at Huangshan, Sanqing, and Emei", "Near-empty trails — you may have viewpoints entirely to yourself", "Hotel and ticket prices 30-60% cheaper than peak season", "Some high-elevation trails and cable cars may close for maintenance", "Chinese New Year (late Jan/early Feb) brings a brief surge of domestic tourists"] },
      { type: "h3", text: "Packing Tips" },
      { type: "ul", items: ["Thermal base layers and insulated hiking pants", "Waterproof hiking boots with good traction for icy steps", "Crampons or microspikes for icy trails (available at mountain base shops)", "Hand warmers, thermal flask, and high-calorie snacks"] },
      { type: "h2", text: "Why Trust Our Picks?" },
      { type: "p", text: "Not every mountain is worth visiting in winter. We filter for peaks that remain accessible and scenic when temperatures drop below freezing. Some mountains are actually better in winter than summer." },
    ],
  },
  {
    slug: "first-time",
    title: "First-Timer\"s Guide",
    description: "Never visited a Chinese mountain? Start here. We\"ve selected the most accessible, rewarding peaks for first-time visitors — stunning scenery without extreme exertion.",
    image: "/images/mountains/guilin.webp",
    months: [],
    difficulty: ["easy", "moderate"],
    content: [
      { type: "h2", text: "Welcome to Chinese Mountains" },
      { type: "p", text: "If you\"ve never visited a mountain in China, the options can feel overwhelming. More than 50 peaks compete for your attention, each claiming to be the most beautiful, the most sacred, or the most adventurous. This guide cuts through the noise." },
      { type: "h3", text: "Three Things Every First-Timer Should Know" },
      { type: "ul", items: ["Chinese mountains are developed — nearly every major peak has paved paths, cable cars, hotels, and food vendors. You don\"t need to be an extreme hiker.", "Timing is everything. Avoid Chinese national holidays (especially Golden Week in October) when trails become human traffic jams.", "Cable cars are not cheating. Many peaks have excellent cable car systems that deliver you to summit areas, letting you focus on the scenic ridge walks rather than the 6000-step climb."] },
      { type: "h3", text: "Our Top Picks for Beginners" },
      { type: "p", text: "We\"ve hand-picked mountains below that offer the best combination of accessibility (easy to reach, developed infrastructure), scenery (world-class views without extreme effort), and comfort (hotels on the mountain, English signage)." },
    ],
  },
  {
    slug: "family",
    title: "Family-Friendly Peaks",
    description: "Cable cars, gentle paths, manageable altitudes, and enough excitement to keep kids engaged. These mountains welcome travelers of all ages.",
    image: "/images/mountains/taishan.webp",
    months: [],
    difficulty: ["easy", "moderate"],
    content: [
      { type: "h2", text: "Mountains for the Whole Family" },
      { type: "p", text: "Traveling with kids or older family members doesn\"t mean skipping the mountains. Many of China\"s most famous peaks have excellent infrastructure — cable cars, paved paths, rest stops with food — that make them accessible to visitors of all ages and fitness levels." },
      { type: "h3", text: "What Makes a Mountain Family-Friendly" },
      { type: "ul", items: ["Cable car access to summit areas — no mandatory long climbs", "Paved, well-maintained paths with handrails where needed", "Frequent rest stops with food, water, and toilets", "Moderate altitude (under 2500m) to avoid altitude sickness risk", "Nearby city with good hotels and medical facilities"] },
      { type: "h3", text: "Tips for Family Mountain Trips" },
      { type: "ul", items: ["Start early — most cable cars begin operating at 6:30-7:00am", "Pack snacks and water even if facilities exist (prices are high on mountain tops)", "Plan for shorter days — what an adult can do in 4 hours may take a family 6", "Consider staying overnight on the mountain for sunrise — kids love the adventure"] },
    ],
  },
];

export function defineGuide(slug: string): GuideData {
  const guide = allGuides.find((g) => g.slug === slug);
  if (!guide) throw new Error(`Guide not found: ${slug}`);
  return guide;
}