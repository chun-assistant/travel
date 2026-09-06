(function(){
  const root=document.getElementById('daySummary');
  if(!root) return;
  const setImage=()=>{
    const active=document.querySelector('.day-chip.active');
    const n=active ? Number(active.textContent.replace(/\D/g,'')) : 1;
    root.classList.toggle('modern-day-2', n===2);
    root.dataset.day=String(n);
  };
  const mo=new MutationObserver(setImage); mo.observe(root,{childList:true,subtree:true});
  document.addEventListener('click',e=>{if(e.target.closest('.day-chip')) setTimeout(setImage,30)});
  setImage();
})();
