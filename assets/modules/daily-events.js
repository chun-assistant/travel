/*
 * Daily event-list renderer.
 *
 * Extracted from the legacy Daily runtime so the event timeline can migrate
 * independently without changing the existing UI contract.
 */
(function (root) {
  function createRenderer(deps) {
    deps = deps || {};
    var $ = deps.$ || function (selector, rootEl) {
      return (rootEl || document).querySelector(selector);
    };
    var $$ = deps.$$ || function (selector, rootEl) {
      return Array.prototype.slice.call((rootEl || document).querySelectorAll(selector));
    };
    var events = deps.events || function () { return []; };
    var state = deps.state || { day: 1, eventFilter: "全部", eventSearch: "" };
    var escapeHtml = deps.escapeHtml || function (value) {
      return String(value == null ? "" : value).replace(/[&<>'\"]/g, function (ch) {
        return ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[ch];
      });
    };
    var eventKind = deps.eventKind || function () { return "kind-transit"; };
    var filterKind = deps.filterKind || function () { return "其他"; };
    var statusClass = deps.statusClass || function () { return "neutral"; };
    var buildDirections = deps.buildDirections || function () { return ""; };
    var isNavigableEvent = deps.isNavigableEvent || function () { return false; };
    var fmtCost = deps.fmtCost || function (currency, value) {
      if (value === null || value === undefined || value === "") return "待確認";
      return (currency || "") + " " + value;
    };
    var mapIcon = deps.mapIcon || "";
    var pinIcon = deps.pinIcon || "";
    var copyIcon = deps.copyIcon || "";
    var copyText = deps.copyText || function () {};

    function eventCard(e) {
      var kind = eventKind(e.type);
      var nav = isNavigableEvent(e) ? buildDirections(e.place) : "";
      var mapButton = nav ? '<a class="map-btn" href="' + escapeHtml(nav) + '" target="_blank" rel="noopener">' + mapIcon + '開始導航</a>' : "";
      var cost = fmtCost(e.currency, e.cost);
      return '<article class="event-card ' + kind + '">' +
        '<div class="event-top"><div><span class="event-time">◷ ' + escapeHtml(e.start) + (e.end ? '–' + escapeHtml(e.end) : '') + '</span><span class="event-type"> · ' + escapeHtml(e.type) + '</span></div><span class="status ' + statusClass(e.status) + '">' + escapeHtml(e.status || "行程") + '</span></div>' +
        '<h4>' + escapeHtml(e.title) + '</h4>' +
        (e.place ? '<div class="event-place">' + pinIcon + '<span>' + escapeHtml(e.place) + '</span></div>' : '') +
        '<div class="event-actions">' + mapButton + (e.place ? '<button class="ghost-btn copy-place" data-copy="' + escapeHtml(e.place) + '">' + copyIcon + '</button>' : '') + '</div>' +
        '<details class="more"><summary>費用與舒適提醒</summary><div class="detail-note"><span><b>費用：</b>' + escapeHtml(e.costNote || "—") + '</span><span><b>提醒：</b>' + escapeHtml(e.note || "—") + '</span><span><b>依據：</b>' + escapeHtml(e.source || "—") + '</span></div></details>' +
      '</article>';
    }

    function render() {
      var host = $("#eventTimeline");
      if (!host) return;
      var q = String(state.eventSearch || "").trim().toLowerCase();
      var rows = events()
        .filter(function (e) { return e.day === state.day; })
        .filter(function (e) { return state.eventFilter === "全部" || filterKind(e.type) === state.eventFilter; })
        .filter(function (e) {
          return !q || [e.title, e.place, e.type, e.transport, e.note].join(" ").toLowerCase().includes(q);
        });
      host.innerHTML = rows.length ? rows.map(eventCard).join("") : '<div class="empty"><b>找不到符合項目</b>請更換類別或搜尋文字</div>';
      $$(".copy-place", host).forEach(function (btn) {
        btn.addEventListener("click", function () { copyText(btn.dataset.copy); });
      });
    }

    return Object.freeze({ render: render, eventCard: eventCard });
  }

  var renderer = null;
  root.TravelDailyEvents = Object.freeze({
    createRenderer: createRenderer,
    init: function (deps) { renderer = createRenderer(deps); return renderer; },
    render: function () { if (renderer) renderer.render(); }
  });
})(window);
