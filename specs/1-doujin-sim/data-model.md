# Data Model: Doujin Circle Management Simulator

**Branch**: `1-doujin-sim` | **Date**: 2026-02-09 | **Plan**: [plan.md](plan.md)

## Overview

All data structures are plain JavaScript objects stored in memory. Persistence uses JSON serialization to localStorage. No external database or ORM.

---

## Core Entities

### GameState (Root Object)

The single source of truth for all game data.

```javascript
/**
 * @typedef {Object} GameState
 * @property {number} round - Current round number (1-based)
 * @property {number} money - Player's current balance in dollars
 * @property {number} ap - Action Points remaining this round (0-5)
 * @property {number} maxAp - Maximum AP per round (default: 5)
 * @property {string} phase - Current game phase
 * @property {Franchise[]} franchises - All active franchises in the game
 * @property {DraftProgress[]} drafts - Player's draft progress per franchise
 * @property {Publication[]} publications - Completed publications
 * @property {InventoryEntry[]} inventory - Unsold stock
 * @property {SalesRecord[]} history - Historical sales records
 * @property {DynamicEvent[]} eventLog - Events that have occurred
 * @property {Object} eventCooldowns - Cooldown tracking for event types
 * @property {number} seed - Random seed for reproducible generation
 */

const GameState = {
  round: 1,
  money: 10000,
  ap: 5,
  maxAp: 5,
  phase: 'OBSERVATION',  // OBSERVATION | ACTION | PREP | CONVENTION | RESULTS
  franchises: [],
  drafts: [],
  publications: [],
  inventory: [],
  history: [],
  eventLog: [],
  eventCooldowns: {},
  seed: Date.now()
};
```

---

### Franchise

Represents a fictional media property (anime/game/manga) in the game world.

```javascript
/**
 * @typedef {Object} Franchise
 * @property {string} id - Unique identifier (e.g., "franchise_001")
 * @property {number} seed - Seed for reproducible name/description generation
 * @property {string} name - Generated title (Japanese or Chinese)
 * @property {string} description - Generated synopsis (Chinese, 2-4 sentences)
 * @property {string[]} tags - 3-4 gameplay-affecting tags
 * @property {number} popularity - P value: 1-100, determines social visibility
 * @property {number} audienceDensity - D value: 0.1-1.0, core fan concentration
 * @property {number} purchasingPower - B value: 0.5-2.0, spending willingness
 * @property {number} audienceActivity - 0.1-1.0, ratio of fans who post
 * @property {string} contentPreference - "R18_FRIENDLY" | "ALL_AGES" | "MIXED"
 * @property {boolean} seasonal - Currently trending due to new release
 * @property {string} archetype - Derived from P×D×B thresholds
 */

// Example instance
const exampleFranchise = {
  id: 'franchise_001',
  seed: 12345,
  name: '異世界迷宮のカフェテリア',
  description: '在魔王城地下三層，「勇者特餐」是唯一的慰藉。原本只是個普通廚師的主角，意外成為魔王的專屬料理人。',
  tags: ['超展開', '日常系', 'R18友好'],
  popularity: 75,          // P: High
  audienceDensity: 0.35,   // D: Low
  purchasingPower: 0.7,    // B: Low
  audienceActivity: 0.8,
  contentPreference: 'R18_FRIENDLY',
  seasonal: true,
  archetype: 'AIR_STOCK'   // High P, Low D, Low B = trap!
};

// Archetype enum values
const ARCHETYPES = {
  BLUE_CHIP: 'BLUE_CHIP',       // High P, High D, High B
  VOLUME_PLAY: 'VOLUME_PLAY',   // High P, High D, Low B
  WHALE_FISHING: 'WHALE_FISHING', // High P, Low D, High B
  AIR_STOCK: 'AIR_STOCK',       // High P, Low D, Low B ★
  HIDDEN_GEM: 'HIDDEN_GEM',     // Low P, High D, High B
  STEADY_CIRCLE: 'STEADY_CIRCLE', // Low P, High D, Low B
  NICHE_LUXURY: 'NICHE_LUXURY', // Low P, Low D, High B
  DEAD_ZONE: 'DEAD_ZONE'        // Low P, Low D, Low B
};
```

