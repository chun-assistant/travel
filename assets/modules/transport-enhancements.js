/*
 * Transport page enhancements.
 *
 * This file owns only page initialization and renderer wiring. Transport data
 * normalization lives in transport-data-enhancements.js so data and UI logic
 * can be migrated independently without changing the current page behavior.
 */
(function (root) {
  function renderTransportPage() {
    if (!root.TravelTransportRenderer) return;
    var filters = document.getElementById('transportFilters');
    var list = document.getElementById('transportList');
    if (!filters || !list) return;

    var render = root.TravelTransportRenderer.create({
      data: root.TravelTransportData && typeof root.TravelTransportData.getItems === 'function'
        ? root.TravelTransportData.getItems()
        : [],
      state: typeof state !== 'undefined' ? state : {},
      $: typeof $ !== 'undefined' ? $ : undefined,
      $$: typeof $$ !== 'undefined' ? $$ : undefined,
      escapeHtml: typeof escapeHtml !== 'undefined' ? escapeHtml : undefined,
      statusClass: typeof statusClass !== 'undefined' ? statusClass : undefined,
      fmtCost: typeof fmtCost !== 'undefined' ? fmtCost : undefined
    });

    if (typeof render === 'function') render();
  }

  function init() {
    if (root.TravelTransportDataEnhancements &&
        typeof root.TravelTransportDataEnhancements.apply === 'function') {
      root.TravelTransportDataEnhancements.apply();
    }

    if (root.TravelTransportData &&
        typeof root.TravelTransportData.getItems === 'function') {
      renderTransportPage();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})(window);
