## Schema & Structured Data Findings

### What's Present
- **WebSite** schema with `SearchAction` on every page. This is applied from the shared layout -- it's appropriate for the homepage but unnecessary on inner pages.
- **FAQPage** schema on the homepage with 3 questions about mountain recommendations. Well-formed and helpful.
- **TouristAttraction** schema on mountain detail pages (e.g., Huangshan, Everest) with `name`, `description`, `image`, `geo`, `address`, and `additionalProperty` for UNESCO designation.

### What's Missing

1. **No BlogPosting or Article schema on blog pages.** Blog posts like "The First-Timer's Guide" only have the generic `WebSite` schema. Add:
   - `@type: BlogPosting` with `headline`, `author`, `datePublished`, `dateModified`, `image`, `description`.

2. **No BreadcrumbList schema.** Mountain pages and blog posts have visible breadcrumb navigation (e.g., Home > Blog > Article Title) but no `BreadcrumbList` structured data. This is a missed opportunity for rich results in SERPs.

3. **WebSite schema duplicated on every page.** This is layed into the shared layout and appears on all 43 pages including the 404 page. Move `WebSite` schema to the homepage only.

4. **About page lacks Organization schema.** The `/about/` page should include `@type: Organization` with `name`, `url`, `description`, and `sameAs` links.

5. **Guide pages lack structured data.** Consider `@type: Guide` or `Article` on seasonal guide pages.

### Validation
- All JSON-LD blocks parse correctly.
- `TouristAttraction` geo coordinates use decimal format -- correct.

### Score: 60/100
