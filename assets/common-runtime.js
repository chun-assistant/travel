/* Shared runtime core. Daily view rendering lives in common-runtime-view.js. */
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
const renderCountdown = COMMON_UTILS.renderCountdown;
const renderNetwork = COMMON_UTILS.renderNetwork;
const bindSegments = COMMON_UTILS.bindSegments;
const bindGuideImages = COMMON_UTILS.bindGuideImages;
const renderPractical = () => COMMON_UTILS.renderPractical(APP_DATA);
const renderMeals = () => COMMON_UTILS.renderMeals(APP_DATA);

const state = {
  day: Number(stored("aurora-day")) || 1,
  eventFilter: "全部",
  eventSearch: "",
  transportFilter: "全部",
  checks: stored("aurora-checks") || {},
};

const view = window.TravelCommonRuntimeView.setup({
  $, $$, APP_DATA, COUNTRY_STAGES, state, save, escapeHtml,
  dateLabel, fmtTwd, fmtCost, statusClass, eventKind, filterKind,
  buildDirections, isAirportPlace, mapIcon, pinIcon, copyIcon, copyText
});

const renderNotices = view.renderNotices;
const renderDayView = view.renderDayView;
const renderDayScroller = view.renderDayScroller;
const renderCountryTrack = view.renderCountryTrack;
const enableHorizontalDrag = view.enableHorizontalDrag;
const renderEventFilters = view.renderEventFilters;
const renderEvents = view.renderEvents;
const eventCard = view.eventCard;
const isHotelPlace = view.isHotelPlace;
const isNavigableEvent = view.isNavigableEvent;

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

window.TravelDailyRuntime = Object.freeze({
  $: $, $$: $$, escapeHtml: escapeHtml, dateLabel: dateLabel, state: state,
  save: save, renderDayView: renderDayView, renderEvents: renderEvents,
  renderEventFilters: renderEventFilters, copyText: copyText,
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
