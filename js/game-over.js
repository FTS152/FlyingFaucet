/**
 * Game Over Module (V2)
 * 
 * 處理遊戲結束條件檢查和統計
 * 根據 spec.md 規範實作
 */

const GameOverManager = (function() {
  'use strict';
  
  // 內部狀態
  let _initialized = false;
  let _gameOverTriggered = false;
  
  /**
   * 初始化遊戲結束管理器
   * @returns {void}
   */
  function init() {
    if (_initialized) return;
    
    console.log('[GameOverManager] Initialized');
    _initialized = true;
    _gameOverTriggered = false;
  }
  
  /**
   * T065: 檢查遊戲結束條件
   * @param {GameState} gameState - 遊戲狀態
   * @returns {{ isGameOver: boolean, reason: string | null, canTakeLoan: boolean, maxLoanAmount: number }}
   */
  function checkGameOver(gameState) {
    if (!gameState) {
      return { isGameOver: false, reason: null, canTakeLoan: false, maxLoanAmount: 0 };
    }
    
    const money = gameState.money || 0;
    const debt = gameState.debt || 0;
    
    // 如果資金為正，則沒有結束
    if (money >= 0) {
      return { isGameOver: false, reason: null, canTakeLoan: false, maxLoanAmount: 0 };
    }
    
    // 資金為負，檢查是否可以舉債
    const debtLimit = getDebtLimit(gameState);
    const availableDebt = Math.max(0, debtLimit - debt);
    const neededAmount = Math.abs(money);
    
    if (availableDebt >= neededAmount) {
      // 可以舉債救場
      return {
        isGameOver: false,
        reason: null,
        canTakeLoan: true,
        maxLoanAmount: availableDebt
      };
    }
    
    // 確認遊戲結束
    let reason = '資金耗盡，社團被迫解散';
    if (debt > 0) {
      reason = '負債累累，無力償還';
    }
    
    return {
      isGameOver: true,
      reason: reason,
      canTakeLoan: false,
      maxLoanAmount: 0
    };
  }
  
  /**
   * 獲取舉債上限
   * @private
   */
  function getDebtLimit(gameState) {
    // 從 UpgradeSystem 獲取
    if (typeof UpgradeSystem !== 'undefined') {
      return UpgradeSystem.getDebtLimit() || 0;
    }
    
    // 備用：從 circle.upgrades.investor 計算
    const investorLevel = gameState.circle?.upgrades?.investor || 0;
    if (investorLevel === 0) return 0;
    
    // 每級 $20000 額度（從 BalanceConfig）
    const perLevelDebt = typeof BalanceConfig !== 'undefined' && BalanceConfig.UPGRADE_DEFINITIONS?.investor?.effect?.debtLimit
      ? BalanceConfig.UPGRADE_DEFINITIONS.investor.effect.debtLimit
      : 20000;
    
    return investorLevel * perLevelDebt;
  }
  
  /**
   * T066: 觸發遊戲結束
   * @param {string} reason - 結束原因
   * @param {GameState} gameState - 遊戲狀態
   * @returns {{ success: boolean }}
   */
  function triggerGameOver(reason, gameState) {
    if (_gameOverTriggered) {
      return { success: false };
    }
    
    _gameOverTriggered = true;
    
    // 儲存遊戲結束狀態
    if (gameState) {
      gameState.isGameOver = true;
      gameState.gameOverReason = reason;
      gameState.gameOverTimestamp = Date.now();
    }
    
    console.log(`[GameOverManager] Game Over: ${reason}`);
    
    return { success: true };
  }
  
  /**
   * T067: 獲取遊戲結束統計
   * @param {GameState} gameState - 遊戲狀態
   * @returns {object}
   */
  function getGameOverStats(gameState) {
    if (!gameState) {
      return getDefaultStats();
    }
    
    const history = gameState.history || [];
    
    // 計算總銷售量
    const totalSales = history.reduce((sum, h) => sum + (h.unitsSold || 0), 0);
    
    // 計算最高資金（歷史巔峰）
    let peakMoney = gameState.money || 0;
    let totalRevenue = 0;
    for (const h of history) {
      totalRevenue += h.totalRevenue || 0;
      // 估算當時的資金
      if (h.round_money !== undefined) {
        peakMoney = Math.max(peakMoney, h.round_money);
      }
    }
    // 如果沒有歷史金額紀錄，用總收入估算
    if (peakMoney === gameState.money && totalRevenue > 0) {
      peakMoney = Math.max(peakMoney, totalRevenue);
    }
    
    // 計算作品數
    const workCount = gameState.publications?.length || 0;
    
    // 計算存活回合
    const survivalRounds = gameState.round || 1;
    
    // 計算總事件數
    const totalEvents = history.reduce((sum, h) => sum + (h.notableEvents?.length || 0), 0);
    
    return {
      survivalRounds,
      workCount,
      totalSales,
      totalRevenue,
      peakMoney,
      finalDebt: gameState.debt || 0,
      totalEvents,
      circleName: gameState.circle?.name || gameState.circleName || '無名社團'
    };
  }
  
  /**
   * 獲取預設統計
   * @private
   */
  function getDefaultStats() {
    return {
      survivalRounds: 0,
      workCount: 0,
      totalSales: 0,
      totalRevenue: 0,
      peakMoney: 0,
      finalDebt: 0,
      totalEvents: 0,
      circleName: '無名社團'
    };
  }
  
  /**
   * 重置遊戲結束狀態（用於重新開始）
   */
  function reset() {
    _gameOverTriggered = false;
  }
  
  /**
   * 檢查是否已觸發遊戲結束
   */
  function isGameOverTriggered() {
    return _gameOverTriggered;
  }
  
  // === 公開 API ===
  return {
    init: init,
    checkGameOver: checkGameOver,
    triggerGameOver: triggerGameOver,
    getGameOverStats: getGameOverStats,
    reset: reset,
    isGameOverTriggered: isGameOverTriggered
  };
  
})();

// 如果在瀏覽器環境，將模組掛載到 window
if (typeof window !== 'undefined') {
  window.GameOverManager = GameOverManager;
}
