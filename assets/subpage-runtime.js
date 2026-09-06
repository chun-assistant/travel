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

  /* common.js still owns the original renderers. Some split pages intentionally
     do not contain the other feature DOM, so the shared init can stop on a
     missing-node exception before reaching the current feature renderer.
     Recover only the renderer(s) whose real target exists; this does not alter
     the source UI or data. */
  window.addEventListener('error', function(){
    setTimeout(function(){
      try { if(document.getElementById('ticketAppList') && typeof renderTicketApps === 'function') renderTicketApps(); } catch(e) {}
      try { if(document.getElementById('practicalList') && typeof renderPractical === 'function') renderPractical(); } catch(e) {}
      try { if(document.getElementById('bookingList') && typeof renderBookings === 'function') renderBookings(); } catch(e) {}
      try { if(document.getElementById('checklist') && typeof renderChecklist === 'function') renderChecklist(); } catch(e) {}
      try { if(document.getElementById('taxList') && typeof renderTax === 'function') renderTax(); } catch(e) {}
    }, 0);
  }, {once:true});
})();
