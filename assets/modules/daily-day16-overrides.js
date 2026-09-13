/*
 * Day 16 itinerary corrections and navigation controls.
 */
(function () {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.events)) return;

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 16) return;

    // 06:45–07:30: explicit EUR 0 cost.
    if (event.start === "06:45" && event.end === "07:30") {
      event.currency = "EUR";
      event.cost = 0;
    }

    // 07:30–07:45: use the supplied Google Maps navigation link.
    if (event.start === "07:30" && event.end === "07:45") {
      event.navigationMap = "https://maps.app.goo.gl/cdUmbxozyj5h7Veh7";
      event.navigable = true;
    }

    // 07:55–08:15 → 07:55–08:19, EUR 10, same supplied navigation link.
    if (event.start === "07:55" && event.end === "08:15") {
      event.start = "07:55";
      event.end = "08:19";
      event.duration = "約24分鐘";
      event.currency = "EUR";
      event.cost = 10;
      event.navigationMap = "https://maps.app.goo.gl/cdUmbxozyj5h7Veh7";
      event.navigable = true;
    }

    // Current location → destination address.
    if (event.start === "12:00" && event.end === "12:30") {
      event.navigable = true;
    }
    if (event.start === "12:30" && event.end === "12:50") {
      event.navigable = true;
    }
    if (event.start === "12:50" && event.end === "13:10") {
      event.navigable = true;
    }
    if (event.start === "13:10" && event.end === "13:30") {
      event.navigable = true;
    }

    // 13:33–13:50: EUR 1.53 and the supplied Google Maps navigation link.
    if (event.start === "13:33" && event.end === "13:50") {
      event.currency = "EUR";
      event.cost = 1.53;
      event.navigationMap = "https://maps.app.goo.gl/gYgGYRZ1yzNEuWbYA";
      event.navigable = true;
    }

    // Current location → destination address.
    if (event.start === "14:20" && event.end === "14:45") {
      event.navigable = true;
    }
    if (event.start === "14:50" && event.end === "15:05") {
      event.navigable = true;
    }
    if (event.start === "16:10" && event.end === "16:30") {
      event.navigable = true;
    }
    if (event.start === "16:30" && event.end === "17:00") {
      event.navigable = true;
    }

    // 20:40–21:30: display the EUR 2.3–3.4 range while keeping cost numeric.
    if (event.start === "20:40" && event.end === "21:30") {
      event.currency = "EUR";
      event.cost = 2.3;
      event.costDisplay = "EUR 2.3~3.4";
    }
  });
})();
