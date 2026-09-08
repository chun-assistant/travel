/*
 * Daily itinerary module.
 *
 * The public surface stays small so rendering can be migrated incrementally
 * without changing the existing page initialization order or UI.
 */
(function (root) {
  var data = root.TravelItineraryData;

  function getData() {
    data = root.TravelItineraryData || data;
    return data || { overview: [], events: [], countryStages: [] };
  }

  function getOverview() { return getData().overview || []; }
  function getEvents() { return getData().events || []; }
  function getCountryStages() { return getData().countryStages || []; }

  root.TravelDaily = Object.freeze({
    getOverview: getOverview,
    getEvents: getEvents,
    getCountryStages: getCountryStages
  });
})(window);
