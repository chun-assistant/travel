/*
 * Stay page takeover bootstrap.
 *
 * Safe migration step: let the new Stay renderer replace the legacy DOM output
 * after the legacy runtime has initialized. The legacy renderer remains intact
 * as the rollback path until behavior is verified.
 */
(function (root) {
  function boot() {
    if (!root.TravelStay || typeof root.TravelStay.render !== "function") return;
    if (!document.getElementById("hotelList")) return;
    root.TravelStay.render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})(window);
