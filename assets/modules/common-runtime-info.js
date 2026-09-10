/* Shared runtime information-card renderers. */
(function (root) {
  const escapeHtml = root.TravelCommonUtils.escapeHtml;

  const renderPractical = appData => {
    document.querySelector("#practicalList").innerHTML = appData.practical.map(p=>`<article class="practical-card"><span class="topic">${escapeHtml(p.topic)}</span><h4>${escapeHtml(p.item)}</h4><p><b>${escapeHtml(p.value||"")}</b>${p.value&&p.guide?"\n":""}${escapeHtml(p.guide||"")}</p>${p.source&&/^https?:/.test(p.source)?`<a class="source-link" href="${escapeHtml(p.source)}" target="_blank" rel="noopener">查看官方資料 ↗</a>`:p.source?`<span class="source-link">${escapeHtml(p.source)}</span>`:""}</article>`).join("");
  };

  const renderMeals = appData => {
    document.querySelector("#mealList").innerHTML=appData.mealReminders.map(m=>`<article class="info-card food-card"><div class="event-top"><div><span class="event-type">${escapeHtml(m.date)} · ${escapeHtml(m.city)}</span><h3>${escapeHtml(m.meals.join("／"))}</h3></div><span class="status pending">需自理</span></div><p class="subtitle">${escapeHtml(m.note)}</p></article>`).join("");
  };

  root.TravelCommonRuntimeInfo = Object.freeze({ renderPractical, renderMeals });
})(window);
