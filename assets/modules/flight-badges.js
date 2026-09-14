    /* FLIGHT_CHECKIN_HIGHLIGHT */
    (function(){
      const checkins = [
        {date:"2026-09-24", label:"✈ 航班報到 · CI0063／AY1472"},
        {date:"2026-10-02", label:"✈ 航班報到 · WF993"},
        {date:"2026-10-07", label:"✈ 航班報到 · SAS"},
        {date:"2026-10-08", label:"✈ 航班報到 · CI0074"}
      ];
      const trainTickets = {
        1: {
          label:"🚆 火車購票",
          url:"https://www.oebb.at/en/tickets-kundenkarten/online-mobile-ticketing/oebb-app"
        }
      };
      function add(){
        const chips = document.querySelectorAll('#dayScroller .day-chip');
        if(!chips.length) return;
        chips.forEach(chip=>{
          const day = Number(chip.dataset.day);
          const map = {1:"2026-09-24",9:"2026-10-02",14:"2026-10-07",15:"2026-10-08"};
          const date = map[day];
          const item = checkins.find(x=>x.date===date);
          if(item && !chip.querySelector('.flight-checkin-badge')) {
            chip.insertAdjacentHTML('beforeend','<span class="flight-checkin-badge">'+item.label+'</span>');
            chip.classList.add('has-flight-checkin');
            const badge=chip.querySelector('.flight-checkin-badge');
            if(badge){
              badge.style.cssText='display:block;margin-top:4px;padding:3px 6px;border-radius:999px;color:#c55a53;background:#fdeae6;border:1px solid rgba(197,90,83,.28);font-size:9px;font-weight:800;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
              if(chip.classList.contains('active')){ badge.style.color='#fff'; badge.style.background='rgba(197,90,83,.82)'; badge.style.borderColor='rgba(255,255,255,.28)'; }
            }
          }

          const train = trainTickets[day];
          if(train && !chip.querySelector('.train-ticket-badge')) {
            chip.insertAdjacentHTML('beforeend','<a class="train-ticket-badge" href="'+train.url+'" target="_blank" rel="noopener noreferrer" aria-label="火車購票">'+train.label+'</a>');
            const badge=chip.querySelector('.train-ticket-badge');
            if(badge){
              badge.style.cssText='position:absolute;right:6px;bottom:6px;z-index:4;display:block;margin:0;padding:3px 6px;border-radius:999px;color:#2d6b7b;background:#e7f7f7;border:1px solid rgba(82,137,151,.28);font-size:9px;font-weight:800;line-height:1.2;white-space:nowrap;text-decoration:none;cursor:pointer;height:19px;min-height:19px;box-sizing:border-box;overflow:hidden;';
            }
          }
        });
      }
      const host=document.getElementById('dayScroller');
      if(host) new MutationObserver(add).observe(host,{childList:true});
      add();
    })();
