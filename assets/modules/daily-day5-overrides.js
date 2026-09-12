/* Day 5 itinerary presentation corrections.
 *
 * Keep this small user-requested Daily change isolated from the shared data
 * source so the core itinerary data remains unchanged.
 */
(function () {
  if (typeof APP_DATA === "undefined") return;

  if (Array.isArray(APP_DATA.overview)) {
    APP_DATA.overview.forEach(function (day) {
      if (day.day !== 5) return;
      day.highlight = "聖誕老人村(園區地圖)、郵局、證書、合照";
      day.highlightLinkText = "園區地圖";
      day.highlightLinkUrl = "https://drive.google.com/drive/folders/1D-GH7vMyl1cAW0uGQFbYiT0kYGm9l7Hh";
      day.note = "All About Salmon午餐；地址已更新";
    });
  }

  if (!Array.isArray(APP_DATA.events)) return;

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 5 || event.type !== "餐飲") return;

    var haystack = [event.title, event.place, event.note].join(" ");
    if (!/Salmon Place|Christmas House/i.test(haystack)) return;

    event.title = "All About Salmon午餐";
    event.place = "Tähtikuja 1, 96930 Rovaniemi, 芬蘭";
    event.navigable = true;
    event.navigationMap = "https://www.google.com/maps/search/?api=1&query=T%C3%A4htikuja%201%2C%2096930%20Rovaniemi%2C%20Finland";
  });
})();
