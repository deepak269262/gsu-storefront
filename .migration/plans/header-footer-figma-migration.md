I'll inspect the header and footer structures in Figma and check the existing header/footer blocks in the project.Let me drill into the Header and Footer Container internals to map the actual structure.Let me get the detail of the nav top bar (logo/search/icons) and the main navigation links, plus the footer columns.Now let me capture the actual link/text content and check the existing project header/footer blocks for reuse.Nav link instances share a master so text overrides don't show. Let me get screenshots of the header and footer plus the footer content for actual labels.I have full visual detail. Let me quickly check how the existing header/footer blocks source their content (nav fragment paths) to plan the content model correctly.I have full structure and visuals for both header and footer, plus the existing block implementations. Let me confirm a couple of scope decisions before finalizing.# Girl Scouts Header & Footer Migration Plan

## Source
- **Figma file:** `9LoLlN38Ej35qSVRcokDUu`
- **Header_Container:** node `5168:208511` (1280×179)
- **Footer:** node `5168:208610` (1280×658)
- **Target blocks:** `blocks/header/` and `blocks/footer/` (existing fragment-based commerce blocks)

## Decisions (confirmed)
- **Approach: Extend structure + restyle** — keep the existing header/footer block JS + fragment loading, add the new GS-specific elements, then apply GS-branded CSS.
- **Commerce: Keep wiring** — preserve search, wishlist, cart, and account dropin integrations; rebrand and add GS chrome around them.
- Uses the `--gs-*` design tokens already migrated into `styles/styles.css`.

---

## Header — structure from Figma (`5168:208511`)
The header is 179px tall and has three stacked rows:

### Row 1 — Offer / Promo Bar (`Offer - Code`, 52px, star-green `#d5f267` bg)
- Sparkle icon + promo text: *"Free Gift with purchase of a Uniform – Use Code: FREEPURPLEBAG"*
- **REDEEM NOW ›** link (teal/green)
- Right side: **Terms & Conditions** link + dismiss **✕** button

### Row 2 — Main Nav Bar (`Frame 2134283502`, 80px, white bg)
- **Left:** audience toggle pill — **For Everyone** (active, forest-green) / **For Leaders** (`Toggle`, node `2697:345656`)
- **Center:** girl scouts logo + trefoil mark (`Logo`, node `2697:345669`)
- **Right (`Frame 2134283506`):** Search Products input with magnifier, **Wishlist** (heart), **Cart** (with count badge "2"), **My Account** (person) icons

### Row 3 — Category Nav (`Main_navigation` → `Frame 25194`, 47px, off-white bg)
Nav links (9): **New · Shop by Grade · Uniforms · Apparel & Accessories · Badges, Patches & Awards · Gifts · Toys & Outdoors · Council · Sale**
- Right-aligned **Store Locator** pill (`Round Tabs`, star icon, khaki-tint bg `#d5ca9f4d`)

### Note: `Frame 25202 / slider` (`5168:208513`)
- A 56px slider strip sits just below in the homepage frame — appears to be a category quick-scroll. Treat as homepage content, **not** part of the header block. Confirm during build.

---

## Footer — structure from Figma (`5168:208610`)
Forest-green (`#005640`) background, 658px tall, two zones:

### Main container (`Container`, node `2697:348748`)
- **Logo column:** girl scouts white logo
- **Link columns (`Frame 25213`):**
  - **Quick Links:** My Account · Quick Order · Store Locator · Cookie Dough Program Credits · View our Digital Catalog · New to Girl Scouts?
  - **Help Center:** Contact us · Return & Refund Policy · Where to place badges & insignia · FAQ · Promotional Exclusions · Size Guide
  - **About Us:** Girl Scouts of the USA homepage · Donate · Lifetime Membership
  - **Local Resources:** Find your Nearest Store · Find your local council · Find Cookies
  - **Follow Us On:** social icons — Facebook, X, YouTube, Instagram, LinkedIn, WhatsApp
- **Right rail (`Frame 2134284634`):**
  - Newsletter card with image: *"Be the first to know what's new!"* + body copy + **SUBSCRIBE NOW ›**
  - Wholesale partners box: *"Hello, Wholesale Partners — Login Here for your personalized Experience"*

### Bottom bar (`Header Text`, node `2697:348823`)
- Legal links: **Privacy Policy · Terms & Conditions of Use · Product Safety Statement**
- Right: **© 2025 GIRL SCOUTS OF THE USA**

---

## Implementation Approach

### Header
1. **Content/fragment:** Extend the header fragment (nav content doc) to hold the offer-bar text+codes, audience toggle labels, logo, the 9 category links, and the Store Locator link.
2. **JS (`header.js`):** Add decoration for (a) dismissible offer bar, (b) For Everyone/For Leaders toggle, (c) Store Locator pill — while preserving existing search/wishlist/cart/account dropin wiring.
3. **CSS (`header.css`):** Rebrand to GS tokens — offer bar star-green, nav typography (Trefoil Sans), category-row off-white bg, active toggle forest-green, icon styling, badge.
4. **Responsive:** Map to mobile breakpoint (hamburger, stacked) per existing patterns.

### Footer
1. **Content/fragment:** Build the footer fragment with the 5 link groups, social links, newsletter card, wholesale box, and legal/copyright row.
2. **JS (`footer.js`):** Keep fragment loading + store switcher; add newsletter subscribe + social icon decoration as needed.
3. **CSS (`footer.css`):** Forest-green bg, white text, column layout, newsletter card with image, wholesale bordered box, bottom legal bar.

---

## Checklist

### Header
- [x] Extract Header_Container structure (offer bar, nav bar, category nav)
- [x] Capture header visual reference + nav link labels
- [ ] Inventory existing `header.js` decoration + commerce dropin hooks to preserve
- [ ] Update header fragment content (offer bar, toggle, logo, 9 nav links, Store Locator)
- [ ] Extend `header.js`: dismissible offer bar, audience toggle, Store Locator pill
- [ ] Rewrite `header.css` with GS tokens (3-row layout, typography, icons, badge)
- [ ] Verify commerce features still work (search, wishlist, cart, account)
- [ ] Confirm: is the 56px `slider` strip part of header or homepage content?
- [ ] Responsive/mobile pass (hamburger, stacked nav)

### Footer
- [x] Extract Footer structure (link columns, right rail, bottom bar)
- [x] Capture footer visual reference + all link labels
- [ ] Inventory existing `footer.js` (fragment load, store switcher) to preserve
- [ ] Build footer fragment content (5 link groups, social, newsletter, wholesale, legal)
- [ ] Extend `footer.js`: newsletter subscribe + social icons (keep store switcher)
- [ ] Rewrite `footer.css` with GS tokens (forest-green theme, columns, cards, bottom bar)
- [ ] Source/confirm social + sparkle/trefoil icons in `icons/`
- [ ] Responsive/mobile pass

### Verify
- [ ] Preview header + footer; compare against Figma screenshots
- [ ] Computed-style spot checks (colors, fonts, spacing use `--gs-*` tokens)
- [ ] Run stylelint on header.css + footer.css

## Open Items
- **Icons:** Need sparkle (offer bar), trefoil logo, and social icons (FB, X, YouTube, IG, LinkedIn, WhatsApp) — confirm whether these exist in `icons/` or must be added.
- **Header `slider` strip (`5168:208513`):** confirm header vs. homepage content.
- **Fragment content authoring:** header/footer pull from content fragments — confirm where the GS content docs live (DA/SharePoint) before authoring.

---
*Block list and structural analysis complete. Implementing the header/footer requires Execute mode.*
