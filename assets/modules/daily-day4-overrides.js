/* Day 4 itinerary navigation, ticket status and route-map controls. */
(function () {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.events)) return;

  var navigationTimes = {
    "08:50-09:05": true,
    "10:05-10:20": true,
    "12:15-13:10": true,
    "17:30-18:00": true,
    "18:00-18:20": true,
    "18:45-19:00": true
  };

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 4) return;
    var key = String(event.start || "") + "-" + String(event.end || "");

    if (navigationTimes[key]) event.navigable = true;

    if (key === "14:44-14:47") {
      event.navigationMap = "https://maps.app.goo.gl/mDWpHPiuMhNVWLNt6";
      event.navigable = true;
    }

    if (key === "14:47-14:59") event.status = "現場購票";

    if (key === "18:30-18:45") {
      event.place = "Vilhonkatu 13, 00100 Helsinki, 芬蘭";
      event.navigable = true;
    }
  });

  if (Array.isArray(APP_DATA.overview)) {
    APP_DATA.overview.forEach(function (day) {
      if (day.day === 4) {
        day.highlightLinkUrl = "https://www.google.com/maps/d/edit?mid=1ynWVIc8YaswYxsJogKpkqDtahGHH3rU&usp=sharing";
      }
    });
  }
})();