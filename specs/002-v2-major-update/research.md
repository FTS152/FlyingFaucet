# Research: V2 Major Update - 社團升級與遊戲機制強化

**Branch**: `002-v2-major-update` | **Date**: 2026-02-10
**Purpose**: Document technical decisions and best practices for v2 implementation

---

## 1. 模組化架構決策

### Decision: 延續外部 JS 檔案模式

**Rationale**: 
- 專案已採用此模式（balance-config.js, content-templates.js）
- 維持零建置工具的原則
- 瀏覽器原生支援 `<script src="">` 載入
- 檔案間依賴透過全域變數共享（現有模式）

**Alternatives Considered**:
1. **ES6 Modules (`import/export`)** - 需要伺服器或建置工具處理 CORS，增加複雜度
2. **全部內嵌單檔** - 4000+ 行太長，維護困難
3. **建置工具打包** - 違反 constitution「無建置工具」原則

**Implementation Pattern**:
```html
<!-- 載入順序：依賴 → 核心 → 功能模組 -->
<script src="balance-config.js"></script>
<script src="content-templates.js"></script>
<script src="js/upgrade-system.js"></script>
<script src="js/event-system.js"></script>
<!-- ... 其他模組 ... -->
<script>
  // 主程式初始化，在所有模組載入後執行
</script>
```

---

## 2. 遊戲狀態管理模式

### Decision: 集中式遊戲狀態物件 + 事件驅動更新

**Rationale**:
- 現有程式碼已使用全域 `gameState` 物件
- 便於開發者日誌追蹤所有狀態變化
- localStorage 序列化/反序列化簡單

**State Structure Enhancement**:
```javascript
const gameState = {
  // 現有屬性...
  
  // V2 新增
  circleUpgrades: {
    helper: 0,           // 培訓小幫手等級 (0-5)
    coser: 0,            // Coser小幫手等級 (0-3)
    adobe: 0,            // Adobe課程等級 (0-3)
    storage: 0,          // 老家倉儲等級 (0-5)
    friends: 0,          // 親友團等級 (0-3)
    social: 0,           // 社群經營等級 (0-5)
    investor: 0,         // 天使投資人等級 (0-3)
    stock: 0,            // 股市投資等級 (0-3)
    writing: 0           // 提升文筆等級 (無上限)
  },
  debt: 0,               // 目前負債金額
  activeEvents: [],      // 本場次觸發的事件
  devMode: false         // 開發者模式開關
};
```

---

## 3. 隨機事件系統設計

### Decision: 資料驅動的可擴展事件模板

**Rationale**:
- 事件定義與程式邏輯分離，方便非程式設計師擴充
- 遵循現有 content-templates.js 的資料驅動模式
- 支援條件觸發和效果疊加

**Best Practices**:
1. 事件 ID 使用語義化命名（neg_001, pos_001, ext_001）
2. 效果使用乘數/加數模式，避免絕對值設定
3. 互斥事件透過 `exclusive` 陣列處理
4. 事件觸發機率總和不超過 100%

**Event Effect Application Order**:
1. 計算基礎參數（來客數、停留率等）
2. 套用事件 multiply 效果
3. 套用事件 add 效果
4. 套用升級加成
5. 套用最大銷售量限制

---

## 4. 最大銷售量機制

### Decision: 基於小幫手等級的軟性上限

**Rationale**:
- 解決反饋的「2000本/輪」問題
- 提供升級小幫手的誘因
- 模擬真實攤位的人力限制

**Formula**:
```javascript
maxSalesPerSession = BASE_MAX_SALES + (helperLevel * SALES_PER_LEVEL);
// 建議值：BASE_MAX_SALES = 100, SALES_PER_LEVEL = 50
// Level 0: 100本, Level 5: 350本
```

**Overflow Handling**:
- 當計算銷量 > maxSalesPerSession 時，實際銷量 = maxSalesPerSession
- 顯示「分身乏術」提示，告知玩家損失的潛在銷量

---

## 5. 開發者日誌實作

### Decision: 可切換的 Console 日誌 + UI 面板

**Rationale**:
- Console 日誌用於詳細除錯
- UI 面板用於快速檢視關鍵數值
- 透過 devMode 開關控制，避免影響正式遊玩

**Log Categories**:
1. `[SALES]` - 銷量計算過程
2. `[EVENT]` - 事件觸發與效果
3. `[UPGRADE]` - 升級效果套用
4. `[STATE]` - 遊戲狀態變化
5. `[CALC]` - 中間計算數值

