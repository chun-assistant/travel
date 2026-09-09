(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHtml = window.TravelCommonUtils.escapeHtml;

  function currentTripDay() {
    const today = new Date(); today.setHours(12, 0, 0, 0);
    const start = new Date("2026-09-24T12:00:00");
    const end = new Date("2026-10-11T12:00:00");
    if (today < start) return 1;
    if (today > end) return 18;
    return Math.min(18, Math.max(1, Math.round((today - start) / 86400000) + 1));
  }

  function renderCountdown() {
    const today = new Date(); today.setHours(12, 0, 0, 0);
    const start = new Date("2026-09-24T12:00:00"), end = new Date("2026-10-11T12:00:00");
    if (today < start) {
      $("#countdownValue").textContent = `${Math.ceil((start - today) / 86400000)} 天`;
      $("#countdownLabel").textContent = "距離出發";
    } else if (today <= end) {
      $("#countdownValue").textContent = `Day ${currentTripDay()}`;
      $("#countdownLabel").textContent = "旅程進行中";
    } else {
      $("#countdownValue").textContent = "完成";
      $("#countdownLabel").textContent = "旅程回憶";
    }
  }

  function renderNetwork() {
    const online = navigator.onLine;
    $("#networkBadge").classList.toggle("offline", !online);
    $("#networkBadge span").textContent = online ? "地圖可開啟" : "離線可查看";
  }

  function renderNotices() {
    const notices = [
      ["🚆", "9/25機場交通已修正", "VIE搭REX7／Railjet至Wien Hbf，再轉U1；不是機場接送。"],
      ["⛪", "9/27白教堂週日時段", "09:15先拍外觀；若要入內，依官方週日12:00後時段回訪。"],
      ["🍽️", "餐食限制", "全團避開牛肉與game meat（馴鹿、麋鹿、鹿肉等）；可選雞、豬、魚或素食。"],
      ["❄️", "舒適優先", "強風、結冰或長距離時可分流、改短程計程車，不勉強走海岸冰面。"],
    ];
    $("#globalNotices").innerHTML = notices.map(n => `<article class="notice"><div class="notice-icon">${n[0]}</div><div><strong>${escapeHtml(n[1])}</strong><p>${escapeHtml(n[2])}</p></div></article>`).join("");
  }

  window.TravelCommonStatus = Object.freeze({
    currentTripDay,
    renderCountdown,
    renderNetwork,
    renderNotices
  });
})();
