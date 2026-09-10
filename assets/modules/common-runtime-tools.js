/* Shared runtime preparation tools. */
(function (root) {
  "use strict";

  function setup(deps) {
    var $ = deps.$;
    var $$ = deps.$$;
    var APP_DATA = deps.APP_DATA;
    var PACKING_GROUPS = deps.PACKING_GROUPS;
    var PRINT_GROUPS = deps.PRINT_GROUPS;
    var state = deps.state;
    var save = deps.save;
    var escapeHtml = deps.escapeHtml;
    var fmtTwd = deps.fmtTwd;
    var dateLabel = deps.dateLabel;
    var statusClass = deps.statusClass;

    function initChecks() {
      APP_DATA.prep.forEach(function (item, i) {
        var id = "p" + i;
        if (!(id in state.checks) && /已完成|已裝/.test(item.status || "")) state.checks[id] = true;
      });
      APP_DATA.bookings.forEach(function (item, i) {
        var id = "b" + i;
        if (!(id in state.checks) && /已完成|已購票|已確認/.test(item.status || "")) state.checks[id] = true;
      });
      save("aurora-checks", state.checks);
    }

    function renderChecklist() {
      initChecks();
      var packing = PACKING_GROUPS.flatMap(function (group, groupIndex) {
        return group.items.map(function (item, itemIndex) {
          return Object.assign({}, item, { group: group.group, id: "pack-" + groupIndex + "-" + itemIndex });
        });
      });
      $("#checklist").innerHTML = PACKING_GROUPS.map(function (group, groupIndex) {
        return '<section class="check-group"><h3>' + escapeHtml(group.group) + '</h3>' + group.items.map(function (item, itemIndex) {
          var id = "pack-" + groupIndex + "-" + itemIndex;
          return '<label class="check-item ' + (state.checks[id] ? "done" : "") + '"><input type="checkbox" data-check="' + id + '" ' + (state.checks[id] ? "checked" : "") + '><span class="fake-check">✓</span><span class="check-copy"><b>' + escapeHtml(item.item) + '</b><small>' + escapeHtml([item.owner, item.note].filter(Boolean).join(" · ")) + '</small></span><span class="status neutral">未裝</span></label>';
        }).join("") + '</section>';
      }).join("");
      $$("[data-check]", $("#checklist")).forEach(function (input) {
        input.addEventListener("change", function () {
          state.checks[input.dataset.check] = input.checked;
          save("aurora-checks", state.checks);
          renderChecklist();
        });
      });
      var total = packing.length;
      var done = packing.filter(function (item) { return state.checks[item.id]; }).length;
      var pct = total ? Math.round(done / total * 100) : 0;
      $("#checkPercent").textContent = pct + "%";
      $("#checkCount").textContent = done + " / " + total;
      $("#progressFill").style.width = pct + "%";
    }

    function renderBookings() {
      initChecks();
      var prepTodos = APP_DATA.prep.map(function (item, i) {
        return Object.assign({}, item, { id: "p" + i });
      }).filter(function (item) {
        return item.phase !== "行李";
      }).map(function (item) {
        return item.category === "網路" ? Object.assign({}, item, {
          item: "準備eSIM或實體SIM卡",
          note: "eSIM先安裝並離線保存QR／APN；實體SIM帶退卡針，抵達VIE前確認漫遊設定"
        }) : item;
      });
      var bookingTodos = APP_DATA.bookings.map(function (item, i) {
        return Object.assign({}, item, { id: "b" + i });
      });
      var printChecklist = '<div class="section-head inner-head"><div><h2>紙本列印分工</h2><p>個人與團長分開準備；重要資料保留第二套備援</p></div></div>' + PRINT_GROUPS.map(function (group, groupIndex) {
        return '<section class="check-group"><h3>' + escapeHtml(group.group) + '</h3>' + group.items.map(function (item, itemIndex) {
          var id = "print-" + groupIndex + "-" + itemIndex;
          return '<label class="check-item ' + (state.checks[id] ? "done" : "") + '"><input type="checkbox" data-todo="' + id + '" ' + (state.checks[id] ? "checked" : "") + '><span class="fake-check">✓</span><span class="check-copy"><b>' + escapeHtml(item.item) + '</b><small>' + escapeHtml(item.note) + '</small></span><span class="status neutral">' + escapeHtml(group.tag) + '</span></label>';
        }).join("") + '</section>';
      }).join("");
      var checklist = '<div class="section-head inner-head"><div><h2>行前執行清單</h2><p>不含紙本列印與訂位缺漏</p></div></div><section class="check-group">' + prepTodos.map(function (item) {
        return '<label class="check-item ' + (state.checks[item.id] ? "done" : "") + '"><input type="checkbox" data-todo="' + item.id + '" ' + (state.checks[item.id] ? "checked" : "") + '><span class="fake-check">✓</span><span class="check-copy"><b>' + escapeHtml(item.item) + '</b><small>' + escapeHtml([item.phase, item.owner, item.note].filter(Boolean).join(" · ")) + '</small></span><span class="status ' + statusClass(item.status) + '">' + escapeHtml(item.status || "待辦") + '</span></label>';
      }).join("") + '</section>';
      var bookings = '<div class="section-head inner-head"><div><h2>訂位／付款缺漏</h2><p>完成後可直接勾選，紀錄保存在這台裝置</p></div></div>' + bookingTodos.map(function (b) {
        return '<label class="check-item ' + (state.checks[b.id] ? "done" : "") + '"><input type="checkbox" data-todo="' + b.id + '" ' + (state.checks[b.id] ? "checked" : "") + '><span class="fake-check">✓</span><span class="check-copy"><b>' + escapeHtml(b.item) + '</b><small>' + escapeHtml([b.category, b.date, b.deadline, b.missing, b.note].filter(Boolean).join(" · ")) + '</small></span><span class="status ' + statusClass(b.status) + '">' + escapeHtml(b.status) + '</span></label>';
      }).join("");
      $("#bookingList").innerHTML = printChecklist + checklist + bookings;
      $$("[data-todo]", $("#bookingList")).forEach(function (input) {
        input.addEventListener("change", function () {
          state.checks[input.dataset.todo] = input.checked;
          save("aurora-checks", state.checks);
          renderBookings();
        });
      });
    }

    function renderTax() {
      $("#taxList").innerHTML = APP_DATA.tax.map(function (t) {
        return '<article class="info-card"><div class="event-top"><div><span class="event-type">退稅地區</span><h3>' + escapeHtml(t.country || "退稅步驟") + '</h3></div>' + (t.threshold ? '<span class="status neutral">門檻 ' + escapeHtml(t.threshold) + '</span>' : "") + '</div><div class="info-card-row"><span>VAT／表單</span><b>' + escapeHtml([t.vat, t.form].filter(Boolean).join(" · ") || "—") + '</b></div><div class="info-card-row"><span>本行程驗證點</span><b>' + escapeHtml(t.checkpoint || "—") + '</b></div><div class="info-card-row"><span>攜帶物品</span><b>' + escapeHtml(t.bring || "—") + '</b></div><div class="info-card-row"><span>操作</span><b>' + escapeHtml(t.action || "—") + '</b></div><div class="info-card-row"><span>避免失敗</span><b>' + escapeHtml(t.failure || "—") + '</b></div>' + (t.source && /^https?:/.test(t.source) ? '<div class="event-actions"><a class="map-btn" href="' + escapeHtml(t.source) + '" target="_blank" rel="noopener">查看官方來源</a></div>' : "") + '</article>';
      }).join("");
    }

    function renderBudget() {
      var max = Math.max.apply(null, APP_DATA.budgets.map(function (b) { return Number(b.total) || 0; }));
      $("#budgetSummary").innerHTML = '<article class="budget-total"><small>目前每人預估總額</small><span class="amount">' + fmtTwd(APP_DATA.budgetSummary.final) + '</span><p>原表 ' + fmtTwd(APP_DATA.budgetSummary.original) + ' ＋ 新增生活／交通調整 ' + fmtTwd(APP_DATA.budgetSummary.adjustment) + '。仍不含SAS主欄缺漏、未報價van及部分待購活動。</p></article>';
      $("#budgetList").innerHTML = APP_DATA.budgets.map(function (b) {
        return '<details class="budget-day"><summary><div class="budget-line"><div class="budget-day-label"><b>Day ' + b.day + '</b><small>' + escapeHtml(dateLabel(b.date)) + '</small></div><div class="bar-track"><div class="bar-fill" style="width:' + Math.max(2, Number(b.total) / max * 100) + '%"></div></div><span class="budget-amount">' + fmtTwd(b.total) + '</span></div></summary><div class="budget-detail"><div><small>住宿</small><b>' + fmtTwd(b.hotel) + '</b></div><div><small>長途交通／機票</small><b>' + fmtTwd(b.transport) + '</b></div><div><small>活動／保險</small><b>' + fmtTwd(b.activity) + '</b></div><div><small>餐飲</small><b>' + fmtTwd((Number(b.norwayMeal) || 0) + (Number(b.food) || 0)) + '</b></div><div><small>市區交通</small><b>' + fmtTwd(b.local) + '</b></div><div><small>雜支／購物</small><b>' + fmtTwd(b.misc) + '</b></div></div><p class="subtitle">' + escapeHtml(b.city) + ' · ' + escapeHtml(b.note) + '</p></details>';
      }).join("");
    }

    function renderFood() {
      $("#foodList").innerHTML = APP_DATA.food.map(function (f) {
        return '<article class="info-card food-card"><div class="event-top"><div><span class="event-type">' + escapeHtml(f.date) + ' · ' + escapeHtml(f.city) + ' · ' + escapeHtml(f.category) + '</span><h3>' + escapeHtml(f.shop) + '</h3></div><span class="status ' + statusClass(f.status) + '">' + escapeHtml(f.status) + '</span></div><p class="subtitle">' + escapeHtml(f.recommendation) + '</p><div class="info-card-row"><span>預估價格</span><b class="food-price">' + escapeHtml(f.price || "現場支付") + '</b></div><div class="info-card-row"><span>提醒</span><b>' + escapeHtml(f.note || "—") + '</b></div></article>';
      }).join("");
    }

    return Object.freeze({
      initChecks: initChecks,
      renderChecklist: renderChecklist,
      renderBookings: renderBookings,
      renderTax: renderTax,
      renderBudget: renderBudget,
      renderFood: renderFood
    });
  }

  root.TravelCommonRuntimeTools = Object.freeze({ setup: setup });
})(window);
