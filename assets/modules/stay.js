/*
 * Stay module boundary.
 *
 * Stay rendering is owned by the dedicated renderer module. The common runtime
 * remains available for shared utilities, but is no longer a Stay fallback.
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
    }
  });
})(window);
