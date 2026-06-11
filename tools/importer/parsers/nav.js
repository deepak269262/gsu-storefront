/* eslint-disable */
/* global WebImporter */
/**
 * Parser for the site navigation document (/nav).
 * Authors the Girl Scouts header per Figma (Header_Container 5168:208511).
 *
 * EDS header.js maps the nav fragment's top-level sections in order to:
 *   1. brand   — logo / homepage link
 *   2. sections — primary category nav (bold item + nested <ul> = dropdown)
 *   3. tools   — utility area (search/cart/wishlist/account injected by header.js)
 *
 * Category links (Figma row 3):
 *   New · Shop by Grade · Uniforms · Apparel & Accessories ·
 *   Badges, Patches & Awards · Gifts · Toys & Outdoors · Council · Sale
 */

const BRAND = { label: 'Girl Scouts', href: '/' };

// Top-level category links. Entries with `children` render as dropdowns.
const NAV_LINKS = [
  { label: 'New', href: '/new' },
  {
    label: 'Shop by Grade',
    href: '/shop-by-grade',
    children: [
      { label: 'Daisies (K-1)', href: '/shop-by-grade/daisies' },
      { label: 'Brownies (2-3)', href: '/shop-by-grade/brownies' },
      { label: 'Juniors (4-5)', href: '/shop-by-grade/juniors' },
      { label: 'Cadettes (6-8)', href: '/shop-by-grade/cadettes' },
    ],
  },
  { label: 'Uniforms', href: '/uniforms' },
  { label: 'Apparel & Accessories', href: '/apparel-accessories' },
  { label: 'Badges, Patches & Awards', href: '/badges-patches-awards' },
  { label: 'Gifts', href: '/gifts' },
  { label: 'Toys & Outdoors', href: '/toys-outdoors' },
  { label: 'Council', href: '/council' },
  { label: 'Sale', href: '/sale' },
];

function appendLink(document, parent, { label, href }, wrapInParagraph = false) {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.title = label;
  anchor.textContent = label;
  if (wrapInParagraph) {
    const p = document.createElement('p');
    p.append(anchor);
    parent.append(p);
  } else {
    parent.append(anchor);
  }
  return anchor;
}

export default function parse(element, { document }) {
  // --- Section 1: Brand ---
  const brand = document.createElement('div');
  appendLink(document, brand, BRAND, true);

  // --- Section 2: Category nav ---
  const sections = document.createElement('div');
  const list = document.createElement('ul');
  NAV_LINKS.forEach((link) => {
    const li = document.createElement('li');
    if (link.children && link.children.length) {
      // Bold top label + nested list => dropdown in header.js
      const label = document.createElement('p');
      const strong = document.createElement('strong');
      const labelLink = document.createElement('a');
      labelLink.href = link.href;
      labelLink.title = link.label;
      labelLink.textContent = link.label;
      strong.append(labelLink);
      label.append(strong);
      li.append(label);

      const sub = document.createElement('ul');
      link.children.forEach((child) => {
        const subLi = document.createElement('li');
        appendLink(document, subLi, child);
        sub.append(subLi);
      });
      li.append(sub);
    } else {
      appendLink(document, li, link);
    }
    list.append(li);
  });
  sections.append(list);

  // --- Section 3: Tools (left empty; header.js injects search/cart/etc.) ---
  const tools = document.createElement('div');

  // EDS separates top-level fragment sections with <hr>, which the renderer
  // turns into sibling section <div>s. header.js maps them in order to
  // brand / sections / tools.
  element.replaceChildren(
    brand,
    document.createElement('hr'),
    sections,
    document.createElement('hr'),
    tools,
  );
}
