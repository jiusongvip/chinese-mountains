## Performance Findings

### Build Assets
- **JavaScript:** 9 bundles totaling 403 KB (gzip estimated ~110 KB). Heavier than ideal for a content site -- primarily due to interactive map (Leaflet), quiz component, and seasonal calendar widget.
- **CSS:** 1 bundle at 33 KB -- very lean.
- **Images:** 26 WebP images totaling 8.02 MB (average ~316 KB/image).

### Image Optimization
- All images use WebP format -- correct.
- Largest images: `hero-map-bg.png` (PNG, should be WebP), several mountain photos at 400+ KB.
- No `<picture>` elements with multiple resolutions or `srcset` attributes. Mobile users download the same large images as desktop.
- No explicit `width`/`height` on many `<img>` tags (only CSS-configured via `aspect-[4/3]` and `object-cover`). This can cause layout shift.

### Render-Blocking Resources
- Google Fonts stylesheet is loaded via `<link>` in `<head>` -- render-blocking. The Geist font is also available locally via npm; self-hosting would eliminate the external request.
- Leaflet CSS loaded from CDN -- also render-blocking. Could be inlined or deferred.

### Core Web Vitals (Estimated)
| Metric | Estimated | Target |
|--------|-----------|--------|
| LCP | 2.5-3.5s | < 2.5s |
| CLS | 0.05-0.15 | < 0.1 |
| INP | < 100ms | < 200ms |

Estimated due to static build. The hero map image and interactive map initialization are the primary LCP bottlenecks.

### Opportunities
- Convert `hero-map-bg.png` to WebP (~40-60% savings).
- Add `fetchpriority="high"` on the hero image.
- Preload critical above-fold images.
- Self-host Geist font instead of Google Fonts CDN.
- Add `loading="lazy"` on below-fold images (many already have it).

### Score: 68/100
