/* Split-page compatibility bridge: let common.js render the original feature data on split pages without changing the shared UI. */
(function(){
  const page = document.body?.dataset.page || '';
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
    const map = {'../daily/':'days','../transport/':'transport','../stay/':'hotels','./':'luggage','../budget/':'budget'};
    if(map[href]) btn.dataset.tab = map[href];
  });

  /* Keep the split-page bottom bar locked to the same viewport position as
     the source page. On desktop, do not let a safe-area value change its
     height and visually lift the bar. Mobile keeps the original safe-area
     behavior. */
  function lockBottomNav(){
    const nav = document.querySelector('.bottom-nav');
    if(!nav) return;
    nav.style.setProperty('position','fixed','important');
    nav.style.setProperty('top','auto','important');
    nav.style.setProperty('bottom','0px','important');
    nav.style.setProperty('left','50%','important');
    nav.style.setProperty('transform','translateX(-50%)','important');
    if(window.innerWidth >= 700){
      nav.style.setProperty('padding-bottom','7px','important');
    }
  }
  lockBottomNav();
  window.addEventListener('resize', lockBottomNav);
  window.addEventListener('orientationchange', lockBottomNav);
  window.addEventListener('load', lockBottomNav);

  /* Each split page has one canonical top-level feature. common.js keeps the
     last selected tab in localStorage, so visiting Transport and then another
     split page could hide that page's real content. After common.js finishes
     its normal DOMContentLoaded work, restore the tab that belongs to this
     page. This only changes visibility/active state; it does not change the UI. */
  const pageTab = {days:'days', transport:'transport', stay:'hotels', luggage:'luggage', budget:'budget'}[page];
  if(pageTab){
    window.addEventListener('DOMContentLoaded', function(){
      setTimeout(function(){
        document.querySelectorAll('.tab-panel').forEach(panel=>{
          panel.classList.toggle('active', panel.id === 'tab-' + pageTab);
        });
        document.querySelectorAll('.bottom-nav .nav-btn').forEach(btn=>{
          btn.classList.toggle('active', btn.dataset.tab === pageTab);
        });
        try { localStorage.setItem('aurora-tab', pageTab); } catch(e) {}
      }, 0);
    });
  }

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