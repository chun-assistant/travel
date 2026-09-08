/* Daily event-filter renderer extracted from the legacy Daily runtime. */
(function (root) {
  function createRenderer(deps) {
    deps = deps || {};
    var $ = deps.$ || function (selector) { return document.querySelector(selector); };
    var $$ = deps.$$ || function (selector, rootEl) { return Array.prototype.slice.call((rootEl || document).querySelectorAll(selector)); };
    var state = deps.state || { eventFilter: "全部" };
    var renderEvents = deps.renderEvents || function () {};
    var labels = ["全部", "交通", "景點", "餐飲", "住宿", "其他"];

    function render() {
      var host = $("#eventFilters");
      if (!host) return;
      host.innerHTML = labels.map(function (value) {
        return '<button class="filter-chip ' + (state.eventFilter === value ? "active" : "") + '" data-filter="' + value + '">' + value + '</button>';
      }).join("");
      $$("#eventFilters .filter-chip").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.eventFilter = btn.dataset.filter;
          render();
          renderEvents();
        });
      });
    }

    return Object.freeze({ render: render });
  }

  var renderer = null;
  root.TravelDailyEventFilters = Object.freeze({
    createRenderer: createRenderer,
    init: function (deps) { renderer = createRenderer(deps); return renderer; },
    render: function () { if (renderer) renderer.render(); }
  });
})(window);
