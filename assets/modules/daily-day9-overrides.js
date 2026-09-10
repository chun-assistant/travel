/*
 * Day 9 itinerary corrections.
 *
 * Keep these user-requested Day 9 data corrections isolated from the shared
 * runtime so the Daily feature can change without growing common modules.
 */
(function (root) {
  if (typeof APP_DATA === "undefined" || !Array.isArray(APP_DATA.events)) return;

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 9) return;

    if (event.start === "09:30芬蘭" && event.end === "13:00挪威" &&
        event.title === "20人座包車跨芬蘭／挪威邊境") {
      event.title = "20人座包車跨芬蘭／挪威邊境、簡單午餐";
    }

    if (event.start === "13:00" && event.end === "14:00" &&
        event.title === "飯店寄放行李、簡單午餐") {
      event.title = "飯店寄放行李";
    }

    if (event.start === "16:50" && event.end === "17:00" &&
        event.title === "前往港口") {
      event.transport = "步行";
    }

    if (event.start === "17:30" && event.end === "19:00" &&
        event.title === "Thon Hotel帝王蟹晚餐：2份帝王蟹＋1份帝王蟹沙拉＋1份鮮蝦") {
      event.transport = "步行";
    }

    if (event.start === "19:00" && event.end === "19:30" &&
        event.title === "返回飯店放東西、入住") {
      event.transport = "步行";
    }
  });
})(window);
