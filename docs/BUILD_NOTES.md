# Build Notes — Takween Shopify Starter Theme

**Developer:** Sheikh M. Khursheed  
**Project:** Takween Digital Services — Project 04  
**Last updated:** 2026-10-07

---

## 1. Overview

| Field | Detail |
|---|---|
| Base theme | Shopify Dawn |
| Base version | 16.0.0 (tag `v16.0.0`, commit `bc39a7d`) |
| Source | https://github.com/Shopify/dawn |
| Approach | **Extend Dawn, custom `tk-` layer.** Dawn handles all core e-commerce JS (cart, variants, facets, search, quick-add). All new sections, snippets and CSS are prefixed `tk-`. **18 NEW `tk-` sections/templates** are built from scratch. **15 Dawn files are EXTEND** (modified minimally, documented in §9) where hooking into existing custom elements is the only clean path. |
| Goal | A reusable, rebrandable Shopify OS 2.0 framework for future Takween client builds. |

---

## 2. Architecture

### Folder conventions
| Folder | Purpose |
|---|---|
| `assets/` | All CSS and JS. Custom files: `tk-<name>.css` / `tk-<name>.js`. Dawn files untouched unless documented in §9. |
| `config/` | `settings_schema.json` — Takween groups appended at the end; never modify Dawn groups inline. `settings_data.json` — never manually edited; owned by Shopify. |
| `layout/` | `theme.liquid` — `tk-css-variables.liquid` and `tk-base.css` injected here. Minimal changes; documented in §9. |
| `locales/` | Translation keys added to `en.default.json` under a `"tk"` top-level key. Schema labels added to `en.default.schema.json` under `"tk"`. |
| `sections/` | New sections: `tk-<name>.liquid`. EXTEND decisions modify existing Dawn files only. |
| `snippets/` | New components: `tk-<name>.liquid`. |
| `templates/` | New alternates: `page.tk-<name>.json`. Existing templates replaced with `tk-` section composition. |
| `docs/` | Documentation only — Shopify ignores this folder. Not synced to the storefront. |

### CSS loading
- Dawn's `base.css` is loaded globally from `layout/theme.liquid`.
- `assets/tk-base.css` loaded globally after `base.css` — utilities, tokens, shared components.
- Section-specific CSS (`assets/tk-<name>.css`) loaded **inside each section file** via `{{ 'tk-<name>.css' | asset_url | stylesheet_tag }}`. Only loaded on pages that render the section.

### JS loading
- All `tk-` custom elements: loaded inside the section that needs them via `<script src="{{ 'tk-<name>.js' | asset_url }}" defer></script>`.
- Dawn's JS is loaded by `layout/theme.liquid` as-is — do not move or defer it differently.

### Token system
- `snippets/tk-css-variables.liquid` rendered in `<head>` (Phase 03) outputs `:root` CSS custom properties for spacing, type scale, radii, shadows, z-index.
- All `tk-` CSS reads from `--tk-*` variables — never hard-coded values.

---

## 3. Design System (tokens & global settings)

### Core Colours & Presets
Configured in `config/settings_data.json` presets mapping directly to Dawn's 5 OS 2.0 colour schemes:
- **scheme-1 (Light / Default):** Background `#F6F5F2`, Text `#16181B`, Button `#1F4FD8`, Button Label `#FFFFFF`, Secondary Button `#16181B`, Shadow `#16181B`
- **scheme-2 (White surface):** Background `#FFFFFF`, Text `#16181B`, Button `#16181B`, Button Label `#FFFFFF`, Secondary Button `#16181B`
- **scheme-3 (Dark):** Background `#16181B`, Text `#F6F5F2`, Button `#F6F5F2`, Button Label `#16181B`, Secondary Button `#F6F5F2`
- **scheme-4 (Accent):** Background `#1F4FD8`, Text `#FFFFFF`, Button `#16181B`, Button Label `#FFFFFF`, Secondary Button `#FFFFFF`
- **scheme-5 (Tint):** Background `#ECEAE5`, Text `#16181B`, Button `#1F4FD8`, Button Label `#FFFFFF`, Secondary Button `#16181B`

Status tokens (in `config/settings_schema.json` under *Takween — Status colours*):
- `--tk-color-sale`: `#B42318` (Sale badge and discounted prices)
- `--tk-color-success`: `#1F7A4D` (In stock indicator, checkmarks, success alerts)
- `--tk-color-low-stock`: `#9A3412` (Low stock alert text and indicator)
- `--tk-color-soldout`: `#3D4148` (Sold-out badge background)

