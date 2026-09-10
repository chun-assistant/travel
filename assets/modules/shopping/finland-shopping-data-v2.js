(() => {
  'use strict';

  const data = window.AURORA_SHOPPING_DATA;
  if (!data) return;

  const cloneRows = rows => Array.isArray(rows) ? rows.map(row => ({ ...row })) : [];

  window.TravelFinlandShoppingData = Object.freeze({
    supermarkets: cloneRows(data.supermarkets),
    souvenirs: cloneRows(data.souvenirs),
    source: data
  });
})();
