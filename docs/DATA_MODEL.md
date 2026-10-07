# Data Model — Takween Shopify Starter Theme

**Phase:** 02  
**Namespace:** `custom`  
**Last updated:** 2026-10-07

---

## Why metafields and metaobjects?

Product-specific structured data — such as care instructions, technical specifications, and FAQs — varies from product to product and cannot be hard-coded into theme files. Storing this content in Shopify metafields and metaobjects means content editors can manage it directly in the Shopify Admin (or via a connected PIM) without touching code, the data is type-safe and validated at the platform level, and the Liquid storefront can access it with a consistent API (`product.metafields.custom.*`). Metaobjects go one step further: they define a reusable structured type (e.g. a `specification` entry with a label and a value) that can be referenced by multiple products, edited in a centralised list, and queried with the Storefront API — making the theme genuinely data-driven rather than content-in-HTML.

---

## Metaobject Definitions

### 1. `specification`

| Field | Detail |
|---|---|
| API handle | `specification` |
| Display name | Specification |
| Storefront access | **ON** (required for Liquid `metaobject.fields` access) |

**Fields:**

| Field name | Field key | Type | Required | Validation | Example |
|---|---|---|---|---|---|
| Label | `label` | Single line text | ✅ Yes | — | `"Material"` |
| Value | `value` | Single line text | ✅ Yes | — | `"100% Organic Cotton"` |

**Used in:** `snippets/tk-product-card.liquid` (indirectly), `sections/main-product.liquid` → block `tk_details_accordion` (Specifications tab)

**Example Liquid access:**
```liquid
{%- for spec_ref in product.metafields.custom.specifications.value -%}
  {%- assign spec = spec_ref.value -%}
  <dt>{{ spec.label }}</dt>
  <dd>{{ spec.value }}</dd>
{%- endfor -%}
```

---

### 2. `faq_item`

| Field | Detail |
|---|---|
| API handle | `faq_item` |
| Display name | FAQ Item |
| Storefront access | **ON** |

**Fields:**

| Field name | Field key | Type | Required | Validation | Example |
|---|---|---|---|---|---|
| Question | `question` | Single line text | ✅ Yes | — | `"How should I wash this tee?"` |
| Answer | `answer` | Rich text | ✅ Yes | — | `<p>Machine wash at 30°C with similar colours.</p>` |

**Used in:**
- `sections/tk-faq.liquid` → metaobject source mode (reads a `metaobject_list` setting of type `faq_item`)
- `sections/main-product.liquid` → block `tk_details_accordion` (FAQs tab, reads `product.metafields.custom.faqs`)

**Example Liquid access:**
```liquid
{%- for faq_ref in product.metafields.custom.faqs.value -%}
  {%- assign faq = faq_ref.value -%}
  <details>
    <summary>{{ faq.fields.question.value }}</summary>
    <div>{{ faq.fields.answer.value }}</div>
  </details>
{%- endfor -%}
```

---

## Product Metafield Definitions

### 3. `custom.highlights`

| Field | Detail |
|---|---|
| Namespace & key | `custom.highlights` |
| Display name | Highlights |
| Type | **List of: Single line text** |
| Required | No |
| Validation | 3–5 entries recommended (no hard limit enforced) |
| Storefront access | **ON** |
| Used in | `sections/main-product.liquid` → block `tk_highlights` |
| Hidden when | `product.metafields.custom.highlights` is blank |

**Example value (Sample Organic Cotton Tee):**
```
- 100% GOTS-certified organic cotton
- Soft, breathable midweight jersey
- Pre-shrunk for a consistent fit
- Free standard UK delivery on orders over £50
```

**Example Liquid access:**
```liquid
{%- assign highlights = product.metafields.custom.highlights.value -%}
{%- if highlights != blank -%}
  <ul class="tk-highlights">
    {%- for point in highlights -%}
      <li>{% render 'tk-icon', icon: 'check', size: 16 %} {{ point }}</li>
    {%- endfor -%}
  </ul>
{%- endif -%}
```

