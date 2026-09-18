(function () {
  if (typeof APP_DATA === "undefined") return;

  var day = APP_DATA.overview && APP_DATA.overview.find(function (item) { return item.day === 6; });
  if (day) day.routeMapLinkUrl = "https://www.google.com/maps/d/edit?mid=1FjtYr0OieHPWdJNUxzX9qVK9Jk7QSGE&usp=sharing";

  var events = APP_DATA.events.filter(function (event) { return event.day === 6; });
  function findByTitle(text) {
    return events.find(function (event) { return String(event.title || "").indexOf(text) >= 0; });
  }
  function findEvent(start, end) {
    return events.find(function (event) { return String(event.start) === start && String(event.end) === end; });
  }
  function minutesFromTime(value) {
    var parts = String(value).split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
  }

  var event = findEvent("10:45", "11:10");
  if (event) {
    event.navigable = true;
    event.navigationMap = "https://www.google.com/maps/d/edit?mid=1tLfT9lHD5HHm8VCKeyOa1s74Gr4Via8&usp=sharing";
  }

  // Put the evening records in the same order as their displayed times.
  var sMarket = findByTitle("S-market採買");
  var pub = findByTitle("Pubi.fi一般披薩");
  if (sMarket && pub) {
    sMarket.start = "18:30";
    sMarket.end = "19:15";
    sMarket.navigable = true;

    pub.start = "17:30";
    pub.end = "18:20";
    pub.navigable = true;

    var sMarketIndex = APP_DATA.events.indexOf(sMarket);
    var pubIndex = APP_DATA.events.indexOf(pub);
    if (sMarketIndex >= 0 && pubIndex >= 0 && sMarketIndex < pubIndex) {
      APP_DATA.events[sMarketIndex] = pub;
      APP_DATA.events[pubIndex] = sMarket;
    }
  }

  if (!findEvent("19:15", "19:35")) {
    var returnEvent = {
      day: 6,
      date: "2026-09-29",
      city: "伊瓦洛",
      start: "19:15",
      end: "19:35",
      type: "交通",
      title: "返回飯店Kultahippu Hotel & Apartments",
      place: "Petsamontie 1, 99800 Inari, 芬蘭",
      transport: "步行",
      duration: "20分鐘",
      currency: "EUR",
      cost: 0,
      costNote: "免費",
      status: "已排定",
      ticket: "—",
      note: "晚餐後返回飯店",
      navigable: true
    };
    var insertAt = APP_DATA.events.findIndex(function (item) {
      return item.day === 6 && String(item.start) === "20:00";
    });
    if (insertAt < 0) insertAt = APP_DATA.events.length;
    APP_DATA.events.splice(insertAt, 0, returnEvent);
  }

  // Keep every Day 6 duration exactly aligned with its displayed time range.
  APP_DATA.events.forEach(function (item) {
    if (item.day !== 6 || !item.start || !item.end) return;
    var durationMinutes = minutesFromTime(item.end) - minutesFromTime(item.start);
    if (durationMinutes >= 0) item.duration = durationMinutes + "分鐘";
  });
})();