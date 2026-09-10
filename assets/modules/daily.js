/*
 * Daily itinerary module.
 *
 * The public surface stays small so rendering can be migrated incrementally
 * without changing the existing page initialization order or UI.
 */
(function (root) {
  var data = root.TravelItineraryData;

  function getData() {
    data = root.TravelItineraryData || data;
    return data || { overview: [], events: [], countryStages: [] };
  }

  function getOverview() { return getData().overview || []; }
  function getEvents() { return getData().events || []; }
  function getCountryStages() { return getData().countryStages || []; }

  function createRenderer(deps) {
    deps = deps || {};
    var $ = deps.$ || function (selector) { return document.querySelector(selector); };
    var $$ = deps.$$ || function (selector, rootEl) { return Array.prototype.slice.call((rootEl || document).querySelectorAll(selector)); };
    var escapeHtml = deps.escapeHtml || function (value) {
      return String(value == null ? "" : value).replace(/[&<>'\"]/g, function (ch) {
        return ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[ch];
      });
    };
    var dateLabel = root.TravelDailyLogic && root.TravelDailyLogic.dateLabel
      ? root.TravelDailyLogic.dateLabel
      : deps.dateLabel || function (iso) {
        if (!iso) return "";
        var d = new Date(String(iso) + "T12:00:00");
        return (d.getMonth() + 1) + "/" + d.getDate() + "（" + "日一二三四五六"[d.getDay()] + "）";
      };
    var state = deps.state || { day: 1 };
    var save = deps.save || function () {};
    var renderDayView = deps.renderDayView || function () {};
    var dailyRender = root.TravelDailyRender && root.TravelDailyRender.setup
      ? root.TravelDailyRender.setup({ $: $, $$: $$, escapeHtml: escapeHtml, dateLabel: dateLabel, getOverview: getOverview, getCountryStages: getCountryStages, state: state, save: save, renderDayView: renderDayView })
      : null;

    function renderDayScroller() {
      if (dailyRender && dailyRender.renderDayScroller) { dailyRender.renderDayScroller(); return; }
    }

    function renderCountryTrack() {
      if (dailyRender && dailyRender.renderCountryTrack) { dailyRender.renderCountryTrack(); return; }
    }

    function enableHorizontalDragFallback(selector) {
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

    function renderScrollEnhancements() {
      if (root.TravelDailyScroll && root.TravelDailyScroll.setupHorizontalDrag) {
        root.TravelDailyScroll.setupHorizontalDrag("#dayScroller", { $: $ });
        root.TravelDailyScroll.setupHorizontalDrag("#countryScroll", { $: $ });
        return;
      }
      enableHorizontalDragFallback("#dayScroller"); enableHorizontalDragFallback("#countryScroll");
    }

    function setupScrollSync() {
      if (root.TravelDailyScroll && root.TravelDailyScroll.setupBasicScrollSync) {
        root.TravelDailyScroll.setupBasicScrollSync({ $: $ }); return;
      }
      var dayScroller = $("#dayScroller"); var countryScroll = $("#countryScroll");
      if (!dayScroller || !countryScroll || dayScroller.dataset.syncReady) return;
      dayScroller.dataset.syncReady = "1"; countryScroll.dataset.syncReady = "1";
      var syncing = false;
      function sync(source, target) {
        if (syncing) return;
        var sourceMax = Math.max(0, source.scrollWidth - source.clientWidth);
        var targetMax = Math.max(0, target.scrollWidth - target.clientWidth);
        if (!sourceMax || !targetMax) return;
        syncing = true; target.scrollLeft = (source.scrollLeft / sourceMax) * targetMax;
        requestAnimationFrame(function () { syncing = false; });
      }
      dayScroller.addEventListener("scroll", function () { sync(dayScroller, countryScroll); }, { passive: true });
      countryScroll.addEventListener("scroll", function () { sync(countryScroll, dayScroller); }, { passive: true });
    }

    function mount() {
      renderDayScroller();
      renderCountryTrack();
      renderScrollEnhancements();
      setupScrollSync();
      if (root.TravelDailyTimezone && root.TravelDailyTimezone.setup) root.TravelDailyTimezone.setup();
    }
    return Object.freeze({ renderDayScroller: renderDayScroller, renderCountryTrack: renderCountryTrack, renderScrollEnhancements: renderScrollEnhancements, setupScrollSync: setupScrollSync, mount: mount });
  }

  function mountScrollRenderer() {
    if (!root.TravelDailyRuntime) return;
    var runtime = root.TravelDailyRuntime;
    var renderer = createRenderer({ $: runtime.$, $$: runtime.$$, escapeHtml: runtime.escapeHtml, dateLabel: runtime.dateLabel, state: runtime.state, save: runtime.save, renderDayView: function () { runtime.renderDayView(); renderer.mount(); } });
    renderer.mount();
  }

  root.TravelDaily = Object.freeze({ getOverview: getOverview, getEvents: getEvents, getCountryStages: getCountryStages, createRenderer: createRenderer, mountScrollRenderer: mountScrollRenderer });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountScrollRenderer, { once: true });
  else mountScrollRenderer();
})(window);
