/* Daily meals: compact overview + 18-day cards. Scoped to the budget page only. */
document.addEventListener('DOMContentLoaded',function(){
  var host=document.getElementById('food-meals');
  if(!host)return;
  var overviewSrc='../assets/app-icons/IMG_8478.jpeg?v=20260909-8478';
  var meals=[
    {d:1,date:'9/24（四）',place:'台北 → 維也納',b:['—','','none'],l:['—','','none'],n:['✈ 機上 CI0063','','flight']},
    {d:2,date:'9/25（五）',place:'維也納',b:['✈ 飛機餐 CI0063','','flight'],l:['Figlmüller','維也納炸豬排','booked'],n:['自理','＋ 超市採買 🛒','self']},
    {d:3,date:'9/26（六）',place:'維也納 → 赫爾辛基',b:['自理','','self'],l:['✈ AY1472','未含飛機餐・免費藍莓汁必點','flight'],n:['Gastro Hub','赫爾辛基市區・＋ 超市採買 🛒','booked']},
    {d:4,date:'9/27（日）',place:'赫爾辛基 → 羅瓦涅米',sub:'夜臥火車',b:['自理','','self'],l:['老鷹市場','Kappeli','booked'],n:['自理','＋ 超市採買 🛒','self']},
    {d:5,date:'9/28（一）',place:'羅瓦涅米',sub:'聖誕老人村',b:['自理','','self'],l:["Santa’s Salmon Place",'烤鮭魚','booked'],n:['自理','＋ 超市採買 🛒','self']},
    {d:6,date:'9/29（二）',place:'羅瓦涅米 → 伊瓦洛',b:['飯店早餐','Nova Skyland','hotel'],l:['自理','12:00 上巴士前準備','self'],n:['pubi.fi Pizza','＋ 超市採買 🛒','booked']},
    {d:7,date:'9/30（三）',place:'伊瓦洛／Nellim',b:['飯店早餐','Kultahippu','hotel'],l:['Nellim 日遊','含午餐','included'],n:['自理','＋ 超市採買 🛒','self']},
    {d:8,date:'10/1（四）',place:'伊瓦洛 → 薩利色爾卡',b:['飯店早餐','Kultahippu','hotel'],l:['自理','','self'],n:['飯店晚餐','Northern Lights Village','hotel']},
    {d:9,date:'10/2（五）',place:'薩利色爾卡 → 希爾克內斯',b:['飯店早餐','Northern Lights Village','hotel'],l:['自理','','self'],n:['Thon Hotel 帝王蟹','＋ 超市採買 🛒','booked']},
    {d:10,date:'10/3（六）',place:'希爾克內斯 → 特羅姆瑟',b:['自理','','self'],l:['Pastafabrikken','義大利麵','booked'],n:['自理','＋ 超市採買 🛒','self']},
    {d:11,date:'10/4（日）',place:'塞尼亞島',b:['飯店早餐','Quality Hotel Grand','hotel'],l:['塞尼亞一日遊','含輕食／午餐','included'],n:['自理','＋ 超市採買 🛒','self']},
    {d:12,date:'10/5（一）',place:'特羅姆瑟',b:['飯店早餐','Quality Hotel Grand','hotel'],l:['自理','','self'],n:['自理','＋ 超市採買 🛒','self']},
    {d:13,date:'10/6（二）',place:'Kvaløya／Sommarøy',b:['飯店早餐','Quality Hotel Grand','hotel'],l:['極光之旅','含午餐','included'],n:['自理','','self']},
    {d:14,date:'10/7（三）',place:'特羅姆瑟峽灣',b:['飯店早餐','Quality Hotel Grand','hotel'],l:['Capella 魚船','含午餐','included'],n:['自理','','self']},
    {d:15,date:'10/8（四）',place:'特羅姆瑟 → 奧斯陸 → 阿姆斯特丹',b:['飯店早餐','Quality Hotel Grand','hotel'],l:['✈ SAS TOS → OSL','轉機','flight'],n:['自理','＋ 超市採買 🛒','self']},
    {d:16,date:'10/9（五）',place:'阿姆斯特丹',b:['自理','','self'],l:['Albert Cuyp 市集','自行安排','booked'],n:['自理','＋ 超市採買 🛒','self']},
    {d:17,date:'10/10（六）',place:'阿姆斯特丹 → 台北',b:['自理','','self'],l:['✈ 飛機餐 CI0074','','flight'],n:['✈ 飛機餐 CI0074','','flight']},
    {d:18,date:'10/11（日）',place:'台北',b:['—','','none'],l:['—','','none'],n:['—','','none']}
  ];
  var label={self:'自理',hotel:'飯店供餐',flight:'機上餐',booked:'已選定',included:'行程含餐',none:'—'};
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function row(kind,data){
    var icon={b:'☀️',l:'🍽️',n:'🌙'}[kind],name={b:'早餐',l:'午餐',n:'晚餐'}[kind],note=data[1]||'',market=note.indexOf('超市採買')>=0;
    note=note.replace(/・?＋ 超市採買 🛒/g,'').replace(/＋ 超市採買 🛒/g,'').trim();
    return '<div class="meal-card-row '+kind+'"><span class="meal-card-icon">'+icon+'</span><span class="meal-card-copy"><strong>'+name+'｜'+esc(data[0])+'</strong>'+(note?'<small>'+esc(note)+'</small>':'')+(market?'<em>🛒 超市採買</em>':'')+'</span><span class="meal-card-status '+data[2]+'">'+esc(label[data[2]])+'</span></div>';
  }
  host.innerHTML='<details class="meal-card-overview"><summary><span class="meal-menu-icon" aria-hidden="true"><span class="meal-menu-rings"></span><span class="meal-menu-sheet"><b>Menu</b><i>🍴</i></span><span class="meal-menu-leaf left"></span><span class="meal-menu-leaf right"></span></span><span class="meal-overview-copy"><b>展開 18 天餐食一覽表</b><small>一次確認自理、餐廳、飯店供餐與超市採買</small></span><span class="meal-overview-action" aria-hidden="true"><span class="meal-overview-action-text open">展開查看</span><span class="meal-overview-action-text close">收合內容</span><span class="meal-overview-action-arrow">⌄</span></span></summary><div class="meal-card-overview-body"><button type="button" id="mealCardOverviewZoom" aria-label="放大18天每日餐食總覽"><img src="'+overviewSrc+'" alt="18天早餐午餐晚餐總覽"></button><p>點圖可放大查看</p></div></details>'+
    '<div class="meal-card-grid">'+meals.map(function(x){return '<article class="meal-card"><header><span>D'+x.d+'</span><div><b>'+esc(x.date)+'｜'+esc(x.place)+'</b>'+(x.sub?'<small>'+esc(x.sub)+'</small>':'')+'</div></header>'+row('b',x.b)+row('l',x.l)+row('n',x.n)+'</article>'}).join('')+'</div>';

  var css=document.createElement('style');
  css.textContent='\
#food-meals .meal-card-overview{margin:2px 0 14px;border:2px solid #72ccef;border-radius:20px;background:linear-gradient(135deg,#eefaff 0%,#f8fdff 62%,#fffdf8 100%);box-shadow:0 10px 24px rgba(34,128,170,.12);overflow:hidden}\
#food-meals .meal-card-overview summary{list-style:none;display:flex;align-items:center;gap:12px;min-height:72px;padding:12px 14px;cursor:pointer;color:var(--navy)}\
#food-meals .meal-card-overview summary::-webkit-details-marker{display:none}\
#food-meals .meal-menu-icon{position:relative;display:block;flex:0 0 56px;width:56px;height:54px}\
#food-meals .meal-menu-sheet{position:absolute;left:11px;top:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;width:36px;height:42px;border:1.5px solid #b9877e;border-radius:7px;background:linear-gradient(160deg,#fff8ef,#ffeef0);box-shadow:0 3px 7px rgba(99,72,63,.14);transform:rotate(-5deg);color:#8d615b}\
#food-meals .meal-menu-sheet b{font-family:cursive;font-size:10px;line-height:1;color:#a86c63}\
#food-meals .meal-menu-sheet i{margin-top:4px;font-size:15px;font-style:normal;filter:saturate(.7)}\
#food-meals .meal-menu-rings{position:absolute;z-index:2;left:14px;top:3px;width:31px;height:8px;background:repeating-linear-gradient(90deg,#526c7a 0 2px,transparent 2px 7px);border-radius:8px;transform:rotate(-5deg)}\
#food-meals .meal-menu-leaf{position:absolute;bottom:4px;width:13px;height:7px;border:2px solid #789a78;border-width:2px 0 0 0;border-radius:50%;opacity:.85}\
#food-meals .meal-menu-leaf.left{left:2px;transform:rotate(35deg)}#food-meals .meal-menu-leaf.right{right:1px;transform:rotate(-35deg)}\
#food-meals .meal-menu-icon:after{content:"";position:absolute;right:1px;top:8px;width:11px;height:15px;border-top:3px solid #f3b53f;border-radius:50%;transform:rotate(24deg)}\
#food-meals .meal-overview-copy{min-width:0;flex:1}\
#food-meals .meal-overview-copy b{display:block;color:#0f587d;font-size:15px;line-height:1.35;font-weight:900;letter-spacing:.01em}\
#food-meals .meal-overview-copy small{display:block;margin-top:4px;color:#6e8796;font-size:11px;line-height:1.4;font-weight:700}\
#food-meals .meal-overview-action{display:inline-flex;align-items:center;justify-content:center;gap:7px;flex:0 0 auto;min-width:108px;height:44px;padding:0 12px 0 14px;border-radius:999px;background:linear-gradient(180deg,#dff3ff,#c7ebff);color:#0b5f89;font-size:13px;font-weight:900;line-height:1;box-shadow:inset 0 0 0 2px rgba(71,171,219,.28),0 5px 12px rgba(38,122,163,.16);transition:background .2s ease,box-shadow .2s ease}\
#food-meals .meal-overview-action-text{display:block;white-space:nowrap;letter-spacing:.01em}\
#food-meals .meal-overview-action-text.close{display:none}\
#food-meals .meal-overview-action-arrow{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.6);font-size:17px;font-weight:900;transition:transform .2s ease}\
#food-meals .meal-card-overview[open] .meal-overview-action{background:linear-gradient(180deg,#caecff,#b9e4fb);box-shadow:inset 0 0 0 2px rgba(71,171,219,.3),0 5px 12px rgba(38,122,163,.18)}\
#food-meals .meal-card-overview[open] .meal-overview-action-text.open{display:none}\
#food-meals .meal-card-overview[open] .meal-overview-action-text.close{display:block}\
#food-meals .meal-card-overview[open] .meal-overview-action-arrow{transform:rotate(180deg)}\
#food-meals .meal-card-overview-body{padding:0 12px 12px}\
#food-meals .meal-card-overview-body button{display:block;width:100%;padding:0;border:0;background:transparent;cursor:zoom-in}\
#food-meals .meal-card-overview-body img{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:16px;background:#fff}\
#food-meals .meal-card-overview-body p{margin:7px 2px 0;text-align:right;color:var(--muted);font-size:11px}\
#food-meals .meal-card-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}\
#food-meals .meal-card{position:relative;overflow:hidden;margin:0;padding:10px;border:1px solid rgba(83,137,151,.18);border-radius:18px;background:rgba(255,255,255,.94);box-shadow:0 7px 18px rgba(25,71,92,.06)}\
#food-meals .meal-card:before,#food-meals .meal-card:after{content:"";position:absolute;border-radius:50%;pointer-events:none;opacity:.55}\
#food-meals .meal-card:before{width:64px;height:64px;right:-28px;top:-28px;background:#eaf7ff}\
#food-meals .meal-card:after{width:40px;height:40px;right:26px;top:-22px;background:#fff0c8}\
#food-meals .meal-card header{position:relative;z-index:1;display:grid;grid-template-columns:auto minmax(0,1fr);gap:7px;align-items:center;padding-bottom:9px;border-bottom:1px dashed rgba(80,127,142,.18)}\
#food-meals .meal-card header>span{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:linear-gradient(145deg,#dff3ff,#eefaff);color:#17648a;font-size:13px;font-weight:900;box-shadow:inset 0 0 0 1px rgba(61,145,181,.12)}\
#food-meals .meal-card header b{display:block;color:var(--navy);font-size:11.5px;line-height:1.35}\
#food-meals .meal-card header small{display:block;margin-top:2px;color:var(--muted);font-size:9.5px;font-weight:650}\
#food-meals .meal-card-row{display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px;align-items:start;margin-top:6px;padding:7px;border:1px solid rgba(73,121,136,.11);border-radius:12px}\
#food-meals .meal-card-row.b{background:#fff8dc}#food-meals .meal-card-row.l{background:#edf9f3}#food-meals .meal-card-row.n{background:#fff0f1}\
#food-meals .meal-card-icon{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.82);font-size:14px}\
#food-meals .meal-card-copy{min-width:0}\
#food-meals .meal-card-copy strong{display:block;color:#173f5b;font-size:11px;line-height:1.35;overflow-wrap:anywhere}\
#food-meals .meal-card-copy small{display:block;margin-top:2px;color:var(--muted);font-size:9px;line-height:1.35;font-weight:600;overflow-wrap:anywhere}\
#food-meals .meal-card-copy em{display:inline-flex;margin-top:3px;padding:2px 5px;border-radius:999px;background:#eef7ff;color:#356e8d;font-size:8.5px;font-style:normal;font-weight:800}\
#food-meals .meal-card-status{grid-column:2;align-self:center;justify-self:start;margin-top:-1px;padding:3px 6px;border-radius:999px;border:1px solid transparent;font-size:8.5px;font-weight:850;white-space:nowrap}\
#food-meals .meal-card-status.self{background:#fff0c6;color:#8a5d00;border-color:#f1d985}#food-meals .meal-card-status.hotel{background:#fbe8f3;color:#a3447a;border-color:#efc4dc}#food-meals .meal-card-status.flight{background:#e8f3fb;color:#246d9a;border-color:#c8e1f4}#food-meals .meal-card-status.booked{background:#e9f7ef;color:#237052;border-color:#c9ead8}#food-meals .meal-card-status.included{background:#ebf7f3;color:#23705f;border-color:#c8e8dd}#food-meals .meal-card-status.none{background:#f4f5f5;color:#899296;border-color:#e3e6e7}\
#mealCardModal img{max-width:96vw;max-height:88vh;object-fit:contain}\
@media(min-width:760px){#food-meals .meal-card-grid{gap:12px}#food-meals .meal-card{padding:14px;border-radius:20px}#food-meals .meal-card header{gap:10px;padding-bottom:11px}#food-meals .meal-card header>span{width:48px;height:48px;border-radius:16px;font-size:16px}#food-meals .meal-card header b{font-size:15px}#food-meals .meal-card header small{font-size:11px;margin-top:3px}#food-meals .meal-card-row{grid-template-columns:auto minmax(0,1fr) auto;gap:9px;margin-top:8px;padding:9px 10px;border-radius:14px}#food-meals .meal-card-icon{width:28px;height:28px;border-radius:9px;font-size:15px}#food-meals .meal-card-copy strong{font-size:13px}#food-meals .meal-card-copy small{font-size:10.5px;line-height:1.4}#food-meals .meal-card-copy em{margin-top:4px;padding:3px 7px;font-size:10px}#food-meals .meal-card-status{grid-column:auto;justify-self:end;margin-top:0;padding:4px 7px;font-size:10px}}\
@media(max-width:520px){#food-meals .meal-card-overview summary{gap:9px;padding:10px 11px}#food-meals .meal-menu-icon{flex-basis:52px;width:52px}#food-meals .meal-overview-action{min-width:96px;height:40px;padding:0 10px 0 12px;gap:5px;font-size:12px}#food-meals .meal-overview-action-arrow{width:20px;height:20px;font-size:16px}}';
  document.head.appendChild(css);

  var old=document.getElementById('mealModal'); if(old)old.hidden=true;
  var modal=document.createElement('div'); modal.className='image-modal'; modal.id='mealCardModal'; modal.hidden=true;
  modal.innerHTML='<button class="image-modal-close" type="button" aria-label="關閉">×</button><img src="'+overviewSrc+'" alt="放大的18天每日餐食總覽">';
  document.body.appendChild(modal);
  function close(){modal.hidden=true;document.body.style.overflow=''}
  document.getElementById('mealCardOverviewZoom').addEventListener('click',function(){modal.hidden=false;document.body.style.overflow='hidden'});
  modal.querySelector('.image-modal-close').addEventListener('click',close);
  modal.addEventListener('click',function(e){if(e.target===modal)close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!modal.hidden)close()});
});
