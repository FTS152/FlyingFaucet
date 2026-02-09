# Research: Doujin Circle Management Simulator

**Branch**: `1-doujin-sim` | **Date**: 2026-02-09 | **Plan**: [plan.md](plan.md)

## Overview

Research for implementation decisions and best practices. All technical context from constitution is already determined (single-file HTML, vanilla JS, localStorage). This research focuses on design decisions and algorithms.

---

## Research Area 1: Content Generation Strategy

### Decision: Template + Dictionary with Tag-Weighted Selection

### Rationale
Based on the name.html prototype analysis, the template/dictionary approach provides:
- Natural-sounding output without AI dependencies
- Deterministic regeneration (same seed = same output)
- Easy expansion by adding templates/dictionary entries
- Low runtime cost (string replacement only)

### Implementation Approach

**Title Generation**:
```javascript
// Template categories by style
const TITLE_TEMPLATES = {
  A: ["【place】的【role】【event】記"], // Classic light novel
  B: ["【adj】【noun】【verb】！"],       // Energetic manga
  C: ["Re:【event】從【state】開始"],    // Isekai parody
  // ... more categories
};

// Tag influences template category weights
const TAG_WEIGHTS = {
  "燒腦": { A: 0.6, B: 0.1, C: 0.1, D: 0.2 },
  "超展開": { A: 0.1, B: 0.5, C: 0.3, D: 0.1 },
  // ...
};
```

**Description Generation**:
- Use 4 sentence types: setting, lead, conflict, hook
- Select 2-3 sentences based on tags
- Fill placeholders from themed dictionaries

**Social Post Generation**:
- 8 fan-type templates (enthusiast, casual, critic, memer, etc.)
- Fan type distribution derived from P×D×B
- Timestamp simulation (3m, 2h, 1d relative times)

### Alternatives Considered
- **Markov chains**: More natural but less controllable; rejected for predictability needs
- **LLM API**: Violates offline/single-file constraint; rejected per constitution
- **Pure random word soup**: Not natural enough; rejected for quality floor

---

## Research Area 2: P×D×B Model Balancing

### Decision: Attribute Ranges with Archetype Thresholds

### Rationale
The 8-archetype system needs balanced attribute distribution to ensure:
- All archetypes appear naturally in random generation
- "Air Stock" trap is common enough to be a learning experience
- "Hidden Gem" rewards are rare enough to feel earned

### Implementation Approach

**Attribute Generation**:
```javascript
// Generate with bias toward interesting combinations
function generateFranchise() {
  // P: Normal distribution, mean 50, stddev 25
  const P = clamp(normalRandom(50, 25), 1, 100);
  
  // D: Inverse correlation with P for drama
  const D = clamp(0.55 - (P/200) + normalRandom(0, 0.2), 0.1, 1.0);
  
  // B: Semi-independent, slight negative correlation with D
  const B = clamp(1.25 - (D * 0.5) + normalRandom(0, 0.3), 0.5, 2.0);
  
  return { P, D, B };
}

// Archetype thresholds
const HIGH_P = 60, LOW_P = 40;
const HIGH_D = 0.6, LOW_D = 0.4;
const HIGH_B = 1.3, LOW_B = 0.8;
```

**Distribution Targets** (per 10 franchises):
| Archetype | Target Count | Notes |
|-----------|--------------|-------|
| Blue Chip | 0-1 | Rare, obvious choice |
| Volume Play | 1-2 | Common trap (seems good) |
| Whale Fishing | 1 | Interesting strategy |
| Air Stock | 2-3 | **Core satirical lesson** |
| Hidden Gem | 1 | Reward for research |
| Steady Circle | 1-2 | Safe fallback |
| Niche Luxury | 0-1 | High risk option |
| Dead Zone | 1-2 | Obvious avoid |

### Alternatives Considered
- **Pure random**: Unreliable archetype distribution; rejected
- **Fixed archetypes**: Too predictable; rejected for replayability
- **Manual balance**: Too much content work; rejected for maintainability

