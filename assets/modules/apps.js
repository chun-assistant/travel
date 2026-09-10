/*
 * Ticket-app module boundary.
 *
 * Rendering is now owned by the extracted renderer; this module only exposes
 * the stable feature API and keeps the migration surface small.
 */
(function (root) {
  root.TravelApps = Object.freeze({
    getData: function () {
      return root.TravelAppsData && typeof root.TravelAppsData.getItems === "function"
        ? root.TravelAppsData.getItems()
        : [];
    },
    render: function () {
      if (!root.TravelAppsRenderer) return;
      return root.TravelAppsRenderer.create({ data: this.getData() })();
    }
  });
})(window);
