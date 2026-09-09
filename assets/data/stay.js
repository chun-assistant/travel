/*
 * Stay data boundary.
 *
 * Safe migration step: keep APP_DATA as the source of truth and expose only
 * accommodation data. This module does not render or touch the DOM.
 */
(function (root) {
  if (typeof APP_DATA === "undefined") return;

  root.TravelStayData = Object.freeze({
    getItems: function () {
      return Array.isArray(APP_DATA.hotels) ? APP_DATA.hotels : [];
    }
  });
})(window);
