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

  function fallbackCopy(text) {
    var t = document.createElement("textarea");
    t.value = text;
    t.setAttribute("readonly", "");
    t.style.position = "fixed";
    t.style.top = "-1000px";
    t.style.left = "-1000px";
    t.style.opacity = "0";
    document.body.appendChild(t);
    t.focus();
    t.select();
    t.setSelectionRange(0, t.value.length);

    var ok = false;
    try { ok = document.execCommand("copy"); } catch (_) {}
    t.remove();

    if (ok) showToast("地址已複製");
    else showToast("複製失敗，請長按地址複製");
  }

  function copyAddress(text) {
    text = String(text || "");
    if (!text) {
      showToast("沒有可複製的地址");
      return;
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(text).then(function () {
        showToast("地址已複製");
      }).catch(function () {
        fallbackCopy(text);
      });
      return;
    }

    fallbackCopy(text);
  }

  function bind(deps) {
    deps = deps || {};
    var $$ = deps.$$ || function (selector, scope) {
      return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    };

    $$(".hotel-copy").forEach(function (btn) {
      if (btn.dataset.copyBound) return;
      btn.dataset.copyBound = "1";
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        copyAddress(btn.getAttribute("data-copy") || "");
      });
    });
  }

  root.TravelStayInteractions = Object.freeze({ bind: bind });
})(window);
