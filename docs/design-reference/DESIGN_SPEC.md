# Takween Starter — Approved Design Reference

These HTML files are the **approved design mockups** for the theme. They are reference only — do NOT copy them into the theme or load them in Shopify.

## How to read the files
- Each file is a static mockup. All styling is written as **inline `style="…"` attributes** on the elements — read them for exact colours, sizes, spacing, radii and layout.
- Repeated content (product cards, testimonials, footer menus) is generated from the data in the `<script type="text/x-dc">` block at the bottom (`renderVals()`); the markup inside `<sc-for>` is one card's template.
- `{{accent}}` = `#1F4FD8`, `{{radius}}` = `12` (px, cards/images), `{{btnRadius}}` = `8` (px, buttons/inputs).
- Sizes are real CSS px. In Dawn, 1rem = 10px — convert accordingly.
- Image areas are drawn as tinted placeholders; in the theme they are real images via `tk-image`.

| File | Template / state |
|---|---|
| `home-desktop.html` | Homepage, desktop (all homepage sections in order) |
| `home-mobile.html` | Homepage, mobile 390px (top of page) |
| `product-desktop.html` | Product page, desktop (gallery, variant picker, stock, highlights, accordion, recommendations) |
| `product-mobile.html` | Product page mobile with sticky Add to cart bar |
| `collection-desktop.html` | Collection page with filter sidebar, chips, sort, grid, load more |
| `cart-drawer-mobile.html` | Cart drawer (free-delivery bar, line items, loading state, footer) |
| `style-guide.html` | Tokens: colours, type scale, buttons, badges, fields, radius, spacing |

## Core tokens
| Token | Value |
|---|---|
| Font | Manrope (headings 800, body 400–600) |
| Page background | #F6F5F2 (warm off-white) |
| Surface | #FFFFFF |
| Ink | #16181B |
| Muted text | #4A4F56 (body copy) / #5A5F66 (meta) |
| Border | #E3E1DC · input/pill border #C9C6BF · accordion divider #D6D3CD |
| Accent | #1F4FD8 (icon circle tint #ECEFFA) |
| Sale | #B42318 · Sold-out badge #3D4148 · Success/check #1F7A4D · Low stock #9A3412 |
| Dark section | #16181B with text #F6F5F2 / #C9CCD1 · Tint section #ECEAE5 |
| Radius | cards/images 12px · buttons/inputs 8px · badges 999px |
| Container | 1280px max, 24px gutters |
| Buttons | min-height 48px, padding 0 28px, 15px/700 |
| Eyebrow | 13px/700 uppercase, letter-spacing 0.1em, accent |
| Section H2 | 36px/800, letter-spacing -0.02em |

## Homepage section order (home-desktop.html)
1. Announcement bar (ink background, arrows)
2. Header (white, border-bottom, logo · nav · 3 icons + accent cart bubble)
3. Hero (contained, radius 12, content box bottom-left) — **approved deviation:** content box is frosted/semi-transparent (opacity ~78%, blur 12px)
4. Trust bar — 4 white bordered cards, icon in 40px tinted circle
5. Featured collection "Best sellers" — eyebrow + H2 left, "View all" right, 4 product cards
6. Image with text — white section with top/bottom borders, image 5:4 left, eyebrow/H2/text/check list/secondary button right
7. Promo split — 2 panels: dark ink panel + image panel, radius 12, 360px min-height
8. Testimonials — tint (#ECEAE5) section, centred heading, 3 white cards with stars
9. Logo strip — "As featured in", 6 logos
10. FAQ — heading column left (1/3), accordion right (2/3)
11. Newsletter — accent (#1F4FD8) rounded panel, heading left, email form right
12. Footer — ink, brand + 3 menu columns, bottom bar with copyright + payment icons
