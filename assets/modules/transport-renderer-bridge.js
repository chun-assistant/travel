/*
 * Transport renderer bridge.
 *
 * Phase 2: switch only the transport page to the extracted renderer while
 * keeping common.js and all other pages untouched. The bridge is deliberately
 * defensive: if the extracted renderer or legacy dependencies are unavailable,
 * the original renderTransport function remains in place.
 */
(function (root) {
  if (!root.TravelTransportRenderer || typeof root.renderTransport !== "function") return;
  if (typeof root.APP_DATA === "undefined" || typeof root.state === "undefined") return;

  var legacyRenderTransport = root.renderTransport;

  root.renderTransport = function () {
    var filters = document.getElementById("transportFilters");
    var list = document.getElementById("transportList");
    if (!filters || !list) return legacyRenderTransport();

    var render = root.TravelTransportRenderer.create({
      data: Array.isArray(root.APP_DATA.transport) ? root.APP_DATA.transport : [],
      state: root.state,
      $: root.$,
      $$: root.$$, 
      escapeHtml: root.escapeHtml,
      statusClass: root.statusClass,
      fmtCost: root.fmtCost
    });

    return render();
  };
})(window);
