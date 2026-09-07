// 构建后处理：将 sitemap 首页 URL 去掉尾斜杠，与 canonical 保持一致（内页保持尾斜杠）
// 同时生成 public 侧 sitemap.xml 副本（指向 sitemap-index.xml），避免 /sitemap.xml 404
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const homeUrl = "https://www.chinese-mountains.com";
const target = `<loc>${homeUrl}/</loc>`;
const replacement = `<loc>${homeUrl}</loc>`;

let changed = false;
for (const file of readdirSync(distDir)) {
  if (!file.startsWith("sitemap-") || !file.endsWith(".xml") || file.includes("index")) {
    continue;
  }
  const path = join(distDir, file);
  const content = readFileSync(path, "utf8");
  if (content.includes(target)) {
    writeFileSync(path, content.replaceAll(target, replacement));
    changed = true;
    console.log(`✓ ${file}: 首页 URL 已去尾斜杠`);
  }
}

if (!changed) {
  console.log("⚠ 未找到需要处理的 sitemap 首页 URL");
}

// /sitemap.xml → 与 sitemap-index.xml 内容一致，消除 /sitemap.xml 404
const indexPath = join(distDir, "sitemap-index.xml");
const aliasPath = join(distDir, "sitemap.xml");
if (existsSync(indexPath)) {
  writeFileSync(aliasPath, readFileSync(indexPath, "utf8"));
  console.log("✓ sitemap.xml 已生成（sitemap-index 副本）");
}
