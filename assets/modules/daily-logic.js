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

  root.TravelDailyLogic = Object.freeze({
    getStageForDay: getStageForDay,
    filterKind: filterKind
  });
})(window);