---

### DraftProgress

Tracks player's investment in creating content for a franchise.

```javascript
/**
 * @typedef {Object} DraftProgress
 * @property {string} franchiseId - Reference to franchise
 * @property {number} stockCount - Completed drafts ready for production
 * @property {number} essenceLevel - Content understanding (0-10)
 * @property {number} audienceLevel - Market research depth (0-10)
 */

const exampleDraft = {
  franchiseId: 'franchise_001',
  stockCount: 2,
  essenceLevel: 6,
  audienceLevel: 3
};
```

---

### Publication

A completed fan work ready for sale.

```javascript
/**
 * @typedef {Object} Publication
 * @property {string} id - Unique identifier
 * @property {string} franchiseId - Source franchise reference
 * @property {string} title - Publication title
 * @property {number} printQuantity - Total copies printed
 * @property {number} retailPrice - Price per copy in dollars
 * @property {number} productionCost - Total cost to produce
 * @property {number} coverQuality - 0-1, affects browse attraction
 * @property {number} essenceSnapshot - Essence level at time of creation
 * @property {number} createdRound - Round when published
 */

const examplePublication = {
  id: 'pub_001',
  franchiseId: 'franchise_001',
  title: '異世界カフェ アンソロジー Vol.1',
  printQuantity: 100,
  retailPrice: 500,           // $500 per book
  productionCost: 15000,      // $150 per book × 100
  coverQuality: 0.75,
  essenceSnapshot: 6,
  createdRound: 1
};
```

---

### InventoryEntry

Tracks unsold stock and storage costs.

```javascript
/**
 * @typedef {Object} InventoryEntry
 * @property {string} publicationId - Reference to publication
 * @property {number} remainingCount - Unsold copies
 * @property {number} accumulatedStorageCost - Total storage fees paid
 */

const exampleInventory = {
  publicationId: 'pub_001',
  remainingCount: 45,
  accumulatedStorageCost: 45  // $1 per book per round
};
```

---

### SalesRecord

Historical record of convention performance.

```javascript
/**
 * @typedef {Object} SalesRecord
 * @property {number} round - Round number
 * @property {number} totalRevenue - Gross sales in dollars
 * @property {number} unitsSold - Total copies sold
 * @property {number} expenses - Production + storage costs
 * @property {number} profit - Revenue - expenses
 * @property {string[]} notableEvents - Highlights (e.g., "sellout", "flop")
 * @property {Object[]} breakdown - Per-publication sales detail
 */

const exampleSalesRecord = {
  round: 1,
  totalRevenue: 27500,
  unitsSold: 55,
  expenses: 15045,
  profit: 12455,
  notableEvents: ['first_convention'],
  breakdown: [
    { publicationId: 'pub_001', sold: 55, revenue: 27500 }
  ]
};
```

---

### SocialMediaPost

Generated social media content for observation phase.

```javascript
/**
 * @typedef {Object} SocialMediaPost
 * @property {string} id - Unique identifier
 * @property {string} username - Generated user handle
 * @property {string} franchiseId - Referenced franchise
 * @property {string} content - Generated post text
 * @property {string} fanType - One of 8 fan types
 * @property {string} timestamp - Relative time display
 * @property {Object} metadata - Generation details for debugging
 */

// Fan type enum
const FAN_TYPES = {
  ENTHUSIAST: 'ENTHUSIAST',     // 熱情粉
  CASUAL: 'CASUAL',             // 路人粉
  CRITIC: 'CRITIC',             // 批評者
  MEMER: 'MEMER',               // 迷因人
  LURKER: 'LURKER',             // 潛水者
  WHALE: 'WHALE',               // 課金大佬
  COLLECTOR: 'COLLECTOR',       // 收藏家
  HATER: 'HATER'                // 黑粉
};

const examplePost = {
  id: 'post_001',
  username: '異世界廚師推',
  franchiseId: 'franchise_001',
  content: '異世界カフェ第三集神回！魔王殿下吃到流淚那段我也哭了QQ',
  fanType: 'ENTHUSIAST',
  timestamp: '3m',
  metadata: {
    templateId: 'enthusiast_emotional_01',
    seed: 54321
  }
};
```

