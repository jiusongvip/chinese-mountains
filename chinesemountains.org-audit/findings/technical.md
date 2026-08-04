## Technical SEO Findings

### robots.txt
- **Missing.** No `robots.txt` exists in either the `public/` or `dist/` directory. Every site should have one, even if it allows all crawling.
- **Risk:** Search engines receive no crawling guidance. Large sites without a robots.txt may trigger crawl budget issues.

### Sitemap
- Sitemap exists at `/sitemap-index.xml` referencing `/sitemap-0.xml`.
- 42 URLs listed -- matches all indexable pages (404 page correctly excluded).
- **Missing fields:** No `<lastmod>`, `<changefreq>`, or `<priority>` on any URL. These help search engines prioritize crawl and detect fresh content.
- RSS/XML namespace declarations are included (`news`, `image`, `video`) but none are used -- harmless but extraneous.

### Canonical URLs
- All 43 HTML pages declare a canonical `<link>` tag pointing to the correct `https://chinesemountains.org/...` URL.
- No self-referencing or broken canonicals detected.

### 404 Page (`/404.html`)
- Landing 404 returns a styled page with H1 "404" and a link home.
- **Issues:**
  - No `<meta name="robots" content="noindex">` -- search engines may index the 404 page.
  - Canonical set to `/404/` which could cause it to appear in SERPs.
  - Includes the site-wide `WebSite` schema which is inappropriate for an error page.

### Security Headers
- Not auditable on a static build. When deployed, ensure the CDN/host sends: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, and `X-Frame-Options: DENY`.

### Mixed Content
- Google Fonts stylesheet loaded via HTTPS -- OK.
- Leaflet CSS loaded via `https://cdnjs.cloudflare.com` -- OK.
- No HTTP resources detected in the build output.

### HTML Validity
- HTML5 doctype on all pages.
- `lang="en"` declared on `<html>` -- consistent.
- No `hreflang` tags present. If the site targets only English speakers, this is acceptable.

### Score: 65/100
