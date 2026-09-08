const COUNTRY_STAGES = window.TravelCoreData.getCountryStages();
    const PACKING_GROUPS = window.TravelPackingData.getGroups();
    const PRINT_GROUPS = window.TravelPrintData.getGroups();
    const APP_DATA = window.TravelCoreData.getAppData();;

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
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
    const mapIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>`;
    const pinIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2"></circle></svg>`;
    const copyIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg>`;

    const buildDirections = place => {
      if (!place) return "";
      const parts = String(place).split(/→|->/).map(s => s.trim()).filter(Boolean);
      const destination = parts.at(-1) || String(place).trim();
      const p = new URLSearchParams({ api: "1", destination, dir_action: "navigate" });
      return `https://www.google.com/maps/dir/?${p.toString()}`;
    };
    const isAirportPlace = value => /airport|機場|航廈|departure hall|check-in area/i.test(String(value || ""));
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

    const stored = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
    const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
    const state = {
      day: Number(stored("aurora-day")) || 1,
      eventFilter: "全部",
      eventSearch: "",
      transportFilter: "全部",
      checks: stored("aurora-checks") || {},
    };

    let toastTimer;
    function toast(message) {
      const el = $("#toast"); el.textContent = message; el.classList.add("show");
      clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 1700);
    }
    async function copyText(text) {
      try { await navigator.clipboard.writeText(text); toast("地址已複製"); }
      catch { const t=document.createElement("textarea"); t.value=text; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); toast("地址已複製"); }
    }

    function currentTripDay() {
      const today = new Date(); today.setHours(12,0,0,0);
      const start = new Date("2026-09-24T12:00:00");
      const end = new Date("2026-10-11T12:00:00");
      if (today < start) return 1;
      if (today > end) return 18;
      return Math.min(18, Math.max(1, Math.round((today-start)/86400000)+1));
    }
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
      $$(".country-stage",$("#countryTrack")).forEach(btn=>btn.addEventListener("click",()=>{state.day=Number(btn.dataset.day);save("aurora-day",state.day);renderDayView();setTimeout(()=>$(".day-chip.active")?.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"}),20);}));
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
      if (window.TravelDailyEventFilters) {
        if (!window.TravelDailyEventFiltersRenderer) {
          window.TravelDailyEventFiltersRenderer = window.TravelDailyEventFilters.init({ $, $$, state, renderEvents });
        }
        window.TravelDailyEventFiltersRenderer.render();
      } else {
        renderEventFiltersFallback();
      }
      renderEvents();
    }
    function renderEventFiltersFallback() {
      const labels = ["全部","交通","景點","餐飲","住宿","其他"];
      $("#eventFilters").innerHTML = labels.map(v => `<button class="filter-chip ${state.eventFilter===v?"active":""}" data-filter="${v}">${v}</button>`).join("");
      $$("#eventFilters .filter-chip").forEach(btn => btn.addEventListener("click",()=>{state.eventFilter=btn.dataset.filter; renderEventFiltersFallback(); renderEvents();}));
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
