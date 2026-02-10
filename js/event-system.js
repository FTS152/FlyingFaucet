/**
 * Event System Module (V2)
 * 
 * 處理場次隨機事件的觸發和效果套用
 * 根據 contracts/event-system.md 規範實作
 */

const EventSystem = (function() {
  'use strict';
  
  // 內部狀態
  let _eventPool = [];
  let _initialized = false;
  
  /**
   * T034: 初始化事件系統
   * @returns {void}
   */
  function init() {
    if (_initialized) return;
    
    // 從 ContentTemplates 載入事件池
    if (typeof ContentTemplates !== 'undefined' && ContentTemplates.SessionEventPool) {
      _eventPool = ContentTemplates.SessionEventPool;
      console.log(`[EventSystem] Loaded ${_eventPool.length} events`);
    } else {
      console.warn('[EventSystem] ContentTemplates.SessionEventPool not found');
      _eventPool = [];
    }
    
    _initialized = true;
  }
  
  /**
   * T035: 取得所有可用的事件定義
   * @returns {RandomEvent[]}
   */
  function getEventPool() {
    if (!_initialized) init();
    return _eventPool;
  }
  
  /**
   * T036: 為場次投擲事件
   * 根據觸發條件和機率決定哪些事件發生
   * 
   * @param {number} round - 目前回合數
   * @returns {RandomEvent[]} - 本場次觸發的事件列表
   */
  function rollSessionEvents(round) {
    if (!_initialized) init();
    
    const triggeredEvents = [];
    const triggeredIds = new Set();
    
    // 過濾符合回合條件的事件
    const eligibleEvents = _eventPool.filter(event => {
      const conditions = event.triggerConditions;
      if (!conditions) return true;
      
      // 檢查最小回合數
      if (conditions.minRound !== null && round < conditions.minRound) {
        return false;
      }
      
      // 檢查最大回合數
      if (conditions.maxRound !== null && round > conditions.maxRound) {
        return false;
      }
      
      return true;
    });
    
    // 對每個事件進行機率判定
    for (const event of eligibleEvents) {
      const probability = event.triggerConditions?.probability || 0;
      
      // 擲骰子
      if (Math.random() < probability) {
        // 檢查互斥事件
        const exclusiveIds = event.triggerConditions?.exclusive || [];
        const hasExclusive = exclusiveIds.some(id => triggeredIds.has(id));
        
        if (!hasExclusive) {
          triggeredEvents.push(event);
          triggeredIds.add(event.id);
          
          // T083: 開發者日誌
          if (typeof devLog === 'function') {
            devLog('EVENT', `事件觸發: ${event.name}`, {
              id: event.id,
              type: event.type,
              probability: event.triggerConditions?.probability,
              effects: event.effects?.map(e => e.target)
            });
          }
          
          // 發出事件觸發通知
          dispatchEventTriggered(event);
        }
      }
    }
    
    // T083: 壞結日誌
    if (typeof devLog === 'function') {
      devLog('EVENT', `回合 ${round} 事件模擬完畢`, {
        eligible: eligibleEvents.length,
        triggered: triggeredEvents.length,
        eventNames: triggeredEvents.map(e => e.name)
      });
    }
    
    console.log(`[EventSystem] Round ${round}: ${triggeredEvents.length} events triggered`);
    return triggeredEvents;
  }
  
  /**
   * T037: 根據 scope 選擇受影響的作品
   * 
   * @param {Work[]} works - 可選作品列表
   * @param {string} scope - 'random_work' | 'specific_theme' | 'all'
   * @returns {Work|null}
   */
  function selectRandomWork(works, scope) {
    if (!works || works.length === 0) {
      return null;
    }
    
    if (scope === 'all') {
      return null; // 影響所有作品，不需選擇特定作品
    }
    
    if (scope === 'random_work') {
      const randomIndex = Math.floor(Math.random() * works.length);
      return works[randomIndex];
    }
    
    if (scope === 'specific_theme') {
      // 根據主題選擇（可擴展為更複雜的邏輯）
      const randomIndex = Math.floor(Math.random() * works.length);
      return works[randomIndex];
    }
    
    return null;
  }
  
  /**
   * T038: 產生事件通知內容
   * 
   * @param {RandomEvent} event - 事件定義
   * @param {string|null} affectedWorkTitle - 受影響的作品名稱
   * @returns {{ title: string, message: string, duration: number }}
   */
  function getEventNotification(event, affectedWorkTitle) {
    if (!event || !event.notification) {
      return {
        title: '事件',
        message: '發生了未知事件',
        duration: 2000
      };
    }
    
    let message = event.notification.message;
    
    // FR-007/FR-016: 事件通知 MUST 顯示具體作品名稱而非「某作品」
    // 替換作品名稱占位符
    if (affectedWorkTitle && affectedWorkTitle.trim()) {
      message = message.replace(/\{workTitle\}/g, affectedWorkTitle);
    } else {
      // 規格要求必須顯示作品名稱，但若真的沒有則記錄警告並使用友善文字
      console.warn('[EventSystem] FR-007/FR-016 違規：無法取得作品名稱，affectedWorkTitle:', affectedWorkTitle);
      message = message.replace(/《\{workTitle\}》/g, '你的作品');
      message = message.replace(/\{workTitle\}/g, '你的作品');
    }
    
    return {
      title: event.notification.title || event.name,
      message: message,
      duration: event.notification.duration || 3000,
      type: event.type // 'positive', 'negative', 'mixed'
    };
  }
  
  /**
   * T039: 套用事件效果到銷售計算資料
   * 
   * 效果套用順序:
   * 1. 先套用所有 multiply 效果
   * 2. 再套用所有 add 效果
   * 3. 最後套用 set 效果
   * 
   * @param {RandomEvent[]} events - 觸發的事件列表
   * @param {SalesCalculationData} salesData - 銷售計算中間資料
   * @returns {SalesCalculationData} - 套用效果後的資料
   */
  function applyEventEffects(events, salesData) {
    if (!events || events.length === 0) {
      return salesData;
    }
    
    // 複製 salesData 避免直接修改原物件
    const result = JSON.parse(JSON.stringify(salesData));
    
    // 收集所有效果並按類型分組
    const multiplyEffects = [];
    const addEffects = [];
    const setEffects = [];
    
    for (const event of events) {
      if (!event.effects) continue;
      
      for (const effect of event.effects) {
        const effectWithEvent = { ...effect, eventId: event.id };
        
        switch (effect.modifier) {
          case 'multiply':
            multiplyEffects.push(effectWithEvent);
            break;
          case 'add':
            addEffects.push(effectWithEvent);
            break;
          case 'set':
            setEffects.push(effectWithEvent);
            break;
        }
      }
    }
    
    // 1. 套用 multiply 效果
    for (const effect of multiplyEffects) {
      applyEffect(result, effect);
    }
    
    // 2. 套用 add 效果
    for (const effect of addEffects) {
      applyEffect(result, effect);
    }
    
    // 3. 套用 set 效果
    for (const effect of setEffects) {
      applyEffect(result, effect);
    }
    
    // T083: 效果套用完畢日誌
    if (typeof devLog === 'function') {
      devLog('EVENT', '事件效果套用完畢', {
        multiply: multiplyEffects.length,
        add: addEffects.length,
        set: setEffects.length,
        finalModifiers: {
          visitor_count: result.visitor_count,
          stay_rate: result.stay_rate,
          sales: result.sales,
          revenue: result.revenue
        }
      });
    }
    
    return result;
  }
  
  /**
   * 套用單一效果到銷售資料
   * @private
   */
  function applyEffect(salesData, effect) {
    const target = effect.target;
    const modifier = effect.modifier;
    const value = effect.value;
    const scope = effect.scope;
    
    // 確保目標屬性存在
    if (salesData[target] === undefined) {
      // 處理作品特定的效果
      if (scope === 'random_work' && salesData.affectedWorks) {
        applyWorkSpecificEffect(salesData, target, modifier, value);
        return;
      }
      
      // 初始化預設值
      switch (target) {
        case 'visitor_count':
          salesData.visitor_count = 1;
          break;
        case 'stay_rate':
          salesData.stay_rate = 1;
          break;
        case 'sales':
          salesData.sales = 1;
          break;
        case 'revenue':
          salesData.revenue = 1;
          break;
        case 'session_time':
          salesData.session_time = 1;
          break;
        case 'bad_customer_rate':
          salesData.bad_customer_rate = 0;
          break;
        default:
          salesData[target] = 0;
      }
    }
    
    // 套用效果
    switch (modifier) {
      case 'multiply':
        if (typeof salesData[target] === 'number') {
          salesData[target] *= value;
        } else if (Array.isArray(salesData[target])) {
          // 如果是陣列，對每個元素套用乘法
          salesData[target] = salesData[target].map(v => 
            typeof v === 'number' ? v * value : v
          );
        }
        break;
        
      case 'add':
        if (typeof salesData[target] === 'number') {
          salesData[target] += value;
          // 確保不會變成負數（除了特定情況如庫存損失）
          if (target !== 'inventory' && salesData[target] < 0) {
            salesData[target] = 0;
          }
        }
        break;
        
      case 'set':
        salesData[target] = value;
        break;
    }
  }
  
  /**
   * 套用作品特定效果
   * @private
   */
  function applyWorkSpecificEffect(salesData, target, modifier, value) {
    if (!salesData.affectedWorks || salesData.affectedWorks.length === 0) {
      return;
    }
    
    // 選擇受影響的作品
    const affectedWork = salesData.affectedWorks[0];
    
    if (affectedWork && affectedWork[target] !== undefined) {
      switch (modifier) {
        case 'multiply':
          affectedWork[target] *= value;
          break;
        case 'add':
          affectedWork[target] += value;
          break;
        case 'set':
          affectedWork[target] = value;
          break;
      }
    }
  }
  
  /**
   * 發送事件觸發的自訂事件
   * @private
   */
  function dispatchEventTriggered(event) {
    try {
      const customEvent = new CustomEvent('event:triggered', {
        detail: {
          event: event,
          affectedWork: null
        }
      });
      document.dispatchEvent(customEvent);
    } catch (e) {
      // 如果 CustomEvent 不支援，靜默處理
    }
  }
  
  /**
   * 發送事件通知的自訂事件
   */
  function dispatchNotification(notification) {
    try {
      const customEvent = new CustomEvent('event:notification', {
        detail: notification
      });
      document.dispatchEvent(customEvent);
    } catch (e) {
      // 如果 CustomEvent 不支援，靜默處理
    }
  }
  
  // === 公開 API ===
  return {
    init: init,
    getEventPool: getEventPool,
    rollSessionEvents: rollSessionEvents,
    selectRandomWork: selectRandomWork,
    getEventNotification: getEventNotification,
    applyEventEffects: applyEventEffects,
    dispatchNotification: dispatchNotification
  };
  
})();

// 如果在瀏覽器環境，將模組掛載到 window
if (typeof window !== 'undefined') {
  window.EventSystem = EventSystem;
}
