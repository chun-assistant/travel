/*
 * Stay module boundary.
 *
 * Safe migration step: expose accommodation data and renderer boundaries.
 * The new renderer is preferred when explicitly loaded; otherwise the legacy
 * common.js renderer remains the fallback. This keeps the migration reversible.
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
      var renderer = this.createRenderer();
      if (renderer) return renderer();
      if (typeof renderHotels === "function") return renderHotels();
    }
  });
})(window);
