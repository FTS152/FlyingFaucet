# Tasks: V2 Major Update - 社團升級與遊戲機制強化

**Branch**: `002-v2-major-update` | **Date**: 2026-02-10
**Input**: Design documents from `/specs/002-v2-major-update/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: 本專案使用手動測試與瀏覽器 DevTools，無自動化測試框架

**Organization**: 任務依照 user story 組織，每個故事可獨立實作與測試

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可平行執行（不同檔案、無相依性）
- **[Story]**: 任務所屬 user story（如 US1, US2, US3）
- 包含明確檔案路徑

---

## Phase 1: Setup（專案初始化）

**Purpose**: 準備 V2 開發所需的目錄結構與基礎配置

- [X] T001 創建 js/ 目錄於專案根目錄
- [X] T002 在 doujin-sim.html 中新增模組載入標籤的佔位註解
- [X] T003 [P] 備份現有 gameState 結構到 docs/ 作為遷移參考

---

## Phase 2: Foundational（阻斷性前置需求）

**Purpose**: 必須完成的核心基礎設施，所有 user story 都依賴這些任務

**⚠️ CRITICAL**: 在此階段完成前，無法開始任何 user story 的實作

### Game State 擴充

- [X] T004 擴充 gameState 結構新增 circle.upgrades 物件（包含 9 個升級項目欄位）in doujin-sim.html
- [X] T005 擴充 gameState 新增 debt（負債）、marketUnderstanding（市場了解度）、devMode 欄位 in doujin-sim.html
- [X] T006 擴充 Work 物件新增 coverLevel、paperLevel、decayRate、isRetired、retiredPopularity 欄位 in doujin-sim.html
- [X] T007 擴充 sessionState 新增 activeEvents、maxSalesReached、lostSales 欄位 in doujin-sim.html

### Balance Config 擴充

- [X] T008 [P] 在 balance-config.js 新增 UPGRADE_DEFINITIONS（9 種升級定義）
- [X] T009 [P] 在 balance-config.js 新增 CUSTOMER_COEFFICIENTS（6 種顧客類型的封面/紙質敏感度）
- [X] T010 [P] 在 balance-config.js 新增 COVER_LEVELS 與 PAPER_LEVELS 定義（各 4 等級）
- [X] T011 [P] 在 balance-config.js 新增 DECAY_RATES 定義（3 種衰退度）

### Content Templates 擴充

- [X] T012 [P] 在 content-templates.js 新增 EventPool 陣列（22+ 個事件定義）
- [X] T013 [P] 在 content-templates.js 每個事件新增完整的 effects、triggerConditions、notification 結構

### UI 基礎設施

- [X] T014 在 doujin-sim.html 新增社團管理介面的 HTML 結構（#clubManagement 區塊）
- [X] T015 在 doujin-sim.html <style> 新增社團管理介面的 CSS 樣式
- [X] T016 [P] 在 doujin-sim.html 新增遊戲結束畫面的 HTML 結構（#gameOverScreen 區塊）
- [X] T017 [P] 在 doujin-sim.html <style> 新增遊戲結束畫面的 CSS 樣式

### 存檔遷移

- [X] T018 實作 localStorage 版本遷移函數 migrateFromV1() in doujin-sim.html
- [X] T019 更新 loadGame() 函數檢查版本並自動執行遷移 in doujin-sim.html

**Checkpoint**: 基礎設施就緒 - user story 實作可以開始 ✅

---

## Phase 3: User Story 1 - 社團升級系統 (Priority: P1) 🎯 MVP

**Goal**: 場次結束後可進入社團管理介面升級各種能力

**Independent Test**: 完成一個場次 → 進入社團管理 → 購買任意升級 → 下一場次觀察效果

### 實作 US1

- [X] T020 [P] [US1] 創建 js/upgrade-system.js 檔案與基礎結構
- [X] T021 [US1] 實作 initUpgradeSystem() 函數 in js/upgrade-system.js
- [X] T022 [US1] 實作 getUpgradeDefinitions() 函數 in js/upgrade-system.js
- [X] T023 [US1] 實作 getUpgradeLevel(upgradeId) 函數 in js/upgrade-system.js
- [X] T024 [US1] 實作 getUpgradeCost(upgradeId) 函數 in js/upgrade-system.js
- [X] T025 [US1] 實作 canAffordUpgrade(upgradeId) 函數 in js/upgrade-system.js
- [X] T026 [US1] 實作 purchaseUpgrade(upgradeId) 函數（含資金扣除與等級增加）in js/upgrade-system.js
- [X] T027 [US1] 實作 getUpgradeEffect(upgradeId) 函數 in js/upgrade-system.js
- [X] T028 [US1] 在 doujin-sim.html 新增升級系統 script 載入標籤
- [X] T029 [US1] 實作社團管理介面的動態渲染（顯示所有升級項目）in doujin-sim.html
- [X] T030 [US1] 實作升級按鈕點擊事件處理器 in doujin-sim.html
- [X] T031 [US1] 實作升級成功/失敗的 UI 提示 in doujin-sim.html
- [X] T032 [US1] 在場次結算後自動顯示社團管理介面（或提供入口按鈕）in doujin-sim.html

**Checkpoint**: 社團升級系統完整運作，可購買升級並觀察效果

---

## Phase 4: User Story 2 - 場次隨機事件系統 (Priority: P1)

**Goal**: 場次進行中隨機觸發各種事件，並正確套用效果

**Independent Test**: 進行多場場次 → 觀察事件觸發 → 檢查事件效果是否在銷售結果中體現

### 實作 US2

- [X] T033 [P] [US2] 創建 js/event-system.js 檔案與基礎結構
- [X] T034 [US2] 實作 initEventSystem() 函數 in js/event-system.js
- [X] T035 [US2] 實作 getEventPool() 函數 in js/event-system.js
- [X] T036 [US2] 實作 rollSessionEvents(round) 函數（含機率判定、條件檢查、互斥處理）in js/event-system.js
- [X] T037 [US2] 實作 selectRandomWork(works, scope) 函數 in js/event-system.js
- [X] T038 [US2] 實作 getEventNotification(event, affectedWorkTitle) 函數（替換作品名稱）in js/event-system.js
- [X] T039 [US2] 實作 applyEventEffects(events, salesData) 函數（處理 multiply/add/set 效果）in js/event-system.js
- [X] T040 [US2] 在 doujin-sim.html 新增事件系統 script 載入標籤
- [X] T041 [US2] 在場次開始時呼叫 rollSessionEvents() 並儲存到 sessionState.activeEvents in doujin-sim.html
- [X] T042 [US2] 實作事件通知彈窗 UI（顯示事件標題、描述、影響）in doujin-sim.html
- [X] T043 [US2] 在銷量計算流程中整合 applyEventEffects() in doujin-sim.html
- [X] T044 [US2] 確保事件通知顯示完整作品名稱而非「某作品」in doujin-sim.html

**Checkpoint**: 隨機事件正常觸發並影響銷售結果

---

## Phase 5: User Story 3 - 最大銷售量機制與小幫手系統 (Priority: P1)

**Goal**: 限制單場銷售上限，升級小幫手可提升上限，達上限時顯示提示

**Independent Test**: 創建高人氣作品 → 不升級小幫手 → 觀察銷量是否被限制 → 收到「分身乏術」提示

### 實作 US3

- [X] T045 [P] [US3] 創建 js/sales-calculator.js 檔案與基礎結構
- [X] T046 [US3] 實作 getMaxSales(helperLevel) 函數（BASE_MAX_SALES + level * SALES_PER_LEVEL）in js/sales-calculator.js
- [X] T047 [US3] 實作 checkSalesLimit(calculatedSales, maxSales) 函數（傳回是否超限和損失量）in js/sales-calculator.js
- [X] T048 [US3] 在 doujin-sim.html 新增銷量計算器 script 載入標籤
- [X] T049 [US3] 在銷量計算流程中整合最大銷售量檢查 in doujin-sim.html
- [X] T050 [US3] 當觸發上限時記錄 sessionState.maxSalesReached = true 和 lostSales in doujin-sim.html
- [X] T051 [US3] 在場次結算時顯示「分身乏術」提示（如果 maxSalesReached）in doujin-sim.html
- [X] T052 [US3] 在結算報告中顯示損失的潛在銷量 in doujin-sim.html

**Checkpoint**: 銷售上限機制正確運作，小幫手升級可提升上限

---

## Phase 6: User Story 4 - 庫存管理與倉儲成本 (Priority: P2)

**Goal**: 場次結束後可銷毀作品庫存，結算時扣除倉儲成本

**Independent Test**: 場次結束 → 進入庫存管理 → 銷毀一個作品庫存 → 下一場次觀察該作品狀態

### 實作 US4

- [X] T053 [P] [US4] 創建 js/inventory-manager.js 檔案與基礎結構
- [X] T054 [US4] 實作 getStorageCost(upgrades) 函數（總庫存 * 單位成本 * 倉儲升級折扣）in js/inventory-manager.js
- [X] T055 [US4] 實作 retireWork(workId) 函數（設定 isRetired、保存 retiredPopularity、清空庫存）in js/inventory-manager.js
- [X] T056 [US4] 實作 getRetiredWorkPopularity(work) 函數（傳回固定人氣值）in js/inventory-manager.js
- [X] T057 [US4] 在 doujin-sim.html 新增庫存管理器 script 載入標籤
- [X] T058 [US4] 在社團管理介面新增「庫存管理」分頁 HTML in doujin-sim.html
- [X] T059 [US4] 實作庫存列表動態渲染（顯示所有作品庫存與倉儲成本）in doujin-sim.html
- [X] T060 [US4] 實作「銷毀庫存」按鈕與確認對話框 in doujin-sim.html
- [X] T061 [US4] 在場次結算時計算並扣除倉儲成本 in doujin-sim.html
- [X] T062 [US4] 在結算報告中顯示倉儲成本明細 in doujin-sim.html
- [X] T063 [US4] 確保已停產作品在銷量計算時使用固定人氣值 in doujin-sim.html

**Checkpoint**: 庫存管理功能完整，倉儲成本正確扣除

---

## Phase 7: User Story 5 - 遊戲結束與負債系統 (Priority: P2)

**Goal**: 資金為負時觸發遊戲結束，顯示失敗原因與統計資料

**Independent Test**: 故意虧損至負債 → 觀察遊戲結束畫面是否正確顯示

### 實作 US5

- [X] T064 [P] [US5] 創建 js/game-over.js 檔案與基礎結構
- [X] T065 [US5] 實作 checkGameOver() 函數（檢查 money < 0 && debt > 0）in js/game-over.js
- [X] T066 [US5] 實作 triggerGameOver(reason) 函數（儲存最終數據、顯示畫面）in js/game-over.js
- [X] T067 [US5] 實作 getGameOverStats() 函數（回合數、作品數、最高資金等）in js/game-over.js
- [X] T068 [US5] 在 doujin-sim.html 新增遊戲結束模組 script 載入標籤
- [X] T069 [US5] 實作遊戲結束畫面的動態渲染（失敗原因、統計資料）in doujin-sim.html
- [X] T070 [US5] 在遊戲結束畫面新增「重新開始」按鈕與事件處理 in doujin-sim.html
- [X] T071 [US5] 在 adjustMoney() 函數中整合遊戲結束檢查 in doujin-sim.html
- [X] T072 [US5] 在場次結算時整合遊戲結束檢查 in doujin-sim.html
- [X] T073 [US5] 實作天使投資人舉債功能（takeLoan() 函數）in doujin-sim.html
- [X] T074 [US5] 確保舉債後若仍負債在結算時觸發遊戲結束 in doujin-sim.html

**Checkpoint**: 遊戲結束機制正確運作，負債系統完整

---

## Phase 8: User Story 6 - 開發者除錯日誌 (Priority: P2)

**Goal**: 提供開發者模式，顯示詳細計算過程和參數

**Independent Test**: 啟用 devMode → 進行場次 → 在 Console 查看詳細日誌

### 實作 US6

- [X] T075 [P] [US6] 創建 js/dev-logger.js 檔案與基礎結構
- [X] T076 [US6] 實作 setDevMode(enabled) 函數 in js/dev-logger.js
- [X] T077 [US6] 實作 devLog(category, message, data) 函數（僅在 devMode 時記錄）in js/dev-logger.js
- [X] T078 [US6] 實作 getDevLogs(categoryFilter) 函數 in js/dev-logger.js
- [X] T079 [US6] 實作 clearDevLogs() 函數 in js/dev-logger.js
- [X] T080 [US6] 在 doujin-sim.html 新增開發者日誌 script 載入標籤
- [X] T081 [US6] 在設定選單新增「開發者模式」開關 UI in doujin-sim.html
- [X] T082 [US6] 在銷量計算流程各階段新增 devLog 呼叫（SALES 類別）in doujin-sim.html
- [X] T083 [US6] 在事件系統各階段新增 devLog 呼叫（EVENT 類別）in js/event-system.js
- [X] T084 [US6] 在升級系統新增 devLog 呼叫（UPGRADE 類別）in js/upgrade-system.js
- [X] T085 [US6] 在 doujin-sim.html 新增開發者日誌面板 UI（可切換顯示/隱藏）
- [X] T086 [US6] 實作日誌面板的動態渲染與分類篩選功能 in doujin-sim.html

**Checkpoint**: 開發者日誌完整運作，可追蹤所有關鍵計算

---

## Phase 9: User Story 7 - 詳細場次結算報告 (Priority: P2)

**Goal**: 場次結束時顯示每種刊物的個別銷售數據與收益

**Independent Test**: 完成一場次 → 查看結算報告 → 確認每種刊物都有獨立數據

### 實作 US7

- [X] T087 [US7] 重構場次結算報告 HTML 結構（新增個別作品區塊）in doujin-sim.html
- [X] T088 [US7] 更新結算報告 CSS 樣式（表格或卡片式佈局）in doujin-sim.html
- [X] T089 [US7] 實作 renderDetailedSalesReport(salesRecords) 函數 in doujin-sim.html
- [X] T090 [US7] 在結算報告中顯示每種刊物的銷售數量、單價、收益 in doujin-sim.html
- [X] T091 [US7] 新增排序功能（按銷量或收益排序）in doujin-sim.html
- [X] T092 [US7] 顯示總計資訊（總銷量、總收益）in doujin-sim.html
- [X] T093 [US7] 標註受事件影響的作品與影響程度 in doujin-sim.html

**Checkpoint**: 詳細結算報告完整顯示所有作品數據

---

## Phase 10: User Story 8 - 銷量預估準確度調整 (Priority: P3)

**Goal**: 根據市場了解度調整預估準確度，低了解度時誤差較大

**Independent Test**: 設定低市場了解度 → 查看預估值 → 觀察與實際銷量差異

### 實作 US8

- [X] T094 [US8] 實作 getEstimationError(marketUnderstanding) 函數 in js/sales-calculator.js
- [X] T095 [US8] 實作 estimateSales(work, isSimple) 函數（低了解度用簡化公式）in js/sales-calculator.js
- [X] T096 [US8] 更新銷量預估顯示邏輯（整合誤差注入）in doujin-sim.html
- [X] T097 [US8] 新增市場研究功能（提升 marketUnderstanding）in doujin-sim.html
- [X] T098 [US8] 在結算時顯示預估與實際差異提示（「超出預期」或「不如預期」）in doujin-sim.html

**Checkpoint**: 銷量預估準確度受市場了解度影響

---

## Phase 11: User Story 9 - 作品衰退度機制 (Priority: P3)

**Goal**: 作品有衰退度屬性，高衰退作品人氣快速下降

**Independent Test**: 創建高/低衰退度作品 → 經過數輪 → 比較人氣下降速度

### 實作 US9

- [X] T099 [US9] 在創作作品時根據題材自動設定 decayRate in doujin-sim.html
- [X] T100 [US9] 實作 applyPopularityDecay(work, decayRate) 函數 in doujin-sim.html
- [X] T101 [US9] 在每輪結束時對所有作品套用人氣衰退 in doujin-sim.html
- [X] T102 [US9] 在作品資訊顯示中新增衰退度指標 in doujin-sim.html
- [X] T103 [US9] 新增人氣走勢預測（根據衰退度顯示未來人氣）in doujin-sim.html

**Checkpoint**: 作品衰退度機制正確運作 ✓

---

## Phase 12: User Story 10 - 顧客類型差異化吸引力 (Priority: P3)

**Goal**: 封面和紙質對不同顧客類型有不同吸引效果

**Independent Test**: 使用不同封面等級 → 觀察對不同顧客類型的停留機率差異

### 實作 US10

- [X] T104 [US10] 實作 getAttractionModifier(work, customerType) 函數（使用 CUSTOMER_COEFFICIENTS）in js/sales-calculator.js
- [X] T105 [US10] 更新停留機率計算邏輯（整合顧客類型係數）in doujin-sim.html
- [X] T106 [US10] 在開發者日誌中顯示各顧客類型的係數與計算過程 in js/sales-calculator.js
- [X] T107 [US10] 更新顧客類型說明文件（解釋各類型對封面/紙質的偏好）in doujin-sim.html

**Checkpoint**: 顧客類型差異化吸引力正確計算 ✓

---

## Phase 13: User Story 11 - 擴充封面與紙質選項 (Priority: P3)

**Goal**: 提供 4 個封面等級和 4 個紙質等級供玩家選擇

**Independent Test**: 創建新作品 → 查看封面/紙質選項 → 確認新級距正確顯示

### 實作 US11

- [X] T108 [US11] 更新創作介面的封面選項（4 等級：免費/基礎/精緻/頂級）in doujin-sim.html
- [X] T109 [US11] 更新創作介面的紙質選項（4 等級：經濟/標準/優質/豪華）in doujin-sim.html
- [X] T110 [US11] 實作封面成本扣除邏輯（根據選擇的等級）in doujin-sim.html
- [X] T111 [US11] 實作紙質成本修正邏輯（影響印刷成本）in doujin-sim.html
- [X] T112 [US11] 更新吸引力計算（整合新的封面/紙質等級效果）in js/sales-calculator.js
- [X] T113 [US11] 更新 UI 顯示（作品卡片顯示封面/紙質等級）in doujin-sim.html

**Checkpoint**: 封面與紙質選項擴充完成 ✓

---

## Phase 14: User Story 12 - 程式碼模組化重構 (Priority: P4)

**Goal**: 將主 HTML 檔案中的功能邏輯拆分到獨立模組檔案

**Independent Test**: 重構後執行所有功能 → 確認行為與重構前完全一致

### 實作 US12

- [X] T114 [US12] 將銷量計算相關函數移至 js/sales-calculator.js（如尚未完成）
- [X] T115 [US12] 將庫存管理相關函數移至 js/inventory-manager.js（如尚未完成）
- [X] T116 [US12] 將遊戲結束相關函數移至 js/game-over.js（如尚未完成）
- [X] T117 [US12] 整理 doujin-sim.html 中的 JavaScript 區塊（按功能新增區段註解）
- [X] T118 [US12] 移除已移至模組的重複程式碼 in doujin-sim.html
- [X] T119 [US12] 驗證所有模組載入順序正確（balance-config → content-templates → 功能模組 → 主程式）
- [X] T120 [US12] 執行完整功能測試（所有 user story）確認無遺漏
- [X] T121 [US12] 更新 constitution.md 反映實際模組化架構

**Checkpoint**: 程式碼模組化完成，所有功能正常運作 ✓

---

## Phase 15: Polish & Cross-Cutting Concerns（最終打磨）

**Purpose**: 跨 user story 的改進與最佳化

- [X] T122 [P] 檢查所有 UI 中文文字的一致性與正確性
- [X] T123 [P] 優化場次結算報告的載入效能（確保 < 2 秒）
- [X] T124 [P] 新增鍵盤快捷鍵支援（如 ESC 關閉彈窗）
- [X] T125 程式碼清理：移除 console.log 除錯訊息（保留 devLog）
- [X] T126 [P] 檢查所有數值平衡（升級費用、事件機率等）
- [X] T127 執行 quickstart.md 中的所有測試場景驗證
- [X] T128 [P] 更新專案 README 說明 V2 新功能
- [X] T129 檢查瀏覽器相容性（Chrome, Firefox, Edge, Safari）
- [X] T130 最終完整遊戲測試（從新遊戲到遊戲結束完整流程）

**Checkpoint**: V2 功能實作完成 ✓

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 無相依 - 可立即開始
- **Foundational (Phase 2)**: 依賴 Setup 完成 - **阻斷所有 user stories**
- **User Stories (Phase 3-14)**: 全部依賴 Foundational 完成
  - US1-US3 (P1) 可平行開發（如有多人）
  - US4-US7 (P2) 可在 P1 完成後平行開發
  - US8-US11 (P3) 可在 P2 完成後平行開發
  - US12 (P4) 應在所有功能完成後執行
- **Polish (Phase 15)**: 依賴所有 user stories 完成

### User Story Dependencies

- **US1 (社團升級)**: 僅依賴 Foundational - 無其他故事相依
- **US2 (隨機事件)**: 僅依賴 Foundational - 無其他故事相依
- **US3 (銷售上限)**: 依賴 Foundational + US1（小幫手升級影響上限）
- **US4 (庫存管理)**: 依賴 Foundational + US1（倉儲升級影響成本）
- **US5 (遊戲結束)**: 依賴 Foundational + US1（天使投資人升級）+ US4（倉儲成本可能觸發負債）
- **US6 (開發者日誌)**: 可獨立開發，但最好在其他 US 後整合日誌呼叫
- **US7 (詳細結算)**: 依賴 Foundational + US2（顯示事件影響）
- **US8 (預估準確度)**: 僅依賴 Foundational - 無其他故事相依
- **US9 (衰退度)**: 僅依賴 Foundational - 無其他故事相依
- **US10 (差異化吸引力)**: 依賴 Foundational + US11（封面/紙質等級）
- **US11 (封面紙質)**: 僅依賴 Foundational - 無其他故事相依
- **US12 (模組化重構)**: 依賴所有其他 US 完成

### Within Each User Story

- 模組檔案創建 → 函數實作 → 整合到主程式 → UI 實作 → 測試驗證

### Parallel Opportunities

- **Phase 1 (Setup)**: T001-T003 可平行執行
- **Phase 2 (Foundational)**: 
  - Game State 擴充 (T004-T007) 可平行
  - Balance/Content 擴充 (T008-T013) 可平行
  - UI 基礎設施 (T014-T017) 可平行
- **User Stories**: 
  - P1 stories (US1-US3) 可平行開發（注意 US3 依賴 US1）
  - P2 stories (US4-US7) 可平行開發
  - P3 stories (US8-US11) 可平行開發（注意 US10 依賴 US11）
- **Phase 15 (Polish)**: T122-T124, T126, T128 可平行執行

---

## Parallel Example: User Story 1

```bash
# 同時進行模組開發（不同檔案）:
Task T020: "創建 js/upgrade-system.js 檔案與基礎結構"
Task T029: "實作社團管理介面的動態渲染 in doujin-sim.html"