---

## Research Area 3: Dynamic Event System

### Decision: Weighted Random with Cooldowns and Chains

### Rationale
Events should feel unpredictable but fair:
- Common events (60% of pool) are mild market shifts
- Rare events (40% of pool) are dramatic changes
- Recently occurred events have reduced probability
- Some events trigger follow-ups (chain events)

### Implementation Approach

**Event Pool Structure**:
```javascript
const EVENT_POOL = {
  OFFICIAL: [
    { id: 'godlike_ep', weight: 0.1, cooldown: 3, 
      effects: { P: +15, D: +0.1, B: +0.2 },
      tags: { add: ['超展開', '名場面'] },
      chains: ['viral_meme'] },
    // ... more events
  ],
  SOCIAL: [...],
  CONSUMPTION: [...],
  REALITY: [...]
};
```

**Trigger Logic**:
```javascript
function rollEvent(franchise) {
  const roll = Math.random();
  if (roll > 0.5) return null;  // 50% no event
  if (roll > 0.1) return selectEvent(1);  // 40% one event
  return selectEvent(2);  // 10% two events
}
```

**Cooldown System**:
- Track `lastOccurred` round for each event ID
- Multiply weight by 0.1 if within cooldown period
- Reset cooldown when event fires

### Alternatives Considered
- **Fixed schedule**: Predictable; rejected for player agency
- **Pure random (no cooldowns)**: Same event spam; rejected
- **Player-triggered only**: Less dynamic; rejected for market volatility feel

---

## Research Area 4: Three-Phase Convention Simulation

### Decision: Agent-Based Simulation with Simplified Pathfinding

### Rationale
Simulate convention realistically enough to demonstrate P vs D×B disconnect:
- Phase 1: Generate attendees (P determines crowd size)
- Phase 2: Simulate booth visits (target list + random walk)
- Phase 3: Purchase decisions (price × B × fatigue)

### Implementation Approach

**Attendee Generation**:
```javascript
function generateAttendees(booths) {
  // Total attendees based on sum of booth P values
  const totalP = booths.reduce((sum, b) => sum + b.franchise.P, 0);
  const attendeeCount = Math.floor(totalP * 15 + normalRandom(0, 50));
  
  const attendees = [];
  for (let i = 0; i < attendeeCount; i++) {
    attendees.push({
      budget: 1500 + Math.random() * 3500,  // $1500-5000
      targetList: generateTargetList(booths),
      browseTendency: Math.random(),  // 0-1
      priceSensitivity: 0.5 + Math.random() * 1.5,
      fatigue: 0
    });
  }
  return attendees;
}
```

**Booth Visit Simulation**:
```javascript
function simulateVisits(attendee, booths, playerBooth) {
  // Visit targets first
  for (const target of attendee.targetList) {
    visitBooth(attendee, target);
    attendee.fatigue += 0.1;
  }
  
  // Random browsing based on tendency
  while (attendee.browseTendency > attendee.fatigue && Math.random() > 0.3) {
    const booth = selectRandomBooth(booths);
    visitBooth(attendee, booth);
    attendee.fatigue += 0.05;
  }
}
```

**Purchase Decision**:
```javascript
function decidePurchase(attendee, item) {
  const franchise = item.franchise;
  
  // Base probability from D (core fan density)
  let prob = franchise.D;
  
  // Price sensitivity adjustment
  prob *= (1 - (item.price / attendee.budget) * attendee.priceSensitivity);
  
  // Purchasing power boost
  prob *= franchise.B;
  
  // Fatigue penalty
  prob *= (1 - attendee.fatigue * 0.5);
  
  return Math.random() < prob;
}
```

### Alternatives Considered
- **Simple formula**: Revenue = P × D × B × essence; too simplistic, doesn't show disconnect
- **Full crowd simulation**: CPU intensive for 2000+ agents; rejected for performance
- **Turn-based visits**: Too slow visually; rejected for UX

