/*
 * Stay page takeover bootstrap.
 *
 * Wires the dedicated Stay renderer and interaction layer after the legacy
 * runtime has initialized.
 */
(function (root) {
  var current = document.currentScript;
  var src = current && current.src;
  var base = src ? src.slice(0, src.lastIndexOf("/") + 1) : "";
  var interactionsSrc = base + "stay-interactions.js";

  function loadInteractions() {
    if (root.TravelStayInteractions) return true;
    if (document.readyState === "loading" && document.write) {
      document.write('<script src="' + interactionsSrc + '"><\\/script>');
      return !!root.TravelStayInteractions;
    }
    return false;
  }

  loadInteractions();

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
