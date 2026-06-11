# Girl Scouts Homepage — Block Inventory

## Source
- **Figma file:** `9LoLlN38Ej35qSVRcokDUu`
- **Homepage frame:** `Home_VariationA_Desktop1` (node `5168:208510`, 1280 × 10547)

## Block Inventory (top → bottom, render order)

| # | Figma layer name | Node ID | Likely EDS block | Notes |
|---|---|---|---|---|
| 1 | Header_Container | `5168:208511` | `header` (nav) | Site header — dedicated navigation workflow |
| 2 | Banner | `5168:208528` | `hero` / `banner` | Full-width hero, 720px tall |
| 3 | I_am_looking_for | `5168:208529` | `search` / quick-links bar | Slim 68px utility/search row |
| 4 | Shop by Grade New Section | `5168:208530` | `cards` (grade tiles) | Category-by-grade tiles |
| 5 | New Arrivals | `7646:185028` | `carousel` / product cards | Product rail, 710px |
| 6 | Shop by Category | `5168:208532` | `cards` grid | Tall category grid, 1287px |
| 7 | Full_Banner | `5168:208533` | `banner` (promo) | Full-width promo banner |
| 8 | Frame 2134284682 | `5168:208534` | `carousel` | Product/content carousel (has Carousel_Icon controls) |
| 9 | Season_Banner | `5168:208535` | `banner` (seasonal) | Seasonal promo |
| 10 | New Finds & Deals | `5168:208536` | `carousel` / product cards | Deals rail |
| 11 | Frame 2134284659 | `5168:208537` | *decorative wave divider* | Vector wave + logo accent — section styling, not a block |
| 12 | Customer_Stories | `5168:208545` | `cards` / `carousel` (testimonials) | Testimonials, 801px |
| 13 | Council Products-B2C/Leader | `5168:208546` | `cards` / product block | Council products block |
| 14 | Frame 2134284679 | `5168:208547` | *decorative wave divider* | Vector wave + icon accent — section styling |
| 15 | 50-50_Section | `5168:208596` | `columns` (50/50) | Two-up image + text |
| 16 | A Month of Skills, Fun & New Badges | `5168:208597` | `cards` / feature | Feature/promo section |
| 17 | Frame 25201 | `5168:208598` | `cta` block | Contains `CTA_Component` |
| 18 | Group 25244 → Values | `6808:180474` / `5168:208608` | `cards` (values) | "Values" block with header strip |
| 19 | Need Help_Section | `5168:208609` | `cta` / help strip | Slim 85px help bar |
| 20 | Footer | `5168:208610` | `footer` | Site footer — dedicated footer workflow |

## Summary by block type
- **Hero / Banners (3):** Banner, Full_Banner, Season_Banner
- **Carousels / product rails (3):** New Arrivals, Frame 2134284682, New Finds & Deals
- **Card grids / tiles (6):** Shop by Grade, Shop by Category, Customer_Stories, Council Products, A Month of Skills, Values
- **Columns (1):** 50-50_Section
- **CTA / utility strips (3):** I_am_looking_for, Frame 25201 (CTA), Need Help_Section
- **Chrome (2):** Header, Footer
- **Decorative dividers (2):** Frame 2134284659, Frame 2134284679 (likely section background/styling)

**Total: 20 sections** — ~16 content blocks, 2 chrome (header/footer), 2 decorative dividers.

## Open Items / Clarifications (for any follow-up build work)
- **Variants vs. new blocks:** Several sections share a base type (`cards`, `carousel`, `banner`) → these become variants. Naming to confirm before build.
- **Decorative waves (#11, #14):** Recommend section background styling rather than standalone blocks — confirm.
- **Header & Footer:** Have separate orchestration workflows from body-block migration.

## Checklist
- [x] Fetch homepage frame metadata and enumerate all sections
- [x] Resolve generically-named frames (Frame 2134284682 = carousel, Frame 25201 = CTA, Group 25244 = Values, wave dividers)
- [x] Produce the full ordered block list (above)
- [ ] Confirm: which sections are net-new blocks vs. variants of existing blocks
- [ ] Confirm: treat decorative wave dividers as section styling vs. blocks
- [ ] Confirm scope: full homepage migration vs. this block-list-only request
- [ ] (If migrating) Map each block to existing EDS blocks in the project block library
- [ ] (If migrating) Per-section Figma deep-dive to extract content model + styles
- [ ] (If migrating) Generate import infrastructure and content

---
*The requested block list is complete above. Building or migrating any of these blocks requires Execute mode.*
