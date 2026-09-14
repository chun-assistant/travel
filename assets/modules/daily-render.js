/* Daily navigation rendering helpers. */
(function (root) {
  function setup(deps) {
    deps = deps || {};
    var $ = deps.$ || function (selector) { return document.querySelector(selector); };
    var $$ = deps.$$ || function (selector, rootEl) { return Array.prototype.slice.call((rootEl || document).querySelectorAll(selector)); };
    var escapeHtml = deps.escapeHtml || function (value) {
      return String(value == null ? "" : value).replace(/[&<>'\"]/g, function (ch) {
        return ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[ch];
      });
    };
    var dateLabel = deps.dateLabel || function (iso) { return iso || ""; };
    var getOverview = deps.getOverview || function () { return []; };
    var getCountryStages = deps.getCountryStages || function () { return []; };
    var state = deps.state || { day: 1 };
    var save = deps.save || function () {};
    var renderDayView = deps.renderDayView || function () {};

    function renderDayScroller() {
      var host = $("#dayScroller");
      if (!host) return;
      host.innerHTML = getOverview().map(function (d) {
        var presentation = root.TravelDailyLogic && root.TravelDailyLogic.getDayPresentation
          ? root.TravelDailyLogic.getDayPresentation(d.day, getCountryStages())
          : null;
        var stage = presentation
          ? presentation.stage
          : root.TravelDailyLogic
            ? root.TravelDailyLogic.getStageForDay(d.day, getCountryStages())
            : d.day >= 2 && d.day <= 3 ? getCountryStages()[0]
            : d.day >= 4 && d.day <= 8 ? getCountryStages()[1]
            : d.day >= 9 && d.day <= 14 ? getCountryStages()[2]
            : d.day >= 15 && d.day <= 17 ? getCountryStages()[3]
            : null;
        var dayColor = presentation
          ? presentation.color
          : root.TravelDailyLogic
            ? root.TravelDailyLogic.getDayColor(stage)
            : stage && stage.color || "#dbe6e3";
        var ticketHtml = d.ticketLinkUrl
          ? '<span class="day-ticket" role="link" tabindex="0" data-ticket-url="' + escapeHtml(d.ticketLinkUrl) + '" style="position:absolute;right:6px;bottom:5px;z-index:3;display:block;padding:2px 5px;border-radius:999px;color:#2d6b7b;background:rgba(231,247,247,.92);border:1px solid rgba(82,137,151,.28);font-size:8px;line-height:1.1;font-weight:850;white-space:nowrap;cursor:pointer;">🚆 購買車票</span>'
          : "";
        return '<button class="day-chip ' + (d.day === state.day ? "active" : "") + '" data-day="' + d.day + '" style="--day-color:' + dayColor + '"><b>Day ' + d.day + '</b><small>' + escapeHtml(dateLabel(d.date)) + '</small><small class="day-place">' + escapeHtml(d.city) + '</small>' + ticketHtml + '</button>';
      }).join("");
      $$(".day-chip").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.day = Number(btn.dataset.day);
          save("aurora-day", state.day);
          renderDayView();
          setTimeout(function () { btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); }, 20);
        });
      });
      $$(".day-ticket", host).forEach(function (ticket) {
        function openTicket(e) {
          e.preventDefault();
          e.stopPropagation();
          window.open(ticket.dataset.ticketUrl, "_blank", "noopener,noreferrer");
        }
        ticket.addEventListener("click", openTicket);
        ticket.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") openTicket(e);
        });
      });
    }

    function renderCountryTrack() {
      var host = $("#countryTrack");
      if (!host) return;
      host.innerHTML = getCountryStages().map(function (stage) {
        var presentation = root.TravelDailyLogic && root.TravelDailyLogic.getCountryStagePresentation
          ? root.TravelDailyLogic.getCountryStagePresentation(state.day, stage)
          : null;
        var active = presentation
          ? presentation.active
          : root.TravelDailyLogic
            ? root.TravelDailyLogic.isDayInStage(state.day, stage)
            : state.day >= stage.start && state.day <= stage.end;
        var stageStyle = presentation
          ? presentation.style
          : root.TravelDailyLogic
            ? root.TravelDailyLogic.getStageStyle(stage)
            : "--stage-color:" + stage.color + ";--stage-start:" + stage.start + ";--stage-end:" + (stage.end + 1);
        var countryLabel = presentation
          ? presentation.label
          : root.TravelDailyLogic
            ? root.TravelDailyLogic.getCountryLabel(stage.country)
            : stage.country;
        return '<button class="country-stage ' + (active ? "active" : "") + '" data-day="' + stage.start + '" style="' + stageStyle + '" aria-label="前往' + escapeHtml(stage.country) + '行程 Day ' + stage.start + '"><span class="country-dot">' + stage.flag + '</span><b>' + countryLabel + '</b><small>Day ' + stage.start + '–' + stage.end + '</small></button>';
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

    return Object.freeze({
      renderDayScroller: renderDayScroller,
      renderCountryTrack: renderCountryTrack
    });
  }

  root.TravelDailyRender = Object.freeze({ setup: setup });
})(window);