### Typography
- Primary font: **Manrope** (`manrope_n4` body 400, `manrope_n8` heading 800) set as default in `settings_data.json`.
- Fluid clamp typography tokens:
  - `--tk-text-5xl` (H1): `clamp(2.125rem, 1.6rem + 2.2vw, 3.25rem)` (52px &rarr; 34px, 800 weight, 1.04 line-height, -0.03em tracking)
  - `--tk-text-4xl` (H2): `clamp(1.625rem, 1.3rem + 1.4vw, 2.25rem)` (36px &rarr; 26px, 800 weight, 1.15 line-height, -0.02em tracking)
  - `--tk-text-3xl` (H3): `clamp(1.125rem, 1rem + 0.6vw, 1.375rem)` (22px &rarr; 18px, 700 weight, 1.25 line-height)
  - `--tk-card-title-size`: `1rem` (16px, 700 weight, 1.35 line-height)
  - `--tk-text-base` (Body): `1rem` (16px, 1.6 line-height)
  - `--tk-eyebrow-size`: `0.8125rem` (13px, 700 weight, uppercase, 0.1em tracking, accent colour)

### Shape, Spacing & Container Tokens
- `--tk-container`: `1280px` (adjustable 1000–1600px via Theme Settings)
- `--tk-gap`: `clamp(12px, 2.5vw, 24px)`
- `--tk-gutter`: `clamp(16px, 4vw, 24px)`
- Spacing scale multiplier: `--tk-spacing-mult` (compact = 0.67, default = 1.0, spacious = 1.33)
  - `--tk-space-1`: `calc(4px * mult)`
  - `--tk-space-2`: `calc(8px * mult)`
  - `--tk-space-3`: `calc(12px * mult)`
  - `--tk-space-4`: `calc(16px * mult)`
  - `--tk-space-5`: `calc(24px * mult)`
  - `--tk-space-6`: `calc(32px * mult)`
  - `--tk-space-7`: `calc(48px * mult)`
  - `--tk-space-8`: `calc(64px * mult)`
  - `--tk-space-9`: `calc(96px * mult)`
- Corner radii:
  - `--tk-radius-button`: `8px`
  - `--tk-radius-card`: `12px`
  - `--tk-radius-input`: `8px`
  - `--tk-radius-badge`: `999px` (pill)
- Button min-height: `48px`, padding `0 28px`, touch target min `44×44px`.
- Keyboard focus outline: `2px solid var(--tk-color-accent)` with `3px` offset.

### "How to Rebrand for a Client" Checklist
When adapting the Takween Starter Theme for a new client project:
1. **Typography:** In Theme Settings &rarr; Typography, select client brand fonts for headings and body.
2. **Colours:** In Theme Settings &rarr; Colors, adjust Scheme 1–5 backgrounds, text, and button colours to match client brand palette.
3. **Status Colours:** In Theme Settings &rarr; Takween — Status colours, adjust sale/success/low-stock/sold-out tones if client brand guides dictate.
4. **Corner Radii:** In Theme Settings &rarr; Takween — Shape, tune button, card, and input radii (e.g. 0px for sharp editorial luxury, 16px for playful consumer tech).
5. **Button Style:** Choose solid fill or outline, and regular or uppercase text transform.
6. **Card Presentation:** In Theme Settings &rarr; Takween — Product cards, set default image ratio (portrait 4:5, square 1:1, natural), toggle vendor display, swatches, and badge types.
7. **Spacing Scale:** In Theme Settings &rarr; Takween — Layout & spacing, switch between compact, default, and spacious to match brand density.

---

## 4. Custom Sections

