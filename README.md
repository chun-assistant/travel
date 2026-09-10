# Europe Trip 2026 — 網頁設計與維護規範

> 本 README 是本專案的 **UI / Web Design Source of Truth + Architecture Guide**。
> 任何 AI、協作者或未來維護者，在修改網站前都應先閱讀本文件。
>
> **最高優先原則：拆檔可以，功能與視覺不要跟著壞。**
>
> 本專案目前採用「功能分層 + 資料分離 + 漸進式拆分」架構。後續維護應優先修改功能所屬檔案，避免不必要地碰 shared runtime。

## 1. 專案目的

這是一個歐洲旅行規劃網站，重點是：

- 手機與桌面都好讀
- 保留既有視覺設計、色彩、卡片、時間軸與互動方式
- 將大型功能拆成獨立頁面與功能模組，降低多人 / 多 AI 同時修改造成的衝突
- 資料、renderer、filter、bootstrap / initialization 盡量分離
- 共用 CSS / JS 集中管理，但大型 JS 不應無限膨脹
- GitHub Pages 使用相對路徑，所有頁面都必須能正常互相導覽

## 2. 正式主線與架構原則

目前正式主線：

```text
europe-trip-2026
```

整體架構：

```text
頁面 HTML
   ↓
feature module / bootstrap
   ↓
feature renderer / filters
   ↓
assets/data/
   ↓
shared runtime / utils（只有真正共用的部分）
```

目前主要頁面：

| 功能 | 路徑 | 責任 |
|---|---|---|
| 首頁 | `index.html` | 網站入口與主要功能導覽 |
| 每日行程 | `daily/` | Day 1–18、國家時間軸、景點與逐時行程 |
| 交通 | `transport/` | 航班、火車、巴士與交通資訊 |
| 住宿 | `stay/` | 住宿、地址與入住資訊 |
| 行前工具 | `prep-tools/` | App、入境、預訂、清單、退稅 |
| 餐食與購物 | `budget/` | 每日餐食、超市、伴手禮與購物清單 |

## 3. 目前正式檔案分層

