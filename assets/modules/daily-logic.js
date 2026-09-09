/* Daily pure logic helpers. */
(function (root) {
  function getStageForDay(day, countryStages) {
    var stages = countryStages || [];
    return stages.find(function (stage) {
      return day >= stage.start && day <= stage.end;
    }) || null;
  }

  function filterKind(type) {
    var t = String(type || "");
    if (/餐|早餐|午餐|晚餐|甜點|購物|市場/.test(t)) return "餐飲";
    if (/住宿|休息|退房|入住/.test(t)) return "住宿";
    if (/景點|活動|極光|拍照/.test(t)) return "景點";
    if (/交通|航班|接送|公車|火車|巴士|候車|機場/.test(t)) return "交通";
    return "其他";
  }

  function getCountryLabel(country) {
    var code = {
      "奧地利": "奧地利 (Austria)",
      "芬蘭": "芬蘭 (Finland)",
      "挪威": "挪威 (Norway)",
      "荷蘭": "荷蘭 (Netherlands)"
    };
    return code[country] || country;
  }

  function dateLabel(iso) {
    if (!iso) return "";
    var d = new Date(String(iso) + "T12:00:00");
    return (d.getMonth() + 1) + "/" + d.getDate() + "（" + "日一二三四五六"[d.getDay()] + "）";
  }

  root.TravelDailyLogic = Object.freeze({
    getStageForDay: getStageForDay,
    filterKind: filterKind,
    getCountryLabel: getCountryLabel,
    dateLabel: dateLabel
  });
})(window);
