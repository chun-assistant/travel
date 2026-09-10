(() => {
  'use strict';

  const $ = s => document.querySelector(s);

  function esc(s){
    return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function attr(s){ return esc(s); }

  function render(data){
    $('#supermarketList').innerHTML=(data.supermarkets||[]).map(x=>`<article class="info-card recommend-card"><h3>${esc(x.date)}｜${esc(x.city)}</h3><div class="recommend-meta"><span class="recommend-pill">${esc(x.use)}</span></div><ul class="recommend-list">${(x.items||[]).map(i=>`<li>${esc(i)}</li>`).join('')}</ul><p class="device-note">${esc(x.note)}</p></article>`).join('');
    const grouped={};(data.souvenirs||[]).forEach(x=>(grouped[x.country]||(grouped[x.country]=[])).push(x));
    $('#souvenirList').innerHTML=Object.entries(grouped).map(([country,rows])=>`<article class="info-card recommend-card"><h3>${esc(country)}</h3>${rows.map(x=>`<div class="souvenir-row"><div><b>${esc(x.item)}</b><small>${esc(x.reason)}</small><div class="recommend-meta"><span class="recommend-pill">${esc(x.place)}</span><span class="recommend-pill">${esc(x.tag)}</span></div></div><button class="add-shopping" type="button" data-add-item="${attr(x.item)}" data-add-country="${attr(country.replace(/^..\s/,''))}">加入我的清單</button></div>`).join('')}</article>`).join('');
  }

  window.TravelShoppingRecommendations = Object.freeze({ render });
})();
