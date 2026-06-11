/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-feature.
 * Base block: columns
 * Source: https://main--gsu-storefront--deepak269262.aem.live/
 * Generated: 2026-06-11
 *
 * Layout (from source + authoring analysis): 2 rows x 2 columns.
 *   Row 1, col 1: paragraph + bulleted list
 *   Row 1, col 2: image
 *   Row 2, col 1: image
 *   Row 2, col 2: paragraph + "Tutorial" secondary button link
 *
 * Strategy: each direct-child <div> of the columns block is a layout row;
 * each direct-child <div> inside it is a column cell. We preserve each cell's
 * existing content (text, lists, images, links) so semantics are retained.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Each direct-child <div> of the block represents a layout row.
  const rows = Array.from(element.querySelectorAll(':scope > div'));

  rows.forEach((row) => {
    // Each direct-child <div> of a row is a column cell.
    const columnDivs = Array.from(row.querySelectorAll(':scope > div'));

    // Build a cell per column, preserving its full content
    // (paragraphs, lists, pictures/images, button links, etc.).
    const rowCells = columnDivs.map((colDiv) => {
      const content = Array.from(colDiv.childNodes).filter((node) => {
        // Drop empty/whitespace-only text nodes; keep elements and real text.
        if (node.nodeType === 3) return node.textContent.trim().length > 0;
        return true;
      });
      // Fall back to the column div itself if it has no meaningful children.
      return content.length ? content : [colDiv];
    });

    if (rowCells.length) cells.push(rowCells);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
