/*
 * Runtime module registry.
 *
 * Architecture-only step: this file records the migration surface without
 * loading or replacing any legacy runtime code. It is intentionally inert
 * until a page explicitly includes it.
 */
(function (root) {
  root.TravelModules = Object.freeze({
    version: 9,
    data: Object.freeze({
      itinerary: "assets/data/itinerary.js",
      transport: "assets/data/transport.js",
      flights: "assets/data/flights.js",
      stay: "assets/data/stay.js",
      apps: "assets/data/apps.js"
    }),
    modules: Object.freeze({
      runtimeUtils: "assets/modules/runtime-utils.js",
      daily: "assets/modules/daily.js",
      transport: "assets/modules/transport.js",
      transportRenderer: "assets/modules/transport-renderer.js",
      transportDataEnhancements: "assets/modules/transport-data-enhancements.js",
      transportEnhancements: "assets/modules/transport-enhancements.js",
      transportFilters: "assets/modules/transport-filters.js",
      stay: "assets/modules/stay.js",
      stayRenderer: "assets/modules/stay-renderer.js",
      navigation: "assets/modules/navigation.js",
      reminders: "assets/modules/reminders.js",
      apps: "assets/modules/apps.js",
      appsRenderer: "assets/modules/apps-renderer.js",
      appsBootstrap: "assets/modules/apps-bootstrap.js",
      packing: "assets/modules/packing.js",
      checklist: "assets/modules/checklist.js"
    })
  });
})(window);
