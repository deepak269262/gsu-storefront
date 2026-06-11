/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: gsu-storefront site-wide cleanup.
 *
 * Removes non-authorable content from the Adobe Commerce / EDS storefront shell
 * so the import contains only page-level authorable content from <main>.
 *
 * All selectors below are taken from the captured DOM in
 * migration-work/cleaned.html (the homepage). They are documented inline.
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Commerce drop-in widgets are auto-populated chrome, not authorable.
    // In cleaned.html they live inside <header> (auth sign-in panel, mini-cart,
    // wishlist, search forms), but remove them up front so block parsing never
    // sees their markup, and in case any leak outside <header> on other pages.
    WebImporter.DOMUtils.remove(element, [
      // Auth sign-in drop-in (header > nav-auth-menu-panel > #auth-dropin-container)
      '#auth-dropin-container',
      '.auth-sign-in',
      '.authenticated-user-menu',
      '#generateCustomerToken',
      // Mini-cart drop-in (header > nav-tools > minicart-wrapper)
      '.minicart-wrapper',
      // Wishlist drop-in (header > nav-tools > wishlist-wrapper)
      '.wishlist-wrapper',
      // Search drop-in (header > nav-tools > search-wrapper, #search-bar-form)
      '.search-wrapper',
      '#search-bar-form',
      '.search-bar-result',
      // Account dropdown drop-in (header > nav-tools > dropdown-wrapper)
      '.dropdown-wrapper',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site shell. From cleaned.html:
    //   <header class="header-wrapper"> ... auto-populated nav + commerce drop-ins
    //   <footer class="footer-wrapper"> ... auto-populated copyright/legal links
    WebImporter.DOMUtils.remove(element, [
      'header',
      '.header-wrapper',
      'nav#nav',
      '.nav-wrapper',
      'footer',
      '.footer-wrapper',
      // Safe leftover/non-authorable elements.
      'iframe',
      'link',
      'noscript',
      'source',
    ]);

    // Remove the empty trailing layout section under <main> (cleaned.html /
    // live DOM: a bare <div class="section"> with no -container modifier class
    // and no content) so it does not produce an empty authored section.
    // NOTE: the validator passes <main> itself as `element`, so use `:scope >`
    // to match its direct children.
    element.querySelectorAll(':scope > div.section').forEach((sec) => {
      const isBareSection = sec.classList.length === 1 && sec.classList.contains('section');
      const isEmpty = sec.textContent.trim() === '' && !sec.querySelector('img, picture, a, table, ul, h1, h2, h3, h4, h5, h6');
      if (isBareSection && isEmpty) {
        sec.remove();
      }
    });
  }
}
