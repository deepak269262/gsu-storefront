# Girl Scouts Figma Foundation → EDS Design Tokens Plan

## Goal
Migrate the four foundation token groups (Colors, Typography, Spacing, Grid System) from the Girl Scouts Figma "Foundation" page into the project's `styles/styles.css`, **adding new Girl Scouts-named tokens** alongside the existing Adobe Commerce dropin tokens and wiring the brand fonts from Figma.

## Source of Truth
- **Figma file:** `9LoLlN38Ej35qSVRcokDUu` — page "Foundation" (node `0:1`)
  - `3:182` — Color Guideline
  - `3:440` — Typography
  - `3:1005` — Spacing
  - `3:1102` — Grid System
- **Target:** `styles/styles.css` `:root` block (currently holds default grey Adobe Commerce dropin tokens at lines 14–131)
- **Fonts dir:** `fonts/` and `head.html` for font loading

## Create new vs. replace existing — decision
**Verdict: Add new `--gs-*` tokens, then re-point existing names to them (do NOT rename/remove existing tokens).**

Evidence from the codebase:
- The existing token names (`--color-*`, `--type-*`, `--spacing-*`, `--grid-*`) are referenced **~201 times across 26 block CSS files** (heaviest: `header.css` 57, `commerce-checkout.css` 34, `product-details.css` 20).
- Commerce dropin blocks also consume `--dropin-*` / `--color-*` tokens (~374 references across 28 files including `scripts/components/...`).
- **Renaming or deleting** any existing token would silently break styling across all those blocks → unacceptable blast radius.
- **Changing values in place** (keeping names) is safe but mixes "raw brand value" with "semantic alias," making future updates harder.

**Chosen hybrid:** define brand values once as `--gs-*` (single source of truth), then set the existing dropin token names equal to the matching `--gs-*`. This rebrands every existing block automatically with zero renamed references.

## Approach
- **Token strategy — Add new GS tokens:** Introduce a dedicated `--gs-*` token layer (`--gs-color-*`, `--gs-type-*`, `--gs-spacing-*`, `--gs-grid-*`). Re-point existing dropin token names to the new GS values.
- **Fonts — Use Figma fonts:** Extract exact font families from the Typography frame, source the web font files, add `@font-face`/preload in `head.html`, set `--gs-type-base-font-family`.

## Checklist

### 1. Extract exact values from Figma
- [ ] Re-fetch Color Guideline (`3:182`) and parse every swatch: name + hex/rgb (brand greens, neutrals, semantic/accent colors)
- [ ] Re-fetch Typography (`3:440`) and parse each style: font-family, weight, size, line-height, letter-spacing (Display, Heading, Body, Button, Caption/Detail tiers)
- [ ] Re-fetch Spacing (`3:1005`) and parse the spacing scale values
- [ ] Re-fetch Grid System (`3:1102`) and parse columns / gutters / margins per breakpoint
- [ ] Identify the brand font family name(s) and locate downloadable web font files (or confirm Typekit/Google source)

### 2. Define the new GS token layer
- [ ] Add `--gs-color-*` tokens (brand, neutral, semantic) to `:root` in `styles/styles.css`
- [ ] Add `--gs-type-*` tokens (font shorthand + letter-spacing per style) and `--gs-type-base-font-family`
- [ ] Add `--gs-spacing-*` scale tokens
- [ ] Add `--gs-grid-*` (columns/gutters/margins) tokens

### 3. Bridge existing dropin tokens to GS values (no renames)
- [ ] Re-point `--color-brand-*`, `--color-neutral-*`, and semantic color tokens to the matching `--gs-color-*`
- [ ] Re-point `--type-*-font` / letter-spacing tokens to `--gs-type-*`
- [ ] Re-point `--spacing-*` tokens to `--gs-spacing-*`
- [ ] Re-point `--grid-*` tokens to `--gs-grid-*`
- [ ] Confirm every existing token name is preserved (protects the ~201 block references / 26 files)

### 4. Set up brand fonts
- [ ] Add font files to `fonts/` (or configure external font service)
- [ ] Add `@font-face` declarations + fallback in `styles/styles.css`
- [ ] Add font preload/link in `head.html`
- [ ] Update fallback `@font-face` (currently maps `adobe-clean` → Helvetica) to the GS fallback

### 5. Verify
- [ ] Run preview and inspect a representative page; confirm body font, headings, link/button colors reflect the GS brand
- [ ] Use computed-style checks on `:root` to confirm GS tokens resolve and dropin aliases inherit them
- [ ] Spot-check a heavy-token block (e.g. header, checkout) for visual regressions
- [ ] Spot-check spacing/grid on a multi-section page
- [ ] Run stylelint to confirm `styles.css` passes

## Notes / Open Items
- Exact hex, font, spacing, and grid numbers will be read from Figma during **step 1** (they couldn't be cleanly extracted in plan mode because the Figma context is stored as escaped single-line JSON).
- If the GS palette doesn't map 1:1 onto the dropin semantic slots (positive/warning/alert/informational), I'll note unmatched colors and ask how to assign them during execution.
- Commerce dropin `--dropin-*` tokens are out of scope unless brand colors visibly leak through them; flag during step 5 if so.

---
*Execution requires Execute mode — this plan only covers read-only analysis and design.*
