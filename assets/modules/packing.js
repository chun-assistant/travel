/*
 * Packing module boundary.
 *
 * The legacy runtime continues to own packing data and rendering until all
 * dependent checklist/storage behavior has been mapped and extracted safely.
 */
(function (root) {
  root.TravelPacking = Object.freeze({
    getGroups: function () {
      return typeof PACKING_GROUPS !== "undefined" ? PACKING_GROUPS : [];
    },
    render: function () {
      if (typeof renderChecklist === "function") renderChecklist();
    }
  });
})(window);
