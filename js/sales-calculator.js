/**
 * Sales Calculator Module (V2)
 * 
 * 處理銷售上限計算和小幫手系統
 * 根據 data-model.md 和 contracts/upgrade-system.md 規範實作
 */

const SalesCalculator = (function() {
  'use strict';
  
  // 常數
  const BASE_MAX_SALES = 50;      // 基礎單場最大銷售量
  const SALES_PER_LEVEL = 30;     // 每級小幫手增加的銷售量
  
  // 內部狀態
  let _initialized = false;
  
  /**
   * 初始化銷售計算器
   * @returns {void}
   */
  function init() {
    if (_initialized) return;
    
    console.log('[SalesCalculator] Initialized');
    _initialized = true;
  }
  
  /**
   * T046: 獲取最大銷售量
   * @param {number} helperLevel - 小幫手升級等級
   * @returns {number} - 最大銷售量
   */
  function getMaxSales(helperLevel = 0) {
    // 從 UpgradeSystem 獲取升級效果（如果可用）
    if (typeof UpgradeSystem !== 'undefined') {
      const maxSalesFromUpgrade = UpgradeSystem.getMaxSales();
      if (maxSalesFromUpgrade) {
        return maxSalesFromUpgrade;
      }
    }
    
    // 備用計算：BASE_MAX_SALES + level * SALES_PER_LEVEL
    return BASE_MAX_SALES + (helperLevel * SALES_PER_LEVEL);
  }
  
  /**
   * T047: 檢查銷售上限
   * @param {number} calculatedSales - 計算出的銷量
   * @param {number} maxSales - 最大銷售量
   * @returns {{ limited: boolean, actualSales: number, lostSales: number }}
   */
  function checkSalesLimit(calculatedSales, maxSales) {
    if (calculatedSales <= maxSales) {
      return {
        limited: false,
        actualSales: calculatedSales,
        lostSales: 0
      };
    }
    
    return {
      limited: true,
      actualSales: maxSales,
      lostSales: calculatedSales - maxSales
    };
  }
  
  /**
   * 獲取分身乏術提示訊息
   * @param {number} lostSales - 損失的銷量
   * @returns {string}
   */
  function getOverloadMessage(lostSales) {
    const messages = [
      `分身乏術！因為人手不足，錯失了 ${lostSales} 位想購買的顧客 😰`,
      `攤位太熱門了！有 ${lostSales} 位顧客因為排隊太長而離開 💦`,
      `顧客太多，忙不過來！約 ${lostSales} 人等不及走了 😵`,
      `一個人根本忙不過來...錯過了 ${lostSales} 筆訂單 😤`
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  }
  
  /**
   * 計算需要多少級小幫手才能處理目標銷量
   * @param {number} targetSales - 目標銷量
   * @returns {number} - 需要的小幫手等級
   */
  function getRequiredHelperLevel(targetSales) {
    if (targetSales <= BASE_MAX_SALES) {
      return 0;
    }
    
    const neededExtra = targetSales - BASE_MAX_SALES;
    return Math.ceil(neededExtra / SALES_PER_LEVEL);
  }
  
  /**
   * 獲取升級建議
   * @param {number} lostSales - 損失的銷量
   * @param {number} currentLevel - 目前小幫手等級
   * @returns {string}
   */
  function getUpgradeSuggestion(lostSales, currentLevel) {
    return `提示：需要升級小幫手才能處理更多顧客！`;
  }
  
  /**
   * T094: 根據市場了解度獲取預估誤差
   * @param {number} marketUnderstanding - 作品的市場了解度 (0.0 ~ 1.0)，基於 draft.audienceLevel / 10
   * @returns {{ minError: number, maxError: number, confidenceLevel: string }}
   */
  function getEstimationError(marketUnderstanding) {
    // 市場了解度越高，誤差越小
    // 0.0 = ±80% 誤差，1.0 = ±10% 誤差
    const baseError = 0.8; // 80%
    const minPossibleError = 0.1; // 10%
    
    const errorRange = baseError - (marketUnderstanding * (baseError - minPossibleError));
    
    // 判斷信心等級
    let confidenceLevel;
    if (marketUnderstanding >= 0.8) {
      confidenceLevel = '高';
    } else if (marketUnderstanding >= 0.5) {
      confidenceLevel = '中';
    } else if (marketUnderstanding >= 0.3) {
      confidenceLevel = '低';
    } else {
      confidenceLevel = '極低';
    }
    
    return {
      minError: -errorRange,
      maxError: errorRange,
      errorPercent: Math.round(errorRange * 100),
      confidenceLevel
    };
  }
  
  /**
   * T095: 預估作品銷量
   * @param {object} work - 作品資料 (包含 popularity, audienceDensity, purchasingPower)
   * @param {number} marketUnderstanding - 作品的市場了解度 (0.0 ~ 1.0)，來自 draft.audienceLevel / 10
   * @param {boolean} isSimple - 是否使用簡化公式（低了解度時）
   * @returns {{ min: number, max: number, estimated: number, confidence: string }}
   */
  function estimateSales(work, marketUnderstanding = 0.3, isSimple = false) {
    if (!work) {
      return { min: 0, max: 0, estimated: 0, confidence: '無資料' };
    }
    
    // 基礎預估銷量
    let baseEstimate;
    const attendeeMultiplier = BalanceConfig?.CONVENTION?.ATTENDEE_MULTIPLIER ?? 15;
    const multiplier = Number.isFinite(attendeeMultiplier) ? attendeeMultiplier : 15;
    if (isSimple || marketUnderstanding < 0.3) {
      // 簡化公式：只看人氣
      baseEstimate = Math.round(work.popularity * 0.5 * 0.25 * multiplier);
    } else {
      // 完整公式：P × D × B
      const popularity = work.popularity || 50;
      const density = work.audienceDensity || 0.3;
      const purchasingPower = work.purchasingPower || 1.0;
      
      // 基礎公式
      baseEstimate = Math.round(popularity * density * purchasingPower * 0.8 * 0.25 * multiplier);
    }
    
    // 獲取誤差範圍
    const errorInfo = getEstimationError(marketUnderstanding);
    
    // 計算最小/最大預估值
    const min = Math.max(0, Math.round(baseEstimate * (1 + errorInfo.minError)));
    const max = Math.round(baseEstimate * (1 + errorInfo.maxError));
    
    // 加入隨機性到預估值（模擬不確定性）
    const randomFactor = 1 + (Math.random() - 0.5) * errorInfo.maxError;
    const estimated = Math.max(0, Math.round(baseEstimate * randomFactor));
    
    // T095: 開發者日誌
    if (typeof devLog === 'function') {
      devLog('CALC', `銷量預估: ${work.title || '作品'}`, {
        baseEstimate,
        marketUnderstanding,
        errorPercent: errorInfo.errorPercent,
        range: `${min}-${max}`,
        estimated
      });
    }
    
    return {
      min,
      max,
      estimated,
      confidence: errorInfo.confidenceLevel,
      errorPercent: errorInfo.errorPercent
    };
  }
  
  /**
   * 比較預估與實際銷量
   * @param {number} estimated - 預估銷量
   * @param {number} actual - 實際銷量
   * @param {boolean} isSoldOut - 是否完售
   * @returns {{ diff: number, diffPercent: number, message: string }}
   */
  function compareEstimateToActual(estimated, actual, isSoldOut = false) {
    const diff = actual - estimated;
    const diffPercent = estimated > 0 ? Math.round((diff / estimated) * 100) : 0;
    let message; 
 
    // 當完售時就顯示完售，因為銷量可能被上限限制
    if (isSoldOut) {
      message = '完售🎉 是不是印少了？';
      return { diff, diffPercent, message };
    }

    if (Math.abs(diffPercent) <= 10) {
      message = '預估準確！';
    } else if (diff > 0) {
      if (diffPercent > 50) {
        message = '大賣！遠超預期！🎉';
      } else {
        message = '超出預期 ↑';
      }
    } else {
      if (diffPercent < -50) {
        message = '慘澹...遠不如預期 😢';
      } else {
        message = '不如預期 ↓';
      }
    }
    
    return { diff, diffPercent, message };
  }
  
  /**
   * T104: 根據顧客類型獲取吸引力修正值
   * @param {object} work - 作品資料 (包含 coverQuality, attractionBonus/paperQuality)
   * @param {string} customerType - 顧客類型 (CASUAL, LURKER, MEMER, ENTHUSIAST, COLLECTOR, WHALE, CRITIC, HATER)
   * @returns {{ finalAttraction: number, coverEffect: number, paperEffect: number, details: object }}
   */
  function getAttractionModifier(work, customerType) {
    // 獲取顧客係數
    const coefficients = (typeof BalanceConfig !== 'undefined' && BalanceConfig.CUSTOMER_COEFFICIENTS) 
      ? BalanceConfig.CUSTOMER_COEFFICIENTS[customerType] 
      : null;
    
    if (!coefficients) {
      // 預設係數
      return {
        finalAttraction: 1.0,
        coverEffect: 0,
        paperEffect: 0,
        details: { type: customerType, error: 'Unknown customer type' }
      };
    }
    
    // 獲取封面效果 (coverQuality: 0.0 ~ 1.0)
    const baseCoverQuality = work.coverQuality || 0.4;
    const coverSensitivity = coefficients.coverSensitivity || 1.0;
    // 封面效果：(封面品質 - 0.4) * 敏感度，範圍約 -0.32 ~ +0.48
    const coverEffect = (baseCoverQuality - 0.4) * coverSensitivity;
    
    // 獲取紙質效果 (attractionBonus: -0.2 ~ +0.3)
    const paperBonus = work.attractionBonus || 0;
    const paperSensitivity = coefficients.paperSensitivity || 1.0;
    // 紙質效果：紙質加成 * 敏感度
    const paperEffect = paperBonus * paperSensitivity;
    
    // 最終吸引力修正：1.0 + 封面效果 + 紙質效果
    const finalAttraction = 1.0 + coverEffect + paperEffect;
    
    const details = {
      type: customerType,
      typeName: coefficients.name,
      baseCoverQuality,
      coverSensitivity,
      coverEffect: Math.round(coverEffect * 100) / 100,
      paperBonus,
      paperSensitivity,
      paperEffect: Math.round(paperEffect * 100) / 100,
      finalAttraction: Math.round(finalAttraction * 100) / 100
    };
    
    // T106: 開發者日誌
    if (typeof devLog === 'function') {
      devLog('CALC', `吸引力修正: ${customerType}`, details);
    }
    
    return {
      finalAttraction: Math.max(0.1, finalAttraction), // 最低 10%
      coverEffect,
      paperEffect,
      details
    };
  }
  
  // === 公開 API ===
  return {
    init: init,
    getMaxSales: getMaxSales,
    checkSalesLimit: checkSalesLimit,
    getOverloadMessage: getOverloadMessage,
    getRequiredHelperLevel: getRequiredHelperLevel,
    getUpgradeSuggestion: getUpgradeSuggestion,
    // T094-T095: 預估功能
    getEstimationError: getEstimationError,
    estimateSales: estimateSales,
    compareEstimateToActual: compareEstimateToActual,
    // T104: 顧客類型吸引力
    getAttractionModifier: getAttractionModifier,
    
    // 常數也公開出去
    BASE_MAX_SALES: BASE_MAX_SALES,
    SALES_PER_LEVEL: SALES_PER_LEVEL
  };
  
})();

// 如果在瀏覽器環境，將模組掛載到 window
if (typeof window !== 'undefined') {
  window.SalesCalculator = SalesCalculator;
}
