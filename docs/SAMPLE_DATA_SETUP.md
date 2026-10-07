# Sample Data Setup Guide — Takween Shopify Starter Theme

**Phase:** 02  
**Purpose:** Set up all sample data in Shopify Admin so every theme feature can be tested.  
**Estimated time:** 60–90 minutes total.

> **Note:** `docs/sample-data/products.csv` has already been imported into the development store (74 variant rows across 12 products). Treat that CSV as the single source of truth — **do not re-import**.

> **Sample data only.** All product names, copy and images in this guide are placeholder content for development testing. Remove or replace before any client deployment.

---

## Step 1 — Create Metaobject Definitions

Go to: **Shopify Admin → Settings → Custom data → Metaobjects → Add definition**

### 1a. Metaobject: `specification`

| Field | Value |
|---|---|
| Name | Specification |
| API handle | `specification` *(auto-generated — confirm it matches)* |
| Storefront access | ✅ ON |

Add two fields:

| Field name | Field type | Required | Notes |
|---|---|---|---|
| Label | Single line text | ✅ Yes | e.g. "Material" |
| Value | Single line text | ✅ Yes | e.g. "100% Organic Cotton" |

Click **Save**.

### 1b. Metaobject: `faq_item`

| Field | Value |
|---|---|
| Name | FAQ Item |
| API handle | `faq_item` |
| Storefront access | ✅ ON |

Add two fields:

| Field name | Field type | Required | Notes |
|---|---|---|---|
| Question | Single line text | ✅ Yes | e.g. "How do I care for this?" |
| Answer | Rich text | ✅ Yes | Supports bold, lists, links |

Click **Save**.

---

## Step 2 — Create Product Metafield Definitions

Go to: **Shopify Admin → Settings → Custom data → Products → Add definition**

Create each of the following:

| # | Display name | Namespace & key | Type | Validation | Storefront access |
|---|---|---|---|---|---|
| 1 | Highlights | `custom.highlights` | List of: Single line text | — | ✅ ON |
| 2 | Care Instructions | `custom.care_instructions` | Rich text | — | ✅ ON |
| 3 | Specifications | `custom.specifications` | List of: Metaobject reference → **Specification** | — | ✅ ON |
| 4 | Product FAQs | `custom.faqs` | List of: Metaobject reference → **FAQ Item** | — | ✅ ON |
| 5 | Custom Badge | `custom.badge_text` | Single line text | Maximum: 20 characters | ✅ ON |

> For **Specifications** and **Product FAQs**: when choosing the type, select **Metaobject** → then pick the matching definition you created in Step 1.

---

## Step 3 — Products in Store (Single Source of Truth: `docs/sample-data/products.csv`)

The 12 products in the store and their exact options, prices, and variant breakdowns from `products.csv` (Vendor: **Takween Sample Co.**):

| Handle | Title | Type | Options | Price | Compare-at | Variants | Notes |
|---|---|---|---|---|---|---|---|
| `sample-organic-cotton-tee` | Sample Organic Cotton Tee | Apparel | Colour (Stone, Charcoal, Olive) × Size (XS, S, M, L, XL) | £24 | — | 15 | All 15 variants in stock (qty 15 each) |
| `sample-relaxed-overshirt` | Sample Relaxed Overshirt | Apparel | Colour (Stone, Charcoal, Olive) × Size (XS, S, M, L, XL) | £45 | £60 | 15 | On sale. Olive all sold out (0); Stone/XL sold out (0); Stone/M low stock (3); all Charcoal in stock (10) |
| `sample-merino-crew-jumper` | Sample Merino Crew Jumper | Apparel | Colour (Oat, Navy) × Size (XS, S, M, L, XL) | £68 | — | 10 | All in stock (qty 15 each) |
| `sample-everyday-hoodie` | Sample Everyday Hoodie | Apparel | Colour (Grey Marl, Charcoal) × Size (XS, S, M, L, XL) | £55 | — | 10 | All in stock (qty 15 each) |
| `sample-linen-shirt` | Sample Linen Shirt | Apparel | Colour (White, Sky) × Size (XS, S, M, L, XL) | £38 | £48 | 10 | On sale. All in stock (qty 15 each) |
| `sample-ceramic-mug-set` | Sample Ceramic Mug Set | Home & Living | Title (Default Title) | £28 | — | 1 | Single variant. Fully sold out (qty 0) |
| `sample-linen-cushion-cover` | Sample Linen Cushion Cover | Home & Living | Colour (Sand, Sage) | £26 | — | 2 | All in stock (qty 15 each) |
| `sample-scented-candle` | Sample Scented Candle | Home & Living | Title (Default Title) | £22 | — | 1 | Single variant. In stock (qty 15) |
| `sample-cotton-throw-blanket` | Sample Cotton Throw Blanket | Home & Living | Colour (Oat, Charcoal) | £65 | — | 2 | All in stock (qty 15 each) |
| `sample-canvas-tote-bag` | Sample Canvas Tote Bag | Accessories | Colour (Natural, Black, Olive) | £18 | £22 | 3 | On sale. All in stock (qty 15 each) |
| `sample-wool-beanie` | Sample Wool Beanie | Accessories | Colour (Charcoal, Rust, Oat) | £16 | — | 3 | All in stock (qty 15 each) |
| `sample-leather-card-holder` | Sample Leather Card Holder | Accessories | Colour (Tan, Black) | £30 | — | 2 | All in stock (qty 15 each) |

