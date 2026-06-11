import { createOptimizedPicture, decorateButtons } from '../../scripts/aem.js';

/**
 * Hero Banner carousel.
 * Each authored row becomes a slide: background image + eyebrow + headline +
 * primary CTA + secondary CTA + terms label. When more than one slide is
 * authored, prev/next arrows and dot indicators are added.
 */
export default function decorate(block) {
  const rows = [...block.children];

  const track = document.createElement('div');
  track.className = 'hero-banner-track';

  const slides = rows.map((row, index) => {
    const slide = document.createElement('div');
    slide.className = 'hero-banner-slide';
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `Slide ${index + 1} of ${rows.length}`);
    if (index !== 0) slide.setAttribute('aria-hidden', 'true');

    // The single authored cell holds the image + text content.
    const cell = row.firstElementChild || row;

    // Promote the background image out of its paragraph into the slide root.
    const img = cell.querySelector('picture > img');
    if (img) {
      const optimized = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '2000' }]);
      optimized.classList.add('hero-banner-bg');
      const oldPicture = cell.querySelector('picture');
      if (oldPicture && oldPicture.parentElement.tagName === 'P') {
        oldPicture.parentElement.remove();
      } else if (oldPicture) {
        oldPicture.remove();
      }
      slide.append(optimized);
    }

    // Terms label (authored as the trailing <em>) moves to its own element.
    const termsEm = [...cell.querySelectorAll('em')].pop();
    let termsLabel;
    if (termsEm && termsEm.closest('p')) {
      termsLabel = document.createElement('div');
      termsLabel.className = 'hero-banner-terms';
      termsLabel.textContent = termsEm.textContent;
      termsEm.closest('p').remove();
    }

    const content = document.createElement('div');
    content.className = 'hero-banner-content';
    while (cell.firstElementChild) content.append(cell.firstElementChild);
    slide.append(content);

    if (termsLabel) slide.append(termsLabel);

    return slide;
  });

  slides.forEach((s) => track.append(s));
  block.replaceChildren(track);

  decorateButtons(block);

  if (slides.length <= 1) return;

  // --- Carousel controls (multi-slide only) ---
  let current = 0;

  const dotsWrapper = document.createElement('div');
  dotsWrapper.className = 'hero-banner-dots';
  dotsWrapper.setAttribute('role', 'tablist');

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-banner-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dotsWrapper.append(dot);
    return dot;
  });

  const show = (next) => {
    const target = (next + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle('hero-banner-slide--active', i === target);
      s.setAttribute('aria-hidden', i === target ? 'false' : 'true');
    });
    dots.forEach((d, i) => {
      d.classList.toggle('hero-banner-dot--active', i === target);
      d.setAttribute('aria-selected', i === target ? 'true' : 'false');
    });
    current = target;
  };

  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'hero-banner-arrow hero-banner-arrow--prev';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.addEventListener('click', () => show(current - 1));

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'hero-banner-arrow hero-banner-arrow--next';
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.addEventListener('click', () => show(current + 1));

  block.append(prevBtn, nextBtn, dotsWrapper);
  slides[0].classList.add('hero-banner-slide--active');
  show(0);
}
