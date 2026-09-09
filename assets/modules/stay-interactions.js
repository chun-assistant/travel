/*
 * Stay interaction module.
 *
 * Keeps DOM event wiring separate from Stay card rendering.
 */
(function (root) {
  function bind(deps) {
    deps = deps || {};
    var $$ = deps.$$ || function (selector, scope) {
      return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    };
    var copyText = deps.copyText || function () {};

    $$(".hotel-copy").forEach(function (btn) {
      btn.addEventListener("click", function () {
        copyText(btn.dataset.copy);
      });
    });
  }

  root.TravelStayInteractions = Object.freeze({ bind: bind });
})(window);
