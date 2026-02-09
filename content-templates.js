/**
 * 同人圈經營模擬器 - 內容模板與詞彙庫
 * ================================================
 * 此檔案包含所有用於生成隨機內容的模板和詞彙
 * 包括：作品名稱、劇情描述、社群貼文、動態事件等
 * 
 * 擴充指南:
 * - 在 Dictionary 中新增詞彙可增加作品名稱與描述的多樣性
 * - 在 PostTemplates 中新增貼文模板可豐富社群媒體的內容
 * - 在 EventPool 中新增事件可增加遊戲的動態性
 * 
 * 模板語法:
 * - 使用【關鍵字】作為佔位符，系統會自動從 Dictionary 中替換
 * - 【franchise】會被替換為實際的作品名稱
 * - 【character】【highlight】【meme】等有專門用途
 */

const ContentTemplates = {
  
  // ═══════════════════════════════════════════════════════════════
  // 📚 詞彙庫 - 用於生成隨機內容
  // ═══════════════════════════════════════════════════════════════
  
  Dictionary: {
    /** 地點/場景 */
    place: [
      '異世界', '學園', '魔王城', '迷宮', '咖啡廳', '宇宙船', '孤島', '地下城',
      '王國', '帝國', '村莊', '都市', '神殿', '遺跡', '深淵', '天界', '冥界',
      '海底', '雲端', '廢墟'
    ],
    
    /** 角色類型 */
    role: [
      '勇者', '魔王', '廚師', '偵探', '學生會長', '妹妹', '女僕', '騎士',
      '魔法師', '刺客', '商人', '公主', '龍', '機器人', '精靈', '惡魔',
      '天使', '吸血鬼', '狼人', '史萊姆'
    ],
    
    /** 事件類型 */
    event: [
      '冒險', '戀愛', '復仇', '料理對決', '學園祭', '轉生', '穿越', '覺醒',
      '戰爭', '逃亡', '尋寶', '救援', '背叛', '結婚', '畢業', '比賽',
      '旅行', '修行', '革命', '宴會'
    ],
    
    /** 形容詞 */
    adj: [
      '最強', '無敵', '悲劇的', '爆笑', '甜蜜', '殘酷', '神秘', '傳說',
      '平凡', '孤獨', '瘋狂', '溫柔', '冷酷', '熱血', '純情', '腹黑',
      '天然', '病嬌', '傲嬌', '無口'
    ],
    
    /** 名詞/概念 */
    noun: [
      '劍', '魔法', '戀情', '友情', '背叛', '命運', '記憶', '夢想',
      '誓言', '約定', '秘密', '真相', '奇蹟', '詛咒', '祝福', '羈絆',
      '淚水', '笑容', '勇氣', '希望'
    ],
    
    /** 動詞 */
    verb: [
      '戰鬥', '告白', '逃跑', '覺醒', '轉生', '重生', '守護', '毀滅',
      '拯救', '征服', '探索', '創造', '破壞', '愛上', '背叛', '原諒',
      '相信', '懷疑', '追尋', '放棄'
    ],
    
    /** 感嘆詞 */
    exclaim: ['震驚', '感動', '絕望', '希望', '憤怒', '喜悅', '悲傷', '驚喜'],
    
    /** 網路迷因用語 */
    meme: [
      '草', 'www', '神回', '爛到好笑', '這什麼', '太香了', '破防了', '繃不住',
      '絕絕子', '太可了', '直接封神', '笑死', '淚目', '頂不住', '會玩',
      '離譜', '麻了', '有被笑到', 'respect', '好傢伙'
    ],
    
    /** 劇情亮點 */
    highlight: [
      '神展開', '震撼場面', '告白場景', '戰鬥場面', '反轉劇情', '感人結局',
      '搞笑橋段', '名場面', '高能預警', '刀子', '糖', '玻璃渣裡找糖'
    ],
    
    /** 角色稱呼 */
    character: [
      '主角', '女主', '男二', '女二', '反派', '配角', '路人', '隱藏角色',
      '最終Boss', '吉祥物', '導師', '青梅竹馬', '天降系', '學妹', '學姐'
    ]
  },
  
  // ═══════════════════════════════════════════════════════════════
  // 📖 作品標題模板
  // ═══════════════════════════════════════════════════════════════
  
  TitleTemplates: {
    japanese: {
      A: [
        '【place】の【role】【event】記',
        '【adj】【noun】は【verb】ない',
        'Re:【event】から始める【noun】生活',
        '【role】は【adj】【noun】の夢を見るか？'
      ],
      B: [
        '【noun】【verb】！',
        '【exclaim】！【adj】【noun】',
        '【role】と【role】',
        '【adj】！【role】ちゃん'
      ],
      C: [
        '俺の【role】が【adj】すぎる',
        '【place】で【role】始めました',
        '【role】ですが、【event】してみた'
      ],
      D: [
        '【noun】の【place】',
        '【adj】【place】の【role】',
        '【event】のあと【noun】'
      ]
    },
    chinese: {
      A: [
        '【place】的【role】【event】錄',
        '關於【role】【verb】這件事',
        '當【role】決定【event】時',
        '在【place】尋找【noun】的日子'
      ],
      B: [
        '【adj】的【role】',
        '【role】的【noun】之路',
        '【event】吧！【role】',
        '【noun】與【noun】'
      ],
      C: [
        '我的【role】不可能這麼【adj】',
        '在【place】當【role】的那些事',
        '【role】的日常'
      ],
      D: [
        '【noun】之【place】',
        '【adj】【place】傳說',
        '【event】之後'
      ]
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // 📝 作品描述模板
  // ═══════════════════════════════════════════════════════════════
  
  DescriptionTemplates: {
    /** 世界觀/背景設定 */
    setting: [
      '在【place】，【noun】被視為日常。',
      '這是一個【adj】的【place】，【role】們在此生活。',
      '【place】是個特殊的地方，這裡的【noun】有著不同的意義。',
      '在這個【adj】的世界裡，【role】們追尋著【noun】。',
      '【place】——傳說中，這裡曾經發生過【adj】的【event】。',
      '自古以來，【place】就流傳著關於【noun】的傳說。',
      '【noun】統治的時代，【place】陷入了【adj】的混亂。',
      '在【role】與【role】共存的【place】，平衡十分脆弱。',
      '沒有【noun】的世界是什麼樣子？【place】給出了答案。',
      '歡迎來到【place】，一個被【noun】主宰的地方。',
      '【place】的天空下，【adj】的故事正在上演。',
      '這是【role】們夢寐以求的【place】，也是他們的牢籠。',
      '當【noun】不再【adj】，【place】的命運也隨之改變。',
      '【place】的深處，隱藏著無人知曉的【noun】。'
    ],
    
    /** 主角介紹 */
    lead: [
      '【role】原本只想【verb】，卻意外捲入【event】。',
      '平凡的【role】某天得到了【adj】的【noun】。',
      '作為【place】唯一的【role】，主角的日常並不平靜。',
      '【role】從未想過，自己會成為【noun】的關鍵。',
      '一覺醒來，【role】發現自己擁有了【adj】的能力。',
      '【role】的願望很簡單，就是想要【verb】。',
      '被認為是廢物的【role】，其實隱藏著【adj】的【noun】。',
      '在所有人都放棄的時候，【role】選擇站出來。',
      '【role】不相信命運——直到遇見了那個【adj】的【role】。',
      '為什麼偏偏是我？【role】無數次問自己。',
      '【role】原本以為【noun】只是傳說，直到那一天。',
      '成為【noun】的【role】，從此踏上了不歸路。',
      '人人都說【role】瘋了，但只有ta知道真相。',
      '【role】的記憶是空白的，唯一記得的只有【noun】。'
    ],
    
    /** 衝突/挑戰 */
    conflict: [
      '為了【noun】，必須面對【adj】的【event】。',
      '然而，【role】的出現打破了一切平衡。',
      '在【noun】與【noun】之間，該如何抉擇？',
      '當【noun】的真相浮出水面，一切都變得【adj】。',
      '友情、愛情、使命——【role】只能選擇一個。',
      '【event】的倒數已經開始，時間所剩無幾。',
      '原來最大的敵人不是別人，而是【adj】的自己。',
      '【role】們的同盟岌岌可危，背叛者就在其中。',
      '每前進一步，就離【noun】的深淵更近一分。',
      '是要守護【noun】，還是毀滅一切重新開始？',
      '【adj】的過去浮現，【role】不得不面對。',
      '當【noun】與【noun】相撞，誰會最先崩潰？',
      '失去【noun】的代價，是【role】無法承受的。'
    ],
    
    /** 懸念/鉤子 */
    hook: [
      '然而，真正的【event】才正要開始。',
      '這個【noun】的背後，隱藏著【adj】的真相。',
      '當一切結束時，【noun】的意義將被改寫。',
      '而這一切，不過是【adj】計劃的開端。',
      '直到最後一刻，沒有人知道【noun】的去向。',
      '傳說還在繼續——這只是故事的第一章。',
      '問題是：【role】真的做好準備了嗎？',
      '在【noun】揭曉之前，一切皆有可能。',
      '或許，【adj】的結局才是最好的結局。',
      '然而【role】不知道的是，ta早已被選中。',
      '當黎明到來，【noun】將迎來最終的審判。',
      '這不是結束，而是【adj】篇章的開始。'
    ]
  },
  
  // ═══════════════════════════════════════════════════════════════
  // 💬 社群貼文模板 (依粉絲類型分類)
  // ═══════════════════════════════════════════════════════════════
  
  PostTemplates: {
    /** 狂熱粉絲 - 熱情推廣，用語誇張 */
    ENTHUSIAST: [
      '【franchise】的【highlight】真的太神了！【character】的演出讓我哭了...',
      '天啊【franchise】也太好看了吧！！！【character】我老婆（老公）！！',
      '剛看完【franchise】，心情久久不能平復QQ 【highlight】那段真的絕了',
      '【franchise】永遠滴神！！！每集都有驚喜',
      '強推【franchise】！！看了三遍還是感動',
      '【franchise】這週的【highlight】我直接跪了 神作認證',
      '求求你們去看【franchise】！！【character】真的太完美了',
      '【franchise】新一集出了嗎？好想看啊啊啊',
      '【franchise】的OP我已經單曲循環一整天了',
      '看到【character】出場我直接尖叫 【franchise】太會了',
      '【franchise】這集的【highlight】我重看了五遍 還是感動',
      '無法接受【franchise】下週要完結...要坑了',
      '【franchise】的Staff真的用心 每一幀都是愛',
      '【franchise】是今年最被低估的神作！',
      '等【franchise】出BD我一定全收 太值得了'
    ],
    
    /** 普通粉絲 - 隨緣看看，評價平淡 */
    CASUAL: [
      '看了一下【franchise】，還行吧。',
      '【franchise】好像很紅？有空來補一下',
      '朋友一直推【franchise】，看了幾集覺得普普',
      '【franchise】的畫風不錯，但劇情有點慢',
      '聽說【franchise】很好看？先加入待看清單',
      '【franchise】看到第三集了 還沒get到點',
      '大家都在聊【franchise】 我是不是應該補一下',
      '【franchise】感覺沒有想像中那麼好看耶',
      '坐車的時候隨便點開【franchise】 打發時間還行',
      '【franchise】我棄了 有更好看的推薦嗎',
      '有人跟我一樣覺得【franchise】節奏太慢嗎',
      '【franchise】的OP還不錯 但劇情無感',
      '我朋友狂推【franchise】 但我看不太下去',
      '【franchise】應該是那種看完就忘的番吧'
    ],
    
    /** 評論家 - 分析作品，指出問題 */
    CRITIC: [
      '【franchise】的【highlight】有問題，這種處理方式很明顯啊。',
      '說真的【franchise】被過譽了，【criticism】',
      '【franchise】看到後面開始崩了吧？說好的伏筆呢',
      '【franchise】的作畫這季也太敷衍',
      '【character】的人設邏輯不通，編劇在想什麼',
      '【franchise】的世界觀設定有不少漏洞 沒人發現嗎',
      '從專業角度來說【franchise】的分鏡有待加強',
      '【franchise】的OST跟畫面完全不搭 誰選的曲',
      '【franchise】第5集的演出是實習生做的吧',
      '【franchise】前期還好 後面完全是趕工',
      '身為原作黨 【franchise】動畫改得太差了',
      '【franchise】的【character】根本毀原作 不能忍',
      '客觀來說【franchise】也就6分水平 7分都勉強',
      '【franchise】的劇情邏輯鏈完全斷裂 沒救了',
      '看完【franchise】只想說：期待越高失望越大'
    ],
    
    /** 迷因人 - 玩梗為主，搞笑取向 */
    MEMER: [
      '【franchise】：【character】做這個→ 觀眾：？？？ www',
      '【franchise】的【highlight】已經變成梗圖了wwww',
      '每次看【franchise】都在笑 草',
      '【franchise】【meme】',
      '這集【franchise】的迷惑操作太好笑了www',
      '【franchise】又貢獻新梗了 我的表情包有救了',
      '【character】：我是認真的 觀眾：【meme】',
      '看【franchise】不如說是來截圖做梗的 www',
      '【franchise】的官方自己都在玩梗了吧',
      '今日份的【franchise】梗圖已存檔 【meme】',
      '【franchise】這段配上bgm太好笑了 誰做的',
      '我已經分不清【franchise】是番還是搞笑節目了',
      '【franchise】讓我笑到缺氧 官方別這樣',
      '這什麼神展開 【franchise】是認真的嗎 草草草'
    ],
    
    /** 潛水者 - 極少發言，言簡意賅 */
    LURKER: [
      '...',
      '【franchise】',
      '看完了',
      '嗯',
      '。',
      '(轉推)',
      '【franchise】👍',
      '+1',
      '我也看了',
      '不錯',
      '有',
      '看了',
      '是嗎',
      '好'
    ],
    
    /** 課金大佬 - 願意大量消費 */
    WHALE: [
      '【franchise】的週邊我全都要！！剛下單了整套',
      '這次【franchise】的限定版開箱，錢包君安息',
      '為了【character】，這點錢算什麼',
      '【franchise】的BD全卷購入，等不及了',
      '搶到【franchise】的簽名版了！！爽',
      '【franchise】animate特典我搶到了！！通宵排隊值得',
      '【franchise】新出的figma手辦 預購完成 💳💨',
      '為了【franchise】的SSR我課了三萬 值得',
      '【franchise】聯名咖啡廳的周邊 我全包了',
      '【franchise】的抱枕+掛毯+立牌 一次收齊',
      '錢算什麼 【franchise】的快樂是無價的',
      '【franchise】的一番賞我抽到A賞了！！再抽十抽',
      '聽說【franchise】要出新周邊？錢包在顫抖',
      '【franchise】演唱會門票搶到了 機票飯店已訂'
    ],
    
    /** 收藏家 - 重視收藏完整性 */
    COLLECTOR: [
      '【franchise】的設定集終於入手了，收藏完整',
      '這版【franchise】的封面比較好看，兩版都收',
      '【franchise】的周邊出太多了...但還是想要',
      '整理收藏發現【franchise】的東西最多',
      '【franchise】的稀有版本找了好久終於收到',
      '【franchise】日版港版台版我都收了 有什麼問題嗎',
      '終於集齊【franchise】全部的特典卡了 用了三個月',
      '【franchise】的同人場限定本 成功入手✓',
      '買到【franchise】的絕版畫冊了 品相完美',
      '【franchise】的收藏展示架又滿了 要換大的',
      '收藏這種事 只有零和無限的區別 【franchise】萬歲',
      '【franchise】的周邊我按系列分類 已經佔滿一面牆',
      '在二手市場挖到【franchise】的隱藏版 這運氣'
    ],
    
    /** 黑子 - 負面評價為主 */
    HATER: [
      '【franchise】到底紅什麼啊，根本看不下去',
      '又是【franchise】？可以停止造神了嗎',
      '【franchise】的粉絲真的很吵',
      '【franchise】不過就是老梗新包裝',
      '為什麼【franchise】能這麼紅，我真的不懂',
      '【franchise】完全是靠營銷堆出來的吧',
      '說實話【franchise】就是無腦爽番 不知道吹什麼',
      '【franchise】的粉絲可以不要到處安利嗎 煩死了',
      '每次看到【franchise】霸榜就想翻白眼',
      '【franchise】憑什麼評分這麼高 水軍太多了吧',
      '【franchise】只是贏在時機好而已 換個季度早涼了',
      '又有人在吹【franchise】了 審美是這樣嗎',
      '拜託【franchise】粉絲冷靜一點 沒那麼神',
      '我倒要看看【franchise】還能紅多久'
    ]
  },
  
  // ═══════════════════════════════════════════════════════════════
  // 🎲 動態事件池
  // ═══════════════════════════════════════════════════════════════
  
  EventPool: [
    // ─────────────────────────────────────────────────────────────
    // 📺 官方動態 (OFFICIAL)
    // ─────────────────────────────────────────────────────────────
    {
      id: 'anime_announce',
      category: 'OFFICIAL',
      name: '動畫化決定',
      description: '【franchise】宣布動畫化決定！',
      effect: { popularity: 20, density: 0.1 },
      probability: 0.15,
      cooldown: 3
    },
    {
      id: 'season_end',
      category: 'OFFICIAL',
      name: '季番完結',
      description: '【franchise】動畫完結，話題逐漸消退',
      effect: { popularity: -10, density: -0.05 },
      probability: 0.2,
      cooldown: 2
    },
    {
      id: 'game_release',
      category: 'OFFICIAL',
      name: '遊戲發售',
      description: '【franchise】手遊版本正式上線！',
      effect: { popularity: 15, purchasingPower: 0.2 },
      probability: 0.1,
      cooldown: 3
    },
    {
      id: 'collab_announce',
      category: 'OFFICIAL',
      name: '聯名企劃',
      description: '【franchise】宣布與知名品牌聯名',
      effect: { popularity: 10, purchasingPower: 0.15 },
      probability: 0.12,
      cooldown: 2
    },
    
    // ─────────────────────────────────────────────────────────────
    // 🌐 社群動態 (SOCIAL)
    // ─────────────────────────────────────────────────────────────
    {
      id: 'viral_meme',
      category: 'SOCIAL',
      name: '迷因爆發',
      description: '【franchise】的梗圖瘋傳社群媒體',
      effect: { popularity: 25, density: -0.1 },
      probability: 0.15,
      cooldown: 1
    },
    {
      id: 'controversy',
      category: 'SOCIAL',
      name: '爭議事件',
      description: '【franchise】相關爭議引發討論',
      effect: { popularity: 5, density: -0.15, purchasingPower: -0.1 },
      probability: 0.1,
      cooldown: 2
    },
    {
      id: 'fan_art_trend',
      category: 'SOCIAL',
      name: '二創熱潮',
      description: '【franchise】的二創作品在社群上流行',
      effect: { popularity: 10, density: 0.15 },
      probability: 0.2,
      cooldown: 1
    },
    {
      id: 'influencer_push',
      category: 'SOCIAL',
      name: '網紅推薦',
      description: '知名網紅大力推薦【franchise】',
      effect: { popularity: 15, density: 0.05 },
      probability: 0.12,
      cooldown: 2
    },
    
    // ─────────────────────────────────────────────────────────────
    // 💳 消費動態 (CONSUMPTION)
    // ─────────────────────────────────────────────────────────────
    {
      id: 'limited_goods',
      category: 'CONSUMPTION',
      name: '限定商品',
      description: '【franchise】推出限定周邊',
      effect: { purchasingPower: 0.3 },
      probability: 0.15,
      cooldown: 2
    },
    {
      id: 'scalper_alert',
      category: 'CONSUMPTION',
      name: '黃牛警報',
      description: '【franchise】商品被黃牛炒作',
      effect: { purchasingPower: -0.2, density: 0.05 },
      probability: 0.08,
      cooldown: 2
    },
    {
      id: 'budget_season',
      category: 'CONSUMPTION',
      name: '消費緊縮',
      description: '粉絲群體普遍預算吃緊',
      effect: { purchasingPower: -0.15 },
      probability: 0.1,
      cooldown: 3,
      affectsAll: true
    },
    
    // ─────────────────────────────────────────────────────────────
    // 🌍 現實因素 (REALITY)
    // ─────────────────────────────────────────────────────────────
    {
      id: 'voice_actor_scandal',
      category: 'REALITY',
      name: '聲優醜聞',
      description: '【franchise】主要聲優捲入醜聞',
      effect: { popularity: -15, density: -0.1, purchasingPower: -0.2 },
      probability: 0.05,
      cooldown: 4
    },
    {
      id: 'author_hiatus',
      category: 'REALITY',
      name: '作者休刊',
      description: '【franchise】原作宣布無限期休刊',
      effect: { popularity: -10, density: 0.1 },
      probability: 0.08,
      cooldown: 5
    },
    {
      id: 'sequel_announce',
      category: 'REALITY',
      name: '續作發表',
      description: '【franchise】續作正式發表！',
      effect: { popularity: 25, density: 0.15, purchasingPower: 0.1 },
      probability: 0.1,
      cooldown: 4
    }
  ],
  
  // ═══════════════════════════════════════════════════════════════
  // 📋 作品退場原因模板
  // ═══════════════════════════════════════════════════════════════
  
  RemovalReasons: [
    { name: '完結', template: '《{name}》已完結，熱度逐漸消退' },
    { name: '炎上', template: '《{name}》因爭議事件退出市場' },
    { name: '停播', template: '《{name}》宣布停播/腰斬' },
    { name: '過氣', template: '《{name}》已無人問津...' },
    { name: '被遺忘', template: '還記得《{name}》嗎？已經沒人在討論了' }
  ],
  
  // ═══════════════════════════════════════════════════════════════
  // 🏷️ 作品標籤池
  // ═══════════════════════════════════════════════════════════════
  
  TagPool: [
    '戀愛', '熱血', '懸疑', '搞笑', '日常', '奇幻', 'SF', '運動',
    '後宮', '百合', 'BL', '異世界', '偶像', '音樂', '美食', '職場',
    '治癒', '黑暗', '戰鬥', '校園'
  ]
};

// 導出配置（支援多種環境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentTemplates;
} else if (typeof window !== 'undefined') {
  window.ContentTemplates = ContentTemplates;
}
