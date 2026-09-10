/*
 * Day 11 itinerary corrections.
 *
 * Keep these user-requested Day 11 data corrections isolated from the shared
 * runtime so the Daily feature can change without growing common modules.
 */
(function () {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.events)) return;

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 11) return;

    if (event.start === "07:30" && event.end === "07:45" &&
        event.title === "步行至集合地點") {
      event.title = "步行至集合地點Circle K Fr. Nansens Plass";
      event.place = "Fr Nansens plass 1, 9008 Tromsø, Norge";
      event.map = "https://www.google.com/maps/search/?api=1&query=Fr%20Nansens%20plass%201%2C%209008%20Troms%C3%B8%2C%20Norge";
      event.navigable = true;
    }

    if (event.start === "18:00" && event.end === "18:20" &&
        event.title === "返回市區、步行至晚餐點") {
      event.title = "返回市區、步行至晚餐點Raketten Bar & Pølse";
      event.place = "Storgata 94B, 9008 Tromsø";
      event.map = "https://www.google.com/maps/search/?api=1&query=Storgata%2094B%2C%209008%20Troms%C3%B8";
      event.navigable = true;
    }

    if (event.start === "18:45" && event.end === "19:15" &&
        event.title === "Tourist Shop Tromsø紀念品店") {
      event.place = "Storgata 94, 9008 Tromsø, 挪威";
      event.map = "https://www.google.com/maps/search/?api=1&query=Storgata%2094%2C%209008%20Troms%C3%B8%2C%20Norway";
      event.navigable = true;
    }

    if (event.start === "19:15" && event.end === "19:45" &&
        event.title === "Joker Storgatbakken超市採買") {
      event.place = "Storgata 132 F, 9008 Tromsø, 挪威";
      event.map = "https://www.google.com/maps/search/?api=1&query=Storgata%20132%20F%2C%209008%20Troms%C3%B8%2C%20Norway";
      event.navigable = true;
    }
  });
})();
