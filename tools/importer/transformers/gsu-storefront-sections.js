/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: gsu-storefront section breaks and section metadata.
 *
 * Runs in afterTransform only. Drives off payload.template.sections (from
 * tools/importer/page-templates.json). For the homepage template:
 *   section-1 "Hero"            selector .section.hero-container         style null
 *   section-2 "Columns Feature" selector .section.columns-container      style null
 *   section-3 "Cards Feature"   selector .section.highlight.cards-container style "highlight"
 *
 * Behaviour (sections processed in reverse so insertions don't shift later
 * selectors):
 *   - For each section that has a `style`, insert a "Section Metadata" block
 *     after the section element.
 *   - For each non-first section, insert an <hr> section break before the
 *     section element.
 *
 * All selectors come from page-templates.json, which was validated against the
 * captured DOM (migration-work/cleaned.html).
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const sections = payload && payload.template && Array.isArray(payload.template.sections)
      ? payload.template.sections
      : [];

    if (sections.length < 2) {
      return;
    }

    const doc = element.ownerDocument;

    // Resolve each section's first matching element under the migrated content.
    const resolved = sections.map((section) => ({
      section,
      el: section.selector ? element.querySelector(section.selector) : null,
    }));

    // Process in reverse order so inserting nodes does not shift the position
    // of sections we have not handled yet.
    for (let i = resolved.length - 1; i >= 0; i -= 1) {
      const { section, el } = resolved[i];
      if (!el) {
        continue;
      }

      // Section Metadata block for sections that declare a style.
      if (section.style) {
        const block = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        el.after(block);
      }

      // Section break before every non-first section, when there is content
      // before it.
      if (i > 0 && el.previousElementSibling) {
        el.before(doc.createElement('hr'));
      }
    }
  }
}
