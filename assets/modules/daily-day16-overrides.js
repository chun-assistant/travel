/*
 * Day 16 itinerary corrections and navigation controls.
 */
(function () {
  if (typeof APP_DATA === "undefined") return;

  if (Array.isArray(APP_DATA.overview)) {
    APP_DATA.overview.forEach(function (day) {
      if (day.day === 16) {
        day.routeMapLinkUrl = "https://www.google.com/maps/d/edit?mid=1A6bqMjiz3N9w0de81u-f_0z2N48miTA&usp=sharing";
      }
    });
  }

  if (!Array.isArray(APP_DATA.events)) return;

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 16) return;

    // 06:45–07:30: explicit EUR 0 cost and exact 45-minute duration.
    if (event.start === "06:45" && event.end === "07:30") {
      event.currency = "EUR";
      event.cost = 0;
      event.duration = "45分鐘";
    }

    // 07:30–07:45: supplied navigation link; 15-minute transfer.
    if (event.start === "07:30" && event.end === "07:45") {
      event.duration = "15分鐘";
      event.navigationMap = "https://maps.app.goo.gl/cdUmbxozyj5h7Veh7";
      event.navigable = true;
    }

    // 07:55–08:15 → 07:55–08:19, EUR 10, same supplied navigation link.
    if (event.start === "07:55" && event.end === "08:15") {
      event.start = "07:55";
      event.end = "08:19";
      event.duration = "24分鐘";
      event.currency = "EUR";
      event.cost = 10;
      event.navigationMap = "https://maps.app.goo.gl/cdUmbxozyj5h7Veh7";
      event.navigable = true;
    }

    // 07:55–08:19: payment is by contactless credit card.
    if (event.start === "07:55" && event.end === "08:19") {
      event.status = "感應信用卡";
    }

    // Updated Amsterdam addresses + exact itinerary durations.
    if (event.start === "12:00" && event.end === "12:30") {
      event.place = "Eerste van der Helststraat 60, 1072 NX Amsterdam, 荷蘭";
      event.duration = "30分鐘";
      event.navigable = true;
    }
    if (event.start === "12:30" && event.end === "12:50") {
      event.place = "Albert Cuypstraat 161, 1073 BD Amsterdam, 荷蘭";
      event.duration = "20分鐘";
      event.navigable = true;
    }
    if (event.start === "12:50" && event.end === "13:10") {
      event.place = "Albert Cuyp Straat, t/o 182, 1073 BK Amsterdam, 荷蘭";
      event.duration = "20分鐘";
      event.navigable = true;
    }
    if (event.start === "13:10" && event.end === "13:30") {
      event.duration = "20分鐘";
      event.navigable = true;
    }

    // 13:33–13:50: EUR 1.53 and the supplied Google Maps navigation link.
    if (event.start === "13:33" && event.end === "13:50") {
      event.currency = "EUR";
      event.cost = 1.53;
      event.duration = "17分鐘";
      event.navigationMap = "https://maps.app.goo.gl/gYgGYRZ1yzNEuWbYA";
      event.navigable = true;
      event.status = "感應信用卡";
    }

    if (event.start === "14:20" && event.end === "14:45") {
      event.place = "Spui 7a, 1012 WX Amsterdam, 荷蘭";
      event.duration = "25分鐘";
      event.navigable = true;
    }
    if (event.start === "14:50" && event.end === "15:05") {
      event.place = "Rokin 17, 1012 KK Amsterdam, 荷蘭";
      event.duration = "15分鐘";
      event.navigable = true;
    }
    if (event.start === "16:10" && event.end === "16:30") {
      event.duration = "20分鐘";
      event.navigable = true;
    }
    if (event.start === "16:30" && event.end === "17:00") {
      event.duration = "30分鐘";
      event.navigable = true;
    }

    // 20:40–21:30: display the EUR 2.3–3.4 range while keeping cost numeric.
    if (event.start === "20:40" && event.end === "21:30") {
      event.currency = "EUR";
      event.cost = 2.3;
      event.costDisplay = "EUR 2.3~3.4";
      event.duration = "50分鐘";
      event.status = "感應信用卡";
    }
  });
})();
