/*
 * Transport renderer module.
 *
 * Extracted from common.js as a pure renderer factory. This file is inert until
 * a page explicitly wires it, so the current runtime and UI remain unchanged.
 */
(function (root) {
  function createRenderer(deps) {
    deps = deps || {};

    var data = deps.data || [];
    var state = deps.state || {};
    var $ = deps.$ || function (selector) { return document.querySelector(selector); };
    var $$ = deps.$$ || function (selector, scope) {
      return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    };
    var escapeHtml = deps.escapeHtml || function (value) {
      return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
    };
    var statusClass = deps.statusClass || function () { return ""; };
    var fmtCost = deps.fmtCost || function (currency, cost) {
      return [currency, cost].filter(function (v) { return v != null && v !== ""; }).join(" ");
    };

    return function renderTransport() {
      var cats = ["全部"].concat(Array.from(new Set(data.map(function (t) { return t.type; }))));
      $("#transportFilters").innerHTML = cats.map(function (v) {
        return `<button class="filter-chip ${state.transportFilter === v ? "active" : ""}" data-filter="${escapeHtml(v)}">${escapeHtml(v)}</button>`;
      }).join("");
      $$("#transportFilters .filter-chip").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.transportFilter = btn.dataset.filter;
          renderTransport();
        });
      });
      var rows = data.filter(function (t) {
        return state.transportFilter === "全部" || t.type === state.transportFilter;
      });
      $("#transportList").innerHTML = rows.map(function (t) {
        return `<article class="info-card transport-card"><div class="event-top"><div><span class="event-type">${escapeHtml(t.date)} · ${escapeHtml(t.type)}</span><h3>${escapeHtml(t.route)}</h3></div><span class="status ${statusClass(t.status)}">${escapeHtml(t.status)}</span></div><p class="subtitle">${escapeHtml(t.service)}</p><div class="info-card-row"><span>時間</span><b>${escapeHtml(t.time)}</b></div><div class="info-card-row"><span>方式</span><b>${escapeHtml(t.method)}</b></div><div class="info-card-row"><span>時長</span><b>${escapeHtml(t.duration)}</b></div><div class="info-card-row"><span>費用／人</span><b>${escapeHtml(fmtCost(t.currency,t.cost))}</b></div><div class="info-card-row"><span>提醒</span><b>${escapeHtml(t.note)}</b></div></article>`;
      }).join("");
    };
  }

  root.TravelTransportRenderer = Object.freeze({
    create: createRenderer
  });
})(window);
