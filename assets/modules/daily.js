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

    function renderDayScroller() {
      var host = $("#dayScroller");
      if (!host) return;
      host.innerHTML = getOverview().map(function (d) {
        var stage = root.TravelDailyLogic
          ? root.TravelDailyLogic.getStageForDay(d.day, getCountryStages())
          : d.day >= 2 && d.day <= 3 ? getCountryStages()[0]
          : d.day >= 4 && d.day <= 8 ? getCountryStages()[1]
          : d.day >= 9 && d.day <= 14 ? getCountryStages()[2]
          : d.day >= 15 && d.day <= 17 ? getCountryStages()[3]
          : null;
        var dayColor = root.TravelDailyLogic
          ? root.TravelDailyLogic.getDayColor(stage)
          : stage && stage.color || "#dbe6e3";
        return '<button class="day-chip ' + (d.day === state.day ? "active" : "") + '" data-day="' + d.day + '" style="--day-color:' + dayColor + '"><b>Day ' + d.day + '</b><small>' + escapeHtml(dateLabel(d.date)) + '</small><small class="day-place">' + escapeHtml(d.city) + '</small></button>';
      }).join("");
      $$(".day-chip").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.day = Number(btn.dataset.day);
          save("aurora-day", state.day);
          renderDayView();
          setTimeout(function () { btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); }, 20);
        });
      });
    }

    function renderCountryTrack() {
      var host = $("#countryTrack");
      if (!host) return;
      host.innerHTML = getCountryStages().map(function (stage) {
        var active = root.TravelDailyLogic
          ? root.TravelDailyLogic.isDayInStage(state.day, stage)
          : state.day >= stage.start && state.day <= stage.end;
        return '<button class="country-stage ' + (active ? "active" : "") + '" data-day="' + stage.start + '" style="--stage-color:' + stage.color + ';--stage-start:' + stage.start + ';--stage-end:' + (stage.end + 1) + '" aria-label="前往' + escapeHtml(stage.country) + '行程 Day ' + stage.start + '"><span class="country-dot">' + stage.flag + '</span><b>' + (root.TravelDailyLogic ? root.TravelDailyLogic.getCountryLabel(stage.country) : stage.country) + '</b><small>Day ' + stage.start + '–' + stage.end + '</small></button>';
      }).join("");
      $$(".country-stage", host).forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.day = Number(btn.dataset.day);
          save("aurora-day", state.day);
          renderDayView();
          setTimeout(function () {
            var active = $(".day-chip.active");
            if (active) active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
          }, 20);
        });
      });
    }

    function enableHorizontalDrag(selector) {
      var el = $(selector);
      if (!el || el.dataset.dragReady) return;
      el.dataset.dragReady = "1";
      var dragging = false, startX = 0, startScroll = 0;
      el.addEventListener("pointerdown", function (e) {
        if (e.button !== 0) return;
        dragging = true;
        startX = e.clientX;
        startScroll = el.scrollLeft;
        el.classList.add("dragging");
      });
      el.addEventListener("pointermove", function (e) {
        if (dragging) el.scrollLeft = startScroll - (e.clientX - startX);
      });
      var stop = function () {
        dragging = false;
        el.classList.remove("dragging");
      };
      el.addEventListener("pointerup", stop);
      el.addEventListener("pointercancel", stop);
      el.addEventListener("wheel", function (e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          el.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      }, { passive: false });
    }

    function renderScrollEnhancements() {
      enableHorizontalDrag("#dayScroller");
      enableHorizontalDrag("#countryScroll");
    }

    function setupScrollSync() {
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

    function mount() {
      renderDayScroller();
      renderCountryTrack();
      renderScrollEnhancements();
      setupScrollSync();
    }

    return Object.freeze({
      renderDayScroller: renderDayScroller,
      renderCountryTrack: renderCountryTrack,
      renderScrollEnhancements: renderScrollEnhancements,
      setupScrollSync: setupScrollSync,
      mount: mount
    });
  }

  function mountScrollRenderer() {
    if (!root.TravelDailyRuntime) return;
    var runtime = root.TravelDailyRuntime;
    var renderer = createRenderer({
      $: runtime.$,
      $$: runtime.$$, 
      escapeHtml: runtime.escapeHtml,
      dateLabel: runtime.dateLabel,
      state: runtime.state,
      save: runtime.save,
      renderDayView: function () {
        runtime.renderDayView();
        renderer.mount();
      }
    });
    renderer.mount();
  }

  root.TravelDaily = Object.freeze({
    getOverview: getOverview,
    getEvents: getEvents,
    getCountryStages: getCountryStages,
    createRenderer: createRenderer,
    mountScrollRenderer: mountScrollRenderer
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountScrollRenderer, { once: true });
  } else {
    mountScrollRenderer();
  }
})(window);
