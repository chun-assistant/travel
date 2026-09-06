/* Split-page compatibility bridge: keep common.js unchanged while giving its shared render/init code the containers it expects. */
(function(){
  const ids = [
    'globalNotices','dayScroller','countryScroll','transportList','hotelList',
    'ticketAppList','checklist','practicalList','bookingList','taxList',
    'budgetList','foodList','mealList','eventSearch','clearSearch','jumpToday',
    'resetChecks','budgetSegments','imageModal','imageModalContent',
    'imageModalCaption','imageModalClose','eventList','daySummary','dayFilters'
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
    const map = {'../daily/':'daily','../transport/':'transport','../stay/':'stay','./':'luggage','../budget/':'budget'};
    if(map[href]) btn.dataset.tab = map[href];
  });
})();
