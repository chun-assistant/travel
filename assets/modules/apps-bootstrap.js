/*
 * Ticket-app page bootstrap.
 *
 * Runs after the legacy runtime so the feature can be removed from the legacy
 * initializer without changing page timing for unrelated sections.
 */
(function (root) {
  function boot() {
    if (!root.TravelApps || typeof root.TravelApps.render !== "function") return;
    if (!document.getElementById("ticketAppList")) return;
    root.TravelApps.render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})(window);
