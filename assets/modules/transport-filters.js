/*
 * Transport filter module.
 *
 * Extracted from transport-enhancements.js. It owns only the extra
 * "尚未購票" filter behavior; the original category filter remains in the
 * extracted transport renderer.
 */
(function (root) {
  function init() {
    var filters = document.getElementById('transportFilters');
    if (!filters) return;

    var unpaidActive = false;

    function applyUnpaid() {
      document.querySelectorAll('#transportList .transport-card').forEach(function (card) {
        var status = card.querySelector('.status');
        var unpaid = status && status.textContent.trim() === '尚未購票';
        card.classList.toggle('is-unpaid', !!unpaid);
        card.style.display = unpaidActive && !unpaid ? 'none' : '';
      });

      var button = filters.querySelector('.unpaid-filter');
      if (button) {
        button.classList.toggle('active', unpaidActive);
        button.setAttribute('aria-pressed', String(unpaidActive));
      }
    }

    function ensureUnpaid() {
      if (filters.querySelector('.unpaid-filter')) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'filter-chip unpaid-filter';
      button.textContent = '尚未購票';
      button.setAttribute('aria-pressed', 'false');
      filters.appendChild(button);
      button.addEventListener('click', function () {
        unpaidActive = !unpaidActive;
        applyUnpaid();
      });
    }

    var observer = new MutationObserver(function () {
      ensureUnpaid();
      applyUnpaid();
    });

    observer.observe(filters, { childList: true, subtree: true });
    ensureUnpaid();
    applyUnpaid();

    document.addEventListener('click', function (event) {
      if (event.target.closest('#transportFilters .filter-chip:not(.unpaid-filter)')) {
        unpaidActive = false;
        setTimeout(applyUnpaid, 0);
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})(window);
