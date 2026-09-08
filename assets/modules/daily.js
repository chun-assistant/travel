/*
 * Daily itinerary module boundary.
 *
 * Phase 1 deliberately contains no rendering or event binding. It exposes
 * the daily runtime surface so the implementation can be moved out of
 * common.js incrementally without changing script timing or UI behavior.
 */
(function (root) {
  var data = root.TravelItineraryData;

  root.TravelDaily = Object.freeze({
    getOverview: function () { return data ? data.overview : []; },
    getEvents: function () { return data ? data.events : []; },
    getCountryStages: function () { return data ? data.countryStages : []; }
  });
})(window);
