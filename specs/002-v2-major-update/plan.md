# Implementation Plan: V2 Major Update - 社團升級與遊戲機制強化

**Branch**: `002-v2-major-update` | **Date**: 2026-02-10 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-v2-major-update/spec.md`

## Summary

本計劃實作同人圈經營模擬器 v2 的核心功能升級，包括：
1. **社團升級系統** - 9種可升級項目，提供長期策略深度
2. **隨機事件系統** - 22+種事件模板，增加遊戲變化性
3. **銷售上限機制** - 解決銷量過高問題（如2000本/輪）
4. **開發者日誌** - 詳細參數追蹤，方便除錯
5. **庫存管理與倉儲成本** - 增加經營現實感
6. **遊戲結束機制** - 負債觸發失敗畫面
7. **封面/紙質系統擴充** - 差異化顧客吸引力
8. **程式碼模組化** - 繼續現有模式，進一步拆分主檔案

技術方案：延續現有 Vanilla HTML/CSS/JS 架構，使用已建立的模組化模式（外部 JS 檔案），在瀏覽器中直接運行，無需建置工具。

## Technical Context

**Language/Version**: HTML5 + CSS3 + JavaScript ES6+ (Modern browsers 2024+)
**Primary Dependencies**: 無外部依賴（Vanilla JS only）
**Storage**: localStorage（瀏覽器本地儲存）
**Testing**: 瀏覽器手動測試 + DevTools Console
**Target Platform**: Modern evergreen browsers (Chrome, Firefox, Edge, Safari - last 2 versions)
**Project Type**: Single-page frontend application (modular JS files)
**Performance Goals**: 場次結算報告載入時間 < 2 秒
**Constraints**: 無需網路伺服器，單檔案可直接開啟運行
**Scale/Scope**: 單人遊戲，~4000 行主程式碼 + 配置檔案

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### 原則審查

| 原則 | 狀態 | 說明 |
|------|------|------|
| I. Single-File Architecture | ⚠️ 已演進 | 專案已採用模組化：主 HTML + balance-config.js + content-templates.js。User Story 12 延續此模式。 |
| II. Vanilla Standards | ✅ 通過 | 所有新功能使用原生 HTML/CSS/JS，無外部框架或建置工具 |
| III. Code Organization & Clarity | ✅ 通過 | 將依循現有分段註解和命名慣例 |

### Constitution Evolution Note

⚠️ **重要發現**：專案 constitution 聲明「MUST maintain as single self-contained HTML file」，但實際專案已演進為：
- `doujin-sim.html` (主程式，~153KB，~4000行)
- `balance-config.js` (平衡參數，~11KB)
- `content-templates.js` (內容模板，~26KB)

**結論**：User Story 12 的模組化需求是現有架構的自然延伸，不構成新違規。建議在此功能完成後更新 constitution 以反映實際架構。

### Gate Result: ✅ PASS (with evolution note)

## Project Structure

### Documentation (this feature)

```text
specs/002-v2-major-update/
├── plan.md              # This file
├── research.md          # Phase 0 output - 技術決策與最佳實踐
├── data-model.md        # Phase 1 output - 資料結構設計
├── quickstart.md        # Phase 1 output - 開發入門指南
├── contracts/           # Phase 1 output - API 與介面契約
│   ├── upgrade-system.md
│   ├── event-system.md
│   └── game-state.md
└── tasks.md             # Phase 2 output (by /speckit.tasks)
```

### Source Code (repository root)

```text
# 現有結構
doujin-sim.html          # 主程式（包含 HTML + CSS + 核心 JS）
balance-config.js        # 遊戲平衡參數配置
content-templates.js     # 內容模板與詞彙庫

# V2 新增模組（建議）
js/
├── upgrade-system.js    # 社團升級系統邏輯
├── event-system.js      # 隨機事件系統
├── dev-logger.js        # 開發者日誌工具
├── inventory-manager.js # 庫存與倉儲管理
├── game-over.js         # 遊戲結束流程
└── sales-calculator.js  # 銷量計算（含最大銷售量限制）
```

**Structure Decision**: 延續現有的外部 JS 檔案模式，將新功能按系統拆分為獨立模組。所有檔案仍可透過 `file://` 協議直接在瀏覽器中開啟，無需伺服器。

## Complexity Tracking

> **Constitution Evolution - 非違規，而是架構自然演進**

| 項目 | 說明 | 解決方案 |
|------|------|----------|
| 多檔案模組化 | Constitution 聲明單檔案，但專案已演進為 3 檔案 | 延續現有模式，計劃完成後更新 constitution |
| 外部 JS 載入 | 需要依序載入多個 script | 使用 `<script src="">` 標籤，維持簡單載入順序 |
