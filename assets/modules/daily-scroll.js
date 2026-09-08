/* Daily scroll interaction extracted from common-runtime.js. */
(function (root) {
  function setupScrollSync(deps) {
    deps = deps || {};
    var $ = deps.$ || function (selector) { return document.querySelector(selector); };
    var $$ = deps.$$ || function (selector, rootEl) { return Array.prototype.slice.call((rootEl || document).querySelectorAll(selector)); };
    var overview = deps.overview || [];

    var dayScroller = $("#dayScroller");
    var countryScroll = $("#countryScroll");
    if (!dayScroller || !countryScroll || dayScroller.dataset.syncReady) return;

    dayScroller.dataset.syncReady = "1";
    countryScroll.dataset.syncReady = "1";
    var syncingScroll = false;

    function syncScroll(source, target) {
      if (syncingScroll) return;
      var sourceMax = Math.max(1, source.scrollWidth - source.clientWidth);
      var targetMax = Math.max(0, target.scrollWidth - target.clientWidth);
      var progress = Math.max(0, Math.min(1, source.scrollLeft / sourceMax));
      syncingScroll = true;
      target.scrollLeft = progress * targetMax;
      requestAnimationFrame(function () { syncingScroll = false; });
    }

    function syncCountryActive() {
      var dayCount = overview.length;
      var step = 126 + 8;
      var day = Math.max(1, Math.min(dayCount, Math.round(dayScroller.scrollLeft / step) + 1));
      $$(".country-stage", countryScroll).forEach(function (btn) {
        var startDay = Number(btn.style.getPropertyValue("--stage-start"));
        var endDay = Number(btn.style.getPropertyValue("--stage-end")) - 1;
        btn.classList.toggle("active", day >= startDay && day <= endDay);
      });
    }

    dayScroller.addEventListener("scroll", function () {
      syncScroll(dayScroller, countryScroll);
      syncCountryActive();
    }, { passive: true });
    countryScroll.addEventListener("scroll", function () {
      syncScroll(countryScroll, dayScroller);
    }, { passive: true });
    syncCountryActive();
  }

  root.TravelDailyScroll = Object.freeze({ setup: setupScrollSync });
})(window);
