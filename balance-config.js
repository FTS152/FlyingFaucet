/**
 * 同人圈經營模擬器 - 遊戲平衡參數配置
 * ================================================
 * 此檔案集中所有影響遊戲難度與經濟平衡的參數
 * 平衡調整人員可直接修改此檔案來調整遊戲體驗
 * 
 * 修改後請記得測試以下情境:
 * - 新手前10回合是否能存活
 * - 中期(20-50回合)是否有穩定成長感
 * - 後期是否能合理達成目標
 */

const BalanceConfig = {
  
  // ═══════════════════════════════════════════════════════════════
  // 🎯 遊戲核心目標
  // ═══════════════════════════════════════════════════════════════
  
  /** 遊戲勝利目標金額（達成此金額觸發勝利畫面） */
  GOAL_AMOUNT: 1915000,  // $1,915,000 = 一張台積電
  
  /** 玩家起始資金 */
  STARTING_MONEY: 10000,
  
  /** 每回合行動點數 */
  ACTION_POINTS_PER_ROUND: 5,
  
  // ═══════════════════════════════════════════════════════════════
  // 📊 P×D×B 模型門檻 (作品屬性分類判定)
  // ═══════════════════════════════════════════════════════════════
  
  /** 人氣 (Popularity) 門檻 - 0~100 */
  PDB_THRESHOLD: {
    HIGH_P: 60,   // 高人氣門檻
    LOW_P: 40,    // 低人氣門檻
    HIGH_D: 0.6,  // 高密度門檻 (0~1)
    LOW_D: 0.4,   // 低密度門檻
    HIGH_B: 1.3,  // 高購買力門檻 (倍率)
    LOW_B: 0.8    // 低購買力門檻
  },
  
  // ═══════════════════════════════════════════════════════════════
  // 💰 價格與購買系統
  // ═══════════════════════════════════════════════════════════════
  
  /** 各粉絲類型的價格心理閾值 (超過會大幅降低購買意願) */
  PRICE_THRESHOLDS: {
    CASUAL: 300,      // 普通粉絲
    LURKER: 300,      // 潛水者
    MEMER: 400,       // 迷因人
    ENTHUSIAST: 600, // 狂熱粉絲
    COLLECTOR: 800,  // 收藏家
    WHALE: 1500,      // 課金大佬
    CRITIC: 400,      // 評論家
    HATER: 150        // 黑子
  },
  
  /** 絕對價格上限 - 超過此價格無人購買 */
  ABSOLUTE_PRICE_CEILING: 3000,
  
  // ═══════════════════════════════════════════════════════════════
  // 🔞 R18 內容系統
  // ═══════════════════════════════════════════════════════════════
  
  /** R18 內容對各粉絲類型的購買意願倍率 */
  R18_PREFERENCE: {
    CASUAL: 0.5,      // 普通粉絲：較少買 R18
    LURKER: 1.2,      // 潛水者：喜歡 R18
    MEMER: 0.8,       // 迷因人：中等
    ENTHUSIAST: 1.3,  // 狂熱粉絲：喜歡
    COLLECTOR: 1.5,   // 收藏家：很喜歡
    WHALE: 1.8,       // 課金大佬：非常喜歡
    CRITIC: 0.7,      // 評論家：不太買
    HATER: 0.3        // 黑子：幾乎不買
  },
  
  // ═══════════════════════════════════════════════════════════════
  // 📦 庫存與成本系統
  // ═══════════════════════════════════════════════════════════════
  
  /** 每本書每回合的倉儲費 */
  STORAGE_COST_PER_BOOK: 50,
  
  /** 印刷基礎成本 (每本) */
  PRINT_BASE_COST: 150,
  
  /** 印刷數量限制 */
  PRINT_LIMITS: {
    MIN: 10,
    MAX: 2000
  },
  
  /** 售價限制 */
  PRICE_LIMITS: {
    MIN: 100,
    MAX: 3000
  },
  
  /** 量產折扣階梯 */
  VOLUME_DISCOUNTS: [
    { threshold: 2000, discount: 0.5 },  // 2000本以上 -50%
    { threshold: 1000, discount: 0.6 },  // 1000本以上 -40%
    { threshold: 500, discount: 0.7 },   // 500本以上 -30%
    { threshold: 200, discount: 0.8 },   // 200本以上 -20%
    { threshold: 100, discount: 0.9 }    // 100本以上 -10%
  ],
  
  /* UNUSED (V2 未使用)
  PAPER_QUALITY: {
    recycled: { costModifier: 0.8, attractionBonus: 0 },
    normal: { costModifier: 1.0, attractionBonus: 0 },
    premium: { costModifier: 1.5, attractionBonus: 0.1 }
  },
  
  COVER_ARTIST: {
    ai: { cost: 0, stopRate: 0.2 },
    friend: { cost: 500, stopRate: 0.4 },
    pro: { cost: 2000, stopRate: 0.8 }
  },
  
  EVENT: {
    TRIGGER_CHANCE: 0.5,
    MAX_CHAIN_DEPTH: 3
  },
  */
  
  // ═══════════════════════════════════════════════════════════════
  // 🔄 作品輪替系統
  // ═══════════════════════════════════════════════════════════════
  
  FRANCHISE_ROTATION: {
    /** 每回合移除作品數量範圍 */
    REMOVE_MIN: 3,
    REMOVE_MAX: 5,
    
    /** 每回合新增作品數量範圍 */
    ADD_MIN: 3,
    ADD_MAX: 5,
    
    /** 最少保留作品數量 */
    MIN_FRANCHISE_COUNT: 8,
    
    /** 新遊戲起始作品數量 */
    STARTING_FRANCHISE_COUNT: {
      MIN: 10,
      MAX: 15
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // 🎪 場次系統
  // ═══════════════════════════════════════════════════════════════
  
  CONVENTION: {
    /** 入場人數倍率 */
    ATTENDEE_MULTIPLIER: 15
  },
  
  /* UNUSED (V2 未使用)
  FAN_TYPE_BASE_DISTRIBUTION: {
    ENTHUSIAST: 0.15,
    CASUAL: 0.25,
    CRITIC: 0.10,
    MEMER: 0.15,
    LURKER: 0.15,
    WHALE: 0.05,
    COLLECTOR: 0.05,
    HATER: 0.10
  },
  
  RESEARCH: {
    MAX_ESSENCE_LEVEL: 10,
    MAX_AUDIENCE_LEVEL: 10,
    ESSENCE_BONUS_CHANCE: 0.3,
    STUDY_GAIN: { MIN: 1, MAX: 2 },
    RESEARCH_GAIN: { MIN: 1, MAX: 2 }
  },
  
  TAGS: {
    SEASONAL_DURATION: 1,
    STARTING_SEASONAL_RATIO: 0.5
  },
  */
  
  // ═══════════════════════════════════════════════════════════════
  // 🆙 V2: 社團升級系統 (T008)
  // ═══════════════════════════════════════════════════════════════
  
  UPGRADE_DEFINITIONS: [
    {
      id: 'helper',
      name: '培訓小幫手',
      subDescription: '手腳俐落的小幫手千年一遇',
      description: '提升單場最大銷售量',
      maxLevel: 5,
      costs: [1000, 2500, 5000, 10000, 20000],
      effects: [
        { maxSalesBonus: 100 },
        { maxSalesBonus: 200 },
        { maxSalesBonus: 500 },
        { maxSalesBonus: 1000 },
        { maxSalesBonus: 2000 }
      ]
    },
    {
      id: 'coser',
      name: '僱傭Coser小幫手',
      subDescription: '說真的，能當coser還需要當文字寫手嗎',
      description: '增加攤位吸引力',
      maxLevel: 5,
      costs: [3000, 8000, 20000, 40000, 80000],
      effects: [
        { boothAttractionBonus: 0.10 },
        { boothAttractionBonus: 0.20 },
        { boothAttractionBonus: 0.35 },
        { boothAttractionBonus: 0.50 },
        { boothAttractionBonus: 0.75 }
      ]
    },
    {
      id: 'adobe',
      name: 'Adobe排版網課',
      subDescription: '學會了這個，就能繼續壓榨自己了',
      description: '提升作品品質加成',
      maxLevel: 5,
      costs: [2000, 5000, 12000, 25000, 50000],
      effects: [
        { qualityBonus: 0.05 },
        { qualityBonus: 0.10 },
        { qualityBonus: 0.18 },
        { qualityBonus: 0.30 },
        { qualityBonus: 0.50 }
      ]
    },
    {
      id: 'storage',
      name: '老家倉儲',
      subDescription: '老家還有空間可以放',
      description: '降低倉儲成本',
      maxLevel: 5,
      costs: [1500, 3000, 6000, 12000, 25000],
      effects: [
        { storageCostReduction: 0.15 },
        { storageCostReduction: 0.30 },
        { storageCostReduction: 0.45 },
        { storageCostReduction: 0.60 },
        { storageCostReduction: 0.75 }
      ]
    },
    {
      id: 'friends',
      name: '親友團',
      subDescription: '親友的支持是最溫暖的力量',
      description: '場次開始時獲得保底銷量(僅對500元以下刊物有效)',
      maxLevel: 5,
      costs: [5000, 10000, 15000, 30000, 50000],
      effects: [
        { guaranteedSales: 10 },
        { guaranteedSales: 20 },
        { guaranteedSales: 30 },
        { guaranteedSales: 40 },
        { guaranteedSales: 50 }
      ]
    },
    {
      id: 'social',
      name: '社群經營',
      subDescription: '當網紅接業配，走上人生巔峰',
      description: '提升整體銷量倍率',
      maxLevel: 5,
      costs: [1500, 5000, 10000, 25000, 60000],
      effects: [
        { salesMultiplier: 1.05 },
        { salesMultiplier: 1.08 },
        { salesMultiplier: 1.12 },
        { salesMultiplier: 1.18 },
        { salesMultiplier: 1.25 }
      ]
    },
    {
      id: 'typewriter',
      name: '超級打字機',
      subDescription: '寫稿速度等於截止時間的倒數',
      description: '創作時有機率獲得2份草稿',
      maxLevel: 5,
      costs: [1500, 5000, 10000, 25000, 50000],
      effects: [
        { typewriterBonus: 0.20 }, // 20% 機率
        { typewriterBonus: 0.40 }, // 40% 機率
        { typewriterBonus: 0.60 }, // 60% 機率
        { typewriterBonus: 0.80 }, // 80% 機率
        { typewriterBonus: 1.00 }  // 100% 機率
      ]
    },
    {
      id: 'sage',
      name: '聖德太子',
      subDescription: '一心多用的傳說境界',
      description: '研究作品時有機率獲得2級理解度',
      maxLevel: 5,
      costs: [1500, 5000, 10000, 25000, 50000],
      effects: [
        { sageBonus: 0.20 }, // 20% 機率
        { sageBonus: 0.40 }, // 40% 機率
        { sageBonus: 0.60 }, // 60% 機率
        { sageBonus: 0.80 }, // 80% 機率
        { sageBonus: 1.00 }  // 100% 機率
      ]
    },
    {
      id: 'analyst',
      name: '市場分析達人',
      subDescription: '如果把這個能力拿去炒股該有多好',
      description: '研究市場時有機率獲得2級調研等級',
      maxLevel: 5,
      costs: [1500, 5000, 10000, 25000, 50000],
      effects: [
        { analystBonus: 0.20 }, // 20% 機率
        { analystBonus: 0.40 }, // 40% 機率
        { analystBonus: 0.60 }, // 60% 機率
        { analystBonus: 0.80 }, // 80% 機率
        { analystBonus: 1.00 }  // 100% 機率
      ]
    },
    {
      id: 'investor',
      name: '天使投資人',
      subDescription: '有錢人的錢就是比較好賺',
      description: '解鎖舉債功能與額度',
      maxLevel: 3,
      costs: [1000, 3000, 5000],
      effects: [
        { debtLimit: 10000 },
        { debtLimit: 30000 },
        { debtLimit: 50000 }
      ]
    },
    {
      id: 'stock',
      name: '股市投資',
      subDescription: '人有兩隻腳，錢有四隻腳',
      description: '每回合獲得資金利息',
      maxLevel: 3,
      costs: [10000, 30000, 80000],
      effects: [
        { interestRate: 0.03 },
        { interestRate: 0.05 },
        { interestRate: 0.08 }
      ]
    },
    {
      id: 'writing',
      name: '提升文筆',
      subDescription: '沒有效果，難道你覺得文筆對銷量有實際幫助嗎？',
      description: '但我還是想點高',
      maxLevel: null, // 無上限
      costs: [500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000],
      costFormula: (level) => 500 * Math.pow(2, level), // 超過預設陣列時使用公式
      effects: [
        { baseQualityBonus: 0 }, // 已移除實際效果
        { baseQualityBonus: 0 },
        { baseQualityBonus: 0 },
        { baseQualityBonus: 0 },
        { baseQualityBonus: 0 },
        { baseQualityBonus: 0 },
        { baseQualityBonus: 0 },
        { baseQualityBonus: 0 },
        { baseQualityBonus: 0 },
        { baseQualityBonus: 0 }
      ],
      effectFormula: (level) => ({ baseQualityBonus: 0 }) // 超過預設陣列時使用公式
    }
  ],
  
  /** 最大銷售量基礎設定 */
  MAX_SALES: {
    BASE: 100,           // 基礎最大銷售量
    PER_HELPER_LEVEL: 100, // 每級小幫手增加的銷售量
    FRIENDS_MAX_TYPES: 3, // 親友團最多買幾種商品
    FRIENDS_MAX_PRICE: 500 // 親友團購買價格上限
  },
  
  // ═══════════════════════════════════════════════════════════════
  // 👥 V2: 顧客類型封面/紙質敏感度 (T009)
  // ═══════════════════════════════════════════════════════════════
  
  CUSTOMER_COEFFICIENTS: {
    CASUAL: {
      coverSensitivity: 0.8,   // 封面影響較小
      paperSensitivity: 0.5,   // 紙質幾乎不在意
      name: '普通粉絲'
    },
    LURKER: {
      coverSensitivity: 1.0,
      paperSensitivity: 0.7,
      name: '潛水者'
    },
    MEMER: {
      coverSensitivity: 1.2,   // 喜歡華麗封面
      paperSensitivity: 0.4,   // 不在意紙質
      name: '迷因人'
    },
    ENTHUSIAST: {
      coverSensitivity: 1.3,
      paperSensitivity: 1.2,
      name: '狂熱粉絲'
    },
    COLLECTOR: {
      coverSensitivity: 1.5,   // 非常重視封面
      paperSensitivity: 1.8,   // 極度重視紙質
      name: '收藏家'
    },
    WHALE: {
      coverSensitivity: 1.4,
      paperSensitivity: 1.5,
      name: '課金大佬'
    },
    CRITIC: {
      coverSensitivity: 0.9,
      paperSensitivity: 1.0,
      name: '評論家'
    },
    HATER: {
      coverSensitivity: 0.6,
      paperSensitivity: 0.3,
      name: '黑子'
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // 🎨 V2: 封面與紙質等級 (T010)
  // ═══════════════════════════════════════════════════════════════
  
  COVER_LEVELS: {
    free: {
      name: 'AI繪圖',
      cost: 0,
      attractionModifier: -0.20,
      description: '用AI生成的封面'
    },
    basic: {
      name: '朋友幫忙',
      cost: 500,
      attractionModifier: 0,
      description: '請朋友幫忙畫的封面'
    },
    refined: {
      name: '專業繪師',
      cost: 2000,
      attractionModifier: 0.25,
      description: '委託專業繪師的封面'
    },
    premium: {
      name: '大手繪師',
      cost: 10000,
      attractionModifier: 0.50,
      description: '業界大手的特製封面'
    }
  },
  
  PAPER_LEVELS: {
    economy: {
      name: '再生紙',
      costModifier: -0.20,
      attractionModifier: -0.20,
      description: '影印紙，省錢但質感差'
    },
    standard: {
      name: '標準紙',
      costModifier: 0,
      attractionModifier: 0,
      description: '一般同人誌用紙'
    },
    quality: {
      name: '高級紙',
      costModifier: 0.20,
      attractionModifier: 0.20,
      description: '高磅數進口紙'
    },
    luxury: {
      name: '豪華紙',
      costModifier: 0.50,
      attractionModifier: 0.50,
      description: '尊爵不凡，縱享絲滑'
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // 📉 V2: 作品衰退度 (T011)
  // ═══════════════════════════════════════════════════════════════
  
  DECAY_RATES: {
    trending: {
      name: '時事熱門',
      minDecay: 50,
      maxDecay: 80,
      description: '熱度來得快去得也快'
    },
    normal: {
      name: '一般作品',
      minDecay: 20,
      maxDecay: 50,
      description: '穩定的人氣衰減'
    },
    evergreen: {
      name: '經典長青',
      minDecay: 10,
      maxDecay: 20,
      description: '歷久不衰的經典題材'
    }
  }
};

// 導出配置（支援多種環境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BalanceConfig;
} else if (typeof window !== 'undefined') {
  window.BalanceConfig = BalanceConfig;
}
