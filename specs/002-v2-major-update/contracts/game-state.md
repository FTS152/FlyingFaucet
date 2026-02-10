# Contract: Game State

**Module**: Core state management (in `doujin-sim.html` or future extraction)
**Date**: 2026-02-10

---

## Game State Object

### Full Schema

```javascript
const gameState = {
  // === 核心資料 ===
  money: number,              // 目前資金
  round: number,              // 目前回合數
  actionPoints: number,       // 剩餘行動點數
  
  // === 社團資料 ===
  circle: {
    name: string,             // 社團名稱
    reputation: number,       // 知名度 0-100
    upgrades: {
      helper: number,         // 培訓小幫手 0-5
      coser: number,          // Coser小幫手 0-3
      adobe: number,          // Adobe課程 0-3
      storage: number,        // 老家倉儲 0-5
      friends: number,        // 親友團 0-3
      social: number,         // 社群經營 0-5
      investor: number,       // 天使投資人 0-3
      stock: number,          // 股市投資 0-3
      writing: number         // 提升文筆 0-∞
    }
  },
  
  // === 作品資料 ===
  works: Work[],              // 所有作品列表
  
  // === 財務狀態 (NEW) ===
  debt: number,               // 目前負債
  
  // === 場次狀態 (NEW) ===
  sessionState: {
    isActive: boolean,
    activeEvents: RandomEvent[],
    salesRecords: SalesRecord[],
    totalVisitors: number,
    maxSalesReached: boolean,
    lostSales: number
  } | null,
  
  // === 市場資料 (NEW) ===
  marketUnderstanding: number, // 市場了解度 0-1
  
  // === 系統設定 (NEW) ===
  devMode: boolean            // 開發者模式
};
```

---

## Public Interface

### State Access

#### `getGameState()`
取得完整遊戲狀態（唯讀快照）。

**Returns**: `Readonly<GameState>`

---

#### `getMoney()`
取得目前資金。

**Returns**: `number`

---

#### `getDebt()`
取得目前負債。

**Returns**: `number`

---

#### `getNetWorth()`
取得淨資產（資金 - 負債）。

**Returns**: `number`

---

#### `getMaxSales()`
根據小幫手升級計算最大銷售量。

**Returns**: `number`

---

#### `getStorageCost()`
根據庫存和倉儲升級計算倉儲成本。

**Returns**: `number`

---

### State Mutation

#### `adjustMoney(amount, reason)`
調整資金並記錄原因。

**Parameters**:
- `amount: number` - 調整金額（正/負）
- `reason: string` - 調整原因

**Returns**: `{ newBalance: number, isGameOver: boolean }`

**Side Effects**:
- 更新 `gameState.money`
- 如果 `money < 0 && debt === 0`，觸發遊戲結束檢查
- 發出 `state:moneyChanged` 事件

---

#### `takeLoan(amount)`
從天使投資人借款。

**Parameters**:
- `amount: number` - 借款金額

**Returns**: `{ success: boolean, message: string }`

**Validation**:
- 檢查 `circle.upgrades.investor > 0`
- 檢查 `debt + amount <= debtLimit`

---

#### `repayLoan(amount)`
償還負債。

**Parameters**:
- `amount: number` - 還款金額

**Returns**: `{ success: boolean, remainingDebt: number }`

---

#### `setDevMode(enabled)`
切換開發者模式。

**Parameters**:
- `enabled: boolean`

**Returns**: `void`

---

### Work Management

#### `addWork(work)`
新增作品到列表。

**Parameters**:
- `work: Work`

**Returns**: `void`

---

#### `retireWork(workId)`
將作品設為停產狀態。

**Parameters**:
- `workId: string`

**Returns**: `{ success: boolean }`

**Side Effects**:
- 設定 `work.isRetired = true`
- 設定 `work.retiredPopularity = work.popularity`
- 清除庫存

---

#### `updateWorkPopularity(workId, delta)`
更新作品人氣（用於衰退計算）。

**Parameters**:
- `workId: string`
- `delta: number` - 變化量

**Returns**: `number` - 新人氣值

---

### Session Management

#### `startSession()`
開始新場次。

**Returns**: `void`

**Side Effects**:
- 設定 `sessionState.isActive = true`
- 初始化場次資料
- 觸發事件投擲

---

#### `endSession()`
結束場次，進行結算。

**Returns**: `SessionResult`

**Side Effects**:
- 計算銷售
- 扣除倉儲成本
- 計算投資收益
- 檢查遊戲結束條件
- 觸發人氣衰退

---

---

## Events (DOM Custom Events)

#### `state:moneyChanged`
資金變動時觸發。

**Payload**:
```javascript
{
  oldValue: number,
  newValue: number,
  reason: string
}
```

---

#### `state:debtChanged`
負債變動時觸發。

**Payload**:
```javascript
{
  oldValue: number,
  newValue: number,
  action: 'loan' | 'repay'
}
```

---

#### `state:gameOver`
遊戲結束時觸發。

**Payload**:
```javascript
{
  reason: 'debt' | 'bankruptcy',
  finalStats: {
    rounds: number,
    worksCreated: number,
    maxMoney: number
  }
}
```

---

#### `state:workRetired`
作品停產時觸發。

**Payload**:
```javascript
{
  workId: string,
  workTitle: string,
  finalPopularity: number
}
```

---

## Persistence

### Save Format

```javascript
// localStorage key: 'doujinSimSave_v2'
const saveData = {
  version: 2,
  timestamp: number,
  gameState: GameState
};
```

### Migration

```javascript
function migrateFromV1(v1Save) {
  return {
    ...v1Save,
    version: 2,
    gameState: {
      ...v1Save.gameState,
      debt: 0,
      marketUnderstanding: 0.3,
      devMode: false,
      circle: {
        ...v1Save.gameState.circle,
        upgrades: {
          helper: 0, coser: 0, adobe: 0,
          storage: 0, friends: 0, social: 0,
          investor: 0, stock: 0, writing: 0
        }
      },
      works: v1Save.gameState.works.map(w => ({
        ...w,
        coverLevel: 'basic',
        paperLevel: 'standard',
        decayRate: 'normal',
        isRetired: false,
        retiredPopularity: null
      }))
    }
  };
}
```

---

## Validation Rules

1. `money` 可以暫時為負（有 debt 時），但 endSession 時若 `money < 0 && debt > 0`，觸發遊戲結束
2. `debt` 最大值受 `investor` 等級限制
3. `popularity` 永遠在 0-100 範圍內
4. `isRetired` 為 true 的作品，其 `popularity` 固定為 `retiredPopularity`
