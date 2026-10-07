# QA Checklist — Takween Shopify Starter Theme

**From:** Brief §10 (Responsive & Front-End Quality), §12 (Functional Testing), §14 (Developer Self-QA)  
**Widths tested:** 360 / 390 / 768 / 1024 / 1280 / 1440 (px)  
**Result key:** ✅ Pass | ❌ Fail | ⚠️ Needs manual test | — Untested

---

## A — Navigation & Menus

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| A01 | Navigation | Main menu links navigate correctly | | | | | | | | |
| A02 | Navigation | Desktop dropdown opens and closes on hover/click | | | | | | | | |
| A03 | Navigation | Mobile hamburger opens full-height drawer | | | | | | | | |
| A04 | Navigation | Mobile drawer close button works and focus returns to trigger | | | | | | | | |
| A05 | Navigation | Mobile drawer: all menu links reachable by touch | | | | | | | | |
| A06 | Navigation | Announcement bar shows correctly; dismisses and stays dismissed (sessionStorage) | | | | | | | | |
| A07 | Navigation | Sticky header appears on scroll-up; logo dimensions reserved (no layout shift) | | | | | | | | |
| A08 | Navigation | Predictive search input opens results; keyboard arrow navigation works | | | | | | | | |
| A09 | Navigation | Footer menus expand as accordions on mobile | | | | | | | | |
| A10 | Navigation | All footer links navigate correctly | | | | | | | | |

---

## B — Product Variant Selection

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| B01 | Variants | Size pills: selecting a size updates URL, price and gallery | | | | | | | | |
| B02 | Variants | Colour swatches: selecting a colour updates image | | | | | | | | |
| B03 | Variants | Unavailable combination: crossed/dimmed, "Unavailable" announced | | | | | | | | |
| B04 | Variants | Sold-out variant: Add to Cart disabled, "Sold out" shown | | | | | | | | |
| B05 | Variants | Single-variant product shows no variant picker | | | | | | | | |
| B06 | Variants | Variant selection keyboard-only (Tab + Enter/Space) | | | | | | | | |
| B07 | Variants | Colour swatch preview on product card (max 5 + "+N") | | | | | | | | |

---

## C — Add to Cart & Cart Feedback

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| C01 | Add to cart | Add in-stock item: cart drawer opens with item | | | | | | | | |
| C02 | Add to cart | Button shows loading state during request | | | | | | | | |
| C03 | Add to cart | Error (e.g. stock exceeded): inline error shown with `role="alert"` | | | | | | | | |
| C04 | Add to cart | Quick-add from product card opens updated cart drawer | | | | | | | | |
| C05 | Cart | Quantity +/- buttons update line total without page reload | | | | | | | | |
| C06 | Cart | Type quantity above stock: error shown inline | | | | | | | | |
| C07 | Cart | Remove item: live region announces "X removed", cart updates | | | | | | | | |
| C08 | Cart | Cart persists on page reload | | | | | | | | |
| C09 | Cart | Cart persists when navigating between pages | | | | | | | | |
| C10 | Cart | Empty cart state: icon + message + CTA shown in drawer and on cart page | | | | | | | | |
| C11 | Cart | Checkout button reaches Shopify checkout | | | | | | | | |
| C12 | Cart | Free-shipping bar updates correctly as items added | | | | | | | | |
| C13 | Cart | Sticky ATC (mobile): appears when main ATC scrolled out of view | | | | | | | | |
| C14 | Cart | Sticky ATC does not cover cart drawer or other modals | | | | | | | | |
| C15 | Cart | Cart drawer focus trap + Escape closes; focus returns to trigger | | | | | | | | |

---

## D — Collection Sorting & Filtering

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| D01 | Collection | Product grid balanced (equal card heights, no orphans) | | | | | | | | |
| D02 | Collection | Sort dropdown changes grid order without page reload | | | | | | | | |
| D03 | Collection | Availability filter narrows grid | | | | | | | | |
| D04 | Collection | Price range filter usable by touch | | | | | | | | |
| D05 | Collection | 2+ filters combined work correctly | | | | | | | | |
| D06 | Collection | Active filter chips shown above grid; individual chip removal works | | | | | | | | |
| D07 | Collection | "Clear all filters" removes all chips and resets grid | | | | | | | | |
| D08 | Collection | Mobile filter drawer opens; sticky footer "Show X results" button visible | | | | | | | | |
| D09 | Collection | Mobile filter drawer: focus trap + Escape closes | | | | | | | | |
| D10 | Collection | Filter result count announced with `aria-live` | | | | | | | | |
| D11 | Collection | Load more button appends cards; focus moves to first new card | | | | | | | | |
| D12 | Collection | Without JS: "Load more" link navigates to `?page=N` | | | | | | | | |
| D13 | Collection | Empty collection: message + "All products" button shown | | | | | | | | |
| D14 | Collection | Filter with no results: "Clear all filters" button shown | | | | | | | | |

---

## E — Search

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| E01 | Search | Search with results: products shown as tk cards, pages/articles listed separately | | | | | | | | |
| E02 | Search | Results count announced with `aria-live` | | | | | | | | |
| E03 | Search | No-results state: friendly message, spelling tips, popular collections shown | | | | | | | | |
| E04 | Search | Empty query (`/search` with no `q`): form + popular collections shown | | | | | | | | |
| E05 | Search | Query matching a page: page appears in pages list | | | | | | | | |
| E06 | Search | Predictive search: product rows show image + title + price | | | | | | | | |
| E07 | Search | Predictive search: keyboard arrow navigation works | | | | | | | | |

