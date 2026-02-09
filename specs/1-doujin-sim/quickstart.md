# Quickstart Guide: Doujin Circle Management Simulator

**Branch**: `1-doujin-sim` | **Date**: 2026-02-09 | **Plan**: [plan.md](plan.md)

## Prerequisites

- Modern web browser (Chrome, Firefox, Edge, or Safari - latest version)
- Text editor (VS Code recommended)
- Git (for version control)

**No build tools, npm, or server required** - this is a single-file HTML application per constitution.

---

## Project Structure

```
flyingFaucet/
├── doujin-sim.html      # Main game file (to be created)
├── test.html            # Existing test file
├── .specify/            # Speckit configuration
│   ├── memory/
│   │   └── constitution.md
│   ├── scripts/
│   └── templates/
└── specs/
    └── 1-doujin-sim/    # This feature's documentation
        ├── spec.md
        ├── plan.md
        ├── research.md
        ├── data-model.md
        ├── quickstart.md
        └── contracts/
            └── game-api.md
```

---

## Development Setup

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd flyingFaucet
git checkout 1-doujin-sim
```

### Step 2: Create Main File

Create `doujin-sim.html` at repository root:

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>同人圈經營模擬器 v0.1</title>
  <style>
    /* CSS goes here */
  </style>
</head>
<body>
  <!-- HTML structure goes here -->
  
  <script>
    // JavaScript goes here
  </script>
</body>
</html>
```

### Step 3: Open in Browser

Simply double-click the HTML file or open it in your browser. No server needed.

```
file:///C:/Users/user/flyingFaucet/doujin-sim.html
```

---

## Development Workflow

### Making Changes

1. **Edit** the HTML file in your text editor
2. **Save** the file (Ctrl+S)
3. **Refresh** the browser (F5 or Ctrl+R)
4. **Test** the change
5. **Repeat**

### Using DevTools

- **Chrome/Edge**: F12 or Ctrl+Shift+I
- **Firefox**: F12 or Ctrl+Shift+I

Useful panels:
- **Console**: JavaScript errors and `console.log()` output
- **Elements**: Inspect and modify DOM
- **Application > Local Storage**: View saved game data
- **Network**: Should be empty (no external requests)

### Debugging Tips

```javascript
// Add to script section for debugging
const DEBUG = true;

function log(...args) {
  if (DEBUG) console.log('[DEBUG]', ...args);
}

// Usage
log('GameState:', GameState);
log('Franchise generated:', franchise);
```

---

## Code Organization

Follow this structure within `doujin-sim.html`:

```html
<style>
/* === 基本樣式 === */
* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; }

/* === 遊戲介面 === */
.game-container { ... }

/* === 社群媒體模擬 === */
.social-feed { ... }
.post { ... }

/* === 場次模擬 === */
.convention-phase { ... }

/* === 響應式設計 === */
@media (max-width: 768px) { ... }
</style>

<body>
<!-- === 主選單 === -->
<div id="main-menu">...</div>

<!-- === 社群觀察介面 === -->
<div id="observation-phase" class="phase hidden">...</div>

<!-- === 創作介面 === -->
<div id="action-phase" class="phase hidden">...</div>

<!-- === 場次介面 === -->
<div id="convention-phase" class="phase hidden">...</div>

<!-- === 結算介面 === -->
<div id="results-phase" class="phase hidden">...</div>

<script>
// === 遊戲常數與設定 ===
const VERSION = '0.1';
const DEBUG = true;

// === 內容生成資源 (模板+字典) ===
const TitleTemplates = { ... };
const Dictionary = { ... };
const PostTemplates = { ... };

// === 遊戲狀態 ===
const GameState = { ... };

// === P×D×B 模型與 Archetype ===
function generateFranchise() { ... }
function classifyArchetype(P, D, B) { ... }

// === 動態事件系統 ===
const EVENT_POOL = { ... };
function rollForEvents() { ... }
function applyEvent() { ... }

// === 社群貼文生成 ===
function generateSocialFeed() { ... }
function generateSocialPost() { ... }

// === 場次模擬 (三階段) ===
function generateAttendees() { ... }
function simulateBoothVisits() { ... }
function simulatePurchases() { ... }

// === UI 更新函數 ===
function renderPhase(phase) { ... }
function renderSocialFeed(posts) { ... }
function renderConventionResults(results) { ... }

// === 事件處理器 ===
function bindEventHandlers() { ... }

// === 存檔/讀檔 ===
function saveGame() { ... }
function loadGame() { ... }

// === 初始化 ===
function init() {
  bindEventHandlers();
  if (!loadGame()) {
    initGame({ newGame: true });
  }
  renderPhase(GameState.phase);
}

// Start
init();
</script>
</body>
```

