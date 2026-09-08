/*
 * Transport module boundary.
 *
 * Phase 2 keeps the legacy runtime as a compatibility fallback while allowing
 * consumers to use the extracted data boundary and renderer incrementally.
 */
(function (root) {
  root.TravelTransport = Object.freeze({
    getData: function () {
      return root.TravelTransportData && typeof root.TravelTransportData.getItems === "function"
        ? root.TravelTransportData.getItems()
        : [];
    },
    createRenderer: function () {
      if (!root.TravelTransportRenderer) return null;
      return root.TravelTransportRenderer.create({
        data: this.getData(),
        state: root.state,
        $: root.$,
        $$: root.$$, 
        escapeHtml: root.escapeHtml,
        statusClass: root.statusClass,
        fmtCost: root.fmtCost
      });
    },
    render: function () {
      if (typeof root.renderTransport === "function") return root.renderTransport();
    }
  });
})(window);
