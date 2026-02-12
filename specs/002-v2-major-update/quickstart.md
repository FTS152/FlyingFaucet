# Quickstart: V2 Major Update Development Guide

**Branch**: `002-v2-major-update` | **Date**: 2026-02-10

---

## 開發環境設置

### 必要條件
- 現代瀏覽器 (Chrome/Firefox/Edge/Safari 最新兩個版本)
- 文字編輯器 (VS Code 建議)
- Git

### 開始開發
```bash
# 1. 切換到功能分支
git checkout 002-v2-major-update

# 2. 直接用瀏覽器開啟主檔案
# Windows
start doujin-sim.html
# macOS
open doujin-sim.html
# Linux
xdg-open doujin-sim.html

# 3. 開啟 DevTools Console (F12) 進行除錯
```

---

## 專案結構總覽

```
flyingFaucet/
├── doujin-sim.html        # 主程式 (HTML + CSS + 核心 JS)
├── balance-config.js      # 遊戲平衡參數
├── content-templates.js   # 內容模板與詞彙
│
├── js/                    # V2 新增模組 (待建立)
│   ├── upgrade-system.js
│   ├── event-system.js
│   ├── dev-logger.js
│   ├── inventory-manager.js
│   ├── game-over.js
│   └── sales-calculator.js
│
└── specs/002-v2-major-update/
    ├── spec.md            # 規格文件
    ├── plan.md            # 實作計劃
    ├── research.md        # 技術決策
    ├── data-model.md      # 資料結構
    ├── quickstart.md      # 本文件
    └── contracts/         # API 契約
```

---

## 快速上手各系統

### 1. 社團升級系統

**相關檔案**: `js/upgrade-system.js`, `balance-config.js`

**新增升級項目步驟**:
1. 在 `balance-config.js` 新增定義：
```javascript
UPGRADE_DEFINITIONS: {
  // ...現有定義
  newUpgrade: {
    name: '新升級名稱',
    description: '效果說明',
    maxLevel: 3,
    costs: [1000, 3000, 8000],
    effects: [
      { type: 'bonus', value: 10 },
      { type: 'bonus', value: 25 },
      { type: 'bonus', value: 50 }
    ]
  }
}
```

2. 在 `gameState.circle.upgrades` 新增對應欄位
3. 在 `upgrade-system.js` 的 `getUpgradeEffect()` 新增效果計算

---

### 2. 隨機事件系統

**相關檔案**: `js/event-system.js`, `content-templates.js`

**新增事件步驟**:
1. 在 `content-templates.js` 的 `EventPool` 陣列新增：
```javascript
{
  id: "new_001",
  name: "新事件名稱",
  description: "事件描述",
  type: "positive",  // 或 "negative", "mixed"
  category: "social",
  effects: [
    { target: "sales", modifier: "multiply", value: 1.2, scope: "all" }
  ],
  triggerConditions: {
    minRound: 1,
    maxRound: null,
    probability: 0.05,
    exclusive: []
  },
  notification: {
    title: "🎉 新事件",
    message: "事件發生了！銷量 +20%",
    duration: 3000
  }
}
```

---

### 3. 開發者日誌

**相關檔案**: `js/dev-logger.js`

**使用方式**:
```javascript
// 啟用開發者模式
setDevMode(true);

// 記錄日誌
devLog('SALES', '作品「xxx」銷量計算', { popularity: 75, sales: 142 });
devLog('EVENT', '觸發事件: 超大豪雨');
devLog('CALC', '最大銷售量限制觸發', { max: 100, actual: 142, lost: 42 });
```

**在 Console 查看**:
```javascript
// 查看所有日誌
getDevLogs();

// 過濾特定類型
getDevLogs('SALES');

// 清除日誌
clearDevLogs();
```

---

### 4. 銷量計算流程

**計算順序**:
1. 基礎人氣 → 市場密度 → 購買力
2. 封面/紙質吸引力修正（受顧客類型影響）
3. 事件效果疊加
4. 升級加成（社群經營乘數）
5. 親友團保底
6. 最大銷售量上限檢查

**關鍵函數**:
```javascript
// 計算單一作品銷量
function calculateWorkSales(work, events, upgrades) {
  let sales = baseSalesCalculation(work);
  
  // 套用封面/紙質修正
  sales *= getAttractionModifier(work, customerType);
  
  // 套用事件效果
  sales = applyEventEffects(events, sales, work.id);
  
  // 套用社群經營乘數
  sales *= getSocialMultiplier(upgrades.social);
  
  // 親友團保底
  sales = Math.max(sales, getMinimumSales(upgrades.friends));
  
  // 最大銷售量限制
  const maxSales = getMaxSales(upgrades.helper);
  if (sales > maxSales) {
    recordLostSales(sales - maxSales);
    sales = maxSales;
  }
  
  return Math.floor(sales);
}
```

---

### 5. 遊戲結束檢查

**觸發點**:
- `endSession()` - 場次結算後
- `adjustMoney()` - 任何資金變動後
- `takeLoan()` - 借款後（檢查是否超過額度）

**檢查邏輯**:
```javascript
function checkGameOver() {
  const netWorth = gameState.money;  // debt 已在 money 中扣除
  
  if (netWorth < 0 && gameState.debt > 0) {
    // 有負債且資金為負 = 破產
    triggerGameOver('bankruptcy');
    return true;
  }
  
  if (netWorth < 0) {
    // 無負債但資金為負 = 需要顯示警告
    showWarning('資金即將見底！');
  }
  
  return false;
}
```

---

## 測試建議

### 手動測試流程
1. **社團升級**: 完成一場次 → 購買升級 → 驗證效果
2. **隨機事件**: 多次執行場次 → 確認事件觸發 → 檢查效果計算
3. **銷售上限**: 創建高人氣作品 → 不升級小幫手 → 確認上限提示
4. **遊戲結束**: 故意虧損 → 確認結束畫面顯示

### Console 快速測試
```javascript
// 快速增加資金
gameState.money += 100000;
updateUI();

// 強制觸發特定事件
const event = EventPool.find(e => e.id === 'pos_001');
gameState.sessionState.activeEvents.push(event);

// 設定升級等級
gameState.circle.upgrades.helper = 5;

// 觸發遊戲結束（測試用）
gameState.money = -1;
checkGameOver();
```

---

## 常見問題

### Q: 新增的 JS 檔案沒有載入？
A: 確認在 `doujin-sim.html` 中以正確順序加入 `<script src="...">` 標籤。
順序：balance-config.js → content-templates.js → 其他模組 → 主程式

### Q: localStorage 存檔格式更新後舊存檔讀不到？
A: 實作版本遷移函數 `migrateFromV1()`，在 `loadGame()` 中檢查版本並自動轉換。

### Q: 事件效果沒有正確套用？
A: 檢查 `effects` 陣列中的 `target` 是否為有效值，`scope` 是否正確設定。

---

## 相關文件

- [spec.md](spec.md) - 完整規格文件
- [data-model.md](data-model.md) - 資料結構定義
- [contracts/upgrade-system.md](contracts/upgrade-system.md) - 升級系統 API
- [contracts/event-system.md](contracts/event-system.md) - 事件系統 API
- [contracts/game-state.md](contracts/game-state.md) - 遊戲狀態 API
