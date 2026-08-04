# Chinese Mountains — Prioritized Action Plan

## Phase 1: Critical Fixes (Week 1)

These issues directly impact indexing, search visibility, and social sharing.

### 1. Create robots.txt — CRITICAL
**File:** `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://chinesemountains.org/sitemap-index.xml
```
**Effort:** 5 min | **Impact:** Prevents crawl budget waste, signals proper site management.

### 2. Add H1 to homepage — CRITICAL
**File:** `src/pages/index.astro`
The homepage hero text "Discover Every Famous Peak in China" currently sits in a `<div>`. Wrap it in `<h1>` with the same styling classes.
**Effort:** 15 min | **Impact:** Restores the single strongest on-page ranking signal.

### 3. Add Open Graph + Twitter Card tags — CRITICAL
**File:** `src/layouts/BaseLayout.astro` (or equivalent shared layout)
Add to `<head>`:
```html
<meta property="og:title" content="{pageTitle}" />
<meta property="og:description" content="{pageDescription}" />
<meta property="og:image" content="https://chinesemountains.org/images/og-default.webp" />
<meta property="og:url" content="{canonicalUrl}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```
**Effort:** 30 min | **Impact:** Every shared link gets a rich preview. Affects CTR from social and AI platforms.

### 4. Remove WebSite schema from non-homepage pages — HIGH
**File:** Shared layout template
The `WebSite` + `SearchAction` JSON-LD block should only render on the homepage. Move it from the base layout to `src/pages/index.astro` only.
**Effort:** 15 min | **Impact:** Cleaner schema signals, no duplicate entity confusion.

### 5. Generate a default OG image — MEDIUM
Create a 1200×630 WebP social preview image showing mountains + site name. Place at `public/images/og-default.webp`.
**Effort:** 30 min | **Impact:** Required for OG tags to render previews.

---

## Phase 2: High-Impact Improvements (Weeks 2-3)

### 6. Add BlogPosting schema to blog posts — HIGH
**Files:** All blog post `.astro` templates
Each blog page should include:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "author": { "@type": "Person", "name": "..." },
  "datePublished": "...",
  "dateModified": "...",
  "image": "...",
  "description": "..."
}
```
**Effort:** 1 hour | **Impact:** Enables rich results (article carousel, headline + image in SERPs).

### 7. Add BreadcrumbList schema — HIGH
**Files:** All page templates with breadcrumbs
Map the visible breadcrumb navigation (Home > Mountains > Mount Huangshan) to `BreadcrumbList` JSON-LD.
**Effort:** 1 hour | **Impact:** Breadcrumb rich results in SERPs improve CTR.

### 8. Fix double-branded title tags — MEDIUM
**Affected:** Homepage ("Chinese Mountains - ... | Chinese Mountains"), About ("About | Chinese Mountains | Chinese Mountains")
Ensure the trailing `| Chinese Mountains` is not appended twice. Check the layout/template logic.
**Effort:** 30 min | **Impact:** Cleaner SERP display.

### 9. Fix H1 whitespace on mountain page templates — LOW
**Affected:** All 25 mountain pages
The H1 text has leading/trailing whitespace (e.g., ` Mount Huangshan `). Trim in the Astro template.
**Effort:** 10 min | **Impact:** Minor but signals attention to detail.

### 10. Add noindex to 404 page — MEDIUM
**File:** `src/pages/404.astro`
Add `<meta name="robots" content="noindex">` and remove the canonical link.
**Effort:** 5 min | **Impact:** Prevents 404 page from appearing in search results.

---

## Phase 3: Content & Authority (Weeks 4-8)

### 11. Expand the About page — HIGH
**File:** `src/pages/about.astro`
Add at least 500-800 words covering: mission, team background, editorial standards, how information is sourced, and contact information. Include `Organization` schema.
**Effort:** 1-2 hours | **Impact:** Strengthens E-E-A-T signals.

### 12. Add author pages — MEDIUM
Create individual author bios for blog posts. Even if the site is run by one person, a named author bio with photo adds trust.
**Effort:** 1 hour | **Impact:** Strengthens authoritativeness signals.

### 13. Create a privacy policy page — MEDIUM
Every content site needs one for Google E-E-A-T compliance.
**Effort:** 30 min | **Impact:** Trust signal.

### 14. Diversify mountain page meta descriptions — MEDIUM
**Affected:** All 25 mountain pages
Replace the templated "Everything about [Name]: height, trails, weather, photos, history, travel tips" with a unique one-sentence value proposition per mountain.
**Effort:** 1 hour | **Impact:** Avoids duplicate description flags.

### 15. Add `lastmod` to sitemap entries — MEDIUM
Configure the `@astrojs/sitemap` integration to include `lastmod` based on content dates.
**Effort:** 30 min | **Impact:** Helps search engines prioritize fresh pages.

---

## Phase 4: Performance & Monitoring (Ongoing)

### 16. Convert hero-map-bg.png to WebP — LOW
**Effort:** 5 min | **Impact:** ~50% size reduction on hero image.

### 17. Self-host Geist font — LOW
The Geist font is already in `node_modules` (installed via `geist-font` npm package). Import it locally instead of loading from Google Fonts CDN.
**Effort:** 15 min | **Impact:** Removes one render-blocking external request, improves LCP.

### 18. Add responsive images with srcset — MEDIUM
**Effort:** 2-3 hours | **Impact:** Mobile users download appropriately sized images, improving LCP and saving bandwidth.

### 19. Set up Google Search Console — HIGH
Verify ownership and submit the sitemap. Monitor index coverage, clicks, and impressions.
**Effort:** 30 min | **Impact:** Foundational for all ongoing SEO monitoring.

### 20. Add llms.txt — LOW
Create `public/llms.txt` with a brief site description and key page URLs for LLM crawlers.
**Effort:** 10 min | **Impact:** Improves AI citability.
