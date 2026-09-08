/*
 * Transport data boundary.
 *
 * APP_DATA in common.js remains the source of truth. Resolve the array at
 * access time so page-specific enhancements that replace APP_DATA.transport
 * cannot leave this adapter holding a stale array reference.
 */
(function (root) {
  root.TravelTransportData = Object.freeze({
    getItems: function () {
      return typeof root.APP_DATA !== "undefined" && Array.isArray(root.APP_DATA.transport)
        ? root.APP_DATA.transport
        : [];
    }
  });
})(window);
