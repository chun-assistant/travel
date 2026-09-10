# Europe Trip 2026 — 網頁設計與維護規範

> 本 README 是本專案的 **UI / Web Design Source of Truth + Architecture Guide**。
> 任何 AI、協作者或未來維護者，在修改網站前都應先閱讀本文件。
>
> **最高優先原則：拆檔可以，視覺不要跟著改。**
> 本專案目前採用功能分層與漸進式拆分架構。後續維護應優先修改功能所屬檔案，避免不必要地碰 shared runtime。

## 1. 專案目的

這是一個歐洲旅行規劃網站。網站重點：

- 手機與桌面都好讀
- 保留既有視覺設計、色彩、卡片、時間軸與互動方式
- 將大型功能拆成獨立頁面與功能模組，降低多人 / 多 AI 同時修改造成的衝突
- 資料、renderer、頁面初始化與工具功能盡量分離
- 共用 CSS / JS 集中管理，但**大型 JS 不應無限膨脹**
- GitHub Pages 使用相對路徑，所有頁面都必須能正常互相導覽

## 2. 目前正式架構

目前正式主線為 `europe-trip-2026`。

網站採用「首頁 + 主要功能頁 + 功能專用 JS / Data Modules」架構：

```text
index.html

assets/
  common.css
  common.js
  common-legacy.js
  common-runtime.js
  common-base.css
  subpage-runtime.js
  data/
    core.js
    itinerary.js
    flights.js
    transport.js
    stay.js
    packing.js
    apps.js
    print.js
  modules/
    common-utils.js
    common-runtime-view.js
    common-runtime-tools.js
    common-runtime-init.js
    common-runtime-info.js
    daily.js
    daily-logic.js
    daily-render.js
    daily-scroll.js
    daily-event-filters.js
    transport.js
    transport-renderer.js
    transport-data-enhancements.js
    transport-enhancements.js
    transport-filters.js
    stay.js
    stay-renderer.js
    stay-bootstrap.js
    apps.js
    apps-bootstrap.js
    apps-renderer.js
    checklist.js
    flight-badges.js
    navigation.js
    packing.js
    reminders.js
    registry.js
    runtime-utils.js
  shopping/
  skin/
  *.png

daily/
  index.html

transport/
  index.html

stay/
  index.html

prep-tools/
  index.html
  apps.html
  entry.html
  booking.html
  checklist.html
  tax.html

budget/
  index.html
```

### 五大主要功能

| 功能 | 路徑 | 說明 |
|---|---|---|
| 每日行程 | `daily/` | Day 1–18、國家時間軸、景點與逐時行程 |
| 交通 | `transport/` | 航班、火車、巴士與交通資訊 |
| 住宿 | `stay/` | 住宿、地址與入住資訊 |
| 行前工具 | `prep-tools/` | 購票 App、入境、待辦、行李、退稅 |
| 餐食與購物 | `budget/` | 每日餐食、超市採買、伴手禮與購物清單 |

## 3. JS 拆分總規則（重要）

> **非必要，請依據功能拆分 JS。**

這是本專案未來新增與重構 JavaScript 的正式規範。

### 3.1 優先依「功能責任」拆分

如果一段 JS 明確只負責某一個功能，應優先放在該功能自己的 module，而不是繼續塞進 `common-runtime.js` 或 `common.js`。

例如：

```text
每日行程 → daily-*.js
交通     → transport-*.js
住宿     → stay-*.js
購票 App → apps-*.js
行李     → packing.js / checklist.js
提醒     → reminders.js
導覽     → navigation.js
共用工具 → common-utils.js
```

### 3.2 什麼情況才留在共用 JS

只有符合以下情況之一，才適合放在 shared runtime：

- 多個功能頁都真正共用
- 與全站初始化有直接關係
- 拆出去反而會造成重複、循環依賴或載入順序問題
- 為了相容舊頁面而必須保留的 legacy code

**「只是現在方便」不是留在 common 的理由。**

### 3.3 不要為拆而拆

這條規則不是要求把每個 function 都拆成一個檔案。

如果一組程式：

- 永遠一起使用
- 責任高度相關
- 拆開沒有實際降低複雜度
- 拆開反而增加依賴與載入風險

可以保留在同一個 module。

核心原則是：

> **按功能拆，不按 function 數量拆。**

### 3.4 新功能的預設做法

新增一個中大型功能時，優先考慮：

```text
feature/
  index.html

assets/modules/
  feature.js
  feature-renderer.js
  feature-filters.js   ← 有需要才建立

assets/data/
  feature.js           ← 有獨立資料邊界才建立
```

不要第一時間把所有東西寫進 `common.js`。

### 3.5 重構方式：Incremental migration

