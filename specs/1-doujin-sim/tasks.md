# Tasks: Doujin Circle Management Simulator

**Input**: Design documents from `/specs/1-doujin-sim/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓

**Tests**: Manual browser testing only (per constitution - no test framework). Each user story includes a "Verify" checkpoint instead of automated tests.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story. All code goes into single file `doujin-sim.html`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different code sections, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US5, or SETUP/FOUND for infrastructure)
- All paths are within `doujin-sim.html` unless otherwise noted

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create the single HTML file structure

- [X] T001 [SETUP] Create `doujin-sim.html` with base HTML5 document structure (`<!DOCTYPE>`, `<html lang="zh-TW">`, `<head>`, `<body>`)
- [X] T002 [SETUP] Add meta tags: charset UTF-8, viewport for responsiveness, title "同人圈經營模擬器 v0.1"
- [X] T003 [P] [SETUP] Create CSS section skeleton in `<style>` with commented section dividers (基本樣式, 遊戲介面, 社群媒體模擬, 場次模擬, 響應式設計)
- [X] T004 [P] [SETUP] Create JS section skeleton in `<script>` with commented section dividers per plan.md (遊戲常數, 內容生成資源, 遊戲狀態, P×D×B模型, etc.)
- [X] T005 [SETUP] Add HTML container divs for all game phases: `#main-menu`, `#observation-phase`, `#action-phase`, `#prep-phase`, `#convention-phase`, `#results-phase`

**Checkpoint**: File opens in browser without errors, shows empty containers ✓

---

## Phase 2: Foundational (Core Infrastructure)

**Purpose**: Core systems that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### State & Utilities

- [X] T006 [FOUND] Implement `GameState` object with all properties from data-model.md (round, money, ap, phase, franchises, drafts, publications, inventory, history, eventLog, seed)
- [X] T007 [FOUND] Implement utility functions: `clamp(value, min, max)`, `seededRandom(seed)`, `normalRandom(mean, stddev)`, `formatCurrency(amount)`
- [X] T008 [FOUND] Implement `EventBus` pattern: `on(event, callback)`, `emit(event, data)` for loose coupling

### Content Generation Core

- [X] T009 [FOUND] Create `Dictionary` object with word pools: place, role, event, adj, noun, verb, exclaim, meme (minimum 20 entries per category)
- [X] T010 [FOUND] Create `TitleTemplates` object with Japanese and Chinese template categories (A, B, C, D - minimum 3 templates per category)
- [X] T011 [FOUND] Create `PostTemplates` object with templates for all 8 fan types (ENTHUSIAST, CASUAL, CRITIC, MEMER, LURKER, WHALE, COLLECTOR, HATER - minimum 3 templates each)
- [X] T012 [FOUND] Implement `generateTitle(options)` function using templates + dictionary slot filling
- [X] T013 [FOUND] Implement `generateDescription(options)` function for 2-4 sentence synopses

### P×D×B Model

- [X] T014 [FOUND] Define archetype threshold constants: `HIGH_P=60, LOW_P=40, HIGH_D=0.6, LOW_D=0.4, HIGH_B=1.3, LOW_B=0.8`
- [X] T015 [FOUND] Implement `classifyArchetype(P, D, B)` returning one of 8 archetype enum values
- [X] T016 [FOUND] Implement `generateFranchise(options)` with P×D×B correlation logic from research.md
- [X] T017 [FOUND] Implement `applyAttributeChange(franchise, changes)` with clamping and archetype reclassification

### Phase Navigation

- [X] T018 [FOUND] Implement `advancePhase()` function: OBSERVATION → ACTION → PREP → CONVENTION → RESULTS → OBSERVATION
- [X] T019 [FOUND] Implement `renderPhase(phase)` to show/hide phase containers
- [X] T020 [FOUND] Implement `bindEventHandlers()` skeleton for all UI button clicks

### Persistence

- [X] T021 [P] [FOUND] Implement `saveGame()` to localStorage with version number and timestamp
- [X] T022 [P] [FOUND] Implement `loadGame()` from localStorage with basic validation
- [X] T023 [FOUND] Implement `initGame(options)` that either loads save or creates new game with generated franchises

**Checkpoint**: Open browser, call `initGame({newGame:true})` in console, verify `GameState` populated with 10+ franchises each having valid P×D×B and archetype ✓

---

## Phase 3: User Story 1 - Core Simulation Loop (Priority: P1) 🎯 MVP

**Goal**: Complete playable loop: observe social media → create draft → prep → convention → results → next round

**Independent Test**: Play through one full round in browser, see social posts, create one draft, sell at convention, see money change

### Social Media Observation (OBSERVATION phase)

