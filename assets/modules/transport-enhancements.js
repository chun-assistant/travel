/*
 * Transport page enhancements.
 *
 * Extracted from transport/index.html. This file intentionally does not
 * auto-load itself: the current page still owns script order and rendering.
 * It uses the extracted transport renderer directly, while common.js remains
 * available as a compatibility fallback for the current page startup path.
 */
(function (root) {
  function renderTransportPage() {
    if (!root.TravelTransportRenderer) return;
    var filters = document.getElementById('transportFilters');
    var list = document.getElementById('transportList');
    if (!filters || !list) return;

    var render = root.TravelTransportRenderer.create({
      data: typeof APP_DATA !== 'undefined' && Array.isArray(APP_DATA.transport) ? APP_DATA.transport : [],
      state: typeof state !== 'undefined' ? state : {},
      $: typeof $ !== 'undefined' ? $ : undefined,
      $$: typeof $$ !== 'undefined' ? $$ : undefined,
      escapeHtml: typeof escapeHtml !== 'undefined' ? escapeHtml : undefined,
      statusClass: typeof statusClass !== 'undefined' ? statusClass : undefined,
      fmtCost: typeof fmtCost !== 'undefined' ? fmtCost : undefined
    });

    if (typeof render === 'function') render();
  }

  function init() {
    if (typeof APP_DATA !== 'undefined' && Array.isArray(APP_DATA.transport)) {
      APP_DATA.transport = APP_DATA.transport.filter(function (t) {
        return !(String(t.date || '') === '10/10' &&
          /Amsterdam ID Aparthotel/i.test(String(t.route || '')) &&
          /(Schiphol Airport|AMS)/i.test(String(t.route || '')));
      });

      APP_DATA.transport.push({
        date: '10/10',
        type: '火車',
        route: 'Amsterdam ID Aparthotel→Schiphol Airport',
        service: '步行＋NS Sprinter 8223 Hoofddorp',
        time: '06:45 從飯店出發；06:55 Amsterdam Sloterdijk搭車 → 07:05 Schiphol Airport',
        method: '步行約10分鐘／700公尺 → Sprinter 8223；約10分鐘、2站、11號月台',
        duration: '約20分鐘',
        currency: 'EUR',
        cost: 4.9,
        status: '尚未購票',
        note: '尚未購票。依路線：06:45 Amsterdam ID Aparthotel出發，步行約10分鐘／700公尺到Amsterdam Sloterdijk；06:55搭Sprinter 8223 Hoofddorp，07:05抵達Schiphol Airport。'
      });

      var d2 = APP_DATA.transport.find(function (t) {
        return String(t.date || '').includes('9/25') &&
          /VIE|Vienna|維也納|Hauptbahnhof/.test(String(t.route || ''));
      });

      if (d2) {
        d2.type = '火車';
        d2.route = 'VIE→Südtiroler Platz→Stephansplatz→飯店';
        d2.service = 'REX 7／IC＋U1＋步行350m';
        d2.time = '8:16（REX 7）／8:34（IC）；8:59／9:11 抵達飯店';
        d2.method = '🚆 REX 7／IC → Vienna Central；🚶 步行約6分鐘 → Südtiroler Platz；🚇 U1 Leopoldau → Stephansplatz；🚶 步行約4分鐘／350公尺 → 飯店';
        d2.duration = '約37–43分鐘（依班次）';
        d2.currency = 'EUR';
        d2.cost = 4.4;
        d2.status = '尚未購票';
        d2.note = '尚未購票；REX 7與IC擇一。8:16班次8:59抵達，8:34班次9:11抵達。';
      }

      var carPickups = [
        { date: '9/26', route: /Vienna飯店→VIE/i },
        { date: '10/2', route: /Saariselkä.*Kirkenes/i },
        { date: '10/3', route: /Scandic Kirkenes→KKN/i }
      ];

      APP_DATA.transport.forEach(function (t) {
        if (carPickups.some(function (x) {
          return String(t.date || '') === x.date && x.route.test(String(t.route || ''));
        })) {
          t.type = '包車';
        }
      });

      renderTransportPage();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})(window);
