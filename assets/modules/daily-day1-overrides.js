/*
 * Day 1 itinerary navigation controls.
 */
(function () {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.events)) return;

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 1) return;

    // 21:30–22:15: enable Current Location → destination navigation.
    if (event.start === "21:30" && event.end === "22:15") {
      event.navigable = true;
    }
  });
})();
