/* Split-page compatibility bridge: let common.js render the original feature data on split pages without changing the shared UI. */
(function(){
  if (document.body?.dataset.page !== 'luggage') return;
  const ids = [
    'globalNotices','dayScroller','countryTrack','countryScroll','daySummary',
    'eventFilters','eventTimeline','transportFilters','transportList','hotelList',
    'ticketAppList','checklist','checkPercent','checkCount','progressFill',
    'practicalList','bookingList','taxList','budgetSummary','budgetList','foodList','mealList','toast',
    'eventSearch','clearSearch','jumpToday','resetChecks','budgetSegments',
    'imageModal','imageModalContent','imageModalCaption','imageModalClose'
  ];
  const host = document.createElement('div');
  host.id = 'splitRuntimeHost';
  host.hidden = true;
  document.body.appendChild(host);
  ids.forEach(id=>{
    if(document.getElementById(id)) return;
    const el = /Search/.test(id) ? document.createElement('input') :
      /clear|jump|reset|Close/.test(id) ? document.createElement('button') :
      document.createElement('div');
    el.id = id;
    host.appendChild(el);
  });
  document.querySelectorAll('.bottom-nav .nav-btn').forEach(btn=>{
    if(btn.dataset.tab) return;
    const href = btn.getAttribute('href') || '';
    const map = {'../daily/':'days','../transport/':'transport','../stay/':'stay','./':'luggage','../budget/':'budget'};
    if(map[href]) btn.dataset.tab = map[href];
  });
})();
