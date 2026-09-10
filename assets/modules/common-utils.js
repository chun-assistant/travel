/* Shared runtime formatting and event helpers. */
(function (root) {
  const escapeHtml = (value = "") => String(value ?? "").replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));
  const fmtTwd = value => Number.isFinite(Number(value)) ? `NT$${new Intl.NumberFormat("zh-TW", { maximumFractionDigits: 0 }).format(Number(value))}` : "待確認";
  const fmtCost = (currency, value) => {
    if (value === null || value === undefined || value === "") return "待確認";
    const n = new Intl.NumberFormat("zh-TW", { maximumFractionDigits: 2 }).format(Number(value));
    return currency === "TWD" ? `NT$${n}` : `${currency || ""} ${n}`.trim();
  };
  const dateLabel = iso => {
    if (!iso) return "";
    const d = new Date(`${iso}T12:00:00`);
    return `${d.getMonth()+1}/${d.getDate()}（${"日一二三四五六"[d.getDay()]}）`;
  };
  const currentTripDay = () => {
    const today = new Date(); today.setHours(12,0,0,0);
    const start = new Date("2026-09-24T12:00:00");
    const end = new Date("2026-10-11T12:00:00");
    if (today < start) return 1;
    if (today > end) return 18;
    return Math.min(18, Math.max(1, Math.round((today-start)/86400000)+1));
  };
  const stored = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
  const statusClass = status => {
    const s = String(status || "");
    if (/缺漏|衝突|更正|取消/.test(s)) return "alert";
    if (/待|備選|視|未/.test(s)) return "pending";
    if (/已|確認|購票|排定/.test(s)) return "";
    return "neutral";
  };
  const eventKind = type => {
    const t = String(type || "");
    if (/餐|早餐|午餐|晚餐|甜點|購物|市場/.test(t)) return "kind-food";
    if (/住宿|休息|退房|入住/.test(t)) return "kind-hotel";
    if (/景點|活動|極光|拍照/.test(t)) return "kind-spot";
    if (/航班|集合|機場/.test(t)) return "kind-fixed";
    return "kind-transit";
  };
  const filterKind = type => {
    const t = String(type || "");
    if (/餐|早餐|午餐|晚餐|甜點|購物|市場/.test(t)) return "餐飲";
    if (/住宿|休息|退房|入住/.test(t)) return "住宿";
    if (/景點|活動|極光|拍照/.test(t)) return "景點";
    if (/交通|航班|接送|公車|火車|巴士|候車|機場/.test(t)) return "交通";
    return "其他";
  };
  const buildDirections = place => {
    if (!place) return "";
    const parts = String(place).split(/→|->/).map(s => s.trim()).filter(Boolean);
    const destination = parts.at(-1) || String(place).trim();
    const p = new URLSearchParams({ api: "1", destination, dir_action: "navigate" });
    return `https://www.google.com/maps/dir/?${p.toString()}`;
  };
  const isAirportPlace = value => /airport|機場|航廈|departure hall|check-in area/i.test(String(value || ""));
  const mapIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>`;
  const pinIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2"></circle></svg>`;
  const copyIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0 2 2v8a2 2 0 0 0 2 2h2"></path></svg>`;
  let toastTimer;
  const toast = message => {
    const el = document.querySelector("#toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1700);
  };
  const copyText = async text => {
    try { await navigator.clipboard.writeText(text); toast("地址已複製"); }
    catch { const t=document.createElement("textarea"); t.value=text; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); toast("地址已複製"); }
  };
  const renderCountdown = () => {
    const today = new Date(); today.setHours(12,0,0,0);
    const start = new Date("2026-09-24T12:00:00"), end = new Date("2026-10-11T12:00:00");
    const valueEl = document.querySelector("#countdownValue");
    const labelEl = document.querySelector("#countdownLabel");
    if (today < start) { valueEl.textContent = `${Math.ceil((start-today)/86400000)} 天`; labelEl.textContent = "距離出發"; }
    else if (today <= end) { valueEl.textContent = `Day ${currentTripDay()}`; labelEl.textContent = "旅程進行中"; }
    else { valueEl.textContent = "完成"; labelEl.textContent = "旅程回憶"; }
  };
  const renderNetwork = () => {
    const online = navigator.onLine;
    const badge = document.querySelector("#networkBadge");
    badge.classList.toggle("offline", !online);
    badge.querySelector("span").textContent = online ? "地圖可開啟" : "離線可查看";
  };
  const renderNotices = () => {
    const notices = [
      ["🚆","9/25機場交通已修正","VIE搭REX7／Railjet至Wien Hbf，再轉U1；不是機場接送。"],
      ["⛪","9/27白教堂週日時段","09:15先拍外觀；若要入內，依官方週日12:00後時段回訪。"],
      ["🍽️","餐食限制","全團避開牛肉與game meat（馴鹿、麋鹿、鹿肉等）；可選雞、豬、魚或素食。"],
      ["❄️","舒適優先","強風、結冰或長距離時可分流、改短程計程車，不勉強走海岸冰面。"],
    ];
    const el = document.querySelector("#globalNotices");
    el.innerHTML = notices.map(n => `<article class="notice"><div class="notice-icon">${n[0]}</div><div><strong>${escapeHtml(n[1])}</strong><p>${escapeHtml(n[2])}</p></div></article>`).join("");
  };
  const bindGuideImages = () => {
    const modal=document.querySelector("#imageModal"), content=document.querySelector("#imageModalContent"), caption=document.querySelector("#imageModalCaption");
    const closeModal=()=>{ modal.hidden=true; content.removeAttribute("src"); document.body.style.overflow=""; };
    document.querySelectorAll('[data-zoom-image]').forEach(button=>button.addEventListener("click",()=>{
      const img=button.querySelector("img"), figure=button.closest("figure"), label=figure?.querySelector("figcaption")?.textContent.replace("點圖放大","").trim()||img.alt;
      content.src=img.src; content.alt=img.alt; caption.textContent=label; modal.hidden=false; document.body.style.overflow="hidden";
    }));
    document.querySelector("#imageModalClose").addEventListener("click",closeModal);
    modal.addEventListener("click",event=>{ if(event.target===modal) closeModal(); });
    document.addEventListener("keydown",event=>{ if(event.key==="Escape"&&!modal.hidden) closeModal(); });
  };
  const bindSegments = (rootSelector, panelPrefix) => {
    const rootEl = document.querySelector(rootSelector);
    if (!rootEl) return;
    rootEl.querySelectorAll(".segment").forEach(btn=>btn.addEventListener("click",()=>{
      rootEl.querySelectorAll(".segment").forEach(x=>x.classList.toggle("active",x===btn));
      const root=rootEl.parentElement;
      root.querySelectorAll(".subview").forEach(x=>x.classList.toggle("active",x.id===`${panelPrefix}${btn.dataset.sub}`));
    }));
  };
  const renderPractical = appData => {
    document.querySelector("#practicalList").innerHTML = appData.practical.map(p=>`<article class="practical-card"><span class="topic">${escapeHtml(p.topic)}</span><h4>${escapeHtml(p.item)}</h4><p><b>${escapeHtml(p.value||"")}</b>${p.value&&p.guide?"\n":""}${escapeHtml(p.guide||"")}</p>${p.source&&/^https?:/.test(p.source)?`<a class="source-link" href="${escapeHtml(p.source)}" target="_blank" rel="noopener">查看官方資料 ↗</a>`:p.source?`<span class="source-link">${escapeHtml(p.source)}</span>`:""}</article>`).join("");
  };

  root.TravelCommonUtils = Object.freeze({
    escapeHtml,
    fmtTwd,
    fmtCost,
    dateLabel,
    currentTripDay,
    stored,
    save,
    statusClass,
    eventKind,
    filterKind,
    bindSegments,
    bindGuideImages,
    renderPractical,
    buildDirections,
    isAirportPlace,
    mapIcon,
    pinIcon,
    copyIcon,
    toast,
    copyText,
    renderCountdown,
    renderNetwork,
    renderNotices
  });
})(window);