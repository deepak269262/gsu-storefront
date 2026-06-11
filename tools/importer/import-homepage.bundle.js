/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-banner.js
  var SLIDES = [
    {
      eyebrow: "Shop Early and Save",
      headline: "Get 20% Off On Orders Of $50 Or More*",
      primaryCta: { label: "Shop Products", href: "#" },
      secondaryCta: { label: "Explore More", href: "#" },
      terms: "Terms & Conditions*"
    },
    {
      eyebrow: "New Season Arrivals",
      headline: "Discover the Latest Girl Scouts Gear",
      primaryCta: { label: "Shop New", href: "#" },
      secondaryCta: { label: "Learn More", href: "#" },
      terms: "Terms & Conditions*"
    }
  ];
  function buildSlideCell(document, image, slide) {
    const cell = document.createElement("div");
    if (image) cell.append(image);
    const eyebrow = document.createElement("p");
    eyebrow.textContent = slide.eyebrow;
    cell.append(eyebrow);
    const heading = document.createElement("h1");
    heading.textContent = slide.headline;
    cell.append(heading);
    const primaryP = document.createElement("p");
    primaryP.className = "button-container";
    const primary = document.createElement("a");
    primary.href = slide.primaryCta.href;
    primary.title = slide.primaryCta.label;
    primary.className = "button";
    primary.textContent = slide.primaryCta.label;
    primaryP.append(primary);
    cell.append(primaryP);
    const secondaryP = document.createElement("p");
    secondaryP.className = "button-container";
    const secondary = document.createElement("a");
    secondary.href = slide.secondaryCta.href;
    secondary.title = slide.secondaryCta.label;
    secondary.className = "button secondary";
    secondary.textContent = slide.secondaryCta.label;
    secondaryP.append(secondary);
    cell.append(secondaryP);
    const terms = document.createElement("p");
    const termsEm = document.createElement("em");
    termsEm.textContent = slide.terms;
    terms.append(termsEm);
    cell.append(terms);
    return cell;
  }
  function parse(element, { document }) {
    const picture = element.querySelector("picture");
    const sourceImage = picture || element.querySelector("img");
    const cells = SLIDES.map((slide, i) => {
      const image = i === 0 ? sourceImage : sourceImage ? sourceImage.cloneNode(true) : null;
      return [buildSlideCell(document, image, slide)];
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse2(element, { document }) {
    const cells = [];
    const rows = Array.from(element.querySelectorAll(":scope > div"));
    rows.forEach((row) => {
      const columnDivs = Array.from(row.querySelectorAll(":scope > div"));
      const rowCells = columnDivs.map((colDiv) => {
        const content = Array.from(colDiv.childNodes).filter((node) => {
          if (node.nodeType === 3) return node.textContent.trim().length > 0;
          return true;
        });
        return content.length ? content : [colDiv];
      });
      if (rowCells.length) cells.push(rowCells);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse3(element, { document }) {
    const cells = [];
    const cards = Array.from(element.querySelectorAll(":scope > ul > li"));
    const items = cards.length ? cards : Array.from(element.querySelectorAll(":scope li"));
    items.forEach((li) => {
      const imageContainer = li.querySelector('.cards-card-image, [class*="image"]');
      const image = imageContainer && (imageContainer.querySelector("picture") || imageContainer.querySelector("img")) || li.querySelector("picture") || li.querySelector("img");
      const bodyContainer = li.querySelector('.cards-card-body, [class*="body"]');
      const textContent = [];
      if (bodyContainer) {
        Array.from(bodyContainer.children).forEach((child) => textContent.push(child));
      } else {
        Array.from(li.querySelectorAll("p")).forEach((p) => {
          if (!imageContainer || !imageContainer.contains(p)) textContent.push(p);
        });
      }
      cells.push([image || "", textContent]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/gsu-storefront-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        // Auth sign-in drop-in (header > nav-auth-menu-panel > #auth-dropin-container)
        "#auth-dropin-container",
        ".auth-sign-in",
        ".authenticated-user-menu",
        "#generateCustomerToken",
        // Mini-cart drop-in (header > nav-tools > minicart-wrapper)
        ".minicart-wrapper",
        // Wishlist drop-in (header > nav-tools > wishlist-wrapper)
        ".wishlist-wrapper",
        // Search drop-in (header > nav-tools > search-wrapper, #search-bar-form)
        ".search-wrapper",
        "#search-bar-form",
        ".search-bar-result",
        // Account dropdown drop-in (header > nav-tools > dropdown-wrapper)
        ".dropdown-wrapper"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        ".header-wrapper",
        "nav#nav",
        ".nav-wrapper",
        "footer",
        ".footer-wrapper",
        // Safe leftover/non-authorable elements.
        "iframe",
        "link",
        "noscript",
        "source"
      ]);
      element.querySelectorAll(":scope > div.section").forEach((sec) => {
        const isBareSection = sec.classList.length === 1 && sec.classList.contains("section");
        const isEmpty = sec.textContent.trim() === "" && !sec.querySelector("img, picture, a, table, ul, h1, h2, h3, h4, h5, h6");
        if (isBareSection && isEmpty) {
          sec.remove();
        }
      });
    }
  }

  // tools/importer/transformers/gsu-storefront-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && Array.isArray(payload.template.sections) ? payload.template.sections : [];
      if (sections.length < 2) {
        return;
      }
      const doc = element.ownerDocument;
      const resolved = sections.map((section) => ({
        section,
        el: section.selector ? element.querySelector(section.selector) : null
      }));
      for (let i = resolved.length - 1; i >= 0; i -= 1) {
        const { section, el } = resolved[i];
        if (!el) {
          continue;
        }
        if (section.style) {
          const block = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          el.after(block);
        }
        if (i > 0 && el.previousElementSibling) {
          el.before(doc.createElement("hr"));
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-banner": parse,
    "columns-feature": parse2,
    "cards-feature": parse3
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Storefront homepage with hero, promotional banners and product widgets",
    urls: ["https://main--gsu-storefront--deepak269262.aem.live/"],
    blocks: [
      {
        name: "hero-banner",
        instances: [".hero-container .hero.block"]
      },
      {
        name: "columns-feature",
        instances: [".columns-container .columns.block"]
      },
      {
        name: "cards-feature",
        instances: [".cards-container .cards.block"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: ".section.hero-container",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Columns Feature",
        selector: ".section.columns-container",
        style: null,
        blocks: ["columns-feature"],
        defaultContent: [".columns-container .default-content-wrapper h3"]
      },
      {
        id: "section-3",
        name: "Cards Feature",
        selector: ".section.cards-container",
        style: "highlight",
        blocks: ["cards-feature"],
        defaultContent: [".cards-container .default-content-wrapper h3"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const {
        document,
        url,
        html,
        params
      } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath || "/index");
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
