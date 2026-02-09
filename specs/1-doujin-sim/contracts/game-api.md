# Game API Contracts: Doujin Circle Management Simulator

**Branch**: `1-doujin-sim` | **Date**: 2026-02-09 | **Data Model**: [data-model.md](../data-model.md)

## Overview

Internal function signatures for the game logic. All functions are vanilla JavaScript, no external dependencies. Functions are organized by game system.

---

## Game Loop Functions

### initGame

Initialize a new game or load existing save.

```javascript
/**
 * Initialize game state
 * @param {Object} options - Initialization options
 * @param {boolean} options.newGame - Force new game (ignore save)
 * @param {number} options.seed - Optional seed for reproducibility
 * @returns {GameState} Initialized game state
 */
function initGame(options = {}) {
  // If save exists and !newGame, load it
  // Otherwise create fresh GameState with generated franchises
}
```

### advancePhase

Move to next game phase.

```javascript
/**
 * Advance to next phase in the game loop
 * @returns {string} New phase name
 * @throws {Error} If current phase cannot advance (e.g., missing requirements)
 */
function advancePhase() {
  // OBSERVATION -> ACTION -> PREP -> CONVENTION -> RESULTS -> OBSERVATION
}
```

### endRound

Complete current round and prepare for next.

```javascript
/**
 * End current round, apply storage costs, advance round counter
 * @returns {Object} Round summary { profit, events, nextRoundPreview }
 */
function endRound() {
  // Calculate storage costs
  // Record history
  // Increment round
  // Reset AP
  // Return summary
}
```

---

## Franchise System Functions

### generateFranchise

Create a new franchise with P×D×B attributes.

```javascript
/**
 * Generate a new franchise
 * @param {Object} options - Generation options
 * @param {number} options.seed - Seed for reproducible generation
 * @param {string} options.biasArchetype - Optional archetype to bias toward
 * @returns {Franchise} Generated franchise object
 */
function generateFranchise(options = {}) {
  // Generate P, D, B with correlations
  // Derive archetype from thresholds
  // Generate name/description/tags
}
```

### classifyArchetype

Determine archetype from P×D×B values.

```javascript
/**
 * Classify franchise archetype from attributes
 * @param {number} P - Popularity (1-100)
 * @param {number} D - Audience density (0.1-1.0)
 * @param {number} B - Purchasing power (0.5-2.0)
 * @returns {string} Archetype enum value
 */
function classifyArchetype(P, D, B) {
  const HIGH_P = 60, HIGH_D = 0.6, HIGH_B = 1.3;
  // Return one of 8 archetypes based on thresholds
}
```

### applyAttributeChange

Modify franchise attributes (used by events).

```javascript
/**
 * Apply attribute changes to a franchise
 * @param {Franchise} franchise - Target franchise
 * @param {Object} changes - { popularity, density, purchasingPower }
 * @returns {Franchise} Updated franchise (mutates original)
 */
function applyAttributeChange(franchise, changes) {
  // Apply deltas with clamping to valid ranges
  // Reclassify archetype if thresholds crossed
  // Return updated franchise
}
```

---

## Content Generation Functions

### generateTitle

Generate franchise title from templates.

```javascript
/**
 * Generate a franchise title
 * @param {Object} options - Generation options
 * @param {number} options.seed - Random seed
 * @param {string[]} options.tags - Tags to influence style
 * @param {string} options.language - "japanese" | "chinese"
 * @returns {string} Generated title
 */
function generateTitle(options) {
  // Select template category based on tag weights
  // Select random template from category
  // Fill placeholders from dictionary
}
```

### generateDescription

Generate franchise synopsis.

```javascript
/**
 * Generate franchise description
 * @param {Object} options - Generation options
 * @param {number} options.seed - Random seed
 * @param {string[]} options.tags - Tags to influence style
 * @returns {string} Generated description (Chinese, 2-4 sentences)
 */
function generateDescription(options) {
  // Select 2-4 sentence types
  // Generate each sentence from template + dictionary
  // Combine into paragraph
}
```

### generateSocialPost

Generate a social media post.

```javascript
/**
 * Generate a social media post for a franchise
 * @param {Franchise} franchise - Target franchise
 * @param {string} fanType - Fan type enum value
 * @param {number} seed - Random seed
 * @returns {SocialMediaPost} Generated post object
 */
function generateSocialPost(franchise, fanType, seed) {
  // Select template for fan type
  // Fill placeholders with franchise data + dictionary
  // Generate username and timestamp
}
```

