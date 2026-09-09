/*
 * Daily scroll sync boundary.
 *
 * Keeps the two horizontal timelines synchronized without owning any
 * itinerary rendering or event filtering.
 */
(function (root) {
  function setup(options) {
    options = options || {};
    var $ = options.$ || function (selector) { return document.querySelector(selector); };
    var dayScroller = $("#dayScroller");
    var countryScroll = $("#countryScroll");
    if (!dayScroller || !countryScroll || dayScroller.dataset.syncReady) return;

    dayScroller.dataset.syncReady = "1";
    countryScroll.dataset.syncReady = "1";
    var syncing = false;

    function sync(source, target) {
      if (syncing) return;
      var sourceMax = Math.max(0, source.scrollWidth - source.clientWidth);
      var targetMax = Math.max(0, target.scrollWidth - target.clientWidth);
      if (!sourceMax || !targetMax) return;
      syncing = true;
      target.scrollLeft = (source.scrollLeft / sourceMax) * targetMax;
      requestAnimationFrame(function () { syncing = false; });
    }

    dayScroller.addEventListener("scroll", function () {
      sync(dayScroller, countryScroll);
    }, { passive: true });

    countryScroll.addEventListener("scroll", function () {
      sync(countryScroll, dayScroller);
    }, { passive: true });
  }

  root.TravelDailyScrollSync = Object.freeze({ setup: setup });
})(window);