---

## F — Contact Form

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| F01 | Contact | Submit valid form: success message shown with `role="status"` | | | | | | | | |
| F02 | Contact | Submit empty required fields: inline errors linked with `aria-describedby` | | | | | | | | |
| F03 | Contact | Invalid email format shows error | | | | | | | | |
| F04 | Contact | Submission arrives at store notification email | | | | | | | | |

---

## G — Links, Buttons, Forms & Interactive States

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| G01 | Links | All CTA links in all sections navigate to correct URLs | | | | | | | | |
| G02 | Links | No `href=""` empty links rendered | | | | | | | | |
| G03 | Buttons | All buttons show `:focus-visible` outline on keyboard focus | | | | | | | | |
| G04 | Buttons | Touch targets ≥ 44×44px on mobile for all interactive elements | | | | | | | | |
| G05 | Forms | Newsletter form submits; customer appears in Admin with tag `newsletter` | | | | | | | | |
| G06 | Forms | Newsletter form: `role="status"` success message announced | | | | | | | | |
| G07 | Accordions | FAQ accordion opens/closes; keyboard Tab + Enter works | | | | | | | | |
| G08 | Accordions | Single-open mode: second item closes first | | | | | | | | |
| G09 | Motion | Marquee (logo strip) pauses on hover/focus | | | | | | | | |
| G10 | Motion | Reveals / marquee / accordion animation disabled under `prefers-reduced-motion` | | | | | | | | |

---

## H — Theme Editor

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| H01 | Editor | All `tk-` sections can be added via the Theme Editor "Add section" panel | | | | | | | | |
| H02 | Editor | Sections can be reordered without errors | | | | | | | | |
| H03 | Editor | Sections can be removed without breaking the page | | | | | | | | |
| H04 | Editor | Changing any setting updates the preview without a full reload | | | | | | | | |
| H05 | Editor | All block types can be added, reordered and removed | | | | | | | | |
| H06 | Editor | Hero section: colour scheme, height and content position update correctly | | | | | | | | |
| H07 | Editor | Product card: image ratio setting changes card appearance | | | | | | | | |
| H08 | Editor | Footer blocks: menu, business info, newsletter visible and editable | | | | | | | | |
| H09 | Editor | Announcement bar: rotation, dismiss, block highlight works in editor | | | | | | | | |

---

## I — Sold-out / Unavailable Product State

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| I01 | Stock | Product card shows "Sold out" badge when product fully sold out | | | | | | | | |
| I02 | Stock | Product page: sold-out variant disables Add to Cart + shows "Sold out" label | | | | | | | | |
| I03 | Stock | Unavailable combination: "Unavailable" label and dimmed variant option | | | | | | | | |
| I04 | Stock | Low stock indicator: "Only X left" shown when ≤ threshold | | | | | | | | |
| I05 | Stock | Low stock does NOT appear on product cards | | | | | | | | |
| I06 | Stock | Sticky ATC disabled when variant sold out | | | | | | | | |

---

## J — Responsive Layout & Visual Quality

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| J01 | Responsive | No horizontal overflow on any template | | | | | | | | |
| J02 | Responsive | Product card title clamps to 2 lines; cards equal height in grid | | | | | | | | |
| J03 | Responsive | Hero image crops correctly at all widths; no white bars | | | | | | | | |
| J04 | Responsive | Navigation does not overlap content on tablet (768px) | | | | | | | | |
| J05 | Responsive | Image-with-text stacks correctly on mobile | | | | | | | | |
| J06 | Responsive | Multicolumn collapses to 1–2 cols on mobile without overflow | | | | | | | | |
| J07 | Responsive | Footer columns collapse to accordions on mobile | | | | | | | | |
| J08 | Responsive | Spacing and typography feel intentional at every width (not just resized desktop) | | | | | | | | |
| J09 | Responsive | No console errors from `tk-` code on any template | | | | | | | | |
| J10 | Responsive | No Cumulative Layout Shift visible on home, collection or product page load | | | | | | | | |

---

## K — Accessibility

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| K01 | a11y | One `<h1>` per template; logical heading order | | | | | | | | |
| K02 | a11y | Tab order follows visual order on all templates | | | | | | | | |
| K03 | a11y | Icon-only buttons have `aria-label` | | | | | | | | |
| K04 | a11y | Images have meaningful alt text; decorative images have `alt=""` | | | | | | | | |
| K05 | a11y | Default colour schemes pass 4.5:1 contrast for body text | | | | | | | | |
| K06 | a11y | Cart updates announced via live region | | | | | | | | |

---

## L — Performance

| ID | Area | Test | 360 | 390 | 768 | 1024 | 1280 | 1440 | Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| L01 | Perf | Lighthouse mobile score ≥ 70 on homepage | | | | | | | | (👤 manual Lighthouse run) |
| L02 | Perf | Lighthouse mobile score ≥ 70 on collection page | | | | | | | | (👤 manual Lighthouse run) |
| L03 | Perf | Lighthouse mobile score ≥ 70 on product page | | | | | | | | (👤 manual Lighthouse run) |
| L04 | Perf | Hero image loads eager with `fetchpriority="high"` when first section | | | | | | | | |
| L05 | Perf | Below-fold images have `loading="lazy"` | | | | | | | | |
| L06 | Perf | No `console.log` in any `tk-*.js` file | | | | | | | | |
| L07 | Perf | `shopify theme check` — 0 errors, warnings justified | | | | | | | | |