| Section file | Decision | Brief requirement | Key settings | Notes |
|---|---|---|---|---|
| `sections/tk-announcement-bar.liquid` | **NEW** | Brief §5: Announcement bar | Colour scheme, auto-rotate, dismissible, visibility | Replaces Dawn's `announcement-bar` in header-group.json |
| `sections/header.liquid` | **EXTEND** | Brief §5: Header/navigation | Logo position, menu type, search, utility CTA | Dawn's `header-drawer`, `header-menu`, predictive-search must stay working |
| `sections/tk-hero.liquid` | **NEW** | Brief §5: Hero/banner | Desktop+mobile image, overlay, height, content position, eager/lazy load | First-section detection for `fetchpriority="high"` |
| `sections/tk-rich-text.liquid` | **NEW** | Brief §5: Rich text/content intro | Alignment, content width, colour scheme | Dawn has `rich-text.liquid` — new tk version for clear custom attribution |
| `sections/tk-featured-collection.liquid` | **NEW** | Brief §5: Featured collection | Collection picker, product count, columns, mobile slider | Uses `tk-product-grid` + `tk-product-card` |
| `sections/tk-featured-products.liquid` | **NEW** | Brief §5: Featured products | Product list picker, columns, layout | Uses same grid/card system |
| `sections/tk-image-with-text.liquid` | **NEW** | Brief §5: Image with text, reversible | Image width, reverse toggle, mobile order | Dawn has `image-with-text.liquid` — tk version for custom control |
| `sections/tk-multicolumn.liquid` | **NEW** | Brief §5: Multicolumn benefits/trust | Columns desktop/mobile, card style, icon or image per block | Dawn has `multicolumn.liquid` — new version for icon support + tk styling |
| `sections/tk-logo-strip.liquid` | **NEW** | Brief §5: Logo/trust-mark strip | Grayscale toggle, marquee option, logos per row | New section — Dawn has no equivalent |
| `sections/tk-testimonials.liquid` | **NEW** | Brief §5: Testimonials/reviews | Grid or slider layout, star rating block | New section — Dawn has no equivalent |
| `sections/tk-faq.liquid` | **NEW** | Brief §5: FAQ accordion | Blocks or metaobject source, single/multi open, JSON-LD toggle | New section — Dawn has `collapsible-content` but no metaobject source |
| `sections/tk-promo-split.liquid` | **NEW** | Brief §5: Promotional split banner | Split ratio, height, 2-panel blocks with per-panel colour scheme | New section — Dawn has no equivalent |
| `sections/tk-newsletter.liquid` | **NEW** | Brief §5: Newsletter/lead capture | Layout centered/split, privacy note, success/error feedback | Dawn has `newsletter.liquid` — tk version for richer layout + a11y |
| `sections/tk-footer.liquid` | **NEW** | Brief §5: Footer | Menu, business info, newsletter, social blocks; accordion on mobile | Replaces Dawn's `footer.liquid` in footer-group.json |
| `sections/main-collection-product-grid.liquid` | **EXTEND** | Brief §4: Collection | Use `tk-product-card`, columns settings | Must keep `facet-filters-form`, Section Rendering API calls |
| `sections/main-collection-banner.liquid` → `sections/tk-collection-header.liquid` | **NEW** | Brief §4: Collection header | Title h1, description clamp, breadcrumb, image | New section replaces banner; keeps clean separation |
| `sections/main-product.liquid` | **EXTEND** | Brief §4: Product | Add `tk_` blocks for stock, highlights, accordion, trust badges, sticky ATC | Dawn's `product-form`, `variant-selects`, `product-info`, media-gallery must stay |
| `sections/related-products.liquid` | **EXTEND** | Brief §4: Product recommendations | Use `tk-product-card` + `tk-product-grid` | Keep `product-recommendations` custom element |
| `sections/main-search.liquid` | **EXTEND** | Brief §4: Search | No-results state, empty query state, tk card grid | Must keep `main-search`, `facet-filters-form` |
| `sections/cart-drawer.liquid` | **EXTEND** | Brief §4: Cart drawer | Free-shipping bar, empty state, live region | Must keep `cart-drawer`, `cart-drawer-items` custom elements |
| `sections/main-cart-items.liquid` | **EXTEND** | Brief §4: Cart page | Line item feedback, live region | Must keep `cart-items` custom element |
| `sections/main-cart-footer.liquid` | **EXTEND** | Brief §4: Cart page | Subtotal, empty state, `tk-free-shipping-bar` | Keep Dawn cart footer structure |
| `sections/main-page.liquid` | **EXTEND** | Brief §4: Standard content page | Apply `.tk-rte` class for styled rich text | Minimal change — just a class addition |
| `sections/tk-page-header.liquid` | **NEW** | Brief §4: Content pages | Title, intro, breadcrumb, optional image | Used by page/faq/about/contact templates |
| `sections/tk-contact.liquid` | **NEW** | Brief §4: Contact page | Form + business info layout | Dawn has `contact-form.liquid` — tk version for split layout + richer a11y |
| `sections/tk-404.liquid` | **NEW** | Brief §4: 404 page | Search form, popular collections, featured products | Replaces Dawn's `main-404.liquid` in 404.json |
| `sections/tk-style-guide.liquid` | **NEW** | (Developer QA) | Headings, buttons, badges, form fields, product card preview | No preset — invisible to merchants; removed before submission |

