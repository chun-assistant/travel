/*
 * Transport data enhancements.
 *
 * Extracted from transport-enhancements.js. This module only normalizes and
 * patches transport data; it does not render or touch the DOM.
 */
(function (root) {
  function apply() {
    if (typeof APP_DATA === 'undefined' || !Array.isArray(APP_DATA.transport)) return;

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

    // Contactless payment updates requested for the Amsterdam transport page.
    APP_DATA.transport.forEach(function (t) {
      var route = String(t.route || '');
      if (/Schiphol.*Sloterdijk/i.test(route) || /Sloterdijk.*Schiphol/i.test(route) ||
          (/Amsterdam ID Aparthotel/i.test(route) && /Schiphol Airport/i.test(route))) {
        t.status = '感應信用卡';
      }
    });

    // 10/9 Amsterdam tram journeys paid by contactless credit card.
    var additions = [
      {
        date: '10/9',
        type: '電車',
        route: 'Amsterdam Sloterdijk Station→Rijksmuseum Station',
        service: 'GVB',
        time: '07:55–08:19',
        method: 'GVB電車19號',
        duration: '24分鐘',
        currency: 'EUR',
        cost: 2.22,
        status: '感應信用卡',
        note: '感應信用卡'
      },
      {
        date: '10/9',
        type: '電車',
        route: 'Albert Cuypstraat Station→Rokin Station',
        service: 'GVB',
        time: '13:33–13:50',
        method: 'GVB電車4號',
        duration: '17分鐘',
        currency: 'EUR',
        cost: 1.42,
        status: '感應信用卡',
        note: '感應信用卡'
      },
      {
        date: '10/9',
        type: '電車',
        route: 'Westermarkt Station→Sloterdijk Station',
        service: 'GVB',
        time: '20:40–21:10',
        method: 'GVB電車9號',
        duration: '20分鐘',
        currency: 'EUR',
        cost: 2.3,
        status: '感應信用卡',
        note: '感應信用卡'
      }
    ];

    additions.forEach(function (item) {
      var exists = APP_DATA.transport.some(function (t) {
        return String(t.date || '') === item.date &&
          String(t.route || '') === item.route &&
          String(t.time || '') === item.time;
      });
      if (!exists) APP_DATA.transport.push(item);
    });

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
  }

  root.TravelTransportDataEnhancements = Object.freeze({
    apply: apply
  });
})(window);
