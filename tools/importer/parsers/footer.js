/* eslint-disable */
/* global WebImporter */
/**
 * Parser for the site footer document (/footer).
 * Authors the Girl Scouts footer per Figma (Footer 5168:208610).
 *
 * Three stacked rows, each section tagged with a row class + a component class
 * via Section Metadata so footer.js can group sections and footer.css can place
 * them:
 *   Row TOP (footer-row-top):   brand | Quick Links | Help Center | About Us | Newsletter
 *   Row MID (footer-row-mid):   Local Resources | Follow Us On (social) | Wholesale
 *   Row BOT (footer-row-bottom):Legal links + copyright
 *
 * Component classes: footer-brand, footer-links, footer-newsletter,
 * footer-social, footer-wholesale, footer-legal.
 */

const BRAND = { label: 'Girl Scouts', href: '/' };

const COLUMNS = [
  {
    heading: 'Quick Links',
    links: [
      { label: 'My Account', href: '/customer/account' },
      { label: 'Quick Order', href: '/quick-order' },
      { label: 'Store Locator', href: '/store-locator' },
      { label: 'Cookie Dough Program Credits', href: '/cookie-dough-credits' },
      { label: 'View our Digital Catalog', href: '/catalog' },
      { label: 'New to Girl Scouts?', href: '/new-to-girl-scouts' },
    ],
  },
  {
    heading: 'Help Center',
    links: [
      { label: 'Contact us', href: '/contact' },
      { label: 'Return & Refund Policy', href: '/returns' },
      { label: 'Where to place badges & insignia', href: '/badge-placement' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Promotional Exclusions', href: '/promotional-exclusions' },
      { label: 'Size Guide', href: '/size-guide' },
    ],
  },
  {
    heading: 'About Us',
    links: [
      { label: 'Girl Scouts of the USA homepage', href: 'https://www.girlscouts.org' },
      { label: 'Donate', href: '/donate' },
      { label: 'Lifetime Membership', href: '/lifetime-membership' },
    ],
  },
];

const LOCAL_RESOURCES = {
  heading: 'Local Resources',
  links: [
    { label: 'Find your Nearest Store', href: '/store-locator' },
    { label: 'Find your local council', href: '/find-council' },
    { label: 'Find Cookies', href: '/find-cookies' },
  ],
};

// Social links use icon tokens (:facebook: etc.) so EDS renders inline SVGs
// from the icons/ folder. footer.js also adds accessible labels.
const SOCIAL = [
  { label: 'Facebook', icon: 'facebook', href: 'https://facebook.com/girlscouts' },
  { label: 'X', icon: 'x', href: 'https://x.com/girlscouts' },
  { label: 'YouTube', icon: 'youtube', href: 'https://youtube.com/girlscouts' },
  { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com/girlscouts' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/company/girl-scouts-of-the-usa' },
  { label: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/girlscouts' },
];

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions of Use', href: '/terms' },
  { label: 'Product Safety Statement', href: '/product-safety' },
];

function linkColumn(document, { heading, links }) {
  const section = document.createElement('div');
  const h = document.createElement('h3');
  h.textContent = heading;
  section.append(h);
  const ul = document.createElement('ul');
  links.forEach(({ label, href }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.title = label;
    a.textContent = label;
    li.append(a);
    ul.append(li);
  });
  section.append(ul);
  return section;
}

function sectionMetadata(document, style) {
  return WebImporter.Blocks.createBlock(document, {
    name: 'Section Metadata',
    cells: { style },
  });
}

export default function parse(element, { document }) {
  const nodes = [];
  const hr = () => document.createElement('hr');

  // Append a section's content + its Section Metadata, with a leading <hr>
  // for every section after the first.
  const pushSection = (contentEl, style, isFirst = false) => {
    if (!isFirst) nodes.push(hr());
    contentEl.append(sectionMetadata(document, style));
    nodes.push(contentEl);
  };

  // --- ROW TOP ---
  // Brand
  const brand = document.createElement('div');
  const brandP = document.createElement('p');
  const brandA = document.createElement('a');
  brandA.href = BRAND.href;
  brandA.title = BRAND.label;
  brandA.textContent = BRAND.label;
  brandP.append(brandA);
  brand.append(brandP);
  pushSection(brand, 'footer-row-top, footer-brand', true);

  // Link columns (Quick Links, Help Center, About Us)
  COLUMNS.forEach((col) => {
    pushSection(linkColumn(document, col), 'footer-row-top, footer-links');
  });

  // Newsletter card (right rail of top row)
  const newsletter = document.createElement('div');
  const nlH = document.createElement('h3');
  nlH.textContent = "Be the first to know what's new!";
  const nlBody = document.createElement('p');
  nlBody.textContent = 'Sign up for emails and get insider updates, special offers, and gear that celebrates every Girl Scout.';
  const nlCtaP = document.createElement('p');
  nlCtaP.className = 'button-container';
  const nlCta = document.createElement('a');
  nlCta.href = '/newsletter';
  nlCta.title = 'Subscribe Now';
  nlCta.className = 'button';
  nlCta.textContent = 'Subscribe Now';
  nlCtaP.append(nlCta);
  newsletter.append(nlH, nlBody, nlCtaP);
  pushSection(newsletter, 'footer-row-top, footer-newsletter');

  // --- ROW MID ---
  // Local Resources
  pushSection(linkColumn(document, LOCAL_RESOURCES), 'footer-row-mid, footer-links, footer-local');

  // Social
  const social = document.createElement('div');
  const socialH = document.createElement('h3');
  socialH.textContent = 'Follow Us On';
  social.append(socialH);
  const socialUl = document.createElement('ul');
  SOCIAL.forEach(({ label, icon, href }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.title = label;
    // Icon token => EDS span.icon.icon-<name>; footer.js inlines the SVG.
    a.textContent = `:${icon}:`;
    li.append(a);
    socialUl.append(li);
  });
  social.append(socialUl);
  pushSection(social, 'footer-row-mid, footer-social');

  // Wholesale partners box
  const wholesale = document.createElement('div');
  const whH = document.createElement('h3');
  whH.textContent = 'Hello, Wholesale Partners';
  const whBody = document.createElement('p');
  const whLink = document.createElement('a');
  whLink.href = '/wholesale/login';
  whLink.title = 'Login Here';
  whLink.textContent = 'Login Here';
  whBody.append(whLink, ' for your personalized Experience');
  wholesale.append(whH, whBody);
  pushSection(wholesale, 'footer-row-mid, footer-wholesale');

  // --- ROW BOTTOM ---
  const legal = document.createElement('div');
  const legalP = document.createElement('p');
  LEGAL.forEach(({ label, href }, i) => {
    const a = document.createElement('a');
    a.href = href;
    a.title = label;
    a.textContent = label;
    if (i > 0) legalP.append(' ');
    legalP.append(a);
  });
  const copyright = document.createElement('p');
  copyright.textContent = '© 2025 Girl Scouts of the USA';
  legal.append(legalP, copyright);
  pushSection(legal, 'footer-row-bottom, footer-legal');

  element.replaceChildren(...nodes);
}
