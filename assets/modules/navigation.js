/*
 * Navigation module boundary.
 *
 * Keeps the existing navigation implementation untouched while providing a
 * stable place for the shared navigation logic to move to later.
 */
(function (root) {
  root.TravelNavigation = Object.freeze({
    render: function () {
      if (typeof renderNavigation === "function") renderNavigation();
    },
    goToDay: function (day) {
      if (typeof state === "undefined" || typeof renderDayView !== "function") return;
      state.day = Number(day);
      if (typeof save === "function") save("aurora-day", state.day);
      renderDayView();
    }
  });
})(window);
