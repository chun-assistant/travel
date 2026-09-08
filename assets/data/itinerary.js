/*
 * Itinerary data boundary.
 *
 * Phase 1 of the common.js refactor: keep the existing APP_DATA as the
 * single source of truth and expose only the itinerary-related slices.
 *
 * This file intentionally does not render or mutate the UI.
 * The legacy runtime remains responsible for rendering until its dependent
 * functions are migrated in a later phase.
 */
(function (root) {
  if (typeof APP_DATA === "undefined") return;

  root.TravelItineraryData = Object.freeze({
    overview: APP_DATA.overview,
    events: APP_DATA.events,
    countryStages: typeof COUNTRY_STAGES !== "undefined" ? COUNTRY_STAGES : []
  });
})(window);
