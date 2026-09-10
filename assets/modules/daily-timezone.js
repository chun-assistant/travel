/*
 * Daily timezone note.
 *
 * Feature-specific UI enhancement for the Daily page. It does not alter
 * day/country state, date calculation, or timeline synchronization.
 */
(function (root) {
  function loadStyles() {
    var href = "../assets/modules/daily-timezone.css?v=20260910-timezone1";
    if (document.querySelector('link[data-daily-timezone-style]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.dailyTimezoneStyle = "1";
    document.head.appendChild(link);
  }

  function setup() {
    if (document.body && document.body.dataset.page !== "days") return;
    loadStyles();

    var section = document.querySelector("#tab-days");
    var anchor = document.querySelector("#globalNotices");
    if (!section || !anchor || section.querySelector(".timezone-note")) return;

    var note = document.createElement("aside");
    note.className = "timezone-note";
    note.setAttribute("aria-label", "行程時區提醒");
    note.innerHTML = '<span class="timezone-note-icon" aria-hidden="true">🕒</span>' +
      '<div><strong>以下行程皆以所在地當地時間顯示</strong>' +
      '<p><span aria-hidden="true">🇹🇼</span> 台灣比芬蘭快 5 小時；比奧地利、挪威、荷蘭快 6 小時</p></div>';
    section.insertBefore(note, anchor);

    var heroSub = document.querySelector(".hero-sub");
    var routeLine = document.querySelector(".route-line");
    if (heroSub) heroSub.textContent = "09.24–10.11｜奧地利・芬蘭・挪威・荷蘭";
    if (routeLine) routeLine.hidden = true;
  }

  root.TravelDailyTimezone = Object.freeze({ setup: setup });
})(window);
