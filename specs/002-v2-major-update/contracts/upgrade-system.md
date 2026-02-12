# Contract: Upgrade System

**Module**: `js/upgrade-system.js`
**Date**: 2026-02-10

---

## Public Interface

### Functions

#### `initUpgradeSystem()`
初始化升級系統，確保 gameState.circle.upgrades 存在。

**Returns**: `void`

---

#### `getUpgradeDefinitions()`
取得所有升級項目的定義。

**Returns**: `UpgradeDefinition[]`

**Example**:
```javascript
const upgrades = getUpgradeDefinitions();
// [{ id: 'helper', name: '培訓小幫手', maxLevel: 5, costs: [1000, 2500, ...], ... }, ...]
```

---

#### `getUpgradeLevel(upgradeId)`
取得指定升級項目的目前等級。

**Parameters**:
- `upgradeId: string` - 升級項目 ID

**Returns**: `number`

---

#### `getUpgradeCost(upgradeId)`
取得指定升級項目升至下一級的費用。

**Parameters**:
- `upgradeId: string` - 升級項目 ID

**Returns**: `number | null` (null = 已達最高等級)

---

#### `canAffordUpgrade(upgradeId)`
檢查玩家是否有足夠資金升級。

**Parameters**:
- `upgradeId: string` - 升級項目 ID

**Returns**: `boolean`

---

#### `purchaseUpgrade(upgradeId)`
購買升級。

**Parameters**:
- `upgradeId: string` - 升級項目 ID

**Returns**: `{ success: boolean, message: string }`

**Side Effects**:
- 扣除 `gameState.money`
- 增加 `gameState.circle.upgrades[upgradeId]`
- 觸發 UI 更新事件

**Error Cases**:
- 資金不足: `{ success: false, message: '資金不足' }`
- 已達上限: `{ success: false, message: '已達最高等級' }`
- 無效 ID: `{ success: false, message: '無效的升級項目' }`

---

#### `getUpgradeEffect(upgradeId)`
計算指定升級項目在目前等級的效果。

**Parameters**:
- `upgradeId: string` - 升級項目 ID

**Returns**: `UpgradeEffect`

**Example**:
```javascript
getUpgradeEffect('helper');
// { maxSalesBonus: 150 } (等級3時)

getUpgradeEffect('social');
// { salesMultiplier: 1.12 } (等級3時)
```

---

### Events

#### `upgrade:purchased`
當升級購買成功時觸發。

**Payload**:
```javascript
{
  upgradeId: string,
  newLevel: number,
  cost: number
}
```

---

#### `upgrade:maxReached`
當升級達到最高等級時觸發。

**Payload**:
```javascript
{
  upgradeId: string,
  maxLevel: number
}
```

---

## UI Integration

### 升級項目列表元素
```html
<div class="upgrade-item" data-upgrade-id="helper">
  <div class="upgrade-name">培訓小幫手</div>
  <div class="upgrade-level">Lv. 2 / 5</div>
  <div class="upgrade-effect">最大銷售量 +100</div>
  <div class="upgrade-cost">升級費用: $5,000</div>
  <button class="upgrade-btn">升級</button>
</div>
```

### CSS Classes
- `.upgrade-item` - 單一升級項目容器
- `.upgrade-item.max-level` - 已達最高等級狀態
- `.upgrade-item.can-afford` - 有足夠資金升級
- `.upgrade-item.cannot-afford` - 資金不足

---

## Data Dependency

依賴 `BalanceConfig` 中的以下常數：
- `UPGRADE_DEFINITIONS` - 升級定義
- `UPGRADE_COSTS` - 費用曲線
- `UPGRADE_EFFECTS` - 效果數值
