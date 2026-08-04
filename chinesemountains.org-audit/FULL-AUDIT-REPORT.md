# Chinese Mountains — Full SEO Audit Report

**URL:** https://chinesemountains.org
**Date:** 2026-08-04
**Pages crawled:** 43
**Business type:** Travel / informational content site

---

## Executive Summary

Chinese Mountains is a well-structured content site covering 25 famous peaks in China. The site gets a lot right — canonicals, meta descriptions, alt text, and internal linking are all solid. But it has several high-impact gaps that are holding back its search visibility: no Open Graph tags, no robots.txt, a missing homepage H1, and blog posts without article-level schema. The site is built on strong content but undersells itself to both search engines and social platforms.

**Overall SEO Health Score: 65/100**

### Top 5 Critical Issues

1. **No robots.txt** — search engines have no crawling instructions
2. **Homepage missing H1 tag** — primary heading absent from the most important page
3. **No Open Graph or Twitter Card tags** — every shared link renders as a blank preview
4. **Blog posts lack BlogPosting schema** — missed rich-result opportunities
5. **Sitemap missing lastmod/changefreq/priority** — poor crawl optimization signals

### Top 5 Quick Wins

1. Add a `robots.txt` allowing all crawlers and pointing to the sitemap (5 minutes)
2. Wrap the homepage title text in an `<h1>` tag (15 minutes)
3. Add Open Graph and Twitter Card `<meta>` tags to the base layout (30 minutes)
4. Add `lastmod` to sitemap entries (depends on Astro sitemap config)
5. Remove `WebSite` schema from all non-homepage layouts (template fix)

---

## Scores by Category

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 65 | 14.3 |
| Content Quality | 23% | 78 | 17.9 |
| On-Page SEO | 20% | 70 | 14.0 |
| Schema / Structured Data | 10% | 60 | 6.0 |
| Performance (CWV) | 10% | 68 | 6.8 |
| AI Search Readiness | 10% | 52 | 5.2 |
| Images | 5% | 75 | 3.8 |
| **Total** | **100%** | | **68.0 (adjusted 65)** |

---

## Technical SEO

### Crawlability
- **No robots.txt file.** Critical. Create `public/robots.txt` with:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://chinesemountains.org/sitemap-index.xml
  ```
- Sitemap exists and covers 42 URLs. Missing `lastmod`, `changefreq`, `priority` fields.
- All pages return valid HTML with consistent structure.

### Indexability
- All 43 pages have correct canonical URLs.
- No `noindex` tags detected on any page (including 404, where one would be appropriate).
- 404 page has a canonical to `/404/` which should be removed or replaced with `noindex`.

### Security
- HTTPS assumed for production deployment. Verify the CDN enforces HSTS.

---

## Content Quality

### Strengths
- Mountain detail pages are consistently thorough with practical information.
- Blog posts are well-researched with original advice (not generic AI content).
- Readability is excellent across the site.

### Weaknesses
- About page has only ~200 words — signals low authority.
- No author pages or individual bylines — "Chinese Mountains Team" used everywhere.
- No privacy policy, contact page, or editorial standards page.
- Meta description template duplicated across all 25 mountain pages: "Everything about [Name]: height, trails, weather, photos, history, travel tips."

---

## On-Page SEO

### Title Tags
- Pattern is strong: `[Page Title] | Chinese Mountains` with descriptive lead text.
- Redundant branding on some pages: "About | Chinese Mountains | Chinese Mountains" (doubled suffix).
- Blog posts have correct format: `[Article Title] | Chinese Mountains Blog | Chinese Mountains`.

### Meta Descriptions
- All pages have descriptions. Length is good (most 140-160 chars).
- Mountain pages use a templated description — okay but not distinctive.

### Headings
- **Homepage H1 is missing.** The hero text is rendered in a `<div>` without any H1. This is a critical on-page signal gap.
- Mountain page H1 values have leading/trailing whitespace (template spacing issue).
- Otherwise heading hierarchy is well-structured.

### Internal Linking
- Strong contextual linking via "You May Also Like" sections on mountain and blog pages.
- Navigation links all use descriptive anchor text.
- Comparison table on homepage links to top mountain pages.

---

## Schema

### Present
- `WebSite` with `SearchAction` (unfortunately on every page via layout).
- `FAQPage` on homepage (3 questions) — correct and valuable.
- `TouristAttraction` on mountain detail pages with geo, address, and UNESCO data.

### Missing
- `BlogPosting` or `Article` on all 3 blog posts.
- `BreadcrumbList` on mountain and blog pages (visual breadcrumbs are present).
- `Organization` on the About page.
- `WebSite` schema should only appear on the homepage, not on all 43 pages including `/404/`.

---

## Performance

- 403 KB JavaScript (9 bundles) — heavier than needed for a content site.
- 33 KB CSS — excellent.
- 8 MB of WebP images (26 files). Largest images exceed 400 KB.
- No `srcset` or responsive image variants.
- Google Fonts and Leaflet CSS are external render-blocking requests.
- `hero-map-bg.png` is in PNG format (should be WebP).

---

## AI Search Readiness

- **No `llms.txt` file** — no LLM-readable site summary.
- Content is inherently structured and fact-dense (good for AI extraction) but lacks author attribution and citations.
- No Open Graph means AI-powered previews (ChatGPT shared links, Slack unfurls) render blank.
- Schema markup helps AI understand entity relationships (mountains, locations, descriptions).

---

## Images

- All images have descriptive, keyword-rich alt text — excellent.
- WebP format used throughout — good.
- Oversized images: several mountain photos at 400+ KB.
- Missing explicit `width`/`height` attributes on `<img>` tags — creates CLS risk.
- No responsive image strategy (no `srcset`, no `<picture>`).

---

*Detailed per-category findings are in the `findings/` directory.*
