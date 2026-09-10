(() => {
  'use strict';

  const source = window.AURORA_SHOPPING_DATA;
  if (!source) return;

  // Finland-specific shopping data is intentionally isolated here.
  // Image paths and click/DOM behavior stay in finland-shopping-assets.js.
  window.TravelFinlandShoppingData = Object.freeze({
    source
  });
})();