Total: **12 products, 74 variant rows**.

---

## Step 4 — Add Product Images

Images are provided in the `takween-starter-images` pack — follow its `IMAGE_GUIDE.md` for upload order, alt text and variant image assignment.

---

## Step 5 — Fill Metafields on 4 Products

Go to: **Products → [Product] → scroll to the "Metafields" section at the bottom of the page**

### Product 1: Sample Organic Cotton Tee (`sample-organic-cotton-tee`)

**Highlights** (add each as a separate list item):
1. 100% GOTS-certified organic cotton
2. Soft, breathable midweight jersey
3. Pre-shrunk for a consistent fit
4. Free standard UK delivery on orders over £50

**Care Instructions:**
```
Machine wash at 30°C. Wash with similar colours. Do not tumble dry. Warm iron on reverse.
```

**Specifications** — create 3 `specification` metaobject entries first (**Settings → Custom data → Metaobjects → Specification → Add entry**), then link:
- Entry 1: Label = `Material`, Value = `100% Organic Cotton`
- Entry 2: Label = `Weight`, Value = `180 gsm`
- Entry 3: Label = `Fit`, Value = `Relaxed fit`

**Product FAQs** — create 2 `faq_item` entries, then link:
- Entry 1: Question = `How should I wash this tee?`, Answer = `<p>Machine wash at 30°C with similar colours. Hang dry to maintain shape.</p>`
- Entry 2: Question = `Is the cotton certified organic?`, Answer = `<p>Yes, 100% GOTS-certified organic cotton. Sample product for theme development testing.</p>`

**Custom Badge:** `Best seller`

---

### Product 2: Sample Relaxed Overshirt (`sample-relaxed-overshirt`)

**Highlights:**
1. Versatile layering piece in midweight cotton-blend
2. Dual chest pockets with horn-effect buttons
3. Garment-dyed for subtle character

**Care Instructions:**
```
Machine wash cold at 30°C. Do not bleach. Cool iron if needed. Can be dry cleaned.
```

**Specifications:**
- Entry 1: Label = `Material`, Value = `100% Cotton Twill`
- Entry 2: Label = `Fit`, Value = `Relaxed boxy fit`
- Entry 3: Label = `Closure`, Value = `Button-through front`

**Custom Badge:** `Sale`

---

### Product 3: Sample Ceramic Mug Set (`sample-ceramic-mug-set`)

**Highlights:**
1. Set of two hand-thrown stoneware mugs
2. Tactile matte glaze exterior, gloss interior
3. Microwave and dishwasher safe

**Care Instructions:**
```
Dishwasher and microwave safe. Handle with care to prevent chipping.
```

**Specifications:**
- Entry 1: Label = `Material`, Value = `Stoneware ceramic`
- Entry 2: Label = `Capacity`, Value = `320 ml per mug`
- Entry 3: Label = `Quantity`, Value = `Set of 2`

**Custom Badge:** `Sold out`

---

### Product 4: Sample Canvas Tote Bag (`sample-canvas-tote-bag`)

**Highlights:**
1. Heavyweight 16oz natural cotton canvas
2. Reinforced dual handles for heavy loads
3. Internal slip pocket for keys and phone

**Care Instructions:**
```
Spot clean with a damp cloth and mild soap. Do not machine wash or tumble dry.
```

**Specifications:**
- Entry 1: Label = `Material`, Value = `16oz Cotton Canvas`
- Entry 2: Label = `Dimensions`, Value = `42cm W × 38cm H × 12cm D`
- Entry 3: Label = `Handle Drop`, Value = `26 cm`

**Custom Badge:** `Staff pick`

---

## Step 6 — Create Collections

Go to: **Shopify Admin → Products → Collections → Create collection**

### Manual collections (3)

| Collection title | Handle | Type | Products |
|---|---|---|---|
| Apparel | `apparel` | Manual | Organic Cotton Tee, Relaxed Overshirt, Merino Crew Jumper, Everyday Hoodie, Linen Shirt |
| Home & Living | `home-living` | Manual | Ceramic Mug Set, Linen Cushion Cover, Scented Candle, Cotton Throw Blanket |
| Accessories | `accessories` | Manual | Canvas Tote Bag, Wool Beanie, Leather Card Holder |

### Automated collection: Sale

| Field | Value |
|---|---|
| Title | Sale |
| Handle | `sale` |
| Type | Automated |
| Condition | **Compare at price is greater than price** *(if supported)* |
| Fallback | Tag **is equal to** `sale` (Sample Relaxed Overshirt, Sample Linen Shirt, Sample Canvas Tote Bag are tagged `sale` in the CSV) |

