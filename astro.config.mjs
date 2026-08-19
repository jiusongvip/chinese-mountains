import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

function priority(path) {
  if (path === "/" || path === "") return 1.0;
  if (path.startsWith("/mountains/")) return 0.9;
  if (path.startsWith("/blog/")) return 0.85;
  if (path.startsWith("/guides/") || path.startsWith("/collections/")) return 0.8;
  if (path === "/explore" || path === "/best" || path === "/compare") return 0.8;
  if (path === "/gallery") return 0.7;
  if (path === "/blog" || path === "/guides" || path === "/collections") return 0.7;
  if (path === "/about" || path === "/contact") return 0.5;
  if (path === "/privacy") return 0.3;
  return 0.6;
}

function changefreq(path) {
  if (path === "/") return "weekly";
  if (path.startsWith("/blog/")) return "monthly";
  if (path.startsWith("/mountains/")) return "monthly";
  if (path.startsWith("/guides/")) return "monthly";
  return "monthly";
}

export default defineConfig({
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        // No content-level modified dates in the data layer; omit lastmod to
        // avoid emitting a fake "everything changed" signal on every build.
        item.changefreq = changefreq(new URL(item.url).pathname);
        item.priority = priority(new URL(item.url).pathname);
        return item;
      },
    }),
  ],
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://www.chinese-mountains.com",
});
