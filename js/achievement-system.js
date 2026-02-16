/**
 * Achievement System Module
 *
 * 成就系統 — 隱藏成就列表，達成條件時觸發並記錄
 * 使用獨立 localStorage key，即使破產/重新遊戲也會保留
 */

const AchievementSystem = (function() {
  'use strict';

  // === 常數 ===
  const STORAGE_KEY = 'doujinSim_achievements_v1';
  const ACHIEVEMENT_VERSION = 1;

  // === 分類名稱映射 ===
  const CATEGORY_NAMES = {
    beginner: '新手', financial: '財務', mastery: '創作',
    upgrade: '升級', social: '社群', challenge: '挑戰', meta: 'Meta',
    bankruptcy: '破產', pricing: '售價', volume: '數量',
    stale: '過氣', niche: '冷門', production: '印刷',
    publishing: '出版', advanced: '進階',
    convention: '場次', members: '社團成員'
  };

  // === 分類顯示順序 ===
  const CATEGORY_ORDER = [
    'beginner', 'financial', 'mastery', 'upgrade', 'social',
    'convention', 'members',
    'publishing', 'production', 'volume', 'pricing', 'niche',
    'stale', 'bankruptcy', 'challenge', 'advanced', 'meta'
  ];

  // === 內部狀態 ===
  let _initialized = false;
  let _state = {
    version: ACHIEVEMENT_VERSION,
    unlocked: {},
    stats: {
      totalGamesPlayed: 0,
      totalGameOvers: 0
    }
  };
  let _sessionTracking = {};
  let _notificationQueue = [];
  let _isShowingNotification = false;

  // === 成就定義 ===
  const ACHIEVEMENTS = [
    // A. 新手里程碑
    { id: 'first_draft', name: '初心者之筆', desc: '完成了第一份草稿', category: 'beginner', icon: '✏️' },
    { id: 'first_publication', name: '出道作', desc: '出版了第一本同人誌', category: 'beginner', icon: '📖' },
    { id: 'first_sale', name: '開張大吉', desc: '第一次場次有售出記錄', category: 'beginner', icon: '💰' },
    { id: 'first_profit', name: '初嚐甜頭', desc: '第一次場次利潤為正數', category: 'beginner', icon: '📈' },

    // B. 財務里程碑
    { id: 'money_50k', name: '小有積蓄', desc: '累積資金達到 $50,000', category: 'financial', icon: '💵' },
    { id: 'money_200k', name: '中產社團', desc: '累積資金達到 $200,000', category: 'financial', icon: '💎' },
    { id: 'money_500k', name: '大手之路', desc: '累積資金達到 $500,000', category: 'financial', icon: '🏆' },
    { id: 'money_1m', name: '百萬社團', desc: '累積資金達到 $1,000,000', category: 'financial', icon: '👑' },
    { id: 'money_5m', name: '房屋頭期款', desc: '累積資金達到 $5,000,000', category: 'financial', icon: '🏠' },
    { id: 'money_10m', name: '陶朱隱園的廁所', desc: '累積資金達到 $10,000,000', category: 'financial', icon: '🚽' },
    { id: 'goal_reached', name: '台積電之夢', desc: '達成遊戲目標', category: 'financial', icon: '🎊' },

    // C. 創作精通
    { id: 'essence_max', name: '作品達人', desc: '將理解度提升到 10 級', category: 'mastery', icon: '🔬' },
    { id: 'audience_max', name: '市場之眼', desc: '將調研等級提升到 10 級', category: 'mastery', icon: '👁️' },
    { id: 'r18_publish', name: '禁忌之書', desc: '出版了第一本 R18 刊物', category: 'mastery', icon: '🔞' },
    { id: 'soldout', name: '完售達成', desc: '場次結束時全部售罄', category: 'mastery', icon: '🔥' },
    { id: 'multi_franchise', name: '跨界作家', desc: '同時擁有3個不同作品的出版物', category: 'mastery', icon: '🌟' },

    // D. 升級里程碑
    { id: 'first_upgrade', name: '社團成長', desc: '購買了第一個升級', category: 'upgrade', icon: '⬆️' },
    { id: 'max_upgrade', name: '登峰造極', desc: '將任一升級升到最高等級', category: 'upgrade', icon: '🏔️' },
    { id: 'writing_10', name: '文豪', desc: '提升文筆到 10 級', category: 'upgrade', icon: '🖊️' },

    // E. 社群
    { id: 'platform_all', name: '全平台制霸', desc: '瀏覽過所有三個社群平台', category: 'social', icon: '📱' },
    { id: 'events_3', name: '多事之秋', desc: '單場次觸發 3 個以上事件', category: 'social', icon: '🎲' },

    // F. 挑戰 / 隱藏
    { id: 'big_loss', name: '血本無歸', desc: '單場次虧損超過 $10,000', category: 'challenge', icon: '💸' },
    { id: 'whale_hunter', name: '大佬收割機', desc: '單場次營收超過 $100,000', category: 'challenge', icon: '🐋' },
    { id: 'survivor_20', name: '老兵不死', desc: '存活超過 20 回合', category: 'challenge', icon: '🎖️' },
    { id: 'debt_master', name: '負債經營', desc: '在有負債時達成盈利', category: 'challenge', icon: '🏦' },

    // G. Meta
    { id: 'game_over', name: '東山再起', desc: '經歷了第一次破產', category: 'meta', icon: '💀' },
    { id: 'restart_after_over', name: '不屈不撓', desc: '破產後重新開始遊戲', category: 'meta', icon: '🔄' },

    // ──────── 以下為 V2 新增成就 ────────

    // H. 破產系
    { id: 'broke_5k', name: '入不敷出', desc: '場次結束後資金不足 $5,000', category: 'bankruptcy', icon: '😰' },
    { id: 'exact_zero', name: '精準破產', desc: '場次結束後資金剛好是 $0', category: 'bankruptcy', icon: '🎯', hidden: true,
      hint: '精確到令人難以置信的財務結算',
      reward: { type: 'startingMoney', value: 1, desc: '你的財務計算能力令人發指。起始資金 +$1' } },
    { id: 'triple_gameover', name: '屢敗屢戰', desc: '累計破產 3 次', category: 'bankruptcy', icon: '🔁',
      reward: { type: 'storageCostReduction', value: 0.05, desc: '三次破產的經驗讓你更懂得省錢。倉儲成本 -5%' } },

    // I. 售價系
    { id: 'budget_seller', name: '薄利多銷', desc: '售價 $200 以下的刊物單場賣出 50 本', category: 'pricing', icon: '🏷️' },
    { id: 'luxury_seller', name: '精品路線', desc: '售價 $1,000 以上的刊物單場賣出 20 本', category: 'pricing', icon: '💎' },

    // J. 數量系
    { id: 'sales_100', name: '人氣攤位', desc: '單場賣出超過 100 本', category: 'volume', icon: '📊' },
    { id: 'sales_500', name: '長蛇陣', desc: '單場賣出超過 500 本', category: 'volume', icon: '🐍' },
    { id: 'total_sales_1k', name: '千本達成', desc: '累計賣出超過 1,000 本', category: 'volume', icon: '📚' },

    // K. 過氣系
    { id: 'stale_5', name: '壓箱寶', desc: '持有存放超過 5 回合仍有庫存的刊物', category: 'stale', icon: '📦' },
    { id: 'honmonogatari', name: '本物語', desc: '持有 11 回合以上完全未售出的刊物...', category: 'stale', icon: '📕', hidden: true,
      hint: '被遺忘在角落的作品，也許有自己的故事...',
      reward: { type: 'midGameTrigger', desc: '我不是神秘美少女，我是你寫的本子。Coser 等級 +1，最大等級 +1' } },

    // L. 冷門系
    { id: 'niche_profit', name: '慧眼識珠', desc: '販賣人氣低於 30 的作品且場次盈利', category: 'niche', icon: '🔮',
      reward: { type: 'cosmetic', desc: '你對冷門作品的直覺越來越準了 🔮' } },
    { id: 'hipster', name: '文青社團', desc: '同時持有 3 個人氣低於 40 的不同作品刊物', category: 'niche', icon: '🎭' },

    // M. 印刷/品質系
    { id: 'mass_print', name: '大量生產', desc: '單次印刷超過 1,000 本', category: 'production', icon: '🏭' },
    { id: 'premium_all', name: '極致工藝', desc: '使用大手繪師封面 + 豪華紙出版', category: 'production', icon: '✨' },

    // N. 出版里程碑
    { id: 'pub_10', name: '多產作家', desc: '累計出版 10 本刊物', category: 'publishing', icon: '📝' },
    { id: 'pub_20', name: '量產機器', desc: '累計出版 20 本刊物', category: 'publishing', icon: '⚙️',
      reward: { type: 'printCostReduction', value: 0.05, desc: '和印刷廠混熟了，可以拿到老客戶折扣。印刷成本 -5%' } },

    // O. 進階挑戰
    { id: 'survivor_50', name: '永續經營', desc: '存活超過 50 回合', category: 'advanced', icon: '🏛️',
      reward: { type: 'storageCostReduction', value: 0.10, desc: '你的老家地下室越來越大了。倉儲成本 -10%' } },
    { id: 'all_upgrade_types', name: '全方位社團', desc: '購買過所有 14 種不同的升級', category: 'advanced', icon: '🎪',
      reward: { type: 'bonusAP', value: 1, desc: '萬事俱備的社團效率更高。首回合行動點 +1' } },
    { id: 'writing_15', name: '超級文豪', desc: '文筆提升到 15 級', category: 'advanced', icon: '📜', hidden: true,
      hint: '對文字的追求永無止境',
      reward: { type: 'cosmetic', desc: '不是哥們，有這筆錢怎麼不拿去買房 🏠' } },
    { id: 'phoenix', name: '浴火鳳凰', desc: '破產後在新遊戲中資金達到 $100,000', category: 'advanced', icon: '🔥', hidden: true,
      hint: '從灰燼中重生，比以前更加強大' },

    // P. 收藏品
    { id: 'coll_legendary', name: '傳說降臨', desc: '購入一件傳說品質的收藏品', category: 'advanced', icon: '💎' },
    { id: 'coll_double_profit', name: '翻倍獲利', desc: '賣出價格達買入時兩倍以上的收藏品', category: 'advanced', icon: '📈' },
    { id: 'coll_half_loss', name: '慘賠出場', desc: '賣出價格不到原來買入價格一半的收藏品', category: 'advanced', icon: '📉' },

    // ──────── 以下為 V5 新增成就 ────────

    // Q. 場次系
    { id: 'attend_regional', name: '邁向更大舞台', desc: '在大型同人展參展', category: 'convention', icon: '🏛️' },
    { id: 'attend_comiket', name: 'COMIKET出道', desc: '在Comic Market參展', category: 'convention', icon: '🔥' },
    { id: 'comiket_sellout', name: 'CM完售', desc: '在Comic Market完售所有刊物', category: 'convention', icon: '🎪', hidden: true,
      hint: '在最頂級的舞台上完美謝幕' },

    // R. 社團成員系
    { id: 'first_member', name: '第一位夥伴', desc: '招募了第一位社團成員', category: 'members', icon: '🤝' },
    { id: 'full_roster', name: '人才濟濟', desc: '社團成員達到上限', category: 'members', icon: '👥' },
    { id: 'ssr_pull', name: '金色傳說', desc: '在慶功宴中招募到SSR級成員', category: 'members', icon: '⭐', hidden: true,
      hint: '慶功宴上最閃耀的邂逅' },
    { id: 'banquet_10', name: '宴會常客', desc: '累計舉辦10次慶功宴', category: 'members', icon: '🍻' },
    { id: 'diverse_team', name: '多才多藝', desc: '社團成員覆蓋5種以上不同效果類型', category: 'members', icon: '🎨', hidden: true,
      hint: '組建一支能力互補的夢幻團隊' }
  ];

  // === 階梯獎勵定義（7 階，適配 58 個成就） ===
  const TIERS = [
    { level: 0, name: '新人社團', needed: 0, startingBonusMoney: 0, bonusDescription: '解鎖更多成就以獲得獎勵' },
    { level: 1, name: '嶄露頭角', needed: 5, startingBonusMoney: 500, bonusDescription: '新遊戲起始資金 +$500' },
    { level: 2, name: '小有名氣', needed: 12, startingBonusMoney: 1500, bonusDescription: '新遊戲起始資金 +$1,500' },
    { level: 3, name: '人氣社團', needed: 22, startingBonusMoney: 3000, bonusDescription: '新遊戲起始資金 +$3,000' },
    { level: 4, name: '傳說大手', needed: 33, startingBonusMoney: 5000, bonusDescription: '新遊戲起始資金 +$5,000' },
    { level: 5, name: '同人之神', needed: 42, startingBonusMoney: 8000, bonusDescription: '新遊戲起始資金 +$8,000' },
    { level: 6, name: '永恆傳說', needed: 55, startingBonusMoney: 12000, bonusDescription: '新遊戲起始資金 +$12,000' }
  ];

  // === 核心函數 ===

  function init() {
    if (_initialized) return;
    _load();
    _initialized = true;
    console.log('[AchievementSystem] Initialized,', getUnlockedCount(), '/', ACHIEVEMENTS.length, 'achievements unlocked');
  }

  function _load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var data = JSON.parse(raw);
        if (data.version === ACHIEVEMENT_VERSION) {
          _state = data;
        } else {
          _migrateState(data);
        }
      }
    } catch (e) {
      console.error('[AchievementSystem] Load failed:', e);
    }
  }

  function _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
    } catch (e) {
      console.error('[AchievementSystem] Save failed:', e);
    }
  }

  function _migrateState(oldData) {
    _state.unlocked = oldData.unlocked || {};
    _state.stats = Object.assign({}, _state.stats, oldData.stats || {});
    _state.version = ACHIEVEMENT_VERSION;
    _save();
  }

  /**
   * 嘗試解鎖成就。已解鎖的會跳過。
   * @param {string} achievementId
   * @returns {boolean} true 如果是新解鎖
   */
  function unlock(achievementId) {
    if (!_initialized) init();
    if (_state.unlocked[achievementId]) return false;

    var def = ACHIEVEMENTS.find(function(a) { return a.id === achievementId; });
    if (!def) {
      console.warn('[AchievementSystem] Unknown achievement:', achievementId);
      return false;
    }

    _state.unlocked[achievementId] = {
      unlockedAt: Date.now()
    };
    _save();
    console.log('[AchievementSystem] UNLOCKED:', def.icon, def.name);

    // 發送事件給 UI
    _dispatchUnlockEvent(def);

    return true;
  }

  function isUnlocked(achievementId) {
    return !!_state.unlocked[achievementId];
  }

  function getUnlockedCount() {
    return Object.keys(_state.unlocked).length;
  }

  function getTotalCount() {
    return ACHIEVEMENTS.length;
  }

  function getDefinitions() {
    return ACHIEVEMENTS;
  }

  function getState() {
    return {
      version: _state.version,
      unlocked: Object.assign({}, _state.unlocked),
      stats: Object.assign({}, _state.stats)
    };
  }

  function getCategoryNames() {
    return CATEGORY_NAMES;
  }

  function getCategoryOrder() {
    return CATEGORY_ORDER;
  }

  // === 階梯系統 ===

  function getCurrentTier() {
    var count = getUnlockedCount();
    for (var i = TIERS.length - 1; i >= 0; i--) {
      if (count >= TIERS[i].needed) return TIERS[i];
    }
    return TIERS[0];
  }

  function getNextTier() {
    var count = getUnlockedCount();
    for (var i = 0; i < TIERS.length; i++) {
      if (count < TIERS[i].needed) return TIERS[i];
    }
    return null; // 已達最高
  }

  // === 獎勵系統 ===

  /**
   * 計算所有跨遊戲獎勵（tier + 特定成就獎勵）
   * @returns {{ money: number, storageCostReduction: number, printCostReduction: number, bonusAP: number, descriptions: Array }}
   */
  function getStartingBonuses() {
    if (!_initialized) init();
    var tier = getCurrentTier();
    var bonuses = {
      money: tier.startingBonusMoney,
      storageCostReduction: 0,
      printCostReduction: 0,
      bonusAP: 0,
      tierName: tier.name,
      tierLevel: tier.level,
      descriptions: []
    };

    if (tier.startingBonusMoney > 0) {
      bonuses.descriptions.push({ icon: '🏅', text: tier.bonusDescription });
    }

    ACHIEVEMENTS.forEach(function(def) {
      if (!def.reward || !_state.unlocked[def.id]) return;
      if (def.reward.type === 'midGameTrigger' || def.reward.type === 'cosmetic') return;

      switch (def.reward.type) {
        case 'startingMoney':
          bonuses.money += def.reward.value;
          break;
        case 'storageCostReduction':
          bonuses.storageCostReduction += def.reward.value;
          break;
        case 'printCostReduction':
          bonuses.printCostReduction += def.reward.value;
          break;
        case 'bonusAP':
          bonuses.bonusAP += def.reward.value;
          break;
      }
      bonuses.descriptions.push({ icon: def.icon, text: def.reward.desc });
    });

    return bonuses;
  }

  // === Check 函數（從各整合點呼叫） ===

  function checkAfterDraftAction(action, draft) {
    if (action === 'write') {
      unlock('first_draft');
    }
    if (action === 'study' && draft && draft.essenceLevel >= 10) {
      unlock('essence_max');
    }
    if (action === 'research' && draft && draft.audienceLevel >= 10) {
      unlock('audience_max');
    }
  }

  function checkAfterPublish(publication, gameState) {
    // 首次出版
    if (gameState.publications.length === 1) {
      unlock('first_publication');
    }
    // R18
    if (publication.isR18) {
      unlock('r18_publish');
    }
    // 出版里程碑
    if (gameState.publications.length >= 10) {
      unlock('pub_10');
    }
    if (gameState.publications.length >= 20) {
      unlock('pub_20');
    }
    // 大量生產
    if (publication.printQuantity >= 1000) {
      unlock('mass_print');
    }
    // 極致工藝
    if (publication.coverArtist === 'premium' && publication.paperQuality === 'luxury') {
      unlock('premium_all');
    }
    // 統計有庫存的不同作品數
    var activeFranchises = {};
    var nicheFranchises = {};
    for (var i = 0; i < gameState.publications.length; i++) {
      var pub = gameState.publications[i];
      var inv = gameState.inventory.find(function(item) { return item.publicationId === pub.id; });
      if (inv && inv.remainingCount > 0) {
        activeFranchises[pub.franchiseId] = true;
        if (pub.popularity < 40) {
          nicheFranchises[pub.franchiseId] = true;
        }
      }
    }
    if (Object.keys(activeFranchises).length >= 3) {
      unlock('multi_franchise');
    }
    // 文青社團：3 個人氣 < 40 的不同作品
    if (Object.keys(nicheFranchises).length >= 3) {
      unlock('hipster');
    }
  }

  function checkAfterResults(results, profit, totalSold, totalRemaining, gameState) {
    // 首次銷售
    if (totalSold > 0 && gameState.history.length <= 1) {
      unlock('first_sale');
    }
    // 首次盈利
    if (profit > 0) {
      var hadProfitBefore = false;
      for (var i = 0; i < gameState.history.length - 1; i++) {
        if (gameState.history[i].profit > 0) {
          hadProfitBefore = true;
          break;
        }
      }
      if (!hadProfitBefore) {
        unlock('first_profit');
      }
    }
    // 財務里程碑
    if (gameState.money >= 50000) unlock('money_50k');
    if (gameState.money >= 200000) unlock('money_200k');
    if (gameState.money >= 500000) unlock('money_500k');
    if (gameState.money >= 1000000) unlock('money_1m');
    if (gameState.money >= 5000000) unlock('money_5m');
    if (gameState.money >= 10000000) unlock('money_10m');
    // 完售
    if (totalRemaining === 0 && totalSold > 0) {
      unlock('soldout');
      // CM完售
      if (gameState.selectedConventionTier === 'comiket') {
        unlock('comiket_sellout');
      }
    }
    // 血本無歸
    if (profit < -10000) {
      unlock('big_loss');
    }
    // 大佬收割機
    if (results.totalRevenue >= 100000) {
      unlock('whale_hunter');
    }
    // 負債經營
    if ((gameState.debt || 0) > 0 && profit > 0) {
      unlock('debt_master');
    }

    // ── V2 新增檢查 ──

    // 破產系
    if (gameState.money < 5000 && gameState.money >= 0) {
      unlock('broke_5k');
    }
    if (gameState.money === 0) {
      unlock('exact_zero');
    }

    // 數量系
    if (totalSold >= 100) unlock('sales_100');
    if (totalSold >= 500) unlock('sales_500');
    // 累計銷量
    var cumulativeSales = 0;
    for (var j = 0; j < gameState.history.length; j++) {
      cumulativeSales += (gameState.history[j].unitsSold || 0);
    }
    if (cumulativeSales >= 1000) unlock('total_sales_1k');

    // 售價系：遍歷每個刊物的銷量
    if (results.itemSales) {
      var pubIds = Object.keys(results.itemSales);
      for (var k = 0; k < pubIds.length; k++) {
        var pubId = pubIds[k];
        var sales = results.itemSales[pubId];
        var pub = gameState.publications.find(function(p) { return p.id === pubId; });
        if (!pub || !sales) continue;

        if (pub.retailPrice <= 200 && sales.sold >= 50) {
          unlock('budget_seller');
        }
        if (pub.retailPrice >= 1000 && sales.sold >= 20) {
          unlock('luxury_seller');
        }
        // 冷門系：販賣人氣 < 30 的作品且場次盈利
        if (pub.popularity < 30 && sales.sold > 0 && profit > 0) {
          unlock('niche_profit');
        }
      }
    }

    // 浴火鳳凰：曾破產且這一盤資金達到 $100,000
    if (_state.stats.totalGameOvers > 0 && gameState.money >= 100000) {
      unlock('phoenix');
    }
  }

  function checkAfterGoalReached() {
    unlock('goal_reached');
  }

  function checkAfterUpgrade(upgradeId, newLevel) {
    unlock('first_upgrade');
    if (upgradeId === 'writing' && newLevel >= 10) {
      unlock('writing_10');
    }
    // 超級文豪
    if (upgradeId === 'writing' && newLevel >= 15) {
      unlock('writing_15');
    }
    // 追蹤已購買的升級類型（持久化到 _state，避免重整網頁遺失）
    if (!_state.stats.upgradesPurchased) {
      _state.stats.upgradesPurchased = {};
    }
    _state.stats.upgradesPurchased[upgradeId] = true;
    _save();
    if (Object.keys(_state.stats.upgradesPurchased).length >= 14) {
      unlock('all_upgrade_types');
    }
  }

  function checkAfterMaxUpgrade() {
    unlock('max_upgrade');
  }

  function checkAfterConventionEvents(triggeredEventsCount) {
    if (triggeredEventsCount >= 3) {
      unlock('events_3');
    }
  }

  function checkPlatformVisit(platformId) {
    if (!_sessionTracking.platformsVisited) {
      _sessionTracking.platformsVisited = {};
    }
    _sessionTracking.platformsVisited[platformId] = true;
    if (Object.keys(_sessionTracking.platformsVisited).length >= 3) {
      unlock('platform_all');
    }
  }

  function checkRoundAdvance(round) {
    if (round >= 20) {
      unlock('survivor_20');
    }
    if (round >= 50) {
      unlock('survivor_50');
    }
  }

  function checkAfterCollectiblePurchase(collectible) {
    if (collectible && collectible.rarity === 'legendary') {
      unlock('coll_legendary');
    }
  }

  function checkAfterCollectibleSell(purchasePrice, sellPrice) {
    if (purchasePrice > 0 && sellPrice >= purchasePrice * 2) {
      unlock('coll_double_profit');
    }
    if (purchasePrice > 0 && sellPrice < purchasePrice * 0.5) {
      unlock('coll_half_loss');
    }
  }

  function checkGameOver() {
    unlock('game_over');
    _state.stats.totalGameOvers++;
    _save();
    // 屢敗屢戰
    if (_state.stats.totalGameOvers >= 3) {
      unlock('triple_gameover');
    }
  }

  function checkNewGameStart() {
    if (isUnlocked('game_over')) {
      unlock('restart_after_over');
    }
    _state.stats.totalGamesPlayed++;
    _state.stats.upgradesPurchased = {};
    _sessionTracking = {};
    _save();
  }

  /**
   * 檢查庫存老化（壓箱寶 + 本物語觸發）
   * 在 proceedToNextRound() 中呼叫
   * @param {object} gameState
   * @returns {{ honmonogatariTriggered: boolean, destroyedPub: object|null }}
   */
  function checkInventoryAging(gameState) {
    var result = { honmonogatariTriggered: false, destroyedPub: null };

    for (var i = gameState.inventory.length - 1; i >= 0; i--) {
      var inv = gameState.inventory[i];
      var pub = gameState.publications.find(function(p) { return p.id === inv.publicationId; });
      if (!pub) continue;

      var age = gameState.round - pub.createdRound;

      // 壓箱寶：存放超過 5 回合
      if (age >= 5 && inv.remainingCount > 0) {
        unlock('stale_5');
      }

      // 本物語：11 回合以上且完全未售出（一場遊戲只觸發一次）
      if (age >= 11 && inv.remainingCount === pub.printQuantity && !isUnlocked('honmonogatari')) {
        // 記錄被銷毀的刊物資訊
        result.destroyedPub = {
          title: pub.title,
          printQuantity: pub.printQuantity,
          franchiseId: pub.franchiseId
        };
        // 自毀：移除庫存（僅首次觸發時銷毀）
        gameState.inventory.splice(i, 1);
        result.honmonogatariTriggered = unlock('honmonogatari');
        break; // 一次只觸發一本
      }
    }

    return result;
  }

  // === V5 新增 Check 函數 ===

  /**
   * 場次開始時檢查（在 startConvention 中呼叫）
   * @param {string} tierId - 場次等級 ID ('local', 'regional', 'comiket')
   */
  function checkAfterConventionStart(tierId) {
    if (tierId === 'regional') unlock('attend_regional');
    if (tierId === 'comiket') unlock('attend_comiket');
  }

  /**
   * 慶功宴招募後檢查
   * @param {object} result - 抽卡結果 { memberId, rarity, isDuplicate }
   * @param {object} gameState - 遊戲狀態
   */
  function checkAfterBanquet(result, gameState) {
    // 累計慶功宴次數
    if (!_state.stats.totalBanquets) _state.stats.totalBanquets = 0;
    _state.stats.totalBanquets++;
    _save();

    if (_state.stats.totalBanquets >= 10) {
      unlock('banquet_10');
    }

    if (!result.isDuplicate) {
      // 第一位夥伴
      if (gameState.members && gameState.members.length === 1) {
        unlock('first_member');
      }
      // SSR
      if (result.rarity === 'SSR') {
        unlock('ssr_pull');
      }
    }

    // 人才濟濟：成員達到上限
    if (gameState.members && gameState.members.length > 0) {
      var memberSlotLimit = 0;
      if (typeof UpgradeSystem !== 'undefined') {
        var clubSpaceEffect = UpgradeSystem.getEffect('clubSpace');
        memberSlotLimit = clubSpaceEffect.memberSlots || 0;
      }
      if (memberSlotLimit > 0 && gameState.members.length >= memberSlotLimit) {
        unlock('full_roster');
      }
    }

    // 多才多藝：覆蓋 5 種以上不同效果類型
    if (gameState.members && gameState.members.length >= 3) {
      var effectTypes = {};
      var memberDefs = (typeof BalanceConfig !== 'undefined') ? BalanceConfig.MEMBER_DEFINITIONS : [];
      for (var i = 0; i < gameState.members.length; i++) {
        var mDef = memberDefs.find(function(d) { return d.id === gameState.members[i].id; });
        if (mDef && mDef.effects) {
          var keys = Object.keys(mDef.effects);
          for (var j = 0; j < keys.length; j++) {
            effectTypes[keys[j]] = true;
          }
        }
      }
      if (Object.keys(effectTypes).length >= 5) {
        unlock('diverse_team');
      }
    }
  }

  // === 事件分發 ===

  function _dispatchUnlockEvent(def) {
    try {
      document.dispatchEvent(new CustomEvent('achievement:unlocked', {
        detail: {
          id: def.id, name: def.name, desc: def.desc,
          icon: def.icon, category: def.category,
          reward: def.reward || null
        }
      }));
    } catch (e) { /* silent */ }
  }

  /**
   * 載入存檔後修復 upgradesPurchased 追蹤（回補舊存檔缺失的資料）
   * @param {object} gameState - GameState 物件
   */
  function repairUpgradeTracking(gameState) {
    if (!_initialized) init();
    if (!gameState || !gameState.circle || !gameState.circle.upgrades) return;
    if (!_state.stats.upgradesPurchased) {
      _state.stats.upgradesPurchased = {};
    }
    var upgrades = gameState.circle.upgrades;
    var changed = false;
    for (var key in upgrades) {
      if (upgrades[key] > 0 && !_state.stats.upgradesPurchased[key]) {
        _state.stats.upgradesPurchased[key] = true;
        changed = true;
      }
    }
    if (changed) {
      _save();
      if (Object.keys(_state.stats.upgradesPurchased).length >= 14) {
        unlock('all_upgrade_types');
      }
    }
  }

  // === 公開 API ===
  return {
    init: init,
    unlock: unlock,
    isUnlocked: isUnlocked,
    getUnlockedCount: getUnlockedCount,
    getTotalCount: getTotalCount,
    getDefinitions: getDefinitions,
    getState: getState,
    getCategoryNames: getCategoryNames,
    getCategoryOrder: getCategoryOrder,
    getCurrentTier: getCurrentTier,
    getNextTier: getNextTier,
    getStartingBonuses: getStartingBonuses,
    // Check 函數
    checkAfterDraftAction: checkAfterDraftAction,
    checkAfterPublish: checkAfterPublish,
    checkAfterResults: checkAfterResults,
    checkAfterGoalReached: checkAfterGoalReached,
    checkAfterUpgrade: checkAfterUpgrade,
    checkAfterMaxUpgrade: checkAfterMaxUpgrade,
    checkAfterConventionEvents: checkAfterConventionEvents,
    checkPlatformVisit: checkPlatformVisit,
    checkRoundAdvance: checkRoundAdvance,
    checkGameOver: checkGameOver,
    checkNewGameStart: checkNewGameStart,
    checkInventoryAging: checkInventoryAging,
    checkAfterCollectiblePurchase: checkAfterCollectiblePurchase,
    checkAfterCollectibleSell: checkAfterCollectibleSell,
    checkAfterConventionStart: checkAfterConventionStart,
    checkAfterBanquet: checkAfterBanquet,
    repairUpgradeTracking: repairUpgradeTracking
  };
})();

// 導出（支援多種環境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AchievementSystem;
} else if (typeof window !== 'undefined') {
  window.AchievementSystem = AchievementSystem;
}
