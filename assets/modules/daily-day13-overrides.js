/*
 * Day 13 itinerary corrections.
 */
(function () {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.events)) return;
  APP_DATA.events.forEach(function (event) {
    if (event.day !== 13) return;
    if (event.start === "15:30" && event.end === "16:00") {
      event.currency = "NOK";
      event.costDisplay = "Around NOK 200-250";
    }
    if (event.start === "16:00" && event.end === "17:00") event.navigable = true;
    if (event.start === "18:30" && event.end === "19:00") event.navigable = true;
  });
})();
