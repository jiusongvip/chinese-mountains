// Download real mountain photos from cc0.cn (Pixabay mirror) and Pexels.
// Usage: node scripts/download-images.mjs
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TMP_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), ".img-tmp");

const JOBS = [
  // [outputName, url]
  ["huangshan-1.jpg", "https://img.cc0.cn/pixabay/2019110114524878727.jpg!cc0.cn.jpg"],
  ["huangshan-2.jpg", "https://img.cc0.cn/pixabay/2019101906394053364.jpg!cc0.cn.jpg"],
  ["huangshan-3.jpg", "https://img.cc0.cn/pixabay/2019102902505232707.jpg!cc0.cn.jpg"],
  ["everest-1.jpg", "https://img.cc0.cn/pixabay/201910231831376087.jpg!cc0.cn.jpg"],
  ["everest-2.jpg", "https://img.cc0.cn/pixabay/2019102203315961263.jpg!cc0.cn.jpg"],
  ["everest-3.jpg", "https://img.cc0.cn/pixabay/2019102902383031055.jpg!cc0.cn.jpg"],
  ["zhangjiajie-1.jpg", "https://img.cc0.cn/pixabay/201910202224381911.jpg!cc0.cn.jpg"],
  ["zhangjiajie-2.jpg", "https://img.cc0.cn/pixabay/2019103116505132300.jpg!cc0.cn.jpg"],
  ["zhangjiajie-3.jpg", "https://img.cc0.cn/pixabay/2019102123105632713.jpg!cc0.cn.jpg"],
  ["huashan-1.jpg", "https://img.cc0.cn/pixabay/201910311423258872.jpg!cc0.cn.jpg"],
  ["huashan-2.jpg", "https://img.cc0.cn/pixabay/2019110114170873619.jpg!cc0.cn.jpg"],
  ["huashan-3.jpg", "https://img.cc0.cn/pixabay/201910311345422898.jpg!cc0.cn.jpg"],
  ["emeishan-1.jpg", "https://images.pexels.com/photos/38402869/pexels-photo-38402869.jpeg"],
  ["emeishan-2.jpg", "https://images.pexels.com/photos/29295634/pexels-photo-29295634.jpeg"],
  ["emeishan-3.jpg", "https://images.pexels.com/photos/27594946/pexels-photo-27594946.jpeg"],
  ["guilin-1.jpg", "https://images.pexels.com/photos/36535023/pexels-photo-36535023.jpeg"],
  ["guilin-2.jpg", "https://images.pexels.com/photos/36398286/pexels-photo-36398286.jpeg"],
  ["guilin-3.jpg", "https://images.pexels.com/photos/33899273/pexels-photo-33899273.jpeg"],
  ["gongga-1.jpg", "https://images.pexels.com/photos/28098320/pexels-photo-28098320.jpeg"],
  ["gongga-2.jpg", "https://images.pexels.com/photos/34424423/pexels-photo-34424423.jpeg"],
  ["gongga-3.jpg", "https://images.pexels.com/photos/18939129/pexels-photo-18939129.jpeg"],
  ["namcha-1.jpg", "https://images.pexels.com/photos/20224135/pexels-photo-20224135.jpeg"],
  ["meili-1.jpg", "https://images.pexels.com/photos/34640801/pexels-photo-34640801.jpeg"],
  ["meili-2.jpg", "https://images.pexels.com/photos/16055974/pexels-photo-16055974.jpeg"],
  ["meili-3.jpg", "https://images.pexels.com/photos/29572158/pexels-photo-29572158.jpeg"],
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

async function fetchWithTimeout(url, timeoutMs = 45000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": UA, "Accept": "image/avif,image/webp,image/jpeg,*/*" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 10000) throw new Error(`file too small (${buf.length} bytes)`);
    return buf;
  } finally {
    clearTimeout(timer);
  }
}

async function downloadWithRetry(name, url) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const buf = await fetchWithTimeout(url);
      await writeFile(path.join(TMP_DIR, name), buf);
      console.log(`OK   ${name} (${(buf.length / 1024).toFixed(0)} KB)`);
      return true;
    } catch (err) {
      lastErr = err;
      console.log(`FAIL ${name} attempt ${attempt}/3: ${err.message}`);
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  console.error(`GAVE UP ${name}: ${lastErr?.message}`);
  return false;
}

await mkdir(TMP_DIR, { recursive: true });
let ok = 0;
for (const [name, url] of JOBS) {
  if (await downloadWithRetry(name, url)) ok++;
}
console.log(`\nDownloaded ${ok}/${JOBS.length}`);