**Example Output**:
```
[SALES] === 作品「異世界廚師的復仇」銷量計算 ===
[SALES] 基礎人氣: 75
[SALES] 市場密度: 0.45
[SALES] 購買力係數: 1.2
[SALES] 封面加成: +15% (顧客類型:一般路人, 封面等級:精緻)
[SALES] 事件影響: 網紅推薦 +50%
[SALES] 計算銷量: 142本
[SALES] 最大銷售量: 100本 (小幫手等級:0)
[SALES] 實際銷量: 100本 (觸發上限)
```

---

## 6. 顧客類型差異化吸引力

### Decision: 係數矩陣模式

**Rationale**:
- 將敏感度係數與顧客類型定義分離
- 便於調整平衡而不改動程式邏輯
- 可整合進 balance-config.js

**Implementation**:
```javascript
// balance-config.js 新增
CUSTOMER_COEFFICIENTS: {
  CASUAL:     { cover: 1.5, paper: 1.0 },  // 一般路人
  LURKER:     { cover: 1.2, paper: 0.8 },  // 潛水者
  MEMER:      { cover: 1.0, paper: 0.5 },  // 迷因人
  ENTHUSIAST: { cover: 0.3, paper: 0.3 },  // 狂熱粉絲
  COLLECTOR:  { cover: 1.2, paper: 2.0 },  // 收藏家
  WHALE:      { cover: 2.0, paper: 0.5 },  // 衝動購物型
  SUPPORTER:  { cover: 0.5, paper: 1.0 }   // 支持者
}
```

---

## 7. 銷量預估準確度

### Decision: 基於市場了解度的誤差注入

**Rationale**:
- 增加遊戲不確定性
- 提供市場研究的誘因
- 漸進式揭露資訊

**Formula**:
```javascript
// marketUnderstanding = 0 (完全不了解) ~ 1 (完全了解)
estimationError = (1 - marketUnderstanding) * MAX_ERROR_RATE;
// 建議 MAX_ERROR_RATE = 0.5 (50%)

// 低了解度時使用簡化公式
if (marketUnderstanding < 0.3) {
  estimatedSales = popularity * SIMPLE_MULTIPLIER; // 僅用人氣
} else {
  estimatedSales = calculateAccurateSales() * (1 + random(-error, +error));
}
```

---

## 8. 作品衰退度系統

### Decision: 題材連動的衰退係數

**Rationale**:
- 模擬時事題材與長青題材的差異
- 增加作品選擇的策略性
- 與現有題材系統整合

**Decay Categories**:
| 類型 | 衰退率/輪 | 範例題材 |
|------|-----------|----------|
| 時事熱門 | 15-20% | 當季動畫、時事梗 |
| 一般作品 | 5-10% | 常規同人作品 |
| 經典長青 | 1-3% | 經典IP、原創作品 |

---

## 9. 遊戲結束機制

### Decision: 負債檢查點 + 結束畫面

**Check Points**:
1. 場次結算後（扣除倉儲成本）
2. 天使投資人借款到期時
3. 任何資金變動後

**Game Over Screen Elements**:
- 失敗原因說明
- 最終回合數
- 創作作品數
- 最高資金記錄
- 重新開始按鈕

---

## 10. 封面與紙質級距擴充

### Decision: 4 等級系統

**封面等級**:
| 等級 | 成本 | 吸引力效果 | 說明 |
|------|------|------------|------|
| 免費 | $0 | -20% | 自己畫的草稿封面 |
| 基礎 | $500 | +0% | 委託基本插畫 |
| 精緻 | $2,000 | +25% | 專業繪師作品 |
| 頂級 | $10,000 | +50% | 知名繪師閃亮封面 |

**紙質等級**:
| 等級 | 成本增加 | 吸引力效果 | 說明 |
|------|----------|------------|------|
| 經濟 | -30% | -20% | 薄薄的影印紙 |
| 標準 | +0% | +0% | 一般同人誌用紙 |
| 優質 | +40% | +20% | 厚實有質感 |
| 豪華 | +100% | +50% | 特殊紙材+精裝 |

---

## Research Conclusions

所有技術決策均基於：
1. ✅ 維持 Vanilla HTML/CSS/JS 原則
2. ✅ 延續現有模組化架構
3. ✅ 無建置工具需求
4. ✅ 資料驅動設計便於擴充
5. ✅ 向下相容現有遊戲存檔

**Ready for Phase 1: Design & Contracts**
