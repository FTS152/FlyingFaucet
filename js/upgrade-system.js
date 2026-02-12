/**
 * 同人圈經營模擬器 V2 - 社團升級系統
 * ================================================
 * 處理社團升級的核心邏輯
 * 
 * 依賴:
 * - BalanceConfig.UPGRADE_DEFINITIONS (balance-config.js)
 * - GameState.circle.upgrades (doujin-sim.html)
 * 
 * 事件:
 * - upgrade:purchased - 升級購買成功
 * - upgrade:maxReached - 達到最高等級
 */

const UpgradeSystem = (function() {
  'use strict';
  
  // 私有變數
  let initialized = false;
  
  // T021: 初始化升級系統
  function initUpgradeSystem() {
    if (initialized) {
      console.warn('[UpgradeSystem] Already initialized');
      return;
    }
    
    // 確保 GameState.circle.upgrades 存在
    if (typeof GameState === 'undefined') {
      console.error('[UpgradeSystem] GameState not found');
      return;
    }
    
    if (!GameState.circle) {
      GameState.circle = {
        name: GameState.circleName || '無名社團',
        reputation: 0,
        upgrades: {}
      };
    }
    
    if (!GameState.circle.upgrades) {
      GameState.circle.upgrades = {};
    }
    
    // 確保所有升級項目都有初始值
    const definitions = getUpgradeDefinitions();
    definitions.forEach(def => {
      if (GameState.circle.upgrades[def.id] === undefined) {
        GameState.circle.upgrades[def.id] = 0;
      }
    });
    
    initialized = true;
    console.log('[UpgradeSystem] Initialized', GameState.circle.upgrades);
  }
  
  // T022: 取得所有升級項目的定義
  function getUpgradeDefinitions() {
    if (typeof BalanceConfig === 'undefined' || !BalanceConfig.UPGRADE_DEFINITIONS) {
      console.error('[UpgradeSystem] BalanceConfig.UPGRADE_DEFINITIONS not found');
      return [];
    }
    return BalanceConfig.UPGRADE_DEFINITIONS;
  }
  
  // T023: 取得指定升級項目的目前等級
  function getUpgradeLevel(upgradeId) {
    if (!GameState.circle || !GameState.circle.upgrades) {
      return 0;
    }
    return GameState.circle.upgrades[upgradeId] || 0;
  }
  
  // T024: 取得指定升級項目升至下一級的費用
  function getUpgradeCost(upgradeId) {
    const definition = getUpgradeDefinitions().find(d => d.id === upgradeId);
    if (!definition) {
      console.warn('[UpgradeSystem] Unknown upgrade:', upgradeId);
      return null;
    }
    
    const currentLevel = getUpgradeLevel(upgradeId);
    
    // 檢查是否已達最高等級
    if (definition.maxLevel !== null && currentLevel >= definition.maxLevel) {
      return null; // 已達最高等級
    }
    
    // 取得下一級費用
    if (definition.costs && definition.costs[currentLevel] !== undefined) {
      return definition.costs[currentLevel];
    }
    
    // 使用公式計算費用（用於無上限的升級項目）
    if (definition.costFormula) {
      return definition.costFormula(currentLevel);
    }
    
    return null;
  }
  
  // T025: 檢查玩家是否有足夠資金升級
  function canAffordUpgrade(upgradeId) {
    const cost = getUpgradeCost(upgradeId);
    if (cost === null) return false; // 已達最高等級
    
    return GameState.money >= cost;
  }
  
  // 檢查是否可以升級（包含資金和等級檢查）
  function canUpgrade(upgradeId) {
    const definition = getUpgradeDefinitions().find(d => d.id === upgradeId);
    if (!definition) return false;
    
    const currentLevel = getUpgradeLevel(upgradeId);
    
    // 檢查是否已達最高等級
    if (definition.maxLevel !== null && currentLevel >= definition.maxLevel) {
      return false;
    }
    
    // 檢查資金
    return canAffordUpgrade(upgradeId);
  }
  
  // T026: 購買升級
  function purchaseUpgrade(upgradeId) {
    const definition = getUpgradeDefinitions().find(d => d.id === upgradeId);
    if (!definition) {
      return { success: false, message: '無效的升級項目' };
    }
    
    const currentLevel = getUpgradeLevel(upgradeId);
    
    // 檢查是否已達最高等級
    if (definition.maxLevel !== null && currentLevel >= definition.maxLevel) {
      return { success: false, message: '已達最高等級' };
    }
    
    const cost = getUpgradeCost(upgradeId);
    if (cost === null) {
      return { success: false, message: '無法取得升級費用' };
    }
    
    // 檢查資金
    if (GameState.money < cost) {
      return { success: false, message: '資金不足' };
    }
    
    // 扣除資金
    GameState.money -= cost;
    
    // 增加等級
    GameState.circle.upgrades[upgradeId] = currentLevel + 1;
    const newLevel = GameState.circle.upgrades[upgradeId];
    
    // T084: 開發者日誌
    if (typeof devLog === 'function') {
      devLog('UPGRADE', `購買升級: ${definition.name} Lv.${newLevel}`, {
        upgradeId,
        oldLevel: currentLevel,
        newLevel,
        cost,
        remainingMoney: GameState.money
      });
    }
    
    // 觸發事件
    if (typeof EventBus !== 'undefined') {
      EventBus.emit('upgrade:purchased', {
        upgradeId,
        newLevel,
        cost
      });
      
      // 檢查是否達到最高等級
      if (definition.maxLevel !== null && newLevel >= definition.maxLevel) {
        EventBus.emit('upgrade:maxReached', {
          upgradeId,
          maxLevel: definition.maxLevel
        });
      }
    }
    
    console.log(`[UpgradeSystem] Purchased ${definition.name} Lv.${newLevel} for $${cost}`);
    
    return { 
      success: true, 
      message: `成功升級 ${definition.name} 至 Lv.${newLevel}`,
      newLevel,
      cost
    };
  }
  
  // T027: 計算指定升級項目在目前等級的效果
  function getUpgradeEffect(upgradeId) {
    const definition = getUpgradeDefinitions().find(d => d.id === upgradeId);
    if (!definition) {
      return {};
    }
    
    const currentLevel = getUpgradeLevel(upgradeId);
    
    if (currentLevel === 0) {
      return {}; // 未升級，無效果
    }
    
    // 取得對應等級的效果（等級從1開始，陣列從0開始）
    const effectIndex = currentLevel - 1;
    
    if (definition.effects && definition.effects[effectIndex]) {
      return definition.effects[effectIndex];
    }
    
    // 使用公式計算效果（用於無上限的升級項目）
    if (definition.effectFormula) {
      return definition.effectFormula(currentLevel);
    }
    
    return {};
  }
  
  // 取得所有升級的總效果
  function getAllUpgradeEffects() {
    const totalEffects = {};
    const definitions = getUpgradeDefinitions();
    
    definitions.forEach(def => {
      const effect = getUpgradeEffect(def.id);
      Object.entries(effect).forEach(([key, value]) => {
        if (typeof value === 'number') {
          // 數值效果加總
          totalEffects[key] = (totalEffects[key] || 0) + value;
        } else {
          // 非數值效果直接覆蓋
          totalEffects[key] = value;
        }
      });
    });
    
    return totalEffects;
  }
  
  // 計算最大銷售量（受小幫手升級影響）
  function getMaxSales() {
    const helperEffect = getUpgradeEffect('helper');
    const baseSales = BalanceConfig.MAX_SALES?.BASE || 100;
    const bonus = helperEffect.maxSalesBonus || 0;
    return baseSales + bonus;
  }
  
  // 計算倉儲成本折扣
  function getStorageCostMultiplier() {
    const storageEffect = getUpgradeEffect('storage');
    const reduction = storageEffect.storageCostReduction || 0;
    return 1 - reduction;
  }
  
  // 計算銷量乘數（社群經營）
  function getSalesMultiplier() {
    const socialEffect = getUpgradeEffect('social');
    return socialEffect.salesMultiplier || 1.0;
  }
  
  // 計算舉債額度（天使投資人）
  function getDebtLimit() {
    const investorEffect = getUpgradeEffect('investor');
    return investorEffect.debtLimit || 0;
  }
  
  // 計算利息收益（股市投資）
  function getInterestRate() {
    const stockEffect = getUpgradeEffect('stock');
    return stockEffect.interestRate || 0;
  }
  
  // 計算保底銷量（親友團）
  function getGuaranteedSales() {
    const friendsEffect = getUpgradeEffect('friends');
    return friendsEffect.guaranteedSales || 0;
  }
  
  // 計算攤位吸引力加成（Coser小幫手）
  function getBoothAttractionBonus() {
    const coserEffect = getUpgradeEffect('coser');
    return coserEffect.boothAttractionBonus || 0;
  }
  
  // 計算品質加成（Adobe排版課程）
  function getQualityBonus() {
    const adobeEffect = getUpgradeEffect('adobe');
    return adobeEffect.qualityBonus || 0;
  }
  
  // 計算基礎品質加成（提升文筆）
  function getBaseQualityBonus() {
    const writingEffect = getUpgradeEffect('writing');
    return writingEffect.baseQualityBonus || 0;
  }
  
  // 計算超級打字機加成（創作時獲得2份草稿的機率）
  function getTypewriterBonus() {
    const typewriterEffect = getUpgradeEffect('typewriter');
    return typewriterEffect.typewriterBonus || 0;
  }
  
  // 計算聖德太子加成（研究作品時獲得2級理解度的機率）
  function getSageBonus() {
    const sageEffect = getUpgradeEffect('sage');
    return sageEffect.sageBonus || 0;
  }
  
  // 計算市場分析達人加成（研究市場時獲得2級調研的機率）
  function getAnalystBonus() {
    const analystEffect = getUpgradeEffect('analyst');
    return analystEffect.analystBonus || 0;
  }
  
  // 公開 API
  return {
    init: initUpgradeSystem,
    getDefinitions: getUpgradeDefinitions,
    getLevel: getUpgradeLevel,
    getCost: getUpgradeCost,
    canAfford: canAffordUpgrade,
    canUpgrade: canUpgrade,
    purchase: purchaseUpgrade,
    getEffect: getUpgradeEffect,
    getAllEffects: getAllUpgradeEffects,
    
    // 便捷方法
    getMaxSales,
    getStorageCostMultiplier,
    getSalesMultiplier,
    getDebtLimit,
    getInterestRate,
    getGuaranteedSales,
    getBoothAttractionBonus,
    getQualityBonus,
    getBaseQualityBonus,
    getTypewriterBonus,
    getSageBonus,
    getAnalystBonus
  };
})();

// 導出（支援多種環境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UpgradeSystem;
} else if (typeof window !== 'undefined') {
  window.UpgradeSystem = UpgradeSystem;
}
