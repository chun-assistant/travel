(function(){
  const root=document.getElementById('daySummary');
  const highlights=document.querySelector('#modernHighlights ul');
  if(!root) return;
  const refresh=()=>{
    const active=document.querySelector('.day-chip.active');
    const n=active ? Number(active.textContent.replace(/\D/g,'')) : 1;
    root.classList.toggle('modern-day-2', n===2);
    root.dataset.day=String(n);
    if(highlights){
      const cards=[...document.querySelectorAll('#eventTimeline .event-card')];
      const items=cards.slice(0,4).map(card=>{
        const lines=(card.innerText||'').split('\n').map(s=>s.trim()).filter(Boolean);
        return lines.find(s=>!/^\d{1,2}:\d{2}/.test(s)) || lines[0] || '';
      }).filter(Boolean);
      highlights.innerHTML=(items.length?items:['依當日行程查看景點與活動']).map(t=>`<li>${t}</li>`).join('');
    }
  };
  const mo=new MutationObserver(refresh); mo.observe(root,{childList:true,subtree:true});
  const timeline=document.getElementById('eventTimeline');
  if(timeline) new MutationObserver(refresh).observe(timeline,{childList:true,subtree:true});
  document.addEventListener('click',e=>{if(e.target.closest('.day-chip')) setTimeout(refresh,40)});
  refresh();
})();
