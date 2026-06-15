import { getRootPath, isMultistore } from '@dropins/tools/lib/aem/configs.js';
// Dropin Components
import {
  Button,
  provider as UI,
} from '@dropins/tools/components.js';

// Block-level
import createModal from '../modal/modal.js';
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Toggles all storeSelector sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleStoreDropdown(sections, expanded = false) {
  sections
    .querySelectorAll('.storeview-modal .default-content-wrapper > ul > li')
    .forEach((section) => {
      section.setAttribute('aria-expanded', expanded);
    });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const root = getRootPath();
  // Load Footer as Fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');

  // Footer content - Store Switcher
  if (isMultistore()) {
    footer.innerHTML = `
      <div class="storeview-switcher-button"></div>
    `;

    // Container and component refs
    let modal;

    // Modal Actions
    const showModal = async (content) => {
      modal = await createModal([content]);
      modal.showModal();
    };

    // Rendering the Store Switcher Modal Content
    const $storeSwitcherBtn = footer.querySelector(
      '.storeview-switcher-button',
    );

    // Store Switcher Modal Content
    const storeSwitcherPath = '/store-switcher';
    let fragmentStoreView;

    try {
      fragmentStoreView = await loadFragment(storeSwitcherPath);
      if (!fragmentStoreView) throw new Error(`Footer does not render due to Store Switcher fragment (${storeSwitcherPath}) not found`);
    } catch (error) {
      console.error('Error loading store switcher fragment:', error);
      return;
    }

    // Store Switcher Modal Content
    const storeSwitcher = document.createElement('div');

    // Return Storename from stores-switcher
    const selected = [...fragmentStoreView.querySelectorAll('a')].find((a) => {
      const url = new URL(a.href);
      return url.pathname.startsWith(root);
    });

    storeSwitcher.id = 'storeview-modal';
    while (fragmentStoreView.firstElementChild) {
      storeSwitcher.append(fragmentStoreView.firstElementChild);
    }

    // create classes for storeview modal sections
    const classes = ['storeview-title', 'storeview-list'];
    classes.forEach((c, i) => {
      const section = storeSwitcher.children[i];
      if (section) section.classList.add(`storeview-modal-${c}`);
    });

    // Store Switcher Modal Content - Store View Title
    const storeViewTitle = storeSwitcher.querySelector('.storeview-modal-storeview-title');
    const title = storeViewTitle.querySelector('h3');
    if (title) {
      title.className = '';
      title.closest('h3').classList.add('storeview-modal-storeview-title');
      title.setAttribute('tabindex', '0');
    }

    // Storeview List
    const storeViewList = storeSwitcher.querySelector('.storeview-modal-storeview-list');

    if (storeViewList && storeViewList.children.length) {
      // Add storeview-selection class to parent UL
      storeViewList
        .querySelectorAll(':scope .default-content-wrapper > ul')
        .forEach((storeView) => {
          if (storeView.querySelector('ul')) storeView.classList.add('storeview-selection');
        });

      // if multiple stores exist per region, add class storeviews and click events for accordion
      storeViewList.querySelectorAll('.default-content-wrapper > ul > li > ul').forEach((storeRegion) => {
        if (storeRegion.children.length > 1) {
          if (storeRegion.querySelector('ul')) storeRegion.classList.add('storeviews');

          // Accessiblity: addeventlistener for 'click' and keyboard event and tab indexes
          storeViewList.querySelectorAll(':scope li').forEach((storeView) => {
            const link = storeView.closest('a');
            if (link) link.setAttribute('tabindex', '0');
            storeView.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                const expanded = storeView.getAttribute('aria-expanded') === 'true';
                toggleStoreDropdown(storeViewList);
                storeView.setAttribute('aria-expanded', expanded ? 'false' : 'true');
              }
            });
            storeView.addEventListener('click', () => {
              const expanded = storeView.getAttribute('aria-expanded') === 'true';
              toggleStoreDropdown(storeViewList);
              storeView.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            });
          });
        }
      });

      // If only one storeview link in region, convert parent UL into the li and remove the child UL
      storeViewList.querySelectorAll('.default-content-wrapper > ul > li > ul').forEach((storeRegion) => {
        const li = storeRegion.closest('li');

        if (storeRegion.children.length <= 1) {
          li.classList.add('storeview-single-store');
          const ulParent = li.closest('ul');
          const replacedChild = (storeRegion.firstElementChild);
          replacedChild.className = 'storeview-single-store';

          ulParent.replaceChild(replacedChild, li);
          ulParent.setAttribute('tabindex', '0');
        } else {
          li.classList.add('storeview-multiple-stores');
          li.setAttribute('tabindex', '0');
        }
      });

      UI.render(Button, {
        children: `${selected.text}`,
        'data-testid': 'storeview-switcher-button',
        className: 'storeview-switcher-button',
        size: 'medium',
        variant: 'teritary',
        onClick: () => {
          showModal(storeSwitcher);
        },
      })($storeSwitcherBtn);
    }
  }
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  decorateFooterLayout(footer);
}

