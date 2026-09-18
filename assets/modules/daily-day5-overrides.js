/* Day 5 itinerary navigation, map and timing corrections.
 *
 * Keep this small user-requested Daily change isolated from the shared data
 * source so the core itinerary data remains unchanged.
 */
(function () {
  if (typeof APP_DATA === "undefined") return;

  if (Array.isArray(APP_DATA.overview)) {
    APP_DATA.overview.forEach(function (day) {
      if (day.day !== 5) return;
      day.highlight = "聖誕老人村(園區地圖)、郵局、證書、合照";
      day.highlightLinkText = "聖誕老人村(園區地圖)";
      day.highlightLinkUrl = "https://santaclausvillage.info/wp-content/uploads/2025/12/Santa-claus-village-map.pdf";
      day.routeMapLinkUrl = "https://www.google.com/maps/d/edit?mid=1tLfT9lHD5HHm8VCKeyOa1s74Gr4Via8&usp=sharing";
      day.note = "Christmas House外帶三文魚湯；地址已更新";
    });
  }

  if (!Array.isArray(APP_DATA.events)) return;

  var day5 = APP_DATA.events.filter(function (event) {
    return event.day === 5;
  });

  var findEvent = function (start, end) {
    return day5.find(function (event) {
      return String(event.start) === start && String(event.end) === end;
    });
  };

  var breakfast = {
    day: 5,
    date: "2026-09-28",
    city: "羅瓦涅米",
    start: "06:50",
    end: "07:20",
    type: "住宿／休息",
    title: "整理行李並吃少量早餐",
    place: "VR Night Train 265",
    transport: "原地",
    duration: "30分鐘",
    currency: "EUR",
    cost: 0,
    costNote: "自備早餐",
    status: "已排定",
    ticket: "—",
    note: "少量進食、補水後整理行李準備下車",
    source: "行程調整"
  };

  var firstEvent = APP_DATA.events.findIndex(function (event) {
    return event.day === 5 && String(event.start) === "07:20" && String(event.end) === "07:50";
  });
  if (firstEvent >= 0 && !APP_DATA.events.some(function (event) {
    return event.day === 5 && String(event.start) === "06:50" && String(event.end) === "07:20";
  })) {
    APP_DATA.events.splice(firstEvent, 0, breakfast);
  }

  var event;

  event = findEvent("07:20", "07:50");
  if (event) {
    event.title = "抵達RVN火車站, 並從Waltti Mobile App購買公車票";
    event.duration = "30分鐘";
    event.transport = "站內／月台";
  }

  event = findEvent("07:50", "08:10");
  if (event) {
    event.place = "Rovaniemi rautatieasema piha";
    event.navigable = true;
    event.duration = "20分鐘";
  }

  event = findEvent("15:00", "16:30");
  if (event) {
    event.title = "中央廣場拍照打卡";
    event.place = "Rovaniemi, 96930 Pajakylä, 芬蘭";
    event.navigable = true;
    event.duration = "90分鐘";
  }

  event = findEvent("16:30", "17:15");
  if (event) {
    event.navigable = true;
    event.duration = "45分鐘";
  }

  event = findEvent("18:00", "19:15");
  if (event) {
    event.start = "18:10";
    event.end = "19:30";
    event.duration = "80分鐘";
  }

  var dinner = findEvent("18:10", "19:30");
  if (dinner) {
    dinner.duration = "80分鐘";
  }

  var christmasHouse = {
    day: 5,
    date: "2026-09-28",
    city: "羅瓦涅米",
    start: "17:15",
    end: "18:00",
    type: "晚餐",
    title: "前往Christmas House Restaurant, 外帶三文魚湯",
    place: "Tähtikuja 2a, 96930 Rovaniemi, 芬蘭",
    transport: "步行",
    duration: "45分鐘",
    currency: "EUR",
    cost: null,
    costNote: "現場購買",
    status: "已排定",
    ticket: "—",
    note: "Christmas House Café-Restaurant；外帶三文魚湯",
    source: "Santa Claus Village"
  };

  if (!APP_DATA.events.some(function (event) {
    return event.day === 5 && String(event.start) === "17:15" && String(event.end) === "18:00";
  })) {
    var insertAt = APP_DATA.events.findIndex(function (event) {
      return event.day === 5 && String(event.start) === "18:10" && String(event.end) === "19:30";
    });
    if (insertAt >= 0) APP_DATA.events.splice(insertAt, 0, christmasHouse);
    else APP_DATA.events.push(christmasHouse);
  }

  event = APP_DATA.events.find(function (event) {
    return event.day === 5 && String(event.start) === "18:00" && String(event.end) === "18:10";
  });
  if (!event) {
    var dinnerIndex = APP_DATA.events.findIndex(function (event) {
      return event.day === 5 && String(event.start) === "18:10" && String(event.end) === "19:30";
    });
    var hotelReturn = {
      day: 5,
      date: "2026-09-28",
      city: "羅瓦涅米",
      start: "18:00",
      end: "18:10",
      type: "交通",
      title: "返回飯店Nova Skyland Hotel",
      place: "Nova Skyland Hotel, Tähtikuja 6, 96930 Rovaniemi, 芬蘭",
      transport: "步行",
      duration: "10分鐘",
      currency: "EUR",
      cost: 0,
      costNote: "免費",
      status: "已排定",
      ticket: "—",
      note: "步行返回飯店",
      source: "行程調整",
      navigable: true
    };
    if (dinnerIndex >= 0) APP_DATA.events.splice(dinnerIndex, 0, hotelReturn);
    else APP_DATA.events.push(hotelReturn);
  } else {
    event.title = "返回飯店Nova Skyland Hotel";
    event.place = "Nova Skyland Hotel, Tähtikuja 6, 96930 Rovaniemi, 芬蘭";
    event.transport = "步行";
    event.duration = "10分鐘";
    event.currency = "EUR";
    event.cost = 0;
    event.navigable = true;
  }
  
  // Recalculate every Day 5 movement/stay duration from its displayed time range.
  var minutesFromTime = function (value) {
    var parts = String(value).split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
  };

  APP_DATA.events.forEach(function (event) {
    if (event.day !== 5 || !event.start || !event.end) return;

    var durationMinutes = minutesFromTime(event.end) - minutesFromTime(event.start);
    if (durationMinutes >= 0) {
      event.duration = durationMinutes + "分鐘";
    }
  });

})();
