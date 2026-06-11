/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import footerParser from './parsers/footer.js';

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'footer',
  description: 'Site footer fragment (Girl Scouts footer)',
  urls: ['https://main--gsu-storefront--deepak269262.aem.live/footer'],
};

export default {
  transform: (payload) => {
    const { document, params } = payload;
    const main = document.body;

    try {
      footerParser(main, { document, url: payload.url, params });
    } catch (e) {
      console.error('Failed to parse footer:', e);
    }

    const path = '/footer';

    return [{
      element: main,
      path,
      report: {
        title: 'Footer',
        template: PAGE_TEMPLATE.name,
      },
    }];
  },
};
