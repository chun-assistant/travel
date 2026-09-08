/*
 * Transport renderer bridge.
 *
 * Phase 2: switch only the transport page to the extracted renderer while
 * keeping common.js and all other pages untouched. The bridge is deliberately
 * defensive: if the extracted renderer or legacy dependencies are unavailable,
 * the original renderTransport function remains in place.
 */
(function (root) {
  if (typeof root.TravelTransportRenderer === "undefined") return;
  if (typeof renderTransport !== "function") return;
  if (typeof APP_DATA === "undefined" || typeof state === "undefined") return;

  var legacyRenderTransport = renderTransport;

  root.renderTransport = function () {
    var filters = document.getElementById("transportFilters");
    var list = document.getElementById("transportList");
    if (!filters || !list) return legacyRenderTransport();

    var render = root.TravelTransportRenderer.create({
      data: Array.isArray(APP_DATA.transport) ? APP_DATA.transport : [],
      state: state,
      $: typeof $ !== "undefined" ? $ : undefined,
      $$: typeof $$ !== "undefined" ? $$ : undefined,
      escapeHtml: typeof escapeHtml !== "undefined" ? escapeHtml : undefined,
      statusClass: typeof statusClass !== "undefined" ? statusClass : undefined,
      fmtCost: typeof fmtCost !== "undefined" ? fmtCost : undefined
    });

    return render();
  };
})(window);
