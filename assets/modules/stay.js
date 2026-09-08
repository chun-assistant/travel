/*
 * Stay module boundary.
 *
 * Safe migration step: expose accommodation data through a dedicated module
 * without replacing the legacy common.js renderer yet. Intentionally inert.
 */
(function (root) {
  root.TravelStay = Object.freeze({
    getData: function () {
      return root.TravelStayData && typeof root.TravelStayData.getItems === "function"
        ? root.TravelStayData.getItems()
        : [];
    },
    render: function () {
      if (typeof renderHotels === "function") return renderHotels();
    }
  });
})(window);