### generateSocialFeed

Generate full social feed for observation phase.

```javascript
/**
 * Generate social media feed for all franchises
 * @param {Franchise[]} franchises - All active franchises
 * @returns {SocialMediaPost[]} Array of posts, sorted by simulated time
 */
function generateSocialFeed(franchises) {
  // For each franchise:
  //   Calculate post count = P × audienceActivity × trendMultiplier
  //   Determine fan type distribution from D, B, contentPreference
  //   Generate posts
  // Shuffle and return
}
```

---

## Dynamic Event Functions

### rollForEvents

Determine if events occur this AP.

```javascript
/**
 * Roll for event occurrence
 * @param {number} apSpent - Current AP being spent
 * @returns {number} Number of events to trigger (0, 1, or 2)
 */
function rollForEvents(apSpent) {
  const roll = Math.random();
  if (roll > 0.5) return 0;  // 50% no event
  if (roll > 0.1) return 1;  // 40% one event
  return 2;                   // 10% two events
}
```

### selectEvent

Select an event from the pool.

```javascript
/**
 * Select an event from the event pool
 * @param {Franchise[]} franchises - Available franchises to target
 * @param {Object} cooldowns - Current event cooldowns
 * @returns {Object} { eventType, targetFranchises }
 */
function selectEvent(franchises, cooldowns) {
  // Filter events by cooldown
  // Weight events by probability and franchise eligibility
  // Select random event
  // Select 1-3 target franchises
}
```

### applyEvent

Apply event effects to franchises.

```javascript
/**
 * Apply a dynamic event
 * @param {Object} eventType - Event type definition
 * @param {Franchise[]} targets - Target franchises
 * @returns {DynamicEvent} Event instance with results
 */
function applyEvent(eventType, targets) {
  // Calculate attribute changes (random within range)
  // Apply tag changes
  // Create event instance
  // Update cooldowns
  // Check for chain events
}
```

### processEventChains

Handle follow-up events.

```javascript
/**
 * Process potential chain events
 * @param {DynamicEvent} triggerEvent - Event that may trigger chains
 * @param {number} depth - Current chain depth (max 3)
 * @returns {DynamicEvent[]} Additional events triggered
 */
function processEventChains(triggerEvent, depth = 0) {
  if (depth >= 3) return [];
  // Check triggerEvent.chainEvents
  // Roll for each potential chain
  // Recursively process any triggered chains
}
```

---

## Draft & Publication Functions

### createDraft

Start or continue a draft for a franchise.

```javascript
/**
 * Create or update draft progress
 * @param {string} franchiseId - Target franchise
 * @param {string} action - "research" | "write" | "both"
 * @returns {DraftProgress} Updated draft progress
 */
function createDraft(franchiseId, action) {
  // Find or create DraftProgress
  // Increment essenceLevel and/or audienceLevel
  // Return updated progress
}
```

### publishDraft

Convert draft to publication.

```javascript
/**
 * Publish a draft as a sellable publication
 * @param {DraftProgress} draft - Draft to publish
 * @param {Object} options - Publication options
 * @param {number} options.printQuantity - Copies to print
 * @param {number} options.retailPrice - Price per copy
 * @param {number} options.coverQuality - Cover quality investment
 * @returns {Publication} Created publication
 * @throws {Error} If insufficient funds
 */
function publishDraft(draft, options) {
  // Calculate production cost
  // Verify player can afford
  // Create Publication
  // Add to inventory
  // Deduct money
}
```

---

## Convention Simulation Functions

### generateAttendees

Phase 1: Generate convention attendees.

```javascript
/**
 * Generate attendees for convention
 * @param {Publication[]} boothItems - Player's publications at booth
 * @param {Franchise[]} allFranchises - All franchises (for competitor booths)
 * @returns {ConventionAttendee[]} Generated attendees
 */
function generateAttendees(boothItems, allFranchises) {
  // Calculate total P from booth franchises
  // Generate attendee count = sum(P) × 15 + random variance
  // For each attendee:
  //   Generate budget, browseTendency, priceSensitivity
  //   Generate targetList based on D values
  //   Generate franchiseAffinities
}
```

### simulateBoothVisits

Phase 2: Simulate attendee booth visits.

