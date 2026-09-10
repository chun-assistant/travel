(() => {
  'use strict';

  // Shopping assets must load synchronously and in this order because the
  // budget page renderer reads the data immediately after this script.
  const sources = [
    '../assets/shopping-data.js?v=20260910-shopping1',
    '../assets/modules/shopping/finland-shopping-data.js?v=20260910-shopping1',
    '../assets/finland-shopping-extra.js?v=20260910-shopping1',
    '../assets/finland-shopping-assets.js?v=20260910-shopping1',
    '../assets/vienna-shopping-assets.js?v=20260910-shopping1'
  ];

  if (document.readyState !== 'loading') {
    throw new Error('Travel Shopping bootstrap must run while the document is loading.');
  }

  sources.forEach(src => {
    document.write(`<script src="${src}"></script>`);
  });
})();
