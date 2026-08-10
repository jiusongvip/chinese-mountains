const fs = require("fs");
const dir = "d:/workspace/website/chinese-mountains/dist";

const h = fs.readFileSync(dir + "/mountains/huangshan/index.html", "utf8");
console.log("huangshan: FAQPage:", h.includes('"@type":"FAQPage"'),
  "| TouristAttraction:", h.includes('"@type":"TouristAttraction"'),
  "| abs image:", h.includes("https://chinese-mountains.com/images/mountains/huangshan.webp"),
  "| og:image abs:", h.includes('property="og:image" content="https://chinese-mountains.com/images/mountains/huangshan.webp"'),
  "| .org:", h.includes("chinesemountains.org"));

const b = fs.readFileSync(dir + "/best/index.html", "utf8");
console.log("best: FAQPage:", b.includes('"@type":"FAQPage"'),
  "| BreadcrumbList:", b.includes('"@type":"BreadcrumbList"'),
  "| .org:", b.includes("chinesemountains.org"));

const i = fs.readFileSync(dir + "/index.html", "utf8");
console.log("index: WebSite .com:", i.includes('"url":"https://chinese-mountains.com"'),
  "| FAQPage:", i.includes('"@type":"FAQPage"'),
  "| .org:", i.includes("chinesemountains.org"));

const e = fs.readFileSync(dir + "/explore/index.html", "utf8");
console.log("explore: ItemList:", e.includes('"@type":"ItemList"'),
  "| 37 in h1:", e.includes("Explore All 37 Famous Mountains"),
  "| .org:", e.includes("chinesemountains.org"));

const g = fs.readFileSync(dir + "/gallery/index.html", "utf8");
console.log("gallery: ItemList:", g.includes('"@type":"ItemList"'),
  "| ImageObject:", g.includes('"@type":"ImageObject"'),
  "| .org:", g.includes("chinesemountains.org"));

const r = fs.readFileSync(dir + "/robots.txt", "utf8");
console.log("robots.txt:", r.replace(/\n/g, " | "));