### Templates requirements map

| Template file | Decision | Composed from | Phase |
|---|---|---|---|
| `templates/index.json` | **COMPOSE** | tk-hero → tk-multicolumn → tk-featured-collection → tk-image-with-text → tk-featured-products → tk-promo-split → tk-testimonials → tk-logo-strip → tk-faq → tk-newsletter | Phase 07 |
| `templates/product.json` | **COMPOSE** | main-product (extended) → tk-multicolumn → related-products (extended) → tk-faq | Phase 08 |
| `templates/collection.json` | **COMPOSE** | tk-collection-header → main-collection-product-grid (extended, with facets) → tk-multicolumn → tk-newsletter | Phase 09 |
| `templates/search.json` | **COMPOSE** | main-search (extended) | Phase 10 |
| `templates/cart.json` | **COMPOSE** | main-cart-items (extended) → main-cart-footer (extended) | Phase 11 |
| `templates/page.json` | **COMPOSE** | tk-page-header → main-page (extended) → tk-rich-text (CTA) | Phase 12 |
| `templates/page.faq.json` | **COMPOSE** | tk-page-header → tk-faq → tk-rich-text | Phase 12 |
| `templates/page.about.json` | **COMPOSE** | tk-page-header → tk-image-with-text ×2 → tk-multicolumn → tk-logo-strip → tk-rich-text | Phase 12 |
| `templates/page.contact.json` | **COMPOSE** | tk-page-header → tk-contact | Phase 12 |
| `templates/404.json` | **COMPOSE** | tk-404 | Phase 12 |
| `templates/page.tk-style-guide.json` | **NEW** | tk-style-guide | Phase 03 (dev QA only) |

---

## 5. Custom Snippets

| Snippet file | Decision | Purpose | Parameters / example |
|---|---|---|---|
| `snippets/tk-css-variables.liquid` | **NEW** | Outputs `:root` CSS custom property tokens | No params; `{% render 'tk-css-variables' %}` in `<head>` |
| `snippets/tk-icon.liquid` | **NEW** | Inline SVG icon set | `icon`, `size`, `class`; `{% render 'tk-icon', icon: 'cart', size: 20 %}` |
| `snippets/tk-button.liquid` | **NEW** | Accessible button/link component | `label`, `url`, `style`, `size`, `full_width`, `icon`, `attributes` |
| `snippets/tk-section-heading.liquid` | **NEW** | Eyebrow + heading + subheading + "view all" link | `eyebrow`, `heading`, `subheading`, `alignment`, `tag`, `link_label`, `link_url` |
| `snippets/tk-image.liquid` | **NEW** | Responsive image wrapper with placeholder SVG | `image`, `widths`, `sizes`, `ratio`, `lazy`, `fetchpriority`, `alt` |
| `snippets/tk-price.liquid` | **NEW** | Price + compare-at + unit price + "From" | `product`, `variant`, `show_from` |
| `snippets/tk-badge.liquid` | **NEW** | Sale / sold-out / custom badge | `product`, `variant`; reads global settings for sale style |
| `snippets/tk-rating.liquid` | **NEW** | Static star display | `rating` (0–5), `aria_label` |
| `snippets/tk-product-card.liquid` | **NEW** | Primary product card component | `product`, `show_vendor`, `image_ratio`, `show_secondary_image`, `heading_tag`, `lazy_load`, `section_id` |
| `snippets/tk-product-grid.liquid` | **NEW** | Responsive product grid / slider | `products`, `columns_desktop`, `columns_tablet`, `columns_mobile`, `enable_slider`, `section_id` |
| `snippets/tk-free-shipping-bar.liquid` | **NEW** | Progress bar toward free shipping threshold | `cart_total`; threshold from theme settings |
| `snippets/tk-sticky-atc.liquid` | **NEW** | Mobile sticky Add to Cart strip | Rendered inside `main-product`; no standalone params |

---

## 6. Custom Blocks

