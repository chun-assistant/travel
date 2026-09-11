/*
 * Day 12 itinerary corrections.
 *
 * Keep these user-requested Day 12 data corrections isolated from the shared
 * runtime so the Daily feature can change without growing common modules.
 */
(function () {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.events)) return;

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 12) return;

    if (event.start === "11:00" && event.end === "12:00") {
      event.currency = "NOK";
      event.cost = 130;
    }

    if (event.start === "12:15") {
      event.currency = "NOK";
      event.cost = 0;
      event.navigable = true;
    }

    if (event.start === "12:35" && event.end === "13:15") {
      event.currency = "NOK";
      event.costDisplay = "Around NOK 100~200";
      event.navigable = true;
    }

    if (event.start === "13:30" && event.end === "14:00") {
      event.currency = "NOK";
      event.cost = 0;
      event.navigable = true;
    }

    if (event.start === "14:00" && event.end === "14:15") {
      event.title = "前往Tromsø Bridge";
      event.place = "Bruvegen, 9020 Tromsø, 挪威";
      event.transport = "步行";
      event.duration = "約15分鐘";
      event.currency = "NOK";
      event.cost = 0;
      event.navigable = true;
    }

    if (event.start === "14:15" && event.end === "15:10") {
      event.title = "Tromsø Bridge拍照";
      event.transport = "步行";
      event.duration = "約20-30分鐘";
      event.currency = "NOK";
      event.cost = 0;
      event.navigable = true;
    }

    if (event.start === "15:30" && event.end === "16:15") {
      event.transport = "步行";
      event.currency = "NOK";
      event.cost = 90;
    }

    if (event.start === "16:15" && event.end === "16:30") {
      event.transport = "步行";
      event.place = "Fjellheisen, Sollivegen 12, 9020 Tromsdalen, 挪威";
      event.currency = "NOK";
      event.cost = 0;
      event.navigable = true;
    }

    if (event.start === "16:30" && event.end === "17:30") {
      event.currency = "NOK";
      event.cost = 495;
    }

    if (event.start === "19:16" && event.end === "19:19") {
      event.start = "18:55";
      event.end = "19:10";
      event.duration = "約15分鐘";
    }

    if (event.start === "19:19" && event.end === "19:40") {
      event.start = "19:10";
      event.end = "19:40";
      event.duration = "約30分鐘";
      event.currency = "NOK";
      event.cost = 30;
      event.navigationMap = "https://maps.app.goo.gl/BqTcEoNoxSyvdhTX7";
      event.navigable = true;
    }

    if (event.start === "19:40" && event.end === "20:20") {
      event.currency = "NOK";
      event.cost = 0;
      event.place = "Storgata 102, 9008 Tromsø, 挪威";
      event.navigable = true;
    }

    if (event.start === "20:20" && event.end === "21:00") {
      event.transport = "步行";
      event.currency = "NOK";
      event.cost = 0;
      event.place = "Quality Hotel Grand Tromsø, Storgata 44, 9008 Tromsø, 挪威";
      event.navigable = true;
    }
  });
})();
