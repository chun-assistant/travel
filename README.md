# Europe Trip 2026 — 網頁設計與維護規範

> 本 README 是本專案的 **UI / Web Design Source of Truth + Architecture Guide**。
> 任何 AI、協作者或未來維護者，在修改網站前都應先閱讀本文件。
>
> **最高優先原則：拆檔可以，視覺不要跟著改。**
> 目前網站已完成主要功能分層，後續新增或修改內容應優先在對應功能 folder / HTML 處理，不要重新設計既有 UI。

## 1. 專案目的

這是一個歐洲旅行規劃網站。網站重點：

- 手機與桌面都好讀
- 保留既有視覺設計、色彩、卡片、時間軸與互動方式
- 將大型功能拆成獨立頁面，降低多人 / 多 AI 同時修改造成的衝突
- 共用 CSS / JS 集中管理
- GitHub Pages 使用相對路徑，所有頁面都必須能正常互相導覽

## 2. 目前正式架構

目前專案採用「**首頁 + 五大功能 folder + 行前工具子頁**」架構：

```text
index.html

assets/
  common.css
  common.js
  subpage-runtime.js
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
| 每日行程 | `daily/index.html` | Day 1–18、國家時間軸、景點與逐時行程 |
| 交通 | `transport/index.html` | 航班、火車、巴士與交通資訊 |
| 住宿 | `stay/index.html` | 住宿、地址與入住資訊 |
| 行前工具 | `prep-tools/` | 購票 App、入境、待辦、行李、退稅 |
| 餐食與購物 | `budget/index.html` | 每日餐食、超市採買、伴手禮與購物清單 |

## 3. 根目錄 `index.html` 規則

`index.html` 是網站入口，現在應保持非常精簡。

主要用途：

- 首頁 / Landing page
- 主要功能入口
- 導向五大功能頁
- 少量全站共用資訊

**不要再把大型功能內容塞回根目錄 `index.html`。**

如果只是修改每日行程，改 `daily/index.html`。
如果只是修改交通，改 `transport/index.html`。
如果只是修改住宿，改 `stay/index.html`。
如果只是修改行前工具，改 `prep-tools/` 裡對應的 HTML。
如果只是修改餐食與購物，改 `budget/index.html`。

## 4. `prep-tools/` 已拆成 5 個獨立子頁

「行前與工具」是目前最需要多人協作的功能，因此進一步拆成：

```text
prep-tools/
  index.html       ← 行前與工具入口 / 購票 App 預設頁
  apps.html        ← 購票 App
  entry.html       ← 入境攻略
  booking.html     ← 行前待辦
  checklist.html   ← 行李清單
  tax.html         ← 退稅攻略
```

### 各頁責任範圍

- `apps.html`
  - 歐洲各國交通 / 購票 App
  - 票券使用方式
  - 其他實用資訊

- `entry.html`
  - 維也納入境流程
  - EES / 護照 / 入境問答
  - 入境流程圖

- `booking.html`
  - 行前待辦事項
  - 訂房、交通、文件等準備工作

- `checklist.html`
  - 行李清單
  - 勾選狀態
  - 完成百分比

- `tax.html`
  - 退稅攻略
  - 奧地利 / 芬蘭 / 挪威 / 荷蘭相關退稅資訊
  - 退稅流程圖與提醒

### 修改規則

如果只改「購票 App」，**只改 `prep-tools/apps.html` 或其必要的共用資料 / JS**。

如果只改「入境」，**只改 `prep-tools/entry.html`**。

不要為了修改其中一個子頁，把其他四個頁面一起重做。

## 5. 頁面拆分的核心原則

### 小功能

小功能可以獨立成一個 HTML：

```text
feature/
  index.html
```

### 大功能

大型功能使用 folder + 多個 HTML：

```text
feature/
  index.html
  page-a.html
  page-b.html
  page-c.html
```

目前 `prep-tools/` 就是這種模式。

**同一功能的子頁必須放在同一個 folder，不要散落在根目錄。**

## 6. UI / Design Source of Truth

### 最重要規則

**目前既有網站的視覺就是標準答案。**

拆分 HTML 的目的只是降低檔案衝突，**不是重新設計 UI**。

除非使用者明確要求，否則禁止：

- 改變整體配色
- 改變卡片風格
- 改變字體階層
- 把原本的橫向 segmented navigation 改成卡片
- 任意改變 spacing / 圓角 / 陰影
- 任意改變底部導覽列高度、位置或圖示
- 移除既有 responsive 行為
- 用新的 UI framework 重做頁面

如果要新增內容，應該使用現有 CSS class 與現有元件風格。

## 7. 底部導覽列規範

全站底部導覽列是重要的共用視覺元件。

標準功能順序固定為：

```text
每日行程 → 交通 → 住宿 → 行前工具 → 餐食與購物
```

標準頁面的導覽列使用：

```html
<nav class="bottom-nav" aria-label="主要導覽">
  ...
