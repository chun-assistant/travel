/*
 * Transport data boundary.
 *
 * The current source of truth remains APP_DATA in common.js. This adapter
 * exposes the transport slice without changing the existing renderer.
 */
(function (root) {
  if (typeof APP_DATA === "undefined") return;

  root.TravelTransportData = Object.freeze({
    items: APP_DATA.transport || []
  });
})(window);
