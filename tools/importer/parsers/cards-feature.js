/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-feature.
 * Base block: cards
 * Source: https://main--gsu-storefront--deepak269262.aem.live/
 * Generated: 2026-06-11
 *
 * Structure (validated against source.html / cleaned.html):
 *   .cards.block > ul > li
 *     li > .cards-card-image  -> picture/img (column 1)
 *     li > .cards-card-body   -> <p><strong>title</strong></p> + <p>description</p> (column 2)
 *   Each <li> becomes one block row with 2 columns: [image, text].
 */
export default function parse(element, { document }) {
  const cells = [];

  // Each card is a top-level <li> inside the block's <ul>.
  // Fall back to direct list items if no <ul> wrapper is present.
  const cards = Array.from(element.querySelectorAll(':scope > ul > li'));
  const items = cards.length ? cards : Array.from(element.querySelectorAll(':scope li'));

  items.forEach((li) => {
    // Column 1: image. Prefer the picture element; fall back to a bare img.
    const imageContainer = li.querySelector('.cards-card-image, [class*="image"]');
    const image = (imageContainer && (imageContainer.querySelector('picture') || imageContainer.querySelector('img')))
      || li.querySelector('picture')
      || li.querySelector('img');

    // Column 2: text body (bold title + description paragraph(s)).
    const bodyContainer = li.querySelector('.cards-card-body, [class*="body"]');
    const textContent = [];
    if (bodyContainer) {
      // Preserve all body children (title paragraph with <strong>, description paragraph).
      Array.from(bodyContainer.children).forEach((child) => textContent.push(child));
    } else {
      // Fallback: take all paragraphs in the card that are not inside the image container.
      Array.from(li.querySelectorAll('p')).forEach((p) => {
        if (!imageContainer || !imageContainer.contains(p)) textContent.push(p);
      });
    }

    cells.push([image || '', textContent]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  element.replaceWith(block);
}
