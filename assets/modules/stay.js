/*
 * Stay module boundary.
 *
 * Safe migration step: expose accommodation data and renderer boundaries
 * without replacing the legacy common.js renderer yet. Intentionally inert.
 */
(function (root) {
  root.TravelStay = Object.freeze({
    getData: function () {
      return root.TravelStayData && typeof root.TravelStayData.getItems === "function"
        ? root.TravelStayData.getItems()
        : [];
    },
    createRenderer: function () {
      if (!root.TravelStayRenderer) return null;
      return root.TravelStayRenderer.create({
        data: this.getData(),
        $: root.$,
        $$: root.$$, 
        escapeHtml: root.escapeHtml,
        statusClass: root.statusClass,
        fmtTwd: root.fmtTwd,
        copyText: root.copyText,
        buildDirections: root.buildDirections,
        isAirportPlace: root.isAirportPlace,
        mapIcon: root.mapIcon,
        copyIcon: root.copyIcon
      });
    },
    render: function () {
      if (typeof renderHotels === "function") return renderHotels();
    }
  });
})(window);
