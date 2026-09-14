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

  // Day 1: add a small purchase-ticket action to the day card.
  if (Array.isArray(APP_DATA.overview)) {
    APP_DATA.overview.forEach(function (day) {
      if (day.day !== 1) return;
      day.ticketLinkUrl = "https://www.oebb.at/en/tickets-kundenkarten/online-mobile-ticketing/oebb-app";
    });
  }
})();
