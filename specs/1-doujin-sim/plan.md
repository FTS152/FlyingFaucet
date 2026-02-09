# Implementation Plan: Doujin Circle Management Simulator

**Branch**: `1-doujin-sim` | **Date**: 2026-02-09 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/1-doujin-sim/spec.md`

## Summary

A satirical browser-based simulation game where players manage a doujin circle, choosing franchises to create fan works for and selling at conventions. The core mechanic demonstrates that market research (choosing popular franchises with good D×B) matters more than content quality (essence level).

**Technical Approach**: Single self-contained HTML file with vanilla JavaScript implementing:
- P×D×B economic model (8 archetype classification)
- Dynamic event system (4 categories, ~20 event types)
- Three-phase convention simulation
- Template + dictionary content generation
- Browser localStorage persistence

## Technical Context

**Language/Version**: HTML5, CSS3, ES6+ JavaScript (vanilla, no transpilation)
**Primary Dependencies**: None (constitutional requirement - single-file, no external libraries)
**Storage**: Browser localStorage API only
**Testing**: Manual browser testing (Chrome, Firefox); DevTools console for debugging
**Target Platform**: Modern evergreen browsers (Chrome, Firefox, Edge, Safari - last 2 versions)
**Project Type**: Single-file HTML application
**Performance Goals**:
- Social feed generation: 50-100 posts in <2 seconds
- Convention simulation: 2000+ attendees processed in <3 seconds
- UI responsiveness: <100ms for user interactions
**Constraints**:
- Single HTML file (all CSS/JS inline)
- No build tools, bundlers, or transpilers
- No external dependencies or CDN links
- Must work when opened directly from filesystem (file:// protocol)
- LocalStorage ~5MB limit for save data
**Scale/Scope**:
- 10-20 franchises active per game
- 5 rounds per session typical
- Single-player only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Single-File Architecture
| Requirement | Status | Notes |
|-------------|--------|-------|
| All styling in `<style>` block | ✅ PASS | CSS will be in `<head>` |
| All JavaScript in `<script>` block | ✅ PASS | JS will be before `</body>` |
| No external dependencies | ✅ PASS | No libraries, no CDN |
| Directly openable without server | ✅ PASS | file:// compatible |

### Principle II: Vanilla Standards
| Requirement | Status | Notes |
|-------------|--------|-------|
| No transpilation/build steps | ✅ PASS | ES6+ native |
| No npm/webpack/vite | ✅ PASS | Not required |
| Native browser APIs only | ✅ PASS | localStorage, DOM, Math.random |
| Modern JS features only | ✅ PASS | const/let, arrow functions, template literals |

### Principle III: Code Organization
| Requirement | Status | Notes |
|-------------|--------|-------|
| HTML → CSS → JS order | ✅ PASS | Will follow structure |
| Clear section comments | ✅ PASS | Will use Chinese comments |
| Grouped related functions | ✅ PASS | State, UI, Events separated |

**Gate Result**: ✅ ALL GATES PASSED - No violations, no complexity justification needed.

## Project Structure

### Documentation (this feature)

```text
specs/1-doujin-sim/
├── plan.md              # This file
├── research.md          # Phase 0: Content generation strategy, event balancing
├── data-model.md        # Phase 1: JavaScript object structures
├── quickstart.md        # Phase 1: Development setup guide
├── contracts/           # Phase 1: Internal API contracts (function signatures)
│   └── game-api.md      # Core game loop function contracts
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
# Single-file architecture (per constitution)
doujin-sim.html          # Complete application - HTML + CSS + JS

# Development reference (optional, not deployed)
test.html                # Existing test file
name.html                # Content generation prototype (reference)
design.txt               # Original design notes (reference)
```

**Structure Decision**: Single HTML file per constitution. All game logic, styling, and content (templates/dictionaries) contained within one file. Development prototypes in separate files for reference only; final product is one deployable HTML file.

### Internal Code Organization (within doujin-sim.html)

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>同人圈經營模擬器 v1.0</title>
  <style>
    /* === 基本樣式 === */
    /* === 遊戲介面 === */
    /* === 社群媒體模擬 === */
    /* === 場次模擬 === */
    /* === 響應式設計 === */
  </style>
</head>
<body>
  <!-- === 主選單 === -->
  <!-- === 社群觀察介面 === -->
  <!-- === 創作介面 === -->
  <!-- === 場次介面 === -->
  <!-- === 結算介面 === -->
  
  <script>
    // === 遊戲常數與設定 ===
    // === 內容生成資源 (模板+字典) ===
    // === 遊戲狀態 ===
    // === P×D×B 模型與 Archetype ===
    // === 動態事件系統 ===
    // === 社群貼文生成 ===
    // === 場次模擬 (三階段) ===
    // === UI 更新函數 ===
    // === 事件處理器 ===
    // === 存檔/讀檔 ===
    // === 初始化 ===
  </script>
</body>
</html>
```

## Complexity Tracking

> No violations found - complexity tracking not required.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none) | - | - |
