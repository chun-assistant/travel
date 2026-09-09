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

  root.TravelCommonUtils = Object.freeze({
    escapeHtml,
    fmtTwd,
    fmtCost,
    dateLabel,
    statusClass,
    eventKind,
    filterKind,
    mapIcon,
    pinIcon,
    copyIcon
  });
})(window);