---

## Research Area 5: Vanilla JS Architecture Patterns

### Decision: Module Pattern with Event-Driven UI

### Rationale
For single-file organization without modules/imports:
- IIFE or object literal for namespacing
- Custom events for loose coupling
- State object for game data
- Render functions for UI updates

### Implementation Approach

**State Management**:
```javascript
const GameState = {
  round: 1,
  money: 10000,
  ap: 5,
  franchises: [],
  inventory: [],
  events: [],
  
  save() { localStorage.setItem('doujin-save', JSON.stringify(this)); },
  load() { Object.assign(this, JSON.parse(localStorage.getItem('doujin-save'))); }
};
```

**Event Bus**:
```javascript
const EventBus = {
  listeners: {},
  on(event, callback) { 
    (this.listeners[event] ??= []).push(callback); 
  },
  emit(event, data) { 
    this.listeners[event]?.forEach(cb => cb(data)); 
  }
};

// Usage
EventBus.on('round-end', (results) => renderResults(results));
EventBus.emit('round-end', { revenue: 5000, unitsSold: 23 });
```

**Render Pattern**:
```javascript
function renderSocialFeed(posts) {
  const container = document.getElementById('social-feed');
  container.innerHTML = posts.map(post => `
    <div class="post ${post.fanType}">
      <span class="username">@${post.username}</span>
      <p>${post.content}</p>
      <span class="timestamp">${post.timestamp}</span>
    </div>
  `).join('');
}
```

### Alternatives Considered
- **Class-based OOP**: More boilerplate for simple game; rejected
- **Reactive state (proxy)**: Overkill for size; rejected
- **Direct DOM manipulation**: Hard to maintain; rejected for clarity

---

## Research Area 6: localStorage Patterns

### Decision: Single JSON Object with Version Migration

### Rationale
- Simple: One key for entire game state
- Versioned: Include schema version for future migrations
- Compressed: Only save mutable state, not constants

### Implementation Approach

**Save Structure**:
```javascript
const SAVE_VERSION = 1;

function saveGame() {
  const saveData = {
    version: SAVE_VERSION,
    timestamp: Date.now(),
    state: {
      round: GameState.round,
      money: GameState.money,
      franchises: GameState.franchises.map(f => ({
        id: f.id, P: f.P, D: f.D, B: f.B, tags: f.tags
        // name/description regenerated from seed
      })),
      inventory: GameState.inventory,
      history: GameState.history.slice(-20)  // Keep last 20 entries
    }
  };
  localStorage.setItem('doujin-sim-save', JSON.stringify(saveData));
}

function loadGame() {
  const raw = localStorage.getItem('doujin-sim-save');
  if (!raw) return false;
  
  const saveData = JSON.parse(raw);
  if (saveData.version < SAVE_VERSION) {
    migrateData(saveData);
  }
  
  Object.assign(GameState, saveData.state);
  regenerateFranchiseContent();  // Rebuild from seeds
  return true;
}
```

**Size Optimization**:
- Don't save generated content (titles, descriptions) - regenerate from seed
- Limit history array length
- Use short key names in save object
- Target: <100KB per save (well under 5MB limit)

### Alternatives Considered
- **IndexedDB**: Overkill for simple saves; rejected
- **Multiple keys**: Harder to manage; rejected
- **Compression**: Not needed at current scale; rejected

---

## Summary of Decisions

| Area | Decision | Key Benefit |
|------|----------|-------------|
| Content Generation | Template + Dictionary | Natural output, easy expansion |
| P×D×B Balancing | Weighted random with thresholds | Guaranteed archetype variety |
| Event System | Weighted pool with cooldowns | Feels dynamic but fair |
| Convention Sim | Agent-based with fatigue | Shows P vs D×B disconnect |
| JS Architecture | Module pattern + event bus | Clean single-file organization |
| Storage | Single versioned JSON | Simple, migratable |

All decisions comply with constitution principles (single-file, vanilla JS, no dependencies).
