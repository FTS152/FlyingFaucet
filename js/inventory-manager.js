/**
 * Inventory Manager Module (V2)
 * 
 * 處理庫存管理、倉儲成本和作品銷毀
 * 根據 data-model.md 規範實作
 */

const InventoryManager = (function() {
  'use strict';
  
  // 常數
  const BASE_STORAGE_COST_PER_BOOK = 10; // 每本每回合基礎倉儲成本
  
  // 內部狀態
  let _initialized = false;
  
  /**
   * 初始化庫存管理器
   * @returns {void}
   */
  function init() {
    if (_initialized) return;
    
    console.log('[InventoryManager] Initialized');
    _initialized = true;
  }
  
  /**
   * T054: 計算倉儲成本
   * @param {Inventory[]} inventory - 庫存物件陣列
   * @param {number} storageLevel - 倉儲升級等級
   * @returns {{ totalCost: number, breakdown: { pubId: string, cost: number }[] }}
   */
  function getStorageCost(inventory, storageLevel = 0) {
    // 從 UpgradeSystem 獲取倉儲成本乘數
    let costMultiplier = 1;
    if (typeof UpgradeSystem !== 'undefined') {
      costMultiplier = UpgradeSystem.getStorageCostMultiplier() || 1;
    } else {
      // 備用計算：每級減少10%
      costMultiplier = Math.max(0.5, 1 - (storageLevel * 0.1));
    }
    
    // 從 BalanceConfig 獲取基礎成本
    const baseCost = typeof BalanceConfig !== 'undefined' && BalanceConfig.STORAGE_COST_PER_BOOK 
      ? BalanceConfig.STORAGE_COST_PER_BOOK 
      : BASE_STORAGE_COST_PER_BOOK;
    
    const breakdown = [];
    let totalCost = 0;
    
    for (const inv of inventory) {
      if (inv.remainingCount > 0) {
        const itemCost = Math.round(inv.remainingCount * baseCost * costMultiplier);
        breakdown.push({
          pubId: inv.publicationId,
          count: inv.remainingCount,
          cost: itemCost
        });
        totalCost += itemCost;
      }
    }
    
    return {
      totalCost,
      breakdown,
      costPerBook: Math.round(baseCost * costMultiplier * 100) / 100
    };
  }
  
  /**
   * T055: 銷毀作品庫存（設定為停產）
   * @param {string} workId - 作品 ID
   * @param {GameState} gameState - 遊戲狀態
   * @returns {{ success: boolean, message: string }}
   */
  function retireWork(workId, gameState) {
    const pub = gameState.publications.find(p => p.id === workId);
    const inv = gameState.inventory.find(i => i.publicationId === workId);
    
    if (!pub) {
      return { success: false, message: '找不到該作品' };
    }
    
    if (!inv || inv.remainingCount === 0) {
      return { success: false, message: '該作品沒有庫存' };
    }
    
    if (pub.isRetired) {
      return { success: false, message: '該作品已經停產' };
    }
    
    // 記錄停產時的人氣
    pub.isRetired = true;
    pub.retiredPopularity = pub.popularity || 50;
    
    // 清空庫存
    const destroyedCount = inv.remainingCount;
    inv.remainingCount = 0;
    inv.isRetired = true;
    
    return { 
      success: true, 
      message: `已銷毀《${pub.title}》的 ${destroyedCount} 本庫存`,
      destroyedCount
    };
  }
  
  /**
   * T056: 取得停產作品的固定人氣值
   * @param {Publication} work - 作品物件
   * @returns {number} - 人氣值
   */
  function getRetiredWorkPopularity(work) {
    if (!work) return 0;
    
    if (work.isRetired && work.retiredPopularity !== undefined) {
      return work.retiredPopularity;
    }
    
    // 如果沒有記錄，返回當前人氣或預設值
    return work.popularity || 50;
  }
  
  /**
   * 檢查作品是否已停產
   * @param {Publication} work - 作品物件
   * @returns {boolean}
   */
  function isRetired(work) {
    return work && work.isRetired === true;
  }
  
  /**
   * 獲取庫存總覽
   * @param {Inventory[]} inventory - 庫存物件陣列
   * @param {Publication[]} publications - 出版物陣列
   * @returns {{ totalBooks: number, activeBooks: number, retiredBooks: number, items: object[] }}
   */
  function getInventorySummary(inventory, publications) {
    let totalBooks = 0;
    let activeBooks = 0;
    let retiredBooks = 0;
    const items = [];
    
    for (const inv of inventory) {
      if (inv.remainingCount > 0) {
        const pub = publications.find(p => p.id === inv.publicationId);
        totalBooks += inv.remainingCount;
        
        if (pub && pub.isRetired) {
          retiredBooks += inv.remainingCount;
        } else {
          activeBooks += inv.remainingCount;
        }
        
        items.push({
          id: inv.publicationId,
          title: pub?.title || '未知作品',
          count: inv.remainingCount,
          isRetired: pub?.isRetired || false,
          popularity: pub?.isRetired ? pub.retiredPopularity : pub?.popularity || 0
        });
      }
    }
    
    return {
      totalBooks,
      activeBooks,
      retiredBooks,
      items
    };
  }
  
  /**
   * 計算建議銷毀的庫存（低人氣作品）
   * @param {Inventory[]} inventory - 庫存物件陣列
   * @param {Publication[]} publications - 出版物陣列
   * @param {number} popularityThreshold - 人氣閾值（低於此值建議銷毀）
   * @returns {object[]}
   */
  function getSuggestedRetirements(inventory, publications, popularityThreshold = 20) {
    const suggestions = [];
    
    for (const inv of inventory) {
      if (inv.remainingCount > 0) {
        const pub = publications.find(p => p.id === inv.publicationId);
        if (pub && !pub.isRetired && pub.popularity < popularityThreshold) {
          const storageCostPerRound = inv.remainingCount * BASE_STORAGE_COST_PER_BOOK;
          suggestions.push({
            id: pub.id,
            title: pub.title,
            count: inv.remainingCount,
            popularity: pub.popularity,
            storageCostPerRound,
            reason: `人氣僅 ${Math.round(pub.popularity)}%，且每回合倉儲成本 $${storageCostPerRound}`
          });
        }
      }
    }
    
    // 按人氣排序（低到高）
    return suggestions.sort((a, b) => a.popularity - b.popularity);
  }
  
  // === 公開 API ===
  return {
    init: init,
    getStorageCost: getStorageCost,
    retireWork: retireWork,
    getRetiredWorkPopularity: getRetiredWorkPopularity,
    isRetired: isRetired,
    getInventorySummary: getInventorySummary,
    getSuggestedRetirements: getSuggestedRetirements,
    
    // 常數也公開出去
    BASE_STORAGE_COST_PER_BOOK: BASE_STORAGE_COST_PER_BOOK
  };
  
})();

// 如果在瀏覽器環境，將模組掛載到 window
if (typeof window !== 'undefined') {
  window.InventoryManager = InventoryManager;
}
