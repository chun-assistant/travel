const COUNTRY_STAGES = window.TravelCoreData.getCountryStages();
const PACKING_GROUPS = window.TravelPackingData.getGroups();
const PRINT_GROUPS = window.TravelPrintData.getGroups();
const APP_DATA = window.TravelCoreData.getAppData();
const COMMON_UTILS = window.TravelCommonUtils;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = COMMON_UTILS.escapeHtml;
const fmtTwd = COMMON_UTILS.fmtTwd;
const fmtCost = COMMON_UTILS.fmtCost;
const dateLabel = COMMON_UTILS.dateLabel;
const currentTripDay = COMMON_UTILS.currentTripDay;
const statusClass = COMMON_UTILS.statusClass;
const eventKind = COMMON_UTILS.eventKind;
const filterKind = COMMON_UTILS.filterKind;
const buildDirections = COMMON_UTILS.buildDirections;
const isAirportPlace = COMMON_UTILS.isAirportPlace;
const mapIcon = COMMON_UTILS.mapIcon;
const pinIcon = COMMON_UTILS.pinIcon;
const copyIcon = COMMON_UTILS.copyIcon;
const stored = COMMON_UTILS.stored;
const save = COMMON_UTILS.save;
const toast = COMMON_UTILS.toast;
const copyText = COMMON_UTILS.copyText;

const isHotelPlace = value => {
  const place = String(value || "").trim().toLowerCase();
  if (!place || isAirportPlace(place)) return false;
  return APP_DATA.hotels.filter(h => !/night train|夜臥火車|機上/i.test(`${h.name} ${h.city}`)).some(h => [h.name,h.address].some(term => {
    const candidate = String(term || "").trim().toLowerCase();
    return candidate && (place.includes(candidate) || candidate.includes(place));
  }));
};
const isNavigableEvent = event => {
  if (!event?.place || isAirportPlace(`${event.type} ${event.title} ${event.place}`)) return false;
  const type = String(event.type || "");
  return /景點|活動/.test(type) || (/住宿/.test(type) && isHotelPlace(event.place));
};

const state = {
  day: Number(stored("aurora-day")) || 1,
  eventFilter: "全部",
  eventSearch: "",
  transportFilter: "全部",
  checks: stored("aurora-checks") || {},
};

function renderCountdown() {
  const today = new Date(); today.setHours(12,0,0,0);
  const start = new Date("2026-09-24T12:00:00"), end = new Date("2026-10-11T12:00:00");
  if (today < start) { $("#countdownValue").textContent = `${Math.ceil((start-today)/86400000)} 天`; $("#countdownLabel").textContent = "距離出發"; }
  else if (today <= end) { $("#countdownValue").textContent = `Day ${currentTripDay()}`; $("#countdownLabel").textContent = "旅程進行中"; }
  else { $("#countdownValue").textContent = "完成"; $("#countdownLabel").textContent = "旅程回憶"; }
}
function renderNetwork() {
  const online = navigator.onLine;
  $("#networkBadge").classList.toggle("offline", !online);
  $("#networkBadge span").textContent = online ? "地圖可開啟" : "離線可查看";
}

function renderNotices() {
  const notices = [
    ["🚆","9/25機場交通已修正","VIE搭REX7／Railjet至Wien Hbf，再轉U1；不是機場接送。"],
    ["⛪","9/27白教堂週日時段","09:15先拍外觀；若要入內，依官方週日12:00後時段回訪。"],
    ["🍽️","餐食限制","全團避開牛肉與game meat（馴鹿、麋鹿、鹿肉等）；可選雞、豬、魚或素食。"],
    ["❄️","舒適優先","強風、結冰或長距離時可分流、改短程計程車，不勉強走海岸冰面。"],
  ];
  $("#globalNotices").innerHTML = notices.map(n => `<article class="notice"><div class="notice-icon">${n[0]}</div><div><strong>${escapeHtml(n[1])}</strong><p>${escapeHtml(n[2])}</p></div></article>`).join("");
}

