/*
 * Transport module boundary.
 *
 * Phase 1 keeps rendering in common.js. Consumers can migrate to this module
 * incrementally while the visible transport UI remains unchanged.
 */
(function (root) {
  root.TravelTransport = Object.freeze({
    getData: function () {
      return root.TravelTransportData
        ? root.TravelTransportData.items
        : [];
    },
    render: function () {
      if (typeof renderTransport === "function") renderTransport();
    }
  });
})(window);
