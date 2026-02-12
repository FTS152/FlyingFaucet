# Data Model: V2 Major Update

**Branch**: `002-v2-major-update` | **Date**: 2026-02-10

---

## Entity Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   GameState     │────▶│    Circle       │────▶│ CircleUpgrades  │
│  (遊戲狀態)      │     │   (社團)        │     │  (社團升級)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │
         │                      ▼
         │              ┌─────────────────┐
         │              │     Work        │◀──── coverLevel, paperLevel
         │              │    (作品)        │      decayRate (NEW)
         │              └─────────────────┘
         │                      │
         ▼                      ▼
┌─────────────────┐     ┌─────────────────┐
│  SessionState   │     │   SalesRecord   │
│  (場次狀態)      │     │  (銷售紀錄)     │
└─────────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  RandomEvent    │     │  CustomerType   │
│  (隨機事件)      │     │  (顧客類型)     │
└─────────────────┘     └─────────────────┘
```

---

## Core Entities

### 1. GameState (遊戲狀態)

主遊戲狀態容器，包含所有持久化資料。

| 欄位 | 類型 | 說明 |
|------|------|------|
| money | number | 目前資金 |
| round | number | 目前回合數 |
| works | Work[] | 所有作品列表 |
| circle | Circle | 社團資料 |
| sessionState | SessionState \| null | 進行中的場次狀態 |
| devMode | boolean | 開發者模式開關 |
| debt | number | 目前負債金額 (NEW) |
| marketUnderstanding | number | 市場了解度 0~1 (NEW) |

**Validation Rules**:
- `money + debt >= 0` 或遊戲結束
- `round >= 1`
- `devMode` 預設 `false`

---

### 2. Circle (社團)

玩家經營的同人社團。

| 欄位 | 類型 | 說明 |
|------|------|------|
| name | string | 社團名稱 |
| reputation | number | 社團知名度 0~100 |
| upgrades | CircleUpgrades | 社團升級狀態 |

---

### 3. CircleUpgrades (社團升級) **NEW**

所有可升級項目的等級。

| 欄位 | 類型 | 範圍 | 說明 |
|------|------|------|------|
| helper | number | 0-5 | 培訓小幫手 |
| coser | number | 0-3 | 僱傭Coser小幫手 |
| adobe | number | 0-3 | Adobe排版課程 |
| storage | number | 0-5 | 老家倉儲 |
| friends | number | 0-3 | 親友團 |
| social | number | 0-5 | 社群經營 |
| investor | number | 0-3 | 天使投資人 |
| stock | number | 0-3 | 股市投資 |
| writing | number | 0-∞ | 提升文筆 |

---

### 4. UpgradeDefinition (升級定義) **NEW**

升級項目的靜態定義（存於 balance-config.js）。

| 欄位 | 類型 | 說明 |
|------|------|------|
| id | string | 升級項目 ID |
| name | string | 顯示名稱 |
| description | string | 效果說明 |
| maxLevel | number \| null | 等級上限 (null = 無上限) |
| costs | number[] | 各等級升級費用 |
| effects | UpgradeEffect[] | 各等級效果定義 |

---

### 5. Work (作品)

玩家創作的刊物。

| 欄位 | 類型 | 說明 |
|------|------|------|
| id | string | 作品唯一識別碼 |
| title | string | 作品標題 |
| franchise | string | 所屬作品/IP |
| theme | string | 題材類型 |
| popularity | number | 人氣值 0~100 |
| inventory | number | 目前庫存 |
| price | number | 售價 |
| isR18 | boolean | 是否為 R18 內容 |
| coverLevel | CoverLevel | 封面等級 (NEW) |
| paperLevel | PaperLevel | 紙質等級 (NEW) |
| decayRate | DecayRate | 衰退度 (NEW) |
| isRetired | boolean | 是否已停產 (NEW) |
| retiredPopularity | number \| null | 停產時固定人氣 (NEW) |

**Validation Rules**:
- `popularity` 範圍 0~100
- `inventory >= 0`
- `price` 範圍依 balance-config.js 設定
- 若 `isRetired === true`，`popularity` 固定為 `retiredPopularity`

---

### 6. CoverLevel (封面等級) **NEW**

```typescript
enum CoverLevel {
  FREE = 'free',       // 免費自製
  BASIC = 'basic',     // 基礎 $500
  REFINED = 'refined', // 精緻 $2000
  PREMIUM = 'premium'  // 頂級 $10000
}
```

| 等級 | 成本 | 吸引力修正 |
|------|------|------------|
| FREE | $0 | -20% |
| BASIC | $500 | +0% |
| REFINED | $2,000 | +25% |
| PREMIUM | $10,000 | +50% |

---

### 7. PaperLevel (紙質等級) **NEW**

```typescript
enum PaperLevel {
  ECONOMY = 'economy',   // 經濟
  STANDARD = 'standard', // 標準
  QUALITY = 'quality',   // 優質
  LUXURY = 'luxury'      // 豪華
}
```

| 等級 | 成本修正 | 吸引力修正 |
|------|----------|------------|
| ECONOMY | -30% | -20% |
| STANDARD | +0% | +0% |
| QUALITY | +40% | +20% |
| LUXURY | +100% | +50% |

---

### 8. DecayRate (衰退度) **NEW**

```typescript
enum DecayRate {
  TRENDING = 'trending',   // 時事熱門 (高衰退)
  NORMAL = 'normal',       // 一般作品
  EVERGREEN = 'evergreen'  // 經典長青 (低衰退)
}
```

| 類型 | 每輪人氣衰減 |
|------|--------------|
| TRENDING | 15-20% |
| NORMAL | 5-10% |
| EVERGREEN | 1-3% |

---

### 9. RandomEvent (隨機事件) **NEW**

場次中發生的隨機事件。

| 欄位 | 類型 | 說明 |
|------|------|------|
| id | string | 事件唯一識別碼 |
| name | string | 事件名稱 |
| description | string | 事件描述 |
| type | 'positive' \| 'negative' \| 'mixed' | 事件類型 |
| category | EventCategory | 事件分類 |
| effects | EventEffect[] | 事件效果列表 |
| triggerConditions | TriggerConditions | 觸發條件 |
| notification | EventNotification | 通知內容 |

---

### 10. EventEffect (事件效果) **NEW**

| 欄位 | 類型 | 說明 |
|------|------|------|
| target | EffectTarget | 影響的參數 |
| modifier | 'add' \| 'multiply' \| 'set' | 修改方式 |
| value | number | 修改值 |
| scope | 'all' \| 'specific_work' \| 'random_work' \| 'specific_theme' | 影響範圍 |
| workId | string \| null | 指定作品 ID (scope = specific_work 時) |
| theme | string \| null | 指定題材 (scope = specific_theme 時) |

**EffectTarget 可選值**:
- `visitor_count` - 來客數
- `stay_rate` - 停留機率
- `sales` - 銷量
- `revenue` - 收益
- `price` - 售價
- `inventory` - 庫存
- `popularity` - 人氣
- `budget` - 顧客預算
- `bad_customer_rate` - 奧客比例

---

### 11. SessionState (場次狀態)

進行中場次的狀態。

| 欄位 | 類型 | 說明 |
|------|------|------|
| isActive | boolean | 場次是否進行中 |
| activeEvents | RandomEvent[] | 本場次觸發的事件 (NEW) |
| salesRecords | SalesRecord[] | 銷售紀錄 |
| totalVisitors | number | 總來客數 |
| maxSalesReached | boolean | 是否觸發銷售上限 (NEW) |
| lostSales | number | 因上限損失的潛在銷量 (NEW) |

---

### 12. SalesRecord (銷售紀錄)

單一作品的銷售結果。

| 欄位 | 類型 | 說明 |
|------|------|------|
| workId | string | 作品 ID |
| workTitle | string | 作品標題 |
| quantity | number | 銷售數量 |
| unitPrice | number | 單價 |
| revenue | number | 收益 |
| affectedBy | string[] | 影響此作品的事件 ID (NEW) |

---

### 13. CustomerType (顧客類型)

顧客分類與係數定義。

| 欄位 | 類型 | 說明 |
|------|------|------|
| id | string | 類型 ID |
| name | string | 顯示名稱 |
| coverSensitivity | number | 封面敏感度係數 |
| paperSensitivity | number | 紙質敏感度係數 |
| priceThreshold | number | 價格心理閾值 |
| r18Preference | number | R18 偏好係數 |

---

### 14. DevLog (開發者日誌) **NEW**

開發者模式的日誌項目。

| 欄位 | 類型 | 說明 |
|------|------|------|
| timestamp | number | 時間戳記 |
| category | 'SALES' \| 'EVENT' \| 'UPGRADE' \| 'STATE' \| 'CALC' | 日誌分類 |
| message | string | 日誌訊息 |
| data | object \| null | 附加資料 |

---

## State Transitions

### 作品生命週期

```
Created → Active → Retired
              ↓
         Sold Out (庫存=0，但非停產)
```

### 場次流程

```
準備階段 → 場次開始 → 事件觸發 → 銷售計算 → 結算 → 社團管理
                                                      ↓
                                              升級 / 庫存管理
                                                      ↓
                                              下一輪準備階段
```

### 遊戲結束觸發

```
資金變動 → 檢查 (money + debt < 0) → 遊戲結束畫面
```

---

## Computed Values (計算屬性)

### 最大銷售量
```javascript
maxSales = BASE_MAX_SALES + (upgrades.helper * SALES_PER_LEVEL)
```

### 倉儲成本
```javascript
storageCost = totalInventory * STORAGE_COST_PER_BOOK * (1 - upgrades.storage * 0.15)
```

### 銷量乘數 (社群經營)
```javascript
salesMultiplier = [1.0, 1.05, 1.08, 1.12, 1.18, 1.25][upgrades.social]
```

### 投資收益 (股市投資)
```javascript
interest = money * [0, 0.03, 0.05, 0.08][upgrades.stock]
```

### 舉債額度 (天使投資人)
```javascript
debtLimit = [0, 10000, 30000, 80000][upgrades.investor]
```
