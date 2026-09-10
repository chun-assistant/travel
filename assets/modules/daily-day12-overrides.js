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

    if (event.start === "12:15" && event.end === "12:30") {
      event.place = "Nordøstpassasjen 47, 9008, 9006 Tromsø, 挪威";
      event.map = "https://www.google.com/maps/search/?api=1&query=Nord%C3%B8stpassasjen%2047%2C%209008%2C%209006%20Troms%C3%B8%2C%20Norway";
      event.navigable = true;
    }

    if (event.start === "12:35" && event.end === "13:15") {
      event.place = "Gjøastredet 1, 9008 Tromsø, 挪威";
      event.map = "https://www.google.com/maps/search/?api=1&query=Gj%C3%B8astredet%201%2C%209008%20Troms%C3%B8%2C%20Norway";
      event.navigable = true;
    }

    if (event.start === "13:30" && event.end === "14:00") {
      event.type = "景點";
      event.place = "Nordøstpassasjen 33, 9008 Tromsø, 挪威";
      event.map = "https://www.google.com/maps/search/?api=1&query=Nord%C3%B8stpassasjen%2033%2C%209008%20Troms%C3%B8%2C%20Norway";
      event.navigable = true;
    }
  });
})();
