/*
 * Runtime module registry.
 *
 * Architecture-only step: this file records the migration surface without
 * loading or replacing any legacy runtime code. It is intentionally inert
 * until a page explicitly includes it.
 */
(function (root) {
  root.TravelModules = Object.freeze({
    version: 2,
    data: Object.freeze({
      itinerary: "assets/data/itinerary.js",
      transport: "assets/data/transport.js",
      flights: "assets/data/flights.js"
    }),
    modules: Object.freeze({
      daily: "assets/modules/daily.js",
      transport: "assets/modules/transport.js",
      transportRenderer: "assets/modules/transport-renderer.js",
      navigation: "assets/modules/navigation.js",
      reminders: "assets/modules/reminders.js",
      apps: "assets/modules/apps.js",
      packing: "assets/modules/packing.js",
      checklist: "assets/modules/checklist.js"
    })
  });
})(window);
