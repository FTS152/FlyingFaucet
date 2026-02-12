# V1 GameState Structure Backup

**Purpose**: Reference for migration from V1 to V2
**Date**: 2026-02-10
**Source**: doujin-sim.html lines 1469-1488

---

## V1 GameState

```javascript
let GameState = {
  round: 1,          // 目前回合數
  money: 10000,      // 目前資金
  ap: 5,             // 目前行動點數
  maxAp: 5,          // 最大行動點數
  phase: PHASES.MENU,// 目前遊戲階段
  franchises: [],    // 所有知名作品/IP
  drafts: [],        // 草稿/未完成作品
  publications: [],  // 已發表作品
  inventory: [],     // 庫存
  history: [],       // 歷史紀錄
  eventLog: [],      // 事件日誌
  eventCooldowns: {},// 事件冷卻
  seed: Date.now(),  // 隨機種子
  currentPosts: []   // 目前社群貼文
};
```

---

## V2 Extensions Required

### New Top-Level Fields

```javascript
{
  // 現有欄位...
  
  // V2 新增
  debt: 0,                    // 負債金額
  devMode: false,             // 開發者模式
  circle: {
    name: '',                 // 社團名稱
    reputation: 0,            // 社團知名度
    upgrades: {
      helper: 0,              // 培訓小幫手 (0-5)
      coser: 0,               // 僱傭Coser小幫手 (0-3)
      adobe: 0,               // Adobe排版課程 (0-3)
      storage: 0,             // 老家倉儲 (0-5)
      friends: 0,             // 親友團 (0-3)
      social: 0,              // 社群經營 (0-5)
      investor: 0,            // 天使投資人 (0-3)
      stock: 0,               // 股市投資 (0-3)
      writing: 0              // 提升文筆 (0-∞)
    }
  }
}
```

### Extended Publication/Work Fields

```javascript
// 現有 publication 物件新增欄位
{
  // 現有欄位...
  
  // V2 新增
  coverLevel: 'basic',        // 封面等級: free, basic, refined, premium
  paperLevel: 'standard',     // 紙質等級: economy, standard, quality, luxury
  decayRate: 'normal',        // 衰退度: trending, normal, evergreen
  isRetired: false,           // 是否已停產
  retiredPopularity: null     // 停產時固定人氣值
}
```

### New SessionState Fields

```javascript
// sessionState 新增欄位
{
  // 現有欄位...
  
  // V2 新增
  activeEvents: [],           // 本場次觸發的事件
  maxSalesReached: false,     // 是否觸發銷售上限
  lostSales: 0                // 因上限損失的潛在銷量
}
```

---

## Migration Notes

1. 檢測版本：若沒有 `circle.upgrades` 欄位則為 V1
2. 遷移策略：保留所有現有資料，填入新欄位預設值
3. 向後相容：遷移後的存檔仍可由 V1 版讀取基本功能
4. 存檔版本號：建議在 localStorage 中新增版本識別

---

## Related Files

- [data-model.md](../specs/002-v2-major-update/data-model.md) - 完整 V2 資料模型
- [contracts/game-state.md](../specs/002-v2-major-update/contracts/game-state.md) - GameState API 契約
