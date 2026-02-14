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
  
  // ═══════════════════════════════════════════════════════════════
  // 預估銷量系統常數
  // ═══════════════════════════════════════════════════════════════

  const BASE_COEFFICIENT = 5.0;   // 基礎銷量係數（從模擬反推校準）
  const DEFAULT_D = 0.45;         // 未知受眾密度時的預設值
  const DEFAULT_B = 1.0;          // 未知購買力時的預設值
  const ADOBE_QUALITY_FACTOR = 0.07; // Adobe 品質對整體銷量的影響係數

  // 各 audienceLevel 對應的誤差百分比
  const ERROR_TABLE = {
    1: 0.65, 2: 0.55, 3: 0.45,
    4: 0.35, 5: 0.28, 6: 0.22,
    7: 0.15, 8: 0.10, 9: 0.07, 10: 0.05
  };

  // 各 audienceLevel 對應的信心標籤
  const CONFIDENCE_TABLE = {
    1: '低', 2: '低', 3: '低',
    4: '中', 5: '中', 6: '中',
    7: '高', 8: '高',
    9: '極高', 10: '極高'
  };

  /**
   * T094: 根據 audienceLevel 獲取預估誤差
   * @param {number} audienceLevel - 市場調研等級 (0~10)
   * @returns {{ errorRange: number, errorPercent: number, confidenceLevel: string }}
   */
  function getEstimationError(audienceLevel) {
    var level = Math.max(0, Math.min(10, Math.floor(audienceLevel)));
    if (level === 0) {
      return { errorRange: 1.0, errorPercent: 100, confidenceLevel: '無' };
    }
    var errorRange = ERROR_TABLE[level] || 0.65;
    return {
      errorRange: errorRange,
      errorPercent: Math.round(errorRange * 100),
      confidenceLevel: CONFIDENCE_TABLE[level] || '低'
    };
  }

  /**
   * T095: 預估作品銷量（V2 重寫）
   *
   * 公式：baseSales = effP × D² × B × 5.0 × (1 + coserBonus) × adobeMultiplier
   * 再依序套用 salesMultiplier、guaranteedSales、maxSales cap、stageBias
   *
   * @param {object} work - 作品資料 { popularity, audienceDensity, purchasingPower }
   * @param {number} audienceLevel - 市場調研等級 (0~10)
   * @param {object} gameContext - 遊戲狀態 { salesMultiplier, guaranteedSales, maxSales, boothAttractionBonus, qualityBonus, totalUpgradeLevels }
   * @returns {{ min, max, estimated, confidence, errorPercent, standardNote } | null}
   */
  function estimateSales(work, audienceLevel, gameContext) {
    if (!work) return null;

    var level = Math.floor(audienceLevel || 0);
    if (level <= 0) return null;

    // 取得有效人氣
    var getEffP = function(p) {
      return (typeof BalanceConfig !== 'undefined' && BalanceConfig.getEffectivePopularity)
        ? BalanceConfig.getEffectivePopularity(p) : p;
    };
    var effP = getEffP(work.popularity || 50);

    // 根據 audienceLevel 分級選擇 D / B
    var D = (level >= 4) ? (work.audienceDensity || DEFAULT_D) : DEFAULT_D;
    var B = (level >= 7) ? (work.purchasingPower || DEFAULT_B) : DEFAULT_B;

    // 從 gameContext 取升級數據（容錯）
    var ctx = gameContext || {};
    var coserBonus = ctx.boothAttractionBonus || 0;
    var qualityBonus = ctx.qualityBonus || 0;
    var salesMultiplier = ctx.salesMultiplier || 1.0;
    var guaranteedSales = ctx.guaranteedSales || 0;
    var maxSales = ctx.maxSales || 100;
    var totalUpgradeLevels = ctx.totalUpgradeLevels || 0;

    // Adobe 品質乘數：整體約 1 + 0.07 × qualityBonus
    var adobeMultiplier = 1 + ADOBE_QUALITY_FACTOR * qualityBonus;

    // 基礎銷量 = effP × D² × B × 5.0 × (1 + coserBonus) × adobeMultiplier
    var baseSales = effP * D * D * B * BASE_COEFFICIENT * (1 + coserBonus) * adobeMultiplier;

    // 套用社群銷量乘數 + 親友團保底
    var adjustedSales = baseSales * salesMultiplier + guaranteedSales;

    // 銷量上限
    var cappedSales = Math.min(adjustedSales, maxSales);

    // 遊戲階段偏差：前期低估、後期高估
    var progressRatio = Math.min(1, Math.max(0, totalUpgradeLevels / 25));
    var stageBias = 0.85 + progressRatio * 0.30;
    var finalBase = cappedSales * stageBias;

    // 誤差
    var errorInfo = getEstimationError(level);
    var errorRange = errorInfo.errorRange;

    var min = Math.max(0, Math.round(finalBase * (1 - errorRange)));
    var max = Math.round(finalBase * (1 + errorRange));

    // 隨機預估值（正態近似，集中在中心）
    var r1 = Math.random();
    var r2 = Math.random();
    var normalish = (r1 + r2 - 1); // 簡易近似 [-1, 1]，中心偏重
    var estimated = Math.max(0, Math.round(finalBase + finalBase * errorRange * normalish * 0.5));

    if (typeof devLog === 'function') {
      devLog('CALC', '銷量預估 V2: ' + (work.title || '作品'), {
        audienceLevel: level,
        effP: effP,
        D: D,
        B: B,
        baseSales: Math.round(baseSales),
        adjustedSales: Math.round(adjustedSales),
        cappedSales: Math.round(cappedSales),
        stageBias: stageBias,
        finalBase: Math.round(finalBase),
        errorPercent: errorInfo.errorPercent,
        range: min + '-' + max,
        estimated: estimated
      });
    }

    return {
      min: min,
      max: max,
      estimated: estimated,
      confidence: errorInfo.confidenceLevel,
      errorPercent: errorInfo.errorPercent,
      standardNote: '計算基準：$300 / 無吸引力加成'
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