| Block | Parent section | Purpose |
|---|---|---|
| `announcement` (block in `tk-announcement-bar`) | `tk-announcement-bar` | Message text + link + optional icon |
| `message` (block types: eyebrow, heading, text, buttons) | `tk-hero` | Composable hero content |
| `column` | `tk-multicolumn` | Icon/image + heading + text + link per benefit |
| `logo` | `tk-logo-strip` | Logo image + link |
| `testimonial` | `tk-testimonials` | Quote + author + rating + image |
| `question` / `metaobject` | `tk-faq` | FAQ accordion row or metaobject source |
| `panel` | `tk-promo-split` | Per-panel image + colour scheme + content |
| `menu` / `business_info` / `text` / `newsletter` / `social` | `tk-footer` | Footer column blocks |
| `tk_stock_indicator` | `main-product` (EXTEND) | Live stock status; updates on variant change |
| `tk_highlights` | `main-product` (EXTEND) | Renders `custom.highlights` metafield as list |
| `tk_details_accordion` | `main-product` (EXTEND) | Specs / Care / FAQs via metafields |
| `tk_trust_badges` | `main-product` (EXTEND) | 4 icon+text trust items |
| `tk_delivery_note` | `main-product` (EXTEND) | Short editable delivery note |

---

## 7. Metafields & Metaobjects

**Full spec:** `docs/DATA_MODEL.md` | **Admin setup guide:** `docs/SAMPLE_DATA_SETUP.md`

### Metaobject definitions (namespace `custom`)

| API handle | Display name | Fields | Storefront access | Used in |
|---|---|---|---|---|
| `specification` | Specification | `label` (single line text, required), `value` (single line text, required) | ✅ ON | `tk_details_accordion` block → Specifications tab |
| `faq_item` | FAQ Item | `question` (single line text, required), `answer` (rich text, required) | ✅ ON | `tk-faq` section (metaobject source mode); `tk_details_accordion` block → FAQs tab |

### Product metafield definitions (namespace `custom`)

| Display name | Namespace.key | Type | Validation | Storefront access | Used in | Hidden when |
|---|---|---|---|---|---|---|
| Highlights | `custom.highlights` | List of: Single line text | 3–5 items recommended | ✅ ON | `tk_highlights` block in `main-product` | Blank |
| Care Instructions | `custom.care_instructions` | Rich text | — | ✅ ON | `tk_details_accordion` → Care tab | Blank |
| Specifications | `custom.specifications` | List of: Metaobject ref → `specification` | — | ✅ ON | `tk_details_accordion` → Specifications tab | Empty list |
| Product FAQs | `custom.faqs` | List of: Metaobject ref → `faq_item` | — | ✅ ON | `tk_details_accordion` → FAQs tab; `tk-faq` section | Empty list |
| Custom Badge | `custom.badge_text` | Single line text | Max 20 characters | ✅ ON | `tk-badge`, `tk-product-card` | Blank or global setting OFF |

### Why metafields/metaobjects?
Product-specific structured data varies per product and cannot be hard-coded into theme files. Shopify metafields and metaobjects let content editors manage this data in Admin without touching code, keep the data type-safe and validated, and make the theme genuinely data-driven. Metaobjects (like `specification`) also allow reuse across multiple products and centralised editing — fulfilling brief §6's requirement to avoid hard-coding product-specific content into theme files.

---

## 8. Custom JavaScript

| File | Purpose | Dawn events used |
|---|---|---|
| `assets/tk-announcement-bar.js` | Custom element `<tk-announcement-bar>`: auto-rotate, pause/play, dismissal, Theme Editor block-select | None (standalone) |
| `assets/tk-sticky-atc.js` | Mobile sticky ATC: IntersectionObserver on main ATC button, syncs variant/price via pub/sub | `PUB_SUB_EVENTS.variantChange` (subscribe) |
| `assets/tk-load-more.js` | Progressive load-more for collection/search: Section Rendering API fetch, focus management | None (uses `fetch` + DOM) |
| `assets/tk-faq.js` | Single-open accordion mode; smooth open/close | None (standalone) |
| `assets/tk-product-card.js` | Colour swatch hover (swap image src), secondary image preload | None (standalone) |

---

## 9. Modified Dawn Files