---

### ConventionAttendee

Simulation agent for convention phase.

```javascript
/**
 * @typedef {Object} ConventionAttendee
 * @property {string} id - Unique identifier
 * @property {number} budget - Total spending money ($1500-5000)
 * @property {string[]} targetList - Prioritized publication IDs to buy
 * @property {number} browseTendency - 0-1, likelihood of random browsing
 * @property {number} priceSensitivity - 0.5-2.0, price impact multiplier
 * @property {number} fatigue - Accumulated tiredness (affects purchases)
 * @property {Object[]} purchasedItems - Items bought this convention
 * @property {Object} franchiseAffinities - Per-franchise interest levels
 */

const exampleAttendee = {
  id: 'attendee_001',
  budget: 3500,
  targetList: ['pub_001', 'pub_003'],
  browseTendency: 0.6,
  priceSensitivity: 1.2,
  fatigue: 0,
  purchasedItems: [],
  franchiseAffinities: {
    'franchise_001': 0.8,
    'franchise_002': 0.3
  }
};
```

---

### DynamicEvent

Market-changing event that occurs during action phase.

```javascript
/**
 * @typedef {Object} DynamicEvent
 * @property {string} id - Unique event instance ID
 * @property {string} eventTypeId - Reference to event type in pool
 * @property {string} category - "OFFICIAL" | "SOCIAL" | "CONSUMPTION" | "REALITY"
 * @property {string} displayName - Localized name (e.g., "神回/超展開封神")
 * @property {string} flavorText - Satirical description text
 * @property {string[]} affectedFranchises - Franchise IDs impacted
 * @property {Object} attributeChanges - { popularity, density, purchasingPower }
 * @property {Object} tagChanges - { add: [], remove: [], shift: {} }
 * @property {number} occurredOnRound - Round when triggered
 * @property {number} occurredOnAp - AP count when triggered
 */

const exampleEvent = {
  id: 'event_instance_001',
  eventTypeId: 'godlike_episode',
  category: 'OFFICIAL',
  displayName: '神回/超展開封神',
  flavorText: '【異世界カフェ】第三集封神！網路上都在吃「魔王殿下的眼淚」這什麼神仙操作...',
  affectedFranchises: ['franchise_001'],
  attributeChanges: {
    popularity: +15,
    density: +0.1,
    purchasingPower: +0.2
  },
  tagChanges: {
    add: ['超展開', '名場面', '燃'],
    remove: [],
    shift: null
  },
  occurredOnRound: 1,
  occurredOnAp: 3
};
```

---

### EventType (Template)

Definition for event types in the event pool.

```javascript
/**
 * @typedef {Object} EventType
 * @property {string} id - Unique event type identifier
 * @property {string} category - Event category
 * @property {string} displayName - Display name (Chinese)
 * @property {string} flavorTemplate - Template with 【franchise】 placeholder
 * @property {number} weight - Selection probability weight
 * @property {number} cooldown - Rounds before can repeat
 * @property {Object} effects - Attribute impact ranges
 * @property {Object} tagEffects - Tag modification rules
 * @property {string[]} chainEvents - Possible follow-up event IDs
 * @property {Object} triggerConditions - Tag/attribute conditions
 */

const exampleEventType = {
  id: 'godlike_episode',
  category: 'OFFICIAL',
  displayName: '神回/超展開封神',
  flavorTemplate: '【franchise】第【episode】集封神！網路上都在吃「【highlight】」這什麼神仙操作...',
  weight: 0.1,
  cooldown: 3,
  effects: {
    popularity: { min: 10, max: 20 },
    density: { min: 0.05, max: 0.15 },
    purchasingPower: { min: 0.1, max: 0.3 }
  },
  tagEffects: {
    add: ['超展開', '名場面'],
    remove: [],
    shift: null
  },
  chainEvents: ['viral_meme', 'merchandise_rush'],
  triggerConditions: {
    minPopularity: 30,
    requiredTags: [],
    excludeTags: ['爛尾']
  }
};
```