# 依序實作模組內函數:
Task T021-T027: upgrade-system.js 的各個函數實作
```

---

## Implementation Strategy

### MVP First (User Story 1-3 Only)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational（**關鍵阻斷點**）
3. 完成 Phase 3-5: US1-US3（社團升級 + 事件 + 銷售上限）
4. **停止並驗證**: 測試這三個核心功能
5. 部署/展示 MVP

### Incremental Delivery

1. Setup + Foundational → 基礎就緒
2. 新增 US1 → 獨立測試 → 展示（可升級社團！）
3. 新增 US2 → 獨立測試 → 展示（有隨機事件！）
4. 新增 US3 → 獨立測試 → 展示（銷量合理！）
5. 新增 US4-US7 → P2 功能完整
6. 新增 US8-US11 → P3 進階功能
7. 執行 US12 → 程式碼重構
8. Polish → 正式發布

### Parallel Team Strategy

單人開發建議順序：Phase 1 → Phase 2 → US1 → US2 → US3 → US4 → ...

多人開發（3人）：
1. 團隊共同完成 Setup + Foundational
2. Foundational 完成後：
   - **Developer A**: US1 (社團升級)
   - **Developer B**: US2 (隨機事件) 
   - **Developer C**: US11 (封面紙質) → US9 (衰退度)
3. P1 完成後：
   - **Developer A**: US3 (銷售上限) → US4 (庫存管理)
   - **Developer B**: US7 (詳細結算) → US6 (開發者日誌)
   - **Developer C**: US8 (預估準確度) → US10 (差異化吸引力)
4. 功能完成後：
   - **Developer A**: US5 (遊戲結束)
   - **Developer B**: US12 (模組化重構)
   - **Developer C**: Polish tasks

---

## Notes

- 所有任務包含明確檔案路徑
- [P] 標記表示可平行執行的任務
- [Story] 標記追溯任務到對應的 user story
- 每個 user story 可獨立完成並測試
- 在每個 Checkpoint 停止驗證功能運作正常
- 使用瀏覽器 DevTools Console 進行手動測試
- 每完成一個任務或邏輯群組就 commit

---

## Total Task Count

- **Setup**: 3 tasks
- **Foundational**: 16 tasks ⚠️ **必須全部完成才能開始任何 user story**
- **US1** (P1): 13 tasks
- **US2** (P1): 12 tasks
- **US3** (P1): 8 tasks
- **US4** (P2): 11 tasks
- **US5** (P2): 11 tasks
- **US6** (P2): 12 tasks
- **US7** (P2): 7 tasks
- **US8** (P3): 5 tasks
- **US9** (P3): 5 tasks
- **US10** (P3): 4 tasks
- **US11** (P3): 6 tasks
- **US12** (P4): 8 tasks
- **Polish**: 9 tasks

**Total**: 130 tasks

**Estimated MVP (US1-US3)**: 19 (Setup) + 13 + 12 + 8 = **52 tasks**
