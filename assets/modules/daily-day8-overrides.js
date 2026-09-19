/*
 * Day 8 itinerary corrections.
 *
 * Keep this user-requested Day 8 change isolated from the shared runtime.
 */
(function (root) {
  if (typeof APP_DATA === "undefined") return;
  if (!Array.isArray(APP_DATA.events)) return;

  APP_DATA.events.forEach(function (event) {
    if (
      event.day === 8 &&
      event.start === "11:00" &&
      event.end === "12:15"
    ) {
      event.title = "Ivalo市區尋覓點心或短逛 (Hannan pizza)";
      event.place = "Ivalontie 12, 99800 Inari, 芬蘭";
      event.map = "https://www.google.com/maps/search/?api=1&query=Ivalontie%2012%2C%2099800%20Inari%2C%20Finland";
      event.navigable = true;
    }
  });
})(window);
