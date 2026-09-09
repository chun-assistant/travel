    /* FLIGHT_CHECKIN_HIGHLIGHT */
    (function(){
      const checkins = [
        {date:"2026-09-24", label:"✈ 航班報到 · CI0063／AY1472"},
        {date:"2026-10-02", label:"✈ 航班報到 · WF993"},
        {date:"2026-10-07", label:"✈ 航班報到 · SAS"},
        {date:"2026-10-08", label:"✈ 航班報到 · CI0074"}
      ];
      function add(){
        const chips = document.querySelectorAll('#dayScroller .day-chip');
        if(!chips.length) return;
        chips.forEach(chip=>{
          const day = Number(chip.dataset.day);
          const map = {1:"2026-09-24",9:"2026-10-02",14:"2026-10-07",15:"2026-10-08"};
          const date = map[day];
          const item = checkins.find(x=>x.date===date);
          if(!item || chip.querySelector('.flight-checkin-badge')) return;
          chip.insertAdjacentHTML('beforeend','<span class="flight-checkin-badge">'+item.label+'</span>');
          chip.classList.add('has-flight-checkin');
const badge=chip.querySelector('.flight-checkin-badge');
if(badge){ badge.style.cssText='display:block;margin-top:4px;padding:3px 6px;border-radius:999px;color:#c55a53;background:#fdeae6;border:1px solid rgba(197,90,83,.28);font-size:9px;font-weight:800;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'; }
if(chip.classList.contains('active')){ badge.style.color='#fff'; badge.style.background='rgba(197,90,83,.82)'; badge.style.borderColor='rgba(255,255,255,.28)'; }
/* FLIGHT_CHECKIN_INLINE_STYLE */
        });
      }
      const host=document.getElementById('dayScroller');
      if(host) new MutationObserver(add).observe(host,{childList:true});
      add();
    })();