本專案採用：

> **小步拆分、一次只移動一個責任、確認正常後再進下一步。**

禁止一次把大型 runtime 整包重寫成全新架構。

每次拆分後至少確認相關頁面仍能正常：

- 載入
- render
- 篩選
- 點擊互動
- 日期 / Day 狀態
- 導覽
- 手機版 responsive

## 4. Shared Runtime 架構

目前 `common-runtime.js` 已完成主要功能分層，不應再把各功能邏輯重新塞回去。

### 共用模組責任

```text
common-utils.js
  ↓ 共用格式化、日期、storage、status、icon、UI / network 等工具

common-runtime-view.js
  ↓ Daily 共用 view / event rendering

common-runtime-tools.js
  ↓ checklist / booking / tax / budget / food 等工具 render

common-runtime-init.js
  ↓ runtime 初始化與啟動流程

common-runtime-info.js
  ↓ practical / meals 等資訊 render

common-runtime.js
  ↓ 上述模組的 runtime wiring / compatibility boundary

common-legacy.js
  ↓ 舊頁面與舊載入流程的相容層

common.js
  ↓ 全站 loader / entry point，不應重新成為大型功能檔
```

### 修改 `common-runtime.js` 前必須先問

「這個功能是不是其實屬於某個明確的 feature？」

如果答案是是，優先拆到對應 feature module。

如果只是共用 helper，優先考慮 `common-utils.js`。

如果只是舊版相容需求，優先確認是否應留在 `common-legacy.js`。

## 5. Daily 每日行程架構（高風險區）

Daily 是本專案最需要小心修改的區域。

目前主要模組：

```text
daily.js
  ↓ Public API / 對外入口

daily-logic.js
  ↓ Day / country presentation 與行程邏輯

daily-render.js
  ↓ Day scroller / Country timeline render

daily-scroll.js
  ↓ Day scroller / Country timeline scroll sync、horizontal drag

daily-event-filters.js
  ↓ 行程事件篩選
```

### Daily 絕對不要任意改動

除非使用者明確要求，否則不要改變：

- `state.day`
- `currentTripDay`
- `dateLabel()` 的既有語意
- `COUNTRY_STAGES`
- Day scroller 的 Day 對應
- Country timeline 的 Day 對應
- 哪一天顯示哪一個國家
- Day / 日期 / 國家之間的既有 coupling

這些是網站行程時間軸的核心資料關係。

### Scroll sync 特別規則

目前 `daily-scroll.js` 已負責主要的 Day / Country timeline scroll synchronization。

**不要再另外載入一份重複的 scroll sync listener。**

尤其不要在沒有確認必要性的情況下重新加入 `daily-scroll-sync.js` 類似的重複同步邏輯，避免雙重 event listener。

## 6. Transport：專用修改範圍

交通功能已完成專用模組拆分。

```text
assets/data/transport.js
    ↓ 交通資料

assets/data/flights.js
    ↓ 航班資料

assets/modules/transport-data-enhancements.js
    ↓ 交通資料修正 / 補充 / normalization

assets/modules/transport-renderer.js
    ↓ 交通卡片與 renderer

assets/modules/transport-enhancements.js
    ↓ 交通頁初始化與模組串接

assets/modules/transport-filters.js
    ↓ 「尚未購票」篩選

transport/index.html
    ↓ 交通頁 HTML
```

修改交通時，預設不得為了方便而修改 `common-runtime.js` / `common.js`。

優先修改對應的 transport module。

## 7. Stay：專用修改範圍

住宿也採用獨立功能模組：

```text
assets/data/stay.js
    ↓ 住宿資料

assets/modules/stay.js
    ↓ 住宿功能入口 / 邏輯

assets/modules/stay-renderer.js
    ↓ 住宿 renderer

assets/modules/stay-bootstrap.js
    ↓ 住宿頁初始化

stay/index.html
    ↓ 住宿頁 HTML
```

只修改住宿時，優先留在上述範圍內。

不要因為住宿需求而修改 Daily / Transport 的 runtime。

## 8. `prep-tools/` 行前工具

目前拆成多個獨立頁：

```text
prep-tools/
  index.html
  apps.html
  entry.html
  booking.html
  checklist.html
  tax.html
```

各頁責任：

- `apps.html`：歐洲交通 / 購票 App 與票券資訊
- `entry.html`：維也納入境、EES、護照與流程
- `booking.html`：行前待辦與預訂準備
- `checklist.html`：行李清單與勾選狀態
- `tax.html`：退稅攻略

如果只改其中一項，優先只改對應 HTML / module / data。

## 9. Data 與 Renderer 分離原則

資料與畫面邏輯能明確分開時，應保持分離：

