# Takween Shopify Starter Theme — Agent Rules & Workflow

All agents and contributors working in this repository must strictly follow these rules for every task and conversation.

---

## 1. Project Requirements & Context
- **Read `PROJECT_BRIEF.md` before starting any task.** Every change must serve a clear requirement defined in the brief.
- **Base theme is Shopify Dawn** (refer to `BASE_THEME.md`). Extend Dawn cleanly — do **not** rewrite or remove Dawn's existing JavaScript custom elements (e.g., `cart-drawer`, `variant-selects`, `product-form`, facet filters).
- **Online Store 2.0 architecture only:** JSON templates, sections with schemas, and theme blocks where useful.

---

## 2. Directory Structure & File Naming
- Maintain the official Shopify theme folder structure at the repository root:
  - `assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/` (and `blocks/` if present).
- **One additional top-level folder is permitted:** `docs/` — for documentation only. Shopify ignores any folder it does not recognise. Do **not** create any other non-standard top-level folders.
- Do **not** rename, move, or delete existing Dawn folders or files.
- Do **not** create non-standard top-level directories (e.g. no `src/`, `components/`, `css/`, `js/`).
- **All custom files must use the `tk-` prefix** inside standard theme folders (e.g., `sections/tk-hero.liquid`, `snippets/tk-product-card.liquid`, `assets/tk-base.css`).

---

## 3. Dependencies & Tooling
- **Zero build tools:** Do not introduce build tools, bundlers, compilers, or npm dependencies unless explicitly requested.
- **No external third-party apps, CDNs, or frameworks** for core functionality. Keep the theme lightweight and native.

---

## 4. Design System & Theming
- **Colors, typography, and spacing** must strictly reference theme settings and CSS custom properties (e.g., `var(--font-body-family)`, `var(--color-base-accent-1)`).
- **Never hard-code one-off values** (hex colors, arbitrary pixel paddings) in section styles or inline styles.

---

## 5. Sections & Theme Editor Compatibility
- Every new section must include a complete schema with sensible default settings.
- Every new section must provide at least one preset to enable immediate preview and use in the Theme Editor.
- Ensure all sections operate without errors inside the Theme Editor (`Shopify.designMode`).

---

## 6. Accessibility (a11y) & Performance
- **Accessibility:**
  - Semantic HTML structure and hierarchical headings (`<h1>` through `<h6>`).
  - Clear, visible keyboard `:focus-visible` focus states.
  - Descriptive `aria-label`, `aria-expanded`, and image `alt` attributes.
- **Performance:**
  - Responsive imagery using Shopify's `image_url` filter and `image_tag` helper with explicit `widths` and `sizes`.
  - Lazy-load images and media located below the fold (`loading="lazy"`).
  - Avoid unnecessary JavaScript execution; rely on native HTML/CSS and existing Dawn behaviors.

---

## 7. Git & Development Workflow
- **Before starting any task:** Run `git pull origin main` (Shopify Theme Editor or collaborators may have committed changes).
- **Pre-commit validation:** Run `shopify theme check` before every commit and fix any new errors introduced.
- **Commit convention:** Commit with clear semantic messages (e.g., `feat(sections): add tk-hero section`, `docs: ...`, `fix: ...`).
- **Pushing changes:** Run `git push origin main` after completing each task. Never force-push (`git push --force`).
- **Merge conflict safety:** If `config/settings_data.json` or any `templates/*.json` encounters a merge conflict, stop immediately and ask for user clarification — never blindly overwrite JSON data.

---

## 8. Definition of Done

The following checklist applies to **every future phase** before committing:

- [ ] Code follows the rules in this file (`tk-` prefix, tokens, no apps/CDNs, Dawn JS extended not replaced).
- [ ] Every new section has: `name`, `tag`, `class`, sensible `settings`, `color_scheme` + `padding_top`/`padding_bottom` settings, `presets`, and works when added/removed/reordered in the Theme Editor (including `shopify:section:load` / `shopify:block:select` events if it has JS).
- [ ] All user-facing strings use translation keys in `locales/en.default.json` (under the `"tk"` namespace) — no hard-coded English in Liquid markup. Schema labels use `locales/en.default.schema.json`.
- [ ] Images use `image_url` + `image_tag` with `widths`, `sizes`, explicit `width`/`height`; `loading: 'lazy'` except above-the-fold (hero when first section uses `fetchpriority: 'high'`).
- [ ] Section CSS lives in `assets/tk-<name>.css` loaded with `{{ 'tk-<name>.css' | asset_url | stylesheet_tag }}` inside the section file. Section JS lives in `assets/tk-<name>.js` loaded with `defer` inside the section file.
- [ ] Accessibility: semantic headings, visible labels, `:focus-visible` outlines, keyboard support, `aria-*` attributes where needed, `prefers-reduced-motion` respected for all animations.
- [ ] `shopify theme check` shows **no new errors** introduced by this phase's changes. Pre-existing Dawn warnings are documented in `docs/BUILD_NOTES.md §12` and accepted.
- [ ] `docs/BUILD_NOTES.md` updated for every new/modified file (sections §4–6, JS §8, Dawn modifications §9).
- [ ] Commit with a semantic message and push to `main`.
- [ ] Final report lists: files created/modified, how to test in the Theme Editor, and any 👤 Shopify Admin tasks for the user.