function renderDayScroller() {
  $("#dayScroller").innerHTML = APP_DATA.overview.map(d => {
    const dayStage = d.day >= 2 && d.day <= 3 ? COUNTRY_STAGES[0]
      : d.day >= 4 && d.day <= 8 ? COUNTRY_STAGES[1]
      : d.day >= 9 && d.day <= 14 ? COUNTRY_STAGES[2]
      : d.day >= 15 && d.day <= 17 ? COUNTRY_STAGES[3]
      : null;
    const dayColor = dayStage?.color || "#dbe6e3";
    return `<button class="day-chip ${d.day===state.day?"active":""}" data-day="${d.day}" style="--day-color:${dayColor}"><b>Day ${d.day}</b><small>${escapeHtml(dateLabel(d.date))}</small><small class="day-place">${escapeHtml(d.city)}</small></button>`;
  }).join("");
  $$(".day-chip").forEach(btn => btn.addEventListener("click", () => { state.day=Number(btn.dataset.day); save("aurora-day",state.day); renderDayView(); setTimeout(()=>btn.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"}),20); }));
}

function renderCountryTrack() {
  $("#countryTrack").innerHTML = COUNTRY_STAGES.map(stage=>{ const code={"奧地利":"奧地利 (Austria)","芬蘭":"芬蘭 (Finland)","挪威":"挪威 (Norway)","荷蘭":"荷蘭 (Netherlands)"}[stage.country]||stage.country; return `<button class="country-stage ${state.day>=stage.start&&state.day<=stage.end?"active":""}" data-day="${stage.start}" style="--stage-color:${stage.color};--stage-start:${stage.start};--stage-end:${stage.end+1}" aria-label="前往${escapeHtml(stage.country)}行程 Day ${stage.start}"><span class="country-dot">${stage.flag}</span><b>${code}</b><small>Day ${stage.start}–${stage.end}</small></button>`; }).join("");
  $$(".country-stage",$("#countryTrack")).forEach(btn=>btn.addEventListener("click",()=>{state.day=Number(btn.dataset.day);save("aurora-day",state.day);renderDayView();setTimeout(()=>$(".day-chip.active")?.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"}),20); }));
}

function enableHorizontalDrag(selector) {
  const el = $(selector);
  if (!el || el.dataset.dragReady) return;
  el.dataset.dragReady = "1";
  let dragging = false, startX = 0, startScroll = 0;
  el.addEventListener("pointerdown", e => { if (e.button !== 0) return; dragging = true; startX = e.clientX; startScroll = el.scrollLeft; el.classList.add("dragging");  });
  el.addEventListener("pointermove", e => { if (dragging) el.scrollLeft = startScroll - (e.clientX - startX); });
  const stop = () => { dragging = false; el.classList.remove("dragging"); };
  el.addEventListener("pointerup", stop);
  el.addEventListener("pointercancel", stop);
  el.addEventListener("wheel", e => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { el.scrollLeft += e.deltaY; e.preventDefault(); } }, {passive:false});
}

function renderDayView() {
  renderDayScroller();
  renderCountryTrack();
  enableHorizontalDrag("#dayScroller");
  enableHorizontalDrag("#countryScroll");
  const d = APP_DATA.overview.find(x => x.day === state.day);
  if (!d) return;
  $("#daySummary").innerHTML = `<article class="day-summary"><div class="day-kicker">DAY ${d.day} · ${escapeHtml(dateLabel(d.date))}</div><h3>${escapeHtml(d.city)}</h3><p>${escapeHtml(d.highlight)}</p><div class="day-summary-meta"><span>🚉 ${escapeHtml(d.transport)}</span><span>🛏️ ${escapeHtml(d.hotel)}</span><span>🚶 體力 ${escapeHtml(d.effort)}</span><span>💰 ${fmtTwd(d.estimate)}</span></div></article>`;
  renderEventFilters();
  renderEvents();
}
function renderEventFilters() {
  const labels = ["全部","交通","景點","餐飲","住宿","其他"];
  $("#eventFilters").innerHTML = labels.map(v => `<button class="filter-chip ${state.eventFilter===v?"active":""}" data-filter="${v}">${v}</button>`).join("");
  $$("#eventFilters .filter-chip").forEach(btn=>btn.addEventListener("click",()=>{state.eventFilter=btn.dataset.filter; renderEventFilters(); renderEvents();}));
}
function eventCard(e) {
  const kind = eventKind(e.type);
  const nav = isNavigableEvent(e) ? buildDirections(e.place) : "";
  const mapButton = nav ? `<a class="map-btn" href="${escapeHtml(nav)}" target="_blank" rel="noopener">${mapIcon}開始導航</a>` : "";
  const cost = fmtCost(e.currency, e.cost);
  return `<article class="event-card ${kind}">
    <div class="event-top"><div><span class="event-time">◷ ${escapeHtml(e.start)}${e.end?`–${escapeHtml(e.end)}`:""}</span><span class="event-type"> · ${escapeHtml(e.type)}</span></div><span class="status ${statusClass(e.status)}">${escapeHtml(e.status||"行程")}</span></div>
    <h4>${escapeHtml(e.title)}</h4>
    ${e.place?`<div class="event-place">${pinIcon}<span>${escapeHtml(e.place)}</span></div>`:""}
    <div class="meta-grid">
      <div class="meta-box"><small>交通／方式</small><b>${escapeHtml(e.transport||"—")}</b></div>
      <div class="meta-box"><small>移動／停留</small><b>${escapeHtml(e.duration||"—")}</b></div>
      <div class="meta-box"><small>費用／人</small><b>${escapeHtml(cost)}</b></div>
      <div class="meta-box"><small>票券／集合</small><b>${escapeHtml(e.ticket||"—")}</b></div>
    </div>
    <div class="event-actions">${mapButton}${e.place?`<button class="ghost-btn copy-place" data-copy="${escapeHtml(e.place)}">${copyIcon}</button>`:""}</div>
    <details class="more"><summary>費用與舒適提醒</summary><div class="detail-note"><span><b>費用：</b>${escapeHtml(e.costNote||"—")}</span><span><b>提醒：</b>${escapeHtml(e.note||"—")}</span><span><b>依據：</b>${escapeHtml(e.source||"—")}</span></div></details>
  </article>`;
}
function renderEvents() {
  const q = state.eventSearch.trim().toLowerCase();
  const rows = APP_DATA.events.filter(e => e.day === state.day).filter(e => state.eventFilter === "全部" || filterKind(e.type) === state.eventFilter).filter(e => !q || [e.title,e.place,e.type,e.transport,e.note].join(" ").toLowerCase().includes(q));
  $("#eventTimeline").innerHTML = rows.length ? rows.map(eventCard).join("") : `<div class="empty"><b>找不到符合項目</b>請更換類別或搜尋文字</div>`;
  $$(".copy-place", $("#eventTimeline")).forEach(btn => btn.addEventListener("click",()=>copyText(btn.dataset.copy)));
}

function initChecks() {
  APP_DATA.prep.forEach((item,i)=>{ const id=`p${i}`; if (!(id in state.checks) && /已完成|已裝/.test(item.status||"")) state.checks[id]=true; });
  APP_DATA.bookings.forEach((item,i)=>{ const id=`b${i}`; if (!(id in state.checks) && /已完成|已購票|已確認/.test(item.status||"")) state.checks[id]=true; });
  save("aurora-checks",state.checks);
}
function renderChecklist() {
  initChecks();
  const packing = PACKING_GROUPS.flatMap((group,groupIndex)=>group.items.map((item,itemIndex)=>({...item,group:group.group,id:`pack-${groupIndex}-${itemIndex}`})));
  $("#checklist").innerHTML = PACKING_GROUPS.map((group,groupIndex)=>`<section class="check-group"><h3>${escapeHtml(group.group)}</h3>${group.items.map((item,itemIndex)=>{const id=`pack-${groupIndex}-${itemIndex}`;return `<label class="check-item ${state.checks[id]?"done":""}"><input type="checkbox" data-check="${id}" ${state.checks[id]?"checked":""}><span class="fake-check">✓</span><span class="check-copy"><b>${escapeHtml(item.item)}</b><small>${escapeHtml([item.owner,item.note].filter(Boolean).join(" · "))}</small></span><span class="status neutral">未裝</span></label>`;}).join("")}</section>`).join("");
  $$("[data-check]",$("#checklist")).forEach(input=>input.addEventListener("change",()=>{state.checks[input.dataset.check]=input.checked;save("aurora-checks",state.checks);renderChecklist();}));
  const total=packing.length, done=packing.filter(item=>state.checks[item.id]).length, pct=total?Math.round(done/total*100):0;
  $("#checkPercent").textContent=`${pct}%`; $("#checkCount").textContent=`${done} / ${total}`; $("#progressFill").style.width=`${pct}%`;
}
function renderPractical() {
  $("#practicalList").innerHTML = APP_DATA.practical.map(p=>`<article class="practical-card"><span class="topic">${escapeHtml(p.topic)}</span><h4>${escapeHtml(p.item)}</h4><p><b>${escapeHtml(p.value||"")}</b>${p.value&&p.guide?"\n":""}${escapeHtml(p.guide||"")}</p>${p.source&&/^https?:/.test(p.source)?`<a class="source-link" href="${escapeHtml(p.source)}" target="_blank" rel="noopener">查看官方資料 ↗</a>`:p.source?`<span class="source-link">${escapeHtml(p.source)}</span>`:""}</article>`).join("");
}
function renderBookings() {
  initChecks();
  const prepTodos=APP_DATA.prep.map((item,i)=>({...item,id:`p${i}`})).filter(item=>item.phase!=="行李").map(item=>item.category==="網路"?{...item,item:"準備eSIM或實體SIM卡",note:"eSIM先安裝並離線保存QR／APN；實體SIM帶退卡針，抵達VIE前確認漫遊設定"}:item);
  const bookingTodos=APP_DATA.bookings.map((item,i)=>({...item,id:`b${i}`}));
  const printChecklist=`<div class="section-head inner-head"><div><h2>紙本列印分工</h2><p>個人與團長分開準備；重要資料保留第二套備援</p></div></div>${PRINT_GROUPS.map((group,groupIndex)=>`<section class="check-group"><h3>${escapeHtml(group.group)}</h3>${group.items.map((item,itemIndex)=>{const id=`print-${groupIndex}-${itemIndex}`;return `<label class="check-item ${state.checks[id]?"done":""}"><input type="checkbox" data-todo="${id}" ${state.checks[id]?"checked":""}><span class="fake-check">✓</span><span class="check-copy"><b>${escapeHtml(item.item)}</b><small>${escapeHtml(item.note)}</small></span><span class="status neutral">${escapeHtml(group.tag)}</span></label>`;}).join("")}</section>`).join("")}`;
  const checklist=`<div class="section-head inner-head"><div><h2>行前執行清單</h2><p>不含紙本列印與訂位缺漏</p></div></div><section class="check-group">${prepTodos.map(item=>`<label class="check-item ${state.checks[item.id]?"done":""}"><input type="checkbox" data-todo="${item.id}" ${state.checks[item.id]?"checked":""}><span class="fake-check">✓</span><span class="check-copy"><b>${escapeHtml(item.item)}</b><small>${escapeHtml([item.phase,item.owner,item.note].filter(Boolean).join(" · "))}</small></span><span class="status ${statusClass(item.status)}">${escapeHtml(item.status||"待辦")}</span></label>`).join("")}</section>`;
  const bookings=`<div class="section-head inner-head"><div><h2>訂位／付款缺漏</h2><p>完成後可直接勾選，紀錄保存在這台裝置</p></div></div>${bookingTodos.map(b=>`<label class="check-item ${state.checks[b.id]?"done":""}"><input type="checkbox" data-todo="${b.id}" ${state.checks[b.id]?"checked":""}><span class="fake-check">✓</span><span class="check-copy"><b>${escapeHtml(b.item)}</b><small>${escapeHtml([b.category,b.date,b.deadline,b.missing,b.note].filter(Boolean).join(" · "))}</small></span><span class="status ${statusClass(b.status)}">${escapeHtml(b.status)}</span></label>`).join("")}`;
  $("#bookingList").innerHTML=printChecklist+checklist+bookings;
  $$("[data-todo]",$("#bookingList")).forEach(input=>input.addEventListener("change",()=>{state.checks[input.dataset.todo]=input.checked;save("aurora-checks",state.checks);renderBookings();}));
}
function renderTax() {
  $("#taxList").innerHTML = APP_DATA.tax.map(t=>`<article class="info-card"><div class="event-top"><div><span class="event-type">退稅地區</span><h3>${escapeHtml(t.country||"退稅步驟")}</h3></div>${t.threshold?`<span class="status neutral">門檻 ${escapeHtml(t.threshold)}</span>`:""}</div><div class="info-card-row"><span>VAT／表單</span><b>${escapeHtml([t.vat,t.form].filter(Boolean).join(" · ")||"—")}</b></div><div class="info-card-row"><span>本行程驗證點</span><b>${escapeHtml(t.checkpoint||"—")}</b></div><div class="info-card-row"><span>攜帶物品</span><b>${escapeHtml(t.bring||"—")}</b></div><div class="info-card-row"><span>操作</span><b>${escapeHtml(t.action||"—")}</b></div><div class="info-card-row"><span>避免失敗</span><b>${escapeHtml(t.failure||"—")}</b></div>${t.source&&/^https?:/.test(t.source)?`<div class="event-actions"><a class="map-btn" href="${escapeHtml(t.source)}" target="_blank" rel="noopener">查看官方來源</a></div>`:""}</article>`).join("");
}

function renderBudget() {
  const max=Math.max(...APP_DATA.budgets.map(b=>Number(b.total)||0));
  $("#budgetSummary").innerHTML=`<article class="budget-total"><small>目前每人預估總額</small><span class="amount">${fmtTwd(APP_DATA.budgetSummary.final)}</span><p>原表 ${fmtTwd(APP_DATA.budgetSummary.original)} ＋ 新增生活／交通調整 ${fmtTwd(APP_DATA.budgetSummary.adjustment)}。仍不含SAS主欄缺漏、未報價van及部分待購活動。</p></article>`;
  $("#budgetList").innerHTML=APP_DATA.budgets.map(b=>`<details class="budget-day"><summary><div class="budget-line"><div class="budget-day-label"><b>Day ${b.day}</b><small>${escapeHtml(dateLabel(b.date))}</small></div><div class="bar-track"><div class="bar-fill" style="width:${Math.max(2,Number(b.total)/max*100)}%"></div></div><span class="budget-amount">${fmtTwd(b.total)}</span></div></summary><div class="budget-detail"><div><small>住宿</small><b>${fmtTwd(b.hotel)}</b></div><div><small>長途交通／機票</small><b>${fmtTwd(b.transport)}</b></div><div><small>活動／保險</small><b>${fmtTwd(b.activity)}</b></div><div><small>餐飲</small><b>${fmtTwd((Number(b.norwayMeal)||0)+(Number(b.food)||0))}</b></div><div><small>市區交通</small><b>${fmtTwd(b.local)}</b></div><div><small>雜支／購物</small><b>${fmtTwd(b.misc)}</b></div></div><p class="subtitle">${escapeHtml(b.city)} · ${escapeHtml(b.note)}</p></details>`).join("");
}
function renderFood() {
  $("#foodList").innerHTML=APP_DATA.food.map(f=>`<article class="info-card food-card"><div class="event-top"><div><span class="event-type">${escapeHtml(f.date)} · ${escapeHtml(f.city)} · ${escapeHtml(f.category)}</span><h3>${escapeHtml(f.shop)}</h3></div><span class="status ${statusClass(f.status)}">${escapeHtml(f.status)}</span></div><p class="subtitle">${escapeHtml(f.recommendation)}</p><div class="info-card-row"><span>預估價格</span><b class="food-price">${escapeHtml(f.price||"現場支付")}</b></div><div class="info-card-row"><span>提醒</span><b>${escapeHtml(f.note||"—")}</b></div></article>`).join("");
}
function renderMeals() {
  $("#mealList").innerHTML=APP_DATA.mealReminders.map(m=>`<article class="info-card food-card"><div class="event-top"><div><span class="event-type">${escapeHtml(m.date)} · ${escapeHtml(m.city)}</span><h3>${escapeHtml(m.meals.join("／"))}</h3></div><span class="status pending">需自理</span></div><p class="subtitle">${escapeHtml(m.note)}</p></article>`).join("");
}

function bindGuideImages() {
  const modal=$("#imageModal"), content=$("#imageModalContent"), caption=$("#imageModalCaption");
  const closeModal=()=>{ modal.hidden=true; content.removeAttribute("src"); document.body.style.overflow=""; };
  $$('[data-zoom-image]').forEach(button=>button.addEventListener("click",()=>{
    const img=$("img",button), figure=button.closest("figure"), label=$("figcaption",figure)?.textContent.replace("點圖放大","").trim()||img.alt;
    content.src=img.src; content.alt=img.alt; caption.textContent=label; modal.hidden=false; document.body.style.overflow="hidden";
  }));
  $("#imageModalClose").addEventListener("click",closeModal);
  modal.addEventListener("click",event=>{ if(event.target===modal) closeModal(); });
  document.addEventListener("keydown",event=>{ if(event.key==="Escape"&&!modal.hidden) closeModal(); });
}

function bindSegments(rootSelector, panelPrefix) {
  $$(".segment",$(rootSelector)).forEach(btn=>btn.addEventListener("click",()=>{
    $$(".segment",$(rootSelector)).forEach(x=>x.classList.toggle("active",x===btn));
    const root=$(rootSelector).parentElement;
    $$(".subview",root).forEach(x=>x.classList.toggle("active",x.id===`${panelPrefix}${btn.dataset.sub}`));
  }));
}

window.TravelDailyRuntime = Object.freeze({
  $: $,
  $$: $$,
  escapeHtml: escapeHtml,
  dateLabel: dateLabel,
  state: state,
  save: save,
  renderDayView: renderDayView,
  renderEvents: renderEvents,
  renderEventFilters: renderEventFilters,
  copyText: copyText,
  enableHorizontalDrag: enableHorizontalDrag
});

function init() {
  renderCountdown(); renderNetwork(); renderNotices(); renderDayView(); renderChecklist(); renderPractical(); renderBookings(); renderTax(); renderBudget(); renderFood(); renderMeals(); bindGuideImages();
  $("#jumpToday").addEventListener("click",()=>{state.day=currentTripDay();save("aurora-day",state.day);renderDayView();toast(`已切換 Day ${state.day}`);});
  $("#eventSearch").addEventListener("input",e=>{state.eventSearch=e.target.value;renderEvents();});
  $("#clearSearch").addEventListener("click",()=>{$("#eventSearch").value="";state.eventSearch="";renderEvents();});
  $("#resetChecks").addEventListener("click",()=>{if(confirm("確定要清除所有行李與待辦勾選紀錄嗎？")){state.checks={};save("aurora-checks",state.checks);renderChecklist();renderBookings();toast("行李與待辦已重設");}});
  bindSegments("#luggageSegments","sub-"); bindSegments("#budgetSegments","budget-");
  window.addEventListener("online",renderNetwork); window.addEventListener("offline",renderNetwork);
}
init();
