/*
 * Stay renderer module.
 *
 * Extracted from common.js as a pure renderer factory. This file is inert until
 * a page explicitly wires it, so the current runtime and UI remain unchanged.
 */
(function (root) {
  function createRenderer(deps) {
    deps = deps || {};
    var data = deps.data || [];
    var $ = deps.$ || function (selector) { return document.querySelector(selector); };
    var escapeHtml = deps.escapeHtml || function (value) {
      return String(value == null ? "" : value)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
    };
    var statusClass = deps.statusClass || function () { return ""; };
    var fmtTwd = deps.fmtTwd || function (value) { return value == null ? "" : String(value); };
    var buildDirections = deps.buildDirections || function (place) {
      if (!place) return "";
      var parts = String(place).split(/→|->/).map(function (s) { return s.trim(); }).filter(Boolean);
      var destination = parts[parts.length - 1] || String(place).trim();
      var p = new URLSearchParams({ api: "1", destination: destination, dir_action: "navigate" });
      return "https://www.google.com/maps/dir/?" + p.toString();
    };
    var isAirportPlace = deps.isAirportPlace || function (value) {
      return /airport|機場|航廈|departure hall|check-in area/i.test(String(value || ""));
    };
    var mapIcon = deps.mapIcon || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>';
    var copyIcon = deps.copyIcon || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0 2 2v8a2 2 0 0 0 2 2h2"></path></svg>';

    return function renderHotels() {
      $("#hotelList").innerHTML = data.map(function (h) {
        var isHotel = !/night train|夜臥火車|機上/i.test(String(h.name) + " " + String(h.city)) && !isAirportPlace(h.address);
        var hotelNav = isHotel ? '<a class="map-btn" href="' + escapeHtml(buildDirections(h.address)) + '" target="_blank" rel="noopener">' + mapIcon + '開始導航</a>' : "";
        return '<article class="info-card hotel-card"><span class="hotel-city">' + escapeHtml(h.city) + ' · ' + escapeHtml(h.date) + '</span><div class="event-top"><h3>' + escapeHtml(h.name) + '</h3><span class="status ' + statusClass(h.status) + '">' + escapeHtml(h.status) + '</span></div><p class="hotel-address">' + escapeHtml(h.address) + '</p><div class="info-card-row"><span>入住／退房</span><b>' + escapeHtml(h.time) + '</b></div><div class="info-card-row"><span>早餐／餐食</span><b>' + escapeHtml(h.meal) + '</b></div><div class="info-card-row"><span>分攤／人</span><b>' + fmtTwd(h.cost) + '</b></div><div class="info-card-row"><span>提醒</span><b>' + escapeHtml(h.note) + '</b></div><div class="two-actions">' + hotelNav + '<button class="ghost-btn hotel-copy" data-copy="' + escapeHtml(h.address) + '">' + copyIcon + '複製地址</button></div></article>';
      }).join("");
    };
  }
  root.TravelStayRenderer = Object.freeze({ create: createRenderer });
})(window);
