/*
 * Ticket-app renderer.
 *
 * Pure DOM renderer for the ticket / transport app section.
 */
(function (root) {
  function createRenderer(deps) {
    deps = deps || {};
    var utils = root.TravelRuntimeUtils || {};
    var data = deps.data || [];
    var $ = deps.$ || function (selector) { return document.querySelector(selector); };
    var escapeHtml = deps.escapeHtml || utils.escapeHtml || function (value) {
      return String(value == null ? "" : value).replace(/[&<>'"]/g, function (ch) {
        return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[ch];
      });
    };

    return function renderTicketApps() {
      var host = $("#ticketAppList");
      if (!host) return;
      host.innerHTML = data.map(function (a) {
        var priorityClass = a.priority === "必裝" ? "confirmed" : "neutral";
        return '<article class="info-card">' +
          '<div class="event-top"><div><span class="event-type">' + escapeHtml(a.country) + ' · 購票工具</span><h3>' + escapeHtml(a.name) + '</h3></div>' +
          '<span class="status ' + priorityClass + '">' + escapeHtml(a.priority) + '</span></div>' +
          '<p class="subtitle">' + escapeHtml(a.use) + '</p>' +
          '<div class="info-card-row"><span>本行程用在哪裡</span><b>' + escapeHtml(a.trip) + '</b></div>' +
          '<div class="info-card-row"><span>出發前設定</span><b>' + escapeHtml(a.setup) + '</b></div>' +
          '<div class="info-card-row"><span>購票／使用步驟</span><b>' + escapeHtml(a.steps) + '</b></div>' +
          '<div class="info-card-row"><span>避免出錯</span><b>' + escapeHtml(a.warning) + '</b></div>' +
          '<div class="event-actions"><a class="map-btn" href="' + escapeHtml(a.source) + '" target="_blank" rel="noopener">查看官方說明 ↗</a></div>' +
          '</article>';
      }).join("");
    };
  }

  root.TravelAppsRenderer = Object.freeze({ create: createRenderer });
})(window);
