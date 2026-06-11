/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import navParser from './parsers/nav.js';

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'nav',
  description: 'Site navigation fragment (Girl Scouts header)',
  urls: ['https://main--gsu-storefront--deepak269262.aem.live/nav'],
};

export default {
  transform: (payload) => {
    const { document, params } = payload;
    const main = document.body;

    // The nav parser rewrites the whole nav body into brand/sections/tools.
    try {
      navParser(main, { document, url: payload.url, params });
    } catch (e) {
      console.error('Failed to parse nav:', e);
    }

    const path = '/nav';

    return [{
      element: main,
      path,
      report: {
        title: 'Navigation',
        template: PAGE_TEMPLATE.name,
      },
    }];
  },
};
