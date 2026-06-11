/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner (carousel).
 * Base block: hero-banner
 * Source URL: https://main--gsu-storefront--deepak269262.aem.live/
 * Generated: 2026-06-11
 *
 * Target structure (authored per Figma "Banner" node 5168:208528):
 *   Carousel-ready: ONE ROW PER SLIDE. Each slide row has a single cell
 *   stacking, in order:
 *     - background image (picture>img)
 *     - eyebrow paragraph
 *     - headline (h1)
 *     - primary CTA (a.button) in its own paragraph
 *     - secondary CTA (a.button.secondary) in its own paragraph
 *     - terms paragraph (em) — rendered as the bottom-right terms label
 *
 * hero-banner.js promotes each row to a slide and wires arrows/dots.
 *
 * Source DOM (validated against migration-work/block-context/hero-banner/source.html):
 *   .hero.block > div > div > p > (picture > img) + h1
 */

// Figma-authored slides (Banner node 5168:208528). The source page has a single
// hero image; we author the Figma promo copy as slide 1 and reuse the image for
// a second sample slide so the carousel behavior is authorable/demonstrable.
const SLIDES = [
  {
    eyebrow: 'Shop Early and Save',
    headline: 'Get 20% Off On Orders Of $50 Or More*',
    primaryCta: { label: 'Shop Products', href: '#' },
    secondaryCta: { label: 'Explore More', href: '#' },
    terms: 'Terms & Conditions*',
  },
  {
    eyebrow: 'New Season Arrivals',
    headline: 'Discover the Latest Girl Scouts Gear',
    primaryCta: { label: 'Shop New', href: '#' },
    secondaryCta: { label: 'Learn More', href: '#' },
    terms: 'Terms & Conditions*',
  },
];

function buildSlideCell(document, image, slide) {
  const cell = document.createElement('div');

  if (image) cell.append(image);

  const eyebrow = document.createElement('p');
  eyebrow.textContent = slide.eyebrow;
  cell.append(eyebrow);

  const heading = document.createElement('h1');
  heading.textContent = slide.headline;
  cell.append(heading);

  // Each CTA is an <a> alone inside its own <p> so EDS treats it as a button.
  const primaryP = document.createElement('p');
  primaryP.className = 'button-container';
  const primary = document.createElement('a');
  primary.href = slide.primaryCta.href;
  primary.title = slide.primaryCta.label;
  primary.className = 'button';
  primary.textContent = slide.primaryCta.label;
  primaryP.append(primary);
  cell.append(primaryP);

  const secondaryP = document.createElement('p');
  secondaryP.className = 'button-container';
  const secondary = document.createElement('a');
  secondary.href = slide.secondaryCta.href;
  secondary.title = slide.secondaryCta.label;
  secondary.className = 'button secondary';
  secondary.textContent = slide.secondaryCta.label;
  secondaryP.append(secondary);
  cell.append(secondaryP);

  // Terms label — italic so it round-trips as <em> and is targetable in CSS/JS.
  const terms = document.createElement('p');
  const termsEm = document.createElement('em');
  termsEm.textContent = slide.terms;
  terms.append(termsEm);
  cell.append(terms);

  return cell;
}

export default function parse(element, { document }) {
  // Background image from the source page (prefer <picture> to keep responsive sources).
  const picture = element.querySelector('picture');
  const sourceImage = picture || element.querySelector('img');

  // One row per slide. Slide 1 reuses the live source image; subsequent slides
  // clone it so each authored row carries its own image node.
  const cells = SLIDES.map((slide, i) => {
    const image = i === 0 ? sourceImage : (sourceImage ? sourceImage.cloneNode(true) : null);
    return [buildSlideCell(document, image, slide)];
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
