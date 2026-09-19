/*
 * Transport filter module.
 *
 * Extracted from transport-enhancements.js. It owns only the extra
 * "現場購票" filter behavior; the original category filter remains in the
 * extracted transport renderer.
 */
(function (root) {
  function init() {
    var filters = document.getElementById('transportFilters');
    if (!filters) return;

    var onSiteActive = false;

    function applyOnSite() {
      document.querySelectorAll('#transportList .transport-card').forEach(function (card) {
        var status = card.querySelector('.status');
        var onSite = status && status.textContent.trim() === '現場購票';
        card.classList.toggle('is-onSite', !!onSite);
        card.style.display = onSiteActive && !onSite ? 'none' : '';
      });

      var button = filters.querySelector('.on-site-filter');
      if (button) {
        button.classList.toggle('active', onSiteActive);
        button.setAttribute('aria-pressed', String(onSiteActive));
      }
    }

    function ensureOnSite() {
      if (filters.querySelector('.on-site-filter')) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'filter-chip on-site-filter';
      button.textContent = '現場購票';
      button.setAttribute('aria-pressed', 'false');
      filters.appendChild(button);
      button.addEventListener('click', function () {
        onSiteActive = !onSiteActive;
        applyOnSite();
      });
    }

    var observer = new MutationObserver(function () {
      ensureOnSite();
      applyOnSite();
    });

    observer.observe(filters, { childList: true, subtree: true });
    ensureOnSite();
    applyOnSite();

    document.addEventListener('click', function (event) {
      if (event.target.closest('#transportFilters .filter-chip:not(.on-site-filter)')) {
        onSiteActive = false;
        setTimeout(applyOnSite, 0);
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})(window);
