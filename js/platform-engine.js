/**
 * Platform Engine Module (V3)
 *
 * 處理多平台社群 Feed 的生成、互動數值計算、社群事件系統
 *
 * 依賴:
 * - BalanceConfig.PLATFORM_CONFIG
 * - BalanceConfig.TAG_BIASES
 * - BalanceConfig.SOCIAL_FEED
 * - BalanceConfig.PDB_THRESHOLD
 * - ContentTemplates.PostTemplates
 * - ContentTemplates.Dictionary
 * - ContentTemplates.VoiceTemplates
 * - ContentTemplates.SocialEventPool
 * - ContentTemplates.PlatformWrappers
 */

const PlatformEngine = (function() {
  'use strict';

  // ── 內部狀態 ──
  let _config = null;       // PLATFORM_CONFIG
  let _tagBiases = null;    // TAG_BIASES
  let _feedConfig = null;   // SOCIAL_FEED
  let _pdbThreshold = null; // PDB_THRESHOLD
  let _initialized = false;
  let _platformFeeds = {};  // { FEETBOOK: Post[], Y: Post[], THREECH: Post[] }
  let _rng = Math.random;   // 當前使用的 RNG 函數（可由外部傳入）

  // ── 內部工具函數 ──

  /** Mulberry32 PRNG (與主程式相同實作) */
  function seededRandom(seed) {
    return function() {
      var t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function pickRandom(array, rng) {
    if (!rng) rng = Math.random;
    return array[Math.floor(rng() * array.length)];
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  /** 計算 franchise tags 的平均 bias 值 */
  function getAvgTagBias(tags, biasKey) {
    if (!tags || tags.length === 0 || !_tagBiases) return 0;
    var total = 0;
    var count = 0;
    for (var i = 0; i < tags.length; i++) {
      var bias = _tagBiases[tags[i]];
      if (bias && typeof bias[biasKey] === 'number') {
        total += bias[biasKey];
        count++;
      }
    }
    return count > 0 ? total / count : 0;
  }

  /**
   * 基於 P/D/B 計算粉絲類型分布（複製自主程式邏輯）
   * 用於與平台 audienceMix 混合
   */
  function getFranchiseFanDist(franchise) {
    var P = franchise.popularity;
    var D = franchise.audienceDensity;
    var B = franchise.purchasingPower;
    var HIGH_P = _pdbThreshold.HIGH_P;
    var HIGH_D = _pdbThreshold.HIGH_D;
    var HIGH_B = _pdbThreshold.HIGH_B;

    var dist = {
      ENTHUSIAST: 0.15, CASUAL: 0.25, CRITIC: 0.10, MEMER: 0.15,
      LURKER: 0.15, WHALE: 0.05, COLLECTOR: 0.05, HATER: 0.10
    };

    if (P > HIGH_P) {
      dist.CASUAL += 0.10; dist.MEMER += 0.10;
      dist.HATER += 0.05; dist.ENTHUSIAST -= 0.05;
    }
    if (D > HIGH_D) {
      dist.ENTHUSIAST += 0.15; dist.COLLECTOR += 0.05; dist.CASUAL -= 0.10;
    }
    if (B > HIGH_B) {
      dist.WHALE += 0.10; dist.COLLECTOR += 0.05; dist.CASUAL -= 0.10;
    }

    var total = 0;
    var keys = Object.keys(dist);
    for (var i = 0; i < keys.length; i++) total += dist[keys[i]];
    for (var j = 0; j < keys.length; j++) {
      dist[keys[j]] = Math.max(0.01, dist[keys[j]] / total);
    }
    return dist;
  }

  // ── 初始化 ──

  function init() {
    if (_initialized) return;

    if (typeof BalanceConfig === 'undefined') {
      console.error('[PlatformEngine] BalanceConfig not found');
      return;
    }
    if (typeof ContentTemplates === 'undefined') {
      console.error('[PlatformEngine] ContentTemplates not found');
      return;
    }

    _config = BalanceConfig.PLATFORM_CONFIG;
    _tagBiases = BalanceConfig.TAG_BIASES;
    _feedConfig = BalanceConfig.SOCIAL_FEED;
    _pdbThreshold = BalanceConfig.PDB_THRESHOLD;

    if (!_config || !_tagBiases || !_feedConfig) {
      console.error('[PlatformEngine] Missing config sections');
      return;
    }

    _platformFeeds = {};
    _initialized = true;
    console.log('[PlatformEngine] Initialized with platforms:', Object.keys(_config).join(', '));
  }

  // ── 貼文數量計算 ──

  /**
   * 計算一個作品在某平台的貼文數量
   * 公式: floor(basePostCount × (P/100) × A × exposureBiasMultiplier × noise)
   */
  function calculatePostCount(franchise, platformConfig) {
    var P = franchise.popularity;
    var A = franchise.audienceActivity;
    var base = platformConfig.basePostCount;

    // 根據平台偏好計算曝光偏置倍率
    var biasMultiplier = 1.0;
    switch (platformConfig.exposureBias) {
      case 'popularity':
        biasMultiplier = P / 50; // P=50 → 1.0, P=100 → 2.0
        break;
      case 'trending':
        biasMultiplier = 1.0 + getAvgTagBias(franchise.tags, 'viralTagBonus');
        break;
      case 'controversial':
        biasMultiplier = 1.0 + getAvgTagBias(franchise.tags, 'dramaTagBonus');
        break;
    }

    var noise = 0.8 + _rng() * 0.4; // 0.8 ~ 1.2
    var count = Math.floor(base * (P / 100) * A * biasMultiplier * noise);
    return Math.max(1, count); // 至少 1 則
  }

  // ── 粉絲類型選擇 ──

  /**
   * 混合平台 audienceMix (60%) 與作品 fanDist (40%) 選出 fanType
   */
  function selectFanType(platformConfig, franchise) {
    var platformMix = platformConfig.audienceMix;
    var franchiseDist = getFranchiseFanDist(franchise);
    var blended = {};

    var types = Object.keys(platformMix);
    var total = 0;
    for (var i = 0; i < types.length; i++) {
      var t = types[i];
      blended[t] = (platformMix[t] || 0) * 0.6 + (franchiseDist[t] || 0) * 0.4;
      total += blended[t];
    }

    // 正規化後加權隨機
    var r = _rng() * total;
    var cumulative = 0;
    for (var j = 0; j < types.length; j++) {
      cumulative += blended[types[j]];
      if (r <= cumulative) return types[j];
    }
    return 'CASUAL';
  }

  // ── 內容層生成 ──

  /**
   * 生成貼文內容（Content 層）
   * 15% 機率使用聲線模板，85% 使用 fanType 模板
   */
  // 回覆/追加反應語料（用於組合出更豐富的貼文）
  var _reactionSuffixes = {
    ENTHUSIAST: [
      '\n\n說真的推薦所有人去看，不會後悔的',
      '\n\n已經二刷了，第二遍看細節更多',
      '\n\n今年目前最喜歡的作品，沒有之一'
    ],
    CASUAL: [
      '\n\n話說大家還有什麼推薦嗎',
      '\n\n嗯 看完就看完了',
      '\n\n補到一半覺得還好 不知道後面怎樣'
    ],
    CRITIC: [
      '\n\n不過整體來說還是差強人意',
      '\n\n希望製作組能正視這些問題',
      '\n\n只能說期待和現實差距太大'
    ],
    MEMER: [
      '\n\nwwwwwww',
      '\n\n救命 我笑到室友以為我瘋了',
      '\n\n已存入梗圖資料庫.jpg'
    ],
    HATER: [
      '\n\n反正再怎麼吹也改變不了爛的事實',
      '\n\n粉絲濾鏡也太厚了吧',
      '\n\n就這？就這？？'
    ]
  };

  function generateContentLayer(franchise, fanType, seed) {
    var rng = seededRandom(seed);
    var voiceChance = _feedConfig.VOICE_TEMPLATE_CHANCE || 0.15;
    var isVoice = false;
    var voiceType = null;
    var template;

    var VoiceTemplates = ContentTemplates.VoiceTemplates;
    var PostTemplates = ContentTemplates.PostTemplates;
    var Dictionary = ContentTemplates.Dictionary;

    if (VoiceTemplates && rng() < voiceChance) {
      // 聲線模板
      var voiceKeys = Object.keys(VoiceTemplates);
      var voiceKey = pickRandom(voiceKeys, rng);
      var voice = VoiceTemplates[voiceKey];
      template = pickRandom(voice.templates, rng);
      isVoice = true;
      voiceType = voice.name;
    } else {
      // fanType 模板
      var templates = PostTemplates[fanType];
      if (!templates || templates.length === 0) {
        templates = PostTemplates.CASUAL;
      }
      template = pickRandom(templates, rng);
    }

    // 替換佔位符（支援多次出現）
    template = template.replace(/【franchise】/g, franchise.name);
    if (Dictionary.character) template = template.replace(/【character】/g, pickRandom(Dictionary.character, rng));
    if (Dictionary.highlight) template = template.replace(/【highlight】/g, pickRandom(Dictionary.highlight, rng));
    if (Dictionary.meme) template = template.replace(/【meme】/g, pickRandom(Dictionary.meme, rng));
    template = template.replace(/【criticism】/g, '這種安排很明顯是趕工');

    // 40% 機率追加反應語句，讓貼文更豐富（LURKER 除外）
    if (!isVoice && fanType !== 'LURKER' && rng() < 0.4) {
      var suffixes = _reactionSuffixes[fanType];
      if (suffixes && suffixes.length > 0) {
        template += pickRandom(suffixes, rng);
      }
    }

    return { text: template, isVoice: isVoice, voiceType: voiceType };
  }

  // ── Engagement 計算 ──

  /**
   * 計算貼文互動數值
   */
  function calculateEngagement(franchise, fanType, platformId, tags) {
    var platform = _config[platformId];
    if (!platform) return {};

    var baseFactor = _feedConfig.ENGAGEMENT_BASE_MULTIPLIER || 10;
    var base = franchise.popularity * baseFactor / 10;

    var positiveBias = getAvgTagBias(tags, 'positiveBias');
    var viralTagBonus = getAvgTagBias(tags, 'viralTagBonus');
    var dramaTagBonus = getAvgTagBias(tags, 'dramaTagBonus');
    var toxicity = platform.toxicity || 0;

    var engagement = {};
    var metrics = platform.engagementMetrics || [];

    for (var i = 0; i < metrics.length; i++) {
      var metric = metrics[i];
      var noise;
      switch (metric) {
        case 'likes':
          noise = 0.5 + _rng() * 1.0;
          engagement.likes = Math.floor(base * (1 + positiveBias) * noise);
          break;
        case 'comments':
          noise = 0.3 + _rng() * 1.7;
          engagement.comments = Math.floor(base * (0.3 + toxicity) * (1 + dramaTagBonus) * noise);
          break;
        case 'shares':
          noise = 0.2 + _rng() * 0.8;
          engagement.shares = Math.floor(base * (0.2 + viralTagBonus) * noise);
          break;
        case 'retweets':
          noise = 0.3 + _rng() * 1.2;
          engagement.retweets = Math.floor(base * (0.3 + viralTagBonus) * noise);
          break;
        case 'replies':
          noise = 0.5 + _rng() * 1.5;
          engagement.replies = Math.floor(base * toxicity * 2 * noise);
          break;
        case 'thread_speed':
          noise = 0.3 + _rng() * 1.2;
          engagement.thread_speed = Math.floor(base * franchise.audienceActivity * noise);
          break;
      }
    }

    // 所有指標至少為 0
    var keys = Object.keys(engagement);
    for (var j = 0; j < keys.length; j++) {
      engagement[keys[j]] = Math.max(0, engagement[keys[j]]);
    }

    return engagement;
  }

  // ── Wrapper 層 ──

  /**
   * 用平台包裝模板格式化貼文
   */
  function applyWrapperLayer(platformId, contentResult, franchise, engagement, fanType) {
    var Wrappers = ContentTemplates.PlatformWrappers;
    if (!Wrappers || !Wrappers[platformId]) {
      return { format: 'plain', body: contentResult.text, footer: '', engagementDisplay: '' };
    }
    return Wrappers[platformId].postWrapper(contentResult.text, franchise, engagement, fanType);
  }

  // ── 用戶名生成 ──

  function generateUsername(platformId, fanType, seed) {
    var rng = seededRandom(seed);
    var Dictionary = ContentTemplates.Dictionary;

    if (platformId === 'THREECH') {
      var Wrappers = ContentTemplates.PlatformWrappers;
      var anonNames = (Wrappers && Wrappers.THREECH && Wrappers.THREECH.anonNameTemplates)
        ? Wrappers.THREECH.anonNameTemplates
        : ['名無しさん'];
      return { username: null, anonName: pickRandom(anonNames, rng) };
    }

    var suffixes = ['推', '粉', '黨', '廚', '控', '狂', '迷'];
    var prefixes = ['小', '大', '超級', '終極', '專業', '業餘', '隱藏'];
    var role = Dictionary.role ? pickRandom(Dictionary.role, rng) : '路人';
    var username = role + pickRandom(prefixes, rng) + pickRandom(suffixes, rng);

    return { username: username, anonName: null };
  }

  // ── 時間戳記生成 ──

  function generateTimestamp(seed) {
    var rng = seededRandom(seed);
    var units = ['m', 'h', 'd'];
    var maxVals = [59, 23, 7];
    var idx = Math.floor(rng() * 3);
    var val = Math.floor(rng() * maxVals[idx]) + 1;
    return val + units[idx];
  }

  // ── 單平台 Feed 生成 ──

  /**
   * 為單一平台生成完整的 feed
   */
  function generateFeedForPlatform(platformId, franchises, round) {
    if (!_initialized) init();
    var platform = _config[platformId];
    if (!platform) return [];

    var posts = [];
    var baseSeed = Date.now() + round * 10000;

    for (var fi = 0; fi < franchises.length; fi++) {
      var franchise = franchises[fi];
      var postCount = calculatePostCount(franchise, platform);

      for (var pi = 0; pi < postCount; pi++) {
        var seed = baseSeed + fi * 1000 + pi;
        var fanType = selectFanType(platform, franchise);
        var contentResult = generateContentLayer(franchise, fanType, seed);
        var engagement = calculateEngagement(franchise, fanType, platformId, franchise.tags);
        var wrapped = applyWrapperLayer(platformId, contentResult, franchise, engagement, fanType);
        var names = generateUsername(platformId, fanType, seed + 777);
        var timestamp = generateTimestamp(seed + 999);

        posts.push({
          id: 'post_' + generateId(),
          username: names.username,
          anonName: names.anonName,
          franchiseId: franchise.id,
          franchiseName: franchise.name,
          content: contentResult.text,
          wrappedContent: wrapped.body,
          wrappedFooter: wrapped.footer,
          engagementDisplay: wrapped.engagementDisplay,
          fanType: fanType,
          platformId: platformId,
          timestamp: timestamp,
          isVoice: contentResult.isVoice,
          voiceType: contentResult.voiceType,
          isEventTriggered: false,
          eventId: null,
          engagement: engagement
        });
      }
    }

    // 隨機排序模擬時間線（使用 Fisher-Yates）
    for (var si = posts.length - 1; si > 0; si--) {
      var sj = Math.floor(_rng() * (si + 1));
      var tmp = posts[si]; posts[si] = posts[sj]; posts[sj] = tmp;
    }

    // 上限
    var max = _feedConfig.MAX_POSTS_PER_PLATFORM || 100;
    if (posts.length > max) posts = posts.slice(0, max);

    return posts;
  }

  // ── 全平台 Feed 生成（主入口） ──

  function generatePlatformFeeds(franchises, round, options) {
    if (!_initialized) init();
    if (options && options.rng) _rng = options.rng;
    var feeds = {};
    var platformIds = Object.keys(_config);
    for (var i = 0; i < platformIds.length; i++) {
      feeds[platformIds[i]] = generateFeedForPlatform(platformIds[i], franchises, round);
    }
    _platformFeeds = feeds;
    console.log('[PlatformEngine] Generated feeds:',
      platformIds.map(function(id) { return id + '=' + feeds[id].length; }).join(', '));
    return feeds;
  }

  // ── 社群事件系統 ──

  /**
   * 擲骰社群事件（每次 AP 消耗時呼叫）
   * @param {Object[]} franchises - 當前作品列表
   * @param {Object} cooldowns - 社群事件冷卻追蹤 { eventId: cooldownUntilRound }
   * @param {number} round - 當前回合
   * @returns {Array} 觸發的事件列表 [{ event, targetFranchise }]
   */
  function rollSocialEvents(franchises, cooldowns, round, options) {
    if (!_initialized) init();
    if (options && options.rng) _rng = options.rng;
    var pool = ContentTemplates.SocialEventPool;
    if (!pool || pool.length === 0) return [];
    if (!franchises || franchises.length === 0) return [];

    var triggered = [];

    for (var i = 0; i < pool.length; i++) {
      var evt = pool[i];

      // 檢查冷卻
      if (cooldowns[evt.id] && cooldowns[evt.id] > round) continue;

      // 擲骰
      if (_rng() >= evt.probability) continue;

      // 選擇目標作品（以 popularity 加權）
      var totalPop = 0;
      for (var j = 0; j < franchises.length; j++) totalPop += franchises[j].popularity;
      var r = _rng() * totalPop;
      var cum = 0;
      var target = franchises[0];
      for (var k = 0; k < franchises.length; k++) {
        cum += franchises[k].popularity;
        if (r <= cum) { target = franchises[k]; break; }
      }

      // 設定冷卻
      cooldowns[evt.id] = round + (evt.cooldown || 1);

      triggered.push({ event: evt, targetFranchise: target });

      // 每次 AP 最多觸發 1 個社群事件
      break;
    }

    return triggered;
  }

  /**
   * 將社群事件的影響套用到 feed 上（洗版效果）
   * @param {Object} event - SocialEventPool 中的事件物件
   * @param {Object} franchise - 被影響的作品
   */
  /**
   * 從事件專屬模板生成貼文內容
   * @private
   */
  function generateEventContent(event, franchise, seed) {
    var rng = seededRandom(seed);
    var Dictionary = ContentTemplates.Dictionary;

    if (event.eventTemplates && event.eventTemplates.length > 0) {
      var template = pickRandom(event.eventTemplates, rng);
      template = template.replace(/【franchise】/g, franchise.name);
      if (Dictionary.character) template = template.replace(/【character】/g, pickRandom(Dictionary.character, rng));
      if (Dictionary.highlight) template = template.replace(/【highlight】/g, pickRandom(Dictionary.highlight, rng));
      if (Dictionary.meme) template = template.replace(/【meme】/g, pickRandom(Dictionary.meme, rng));
      return { text: template, isVoice: false, voiceType: null };
    }
    // 無事件模板時 fallback 到一般生成
    return generateContentLayer(franchise, 'CASUAL', seed);
  }

  function applySocialEventToFeeds(event, franchise) {
    if (!_initialized) init();
    var platformIds = Object.keys(_config);
    var amplifiers = event.platformAmplifier || {};

    for (var pi = 0; pi < platformIds.length; pi++) {
      var pid = platformIds[pi];
      var feed = _platformFeeds[pid];
      if (!feed) continue;

      var amp = amplifiers[pid] || 1.0;
      var platform = _config[pid];

      // 洗版貼文數：基於平台 amplifier 決定，限制 1~5 則
      var floodCount = Math.max(1, Math.min(Math.round(amp * 2), 5));

      var baseSeed = Date.now() + pi * 5000;
      var newPosts = [];

      for (var i = 0; i < floodCount; i++) {
        var seed = baseSeed + i;
        var fanType = selectFanType(platform, franchise);

        // 事件 contentHook 偏置 fanType
        if (event.contentHook === 'controversy' || event.contentHook === 'drama') {
          if (_rng() < 0.5) fanType = _rng() < 0.5 ? 'CRITIC' : 'HATER';
        } else if (event.contentHook === 'viral' || event.contentHook === 'meme') {
          if (_rng() < 0.4) fanType = 'MEMER';
        } else if (event.contentHook === 'official' || event.contentHook === 'visual') {
          if (_rng() < 0.3) fanType = 'ENTHUSIAST';
        }

        // 使用事件專屬模板生成內容
        var contentResult = generateEventContent(event, franchise, seed);
        var engagement = calculateEngagement(franchise, fanType, pid, franchise.tags);

        // 事件增幅 engagement
        if (event.contentHook === 'drama' || event.contentHook === 'controversy') {
          if (engagement.comments) engagement.comments = Math.floor(engagement.comments * 1.8);
          if (engagement.replies) engagement.replies = Math.floor(engagement.replies * 2.0);
        }
        if (event.contentHook === 'viral' || event.contentHook === 'meme') {
          if (engagement.shares) engagement.shares = Math.floor(engagement.shares * 1.5);
          if (engagement.retweets) engagement.retweets = Math.floor(engagement.retweets * 1.8);
          if (engagement.likes) engagement.likes = Math.floor(engagement.likes * 1.3);
        }

        var wrapped = applyWrapperLayer(pid, contentResult, franchise, engagement, fanType);
        var names = generateUsername(pid, fanType, seed + 777);

        newPosts.push({
          id: 'post_' + generateId(),
          username: names.username,
          anonName: names.anonName,
          franchiseId: franchise.id,
          franchiseName: franchise.name,
          content: contentResult.text,
          wrappedContent: wrapped.body,
          wrappedFooter: wrapped.footer,
          engagementDisplay: wrapped.engagementDisplay,
          fanType: fanType,
          platformId: pid,
          timestamp: Math.floor(_rng() * 10 + 1) + 'm',
          isVoice: contentResult.isVoice,
          voiceType: contentResult.voiceType,
          isEventTriggered: true,
          eventId: event.id,
          engagement: engagement
        });
      }

      // 插入新貼文到 feed 最前面，移除最舊的維持上限
      var max = _feedConfig.MAX_POSTS_PER_PLATFORM || 40;
      _platformFeeds[pid] = newPosts.concat(feed).slice(0, max);
    }
  }

  // ── Getters ──

  function getPlatformFeed(platformId) {
    return _platformFeeds[platformId] || [];
  }

  function getAllPlatformIds() {
    return _config ? Object.keys(_config) : [];
  }

  function isInitialized() {
    return _initialized;
  }

  // ── Public API ──
  return {
    init: init,
    generatePlatformFeeds: generatePlatformFeeds,
    generateFeedForPlatform: generateFeedForPlatform,
    rollSocialEvents: rollSocialEvents,
    applySocialEventToFeeds: applySocialEventToFeeds,
    getPlatformFeed: getPlatformFeed,
    getAllPlatformIds: getAllPlatformIds,
    isInitialized: isInitialized
  };
})();

// 導出（支援多種環境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlatformEngine;
} else if (typeof window !== 'undefined') {
  window.PlatformEngine = PlatformEngine;
}