- [X] T024 [US1] Implement `generateSocialPost(franchise, fanType, seed)` using PostTemplates and Dictionary
- [X] T025 [US1] Implement `getFanTypeDistribution(franchise)` returning fan type weights based on P, D, B, contentPreference
- [X] T026 [US1] Implement `generateSocialFeed(franchises)` producing 50-100 posts sorted by simulated time
- [X] T027 [US1] Create HTML structure for social feed display: post cards with username, content, timestamp, franchise indicator
- [X] T028 [US1] Create CSS for social feed: scrollable container, post styling, fan type color coding, timestamps
- [X] T029 [US1] Implement `renderSocialFeed(posts)` to populate DOM from generated posts
- [X] T030 [US1] Add "開始創作" button to advance from OBSERVATION to ACTION phase

### Draft Creation (ACTION phase)

- [X] T031 [US1] Create HTML for action phase: AP display, franchise selection list, "創作草稿" button
- [X] T032 [US1] Create CSS for action phase: franchise cards, AP counter, action buttons
- [X] T033 [US1] Implement `createDraft(franchiseId, action)` decreasing AP and updating DraftProgress
- [X] T034 [US1] Implement `renderActionPhase()` showing franchises with current draft counts
- [X] T035 [US1] Add "前往準備" button to advance from ACTION to PREP phase (enabled when at least 1 draft exists)

### Convention Preparation (PREP phase - minimal for P1)

- [X] T036 [US1] Create HTML for prep phase: draft selection, print quantity input, price input, confirm button
- [X] T037 [US1] Create CSS for prep phase: form styling, cost preview
- [X] T038 [US1] Implement `calculateProductionCost(quantity, options)` returning total cost
- [X] T039 [US1] Implement `publishDraft(draft, options)` creating Publication and deducting money
- [X] T040 [US1] Implement `renderPrepPhase()` showing available drafts and inventory
- [X] T041 [US1] Add "開始場次" button to advance from PREP to CONVENTION phase

### Convention Simulation (CONVENTION phase)

- [X] T042 [US1] Implement `generateAttendees(boothItems, allFranchises)` per contracts/game-api.md
- [X] T043 [US1] Implement `simulateBoothVisits(attendees, playerBooth)` with target list and browse logic
- [X] T044 [US1] Implement `simulatePurchases(visits, items)` with probability calculation (D × B × price × fatigue)
- [X] T045 [US1] Implement `runConventionSimulation(boothItems)` orchestrating all three phases
- [X] T046 [US1] Create HTML for convention phase: progress indicator, live stats (optional), or loading message
- [X] T047 [US1] Create CSS for convention phase: progress bar, stats display
- [X] T048 [US1] Implement `renderConventionPhase()` showing simulation progress

### Results Display (RESULTS phase)

- [X] T049 [US1] Create HTML for results: revenue, units sold, expenses, profit/loss, per-publication breakdown
- [X] T050 [US1] Create CSS for results: summary cards, positive/negative profit colors
- [X] T051 [US1] Implement `renderResultsPhase(salesResults)` displaying convention outcomes
- [X] T052 [US1] Add "下一回合" button to advance to next round (increment round, reset AP, regenerate social feed)

### Round Transition

- [X] T053 [US1] Implement `endRound()` updating inventory, recording history, advancing round counter
- [X] T054 [US1] Implement main menu with "新遊戲" and "繼續遊戲" buttons
- [X] T055 [US1] Wire up `init()` function to start game flow on page load

**Checkpoint (MVP Complete)**: Full playable loop - observe 50+ posts about generated franchises, spend AP to create draft, set print quantity/price, run convention, see sales results, click next round ✓

---

## Phase 4: User Story 2 - Strategic Action Management (Priority: P2)

**Goal**: Add essence/audience research mechanics, meaningful AP allocation choices

**Independent Test**: Create two drafts - one with high essence (studied franchise), one with low essence. Verify higher essence draft sells better to quality-sensitive fans.

### Essence System

- [X] T056 [US2] Update `createDraft()` to support action types: "write" | "study" | "research"
- [X] T057 [US2] Implement essence level tracking in DraftProgress (0-10 scale)
- [X] T058 [US2] Update action phase UI to show "研究作品" button increasing essence level
- [X] T059 [US2] Implement essence impact on sales: quality-sensitive fans (ENTHUSIAST, COLLECTOR) prefer high essence

### Audience Research System

- [X] T060 [US2] Implement audience research level tracking in DraftProgress (0-10 scale)
- [X] T061 [US2] Update action phase UI to show "研究市場" button increasing audience level
- [X] T062 [US2] Implement market intelligence reveal: show P×D hints based on audience research level
- [X] T063 [US2] Update franchise display to show research-revealed information (or "???" if unresearched)