```javascript
/**
 * Simulate attendee visits to player booth
 * @param {ConventionAttendee[]} attendees - All attendees
 * @param {Object} playerBooth - Player's booth { items, position }
 * @returns {Object[]} Visit records { attendeeId, interest, browsed }
 */
function simulateBoothVisits(attendees, playerBooth) {
  // For each attendee:
  //   Check if player booth in targetList (guaranteed visit)
  //   Otherwise, roll against browseTendency × (1 - fatigue)
  //   Record visit with interest level
  //   Accumulate fatigue
}
```

### simulatePurchases

Phase 3: Simulate purchase decisions.

```javascript
/**
 * Simulate purchase decisions for booth visitors
 * @param {Object[]} visits - Visit records from Phase 2
 * @param {Publication[]} items - Available items at booth
 * @returns {Object} Sales results { soldItems, revenue, unsold }
 */
function simulatePurchases(visits, items) {
  // For each visit:
  //   For each item attendee is interested in:
  //     Calculate purchase probability:
  //       base = franchise.D
  //       priceAdjust = (1 - price/budget × priceSensitivity)
  //       bAdjust = franchise.B
  //       fatigueAdjust = (1 - fatigue × 0.5)
  //     Roll for purchase
  //     If purchased, deduct from budget and inventory
}
```

### runConventionSimulation

Full convention simulation.

```javascript
/**
 * Run complete convention simulation
 * @param {Publication[]} boothItems - Player's publications
 * @returns {Object} Convention results
 */
function runConventionSimulation(boothItems) {
  const attendees = generateAttendees(boothItems, GameState.franchises);
  const visits = simulateBoothVisits(attendees, { items: boothItems });
  const sales = simulatePurchases(visits, boothItems);
  return {
    totalAttendees: attendees.length,
    boothVisitors: visits.length,
    ...sales
  };
}
```

---

## Persistence Functions

### saveGame

Save game state to localStorage.

```javascript
/**
 * Save current game state
 * @returns {boolean} Success status
 */
function saveGame() {
  // Serialize GameState
  // Exclude regeneratable data (names, descriptions)
  // Include version number
  // Store to localStorage
}
```

### loadGame

Load game state from localStorage.

```javascript
/**
 * Load game state from storage
 * @returns {boolean} True if save found and loaded
 */
function loadGame() {
  // Read from localStorage
  // Check version, migrate if needed
  // Restore GameState
  // Regenerate content from seeds
}
```

### clearSave

Delete saved game.

```javascript
/**
 * Clear saved game data
 * @returns {void}
 */
function clearSave() {
  localStorage.removeItem('doujin-sim-save');
}
```

---

## UI Binding Functions

### renderPhase

Render current phase UI.

```javascript
/**
 * Update UI for current phase
 * @param {string} phase - Current phase
 * @returns {void}
 */
function renderPhase(phase) {
  // Hide all phase containers
  // Show container for current phase
  // Call phase-specific render function
}
```

### bindEventHandlers

Set up all event listeners.

```javascript
/**
 * Initialize all UI event handlers
 * @returns {void}
 */
function bindEventHandlers() {
  // Button clicks (start, advance, actions)
  // Form submissions (publish options)
  // Keyboard shortcuts (optional)
}
```

---

## Utility Functions

### clamp

Constrain value to range.

```javascript
/**
 * Clamp a number to a range
 * @param {number} value - Input value
 * @param {number} min - Minimum
 * @param {number} max - Maximum
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
```

### seededRandom

Deterministic random number generator.

```javascript
/**
 * Seeded random number generator
 * @param {number} seed - Random seed
 * @returns {function} Function that returns next random value (0-1)
 */
function seededRandom(seed) {
  // Implementation using mulberry32 or similar
}
```

### normalRandom

Normal distribution random.

```javascript
/**
 * Generate random number from normal distribution
 * @param {number} mean - Distribution mean
 * @param {number} stddev - Standard deviation
 * @returns {number} Random value
 */
function normalRandom(mean, stddev) {
  // Box-Muller transform
}
```

### formatCurrency

Format number as currency.

```javascript
/**
 * Format number as currency string
 * @param {number} amount - Amount in dollars
 * @returns {string} Formatted string (e.g., "$1,500")
 */
function formatCurrency(amount) {
  return '$' + amount.toLocaleString();
}
```
