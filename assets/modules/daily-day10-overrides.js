/*
 * Day 10 itinerary corrections.
 *
 * Keep these user-requested Day 10 data corrections isolated from the shared
 * runtime so the Daily feature can change without growing common modules.
 */
(function () {
  if (typeof APP_DATA === "undefined") return;

  if (Array.isArray(APP_DATA.overview)) {
    APP_DATA.overview.forEach(function (day) {
      if (day.day === 10) {
        day.routeMapLinkUrl = "https://www.google.com/maps/d/edit?mid=1xZqakY_4SgEOfDh1ASYpE6B3oQDTYJ4&usp=sharing";
      }
    });
  }

  if (!Array.isArray(APP_DATA.events)) return;

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 10) return;

    if (event.start === "11:50" && event.end === "12:08" &&
        event.title === "Flybussen至第3站Storgata") {
      event.start = "11:30";
      event.end = "11:48";
      event.title = "機場快線第3站Storgata下車 (備案一般公車40/42號, 往市中心 Sentrum 方向於第8站 Wi-To下車）";
    }

    if (event.start === "12:10" && event.end === "12:40" &&
        event.title === "Quality Hotel Grand寄放行李") {
      event.start = "12:00";
      event.end = "12:40";
    }

    // 11:30–11:48: mark the Flybussen ticket as online purchase.
    if (event.start === "11:30" && event.end === "11:48" &&
        event.title.indexOf("機場快線第3站Storgata下車") === 0) {
      event.status = "網路購票";
    }

    // User-requested navigation links.
    if (
      (event.start === "12:45" && event.end === "13:10") ||
      (event.start === "13:15" && event.end === "14:30") ||
      (event.start === "15:20" && event.end === "15:35") ||
      (event.start === "15:40" && event.end === "16:00") ||
      (event.start === "16:15" && event.end === "16:40") ||
      (event.start === "16:50" && event.end === "17:15") ||
      (event.start === "17:20" && event.end === "17:40") ||
      (event.start === "17:40" && event.end === "18:00") ||
      (event.start === "18:20" && event.end === "18:30") ||
      (event.start === "18:30" && event.end === "18:50") ||
      (event.start === "19:15" && event.end === "20:00") ||
      (event.start === "20:00" && event.end === "21:00")
    ) {
      event.navigable = true;
    }
  });

  // Recalculate every Day 10 movement/stay duration from its displayed time range.
  var minutesFromTime = function (value) {
    var parts = String(value).split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
  };

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 10 || !event.start || !event.end) return;

    var durationMinutes = minutesFromTime(event.end) - minutesFromTime(event.start);
    if (durationMinutes >= 0) {
      event.duration = durationMinutes + "分鐘";
    }
  });
})();
