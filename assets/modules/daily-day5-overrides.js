/* Day 5 itinerary presentation corrections.
 *
 * Keep this small user-requested Daily change isolated from the shared data
 * source so the core itinerary data remains unchanged.
 */
(function () {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.overview)) return;

  APP_DATA.overview.forEach(function (day) {
    if (day.day !== 5) return;
    day.highlight = "聖誕老人村(園區地圖)、郵局、證書、合照";
    day.highlightLinkText = "園區地圖";
    day.highlightLinkUrl = "https://drive.google.com/drive/folders/1D-GH7vMyl1cAW0uGQFbYiT0kYGm9l7Hh";
  });
})();
