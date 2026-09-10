/* Shared runtime initialization wiring. */
(function (root) {
  "use strict";

  function setup(deps) {
    var $ = deps.$;
    var state = deps.state;
    var save = deps.save;
    var currentTripDay = deps.currentTripDay;
    var toast = deps.toast;
    var renderCountdown = deps.renderCountdown;
    var renderNetwork = deps.renderNetwork;
    var renderNotices = deps.renderNotices;
    var renderDayView = deps.renderDayView;
    var renderChecklist = deps.renderChecklist;
    var renderPractical = deps.renderPractical;
    var renderBookings = deps.renderBookings;
    var renderTax = deps.renderTax;
    var renderBudget = deps.renderBudget;
    var renderFood = deps.renderFood;
    var renderMeals = deps.renderMeals;
    var bindGuideImages = deps.bindGuideImages;
    var renderEvents = deps.renderEvents;
    var bindSegments = deps.bindSegments;

    function init() {
      renderCountdown(); renderNetwork(); renderNotices(); renderDayView(); renderChecklist(); renderPractical(); renderBookings(); renderTax(); renderBudget(); renderFood(); renderMeals(); bindGuideImages();
      $("#jumpToday").addEventListener("click", function () { state.day = currentTripDay(); save("aurora-day", state.day); renderDayView(); toast("已切換 Day " + state.day); });
      $("#eventSearch").addEventListener("input", function (e) { state.eventSearch = e.target.value; renderEvents(); });
      $("#clearSearch").addEventListener("click", function () { $("#eventSearch").value = ""; state.eventSearch = ""; renderEvents(); });
      $("#resetChecks").addEventListener("click", function () { if (confirm("確定要清除所有行李與待辦勾選紀錄嗎？")) { state.checks = {}; save("aurora-checks", state.checks); renderChecklist(); renderBookings(); toast("行李與待辦已重設"); } });
      bindSegments("#luggageSegments", "sub-"); bindSegments("#budgetSegments", "budget-");
      window.addEventListener("online", renderNetwork); window.addEventListener("offline", renderNetwork);
    }

    return Object.freeze({ init: init });
  }

  root.TravelCommonRuntimeInit = Object.freeze({ setup: setup });
})(window);
