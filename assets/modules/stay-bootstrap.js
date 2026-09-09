/*
 * Stay page takeover bootstrap.
 *
 * Wires the dedicated Stay renderer after the legacy runtime has initialized.
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
