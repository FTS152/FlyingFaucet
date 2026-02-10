/**
 * 同人圈經營模擬器 V2 - 開發者日誌系統
 * ================================================
 * 提供開發者模式的詳細日誌記錄功能
 * 
 * 依賴:
 * - GameState.devMode (doujin-sim.html)
 * 
 * 用法:
 * - DevLogger.setDevMode(true) - 啟用開發者模式
 * - DevLogger.devLog('SALES', '銷量計算', { sales: 100 }) - 記錄日誌
 * - DevLogger.getDevLogs('SALES') - 取得指定類別的日誌
 * - DevLogger.clearDevLogs() - 清除所有日誌
 */

const DevLogger = (function() {
  'use strict';
  
  // 私有變數
  let initialized = false;
  let logs = [];
  const MAX_LOGS = 1000; // 最大日誌數量，防止記憶體爆炸
  
  // 日誌類別定義
  const CATEGORIES = {
    SALES: { name: 'SALES', color: '#4CAF50', icon: '💰' },
    EVENT: { name: 'EVENT', color: '#FF9800', icon: '⚡' },
    UPGRADE: { name: 'UPGRADE', color: '#2196F3', icon: '⬆️' },
    STATE: { name: 'STATE', color: '#9C27B0', icon: '📊' },
    CALC: { name: 'CALC', color: '#607D8B', icon: '🔢' }
  };
  
  /**
   * T076: 初始化開發者日誌系統
   */
  function init() {
    if (initialized) {
      console.warn('[DevLogger] Already initialized');
      return;
    }
    
    logs = [];
    initialized = true;
    console.log('[DevLogger] Initialized');
  }
  
  /**
   * T076: 設定開發者模式
   * @param {boolean} enabled - 是否啟用開發者模式
   */
  function setDevMode(enabled) {
    if (typeof GameState !== 'undefined') {
      GameState.devMode = !!enabled;
      
      if (enabled) {
        console.log('%c[DevLogger] 開發者模式已啟用', 'color: #4CAF50; font-weight: bold');
        devLog('STATE', '開發者模式已啟用', { timestamp: Date.now() });
      } else {
        console.log('%c[DevLogger] 開發者模式已停用', 'color: #F44336; font-weight: bold');
      }
      
      return true;
    }
    
    console.error('[DevLogger] GameState not found');
    return false;
  }
  
  /**
   * 檢查是否處於開發者模式
   * @returns {boolean}
   */
  function isDevMode() {
    return typeof GameState !== 'undefined' && GameState.devMode === true;
  }
  
  /**
   * T077: 記錄開發者日誌
   * @param {string} category - 日誌類別 (SALES, EVENT, UPGRADE, STATE, CALC)
   * @param {string} message - 日誌訊息
   * @param {object} [data] - 附加資料
   */
  function devLog(category, message, data = null) {
    // 僅在開發者模式時記錄
    if (!isDevMode()) {
      return;
    }
    
    // 驗證類別
    const categoryInfo = CATEGORIES[category];
    if (!categoryInfo) {
      console.warn(`[DevLogger] Unknown category: ${category}`);
      category = 'STATE';
    }
    
    const logEntry = {
      timestamp: Date.now(),
      category: category,
      message: message,
      data: data
    };
    
    // 新增到日誌陣列
    logs.push(logEntry);
    
    // 限制日誌數量
    if (logs.length > MAX_LOGS) {
      logs = logs.slice(-MAX_LOGS);
    }
    
    // 同時輸出到 Console（帶顏色）
    const cat = CATEGORIES[category] || CATEGORIES.STATE;
    const style = `color: ${cat.color}; font-weight: bold`;
    
    if (data) {
      console.log(`%c${cat.icon} [${category}] ${message}`, style, data);
    } else {
      console.log(`%c${cat.icon} [${category}] ${message}`, style);
    }
  }
  
  /**
   * T078: 取得開發者日誌
   * @param {string} [categoryFilter] - 可選的類別過濾器
   * @returns {Array} 日誌陣列
   */
  function getDevLogs(categoryFilter = null) {
    if (categoryFilter) {
      return logs.filter(log => log.category === categoryFilter);
    }
    return [...logs];
  }
  
  /**
   * T079: 清除所有開發者日誌
   */
  function clearDevLogs() {
    const count = logs.length;
    logs = [];
    
    if (isDevMode()) {
      console.log(`%c[DevLogger] 已清除 ${count} 筆日誌`, 'color: #F44336');
    }
    
    return count;
  }
  
  /**
   * 取得日誌統計資料
   * @returns {object} 各類別的日誌數量
   */
  function getLogStats() {
    const stats = {};
    Object.keys(CATEGORIES).forEach(cat => {
      stats[cat] = logs.filter(l => l.category === cat).length;
    });
    stats.total = logs.length;
    return stats;
  }
  
  /**
   * 取得可用的日誌類別
   * @returns {object} 類別定義
   */
  function getCategories() {
    return { ...CATEGORIES };
  }
  
  /**
   * 匯出日誌為 JSON 字串
   * @returns {string} JSON 格式的日誌
   */
  function exportLogs() {
    return JSON.stringify({
      exportTime: new Date().toISOString(),
      stats: getLogStats(),
      logs: logs
    }, null, 2);
  }
  
  /**
   * 格式化日誌為可讀文字
   * @param {Array} [logsToFormat] - 要格式化的日誌，預設為全部
   * @returns {string} 格式化的日誌文字
   */
  function formatLogs(logsToFormat = null) {
    const targetLogs = logsToFormat || logs;
    
    return targetLogs.map(log => {
      const time = new Date(log.timestamp).toLocaleTimeString('zh-TW');
      const cat = CATEGORIES[log.category] || CATEGORIES.STATE;
      const dataStr = log.data ? ` | ${JSON.stringify(log.data)}` : '';
      return `[${time}] ${cat.icon} [${log.category}] ${log.message}${dataStr}`;
    }).join('\n');
  }
  
  // 公開 API
  return {
    init: init,
    setDevMode: setDevMode,
    isDevMode: isDevMode,
    devLog: devLog,
    getDevLogs: getDevLogs,
    clearDevLogs: clearDevLogs,
    getLogStats: getLogStats,
    getCategories: getCategories,
    exportLogs: exportLogs,
    formatLogs: formatLogs
  };
})();

// 全域快捷函數（方便在其他模組中使用）
function devLog(category, message, data) {
  DevLogger.devLog(category, message, data);
}
