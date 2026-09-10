/*
 * Day 10 itinerary corrections.
 *
 * Keep these user-requested Day 10 data corrections isolated from the shared
 * runtime so the Daily feature can change without growing common modules.
 */
(function () {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.events)) return;

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
  });
})();
