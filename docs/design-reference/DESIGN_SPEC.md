# Takween Starter — Approved Design (v2 Premium Editorial)

**v2 is the approved direction.** The theme must match these mockups. Files in `v1-archive/` are the superseded first direction — use them ONLY for layout/structure of templates that have no v2 mockup yet (collection, cart drawer, mobile product, style guide), restyled with the v2 tokens below.

## How to read the mockups
- Static HTML; all styling is inline `style="…"` — read it for exact values.
- Repeated content (cards, menus, principles) comes from the data in the `<script type="text/x-dc">` block (`renderVals()`); markup inside `<sc-for>` is one item's template. `{{radius}}` = 4 (px).
- `src="/_blob/…"` image URLs only resolve in the design tool — ignore them; in the theme every image comes from section settings / product media via `tk-image`.
- Sizes are real CSS px. In Dawn, **1rem = 10px**.

| File | Template |
|---|---|
| `home-desktop.html` | Homepage desktop — all homepage sections in order |
| `home-mobile.html` | Homepage mobile 390px (hero + category tiles) |
| `product-desktop.html` | Product page desktop (sticky info, gallery grid, size grid, accordion, "Complete the look") |

## Typography
| Role | Font | Spec |
|---|---|---|
| Headings / display | **Fraunces** (variable, opsz) | weight 300–350; emphasis words in *italic* weight 300 via `<em>` |
| Body / UI | **Instrument Sans** | 400 / 500 / 600 |
| Hero display | Fraunces | clamp(56px, 8vw, 116px), lh 0.92, ls -0.035em |
| Section H2 | Fraunces | clamp(40px, 4.4vw, 60px), lh 1.0, ls -0.03em (editorial/spotlight up to 72–88px) |
| Product H1 | Fraunces | 52px desktop / 38px mobile, lh 1.0 |
| Card title | Instrument Sans | 15px / 500 |
| Body | Instrument Sans | 16–18px, lh 1.6–1.7 |
| Eyebrow | Instrument Sans | 12px / 600, uppercase, ls 0.16em, olive #5E6B47 |
| Form/option labels | Instrument Sans | 13px / 600, uppercase, ls 0.08em |
| Marquee / quotes | Fraunces italic 300 | 22px marquee, 30–46px quotes |

Fonts: if Fraunces / Instrument Sans are not in Shopify's font library, self-host the WOFF2 files (SIL Open Font License) in `assets/`, `font-display: swap`, preload the heading font. Keep Dawn's font pickers available via a setting so a client theme can switch back to library fonts.

## Colours
| Token | Hex |
|---|---|
| Linen (page bg) | #F3EFE8 |
| Paper (surface) | #FBF9F5 |
| Ink (text, primary buttons) | #1C1A17 |
| Body text muted | #4D473F |
| Meta text | #6B645B |
| Faint (strikethrough, numbers) | #8C8478 |
| Line / dividers | #DDD5C9 |
| Pill / input border | #CFC6B8 |
| Image tile bg | #E9E2D6 |
| Stone tint section | #ECE6DC |
| Sand section | #E3DACB |
| Olive accent (eyebrows, details) | #5E6B47 |
| Sale | #A3361F |
| Success / in stock | #3F5A2E |
| Low stock | #9A3412 |
| Espresso dark section | #1C1A17 · text #EDE6DA / #C9C0B3 / #A89F92 · line #36322D |

Colour schemes: **scheme-1 Linen** (bg #F3EFE8, text #1C1A17, button #1C1A17, label #F3EFE8) · **scheme-2 Paper** (#FBF9F5) · **scheme-3 Espresso** (bg #1C1A17, text #EDE6DA, button #F3EFE8, label #1C1A17) · **scheme-4 Sand** (#E3DACB) · **scheme-5 Stone** (#ECE6DC).

## Shape, spacing, components
- Images/tiles radius **4px** (setting 0–20). Buttons **pill** (999px). Size buttons 4px. Badges pill, 11px/600 uppercase ls 0.08em.
- Primary button: ink bg, linen text, min-height 54px, padding 0 30px, 15px/500–600, optional arrow icon. Secondary = underlined text link (offset 6px). Quantity = pill outline.
- Container **1360px**, gutter 40px desktop / 20px mobile. Section padding **112px** desktop / 64px mobile. Card grid gap 20px, row gap 44px.
- Dividers: 1px #DDD5C9; accordions = thin top lines, +/− in light weight, 19px/500 questions.
- Newsletter input: borderless with 1.5px ink underline + round ink submit button.
- Product card: image 4:5 on tile bg, no border; name left + price right on one row; colour dots 12px + "3 colours"; badge top-left; hover shows "Quick add +" pill at the bottom of the image.
- Motion: subtle only (image hover scale 1.03, fade-up on scroll if enabled); none under reduced motion.

## Header
3-column grid: nav left (14px/500, 30px gap) · logo/wordmark centred (Fraunces 28px if text logo) · search + account icons (20px, stroke 1.5) + "Cart (n)" text right. On the homepage it overlays the hero (transparent, setting); on scroll it becomes sticky linen 90% + backdrop blur + 1px bottom line. Announcement bar: espresso, 12px uppercase ls 0.14em.

## Homepage order → theme sections
1. Announcement bar → `tk-announcement-bar`
2. Header (transparent over hero) → Dawn header (extended)
3. Full-bleed hero, gradient scrim, display heading bottom-left, slide counter → `tk-hero` (layout "full bleed", content style "gradient scrim")
4. Italic values marquee → `tk-multicolumn` layout "marquee" (brief: trust/benefits)
5. "Curated for everyday" bento (1 large + 2 stacked tiles) → `tk-promo-split` layout "bento" (brief: promotional split/campaign)
6. "New arrivals" with filter pills → `tk-featured-collection`
7. Editorial split "Fewer, better things." with numbered principles → `tk-image-with-text` (full-bleed split, numbered list blocks)
8. Espresso product spotlight → `tk-featured-products` layout "spotlight" (single product) — grid layout still available
9. Single large quote testimonial with arrows → `tk-testimonials` layout "single quote slider"
10. Logo/text strip → `tk-logo-strip` layout "inline row"
11. FAQ two-column → `tk-faq`
12. Newsletter centred on sand → `tk-newsletter`
13. Footer espresso with oversized wordmark → `tk-footer` (setting "Show large wordmark")
