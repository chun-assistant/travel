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

  const bindGuideImages = () => {
    const modal = document.querySelector("#imageModal");
    const modalImg = document.querySelector("#imageModalContent");
    const caption = document.querySelector("#imageModalCaption");
    if (!modal || !modalImg) return;
    const close = () => modal.classList.remove("show");
    const closeBtn = document.querySelector("#imageModalClose");
    if (closeBtn && !closeBtn.dataset.bound) { closeBtn.dataset.bound = "1"; closeBtn.addEventListener("click", close); }
    if (!modal.dataset.bound) {
      modal.dataset.bound = "1";
      modal.addEventListener("click", e => { if (e.target === modal) close(); });
      document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    }
    document.querySelectorAll(".guide-image").forEach(img => {
      if (img.dataset.bound) return;
      img.dataset.bound = "1";
      img.addEventListener("click", () => {
        modalImg.src = img.currentSrc || img.src;
        if (caption) caption.textContent = img.alt || "";
        modal.classList.add("show");
      });
    });
  };

  const bindSegments = (rootSelector, panelPrefix) => {
    const rootEl = document.querySelector(rootSelector);
    if (!rootEl) return;
    rootEl.querySelectorAll(".segment").forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => {
        rootEl.querySelectorAll(".segment").forEach(x => x.classList.remove("active"));
        rootEl.querySelectorAll(".subview").forEach(x => x.classList.remove("active"));
        btn.classList.add("active");
        const panel = document.querySelector("#" + panelPrefix + btn.dataset.segment);
        if (panel) panel.classList.add("active");
      });
    });
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
    buildDirections,
    isAirportPlace,
    mapIcon,
    pinIcon,
    copyIcon,
    toast,
    copyText,
    renderCountdown,
    renderNetwork,
    bindGuideImages,
    bindSegments
  });
})(window);