---

### 4. `custom.care_instructions`

| Field | Detail |
|---|---|
| Namespace & key | `custom.care_instructions` |
| Display name | Care Instructions |
| Type | **Rich text** |
| Required | No |
| Storefront access | **ON** |
| Used in | `sections/main-product.liquid` → block `tk_details_accordion` (Care tab) |
| Hidden when | `product.metafields.custom.care_instructions` is blank |

**Example value (Sample Organic Cotton Tee):**
```html
<p>Machine wash at 30°C. Wash with similar colours. Do not tumble dry. Warm iron on reverse.</p>
```

---

### 5. `custom.specifications`

| Field | Detail |
|---|---|
| Namespace & key | `custom.specifications` |
| Display name | Specifications |
| Type | **List of: Metaobject reference → `specification`** |
| Required | No |
| Storefront access | **ON** |
| Used in | `sections/main-product.liquid` → block `tk_details_accordion` (Specifications tab) |
| Hidden when | List is empty |

**Example values for Sample Organic Cotton Tee (`specification` metaobject entries):**
| Label | Value |
|---|---|
| Material | 100% Organic Cotton |
| Weight | 180 gsm |
| Fit | Relaxed fit |

---

### 6. `custom.faqs`

| Field | Detail |
|---|---|
| Namespace & key | `custom.faqs` |
| Display name | Product FAQs |
| Type | **List of: Metaobject reference → `faq_item`** |
| Required | No |
| Storefront access | **ON** |
| Used in | `sections/main-product.liquid` → block `tk_details_accordion` (FAQs tab); optionally surfaced in `sections/tk-faq.liquid` on the product page template |
| Hidden when | List is empty |

**Example values for Sample Organic Cotton Tee (`faq_item` metaobject entries):**
- **Q:** How should I wash this tee?  
  **A:** Machine wash at 30°C with similar colours. Hang dry to maintain shape.
- **Q:** Is the cotton certified organic?  
  **A:** Yes, 100% GOTS-certified organic cotton. Sample product for theme development testing.

---

### 7. `custom.badge_text`

| Field | Detail |
|---|---|
| Namespace & key | `custom.badge_text` |
| Display name | Custom Badge |
| Type | **Single line text** |
| Required | No |
| Validation | Maximum 20 characters (set this validation in Shopify Admin when creating the definition) |
| Storefront access | **ON** |
| Used in | `snippets/tk-badge.liquid`, `snippets/tk-product-card.liquid` |
| Shown when | Global setting "Show custom badge" is ON AND this metafield is not blank |

**Example values across imported products:**
- `sample-organic-cotton-tee`: `"Best seller"`
- `sample-relaxed-overshirt`: `"Sale"`
- `sample-ceramic-mug-set`: `"Sold out"`
- `sample-canvas-tote-bag`: `"Staff pick"`

---

## Summary Table

| # | Type | API handle / namespace.key | Liquid access | Used in |
|---|---|---|---|---|
| 1 | Metaobject def | `specification` | `metaobject.fields.label.value` | `tk_details_accordion` block |
| 2 | Metaobject def | `faq_item` | `metaobject.fields.question.value` | `tk-faq`, `tk_details_accordion` |
| 3 | Product metafield | `custom.highlights` | `product.metafields.custom.highlights.value` | `tk_highlights` block |
| 4 | Product metafield | `custom.care_instructions` | `product.metafields.custom.care_instructions.value` | `tk_details_accordion` |
| 5 | Product metafield | `custom.specifications` | `product.metafields.custom.specifications.value` | `tk_details_accordion` |
| 6 | Product metafield | `custom.faqs` | `product.metafields.custom.faqs.value` | `tk-faq`, `tk_details_accordion` |
| 7 | Product metafield | `custom.badge_text` | `product.metafields.custom.badge_text.value` | `tk-badge`, `tk-product-card` |