---

## Testing Checklist

### Manual Testing

Before committing changes, verify:

- [ ] Page loads without console errors
- [ ] New game starts correctly
- [ ] Social feed generates posts
- [ ] AP actions work (research, write)
- [ ] Events trigger and modify franchises
- [ ] Convention simulation completes
- [ ] Results display correctly
- [ ] Save/load works (refresh and resume)
- [ ] UI responsive on different screen sizes

### Browser Testing

Test in at least:
- [ ] Chrome (latest)
- [ ] Firefox (latest)

---

## Common Tasks

### Adding a New Franchise Tag

1. Add tag to `Dictionary.tags` array
2. Add tag weight mapping to `TAG_WEIGHTS`
3. Test by generating franchises with new tag

### Adding a New Event Type

1. Add event definition to `EVENT_POOL[category]`
2. Include: id, displayName, flavorTemplate, weight, cooldown, effects, tagEffects
3. Test by forcing event trigger in console:
   ```javascript
   applyEvent(EVENT_POOL.OFFICIAL[0], [GameState.franchises[0]]);
   ```

### Adding a New Post Template

1. Add template string to `PostTemplates[fanType]`
2. Use placeholders: `【franchise】`, `【character】`, `【episode】`, etc.
3. Test by generating posts for that fan type

### Modifying P×D×B Thresholds

1. Update constants in `classifyArchetype()`:
   ```javascript
   const HIGH_P = 60, HIGH_D = 0.6, HIGH_B = 1.3;
   ```
2. Test archetype distribution:
   ```javascript
   const counts = {};
   for (let i = 0; i < 100; i++) {
     const f = generateFranchise();
     counts[f.archetype] = (counts[f.archetype] || 0) + 1;
   }
   console.table(counts);
   ```

---

## Git Workflow

### Committing Changes

```bash
# Check what changed
git status
git diff

# Stage and commit
git add doujin-sim.html
git commit -m "feat: implement social feed generation"

# Push to remote
git push origin 1-doujin-sim
```

### Commit Message Format

```
<type>: <description>

Types:
- feat: New feature
- fix: Bug fix
- refactor: Code restructure
- style: CSS/formatting changes
- docs: Documentation only
- test: Testing changes
```

---

## Troubleshooting

### LocalStorage Issues

**Problem**: Save not working
**Solution**: Check DevTools > Application > Local Storage. Ensure `doujin-sim-save` key exists.

```javascript
// Debug in console
console.log(localStorage.getItem('doujin-sim-save'));
```

### Content Generation Issues

**Problem**: Generated titles look wrong
**Solution**: Check template/dictionary structure:

```javascript
// Debug in console
console.log(TitleTemplates.japanese.A);
console.log(Dictionary.place);
```

### Performance Issues

**Problem**: Convention simulation is slow
**Solution**: Check attendee count isn't too high:

```javascript
// Debug in console
const attendees = generateAttendees(boothItems, GameState.franchises);
console.log('Attendee count:', attendees.length);
// Should be 500-3000 range
```

---

## Resources

- **Spec**: [spec.md](spec.md) - Full feature requirements
- **Data Model**: [data-model.md](data-model.md) - JavaScript object structures
- **API Contracts**: [contracts/game-api.md](contracts/game-api.md) - Function signatures
- **Research**: [research.md](research.md) - Design decisions and algorithms
- **Constitution**: [../../.specify/memory/constitution.md](../../.specify/memory/constitution.md) - Project constraints
