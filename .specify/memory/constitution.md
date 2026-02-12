<!--
SYNC IMPACT REPORT
==================
Version Change: 1.0.0 → 1.1.0
Constitution Type: Modular HTML Frontend Application

Modified Principles:
- UPDATED: I. Modular Architecture (was Single-File Architecture)
- RETAINED: II. Vanilla Standards (No Build Tools)
- RETAINED: III. Code Organization & Clarity

New Module Structure:
- balance-config.js: Game balance and configuration values
- content-templates.js: Content generation templates
- js/dev-logger.js: Development logging system
- js/upgrade-system.js: Social upgrade management
- js/event-system.js: Random event system
- js/sales-calculator.js: Sales calculation logic
- js/inventory-manager.js: Inventory management
- js/game-over.js: Game over conditions

Follow-up TODOs: None
-->

# 飛行水龍頭 (Flying Faucet) Constitution

**專案類型**: Modular Frontend HTML Application (模組化前端 HTML 應用)

## Core Principles

### I. Modular Architecture
**MUST** maintain a clean modular structure with the main HTML file and supporting JavaScript modules.

**Entry Point**: `doujin-sim.html`
- All HTML structure contained here
- All CSS styling in `<style>` block within the HTML file
- Main game logic and UI handlers in `<script>` block
- No external CSS files

**Module Files** (load order matters):
1. `balance-config.js` - Game balance configuration (BalanceConfig object)
2. `content-templates.js` - Content generation templates (ContentTemplates object)
3. `js/dev-logger.js` - Development logging (DevLogger module)
4. `js/upgrade-system.js` - Social upgrade management (UpgradeSystem module)
5. `js/event-system.js` - Random event system (EventSystem module)
6. `js/sales-calculator.js` - Sales calculation (SalesCalculator module)
7. `js/inventory-manager.js` - Inventory management (InventoryManager module)
8. `js/game-over.js` - Game over conditions (GameOverManager module)

**Module Pattern**: Each module uses IIFE pattern:
```javascript
const ModuleName = (function() {
  'use strict';
  // private state and functions
  return { /* public API */ };
})();
```

**Rationale**: Separates concerns for maintainability while keeping the application easy to deploy. No build step required - just serve the files.

### II. Vanilla Standards (No Build Tools)
**MUST** use only vanilla HTML5, CSS3, and modern JavaScript (ES6+).

- No transpilation, bundling, or build steps required
- No npm, webpack, vite, or similar tools
- Use native browser APIs only (no jQuery, React, Vue, etc.)
- Code MUST run directly in browser without preprocessing
- Use modern JavaScript features supported by current browsers (2024+)

**Rationale**: Eliminates build complexity, reduces maintenance burden, and ensures direct browser compatibility. Anyone can edit the file in a text editor without specialized tooling.

### III. Code Organization & Clarity
**MUST** maintain clear separation of concerns within each file.

**Main HTML** Structure:
1. HTML structure (`<body>` content)
2. CSS styling (`<style>` block in `<head>`)
3. Module script includes (external .js files)
4. JavaScript logic (`<script>` block before `</body>`)

**Within JavaScript sections**:
- Use clear variable names in Chinese or English
- Group related functions together with section comments
- Separate game state, UI logic, and event handlers
- Add section comments (e.g., `// === 遊戲狀態 ===`, `// === UI 更新 ===`)

**LocalStorage Persistence**:
- Save version: `SAVE_VERSION_V2 = 2`
- Key: `doujinSimSaveV2`
- Format: JSON serialized GameState

**Rationale**: Maintains readability and navigability. Clear organization enables quick understanding and modification.

## Browser Compatibility Requirements

Target: Modern evergreen browsers (Chrome, Firefox, Edge, Safari - last 2 versions)

- MUST test in at least Chrome and Firefox before finalizing changes
- Avoid experimental CSS/JS features without fallbacks
- Use standard CSS Grid, Flexbox for layouts (widely supported)
- Prefer `const`/`let` over `var`, arrow functions, template literals
- LocalStorage API for persistence (widely supported)

## Development Workflow

**Iterative Enhancement**:
- Make small, testable changes
- Open in browser after each significant change
- Use browser DevTools console for debugging
- Save working versions before major refactoring

**Version Tracking**:
- Update version number in HTML title when releasing new features
- Use Git commits for change history
- Keep meaningful commit messages in Chinese or English

**Feature Development**:
1. Define user story with acceptance criteria
2. Implement in small increments
3. Test in browser after each increment
4. Commit when feature is complete and tested

## Governance

This constitution defines the non-negotiable constraints for this project:

- All changes MUST comply with the three core principles
- Proposals to add external dependencies MUST be rejected unless critical
- Complexity MUST be justified - prefer simple solutions
- When in doubt, favor simplicity and vanilla approaches over sophisticated patterns

**Amendment Process**:
- Constitution changes require clear rationale
- Version bumps: MAJOR (principle changes), MINOR (new principles), PATCH (clarifications)
- Document all amendments with date and reasoning

**Version**: 1.1.0 | **Ratified**: 2026-02-09 | **Last Amended**: 2026-02-10
