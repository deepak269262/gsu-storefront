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

  // tools/importer/import-nav.js
  var import_nav_exports = {};
  __export(import_nav_exports, {
    default: () => import_nav_default
  });

  // tools/importer/parsers/nav.js
  var BRAND = { label: "Girl Scouts", href: "/" };
  var NAV_LINKS = [
    { label: "New", href: "/new" },
    {
      label: "Shop by Grade",
      href: "/shop-by-grade",
      children: [
        { label: "Daisies (K-1)", href: "/shop-by-grade/daisies" },
        { label: "Brownies (2-3)", href: "/shop-by-grade/brownies" },
        { label: "Juniors (4-5)", href: "/shop-by-grade/juniors" },
        { label: "Cadettes (6-8)", href: "/shop-by-grade/cadettes" }
      ]
    },
    { label: "Uniforms", href: "/uniforms" },
    { label: "Apparel & Accessories", href: "/apparel-accessories" },
    { label: "Badges, Patches & Awards", href: "/badges-patches-awards" },
    { label: "Gifts", href: "/gifts" },
    { label: "Toys & Outdoors", href: "/toys-outdoors" },
    { label: "Council", href: "/council" },
    { label: "Sale", href: "/sale" }
  ];
  function appendLink(document, parent, { label, href }, wrapInParagraph = false) {
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.title = label;
    anchor.textContent = label;
    if (wrapInParagraph) {
      const p = document.createElement("p");
      p.append(anchor);
      parent.append(p);
    } else {
      parent.append(anchor);
    }
    return anchor;
  }
  function parse(element, { document }) {
    const brand = document.createElement("div");
    appendLink(document, brand, BRAND, true);
    const sections = document.createElement("div");
    const list = document.createElement("ul");
    NAV_LINKS.forEach((link) => {
      const li = document.createElement("li");
      if (link.children && link.children.length) {
        const label = document.createElement("p");
        const strong = document.createElement("strong");
        const labelLink = document.createElement("a");
        labelLink.href = link.href;
        labelLink.title = link.label;
        labelLink.textContent = link.label;
        strong.append(labelLink);
        label.append(strong);
        li.append(label);
        const sub = document.createElement("ul");
        link.children.forEach((child) => {
          const subLi = document.createElement("li");
          appendLink(document, subLi, child);
          sub.append(subLi);
        });
        li.append(sub);
      } else {
        appendLink(document, li, link);
      }
      list.append(li);
    });
    sections.append(list);
    const tools = document.createElement("div");
    element.replaceChildren(
      brand,
      document.createElement("hr"),
      sections,
      document.createElement("hr"),
      tools
    );
  }

  // tools/importer/import-nav.js
  var PAGE_TEMPLATE = {
    name: "nav",
    description: "Site navigation fragment (Girl Scouts header)",
    urls: ["https://main--gsu-storefront--deepak269262.aem.live/nav"]
  };
  var import_nav_default = {
    transform: (payload) => {
      const { document, params } = payload;
      const main = document.body;
      try {
        parse(main, { document, url: payload.url, params });
      } catch (e) {
        console.error("Failed to parse nav:", e);
      }
      const path = "/nav";
      return [{
        element: main,
        path,
        report: {
          title: "Navigation",
          template: PAGE_TEMPLATE.name
        }
      }];
    }
  };
  return __toCommonJS(import_nav_exports);
})();
