# Contract: Event System

**Module**: `js/event-system.js`
**Date**: 2026-02-10

---

## Public Interface

### Functions

#### `initEventSystem()`
初始化事件系統，載入事件定義。

**Returns**: `void`

---

#### `getEventPool()`
取得所有可用的事件定義。

**Returns**: `RandomEvent[]`

---

#### `rollSessionEvents(round)`
為場次投擲事件，根據觸發條件和機率決定哪些事件發生。

**Parameters**:
- `round: number` - 目前回合數

**Returns**: `RandomEvent[]` - 本場次觸發的事件列表

**Logic**:
1. 過濾符合 `minRound`/`maxRound` 條件的事件
2. 對每個事件以其 `probability` 進行隨機判定
3. 處理互斥事件（`exclusive` 陣列）
4. 傳回觸發的事件列表

---

#### `applyEventEffects(events, salesData)`
套用事件效果到銷售計算資料。

**Parameters**:
- `events: RandomEvent[]` - 觸發的事件列表
- `salesData: SalesCalculationData` - 銷售計算中間資料

**Returns**: `SalesCalculationData` - 套用效果後的資料

**Effect Application Order**:
1. 先套用所有 `multiply` 效果
2. 再套用所有 `add` 效果
3. 最後套用 `set` 效果

---

#### `getEventNotification(event, affectedWorkTitle)`
產生事件通知內容，替換作品名稱。

**Parameters**:
- `event: RandomEvent` - 事件定義
- `affectedWorkTitle: string | null` - 受影響的作品名稱

**Returns**: `{ title: string, message: string, duration: number }`

**Example**:
```javascript
getEventNotification(netflixEvent, '異世界廚師的復仇');
// {
//   title: '📱 網紅推薦',
//   message: '知名網紅在社群推薦「異世界廚師的復仇」！銷量 +50%',
//   duration: 3000
// }
```

---

#### `selectRandomWork(works, scope)`
根據 scope 選擇受影響的作品。

**Parameters**:
- `works: Work[]` - 可選作品列表
- `scope: 'random_work' | 'specific_theme'` - 選擇方式

**Returns**: `Work | null`

---

### Events (DOM Custom Events)

#### `event:triggered`
當事件觸發時發出。

**Payload**:
```javascript
{
  event: RandomEvent,
  affectedWork: Work | null
}
```

---

#### `event:notification`
當需要顯示事件通知時發出。

**Payload**:
```javascript
{
  title: string,
  message: string,
  type: 'positive' | 'negative' | 'mixed',
  duration: number
}
```

---

## Event Definition Schema

存於 `content-templates.js` 中的 `EventPool`：

```javascript
const EventPool = [
  {
    id: "neg_001",
    name: "超大豪雨",
    description: "場外突然下起傾盆大雨，許多人決定待在家裡追劇",
    type: "negative",
    category: "weather",
    effects: [
      { 
        target: "visitor_count",
        modifier: "multiply",
        value: 0.6,
        scope: "all"
      }
    ],
    triggerConditions: {
      minRound: 1,
      maxRound: null,
      probability: 0.05,
      exclusive: []
    },
    notification: {
      title: "☔ 傾盆大雨",
      message: "場外突然下起傾盆大雨，許多人決定待在家裡追劇。來客數減少40%！",
      duration: 3000
    }
  },
  // ... 更多事件
];
```

---

## Adding New Events

1. 在 `content-templates.js` 的 `EventPool` 新增事件定義
2. 確保 `id` 唯一
3. 設定合理的 `probability`（建議單一事件 < 0.1）
4. 如有互斥關係，在雙方的 `exclusive` 陣列中互相引用
5. 事件效果 `target` 必須是已定義的可影響參數

---

## Effect Targets Reference

| Target | 說明 | 預設基準 |
|--------|------|----------|
| `visitor_count` | 來客數 | 場次基礎來客 |
| `stay_rate` | 停留/翻閱機率 | 作品基礎停留率 |
| `sales` | 銷量 | 計算銷量 |
| `revenue` | 收益 | 銷售收入 |
| `price` | 售價 | 作品定價 |
| `inventory` | 庫存 | 作品庫存 |
| `popularity` | 人氣 | 作品人氣值 |
| `budget` | 顧客預算 | 顧客類型預算 |
| `bad_customer_rate` | 奧客比例 | 場次奧客率 |
| `session_time` | 場次時間 | 100% |

---

## Integration with Sales Calculator

```javascript
// 使用範例
function calculateSessionSales() {
  // 1. 投擲事件
  const events = rollSessionEvents(gameState.round);
  gameState.sessionState.activeEvents = events;
  
  // 2. 初始化銷售資料
  let salesData = initSalesCalculation();
  
  // 3. 套用事件效果
  salesData = applyEventEffects(events, salesData);
  
  // 4. 繼續其他計算...
}
```