</nav>
```

視覺規格由 `assets/common.css` 統一管理。

### Split page 注意事項

拆成獨立 HTML 後，各頁仍需要自己的 bottom navigation，並透過相對路徑互相跳轉。

例如 `prep-tools/apps.html`：

```text
../daily/
../transport/
../stay/
./
../budget/
```

**不要因為改成 `<a>` 就自行重設 bottom nav 的尺寸、padding、高度或位置。**

如果需要修正導覽列，第一步應先拿 `daily/index.html` 的標準結構與 `common.css` 比對，而不是直接加一堆 page-specific CSS。

## 8. 共用 CSS / JavaScript

全站共用視覺主要放在：

```text
assets/common.css
```

包括：

- 顏色
- 字體
- Hero
- 卡片
- 按鈕
- segmented navigation
- Day chips
- timeline
- bottom navigation
- responsive layout
- spacing / radius / shadow

全站共用互動與資料 render 主要放在：

```text
assets/common.js
```

### `subpage-runtime.js`

```text
assets/subpage-runtime.js
```

這是拆分後頁面的相容層，讓既有 `common.js` 的資料與 renderer 可以在獨立子頁上工作。

**除非真的需要處理 split-page runtime 問題，不要任意修改它。**

如果修改 `subpage-runtime.js`，必須確認：

- 不影響 `daily/`
- 不影響 `transport/`
- 不影響 `stay/`
- 不影響 `budget/`
- 不改變標準 UI

## 9. 圖片規範：統一 PNG

新增或修改網站圖片：

1. 優先使用 PNG
2. 放到 `assets/`
3. HTML / CSS 使用相對路徑
4. 不要把大型圖片直接塞進 HTML base64
5. 不要把圖片散落到各功能 folder
6. **禁止上傳或新增 SVG 圖片檔；網站新增圖片一律使用 PNG。**

例如：

```text
assets/
  vienna-entry-3x4.svg.png
  norway-tax-refund.png
```

HTML：

```html
<img src="../assets/vienna-entry-3x4.svg.png" alt="維也納入境流程">
```

根目錄或根層頁面則依所在位置調整相對路徑。

### 檔名

使用容易理解的英文檔名：

```text
vienna-entry-3x4.svg.png
norway-tax-refund.png
hotel-map-amsterdam.png
```

避免空白、中文檔名與特殊字元。

## 10. Responsive Design

網站必須同時維持手機與桌面版。

目前設計包含：

- 手機優先的資訊密度
- 桌面版最大寬度約 980px
- 桌面版部分 card grid 為兩欄
- Day / country navigation 可橫向滑動
- 底部導覽固定於 viewport 底部
- safe-area 支援手機瀏海 / Home Indicator

**不要只測桌面版。**

新增或修改頁面後至少檢查：

- 手機窄版
- 手機橫向 / 不同高度
- 桌面寬版
- bottom navigation 是否位置一致
- segmented navigation 是否仍可橫向滑動

## 11. 相對路徑規範

GitHub Pages 是資料夾式部署，因此所有跨頁連結必須依實際 folder 層級使用相對路徑。

例如：

### `daily/index.html`

```text
../transport/
../stay/
../prep-tools/
../budget/
```

### `prep-tools/apps.html`

```text
../daily/
../transport/
../stay/
./
../budget/
```

### `prep-tools/index.html`

```text
../daily/
../transport/
../stay/
./
../budget/
```

修改 folder 結構後，必須同步檢查所有導覽連結。

## 12. 多人 / 多 AI 協作規則

本專案的拆分架構主要就是為了降低 merge conflict。

理想工作方式：

```text
AI #1 → daily/index.html
AI #2 → transport/index.html
AI #3 → stay/index.html
AI #4 → prep-tools/apps.html
AI #5 → prep-tools/entry.html
AI #6 → prep-tools/booking.html
AI #7 → prep-tools/checklist.html
AI #8 → prep-tools/tax.html
AI #9 → budget/index.html
```

### Commit 原則

如果修改只屬於單一功能：

- 儘量只 commit 該功能相關檔案
- 不要順手格式化整個專案
- 不要順手重排其他 HTML
- 不要順手修改 common.css，除非真的需要全站修改

如果修改 `common.css` / `common.js`，要視為高影響範圍修改，完成後應檢查所有主要頁面。

## 13. 修改既有功能前的標準流程

```text
1. 先讀 README.md
        ↓
