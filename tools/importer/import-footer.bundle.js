/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-footer.js
  var import_footer_exports = {};
  __export(import_footer_exports, {
    default: () => import_footer_default
  });

  // tools/importer/parsers/footer.js
  var BRAND = { label: "Girl Scouts", href: "/" };
  var COLUMNS = [
    {
      heading: "Quick Links",
      links: [
        { label: "My Account", href: "/customer/account" },
        { label: "Quick Order", href: "/quick-order" },
        { label: "Store Locator", href: "/store-locator" },
        { label: "Cookie Dough Program Credits", href: "/cookie-dough-credits" },
        { label: "View our Digital Catalog", href: "/catalog" },
        { label: "New to Girl Scouts?", href: "/new-to-girl-scouts" }
      ]
    },
    {
      heading: "Help Center",
      links: [
        { label: "Contact us", href: "/contact" },
        { label: "Return & Refund Policy", href: "/returns" },
        { label: "Where to place badges & insignia", href: "/badge-placement" },
        { label: "FAQ", href: "/faq" },
        { label: "Promotional Exclusions", href: "/promotional-exclusions" },
        { label: "Size Guide", href: "/size-guide" }
      ]
    },
    {
      heading: "About Us",
      links: [
        { label: "Girl Scouts of the USA homepage", href: "https://www.girlscouts.org" },
        { label: "Donate", href: "/donate" },
        { label: "Lifetime Membership", href: "/lifetime-membership" }
      ]
    },
    {
      heading: "Local Resources",
      links: [
        { label: "Find your Nearest Store", href: "/store-locator" },
        { label: "Find your local council", href: "/find-council" },
        { label: "Find Cookies", href: "/find-cookies" }
      ]
    }
  ];
  var SOCIAL = [
    { label: "Facebook", href: "https://facebook.com/girlscouts" },
    { label: "X", href: "https://x.com/girlscouts" },
    { label: "YouTube", href: "https://youtube.com/girlscouts" },
    { label: "Instagram", href: "https://instagram.com/girlscouts" },
    { label: "LinkedIn", href: "https://linkedin.com/company/girl-scouts-of-the-usa" },
    { label: "WhatsApp", href: "https://wa.me/girlscouts" }
  ];
  var LEGAL = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions of Use", href: "/terms" },
    { label: "Product Safety Statement", href: "/product-safety" }
  ];
  function linkColumn(document, { heading, links }) {
    const section = document.createElement("div");
    const h = document.createElement("h3");
    h.textContent = heading;
    section.append(h);
    const ul = document.createElement("ul");
    links.forEach(({ label, href }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
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
      name: "Section Metadata",
      cells: { style }
    });
  }
  function parse(element, { document }) {
    const nodes = [];
    const hr = () => document.createElement("hr");
    const brand = document.createElement("div");
    const brandP = document.createElement("p");
    const brandA = document.createElement("a");
    brandA.href = BRAND.href;
    brandA.title = BRAND.label;
    brandA.textContent = BRAND.label;
    brandP.append(brandA);
    brand.append(brandP);
    nodes.push(brand);
    COLUMNS.forEach((col) => {
      nodes.push(hr());
      nodes.push(linkColumn(document, col));
    });
    nodes.push(hr());
    const social = document.createElement("div");
    const socialH = document.createElement("h3");
    socialH.textContent = "Follow Us On";
    social.append(socialH);
    const socialUl = document.createElement("ul");
    SOCIAL.forEach(({ label, href }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = href;
      a.title = label;
      a.textContent = label;
      li.append(a);
      socialUl.append(li);
    });
    social.append(socialUl);
    social.append(sectionMetadata(document, "footer-social"));
    nodes.push(social);
    nodes.push(hr());
    const newsletter = document.createElement("div");
    const nlH = document.createElement("h3");
    nlH.textContent = "Be the first to know what's new!";
    const nlBody = document.createElement("p");
    nlBody.textContent = "Sign up for emails and get insider updates, special offers, and gear that celebrates every Girl Scout.";
    const nlCtaP = document.createElement("p");
    nlCtaP.className = "button-container";
    const nlCta = document.createElement("a");
    nlCta.href = "/newsletter";
    nlCta.title = "Subscribe Now";
    nlCta.className = "button";
    nlCta.textContent = "Subscribe Now";
    nlCtaP.append(nlCta);
    newsletter.append(nlH, nlBody, nlCtaP);
    newsletter.append(sectionMetadata(document, "footer-newsletter"));
    nodes.push(newsletter);
    nodes.push(hr());
    const wholesale = document.createElement("div");
    const whH = document.createElement("h3");
    whH.textContent = "Hello, Wholesale Partners";
    const whBody = document.createElement("p");
    const whLink = document.createElement("a");
    whLink.href = "/wholesale/login";
    whLink.title = "Login Here";
    whLink.textContent = "Login Here";
    whBody.append(whLink, " for your personalized Experience");
    wholesale.append(whH, whBody);
    wholesale.append(sectionMetadata(document, "footer-wholesale"));
    nodes.push(wholesale);
    nodes.push(hr());
    const legal = document.createElement("div");
    const legalP = document.createElement("p");
    LEGAL.forEach(({ label, href }, i) => {
      const a = document.createElement("a");
      a.href = href;
      a.title = label;
      a.textContent = label;
      if (i > 0) legalP.append(" ");
      legalP.append(a);
    });
    const copyright = document.createElement("p");
    copyright.textContent = "\xA9 2025 Girl Scouts of the USA";
    legal.append(legalP, copyright);
    legal.append(sectionMetadata(document, "footer-legal"));
    nodes.push(legal);
    element.replaceChildren(...nodes);
  }

  // tools/importer/import-footer.js
  var PAGE_TEMPLATE = {
    name: "footer",
    description: "Site footer fragment (Girl Scouts footer)",
    urls: ["https://main--gsu-storefront--deepak269262.aem.live/footer"]
  };
  var import_footer_default = {
    transform: (payload) => {
      const { document, params } = payload;
      const main = document.body;
      try {
        parse(main, { document, url: payload.url, params });
      } catch (e) {
        console.error("Failed to parse footer:", e);
      }
      const path = "/footer";
      return [{
        element: main,
        path,
        report: {
          title: "Footer",
          template: PAGE_TEMPLATE.name
        }
      }];
    }
  };
  return __toCommonJS(import_footer_exports);
})();
