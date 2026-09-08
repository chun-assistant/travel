/*
 * Shared runtime utilities.
 *
 * Small, dependency-free helpers extracted for renderer modules. This module is
 * intentionally inert until a page loads it; it does not change the legacy
 * runtime by itself.
 */
(function (root) {
  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function fmtTwd(value) {
    if (value == null || value === "") return "";
    return "NT$" + Number(value).toLocaleString("zh-TW");
  }

  function statusClass(value) {
    var text = String(value || "");
    if (/完成|已完成|done|paid|已付/i.test(text)) return "done";
    if (/待|未|pending|todo/i.test(text)) return "pending";
    return "";
  }

  function buildDirections(place) {
    if (!place) return "";
    var parts = String(place).split(/→|->/).map(function (s) {
      return s.trim();
    }).filter(Boolean);
    var destination = parts[parts.length - 1] || String(place).trim();
    var params = new URLSearchParams({
      api: "1",
      destination: destination,
      dir_action: "navigate"
    });
    return "https://www.google.com/maps/dir/?" + params.toString();
  }

  function isAirportPlace(value) {
    return /airport|機場|航廈|departure hall|check-in area/i.test(String(value || ""));
  }

  root.TravelRuntimeUtils = Object.freeze({
    escapeHtml: escapeHtml,
    fmtTwd: fmtTwd,
    statusClass: statusClass,
    buildDirections: buildDirections,
    isAirportPlace: isAirportPlace
  });
})(window);
