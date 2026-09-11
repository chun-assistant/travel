/*
 * Day 15 itinerary corrections.
 */
(function () {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.events)) return;

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 15) return;

    if (event.start === "07:00" && event.end === "08:15") {
      event.start = "07:00";
      event.end = "07:50";
      event.duration = "約50分鐘";
    }

    if (event.start === "08:15" && event.end === "08:40") {
      event.start = "07:50";
      event.end = "08:10";
      event.duration = "約20分鐘";
    }

    if (event.start === "08:50" && event.end === "09:09") {
      event.start = "08:10";
      event.end = "08:35";
      event.title = "步行6分鐘至Storgata站、等Flybussen";
      event.duration = "步行約6分鐘＋等車約19分鐘";
      event.navigationMap = "https://maps.app.goo.gl/ShV6Mp9KMktpaLfH7";
      event.navigable = true;
    }

    if (event.start === "09:09" && event.end === "09:30") {
      event.start = "08:39";
      event.end = "09:00";
      event.duration = "約21分鐘";
    }

    if (event.start === "09:30" && event.end === "11:10") {
      event.start = "09:00";
      event.end = "11:10";
      event.duration = "約2小時10分鐘";
    }

    if (event.start === "18:25" && event.end === "19:00") {
      event.start = "18:25";
      event.end = "20:00";
      event.duration = "約1小時35分鐘";
    }

    if (event.start === "19:00" && event.end === "19:12") {
      event.start = "20:09";
      event.end = "20:21";
      event.duration = "約12分鐘";
    }

    if (event.start === "19:12" && event.end === "19:25") {
      event.start = "20:21";
      event.end = "20:30";
      event.duration = "約9分鐘";
    }

    if (event.start === "19:25" && event.end === "19:40") {
      event.start = "20:30";
      event.end = "20:45";
      event.duration = "約15分鐘";
    }

    if (event.start === "19:40" && event.end === "20:30") {
      event.start = "20:55";
      event.end = "21:35";
      event.duration = "約40分鐘";
    }

    if (event.start === "20:30" && event.end === "21:30") {
      event.start = "21:35";
      event.end = "21:45";
      event.duration = "約10分鐘";
    }
  });
})();
