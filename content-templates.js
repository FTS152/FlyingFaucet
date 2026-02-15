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
      '海底', '雲端', '廢墟',
      'VR世界', '公會', '直播間', '無人島', '貧民窟', '王立學園', '邊境領地',
      '黑市', '精神世界', '時間夾縫', '實驗室', '後宮', '修羅場', '便利商店',
      '不可視境界線', '英靈座', '賽博都市', '新手村', '魔女森林', '無限列車',
      '女僕店', '溫泉旅館', '異次元', '天空城', '演藝圈', '編輯部', '漫展會場',
      '深海監獄', '量子領域', '廢棄醫院', '貓咪咖啡廳', '勇者老家', '魔導列車',
      '轉生門', '月球背面', '數據海', '古戰場', '英靈殿', '澀谷', '秋葉原',
      '下北澤', '屋頂', '地下室', '豪宅', '體育館', '更衣室', '部室',
      '海岸', '雪山', '麵攤', '公園長椅', '審判庭', '那個泳池', '軟體公司'
    ],
    
    /** 角色類型 */
    role: [
      '勇者', '魔王', '廚師', '偵探', '學生會長', '妹妹', '女僕', '騎士',
      '魔法師', '刺客', '商人', '公主', '龍', '機器人', '精靈', '惡魔',
      '天使', '吸血鬼', '狼人', '史萊姆',
      '聖女', '實況主', '轉生者', '陰陽師', '死靈法師', '惡役千金', '家裡蹲',
      '社畜', '女神', '奴隸', 'AI', '偶像', '召喚師', '獵人', '賢者',
      '偽娘', '病嬌', '傲嬌', 'Vtuber', '時間旅人', 
      '間諜', '殺手', '讀心者', '煉金術師', '魅魔', '殭屍', '幽靈', 'JK',
      '辣妹', '風紀委員', '青梅竹馬', '未婚妻', '繼母', '義妹', '哥布林',
      '觸手怪', '神官', '操偶師', '駭客', '超能力者',
      '先輩', '後輩', '野獸', '體育生', '空手道部員', '游泳部員',  '大叔', '監督', '演員', '會員', '屑', '王', '神'
    ],
    
    /** 事件類型 */
    event: [
      '冒險', '戀愛', '復仇', '料理對決', '學園祭', '轉生', '穿越', '覺醒',
      '戰爭', '逃亡', '尋寶', '救援', '背叛', '結婚', '畢業', '比賽',
      '旅行', '修行', '革命', '宴會',
      '退婚', '直播', '出道', '畢業', '黑化', '洗白', '攻略', '抽卡',
      '炎上', '簽售會', '合宿', '溫泉回', '泳裝回', '聖戰', '審判',
      '時間回溯', '靈魂交換', '求婚', '決鬥', '特訓',
      '修學旅行', '文化祭', '體育祭', '試膽大會', '聖誕節', '情人節', '夏日祭典',
      '靈魂互換', '失憶', '懷孕', 'NTR', '監禁', '調教', '契約',
      '成神', '毀滅世界', '無限輪迴', '偶像選拔', '電競比賽', '漫才表演',
      '特訓', '大會', '面試', '喝茶', '咆哮', '謝罪',
      '昏睡', '覺醒', '暴走', '審判', '還錢', '雪遊'
    ],
    
    /** 形容詞 */
    adj: [
      '最強', '無敵', '悲劇的', '爆笑', '甜蜜', '殘酷', '神秘', '傳說',
      '平凡', '孤獨', '瘋狂', '溫柔', '冷酷', '熱血', '純情', '腹黑',
      '天然', '病嬌', '傲嬌', '無口',
      '混沌', '極惡', '究極', '禁忌', '崩壞', '虛偽', '永恆', 'SSR級',
      '過勞', '厭世', '尊死', '油膩', '清純', '色氣', '中二', '硬核',
      '王道', '邪道', '致鬱', '治癒',
      '慎重', '廢柴', '天才', '變態', '病態', '絕望', '希望', '虛構',
      '量子', '全知全能', '殘念', '抖S', '抖M', '黑心', '良心',
      '暴走', '覺醒', '墮落', '神聖', '禁斷',
      '迫真', '惡臭', '王道', '野獸般', '24歲', '屑', '暴虐', 
      '直球', '激寒', '會員制', '獨眼'
    ],
    
    /** 名詞/概念 */
    noun: [
      '劍', '魔法', '戀情', '友情', '背叛', '命運', '記憶', '夢想',
      '誓言', '約定', '秘密', '真相', '奇蹟', '詛咒', '祝福', '羈絆',
      '淚水', '笑容', '勇氣', '希望',
      '外掛', '系統', '劇本', 'FLAG', '便當', '黑歷史', '絕對領域', '胖次',
      '聖光', '魔法少女', '觸手', '史詩', '神話', '基因', '數據', '靈魂',
      '契約', '代價', '救贖', '終焉',
      '流量', '演算法', '皮套', '中之人', '收益化', '訂閱', '斗內', '工商',
      '本本', '抱枕', '手辦', '聖地', '伏筆', '世界線', '平行宇宙',
      '因果律', '特異點', '固有結界', '寶具', '神格',
      '紅茶', '枕頭', '114514',  '雪', '免許證', '極道',
      '章魚燒', '炒飯', '大會', '夢', '絕望', '壓力'
    ],
    
    /** 動詞 */
    verb: [
      '戰鬥', '告白', '逃跑', '覺醒', '轉生', '重生', '守護', '毀滅',
      '拯救', '征服', '探索', '創造', '破壞', '愛上', '背叛', '原諒',
      '相信', '懷疑', '追尋', '放棄',
      '升級', '課金', '爆肝', '穿越', '附身', '召喚', '獻祭', '封印',
      '支配', '調教', '攻略', '推倒', 'NTR', '開掛', '演戲', '模仿',
      '吐槽', '劇透', '腰斬', '完結',
      '出道', '畢業', '炎上', '公審', '洗地', '護航', '退坑', '回坑',
      '催更', '寄刀片', '舔屏', '發糖', '胃痛', '致敬', '抄襲',
      '魔改', '動畫化', '真人化', '聯動', '二創','咆哮', '昏睡', '謝罪', '絕望', '暴食', '便乘', '鑑賞', '還錢',
      '迫真', '直球對決', '塗滿', '端上來', '大喊'
    ],
    
    /** 感嘆詞 */
    exclaim: ['震驚', '感動', '絕望', '希望', '憤怒', '喜悅', '悲傷', '驚喜','尊死', '完了', '穩了', '贏麻了', '急了', '真香', '過癮', '傻眼',
      '淚目', '破防', '雖遲但到', 'AWSL', '大受震撼', '笑死', '哭啊', '雀食','好啊來啊', '壓力馬斯內', '悲', '確信', '並感', '大噓', '草',
      '哼哼啊啊',  '惡臭'],
    
    /** 網路迷因用語 */
    meme: [
      '草', 'www', '神回', '爛到好笑', '這什麼', '太香了', '破防了', '繃不住',
      '絕絕子', '太可了', '直接封神', '笑死', '淚目', '頂不住', '會玩',
      '離譜', '麻了', '有被笑到', 'respect', '好傢伙','這局穩了', '優勢在我', '小丑竟是我自己', '急了急了', '我看不懂但大受震撼',
      '這波不虧', '這河裡嗎', '格局小了', '禁止套娃', '財富密碼', '好耶',
      '奇怪的知識增加了', '這很科學', '夢幻聯動', '官方整活', '血壓高了',
      '我就爛', '可憐哪', '像極了愛情', '阿姨我不想努力了',
      '這就是我的忍道', '教練我想打籃球', '真相只有一個', '不可以色色', '興奮到模糊',
      '我全都要', '小孩子才做選擇', '真香', '回不去了', '本斥但大',
      '警察叔叔就是這個人', '是在哈囉', '歸剛欸', '我就靜靜看著你裝B', '傷害性不高侮辱性極強',
      '要沒了', '芭比Q了', '完了', '我沒了', '社死','壓力馬斯內',  '哼哼啊啊啊啊', '好時代來臨了', '這下不得不',
      '悲', '確信', '並感', '大噓', '要素察覺', '114514',
      '惡臭', '目力', '野獸先輩', 'HOMO特有的', '是雪啊', 
      '這就是我的路線', '請多多指教', '這是一個一個一個'
    ],
    
    /** 劇情亮點 */
    highlight: [
      '神展開', '震撼場面', '告白場景', '戰鬥場面', '反轉劇情', '感人結局',
      '搞笑橋段', '名場面', '高能預警', '刀子', '糖', '玻璃渣裡找糖',
      '作畫崩壞', '經費燃燒', '聲優怪物', '神ED', '胃痛展開',
      '白學現場', '牛頭人', '修羅場', '福利鏡頭', '硬核科普', '聖光護體',
      '神回', '總集篇', '泳裝回', '溫泉回', '萬策盡', '經費不足',
      'PPT動畫', '兼用卡', '機械降神', '夢結局', '腰斬結局', '開放式結局','迫真演技', '目力咆哮', '昏睡結局', '枕頭大戰', '紅茶下毒', '屋頂曬黑',
      '雪山遇難', '謝罪記者會', '惡臭名場面', 'BB劇場', '音MAD素材'
    ],
    
    /** 角色稱呼 */
    character: [
      '主角', '女主', '男二', '女二', '反派', '配角', '路人', '隱藏角色',
      '最終Boss', '吉祥物', '導師', '青梅竹馬', '天降系', '學妹', '學姐',
      '老婆', '老公', '女兒', '媽媽', '婆', '曹賊', '工具人', '苦主',
      '黃毛', '金毛敗犬', '團長', '會長', '教主', '大老師', '太太',
      '義父', '孝子', '孤兒', '內鬼', '二五仔', '豬隊友', '大腿', '大佬',
      '萌新', '老司機', '紳士', '變態', '蘿莉', '正太', '御姐','先輩', '野獸', '叔叔'
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
        '【role】は【adj】【noun】の夢を見るか？',
        '【noun】の【role】様は告らせたい',
        '【role】転生～【place】に行ったら本気だす～',
        'とある【noun】の【adj】【role】',
        '【noun】オンライン'
      ],
      B: [
        '【noun】【verb】！',
        '【exclaim】！【adj】【noun】',
        '【role】と【role】',
        '【adj】！【role】ちゃん',
        '進撃の【role】',
        '【noun】廻戦',
        '【role】の奇妙な冒険',
        '【noun】の刃'
      ],
      C: [
        '俺の【role】が【adj】すぎる',
        '【place】で【role】始めました',
        '【role】ですが、【event】してみた',
        '【role】と【noun】と【noun】',
        '【place】リベンジャーズ',
        '【adj】【role】の育てかた',
        '【noun】キャン△'
      ],
      D: [
        '【noun】の【place】',
        '【adj】【place】の【role】',
        '【event】のあと【noun】',
        '【noun】ノート',
        '【noun】ゲート',
        '【role】×【role】',
        '【noun】ラッシュ'
      ]
    },
    chinese: {
      A: [
        '【place】的【role】【event】錄',
        '關於【role】【verb】這件事',
        '當【role】決定【event】時',
        '在【place】尋找【noun】的日子',
        '關於我轉生變成【role】這檔事',
        '被【role】退婚後，我決定【event】',
        '雖然是【role】，但【verb】【noun】也沒關係吧？',
        '因為太怕痛就全點【noun】了',
        '身為【role】的我在【place】開啟了第二人生',
        '擁有【adj】【noun】的我是無敵的',
        '這不是【noun】，是【noun】！',
        '回復術士的【adj】【event】',
        '怕【noun】的我把【noun】點滿了',
        '為了養老金去【place】帶【role】',
        '【role】不讓人睡覺',
        '無職【role】～到了【place】就拿出真本事～',
        '我想成為【adj】之人',
        '24歲，是【role】',
        '關於【role】變成野獸這檔事',
        '【place】的【role】不會受傷',
        '真夏夜的【noun】',
        '【adj】的【role】們',
        '【noun】之王：【role】篇',
        '請給我【noun】，謝謝茄子'
      ],
      B: [
        '【adj】的【role】',
        '【role】的【noun】之路',
        '【event】吧！【role】',
        '【noun】與【noun】',
        '【adj】【role】育成法',
        '進擊的【role】',
        '【noun】迴戰',
        '【role】的奇妙冒險',
        '【noun】之刃',
        '【noun】獵人',
        '【noun】筆記',
        '【noun】大戰',
        '【role】x【role】',
        '【noun】成癮',
        '【role】遊戲',
        '【noun】神域',
        '【adj】！【role】先輩',
        '【noun】道',
        '【role】的【noun】教室',
        '前進吧！【place】的【role】',
        '迫真【noun】部'
      ],
      C: [
        '我的【role】不可能這麼【adj】',
        '在【place】當【role】的那些事',
        '【role】的日常',
        '【place】的【role】大人',
        '今天開始做【role】',
        '【role】不讓人睡覺',
        '與【role】的【adj】生活',
        '請不要欺負【role】',
        '【role】同學止不住慾望',
        '【role】想要我告白',
        '【adj】露營',
        '【role】搖滾！',
        'Lycoris 【noun】',
        '目力【role】',
        '【place】的野獸',
        '【noun】戰爭 114514',
        '【role】的消失'
      ],
      D: [
        '【noun】之【place】',
        '【adj】【place】傳說',
        '【event】之後',
        '【noun】與【noun】的協奏曲',
        '末日後的【place】',
        '【adj】的【event】',
        '通往【place】的車票',
        '【noun】。',
        '【noun】之子',
        '86－不存在的【place】－',
        '紫羅蘭【noun】',
        '【noun】邊緣',
        '【role】平家將',
        '【noun】之夢',
        '【adj】的紅茶',
        '【role】的謝罪',
        '【noun】鑑賞會'
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
      '【place】的深處，隱藏著無人知曉的【noun】。',
      '這是一個【noun】決定一切的【place】，沒有【noun】的人寸步難行。',
      '西元20XX年，【place】突然出現了神秘的【noun】。',
      '為了對抗【adj】的魔王，人類建立了【place】。',
      '在直播系統統治的【place】，人氣就是戰鬥力。',
      '這裡看似普通的【place】，實則隱藏著通往【place】的入口。',
      '在這個充滿【adj】氣息的賽博世界，【role】是最低階的存在。',
      '傳說只要集齊七個【noun】，就能實現任何願望。',
      '【place】的校規第一條：絕對不能【verb】【noun】。',
      '某天，全世界的人類都聽到了【adj】的聲音。',
      '這是被神遺棄的【place】，只有【noun】能帶來光芒。',
      '為了尋找傳說中的【noun】，少年踏上了前往【place】的旅程。',
      '在【place】的地底下，沉睡著遠古的【role】。',
      '那一天，人類終於回想起了被【role】支配的恐懼。',
      '這是一場沒有硝煙的戰爭，武器是【noun】。',
      '歡迎來到實力至上的【place】教室。',
      '在這座【adj】的城市裡，只要有【noun】就能擁有一切。',
      '當【noun】開始倒數，【role】們的生存遊戲也隨之開始。'
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
      '【role】的記憶是空白的，唯一記得的只有【noun】。',
      '原本是【adj】社畜的主角，過勞死後轉生為【role】。',
      '身為惡役千金的【role】，為了迴避【noun】結局而開始努力。',
      '主角擁有【adj】的技能「【noun】」，卻被認為是廢技。',
      '為了償還巨額債務，【role】不得不開始做【noun】直播。',
      '表面上是【adj】的【role】，背地裡其實是傳說中的【role】。',
      '被隊伍踢出的【role】，決定在邊境開一間【place】。',
      '因為點錯技能樹，【role】意外成為了【place】最強。',
      '【role】不想要後宮，只想過平靜的【adj】生活。',
      '擁有「死亡回歸」能力的【role】，誓要拯救【character】。',
      '【role】的身體裡寄宿著【adj】的【role】靈魂。',
      '轉生成為【noun】的主角，在【place】努力生存。',
      '擁有「網購」技能的【role】，在異世界開啟了慢生活。',
      '身為魔王軍幹部的【role】，其實是人類的【role】。',
      '為了尋找失蹤的妹妹，【role】潛入了【place】。',
      '這是一個關於【role】如何成為【adj】王的故事。',
      '只要【verb】就能變強？【role】對此深信不疑。',
      '雖然是【noun】，但只要有愛就沒問題了吧？',
      '24歲，是【role】。'
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
      '失去【noun】的代價，是【role】無法承受的。',
      '為了守護【character】的笑容，必須與全世界為敵。',
      '在【event】當天，主角發現了系統的致命BUG。',
      '如果不【verb】，就會在24小時內死亡。',
      '面對【adj】的修羅場，【role】的胃開始痛了起來。',
      '所有的【noun】都被奪走了，只剩下最後的希望。',
      '這是賭上【noun】的死亡遊戲，贏家只有一個。',
      'S級通緝犯【role】突然出現在主角面前。',
      '原本的盟友【role】突然背叛，將刀尖指向了【noun】。',
      '隨著【event】的進行，主角逐漸失去了【noun】。',
      '想要打破輪迴，就必須殺死最愛的【character】。',
      '世界將被【noun】吞噬，唯一的希望是【role】。',
      '這不是遊戲，而是真實的【event】。',
      '當【role】得知自己其實是【noun】時，崩潰了。',
      '為了回到原本的世界，必須打倒【place】的魔王。',
      '禁止【verb】的世界裡，【role】犯下了禁忌。',
      '面對擁有【adj】力量的敵人，【role】覺醒了。',
      '這是一場無法回頭的【event】，輸了就是死。',
      '面對【adj】的先輩，【role】只能選擇【verb】。',
      '如果不交出【noun】，就會被帶去【place】進行【event】。',
      '這是一場賭上【noun】的【event】，輸了就要喝紅茶。',
      '【role】發出了【adj】的咆哮，震攝了全場。'
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
      '這不是結束，而是【adj】篇章的開始。',
      '但主角萬萬沒想到，【character】才是幕後黑手。',
      '這份【adj】的愛，終將毀滅【place】。',
      '在那扇門後等待著的，是絕望還是【noun】？',
      '現在，反擊的狼煙已經升起。',
      '這個世界的真相，比任何【noun】都要殘酷。',
      '歡迎來到實力至上的【place】。',
      '你準備好迎接【adj】的結局了嗎？',
      '這不是英雄的故事，這是【noun】的故事。',
      '然而，這一切都只是【role】的一場夢嗎？',
      '只有我知道這個世界的【noun】。',
      '然後，少年遇見了少女。',
      '這一擊，貫穿了星辰。',
      '從那天起，【role】再也沒有笑過。',
      '代價是付出你的【noun】，你願意嗎？',
      '真相，往往比謊言更傷人。',
      '請看著我，直到最後一刻。',
      '不要停下來啊！',
      '好時代，來臨了！',
      '這麼做，真的好嗎？（察覺）',
      '最後，【role】露出了【adj】的笑容。'
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
      '等【franchise】出BD我一定全收 太值得了',
      '【franchise】我要死了...尊死...🙏',
      '今生無悔入【franchise】，來世願生【place】！',
      '【character】我婆！誰反對【franchise】我就打爆誰！',
      '這個【highlight】我能配三碗飯！',
      '【franchise】這集作畫經費燃燒啊啊啊！',
      '這集【franchise】如果不看，你的人生就白活了！',
      '感謝【franchise】誕生在這個世界上 😭',
      '【character】好可愛好可愛好可愛好可愛',
      '這不是動畫，這是藝術！【franchise】太神了',
      '看到【character】笑我就覺得世界和平了',
      '好時代來臨了！【franchise】',
      '【character】先輩好帥！哼哼啊啊啊啊',
      '目力【character】！這下不得不看了',
      '【franchise】是神作（確信）',
      '這個【franchise】要素過多 www',
      '【character】你是一個一個一個...（讚賞）'
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
      '【franchise】應該是那種看完就忘的番吧',
      '【franchise】這番適合配飯吃。',
      '最近劇荒，【franchise】值得追嗎？',
      '感覺【franchise】跟那部XX番有點像。',
      '【franchise】的歌挺好聽的，劇情就算了。',
      '【franchise】完結了嗎？養肥了再看',
      '沒看過原作，單看【franchise】動畫還OK',
      '雖然很多人罵，但我覺得【franchise】還蠻舒壓的',
      '【franchise】就是那種無聊可以看的爽片',
      '【franchise】這部番的評論區怎麼怪怪的？',
      '完全看不懂大家在刷什麼數字...',
      '為什麼這部【franchise】的彈幕這麼臭？',
      '有人可以解釋一下什麼是114514嗎？'
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
      '看完【franchise】只想說：期待越高失望越大',
      '【franchise】的敘事節奏完全崩壞，劇本家出來挨打。',
      '雖然作畫精良，但【franchise】的核心價值觀令人費解。',
      '【franchise】是典型的「開高走低」，可惜了前面的鋪陳。',
      '【character】的行為邏輯根本無法自圓其說。',
      '深度不足，【franchise】淪為賣肉番',
      '【franchise】的分鏡毫無張力，完全浪費了【highlight】',
      '這劇本是AI寫的吧？【franchise】充滿了廉價感',
      '【franchise】想探討人性，但流於表面',
      '【franchise】的BB素材運用得爐火純青，技術力過高。',
      '雖然是屑作，但【highlight】的部分意外地感人（大噓）。',
      '這部【franchise】的構圖完全致敬了本篇，很有精神。',
      '【character】的演技過於迫真，建議申遺。',
      '論【franchise】中【noun】的象徵意義。',
      '這不是普通的【franchise】，這是藝術。'
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
      '這什麼神展開 【franchise】是認真的嗎 草草草',
      '【character】：(說話) 觀眾：急了急了',
      '關於我轉生變成【franchise】觀眾這檔事 www',
      '【franchise】官方：我們做了一部神作 觀眾：就這？',
      '小丑竟是我自己 🤡 【franchise】',
      '這就是【franchise】給我的自信',
      '【character】他A了上去！他打出了GG！',
      '年輕人你不講武德 【franchise】',
      '這河狸嗎？這很不河狸口牙 【meme】',
      '要素察覺！【franchise】',
      '申遺！申遺！',
      '這味道...是【franchise】！',
      '【character】：(咆哮) 觀眾：吵死了 www',
      '太臭了（褒義）',
      '【franchise】這根本是便乘吧 草',
      '野 獸 先 輩 【character】 說',
      '【franchise】 堂 堂 連 載',
      '刻 在 D N A 裡 的 場 景'
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
      '好',
      '這集神', '推', '怕', '胃痛', '香', '婆', '簽到',
      '優', '劣', '已閱', '卡', '求詳細', '圖呢', '車來了'
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
      '【franchise】演唱會門票搶到了 機票飯店已訂',
      '【franchise】的手遊滿突了，這個月伙食費沒了',
      '家裡已經放不下【franchise】的痛車了，再買個車庫吧',
      '【franchise】聯動餐廳我包場了，群友免費來吃',
      '抽不到【character】就課到有為止 💳',
      '【franchise】的BD每家店舖特典我都要 買十套',
      '剛買了【franchise】作者的股票 支持一下',
      '為了【franchise】活動我直接飛日本了'
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
      '在二手市場挖到【franchise】的隱藏版 這運氣',
      '【franchise】的這張特典卡是錯版，市價翻倍了',
      '收到了十年前【franchise】的絕版海報，淚流滿面',
      '【franchise】全套藍光鐵盒版開箱，質感無敵',
      '這隻【character】模型如果不預購現在已經漲三倍了',
      '為了保存【franchise】原畫，我買了防潮箱',
      '這本【franchise】場刊有作者親筆簽名 傳家寶',
      '【franchise】的一番賞最後賞被我包了'
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
      '我倒要看看【franchise】還能紅多久',
      '【franchise】這種垃圾也能動畫化？業界藥丸',
      '吹【franchise】的都是小學生吧？',
      '【franchise】涉嫌抄襲XX，建議下架',
      '看到【character】那張臉就想吐',
      '【franchise】只有OP能聽，其他都是垃圾',
      '德不配位，【franchise】滾出排行榜',
      '【franchise】劇情降智，侮辱觀眾智商',
      '我就看【franchise】什麼時候涼',
      '又是inm梗，小鬼真多',
      '【franchise】的觀眾素質真差',
      '能不能不要到處刷114514？',
      'DSSQ（大勢所趨）真噁心',
      '玩爛梗有意思嗎？',
      '【franchise】這種東西也能紅？世風日下'
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
  // 🎲 V2: 場次隨機事件池 (T012-T013)
  // ═══════════════════════════════════════════════════════════════
  
  SessionEventPool: [
    // === 負面事件 (11條) ===
    {
      id: 'neg_001',
      name: '超大豪雨',
      description: '場外突然下起傾盆大雨，許多人決定待在家裡追劇',
      type: 'negative',
      category: 'weather',
      effects: [
        { target: 'visitor_count', modifier: 'multiply', value: 0.6, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.05,
        exclusive: ['pos_004']
      },
      notification: {
        title: '☔ 傾盆大雨',
        message: '場外突然下起傾盆大雨，許多人決定待在家裡追劇。來客數減少40%！',
        duration: 3000
      }
    },
    {
      id: 'neg_002',
      name: '超大手攤位',
      description: '隔壁來了超人氣大手社團，人潮塞到你的攤位前都過不去',
      type: 'negative',
      category: 'neighbor',
      effects: [
        { target: 'stay_rate', modifier: 'multiply', value: 0.7, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.06,
        exclusive: ['ext_010']
      },
      notification: {
        title: '😱 超大手攤位',
        message: '隔壁來了超人氣大手社團，人潮塞到你的攤位前都過不去。停留機率減少30%！',
        duration: 3000
      }
    },
    {
      id: 'neg_003',
      name: '打翻飲料',
      description: '小幫手不小心把珍奶打翻在作品上',
      type: 'negative',
      category: 'accident',
      effects: [
        { target: 'inventory', modifier: 'add', value: -10, scope: 'random_work' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '🧋 打翻飲料',
        message: '小幫手不小心把珍奶打翻在《{workTitle}》上。庫存損失10本！',
        duration: 3000
      }
    },
    {
      id: 'neg_004',
      name: '空調故障',
      description: '會場空調壞了，悶熱到大家都想早點回家',
      type: 'negative',
      category: 'accident',
      effects: [
        { target: 'session_time', modifier: 'multiply', value: 0.8, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '🥵 空調故障',
        message: '會場空調壞了，悶熱到大家都想早點回家。場次時間減少20%！',
        duration: 3000
      }
    },
    {
      id: 'neg_005',
      name: '找錯錢',
      description: '忙中出錯，找錯錢給好幾位顧客',
      type: 'negative',
      category: 'accident',
      effects: [
        { target: 'revenue', modifier: 'multiply', value: 0.85, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.05,
        exclusive: []
      },
      notification: {
        title: '💸 找錯錢',
        message: '忙中出錯，找錯錢給好幾位顧客。收益減少15%！',
        duration: 3000
      }
    },
    {
      id: 'neg_006',
      name: '印刷瑕疵',
      description: '發現這批刊物有印刷瑕疵，只好降價賣出',
      type: 'negative',
      category: 'accident',
      effects: [
        { target: 'price', modifier: 'multiply', value: 0.7, scope: 'random_work' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '📖 印刷瑕疵',
        message: '發現《{workTitle}》有印刷瑕疵，只好降價賣出。售價減少30%！',
        duration: 3000
      }
    },
    {
      id: 'neg_007',
      name: '場次爭議',
      description: '會場發生爭議事件，樂子人和黑子顧客蜂擁而至',
      type: 'negative',
      category: 'controversy',
      effects: [
        { target: 'bad_customer_rate', modifier: 'multiply', value: 1.5, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '😤 場次爭議',
        message: '會場發生爭議事件，樂子人和黑子顧客蜂擁而至。奧客比例增加50%！',
        duration: 3000
      }
    },
    {
      id: 'neg_008',
      name: '交通中斷',
      description: '附近交通大亂，很多人中途折返',
      type: 'negative',
      category: 'accident',
      effects: [
        { target: 'visitor_count', modifier: 'multiply', value: 0.75, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '🚗 交通中斷',
        message: '附近交通大亂，很多人中途折返。來客數減少25%！',
        duration: 3000
      }
    },
    {
      id: 'neg_009',
      name: '網路炎上',
      description: '你的作品在網路上被人挑毛病炎上',
      type: 'negative',
      category: 'social',
      effects: [
        { target: 'popularity', modifier: 'add', value: -20, scope: 'random_work' }
      ],
      triggerConditions: {
        minRound: 3,
        maxRound: null,
        probability: 0.03,
        exclusive: []
      },
      notification: {
        title: '🔥 網路炎上',
        message: '你的《{workTitle}》在網路上被人挑毛病炎上。人氣減少20點！',
        duration: 3000
      }
    },
    {
      id: 'neg_010',
      name: '同質競爭',
      description: '發現有其他社團出了相似題材的作品',
      type: 'negative',
      category: 'market',
      effects: [
        { target: 'sales', modifier: 'multiply', value: 0.8, scope: 'specific_theme' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.05,
        exclusive: []
      },
      notification: {
        title: '📚 同質競爭',
        message: '發現有其他社團出了相似題材的作品。該題材銷量減少20%！',
        duration: 3000
      }
    },
    {
      id: 'neg_011',
      name: '攤位太亂',
      description: '刊物擺放太亂，顧客找不到想要的作品',
      type: 'negative',
      category: 'accident',
      effects: [
        { target: 'sales', modifier: 'multiply', value: 0.9, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.05,
        exclusive: []
      },
      notification: {
        title: '📦 攤位太亂',
        message: '刊物擺放太亂，顧客找不到想要的作品。銷量減少10%！',
        duration: 3000
      }
    },
    
    // === 正面事件 (11條) ===
    {
      id: 'pos_001',
      name: '總統參訪',
      description: '總統蒞臨會場參訪，還買了你的刊物上新聞！',
      type: 'positive',
      category: 'celebrity',
      effects: [
        { target: 'sales', modifier: 'multiply', value: 2.0, scope: 'all' },
        { target: 'popularity', modifier: 'add', value: 50, scope: 'random_work' }
      ],
      triggerConditions: {
        minRound: 5,
        maxRound: null,
        probability: 0.01,
        exclusive: []
      },
      notification: {
        title: '🎉 總統參訪',
        message: '總統蒞臨會場參訪，還買了你的刊物上新聞！銷量翻倍，人氣大增！',
        duration: 4000
      }
    },
    {
      id: 'pos_002',
      name: '網紅推薦',
      description: '知名網紅在社群推薦你的作品',
      type: 'positive',
      category: 'social',
      effects: [
        { target: 'sales', modifier: 'multiply', value: 1.5, scope: 'random_work' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.05,
        exclusive: []
      },
      notification: {
        title: '📱 網紅推薦',
        message: '知名網紅在社群推薦《{workTitle}》！該作品銷量增加50%！',
        duration: 3000
      }
    },
    {
      id: 'pos_003',
      name: '台股大漲',
      description: '台股創新高，場內瀰漫一股「今天花多少都沒關係」的氛圍',
      type: 'positive',
      category: 'market',
      effects: [
        { target: 'budget', modifier: 'multiply', value: 1.3, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '📈 台股大漲',
        message: '台股創新高，場內瀰漫一股「今天花多少都沒關係」的氛圍。顧客預算增加30%！',
        duration: 3000
      }
    },
    {
      id: 'pos_004',
      name: '天氣晴朗',
      description: '今天天氣超好，大家都出門參加場次',
      type: 'positive',
      category: 'weather',
      effects: [
        { target: 'visitor_count', modifier: 'multiply', value: 1.25, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.06,
        exclusive: ['neg_001']
      },
      notification: {
        title: '☀️ 天氣晴朗',
        message: '今天天氣超好，大家都出門參加場次。來客數增加25%！',
        duration: 3000
      }
    },
    {
      id: 'pos_005',
      name: '好位置',
      description: '你的攤位剛好在入口附近，人潮川流不息',
      type: 'positive',
      category: 'neighbor',
      effects: [
        { target: 'stay_rate', modifier: 'multiply', value: 1.25, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.05,
        exclusive: ['ext_008']
      },
      notification: {
        title: '📍 好位置',
        message: '你的攤位剛好在入口附近，人潮川流不息。停留機率增加25%！',
        duration: 3000
      }
    },
    {
      id: 'pos_006',
      name: '回頭客',
      description: '有粉絲帶了一群朋友來支持你',
      type: 'positive',
      category: 'social',
      effects: [
        { target: 'sales', modifier: 'add', value: 20, scope: 'random_work' }
      ],
      triggerConditions: {
        minRound: 2,
        maxRound: null,
        probability: 0.06,
        exclusive: []
      },
      notification: {
        title: '🙋 回頭客',
        message: '有粉絲帶了一群朋友來支持你！《{workTitle}》銷量增加20本！',
        duration: 3000
      }
    },
    {
      id: 'pos_007',
      name: '話題熱潮',
      description: '你的作品題材剛好搭上最近的話題熱潮',
      type: 'positive',
      category: 'market',
      effects: [
        { target: 'popularity', modifier: 'add', value: 30, scope: 'specific_theme' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.05,
        exclusive: []
      },
      notification: {
        title: '🔥 話題熱潮',
        message: '你的作品題材剛好搭上最近的話題熱潮！該題材人氣增加30點！',
        duration: 3000
      }
    },
    {
      id: 'pos_008',
      name: '同好聚會',
      description: '附近有相關題材的同好聚會，結束後大家順便逛場',
      type: 'positive',
      category: 'social',
      effects: [
        { target: 'visitor_count', modifier: 'multiply', value: 1.4, scope: 'specific_theme' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '👥 同好聚會',
        message: '附近有相關題材的同好聚會，結束後大家順便逛場。該題材來客增加40%！',
        duration: 3000
      }
    },
    {
      id: 'pos_009',
      name: '贊助商邀約',
      description: '有廠商看上你的作品，洽談合作授權',
      type: 'positive',
      category: 'celebrity',
      effects: [
        { target: 'revenue', modifier: 'add', value: 5000, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 5,
        maxRound: null,
        probability: 0.03,
        exclusive: []
      },
      notification: {
        title: '💼 贊助商邀約',
        message: '有廠商看上你的作品，洽談合作授權！獲得額外收入 $5000！',
        duration: 3000
      }
    },
    {
      id: 'pos_010',
      name: '完售慶祝',
      description: '某作品提前完售，消息傳開後更多人來攤位朝聖',
      type: 'positive',
      category: 'social',
      effects: [
        { target: 'sales', modifier: 'multiply', value: 1.15, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.04,
        requiresSoldOut: true,
        exclusive: []
      },
      notification: {
        title: '🎊 完售慶祝',
        message: '某作品提前完售，消息傳開後更多人來攤位朝聖！其他作品銷量增加15%！',
        duration: 3000
      }
    },
    {
      id: 'pos_011',
      name: 'Coser合照',
      description: '你僱用的Coser小幫手超受歡迎，大家排隊合照',
      type: 'positive',
      category: 'celebrity',
      effects: [
        { target: 'stay_rate', modifier: 'multiply', value: 1.4, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.05,
        requiresUpgrade: { id: 'coser', minLevel: 1 },
        exclusive: []
      },
      notification: {
        title: '📸 Coser合照',
        message: '你僱用的Coser小幫手超受歡迎，大家排隊合照！停留機率增加40%！',
        duration: 3000
      }
    },
    
    // === 混合/擴充事件 (10條) ===
    {
      id: 'ext_001',
      name: '電力中斷',
      description: '會場臨時停電半小時',
      type: 'negative',
      category: 'accident',
      effects: [
        { target: 'session_time', modifier: 'multiply', value: 0.85, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.03,
        exclusive: []
      },
      notification: {
        title: '💡 電力中斷',
        message: '會場臨時停電半小時。場次時間減少15%！',
        duration: 3000
      }
    },
    {
      id: 'ext_002',
      name: '作品獲獎',
      description: '你的作品獲得場次人氣獎提名',
      type: 'positive',
      category: 'celebrity',
      effects: [
        { target: 'popularity', modifier: 'add', value: 40, scope: 'random_work' }
      ],
      triggerConditions: {
        minRound: 3,
        maxRound: null,
        probability: 0.03,
        exclusive: []
      },
      notification: {
        title: '🏆 作品獲獎',
        message: '你的《{workTitle}》獲得場次人氣獎提名！人氣增加40點！',
        duration: 3000
      }
    },
    {
      id: 'ext_003',
      name: '排隊人潮',
      description: '攤位大排長龍，反而嚇跑一些不想等的顧客',
      type: 'mixed',
      category: 'social',
      effects: [
        { target: 'stay_rate', modifier: 'multiply', value: 0.85, scope: 'all' },
        { target: 'sales', modifier: 'multiply', value: 1.2, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 2,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '🚶 排隊人潮',
        message: '攤位大排長龍，反而嚇跑一些不想等的顧客。停留機率-15%，但銷量+20%！',
        duration: 3000
      }
    },
    {
      id: 'ext_004',
      name: '老朋友到訪',
      description: '多年沒見的創作圈老友來探班聊天',
      type: 'positive',
      category: 'social',
      effects: [
        { target: 'next_round_efficiency', modifier: 'multiply', value: 1.2, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 3,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '👋 老朋友到訪',
        message: '多年沒見的創作圈老友來探班聊天。下輪創作效率+20%！',
        duration: 3000
      }
    },
    {
      id: 'ext_005',
      name: '物流延誤',
      description: '部分刊物物流延誤，場次開始時庫存不足',
      type: 'negative',
      category: 'accident',
      effects: [
        { target: 'inventory', modifier: 'multiply', value: 0.7, scope: 'random_work' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '📦 物流延誤',
        message: '《{workTitle}》物流延誤，場次開始時庫存減少30%！',
        duration: 3000
      }
    },
    {
      id: 'ext_006',
      name: '快閃促銷',
      description: '你決定來個快閃特價活動吸引人潮',
      type: 'mixed',
      category: 'market',
      effects: [
        { target: 'price', modifier: 'multiply', value: 0.8, scope: 'all' },
        { target: 'sales', modifier: 'multiply', value: 1.35, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '🏷️ 快閃促銷',
        message: '你決定來個快閃特價活動吸引人潮。售價-20%，但銷量+35%！',
        duration: 3000
      }
    },
    {
      id: 'ext_007',
      name: '媒體採訪',
      description: '有媒體來採訪場次，順便拍了你的攤位',
      type: 'positive',
      category: 'celebrity',
      effects: [
        { target: 'reputation', modifier: 'add', value: 10, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 2,
        maxRound: null,
        probability: 0.04,
        exclusive: []
      },
      notification: {
        title: '📺 媒體採訪',
        message: '有媒體來採訪場次，順便拍了你的攤位。社團知名度+10點！',
        duration: 3000
      }
    },
    {
      id: 'ext_008',
      name: '場地太遠',
      description: '這次場地位置偏僻，很多人懶得來',
      type: 'negative',
      category: 'accident',
      effects: [
        { target: 'visitor_count', modifier: 'multiply', value: 0.85, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.05,
        exclusive: ['pos_005']
      },
      notification: {
        title: '🗺️ 場地太遠',
        message: '這次場地位置偏僻，很多人懶得來。來客數減少15%！',
        duration: 3000
      }
    },
    {
      id: 'ext_009',
      name: '主辦優惠',
      description: '主辦單位推出入場優惠活動',
      type: 'positive',
      category: 'market',
      effects: [
        { target: 'visitor_count', modifier: 'multiply', value: 1.2, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.05,
        exclusive: []
      },
      notification: {
        title: '🎫 主辦優惠',
        message: '主辦單位推出入場優惠活動。來客數增加20%！',
        duration: 3000
      }
    },
    {
      id: 'ext_010',
      name: '隔壁棄攤',
      description: '隔壁攤位沒來設攤，空間變寬敞了',
      type: 'positive',
      category: 'neighbor',
      effects: [
        { target: 'stay_rate', modifier: 'multiply', value: 1.1, scope: 'all' }
      ],
      triggerConditions: {
        minRound: 1,
        maxRound: null,
        probability: 0.05,
        exclusive: ['neg_002']
      },
      notification: {
        title: '🪑 隔壁棄攤',
        message: '隔壁攤位沒來設攤，空間變寬敞了。停留機率增加10%！',
        duration: 3000
      }
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
    '治癒', '黑暗', '戰鬥', '校園', '電競', '直播', '轉生', '惡役', '宮鬥', '機戰', '特攝', '歷史',
    '推理', '恐怖', '賽博龐克', '蒸汽龐克', '克蘇魯', '末日', '喪屍'
  ],

  // ═══════════════════════════════════════════════════════════════
  // 🎙️ V3: 聲線模板 (Voice/Tone Templates)
  // ═══════════════════════════════════════════════════════════════

  VoiceTemplates: {
    OFFICIAL_ANNOUNCE: {
      id: 'OFFICIAL_ANNOUNCE',
      name: '官方公告風',
      templates: [
        '【公式】《【franchise】》重大發表即將公開，敬請期待。',
        '【官方消息】《【franchise】》最新情報將於近日解禁。',
        '感謝各位一直以來對《【franchise】》的支持。今後也請多多指教。',
        '《【franchise】》官方帳號：「感謝大家的熱情支持，我們會繼續努力！」'
      ]
    },
    NEWS_REPORT: {
      id: 'NEWS_REPORT',
      name: '新聞報導風',
      templates: [
        '【速報】《【franchise】》相關討論在各大平台持續延燒，累計討論數突破新高',
        '業界消息指出，《【franchise】》的影響力已超出預期，相關周邊銷售額持續攀升',
        '據統計，《【franchise】》在本季度的社群提及量位居前列',
        '《【franchise】》現象持續發酵，分析師指出同人創作量較上季增長顯著'
      ]
    },
    RECOMMENDATION: {
      id: 'RECOMMENDATION',
      name: '推薦風',
      templates: [
        '如果你還沒看過《【franchise】》，強烈建議從第一話開始補。相信我。',
        '最近被安利了《【franchise】》，看完只想說：為什麼不早點看',
        '想找新番看的人，《【franchise】》絕對不會讓你失望',
        '我終於懂為什麼大家都在推《【franchise】》了……真的神'
      ]
    },
    PASSERBY: {
      id: 'PASSERBY',
      name: '路人風',
      templates: [
        '等公車的時候看到旁邊的人在看《【franchise】》，這麼紅嗎',
        '公司同事午休都在聊《【franchise】》，完全插不上話',
        '走在路上看到《【franchise】》的海報，最近到處都是',
        '便利商店又在賣《【franchise】》的聯名了，真的很會'
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // 📡 V3: 社群事件池 (Social Events - 與 SessionEventPool 分開)
  // ═══════════════════════════════════════════════════════════════

  SocialEventPool: [
    {
      id: 'social_viral_clip',
      name: '名場面瘋傳',
      description: '《【franchise】》某段名場面被大量轉發',
      platformAmplifier: { FEETBOOK: 1.2, Y: 2.0, THREECH: 1.0 },
      contentHook: 'viral',
      effect: { popularity: 10 },
      probability: 0.08,
      cooldown: 2,
      eventTemplates: [
        '天啊【franchise】這段太強了吧！！截圖截到手軟，【character】這個眼神殺太犯規了吧',
        '我已經把【franchise】那段【highlight】轉發給所有朋友了，沒看過的人生是不完整的',
        '【franchise】這個名場面已經在我的腦海裡住了三天了...每次想到都起雞皮疙瘩',
        '剛從【franchise】名場面合集出來，又開始重刷第N遍了，【character】的演技是真的',
        '本來只是路過看了【franchise】的片段，結果一整天都在補番...這段太神了',
        '朋友圈全部都在轉【franchise】那個場景 我終於知道為什麼了 淚目',
        '【franchise】的【highlight】片段觀看次數破百萬了吧？這就是神作的力量'
      ]
    },
    {
      id: 'social_drama_leak',
      name: '劇情洩漏',
      description: '《【franchise】》的未公開劇情被人提前洩漏',
      platformAmplifier: { FEETBOOK: 1.0, Y: 1.5, THREECH: 2.5 },
      contentHook: 'drama',
      effect: { popularity: 5, density: -0.05 },
      probability: 0.04,
      cooldown: 3,
      eventTemplates: [
        '等等...剛才看到的【franchise】爆料是真的嗎？如果是真的那也太扯了吧，我先去確認一下',
        '拜託不要爆雷【franchise】！！我才看到第三集啊啊啊，到處都是劇透我要崩潰了',
        '所以【franchise】後面真的是那個發展？？編劇你認真的？？？比我預想的還離譜...',
        '【franchise】洩漏劇情的人是不是該被告啊 這種事情真的很掃興',
        '看到【franchise】的劇透了...好氣喔，本來想等更新的，現在完全沒驚喜了',
        '聽說【franchise】後面的展開被提前曝光了？追番體驗直接減半',
        '【franchise】劇情洩漏事件讓粉絲圈炸鍋了，官方到底要不要出來說明一下'
      ]
    },
    {
      id: 'social_official_reply',
      name: '官方互動',
      description: '《【franchise】》官方帳號罕見地回覆粉絲',
      platformAmplifier: { FEETBOOK: 1.5, Y: 2.0, THREECH: 0.5 },
      contentHook: 'official',
      effect: { popularity: 8, density: 0.05 },
      probability: 0.05,
      cooldown: 3,
      eventTemplates: [
        '等等【franchise】官方剛剛回覆粉絲了！！太罕見了吧，看來團隊真的有在看大家的反饋',
        '【franchise】官方竟然翻牌了一個粉絲的同人圖！！身為創作者我超感動的',
        '剛看到【franchise】的製作人在官推上感謝大家的支持，還預告了新情報，期待值爆表！！',
        '【franchise】官方今天互動度超高的...是要發重大消息的前兆嗎？好緊張',
        '【franchise】的聲優轉發了粉絲的手書動畫，這互動也太暖了吧 感覺官方很重視粉絲',
        '官方親自下場回應了【franchise】的爭議，態度很誠懇，好感度直接拉滿'
      ]
    },
    {
      id: 'social_cancel_attempt',
      name: '取消文化攻擊',
      description: '《【franchise】》遭到取消文化攻擊，引發激烈論戰',
      platformAmplifier: { FEETBOOK: 1.0, Y: 2.0, THREECH: 3.0 },
      contentHook: 'controversy',
      effect: { popularity: 3, density: -0.1 },
      probability: 0.03,
      cooldown: 4,
      eventTemplates: [
        '【franchise】又被人挖舊帳出來鞭了...拜託這些人能不能去找點正事做',
        '所以現在是連看個【franchise】都要被道德審查了是嗎？取消文化真的夠了吧',
        '【franchise】的爭議鬧好大...老實說雙方的論點我都覺得有點極端',
        '看到有人在炎上【franchise】的某段劇情，說是在傳播不好的價值觀？可是那明明是反派的台詞啊...',
        '【franchise】製作組被要求道歉了，這年頭創作自由真的很脆弱',
        '身為【franchise】粉絲看到這波攻擊真的很心痛...作品本身明明很好',
        '【franchise】取消風波持續延燒中，評分已經被刷了一波一星...'
      ]
    },
    {
      id: 'social_cosplay_trend',
      name: 'Cosplay熱潮',
      description: '《【franchise】》角色Cosplay在社群上爆紅',
      platformAmplifier: { FEETBOOK: 2.0, Y: 1.5, THREECH: 0.5 },
      contentHook: 'visual',
      effect: { popularity: 12, density: 0.08 },
      probability: 0.04,
      cooldown: 3,
      eventTemplates: [
        '這個【franchise】的【character】Cosplay也太還原了吧！！照片美到不像真人',
        '最近場次上【franchise】的Coser好多啊，根本已經變成Cosplay必選作品了',
        '看到一組超專業的【franchise】團體Cos，佈景道具全到位，質感直接電影級',
        '【franchise】的Cos挑戰在社群上爆了，連平常不看動畫的朋友都在傳照片',
        '這週逛場看到至少十個【character】的Cos...【franchise】的人氣真的太恐怖了',
        '有人把【franchise】的Cos照修成動畫截圖風格，完全分不出真假 太強了吧'
      ]
    },
    {
      id: 'social_ship_war',
      name: 'CP大戰',
      description: '《【franchise】》粉絲因CP配對引發激烈爭論',
      platformAmplifier: { FEETBOOK: 1.5, Y: 2.5, THREECH: 2.0 },
      contentHook: 'drama',
      effect: { popularity: 5, density: 0.1 },
      probability: 0.04,
      cooldown: 3,
      eventTemplates: [
        '【franchise】的CP論戰又開始了...這次是因為新一集的那個畫面，雙方都說自己贏了',
        '求求【franchise】粉絲不要再吵CP了好嗎！！我只想安靜追番 時間線全部都是吵架',
        '我覺得【franchise】官方是故意埋CP暗示的吧？每次都搞得粉絲互相開戰',
        '【franchise】CP戰爭第N天，雙方產出的同人創作倒是都很精彩（小聲',
        '看到【franchise】的兩派粉絲又吵起來了，寫了三千字分析文互相反駁，這energy不如拿去創作',
        '身為雜食黨看【franchise】的CP大戰真的很快樂 兩邊的論述都好有道理'
      ]
    },
    {
      id: 'social_fan_theory',
      name: '考據文爆紅',
      description: '有人發了一篇《【franchise】》的超長考據分析文',
      platformAmplifier: { FEETBOOK: 1.8, Y: 1.2, THREECH: 1.5 },
      contentHook: 'analysis',
      effect: { popularity: 6, density: 0.08 },
      probability: 0.04,
      cooldown: 3,
      eventTemplates: [
        '剛看完那篇【franchise】的考據文...天啊原來藏了這麼多伏筆，我看了等於沒看',
        '【franchise】的設定考據大佬又出手了！這次分析了【highlight】背後的文化典故，真的長知識',
        '有人把【franchise】每一集的背景細節都截圖分析了，製作組藏的彩蛋也太多了吧',
        '那篇【franchise】的角色心理分析文寫得太好了，看完覺得【character】的行為完全可以理解了',
        '推薦大家去看那篇【franchise】的世界觀整理文，終於搞懂那些設定之間的關聯了',
        '讀完【franchise】的考據文才知道原來那段劇情致敬了XX...製作組的用心程度太可怕了'
      ]
    },
    {
      id: 'social_meme_explosion',
      name: '迷因大爆發',
      description: '《【franchise】》的某個畫面被做成各種迷因',
      platformAmplifier: { FEETBOOK: 1.0, Y: 2.5, THREECH: 1.5 },
      contentHook: 'meme',
      effect: { popularity: 15, density: -0.05 },
      probability: 0.05,
      cooldown: 2,
      eventTemplates: [
        '我的時間線全部都是【franchise】的梗圖了wwww 那個表情太萬用了吧',
        '【franchise】【character】的那個表情已經被做成50種版本了吧 每個都好笑 草',
        '等等連不看動畫的人都在用【franchise】的梗圖了？？這傳播力也太扯',
        '今天份的【franchise】迷因大賞：冠軍是「【meme】」系列 笑到頭痛',
        '【franchise】這集貢獻的梗圖素材夠用一整年了吧 製作組是故意的嗎www',
        '一打開社群全部都是【franchise】的梗 我真的無法正經看這部了 哈哈哈哈',
        '【franchise】現在已經不是動畫了 是迷因製造機 每週都有新素材'
      ]
    }
  ],

  // ═══════════════════════════════════════════════════════════════
  // 🎨 V3: 平台包裝模板 (Platform Wrapper Templates)
  // ═══════════════════════════════════════════════════════════════

  PlatformWrappers: {
    // ─────────────────────────────────────────────────
    // FeetBook: 長文、正經、帶分析、有段落感
    // ─────────────────────────────────────────────────
    FEETBOOK: {
      _prefixes: {
        ENTHUSIAST: ['【推薦】', '【安利】', '【心得】'],
        CRITIC:     ['【評論】', '【分析】', '【觀後感】'],
        MEMER:      ['【日常】', '【搞笑】', ''],
        CASUAL:     ['【閒聊】', '【隨筆】', ''],
        LURKER:     [],
        WHALE:      ['【開箱】', '【購入紀錄】', '【戰利品】'],
        COLLECTOR:  ['【收藏】', '【曬物】', '【典藏】'],
        HATER:      ['【吐槽】', '【負雷】', '']
      },
      _suffixes: [
        '\n\n大家怎麼看？歡迎留言討論',
        '\n\n有同感的幫我按個讚！',
        '\n\n以上純屬個人心得，不喜勿噴',
        '\n\n在下拋磚引玉，歡迎補充',
        '', '', ''
      ],
      _genericTags: ['#動漫心得', '#追番日記', '#宅文化', '#二次元', '#同人創作', '#御宅族', '#動漫推薦'],
      postWrapper: function(content, franchise, engagement, fanType) {
        var prefixes = this._prefixes[fanType] || [''];
        var prefix = prefixes.length > 0 ? prefixes[Math.floor(Math.random() * prefixes.length)] : '';
        var body = prefix ? prefix + ' ' + content : content;

        // 30% 機率附加互動尾句 (LURKER 除外)
        if (fanType !== 'LURKER' && Math.random() < 0.3) {
          body += this._suffixes[Math.floor(Math.random() * this._suffixes.length)];
        }

        // 動態 hashtag
        var tags = ['#' + franchise.name];
        var fTags = franchise.tags;
        if (fTags && fTags.length > 0) {
          tags.push('#' + fTags[Math.floor(Math.random() * fTags.length)]);
        }
        tags.push(this._genericTags[Math.floor(Math.random() * this._genericTags.length)]);

        return {
          format: 'long',
          body: body,
          footer: tags.join(' '),
          engagementDisplay: '\uD83D\uDC4D ' + engagement.likes + '  \uD83D\uDCAC ' + engagement.comments + '  \uD83D\uDD01 ' + engagement.shares
        };
      },
      commentTemplates: [
        '推推！', '收藏了', '感同身受', '我也是！', '已加書籤',
        '+1', '太懂了', '說得太好了', '幫推', '真的！'
      ]
    },

    // ─────────────────────────────────────────────────
    // Y (推特): 短文、感嘆多、emoji/顏文字密集、hashtag多
    // ─────────────────────────────────────────────────
    Y: {
      _kaomoji: ['(ᐛ)', '(ᗒᗣᗕ)', '٩(ˊᗜˋ*)و', '(´;ω;`)', '(☍﹏⁰)', '(ノ∀`)'],
      _emojis: ['🔥', '😭', '✨', '💀', '💯', '👀', '⚡'],
      _trendTags: ['#今期必看', '#新番', '#追番中', '#動漫', '#同人誌即賣會', '#本日熱門'],
      postWrapper: function(content, franchise, engagement, fanType) {
        // 25% 機率追加顏文字
        if (fanType !== 'LURKER' && Math.random() < 0.25) {
          content += ' ' + this._kaomoji[Math.floor(Math.random() * this._kaomoji.length)];
        }

        // 20% 機率追加 emoji 連發
        if (fanType !== 'LURKER' && fanType !== 'CRITIC' && Math.random() < 0.2) {
          var e = this._emojis[Math.floor(Math.random() * this._emojis.length)];
          content += ' ' + e + e + e;
        }

        // 截斷至 140 字
        var body = content.length > 140 ? content.substring(0, 137) + '...' : content;

        // 動態 hashtag — Y 風格密集
        var tags = ['#' + franchise.name];
        var fTags = franchise.tags;
        if (fTags && fTags.length > 0) {
          var idx1 = Math.floor(Math.random() * fTags.length);
          tags.push('#' + fTags[idx1]);
          if (fTags.length > 1 && Math.random() < 0.5) {
            var idx2 = (idx1 + 1 + Math.floor(Math.random() * (fTags.length - 1))) % fTags.length;
            tags.push('#' + fTags[idx2]);
          }
        }
        tags.push(this._trendTags[Math.floor(Math.random() * this._trendTags.length)]);

        return {
          format: 'short',
          body: body,
          footer: tags.join(' '),
          engagementDisplay: '♡ ' + engagement.likes + '  \uD83D\uDD01 ' + engagement.retweets
        };
      }
    },

    // ─────────────────────────────────────────────────
    // 3ch (匿名論壇): 匿名、毒舌、梗多、w結尾、安價風
    // ─────────────────────────────────────────────────
    THREECH: {
      _threadSubjects: ['総合', '今期アニメ', '同人総合', '雑談', '作品語り', '実況', 'アンチ'],
      _wSuffixes: [' w', ' www', ' 草', '（笑）', ' ワロタ'],
      _forumPrefixes: ['', '', '', '>>REPLYNUM\n', '>>REPLYNUM\n', 'そもそも', 'ぶっちゃけ', '正直'],
      postWrapper: function(content, franchise, engagement, fanType) {
        // 隨機論壇前綴
        var prefix = this._forumPrefixes[Math.floor(Math.random() * this._forumPrefixes.length)];
        if (prefix.indexOf('REPLYNUM') !== -1) {
          prefix = prefix.replace('REPLYNUM', String(Math.floor(Math.random() * 900) + 100));
        }

        // 40% 機率加 w/草 結尾
        var suffix = '';
        if (Math.random() < 0.4) {
          suffix = this._wSuffixes[Math.floor(Math.random() * this._wSuffixes.length)];
        }

        var body = prefix + content + suffix;

        // 3ch 用串標題取代 hashtag
        var subjectIdx = Math.floor(Math.random() * this._threadSubjects.length);
        var threadSubject = '【' + franchise.name + '】' + this._threadSubjects[subjectIdx];

        return {
          format: 'anonymous',
          body: body,
          footer: threadSubject,
          engagementDisplay: 'Re: ' + engagement.replies + ' | 勢い: ' + engagement.thread_speed
        };
      },
      anonNameTemplates: [
        '名無しさん', '以下、名無しにかわりまして', '風吹けば名無し',
        '名無しに人権はない', '通りすがり', '匿名希望'
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // 💎 收藏品名稱模板
  // ═══════════════════════════════════════════════════════════════

  CollectibleTemplates: {
    /** 形容詞池（統一） */
    Adjectives: [
      '精緻的', '手工的', '彩色版', '特別版', '限時的', '復刻版',
      '限量的', '簽名版', '豪華版', '典藏版', '編號版', '紀念版',
      '世界限定', '作者親繪', '0號原型', '傳說中的', '唯一的', '夢幻逸品'
    ],

    /** 周邊類型池 */
    PeripheralTypes: [
      '簽繪板', '掛軸', '壓克力立牌', '金屬徽章',
      'Q版公仔', '吊飾', '色紙', '明信片套組',
      'B2海報', '抱枕套', '馬克杯', '資料夾套組',
      '等身抱枕', '亞克力鑰匙圈', '胸章套組', '透明卡片'
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 🎉 V5: 社團成員招募台詞
  // ═══════════════════════════════════════════════════════════════

  MemberTemplates: {
    /** 慶功宴開場白 */
    banquetIntro: [
      '慶功宴開始！來看看有誰被美食吸引來了...',
      '辛苦了！今天的慶功宴會遇見什麼人呢？',
      '乾杯！讓我們看看誰會被我們的熱情感染！',
      '開動！慶功宴最棒的就是能認識新朋友！'
    ],
    /** 成員登場台詞（按成員ID） */
    recruitLines: {
      porter:          ['「搬東西交給我就好！」黑狗擼起袖子。', '「這些箱子？小意思啦！」'],
      art_junior:      ['「前輩，這個排版...讓我來調整一下好嗎？」小櫻怯生生地舉手。', '「我、我可以幫忙嗎？」'],
      social_intern:   ['「哇！你們社團好酷！我馬上發推！」小鈴已經掏出手機了。', '「關注、轉推、按讚！三連擊！」'],
      part_timer:      ['「需要幫忙嗎？什麼都可以喔。」小翠露出可靠的微笑。', '「我排班表很彈性的！」'],
      proofreader:     ['「第三頁第七行有個錯字。」眼鏡娘推了推眼鏡。', '「錯字是不被允許的。」'],
      otaku_friend:    ['「你們的新刊我每本都有買喔！」光興奮地說。', '「我是從第一本就開始追的忠實讀者！」'],
      barker:          ['「走過路過不要錯過——」小春的聲音穿透了整個會場。', '「讓我來幫你們吆喝！」'],
      penny_pincher:   ['「這個進貨價還能再談。」小財翻開計算機。', '「省一塊是一塊！」'],
      popular_coser:   ['「需要愛麗絲穿哪個角色的衣服呢？♡」愛麗絲歪頭微笑。', '「攤位前的人潮就交給愛麗絲吧！」'],
      genius_editor:   ['「你的故事架構需要修改。」與謝野毫不留情地指出。', '「不是批評，是讓它變得更好。」'],
      print_heir:      ['「印刷的事找我老爸就對了。」老陳拍拍胸膛。', '「成本？算我們友情價。」'],
      sns_influencer:  ['「一條推文就能搞定～」小遙晃了晃手機。', '「我的粉絲可是很捧場的喔。」'],
      veteran:         ['「二十年前我也是從這樣的小攤位開始的啊。」火龍頭感慨地說。', '「讓前輩教你們幾招。」'],
      night_owl:        ['「現在才凌晨兩點而已...正是靈感爆發的時候。」夜鶴打了個哈欠。', '「白天？白天是用來睡覺的。」'],
      bookbinder:       ['「機器印的沒有溫度。」阿紙撫摸著手工裝訂的書脊。', '「讓我來幫你們做特裝版吧。」'],
      map_master:       ['「攤位的動線不對...讓我重新規劃一下。」小地拿出了捲尺。', '「人流就像水，要引導它的方向。」'],
      data_nerd:        ['「根據我的分析，你們下一場的預期銷量是...」阿算推了推眼鏡。', '「數據不會騙人的。」'],
      cheerleader:      ['「大家加油！我們一定可以的！」元氣揮舞著自製的應援扇。', '「沒有什麼是熱情解決不了的！」'],
      delivery_ace:     ['「這些搬到攤位要多久？看我的！」飛毛已經開始搬了。', '「效率就是我的中間名。」'],
      bargain_hunter:   ['「這家印刷廠比你們現在用的便宜30%喔。」折扣姬晃了晃手機裡的比價表。', '「省錢是一種藝術。」'],
      manga_assistant:  ['「背景和網點就交給我吧。」小綠已經坐在作畫桌前了。', '「效果線要再多加一點才有魄力。」'],
      event_planner:    ['「來辦個互動表演怎麼樣？」小桃的眼睛閃著光。', '「讓攤位嗨起來吧！」'],
      logistics_queen:  ['「你們的庫存管理完全不合理...」莉央嘆了口氣。', '「物流最優化，交給我來處理吧。」'],
      otaku_celeb:      ['「喔？這個社團有點意思。」柚子拿起新刊開始翻閱。', '「...我可以幫你們宣傳。」'],
      sharp_critic:     ['「坦白說，你們的作品有很大的改善空間。」三角毫不留情。', '「先去讀諾斯底跟尼采吧。」'],
      legendary_artist: ['「...有趣的社團。」翻車魚大人微微點頭。', '「讓我看看你們的作品。」'],
      industry_giant:   ['「あら、なかなかいいサークルね。」あやめ拿起一本新刊翻閱。', '「我可以幫你們擴大影響力。」'],
      angel:            ['「錢的事不用擔心。」香港人推了推墨鏡。', '「投資有潛力的社團，是我的興趣。」'],
      publisher_mogul:  ['「嗯...你們社團有商業化的潛力。」卡了先生端起紅酒杯。', '「印量、通路、宣傳——全部包在我身上。」'],
      meme_lord:        ['「欸我可以把你們的攤位拍成短影片嗎？」草泥馬已經架好手機了。', '「放心，我的影片最少都百萬觀看。」']
    },
    /** 重複抽到已有成員 */
    duplicateLines: [
      '「啊，又是{name}！」\n已經是社團成員了，退回 {refund} 元作為聚餐補貼。',
      '「{name}又來湊熱鬧了！」\n重複的成員，退款 {refund} 元。',
      '「{name}帶著便當來了！」\n已經加入過了，退回 {refund} 元。'
    ],
    /** 成員滿時抽到新成員 */
    fullRosterLines: [
      '社團空間已滿！要替換現有成員嗎？',
      '已經沒有多餘的位置了...要讓誰離開嗎？'
    ],
    /** 解僱成員 */
    dismissLines: [
      '「謝謝你一直以來的幫忙，{name}！」',
      '「再見了{name}，有緣再見！」',
      '「{name}離開了社團，帶走了一箱泡麵。」'
    ]
  }
};

// 導出配置（支援多種環境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentTemplates;
} else if (typeof window !== 'undefined') {
  window.ContentTemplates = ContentTemplates;
}
