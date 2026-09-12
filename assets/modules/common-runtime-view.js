/* Daily view rendering extracted from common-runtime.js. */
(function (root) {
  function setup(deps) {
    var $ = deps.$, $$ = deps.$$, APP_DATA = deps.APP_DATA, COUNTRY_STAGES = deps.COUNTRY_STAGES;
    var state = deps.state, save = deps.save, escapeHtml = deps.escapeHtml;
    var dateLabel = deps.dateLabel, fmtTwd = deps.fmtTwd, fmtCost = deps.fmtCost, statusClass = deps.statusClass;
    var eventKind = deps.eventKind, filterKind = deps.filterKind;
    var buildDirections = deps.buildDirections, isAirportPlace = deps.isAirportPlace;
    var mapIcon = deps.mapIcon, pinIcon = deps.pinIcon, copyIcon = deps.copyIcon, copyText = deps.copyText;

    function isHotelPlace(value) {
      var place = String(value || "").trim().toLowerCase();
      if (!place || isAirportPlace(place)) return false;
      return APP_DATA.hotels.filter(function (h) {
        return !/night train|夜臥火車|機上/i.test((h.name || "") + " " + (h.city || ""));
      }).some(function (h) {
        return [h.name, h.address].some(function (term) {
          var candidate = String(term || "").trim().toLowerCase();
          return candidate && (place.indexOf(candidate) >= 0 || candidate.indexOf(place) >= 0);
        });
      });
    }

    function isNavigableEvent(event) {
      if (!event || !event.place) return false;
      if (event.navigable === true) return true;
      if (isAirportPlace((event.type || "") + " " + (event.title || "") + " " + event.place)) return false;
      var type = String(event.type || "");
      return /景點|活動/.test(type) || (/住宿/.test(type) && isHotelPlace(event.place));
    }

    function renderNotices() {
      var host = $("#globalNotices");
      if (!host) return;
      var notices = [
        ["🚆", "9/25機場交通已修正", "VIE搭REX7／Railjet至Wien Hbf，再轉U1；不是機場接送。"],
        ["⛪", "9/27白教堂週日時段", "09:15先拍外觀；若要入內，依官方週日12:00後時段回訪。"],
        ["🍽️", "餐食限制", "全團避開牛肉與game meat（馴鹿、麋鹿、鹿肉等）；可選雞、豬、魚或素食。"],
        ["❄️", "舒適優先", "強風、結冰或長距離時可分流、改短程計程車，不勉強走海岸冰面。"]
      ];
      host.innerHTML = notices.map(function (n) {
        return '<article class="notice"><div class="notice-icon">' + n[0] + '</div><div><strong>' + escapeHtml(n[1]) + '</strong><p>' + escapeHtml(n[2]) + '</p></div></article>';
      }).join("");
    }

    function renderDayScroller() {
      var host = $("#dayScroller");
      if (!host) return;
      host.innerHTML = APP_DATA.overview.map(function (d) {
        var dayStage = d.day >= 2 && d.day <= 3 ? COUNTRY_STAGES[0]
          : d.day >= 4 && d.day <= 8 ? COUNTRY_STAGES[1]
          : d.day >= 9 && d.day <= 14 ? COUNTRY_STAGES[2]
          : d.day >= 15 && d.day <= 17 ? COUNTRY_STAGES[3] : null;
        var dayColor = dayStage && dayStage.color || "#dbe6e3";
        return '<button class="day-chip ' + (d.day === state.day ? "active" : "") + '" data-day="' + d.day + '" style="--day-color:' + dayColor + '"><b>Day ' + d.day + '</b><small>' + escapeHtml(dateLabel(d.date)) + '</small><small class="day-place">' + escapeHtml(d.city) + '</small></button>';
      }).join("");
      $$(".day-chip").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.day = Number(btn.dataset.day); save("aurora-day", state.day); renderDayView();
          setTimeout(function () { btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); }, 20);
        });
      });
    }

    function renderCountryTrack() {
      var host = $("#countryTrack");
      if (!host) return;
      host.innerHTML = COUNTRY_STAGES.map(function (stage) {
        var code = {"奧地利":"奧地利 (Austria)","芬蘭":"芬蘭 (Finland)","挪威":"挪威 (Norway)","荷蘭":"荷蘭 (Netherlands)"}[stage.country] || stage.country;
        return '<button class="country-stage ' + (state.day >= stage.start && state.day <= stage.end ? "active" : "") + '" data-day="' + stage.start + '" style="--stage-color:' + stage.color + ';--stage-start:' + stage.start + ';--stage-end:' + (stage.end + 1) + '" aria-label="前往' + escapeHtml(stage.country) + '行程 Day ' + stage.start + '"><span class="country-dot">' + stage.flag + '</span><b>' + code + '</b><small>Day ' + stage.start + '–' + stage.end + '</small></button>';
      }).join("");
      $$(".country-stage", host).forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.day = Number(btn.dataset.day); save("aurora-day", state.day); renderDayView();
          setTimeout(function () { var active = $(".day-chip.active"); if (active) active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); }, 20);
        });
      });
    }

    function enableHorizontalDrag(selector) {
      var el = $(selector);
      if (!el || el.dataset.dragReady) return;
      el.dataset.dragReady = "1";
      var dragging = false, startX = 0, startScroll = 0;
      el.addEventListener("pointerdown", function (e) { if (e.button !== 0) return; dragging = true; startX = e.clientX; startScroll = el.scrollLeft; el.classList.add("dragging"); });
      el.addEventListener("pointermove", function (e) { if (dragging) el.scrollLeft = startScroll - (e.clientX - startX); });
      var stop = function () { dragging = false; el.classList.remove("dragging"); };
      el.addEventListener("pointerup", stop); el.addEventListener("pointercancel", stop);
      el.addEventListener("wheel", function (e) { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { el.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
    }

    function renderDayView() {
      renderDayScroller(); renderCountryTrack(); enableHorizontalDrag("#dayScroller"); enableHorizontalDrag("#countryScroll");
      var d = APP_DATA.overview.find(function (x) { return x.day === state.day; });
      if (!d) return;
      $("#daySummary").innerHTML = '<article class="day-summary"><div class="day-kicker">DAY ' + d.day + ' · ' + escapeHtml(dateLabel(d.date)) + '</div><h3>' + escapeHtml(d.city) + '</h3><p>' + escapeHtml(d.highlight) + '</p><div class="day-summary-meta"><span>🚉 ' + escapeHtml(d.transport) + '</span><span>🛏️ ' + escapeHtml(d.hotel) + '</span><span>🚶 體力 ' + escapeHtml(d.effort) + '</span><span>💰 ' + fmtTwd(d.estimate) + '</span></div></article>';
      renderEventFilters(); renderEvents();
    }

    function renderEventFilters() {
      var host = $("#eventFilters");
      if (!host) return;
      var labels = ["全部","交通","景點","餐飲","住宿","其他"];
      host.innerHTML = labels.map(function (v) { return '<button class="filter-chip ' + (state.eventFilter === v ? "active" : "") + '" data-filter="' + v + '">' + v + '</button>'; }).join("");
      $$(".filter-chip", host).forEach(function (btn) { btn.addEventListener("click", function () { state.eventFilter = btn.dataset.filter; renderEventFilters(); renderEvents(); }); });
    }

    function eventCard(e) {
      var kind = eventKind(e.type), nav = isNavigableEvent(e) ? (e.navigationMap || buildDirections(e.place)) : "";
      var mapButton = nav ? '<a class="map-btn" href="' + escapeHtml(nav) + '" target="_blank" rel="noopener">' + mapIcon + '開始導航</a>' : "";
      var cost = e.costDisplay || fmtCost(e.currency, e.cost);
      return '<article class="event-card ' + kind + '">' +
        '<div class="event-top"><div><span class="event-time">◷ ' + escapeHtml(e.start) + (e.end ? '–' + escapeHtml(e.end) : "") + '</span><span class="event-type"> · ' + escapeHtml(e.type) + '</span></div><span class="status ' + statusClass(e.status) + '">' + escapeHtml(e.status || "行程") + '</span></div>' +
        '<h4>' + escapeHtml(e.title) + '</h4>' +
        (e.place ? '<div class="event-place">' + pinIcon + '<span>' + escapeHtml(e.place) + '</span></div>' : "") +
        '<div class="meta-grid"><div class="meta-box"><small>交通／方式</small><b>' + escapeHtml(e.transport || "—") + '</b></div><div class="meta-box"><small>移動／停留</small><b>' + escapeHtml(e.duration || "—") + '</b></div><div class="meta-box"><small>費用／人</small><b>' + escapeHtml(cost) + '</b></div><div class="meta-box"><small>票券／集合</small><b>' + escapeHtml(e.ticket || "—") + '</b></div></div>' +
        '<div class="event-actions">' + mapButton + (e.place ? '<button class="ghost-btn copy-place" data-copy="' + escapeHtml(e.place) + '">' + copyIcon + '</button>' : "") + '</div>' +
        '<details class="more"><summary>費用與舒適提醒</summary><div class="detail-note"><span><b>費用：</b>' + escapeHtml(e.costNote || "—") + '</span><span><b>提醒：</b>' + escapeHtml(e.note || "—") + '</span><span><b>依據：</b>' + escapeHtml(e.source || "—") + '</span></div></details></article>';
    }

    function renderEvents() {
      var q = state.eventSearch.trim().toLowerCase();
      var rows = APP_DATA.events.filter(function (e) { return e.day === state.day; }).filter(function (e) { return state.eventFilter === "全部" || filterKind(e.type) === state.eventFilter; }).filter(function (e) { return !q || [e.title,e.place,e.type,e.transport,e.note].join(" ").toLowerCase().indexOf(q) >= 0; });
      $("#eventTimeline").innerHTML = rows.length ? rows.map(eventCard).join("") : '<div class="empty"><b>找不到符合項目</b>請更換類別或搜尋文字</div>';
      $$(".copy-place", $("#eventTimeline")).forEach(function (btn) { btn.addEventListener("click", function () { copyText(btn.dataset.copy); }); });
    }

    return Object.freeze({
      renderNotices: renderNotices,
      renderDayView: renderDayView,
      renderDayScroller: renderDayScroller,
      renderCountryTrack: renderCountryTrack,
      enableHorizontalDrag: enableHorizontalDrag,
      renderEventFilters: renderEventFilters,
      renderEvents: renderEvents,
      eventCard: eventCard,
      isHotelPlace: isHotelPlace,
      isNavigableEvent: isNavigableEvent
    });
  }
  root.TravelCommonRuntimeView = Object.freeze({ setup: setup });
})(window);