/**
 * Replaces social link icon tokens (":facebook:") with inline SVGs so they
 * inherit the link color. Fetches each SVG from the icons/ folder once.
 * @param {Element} footer The footer content container
 */
async function decorateSocialIcons(footer) {
  const links = [...footer.querySelectorAll('.footer-social a')];
  await Promise.all(links.map(async (a) => {
    const match = a.textContent.trim().match(/^:([a-z0-9-]+):$/i);
    if (!match) return;
    const name = match[1];
    if (!a.getAttribute('aria-label')) a.setAttribute('aria-label', a.title || name);
    try {
      const resp = await fetch(`${window.hlx.codeBasePath}/icons/${name}.svg`);
      if (!resp.ok) return;
      const svg = await resp.text();
      a.innerHTML = svg;
    } catch (e) {
      // Leave the label text if the icon can't be fetched.
    }
  }));
}

/**
 * Groups the authored footer sections (each tagged with a footer-row-* style
 * class) into three row wrappers and enables the mobile accordion on link
 * columns. Safe no-op when the row classes are absent.
 * @param {Element} footer The footer content container
 */
function decorateFooterLayout(footer) {
  const sections = [...footer.querySelectorAll(':scope > .section')];
  const rowFor = (el) => {
    if (el.classList.contains('footer-row-top')) return 'top';
    if (el.classList.contains('footer-row-mid')) return 'mid';
    if (el.classList.contains('footer-row-bottom')) return 'bottom';
    return null;
  };

  if (!sections.some(rowFor)) return;

  // Convert social link icon tokens (":facebook:") into inline SVGs so they
  // inherit the link color (white / hover). The token text round-trips
  // literally through the fragment, so we normalise + inline here.
  decorateSocialIcons(footer);

  const rows = {};
  sections.forEach((section) => {
    const row = rowFor(section);
    if (!row) return;
    if (!rows[row]) {
      const wrapper = document.createElement('div');
      wrapper.className = `footer-row footer-row--${row}`;
      section.before(wrapper);
      rows[row] = wrapper;
    }
    rows[row].append(section);
  });

  // Mobile accordion: tapping a link-column heading toggles its list.
  const mql = window.matchMedia('(max-width: 767px)');
  footer.querySelectorAll('.section.footer-links').forEach((col) => {
    const heading = col.querySelector('h3, h2, h4');
    const list = col.querySelector('ul');
    if (!heading || !list) return;

    heading.setAttribute('role', 'button');
    heading.setAttribute('tabindex', '0');
    const setExpanded = (expanded) => {
      col.classList.toggle('footer-links--expanded', expanded);
      heading.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };
    setExpanded(!mql.matches);

    const toggle = () => {
      if (!mql.matches) return;
      setExpanded(!col.classList.contains('footer-links--expanded'));
    };
    heading.addEventListener('click', toggle);
    heading.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
    mql.addEventListener('change', () => setExpanded(!mql.matches));
  });
}
