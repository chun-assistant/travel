/*
 * Stay interaction module.
 *
 * Keeps DOM event wiring separate from Stay card rendering.
 */
(function (root) {
  function showToast(message) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(function () { el.classList.remove("show"); }, 1700);
  }

  function copyAddress(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast("地址已複製");
      }).catch(function () {
        fallbackCopy(text);
      });
      return;
    }
    fallbackCopy(text);
  }

  function fallbackCopy(text) {
    var t = document.createElement("textarea");
    t.value = text;
    document.body.appendChild(t);
    t.select();
    try { document.execCommand("copy"); } catch (_) {}
    t.remove();
    showToast("地址已複製");
  }

  function bind(deps) {
    deps = deps || {};
    var $$ = deps.$$ || function (selector, scope) {
      return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    };

    $$(".hotel-copy").forEach(function (btn) {
      if (btn.dataset.copyBound) return;
      btn.dataset.copyBound = "1";
      btn.addEventListener("click", function () {
        copyAddress(btn.dataset.copy || "");
      });
    });
  }

  root.TravelStayInteractions = Object.freeze({ bind: bind });
})(window);