The 3 on-sale products from the CSV are: **Sample Relaxed Overshirt** (£45 was £60), **Sample Linen Shirt** (£38 was £48), **Sample Canvas Tote Bag** (£18 was £22).

---

## Step 7 — Create Navigation Menus

Go to: **Shopify Admin → Online Store → Navigation**

### Main Menu (`main-menu`)

| Item | Type | Link / Nested items |
|---|---|---|
| Shop | Parent dropdown | Apparel → `/collections/apparel`; Home & Living → `/collections/home-living`; Accessories → `/collections/accessories`; Sale → `/collections/sale` |
| About | Page | `/pages/about` |
| FAQ | Page | `/pages/faq` |
| Contact | Page | `/pages/contact` |

### Footer — Shop (`footer-shop`)

| Item | Link |
|---|---|
| Apparel | `/collections/apparel` |
| Home & Living | `/collections/home-living` |
| Accessories | `/collections/accessories` |
| Sale | `/collections/sale` |
| All Products | `/collections/all` |

### Footer — Help (`footer-help`)

| Item | Link |
|---|---|
| Shipping | `/pages/shipping` |
| Returns | `/pages/returns` |
| FAQ | `/pages/faq` |
| Contact | `/pages/contact` |

### Footer — Company (`footer-company`)

| Item | Link |
|---|---|
| About | `/pages/about` |
| Contact | `/pages/contact` |

---

## Step 8 — Create Pages

Go to: **Shopify Admin → Online Store → Pages → Add page**

| Page title | Handle | Template suffix | Content |
|---|---|---|---|
| About Us | `about` | `page.about` *(assign after Phase 12)* | Sample brand story placeholder — see below |
| Shipping Information | `shipping` | `page` (default) | Sample shipping policy placeholder |
| Returns & Refunds | `returns` | `page` (default) | Sample returns policy placeholder |
| Frequently Asked Questions | `faq` | `page.faq` *(assign after Phase 12)* | Leave blank — FAQ section pulls from metaobjects |
| Contact Us | `contact` | `page.contact` *(assign after Phase 12)* | Leave blank — contact section renders the form |

**Sample About content:**
```
This is a sample About page for the Takween Shopify Starter Theme. 
Replace with your client's brand story, team information and values.

[Sample mission statement placeholder]
[Sample team section placeholder]
[Sample values placeholder]
```

**Sample Shipping content:**
```
Standard delivery: 3–5 working days — £3.95 (Free over £50)
Express delivery: 1–2 working days — £6.95

[Replace with actual shipping policy before launch]
```

**Sample Returns content:**
```
We accept returns within 30 days of purchase. 
Items must be unused, unwashed and in original condition with tags attached.

[Replace with actual returns policy before launch]
```

---

## Step 9 — Install Search & Discovery App

1. Go to: **Shopify Admin → Apps → App store**
2. Search for **"Shopify Search & Discovery"** (published by Shopify).
3. Click **Install** (free).
4. Go to **Apps → Search & Discovery → Filters → Add filter**:

| Filter | Type |
|---|---|
| Availability | Product availability |
| Price | Price range |
| Product type | Product type |
| Size | Option: Size |
| Colour | Option: Colour |

5. Save and publish the filters.

---

## Step 10 — Verify Inventory Test Cases

In **Shopify Admin → Products → [Product] → Variants**, verify the stock levels and inventory policies match the single source of truth (`products.csv`):

| Test case | Product | Variant | Qty | Policy | Expected Theme Behaviour |
|---|---|---|---|---|---|
| **All in stock** (Colour × Size) | Sample Organic Cotton Tee | All 15 variants | 15 each | deny | Clean variant selectors, all selectable, in-stock CTA |
| **Colour all sold out** | Sample Relaxed Overshirt | Olive (all 5 sizes: XS, S, M, L, XL) | **0** | **deny** | Selecting Olive shows sold-out state on all sizes |
| **Specific variant sold out** | Sample Relaxed Overshirt | Stone / XL | **0** | **deny** | Selecting Stone keeps XS, S, L selectable; XL shows sold out |
| **Low stock alert** | Sample Relaxed Overshirt | Stone / M | **3** | **deny** | Triggers low-stock indicator on PDP |
| **Fully sold out product** | Sample Ceramic Mug Set | Default Title (single variant) | **0** | **deny** | Product card shows Sold Out badge; PDP disables Add to Cart |
| **Single variant in stock** | Sample Scented Candle | Default Title (single variant) | 15 | deny | No variant selector shown on PDP; direct Add to Cart |
| **Colour-only variants** | Sample Canvas Tote Bag | Natural, Black, Olive | 15 each | deny | Colour swatches only, no size selector |
| **On sale products** | Sample Relaxed Overshirt, Sample Linen Shirt, Sample Canvas Tote Bag | All variants | — | deny | Sale badge on card, strikethrough compare-at price |
