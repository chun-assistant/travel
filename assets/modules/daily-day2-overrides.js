/*
 * Day 2 itinerary navigation and budget controls.
 */
(function () {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.events)) return;

  var navigationTimes = {
    "10:40-10:58": true,
    "11:00-11:10": true,
    "11:10-11:25": true,
    "13:00-14:30": true,
    "14:30-15:00": true,
    "15:00-15:15": true,
    "15:30-16:00": true,
    "18:00-18:20": true,
    "18:20-19:00": true,
    "19:00-19:20": true,
    "19:20-20:00": true
  };

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 2) return;

    var key = String(event.start || "") + "-" + String(event.end || "");

    // 08:00–08:20: use the supplied Google Maps route link exactly.
    if (key === "08:00-08:20") {
      event.navigationMap = "https://maps.app.goo.gl/cDGE2N4PwprRkKdk9";
      event.navigable = true;
    }

    // Requested Current Location → destination navigation.
    if (navigationTimes[key]) {
      event.navigable = true;
    }
  });

  // Day 2 total: display NT$5,273 and expose the route-map URL to the summary renderer.
  if (Array.isArray(APP_DATA.overview)) {
    APP_DATA.overview.forEach(function (day) {
      if (day.day !== 2) return;
      day.estimate = 5273;
      day.highlightLinkUrl = "https://www.google.com/maps/d/edit?mid=1-_hDuzB7Z-72GhpoaJr4PxBoL2QD6GI&usp=sharing";
    });
  }
})();