### Strategic UI Enhancements

- [X] T064 [US2] Add AP cost display to all action buttons
- [X] T065 [US2] Add visual feedback when AP is insufficient for action
- [X] T066 [US2] Show essence/audience levels on draft cards in prep phase

**Checkpoint**: Research a franchise to level 5+, see revealed P×D information. Create draft with high essence, verify it sells better than low-essence draft for same franchise. ✓

---

## Phase 5: User Story 3 - Convention Preparation & Economics (Priority: P2)

**Goal**: Add economic complexity - paper quality, cover artist, volume discounts, storage fees

**Independent Test**: Configure two publications with different options (cheap vs premium), verify cost differences and sales impact.

### Production Options

- [X] T067 [US3] Add paper quality selector to prep phase: 普通紙 (base), 再生紙 (-20% cost), 高級紙 (+50% cost, +attraction)
- [X] T068 [US3] Add cover artist selector: AI繪圖 (free, 20% stop rate), 朋友幫忙 ($500, 40% stop rate), 專業繪師 ($2000, 80% stop rate)
- [X] T069 [US3] Update `calculateProductionCost()` to include paper and cover costs
- [X] T070 [US3] Update convention simulation to use cover quality affecting booth stop rate

### Volume Economics

- [X] T071 [US3] Implement volume discount calculation: 50本=base, 100本=-10%, 200本=-20%, 500本=-30%
- [X] T072 [US3] Add cost preview showing per-unit cost at different quantities
- [X] T073 [US3] Add validation: block if total cost exceeds available money

### Pricing Strategy