```text
index.html

assets/
  common.css
  common-base.css
  common.js
  common-legacy.js
  common-runtime.js
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
    daily-timezone.js
    daily-timezone.css

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
      bootstrap.js
      finland-shopping-data.js
      recommendations.js
      shopping-list.js

  finland-shopping-assets.js
  finland-shopping-extra.js

  shopping/
    finland/
      thumbs/
      large/

  skin/
  *.png / *.jpg / *.svg

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

> 上述清單代表目前正式架構。若未來新增功能，應依相同責任邊界放置，不要為了方便把功能塞回 `common-runtime.js`。

## 4. JS 拆分總規則（重要）

> **非必要，請依據功能拆分 JS。**

這是本專案未來新增與重構 JavaScript 的正式規範。

### 4.1 按「功能責任」拆，不按 function 數量拆

如果一段 JS 明確只負責某個功能，優先放在該功能自己的 module。

例如：

```text
每日行程 → daily-*.js
交通     → transport-*.js
住宿     → stay-*.js
購票 App → apps-*.js
行李     → packing.js / checklist.js
提醒     → reminders.js
導覽     → navigation.js
購物     → modules/shopping/*
共用工具 → common-utils.js
```

不要因為「檔案看起來比較大」就任意切成很多小檔案。

如果一組程式永遠一起使用、責任高度相關、拆開沒有實際降低複雜度，或拆開反而增加依賴與載入風險，可以保留在同一個 module。

核心原則：

> **按功能拆，不按 function 數量拆。**

### 4.2 什麼情況才留在 shared runtime

只有符合以下情況之一，才適合放在 shared runtime：

- 多個功能頁真正共用
- 與全站初始化有直接關係
- 拆出去會造成重複、循環依賴或載入順序問題
- 為了舊頁面相容而必須保留

**「現在放這裡比較方便」不是留在 common 的理由。**

### 4.3 新功能的預設做法

中大型新功能優先考慮：

```text
feature/
  index.html

assets/modules/
  feature.js
  feature-renderer.js
  feature-filters.js       ← 有需要才建立
  feature-bootstrap.js     ← 有初始化邊界才建立

assets/data/
  feature.js               ← 有獨立資料邊界才建立
```

不要第一時間把所有東西寫進 `common.js`。

## 5. Shared Runtime 架構

目前 `common-runtime.js` 已完成主要功能分層，**不應再把 Daily / Transport / Stay / Shopping 等功能邏輯重新塞回去**。

目前責任如下：

```text
common-utils.js
  ↓ 共用格式化、日期、storage、status、event、map、icon、UI、network 等工具

common-runtime-view.js
  ↓ 共用 view / Daily event rendering

common-runtime-tools.js
  ↓ checklist / booking / tax / budget / food 等共用工具 render

common-runtime-init.js
  ↓ runtime 初始化與啟動流程

common-runtime-info.js
  ↓ practical / meals 等資訊 render

common-runtime.js
  ↓ shared runtime wiring / compatibility boundary

common-legacy.js
  ↓ 舊頁面與舊載入流程的相容層

common.js
  ↓ 全站 loader / entry point
```

### 修改 `common-runtime.js` 前先問

1. 這個功能是不是其實屬於某個明確 feature？
2. 如果是，能不能放到該 feature module？
3. 如果只是 helper，是否應放進 `common-utils.js`？
4. 如果只是舊版相容，是否應留在 `common-legacy.js`？

只有確認它真的屬於 shared responsibility，才修改 shared runtime。

## 6. Daily 每日行程架構（高風險區）

Daily 是本專案最需要小心修改的區域。

目前主要分層：

```text
daily.js
  ↓ Public API / 對外入口

daily-logic.js
  ↓ Day / country presentation 與行程邏輯

daily-render.js
  ↓ Day scroller / Country timeline render

daily-scroll.js
  ↓ Day / Country timeline scroll sync、horizontal drag

daily-event-filters.js
  ↓ 行程事件篩選

daily-timezone.js
  ↓ 每日行程的 timezone 顯示 / 相關行為

daily-timezone.css
  ↓ timezone UI 專用樣式
```

### 6.1 Daily 絕對不要任意改動

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

### 6.2 Scroll sync 特別規則

`daily-scroll.js` 已負責主要的 Day / Country timeline scroll synchronization。

**不要再另外加入重複的 scroll-sync listener。**

尤其不要在沒有確認必要性的情況下重新加入另一份同步邏輯，避免雙重 event listener。

### 6.3 Daily 修改策略

Daily 重構採取：

> **一次只移動一個責任 → 測試 → 確認正常 → 再移動下一個責任。**

Daily 是「先保功能，再整理結構」，不是拿來一次重寫的區域。

## 7. Transport：專用修改範圍

交通功能採用獨立功能模組：

```text
assets/data/transport.js
    ↓ 交通資料

assets/data/flights.js
    ↓ 航班資料

assets/modules/transport-data-enhancements.js
    ↓ 資料修正 / 補充 / normalization

assets/modules/transport-renderer.js
    ↓ 交通卡片與 renderer

assets/modules/transport-enhancements.js
    ↓ 交通頁初始化與模組串接

assets/modules/transport-filters.js
    ↓ 「尚未購票」篩選

assets/modules/transport.js
    ↓ 交通功能入口

transport/index.html
    ↓ 交通頁 HTML
```

修改交通時，預設不得為了方便而修改 `common-runtime.js` / `common.js`。

優先修改對應 transport module。

## 8. Stay：專用修改範圍

住宿採用獨立功能模組：

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

## 9. Shopping：獨立功能邊界

Shopping 已完成正式功能拆分，現在不需要再為了拆而拆。

```text
assets/modules/shopping/bootstrap.js
  ↓ Shopping 資料與資產載入入口

assets/modules/shopping/finland-shopping-data.js
  ↓ Finland 專用 shopping data

assets/modules/shopping/recommendations.js
  ↓ 超市 / 伴手禮推薦 render

assets/modules/shopping/shopping-list.js
  ↓ 購物清單、localStorage、備份 / 還原 / 分享

assets/finland-shopping-assets.js
  ↓ Finland 圖片資產 mapping

assets/finland-shopping-extra.js
  ↓ Finland 額外 shopping 資料 / 補充

budget/index.html
  ↓ Shopping UI 與頁面入口
```

### Shopping 載入順序

`budget/index.html` 的 Shopping bootstrap 會依序載入必要資料與模組。

不要另外建立第二份 Finland shopping data wrapper，也不要在頁面中重複載入同一模組。

### Shopping 修改原則

- Finland shopping data 改 `finland-shopping-data.js`
- 推薦卡片改 `recommendations.js`
- 購物清單功能改 `shopping-list.js`
- 圖片 mapping 改 `finland-shopping-assets.js`
- 不要把 Shopping 邏輯塞進 `common-runtime.js`

## 10. Data 與 Renderer 分離

資料與畫面邏輯能明確分開時，保持分離：

```text
assets/data/
  ↓ domain data

assets/modules/*-renderer.js
  ↓ 畫面呈現

assets/modules/*-filters.js
  ↓ 篩選 / view state

assets/modules/*-bootstrap.js / *-enhancements.js
  ↓ 初始化 / 串接
```

原則：

- data module 不應大量產生 HTML
- renderer 不應承擔大量靜態資料
- filter 不應偷偷改動其他 feature 的核心 state
- bootstrap 負責載入 / 初始化，不應變成大型 business logic

## 11. `prep-tools/` 行前工具

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
- `entry.html`：入境、EES、護照與流程
- `booking.html`：行前待辦與預訂準備
- `checklist.html`：行李清單與勾選狀態
- `tax.html`：退稅攻略

如果只改其中一項，優先只改對應 HTML / module / data。

## 12. 根目錄 `index.html`

`index.html` 是網站入口，應保持精簡。

主要用途：

- Landing page
- 主要功能入口
- 導向主要功能頁
- 少量全站共用資訊

**不要把大型功能重新塞回根目錄 `index.html`。**

## 13. UI / Design Source of Truth

**既有網站視覺就是標準答案。**

拆分的目的，是降低程式碼與協作衝突，**不是重新設計 UI**。

除非使用者明確要求，禁止因為 JS 重構而任意：

- 改整體配色
- 改卡片風格
- 改字體階層
- 改 spacing / 圓角 / 陰影
- 改底部導覽列高度、位置或圖示
- 移除既有 responsive 行為
- 換 UI framework 重做頁面
- 順手調整與重構無關的視覺

如果只是新增功能，應盡量沿用現有 CSS class 與元件風格。

### CSS 規則

- shared CSS 放共用樣式
- feature-specific CSS 優先放 feature module / feature stylesheet
- 不要因為拆 JS 而重新整理整份 CSS
- CSS-only 的功能樣式可以獨立，但不得改變既有版面語意

## 14. 圖片資產規則

圖片以原始來源版本為準。

若來源專案已有對應圖檔，優先使用來源版本，不要任意重新製作或壓縮成不同版本。

新增圖片時要確認：

- 相對路徑正確
- GitHub Pages 可載入
- 不會覆蓋現有資產
- 不會因改名造成 HTML / JS broken path

## 15. Bottom Navigation

全站底部導覽列是既有 UI 的一部分。

除非使用者明確要求，否則不要任意更改：

- 功能順序
- 圖示
- 高度
- fixed / sticky 行為
- active 狀態
- 手機版 spacing

若新增主要功能，先確認是否真的需要進 Bottom Navigation，不要為了新增頁面就直接改全站導覽。

## 16. Refactor / 修改流程

本專案採用 **Incremental Migration**：

```text
1. 先讀 README
      ↓
2. 找到真正的功能邊界
      ↓
3. 只移動一個責任
      ↓
4. 保留原本 UI / data / state 行為
      ↓
5. 測試對應頁面
      ↓
6. 確認正常後再做下一刀
```

每次拆分至少確認：

- 頁面可以載入
- renderer 正常
- filter 正常
- 點擊互動正常
- 日期 / Day 狀態正常
- 導覽正常
- 手機版 responsive 正常
- localStorage / persisted state 正常（若該功能有使用）

### 禁止

- 一次整包重寫大型 runtime
- 沒測試就連續拆很多層
- 為了「看起來乾淨」而拆出沒有責任邊界的檔案
- 為了 JS 重構順便改 UI
- 把 feature-specific logic 塞回 shared runtime
- 建立重複 listener / bootstrap / data source

## 17. Git / 協作原則

功能修改應盡量集中在相關檔案，降低 merge conflict。

推薦：

```text
一個功能 / 一個責任
        ↓
小幅修改
        ↓
測試
        ↓
commit
```

如果需要跨多個 feature 修改，先確認是否真的存在 shared responsibility，再決定是否修改 shared runtime。

## 18. 完成標準

一次 refactor 是否完成，不是看「檔案拆得多細」，而是看：

```text
功能正常
+ UI 沒被改壞
+ state 沒被改壞
+ 載入順序安全
+ feature 邊界清楚
+ 沒有重複 runtime / listener / data
+ 後續維護更容易
```

最終目標：

> **讓每個功能知道自己的程式在哪裡，也讓 shared runtime 只負責真正共用的事情。**

---

## 19. AI / 協作者快速規則

如果你是 AI 或第一次接手本專案，請先遵守以下規則：

1. **先讀 README，再改 code。**
2. 不要把 feature-specific logic 塞進 `common-runtime.js`。
3. 不要任意修改 Daily 的 `state.day`、`currentTripDay`、`dateLabel()`、`COUNTRY_STAGES`。
4. 不要新增重複的 Daily scroll-sync listener。
5. Transport、Stay、Shopping 優先修改自己的 module。
6. data、renderer、filter、bootstrap 有明確責任時保持分離。
7. **非必要不要拆檔。**
8. 一次只做一個責任的 refactor，測試正常後再繼續。
9. 拆檔不是重新設計 UI 的理由。
10. 沒在用的歷史 / wrapper module 可以移除，但刪除前先確認沒有 reference。
11. 圖片資產優先維持來源版本。
12. GitHub Pages 的相對路徑與 script 載入順序不可隨意破壞。

> **核心精神：功能邊界清楚、shared runtime 保持乾淨、UI 與既有行為保持不變。**
