# Sample Data Setup Guide — Takween Shopify Starter Theme

**Phase:** 02  
**Purpose:** Set up all sample data in Shopify Admin so every theme feature can be tested.  
**Estimated time:** 60–90 minutes total.

> **⚠️ CSV import note:** If the product import fails with a column header error, go to **Products → Import → Download sample CSV**, compare column headers with `docs/sample-data/products.csv`, and align them. Shopify's column names are case-sensitive.

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
| Value | Single line text | ✅ Yes | e.g. "100% Cotton" |

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

## Step 3 — Import Products CSV

1. Go to: **Shopify Admin → Products → Import**
2. Click **Add file** and upload `docs/sample-data/products.csv`.
3. Leave **Overwrite existing products** unchecked (first import).
4. Click **Upload and preview**, then **Import products**.
5. Wait for the import email confirmation (usually < 2 minutes).

After import, verify:
- 12 products appear in the Products list.
- Variants are created correctly (e.g. "Sample Classic Tee" has Size + Colour options).
- Status shows **Active** for all products.

---

## Step 4 — Add Product Images

Shopify does not allow images in the CSV for external URLs (they time out in development stores). Add images manually:

Go to each product: **Products → [Product name] → Media → Add media**

Suggested free image sources:
- **Unsplash** (https://unsplash.com) — search for the product category, download, upload.
- Use consistent image sizes: minimum 1200 × 1200px, square crop preferred for cards.

**Alt text to set on each image** (edit after upload — click the image → "Add alt text"):

| Product | Alt text |
|---|---|
| Sample Classic Tee | Sample classic crew-neck t-shirt in black, styled on a plain background |
| Sample Slim Chinos | Sample slim-fit chino trousers in khaki colour on a plain background |
| Sample Relaxed Hoodie | Sample relaxed-fit pullover hoodie in grey on a plain background |
| Sample Oxford Shirt | Sample classic oxford shirt in white, neatly folded |
| Sample Jogger Pants | Sample jogger trousers in black with elasticated waistband |
| Sample Ceramic Mug | Sample white ceramic mug on a wooden surface |
| Sample Linen Cushion Cover | Sample natural linen cushion cover in ivory on a sofa |
| Sample Wooden Serving Board | Sample rectangular wooden serving board with handle |
| Sample Scented Candle | Sample scented candle in a glass jar with a cotton wick |
| Sample Canvas Tote Bag | Sample canvas tote bag in black with short handles |
| Sample Leather Card Holder | Sample slim leather card holder in black |
| Sample Knit Beanie | Sample ribbed knit beanie hat in charcoal |

**Tip:** Upload 2–3 images per product if possible (gallery, flat-lay, detail). The second image is used for the hover-swap on product cards.

---

## Step 5 — Fill Metafields on 4 Products

Go to: **Products → [Product] → scroll to "Metafields" section at the bottom of the page**

### Product: Sample Classic Tee

**Highlights** (add each as a separate list item):
1. Ethically sourced 100% organic cotton
2. Pre-shrunk for a consistent fit
3. Free UK delivery on orders over £50
4. Easy 30-day returns

**Care Instructions:**
```
Machine wash at 30°C. Do not tumble dry. Iron on low heat if needed. Do not dry clean.
```

**Specifications** (create 3 `specification` metaobject entries first via Settings → Custom data → Metaobjects → Specification → Add entry):
- Entry 1: Label = `Material`, Value = `100% Organic Cotton`
- Entry 2: Label = `Weight`, Value = `180 gsm`
- Entry 3: Label = `Fit`, Value = `Regular fit`
Then link them to this product's `Specifications` metafield.

**Product FAQs** (create 2 `faq_item` entries first):
- Entry 1: Question = `Will this shrink after washing?`, Answer = `<p>This tee has been pre-shrunk so it retains its size after washing at 30°C.</p>`
- Entry 2: Question = `Is the cotton certified?`, Answer = `<p>Yes — all cotton is certified organic under the Global Organic Textile Standard (GOTS). Sample certification only.</p>`

**Custom Badge:** `Best seller`

---

### Product: Sample Oxford Shirt

**Highlights:**
1. Classic Oxford weave for a smart-casual look
2. Button-down collar — no ironing required
3. Available in White and Blue

**Care Instructions:**
```
Machine wash at 40°C. Iron on medium heat. Do not bleach.
```

**Custom Badge:** `Sale`

---

### Product: Sample Ceramic Mug

**Highlights:**
1. Microwave and dishwasher safe
2. Generous 350ml capacity
3. Heavyweight ceramic for heat retention

**Specifications:**
- Label = `Capacity`, Value = `350 ml`
- Label = `Material`, Value = `Ceramic`
- Label = `Dimensions`, Value = `9 cm H × 8 cm W`

**Custom Badge:** `New`

---

### Product: Sample Scented Candle

**Highlights:**
1. 40-hour burn time
2. Natural soy wax blend
3. Phthalate-free fragrance oils

**Care Instructions:**
```
Trim wick to 5mm before each use. Never leave burning unattended. Keep away from draughts. 
Stop burning when 1cm of wax remains.
```

**Specifications:**
- Label = `Burn time`, Value = `40 hours`
- Label = `Wax type`, Value = `Natural soy blend`
- Label = `Net weight`, Value = `200 g`

---

## Step 6 — Create Collections

Go to: **Shopify Admin → Products → Collections → Create collection**

### Manual collections (3)

| Collection title | Handle | Type | Add products |
|---|---|---|---|
| Apparel | `apparel` | Manual | Sample Classic Tee, Sample Slim Chinos, Sample Relaxed Hoodie, Sample Oxford Shirt, Sample Jogger Pants |
| Home & Living | `home-living` | Manual | Sample Ceramic Mug, Sample Linen Cushion Cover, Sample Wooden Serving Board, Sample Scented Candle |
| Accessories | `accessories` | Manual | Sample Canvas Tote Bag, Sample Leather Card Holder, Sample Knit Beanie |

For each: add a short description (e.g. "Sample apparel range for theme development testing.") and a collection image from Unsplash.

### Automated collection: Sale

| Field | Value |
|---|---|
| Title | Sale |
| Handle | `sale` |
| Type | Automated |
| Condition | **Compare at price is greater than price** *(if this condition is available on your plan)* |
| Fallback condition | If the compare-at condition is unavailable: use tag **is equal to** `sale` — then manually tag the 4 sale products in Step 3. |

The 4 sale products (Oxford Shirt, Linen Cushion Cover, Wooden Serving Board, Canvas Tote Bag) all have compare-at prices set in the CSV.

---

## Step 7 — Create Navigation Menus

Go to: **Shopify Admin → Online Store → Navigation**

### Main Menu (`main-menu`)

| Item | Type | Link / Nested items |
|---|---|---|
| Shop | No link (parent) | Dropdown: Apparel → `/collections/apparel`; Home & Living → `/collections/home-living`; Accessories → `/collections/accessories`; Sale → `/collections/sale` |
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

Create the following pages with the sample content below:

### About (`/pages/about`)
- **Title:** About Us
- **Template suffix:** `page.about` *(assign after Phase 12)*
- **Content:**
  ```
  This is a sample About page for the Takween Shopify Starter Theme. 
  Replace this content with your client's brand story, team information and values.
  
  [Sample mission statement placeholder]
  [Sample team section placeholder]
  [Sample values placeholder]
  ```

### Shipping (`/pages/shipping`)
- **Title:** Shipping Information
- **Template suffix:** `page` (default)
- **Content:**
  ```
  This is a sample Shipping page for development testing.
  
  Standard delivery: 3–5 working days — £[X]
  Express delivery: 1–2 working days — £[X]
  Free delivery on orders over £[X]
  
  [Replace with actual shipping policy before launch]
  ```

### Returns (`/pages/returns`)
- **Title:** Returns & Refunds
- **Template suffix:** `page` (default)
- **Content:**
  ```
  This is a sample Returns page for development testing.
  
  We accept returns within 30 days of purchase. Items must be unused and in original packaging.
  
  [Replace with actual returns policy before launch]
  ```

### FAQ (`/pages/faq`)
- **Title:** Frequently Asked Questions
- **Template suffix:** `page.faq` *(assign after Phase 12)*
- **Content:** *(leave blank — the FAQ section pulls from metaobjects)*

### Contact (`/pages/contact`)
- **Title:** Contact Us
- **Template suffix:** `page.contact` *(assign after Phase 12)*
- **Content:** *(leave blank — the contact section renders the form)*

---

## Step 9 — Install Search & Discovery App

1. Go to: **Shopify Admin → Apps → App store**
2. Search for **"Shopify Search & Discovery"** (published by Shopify).
3. Click **Install** (it's free).
4. After installation, go to **Apps → Search & Discovery → Filters → Add filter**:

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

After import, go to each product and confirm the following via **Products → [Product] → Variants**:

| Test case | Product | Variant | Qty | Inventory policy |
|---|---|---|---|---|
| All in stock | Sample Classic Tee | All variants | 10 each | Don't allow (deny) |
| ONE variant sold out | Sample Slim Chinos | Size 32 / Black | **0** | **Don't allow (deny)** |
| Fully sold out | Sample Relaxed Hoodie | All variants | **0** | **Don't allow (deny)** |
| Low stock | Sample Jogger Pants | S/Black and M/Black | **3** | Don't allow (deny) |
| On sale | Sample Oxford Shirt | All variants | — | — (compare-at price set) |
| On sale | Sample Linen Cushion Cover | All variants | — | — |
| On sale | Sample Wooden Serving Board | Default | — | — |
| On sale | Sample Canvas Tote Bag | All variants | — | — |
| Single-variant | Sample Ceramic Mug | Default Title | 25 | Don't allow |
| Single-variant | Sample Wooden Serving Board | Default Title | 15 | Don't allow |

> **Note:** After importing the CSV, verify in the Admin that inventory quantities imported correctly. If they did not, edit them manually using the table above.
