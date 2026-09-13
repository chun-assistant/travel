/*
 * Day 17 itinerary corrections and navigation controls.
 */
(function () {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.events)) return;

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 17) return;

    // 06:45–06:55: enable start navigation with the supplied Google Maps link.
    if (event.start === "06:45" && event.end === "06:55") {
      event.navigationMap = "https://maps.app.goo.gl/gpT6c7vkb8pFuJQC7";
      event.navigable = true;
    }
  });
})();
