## Visual & UX Findings (SEO-adjacent)

### Mobile Responsiveness
- Viewport meta tag present on all pages.
- Navigation collapses to hamburger menu on mobile.
- Comparison table switches to card layout on mobile -- good.
- Seasonal calendar has horizontal scroll for month tabs -- acceptable.
- The interactive map is the primary visual element on homepage and adapts well.

### Above-the-Fold
- Homepage hero section is image-heavy with a large interactive map + text. The map loads asynchronously so text content renders first.
- H1 is missing on homepage -- the hero section renders without a primary heading tag. The text "Discover Every Famous Peak in China" appears as styled text but is not in an H1.

### Image Alt Text
- Every `<img>` tag across all 40+ content pages has descriptive `alt` text.
- Examples: "Huangshan granite peaks above a sea of clouds at sunrise", "Mount Everest north face from Tibetan base camp" -- well-written and keyword-rich.

### Accessibility
- `aria-label` used on menu button.
- Color contrast: White-on-gradient text for vibe cards is acceptable.
- No `role` attributes on interactive quiz elements -- could be improved for screen readers.

### Navigation & Architecture
- 6 primary nav items: Home, Explore, Best, Compare, Guides, Blog, Gallery.
- Footer has 3 columns: Explore, Guides, Site -- with 2-4 links each.
- Internal linking is strong: mountain pages link to related mountains, blog posts link to each other, guides link to relevant mountains.

### Social Sharing Preview
- No Open Graph or Twitter Card tags on any page. Sharing a link will show a generic, unstyled preview.
- This is one of the highest-impact missing features.

### Score: 72/100
