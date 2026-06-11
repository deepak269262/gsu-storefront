/* eslint-disable */
/* global WebImporter */
/**
 * Parser for the site footer document (/footer).
 * Authors the Girl Scouts footer per Figma (Footer 5168:208610).
 *
 * Structure (each area is its own section, separated by <hr> so the renderer
 * emits sibling section divs that footer.css lays out as grid columns):
 *   1. Brand logo / wordmark
 *   2. Quick Links column
 *   3. Help Center column
 *   4. About Us column
 *   5. Local Resources column
 *   6. Follow Us On — social links  (Section Metadata style: footer-social)
 *   7. Newsletter card               (Section Metadata style: footer-newsletter)
 *   8. Wholesale partners box        (Section Metadata style: footer-wholesale)
 *   9. Legal / copyright bar         (Section Metadata style: footer-legal)
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
  {
    heading: 'Local Resources',
    links: [
      { label: 'Find your Nearest Store', href: '/store-locator' },
      { label: 'Find your local council', href: '/find-council' },
      { label: 'Find Cookies', href: '/find-cookies' },
    ],
  },
];

const SOCIAL = [
  { label: 'Facebook', href: 'https://facebook.com/girlscouts' },
  { label: 'X', href: 'https://x.com/girlscouts' },
  { label: 'YouTube', href: 'https://youtube.com/girlscouts' },
  { label: 'Instagram', href: 'https://instagram.com/girlscouts' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/girl-scouts-of-the-usa' },
  { label: 'WhatsApp', href: 'https://wa.me/girlscouts' },
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

  // 1. Brand
  const brand = document.createElement('div');
  const brandP = document.createElement('p');
  const brandA = document.createElement('a');
  brandA.href = BRAND.href;
  brandA.title = BRAND.label;
  brandA.textContent = BRAND.label;
  brandP.append(brandA);
  brand.append(brandP);
  nodes.push(brand);

  // 2-5. Link columns
  COLUMNS.forEach((col) => {
    nodes.push(hr());
    nodes.push(linkColumn(document, col));
  });

  // 6. Social
  nodes.push(hr());
  const social = document.createElement('div');
  const socialH = document.createElement('h3');
  socialH.textContent = 'Follow Us On';
  social.append(socialH);
  const socialUl = document.createElement('ul');
  SOCIAL.forEach(({ label, href }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.title = label;
    a.textContent = label;
    li.append(a);
    socialUl.append(li);
  });
  social.append(socialUl);
  social.append(sectionMetadata(document, 'footer-social'));
  nodes.push(social);

  // 7. Newsletter card
  nodes.push(hr());
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
  newsletter.append(sectionMetadata(document, 'footer-newsletter'));
  nodes.push(newsletter);

  // 8. Wholesale partners box
  nodes.push(hr());
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
  wholesale.append(sectionMetadata(document, 'footer-wholesale'));
  nodes.push(wholesale);

  // 9. Legal / copyright bar
  nodes.push(hr());
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
  legal.append(sectionMetadata(document, 'footer-legal'));
  nodes.push(legal);

  element.replaceChildren(...nodes);
}