| File | What changed | Why |
|---|---|---|
| `layout/theme.liquid` | Add `{% render 'tk-css-variables' %}` + `{{ 'tk-base.css' \| asset_url \| stylesheet_tag }}` in `<head>` | Global token output and base CSS |
| `sections/header-group.json` | Replace `announcement-bar` type with `tk-announcement-bar` | Use new custom bar |
| `sections/footer-group.json` | Replace `footer` type with `tk-footer` | Use new custom footer |
| `sections/header.liquid` | Add logo position options, utility CTA, mobile drawer footer, restyle with tk tokens | Extend rather than replace — keeps Dawn's header-drawer/header-menu JS |
| `sections/main-product.liquid` | Add `tk_stock_indicator`, `tk_highlights`, `tk_details_accordion`, `tk_trust_badges`, `tk_delivery_note` block types; add sticky ATC snippet; restyle variant picker with pills/swatches | Extend Dawn's variant/cart JS; new blocks integrate via existing schema |
| `sections/main-collection-product-grid.liquid` | Use `tk-product-card` instead of `card-product`, add column count settings | Keeps `facet-filters-form` JS intact; only template markup changed |
| `sections/related-products.liquid` | Use `tk-product-grid` + `tk-product-card`, add heading/columns settings | Keeps `product-recommendations` custom element |
| `sections/main-search.liquid` | Add no-results and empty-query states, use `tk-product-card`, pages/articles separate list | Keeps `main-search`, `facet-filters-form` |
| `sections/cart-drawer.liquid` | Add `tk-free-shipping-bar`, empty state, live region announcements | Keeps `cart-drawer`, `cart-drawer-items` |
| `sections/main-cart-items.liquid` | Add per-line loading states, live region for cart feedback | Keeps `cart-items` |
| `sections/main-cart-footer.liquid` | Add empty state, `tk-free-shipping-bar`, cart note toggle | Keeps Dawn cart structure |
| `sections/main-page.liquid` | Add `.tk-rte` wrapper class for rich text styling | Minimal: one class, no JS changes |
| `snippets/facets.liquid` | **Minimal markup only:** add wrapper `<div>` for the mobile drawer's sticky "Show X results" footer and `data-` attribute for active chip container. No new Liquid logic or loops added. | Required to position the sticky footer inside the filter drawer (Phase 09); all JS stays in Dawn's `facets.js` |
| `sections/predictive-search.liquid` | CSS token restyle: product result rows show image + title + price using `tk-price` snippet; no markup restructure | Keeps `predictive-search` custom element and all its JS intact |
| `config/settings_schema.json` | Append Takween setting groups (Layout, Shape, Product cards, Motion) | Extension only — Dawn groups untouched |
| `locales/en.default.json` | Add `"tk": {}` block for all custom user-facing strings | Namespace avoids collisions |
| `locales/en.default.schema.json` | Add `"tk": {}` block for schema labels | Same namespace |

---

## 10. Apps Used

| App | Why needed | Paid? |
|---|---|---|
| Shopify Search & Discovery | Enables storefront filter configuration (availability, price, type, size, colour) for collection and search pages. Native to Shopify; no custom code required. | Free (official Shopify app) |

No other apps are used. All core functionality is built natively.

---

## 11. Known Limitations & Future Enhancements

### Known limitations
- **Free-shipping bar** uses the store's default currency; does not adapt automatically in multi-currency storefronts. A note is shown in the section schema.
- **Filters** depend on Search & Discovery app configuration in Shopify Admin. Without setup, filter panel will be empty.
- **Checkout** is not customised — subject to Shopify plan/Checkout Extensibility limitations (out of scope, brief §4).
- **Testimonials JSON-LD** is intentionally omitted — sample reviews must not be marked up as real reviews (brief §5).
- **`custom.badge_text` metafield** max 20 chars is enforced by documentation only (Shopify metafield validation may need to be set in Admin).
- **Quick-add on product cards** requires Dawn's `quick-add.js` and `quick-add` modal to be present — already in Dawn 16.

### Future enhancements
- Subscription / recurring orders section (requires paid app — out of scope).
- Advanced mega-menu with image columns.
- Product comparison tool.
- Age verification gate.
- Back-in-stock notification form.
- Multi-currency free-shipping bar (requires Currency Formatting API).

---

## 12. Open Issues

| # | Issue | Status |
|---|---|---|
| 1 | Shopify `theme dev` login expired during setup session — needs re-auth before Phase 03 preview | Open |
| 2 | `config/settings_data.json` and `templates/*.json` merge conflict protocol — always stop and ask; never auto-resolve | Standing rule |
| 3 | `snippets/quick-order-product-row.liquid` — Dawn 16 orphan (Theme Check warning) — do not reference or remove; leave in place | Accepted / no fix |
| 4 | Pending Admin data: images + metafields for 11 products, collections, pages, menus, Search & Discovery filters | In progress (Admin tasks) |