---

## Content Generation Resources

### TitleTemplates

```javascript
/**
 * @typedef {Object} TitleTemplates
 * @property {Object} japanese - Japanese title templates by category
 * @property {Object} chinese - Chinese title templates by category
 */

const TitleTemplates = {
  japanese: {
    A: [
      '【place】の【role】【event】記',
      '【adj】【noun】は【verb】ない',
      'Re:【event】から始める【noun】生活'
    ],
    B: [
      '【noun】【verb】！',
      '【exclaim】！【adj】【noun】',
      '【role】と【role】'
    ],
    // ... more categories
  },
  chinese: {
    A: [
      '【place】的【role】【event】錄',
      '關於【role】【verb】這件事',
      '當【role】決定【event】時'
    ],
    // ... more categories
  }
};
```

---

### Dictionary

```javascript
/**
 * @typedef {Object} Dictionary
 * Organized word pools for template slot filling
 */

const Dictionary = {
  place: ['異世界', '學園', '魔王城', '迷宮', '咖啡廳', '宇宙船'],
  role: ['勇者', '魔王', '廚師', '偵探', '學生會長', '妹妹'],
  event: ['冒險', '戀愛', '復仇', '料理對決', '學園祭'],
  adj: ['最強', '無敵', '悲劇的', '爆笑', '甜蜜'],
  noun: ['劍', '魔法', '戀情', '友情', '背叛'],
  verb: ['戰鬥', '告白', '逃跑', '覺醒', '轉生'],
  exclaim: ['震驚', '感動', '絕望', '希望'],
  // Meme/slang for specific fan types
  meme: ['草', 'www', '神回', '爛到好笑', '這什麼', '太香了'],
  // ... more categories
};
```

---

### PostTemplates

```javascript
/**
 * Post templates by fan type
 */

const PostTemplates = {
  ENTHUSIAST: [
    '【franchise】的【episode】真的太神了！【highlight】讓我哭了...',
    '天啊【franchise】也太好看了吧！！！【character】我老婆！！',
    '剛看完【franchise】，心情久久不能平復QQ 【highlight】那段真的絕了'
  ],
  CASUAL: [
    '看了一下【franchise】，還行吧。',
    '【franchise】好像很紅？有空來補一下',
    '朋友推【franchise】但我還沒開始看'
  ],
  CRITIC: [
    '【franchise】的【element】有問題，【criticism】很明顯啊。',
    '說真的【franchise】被過譽了，【criticism】',
    '【franchise】第【episode】集開始崩了吧？【criticism】'
  ],
  MEMER: [
    '【franchise】：【character】做【action】→ 觀眾：？？？ www',
    '【franchise】的【meme_moment】已經變成梗圖了wwww',
    '每次看【franchise】都在笑 草'
  ],
  // ... more fan types
};
```

---

## Relationships

```
GameState
├── franchises[] ──────┬──> Franchise
│                      │
├── drafts[] ──────────┼──> DraftProgress ─── franchiseId ─┘
│                      │
├── publications[] ────┼──> Publication ────── franchiseId ─┘
│                      │
├── inventory[] ───────┼──> InventoryEntry ── publicationId ──> Publication
│                      │
├── history[] ─────────┼──> SalesRecord
│                      │
└── eventLog[] ────────┴──> DynamicEvent ──── affectedFranchises[] ──> Franchise

ConventionAttendee (transient, not persisted)
├── targetList[] ──────────> Publication
└── franchiseAffinities{} ──> Franchise

SocialMediaPost (transient, regenerated each observation)
└── franchiseId ───────────> Franchise
```

---

## Persistence Notes

**Saved to localStorage**:
- GameState (excluding transient data)
- Franchise seeds (names/descriptions regenerated)
- All player progress (drafts, publications, inventory)
- Limited history (last 20 entries)
- Event log (for continuity)

**Not saved (regenerated)**:
- Franchise names/descriptions (from seed)
- Social media posts (regenerated each observation)
- Convention attendees (generated per convention)

**Storage format**: Single JSON object with version number for migration support.