2. 確認目前實際檔案結構
        ↓
3. 找到功能所屬 folder / HTML
        ↓
4. 先比對標準頁面的 HTML + common.css
        ↓
5. 只修改必要檔案
        ↓
6. 保留既有 UI / UX
        ↓
7. 檢查相對路徑
        ↓
8. 檢查手機 / 桌面版
        ↓
9. 檢查底部導覽列
        ↓
10. Commit
```

## 14. 新增功能的標準流程

```text
1. 判斷功能分類
        ↓
2. 建立正確 folder
        ↓
3. 建立 index.html
        ↓
4. 如果功能很大，再拆 sub HTML
        ↓
5. 圖片放 assets/，統一 PNG
        ↓
6. 共用 UI 使用 common.css
        ↓
7. 共用互動使用 common.js
        ↓
8. 必要時使用 subpage-runtime.js
        ↓
9. 補上跨頁導覽
        ↓
10. 檢查手機 / 桌面版
        ↓
11. 確認沒有破壞其他功能
```

## 15. AI 修改網站時必須遵守

### 必須

- **先讀 README.md，再修改網站。**
- 先確認目前實際檔案結構，不要根據舊架構猜檔案位置。
- 優先修改正確的功能 folder / HTML。
- 大型功能拆成同一 folder 的 sub HTML。
- 新增圖片使用 PNG 並放進 `assets/`。
- 共用 CSS / JS 優先使用 `assets/common.css` / `assets/common.js`。
- Split page 優先參考 `daily/index.html` 的標準 DOM 與 `common.css`。
- 保留既有 UI / UX，除非使用者明確要求重新設計。
- 修改後檢查所有受影響的相對路徑。
- 修改後確認 GitHub Pages 路徑正確。
- 修改 bottom navigation 前，先比對標準頁面的 HTML 結構與 CSS。

### 禁止

- 不要把大型功能塞回根目錄 `index.html`。
- 不要把 `prep-tools` 五個子功能重新合併回一個巨大 HTML。
- 不要複製一整份 common CSS 到每個頁面。
- 不要為了修一個 split page 的問題，任意改全站 UI。
- 不要把 segmented navigation 改成另一種 UI。
- 不要任意改 bottom navigation 的高度、位置、padding 或圖示。
- 不要把圖片放在各功能 folder 裡亂散。
- 不要新增 JPG / JPEG 取代 PNG 規範，除非有明確技術原因並獲得同意。
- 不要任意刪除既有內容。
- 不要為了「整理」而順手重做整個 UI。
- 不要修改與目前任務無關的功能。

## 16. 完成修改前 Checklist

- [ ] 有先閱讀 README.md
- [ ] 使用目前的新架構，而不是舊的單一 index 架構
- [ ] 修改的是正確功能 folder / HTML
- [ ] `prep-tools` 子功能維持獨立 HTML
- [ ] 新功能沒有全部塞進根目錄 `index.html`
- [ ] 圖片是 PNG
- [ ] 圖片放在 `assets/`
- [ ] HTML / CSS 圖片路徑正確
- [ ] 共用 CSS / JS 沒有重複複製
- [ ] 保留既有 UI / UX
- [ ] segmented navigation 沒有被改成另一種版型
- [ ] bottom navigation 與標準頁面視覺一致
- [ ] 手機版正常
- [ ] 桌面版正常
- [ ] 跨頁相對路徑正常
- [ ] 沒有誤刪既有內容
- [ ] 沒有修改與本次任務無關的功能

---

## 一句話規則

> **架構可以拆，視覺不能亂。根目錄 `index.html` 只做入口；五大功能各自獨立；`prep-tools` 再拆成 5 個子 HTML；共用 UI 放 `common.css / common.js`；圖片統一 PNG 放 `assets/`；任何 split page 都先以 `daily/index.html` + `common.css` 為標準答案。**