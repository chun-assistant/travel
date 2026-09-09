/*
 * Stay page takeover bootstrap.
 *
 * Wires the dedicated Stay renderer and its interaction layer after the legacy
 * runtime has initialized.
 */
(function (root) {
  function boot() {
    if (!root.TravelStay || typeof root.TravelStay.render !== "function") return;
    if (!document.getElementById("hotelList")) return;

    root.TravelStay.render();

    if (root.TravelStayInteractions && typeof root.TravelStayInteractions.bind === "function") {
      root.TravelStayInteractions.bind({
        copyText: root.copyText
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})(window);
