/*
 * Flight data boundary.
 *
 * The current source of truth remains APP_DATA in common.js. This adapter
 * exposes the flight slice without changing existing rendering or behavior.
 */
(function (root) {
  if (typeof APP_DATA === "undefined") return;

  root.TravelFlightData = Object.freeze({
    items: APP_DATA.flights || []
  });
})(window);