- [X] T074 [US3] Add pricing guidance showing fan purchasing power thresholds
- [X] T075 [US3] Update purchase simulation to use price sensitivity per fan type (CASUAL won't buy >$400)
- [X] T076 [US3] Add price validation: minimum $100, maximum $2000

### Inventory Management

- [X] T077 [US3] Implement storage fee calculation: $1 per book per round
- [X] T078 [US3] Update `endRound()` to apply storage fees to unsold inventory
- [X] T079 [US3] Add inventory display in prep phase showing carryover stock with accumulated fees

**Checkpoint**: Try selling with premium paper + pro artist at high price vs cheap options at low price. Verify economic impact on profit margins. ✓

---

## Phase 6: User Story 4 - Multi-Round Progression (Priority: P3)

**Goal**: Add persistence across rounds, trend shifts, history tracking

**Independent Test**: Play 3+ rounds, verify inventory carries over, trends change, history shows cumulative data.

### Trend System

- [X] T080 [US4] Implement franchise trend shifts between rounds: seasonal changes, popularity drift
- [X] T081 [US4] Add visual indicators for trending up/down/stable franchises
- [X] T082 [US4] Implement new franchise introduction (1-2 new franchises per round, 1-2 may exit)

### Dynamic Events

- [X] T083 [US4] Implement `EVENT_POOL` with all event types from spec (OFFICIAL, SOCIAL, CONSUMPTION, REALITY categories)
- [X] T084 [US4] Implement `rollForEvents(apSpent)` with 50%/40%/10% probability distribution
- [X] T085 [US4] Implement `selectEvent(franchises, cooldowns)` with weighted random selection
- [X] T086 [US4] Implement `applyEvent(eventType, targets)` modifying P/D/B and tags
- [X] T087 [US4] Implement `processEventChains(triggerEvent, depth)` with max depth 3
- [X] T088 [US4] Add event notification UI: show flavor text when events occur
- [X] T089 [US4] Add event history log viewable from main UI

### History & Analytics

- [X] T090 [US4] Create HTML for history panel: round-by-round breakdown, cumulative totals
- [X] T091 [US4] Create CSS for history panel: table styling, profit/loss colors
- [X] T092 [US4] Implement `renderHistoryPanel()` showing all SalesRecords
- [X] T093 [US4] Add "查看歷史" button accessible from observation phase

### Save/Load Robustness

- [X] T094 [US4] Add save version migration support for future schema changes
- [X] T095 [US4] Add auto-save on phase transitions
- [X] T096 [US4] Add "刪除存檔" option in main menu

**Checkpoint**: Play 3 rounds, see events change franchise attributes, verify history shows all 3 rounds, close browser and resume successfully. ✓

---

## Phase 7: User Story 5 - Deep Market Intelligence (Priority: P3)

**Goal**: Add detailed research mechanics revealing complete fan demographics and comparative analytics

**Independent Test**: Research one franchise to max level, verify complete 8-fan-type breakdown visible. Compare to unresearched franchise.

### Progressive Intelligence Reveal

- [X] T097 [US5] Implement tiered intelligence reveal:
  - Level 0: "???" for all metrics
  - Level 1-2: Top 2 fan types shown
  - Level 3-4: Top 4 fan types + estimated market size
  - Level 5+: Complete 8-type breakdown + trend indicators
- [X] T098 [US5] Create HTML for detailed intelligence panel
- [X] T099 [US5] Create CSS for intelligence panel: charts/bars for fan distribution, trend arrows

### Comparative Analytics

- [X] T100 [US5] Implement franchise comparison view: side-by-side P/D/B (for researched franchises)
- [X] T101 [US5] Add archetype labels visible once franchise is sufficiently researched
- [X] T102 [US5] Implement "空氣股警告" indicator for Air Stock archetype franchises

### Prediction Confidence

- [X] T103 [US5] Implement sales prediction confidence based on combined essence + audience research
- [X] T104 [US5] Add prediction display in prep phase: "預估銷量: 30-80本 (信心度: 中)"
- [X] T105 [US5] Verify predictions are more accurate for well-researched franchises

**Checkpoint**: Research franchise A fully, leave franchise B unresearched. Verify A shows complete intel, B shows "???". Create drafts for both, verify prediction accuracy. ✓

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Quality improvements affecting all user stories

### Responsive Design

- [X] T106 [P] [POLISH] Add CSS media queries for tablet (768px) and mobile (480px) breakpoints
- [X] T107 [P] [POLISH] Ensure touch-friendly button sizes (minimum 44px)
- [X] T108 [P] [POLISH] Test layout doesn't require horizontal scroll on 1280x720

### Visual Polish

- [X] T109 [P] [POLISH] Add visual feedback for button clicks (hover, active states)
- [X] T110 [P] [POLISH] Add loading states during convention simulation
- [X] T111 [P] [POLISH] Add transition animations between phases (CSS transitions)

### Error Handling

- [X] T112 [POLISH] Add try/catch around localStorage operations with fallback messaging
- [X] T113 [POLISH] Add validation error messages for all user inputs
- [X] T114 [POLISH] Add console logging for debugging (togglable via DEBUG flag)

### Final Validation

- [X] T115 [POLISH] Run quickstart.md validation checklist
- [X] T116 [POLISH] Test in Chrome (latest)
- [X] T117 [POLISH] Test in Firefox (latest)
- [X] T118 [POLISH] Verify Air Stock satirical effect: high P, low D×B franchise shows "lots of buzz but no profit"
- [X] T119 [POLISH] Update version number in title to v1.0

**All tasks completed ✓**

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ← BLOCKS all user stories
    ↓
Phase 3 (US1 - P1) ← MVP Complete here
    ↓
Phase 4 (US2 - P2) ─┬─ Can run in parallel after US1
Phase 5 (US3 - P2) ─┘
    ↓
Phase 6 (US4 - P3) ─┬─ Can run in parallel after US2/US3
Phase 7 (US5 - P3) ─┘
    ↓
Phase 8 (Polish) ← After desired user stories complete
```

### Parallel Opportunities

Within each phase, tasks marked [P] can run in parallel:
- T003 ∥ T004 (CSS skeleton ∥ JS skeleton)
- T021 ∥ T022 (saveGame ∥ loadGame)
- T106 ∥ T107 ∥ T108 (responsive design tasks)
- T109 ∥ T110 ∥ T111 (visual polish tasks)

User stories after MVP can be parallelized:
- US2 and US3 have no dependency on each other
- US4 and US5 have no dependency on each other

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + Phase 2 (Setup + Foundational)
2. Complete Phase 3 (US1) → **Playable game exists**
3. STOP and validate: Full loop works
4. Add US2 + US3 for strategic depth
5. Add US4 + US5 for longevity
6. Polish

### Estimated Task Counts

| Phase | Tasks | Priority |
|-------|-------|----------|
| Setup | 5 | Required |
| Foundational | 18 | Required |
| US1 (MVP) | 32 | P1 |
| US2 | 11 | P2 |
| US3 | 13 | P2 |
| US4 | 17 | P3 |
| US5 | 9 | P3 |
| Polish | 14 | Final |
| **Total** | **119** | |

### Commit Strategy

Commit after completing each numbered task or logical group. Suggested commit points:
- After T005: "feat: project structure"
- After T023: "feat: core infrastructure"
- After T055: "feat: MVP playable loop"
- After T066: "feat: strategic actions"
- After T079: "feat: economics system"
- After T096: "feat: progression system"
- After T105: "feat: market intelligence"
- After T119: "release: v1.0"

---

## Notes

- All code goes into single file `doujin-sim.html` per constitution
- Test in browser after each task group
- Use DevTools console (`DEBUG=true`) for runtime inspection
- [P] tasks edit different code sections - can be done simultaneously
- [Story] label tracks which user story depends on which tasks