```text
assets/data/
  ↓ 資料來源 / domain data

assets/modules/*-renderer.js
  ↓ 畫面呈現

assets/modules/*-filters.js
  ↓ 篩選 / view state

assets/modules/*-bootstrap.js / *-enhancements.js
  ↓ 初始化 / 串接
```

不要把大量靜態資料直接塞進 renderer，也不要把大量 HTML renderer 塞進 data module。

## 10. 根目錄 `index.html` 規則

`index.html` 是網站入口，應保持精簡。

主要用途：

- Landing page
- 主要功能入口
- 導向主要功能頁
- 少量全站共用資訊

**不要把大型功能重新塞回根目錄 `index.html`。**

## 11. UI / Design Source of Truth

**既有網站視覺就是標準答案。**

拆分的目的，是降低程式碼與協作衝突，**不是重新設計 UI**。

除非使用者明確要求，禁止任意：

- 改整體配色
- 改卡片風格
- 改字體階層
- 改 spacing / 圓角 / 陰影
- 改底部導覽列高度、位置或圖示
- 移除既有 responsive 行為
- 換 UI framework 重做頁面
- 因為 JS 拆分而順便調整視覺

如果只是新增功能，應盡量沿用現有 CSS class 與元件風格。

## 12. Bottom Navigation

全站底部導覽列功能順序固定：

```text
每日行程 → 交通 → 住宿 → 行前工具 → 餐食與購物
```

標準結構：

```html
<nav class="bottom-nav" aria-label="主要導覽">
  ...
</nav>
```

視覺由 `assets/common.css` 統一管理。

拆成獨立頁後，各頁仍需保留 bottom navigation，並使用正確相對路徑互相導覽。

## 13. 圖片規範

新增或修改網站圖片：

1. 優先使用 PNG
2. 放在 `assets/`
3. HTML / CSS 使用相對路徑
4. 不要把大型圖片塞進 HTML base64
5. 不要把圖片散落到各功能 folder
6. **禁止新增 SVG 圖片檔；網站新增圖片一律使用 PNG。**

檔名使用容易理解的英文，避免空白、中文與特殊字元。

## 14. Responsive Design

網站必須同時維持手機與桌面版。

修改 JS / HTML / CSS 時，不能只測桌面版。

至少確認：

- 手機窄螢幕
- 桌面寬螢幕
- horizontal scroller
- bottom navigation
- 長文字與卡片
- modal / popup / interactive controls

## 15. 修改前檢查清單

每次修改前：

- [ ] 先判斷這是哪一個功能
- [ ] 先找功能專用 HTML / JS / data
- [ ] 非必要不要修改 shared runtime
- [ ] 非必要不要新增 global state
- [ ] 非必要不要新增第二套相同功能
- [ ] 不要因為拆 JS 而改 UI
- [ ] Daily 先確認 Day / date / country coupling 不會被動到

## 16. 修改後檢查清單

至少確認：

- [ ] 相關頁面可以正常載入
- [ ] console 沒有明顯 JS error
- [ ] renderer 正常
- [ ] filter / click / scroll 等互動正常
- [ ] 手機版正常
- [ ] 桌面版正常
- [ ] bottom navigation 正常
- [ ] Daily 的 Day / 日期 / 國家時間軸正常
- [ ] 沒有因為一個功能的修改而破壞其他功能

## 17. Git / Refactor 規範

本專案採用小步驟修改。

### 建議 commit 原則

**每一個有明確功能邊界的安全拆分，盡量使用獨立 commit。**

例如：

```text
refactor: extract daily renderer
refactor: extract common runtime tools
refactor: extract transport filters
fix: restore runtime compatibility
```

這樣發生問題時可以精準回退，不需要整包 revert。

### 不要做

- 一次重寫整個網站
- 一次重寫整個 common runtime
- 沒有測試就連續拆很多層
- 為了「看起來乾淨」而製造大量沒有實際責任邊界的檔案
- 把不相關功能混在同一個 commit

## 18. 最重要的維護原則

請所有 AI / 協作者遵守以下順序：

```text
先讀架構
  ↓
找到功能邊界
  ↓
優先修改功能專用檔案
  ↓
非必要不碰 shared runtime
  ↓
非必要，依功能拆 JS
  ↓
一次只做一個安全變更
  ↓
確認功能正常
  ↓
再進下一刀
```

最後再次強調：

> **功能可以繼續拆，但不要為了拆而拆。**
>
> **非必要，請依據功能拆分 JS。**
>
> **拆分的目的，是降低複雜度與修改風險，不是單純增加檔案數量。**
>
> **任何重構都必須優先保護現有 UI、資料關係與使用者已經正常工作的功能。**
