# Feature Specification: Doujin Circle Management Simulator

**Feature Branch**: `1-doujin-sim`  
**Created**: 2026-02-09  
**Status**: Draft  
**Input**: User description: "A browser-based simulation game where players manage a doujin (fan creation) circle through multiple convention cycles. Players analyze social media trends, create fan works based on popular franchises, prepare publications, and sell at conventions. The game simulates the realistic dynamics of doujin culture where choosing the right topic matters more than content quality."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Core Simulation Loop (Priority: P1)

A player starts a new game as a doujin circle creator. They observe social media discussions about various anime/game franchises, decide which topic is trending, spend time creating fan content drafts, and then participate in a convention to sell their work. The round ends with sales results and financial outcomes.

**Why this priority**: This is the absolute core gameplay loop that defines the game experience. Without this, there is no game. It delivers the fundamental value proposition: experiencing the strategic decision-making of doujin circle management.

**Independent Test**: Open the game in a browser, observe social media feed showing multiple franchise discussions, create at least one draft for a chosen franchise, proceed through convention preparation (minimal settings), and complete a sales round that shows how many books sold and profit/loss. This standalone loop demonstrates the core game mechanic.

**Acceptance Scenarios**:

1. **Given** a new game session, **When** player views the social media phase, **Then** they see 20-100 simulated posts about various franchises with different sentiment types (enthusiastic fans, casual viewers, critics); each post reads naturally with varied phrasing not obviously templated
2. **Given** franchises are generated, **When** player views franchise list, **Then** each franchise displays unique dynamically-generated title (Japanese or Chinese style), description, and 3-4 tags; no two franchises have identical names
3. **Given** the social media phase complete, **When** player enters action phase with 5 action points, **Then** they can spend action points to create drafts for different franchises
4. **Given** player has created at least one draft, **When** they proceed to convention preparation, **Then** they can configure basic print run and pricing
5. **Given** convention preparation complete, **When** convention simulation runs, **Then** sales results show based on franchise popularity, audience density, fan type distribution, and player's choices
6. **Given** convention ends, **When** results displayed, **Then** player sees money earned/lost, books sold, and can proceed to next round

---

### User Story 2 - Strategic Action Management (Priority: P2)

During the action phase, a player strategically allocates limited action points across multiple activities: creating drafts for different franchises, researching franchises to understand content depth, and analyzing fan communities to predict sales potential. They must balance risk (creating early with incomplete information) versus reward (higher quality from deeper understanding).

**Why this priority**: This adds strategic depth to what would otherwise be a simple "pick popular thing" game. It introduces meaningful player choice and skill expression through resource allocation, making the game engaging rather than deterministic.

**Independent Test**: In action phase, verify player can: (1) create multiple drafts for different franchises, (2) spend actions to increase "understanding" of a franchise (affecting quality), (3) spend actions to reveal fan demographics for a franchise (affecting sales prediction), and (4) see meaningful differences in sales outcomes based on these choices when tested across multiple rounds.

**Acceptance Scenarios**:

1. **Given** player in action phase with 5 AP, **When** they create a draft, **Then** one action point is consumed and draft stock increases
2. **Given** player has remaining AP, **When** they "study" a franchise (watch/read content), **Then** that franchise's "essence" level increases, improving potential quality of future drafts
3. **Given** player has remaining AP, **When** they "research community" for a franchise, **Then** market intelligence is revealed showing: popularity level, theoretical buyer count (popularity × density), fan type distribution hints (e.g., "High enthusiast concentration, moderate casual presence")
4. **Given** multiple drafts created with different essence levels, **When** convention occurs, **Then** higher essence drafts generate more sales from quality-sensitive fan types (enthusiasts, collectors)
5. **Given** player researched community demographics, **When** choosing which draft to print, **Then** they can make informed decisions based on revealed market size (popularity × density), activity level (social visibility), and fan composition

---

### User Story 3 - Convention Preparation & Economics (Priority: P2)

A player prepares their publication for the convention by making economic decisions: print quantity (volume discounts vs. inventory risk), paper quality (cost vs. visual appeal), cover commissioning (free AI vs. expensive popular artist affecting customer attraction), and retail pricing (accessibility vs. profit margin). These choices impact both upfront costs and sales performance.

**Why this priority**: This introduces the business management dimension, creating tension between investment and risk. It's still core to the simulation but could be simplified to defaults in a bare-minimum MVP, hence P2 rather than P1.

**Independent Test**: Starting with a completed draft, configure various preparation options (print 50 vs 200 copies, cheap vs premium paper, no-cost AI cover vs expensive commissioned cover), then observe how these choices affect: (1) upfront costs deducted from money, (2) per-unit production cost, (3) customer stop rate at booth (cover quality), and (4) ultimate sales volume reflecting these differences.

**Acceptance Scenarios**:

1. **Given** player has a completed draft, **When** entering prep phase, **Then** they can select print quantity with visible unit cost calculation (higher volume = lower per-unit cost)
2. **Given** prep phase, **When** player selects paper quality option, **Then** cost multiplier is applied (e.g., recycled paper -20% cost, premium paper +50% cost, also affects attractiveness)
3. **Given** prep phase, **When** player chooses cover artist tier (AI free / friend cheap / professional expensive), **Then** system shows upfront cost and success rate modifier (e.g., pro artist = 80% stop rate vs AI = 20%)
4. **Given** player sets retail price, **When** price is too high relative to fan base purchasing power, **Then** sales volume is reduced (e.g., casual fans won't buy above $400)
5. **Given** player confirms preparation, **When** costs exceed available money, **Then** transaction is blocked with clear error message
6. **Given** valid preparation confirmed, **When** convention runs, **Then** unsold inventory carries forward to next round with storage fees

---

### User Story 4 - Multi-Round Progression & Learning (Priority: P3)

A player experiences multiple convention cycles (rounds), learning from past results. They build up inventory from previous rounds (both blessing and curse), accumulate reputation with specific fan communities, and adapt their strategy as market trends shift between rounds. The game tracks historical performance and enables player improvement through pattern recognition.

**Why this priority**: This provides long-term engagement and replayability, but the core game loop works in a single round. It's important for player retention but not essential for demonstrating the core concept.

**Independent Test**: Play through 3+ consecutive rounds, verify: (1) unsold books from round 1 appear in round 2 inventory, (2) storage fees are charged per round, (3) franchise popularity changes between rounds (trending topics shift), (4) history view shows cumulative sales, profit/loss across all rounds, and (5) players can develop informed strategies based on observed patterns.

**Acceptance Scenarios**:

1. **Given** round 1 ends with 50 unsold books, **When** round 2 begins, **Then** those 50 books appear in inventory with storage fees charged
2. **Given** player enters round 2 prep phase, **When** they choose to participate without printing new books, **Then** they can sell only from existing inventory
3. **Given** multiple rounds completed, **When** player opens history view, **Then** they see round-by-round revenue, units sold, and cumulative profit/loss
4. **Given** franchise trends tracked over rounds, **When** new round starts, **Then** social media composition changes to reflect new trending topics (e.g., new anime season boosts different franchise)
5. **Given** player sold franchise X in previous rounds, **When** franchise X fan types display in social feed, **Then** patterns become recognizable (e.g., franchise Y always has "mouth-offs" but low buyers)

---

### User Story 5 - Deep Market Intelligence (Priority: P3)

A player accesses detailed analytics showing comprehensive fan demographics, spending patterns, and franchise comparative data. This information helps skilled players optimize their strategy but is hidden behind action cost investments, rewarding players who carefully research before committing resources.

**Why this priority**: This is for advanced players seeking mastery. Casual players can enjoy the core game without this depth, making it a nice-to-have enhancement rather than essential.

**Independent Test**: Spend multiple action points researching a single franchise, then view market intelligence panel showing: percentage breakdown of all 8 fan types, estimated purchasing power, content preferences, and comparative popularity vs. other franchises. Verify this information enables better sales prediction than non-researched franchises.

**Acceptance Scenarios**:

1. **Given** player has not researched a franchise, **When** viewing market intelligence, **Then** that franchise shows "???" or minimal information
2. **Given** player spends 1-2 AP researching franchise, **When** viewing intelligence, **Then** top 2-4 fan types revealed with approximate counts
3. **Given** player spends 5+ AP researching franchise (across rounds), **When** viewing intelligence, **Then** complete breakdown of all 8 fan types, total market size, and trend indicators shown
4. **Given** detailed intelligence available, **When** player creates draft with both high essence and high audience research, **Then** sales prediction confidence is high and outcomes are more predictable
5. **Given** multiple franchises researched, **When** viewing comparative intelligence, **Then** player can identify high-volume low-conversion vs. low-volume high-conversion opportunities

---

### Edge Cases

- What happens when player runs out of money completely? System should prevent participation if cannot afford minimum print run, force player to either (a) skip round, or (b) game over if no inventory remains.
- What happens when franchise has zero fans in simulation? (Very unpopular niche) Should still allow creation but sales will be near-zero; edge case tests market research accuracy.
- What happens when player prices book at $0 or extremely high amount ($10,000)? System should enforce reasonable bounds (e.g., $50-$1000 range) with warnings.
- What happens when print quantity exceeds available storage? Apply exponentially increasing storage fees to simulate realistic warehouse limits.
- What happens when player tries to sell from unmade drafts? Validation error prevents progressing to prep phase without either new draft or existing inventory.
- What happens when all fan types for a franchise are "haters/critics"? Simulates a "炎上" (flaming) situation; book might still sell (hate-buying, spite-buying) but with specific patterns.
- What happens when content generation produces duplicate titles across franchises? System should detect collision and regenerate with modified template or seed offset; probability should be <1% for 10-20 franchises.
- What happens when template has placeholder that doesn't exist in dictionaries? System should fallback to generic placeholder or log warning; malformed content should never reach player.
- What happens if all templates are weighted to zero by tag combination? System should fallback to uniform distribution to prevent generation failure.
- What happens when multiple dynamic events affect the same franchise in one AP? Apply effects sequentially; clamp attribute values to valid ranges (P: 1-100, D: 0.1-1.0, B: 0.5-2.0); merge conflicting tag changes (add takes precedence over remove).
- What happens when an event chain cascades infinitely (Event A triggers B triggers A)? System should limit chain depth to 3 events per AP spent; log warning if limit reached.
- What happens when a "Dead Zone" franchise (Low P, Low D, Low B) receives buff events? Allow archetype transition if thresholds crossed; player should see "emerging opportunity" notification.
- What happens when all franchises become Air Stocks due to bad luck/events? Ensure at least 2-3 franchises maintain viable D×B at all times through event balancing or reroll mechanics; game should remain winnable.
- What happens when event targets a franchise player has already invested heavily in? Event effects apply regardless; this is intentional risk/reward (simulating real market volatility).

## Requirements *(mandatory)*

### Functional Requirements

#### Core Simulation
- **FR-001**: System MUST simulate 10+ distinct franchises/works, each with five core attributes:
  - **Popularity (人氣 P)**: 1-100 scale determining social media volume and visibility; "how many people are talking about it"
  - **Core Audience Density (密度 D)**: 0.1-1.0 multiplier representing concentration of fans willing to attend conventions and spend money on doujin; "how many talkers actually become buyers"
  - **Purchasing Power (購買力 B)**: 0.5-2.0 multiplier representing per-buyer spending willingness; affects price sensitivity, multi-copy purchases, and impulse buying
  - **Audience Activity (行動力)**: 0.1-1.0 ratio determining what percentage of fans actively post on social media
  - **Content Preference (消費取向)**: Enum (R18_FRIENDLY | ALL_AGES | MIXED) affecting acceptable content types and buyer distribution

- **FR-001c**: System MUST categorize franchises into 8 archetype patterns based on P×D×B combination, each with distinct gameplay implications:

  | Archetype | P | D | B | 中文名稱 | Characteristics | Player Strategy |
  |-----------|---|---|---|----------|-----------------|------------------|
  | **Blue Chip** | High | High | High | 神作/大盤股 | Strong buzz, strong buyers, high willingness to pay | Most stable but highest competition; safe bet |
  | **Volume Play** | High | High | Low | 大熱門但省 | Many buyers but price-sensitive; need attractive covers/bonuses | Thin margins, high volume; keep prices low, avoid overprinting |
  | **Whale Fishing** | High | Low | High | 聲量大鐵粉少 | Loud online but few actual buyers; those who buy spend big | Small print runs, premium pricing, limited editions |
  | **Air Stock** | High | Low | Low | 聲量股/空氣股 | Maximum noise, minimum sales; "looks popular but doesn't sell" | **TRAP** - Most common mistake; good for social media presence only |
  | **Hidden Gem** | Low | High | High | 隱藏神坑/價值股 | Quiet online but dedicated spenders; requires research to find | High profit margins, long-tail sales; reward for market research |
  | **Steady Circle** | Low | High | Low | 小圈圈支持 | Small but loyal community; will buy one copy to support | Consistent low-risk income; good for practicing, not for scaling |
  | **Niche Luxury** | Low | Low | High | 超小眾奢侈品 | Almost no visibility, rare buyers who pay premium | High risk/reward; ultra-limited runs or nothing; miss = total loss |
  | **Dead Zone** | Low | Low | Low | 冷門貧瘠 | No buzz, no buyers, no spending | **AVOID** unless for personal passion projects |

  The archetype classification enables both strategic depth (identifying hidden gems vs. air stocks) and satirical commentary (the most visible franchises aren't always the most profitable).
- **FR-001b**: Each franchise MUST have dynamically generated attributes:
  - Randomized title (Japanese or Chinese style) generated from templates + dictionaries
  - Randomized description/synopsis (Chinese text) generated from templates + dictionaries
  - 3-4 tags from predefined pool (e.g., "超展開", "燒腦", "迷因化", "只適合R18發揮")
  - Tags influence both title/description generation style and social post patterns
- **FR-002**: System MUST generate social media posts dynamically per round with quantities determined by: `post_count = (Popularity × Audience_Activity × round_trend_multiplier)`, typically resulting in 20-100 posts total across all franchises
- **FR-002b**: Social media posts MUST be generated using template + dictionary system:
  - Multiple post templates with placeholder slots (e.g., "【作品】的【角色】太【形容詞】了！")
  - Dictionary pools organized by context (character types, adjectives, reactions, meme phrases)
  - Fan type influences template and dictionary selection (enthusiast uses different templates than critic)
  - Posts must feel varied and natural, not obviously templated
- **FR-003**: System MUST provide action point system representing **time passage** (5 AP = 5 months before convention, half-year cycle per round):
  - Each AP spent represents approximately one month of preparation time
  - Time passage enables dynamic events to occur between actions
  - Creates tension between "acting early with incomplete information" vs. "waiting to see trends but running out of time"
- **FR-003b**: System MUST trigger **dynamic events** during the action phase:
  - After each AP spent (or at start of each "month"), system rolls for 0-2 random events
  - Events affect franchise attributes (P/D/B) and tags in real-time
  - Player observes market changes as they spend time, simulating "the market moves while you prepare"
- **FR-004**: System MUST track three types of progress per franchise: drafts created (stock), content understanding (essence), community knowledge (audience research)

#### Action Phase
- **FR-005**: Users MUST be able to spend 1 AP to create a draft for a chosen franchise, increasing stock count
- **FR-006**: Users MUST be able to spend 1 AP to study/consume franchise content, increasing essence level (affects quality)
- **FR-007**: Users MUST be able to spend 1 AP to research franchise community, revealing fan demographics progressively
- **FR-008**: System MUST provide free market intelligence viewing (no AP cost) showing previously researched information

#### Preparation Phase
- **FR-009**: System MUST allow configuration of print quantity (minimum 10, recommended 50-500 range)
- **FR-010**: System MUST provide paper quality choice affecting cost multiplier (e.g., 0.8x cheap, 1.0x standard, 1.5x premium) and attractiveness
- **FR-011**: System MUST provide cover commissioning tiers (0-3) with cost ranging $0 to $10,000 and success rates 20% to 80%
- **FR-012**: Users MUST be able to set retail price per book (suggested range $100-$500)
- **FR-013**: System MUST calculate and display total production cost before confirmation
- **FR-014**: System MUST validate sufficient funds before allowing production (prevent debt)

#### Convention Simulation (Three-Phase Realistic Flow)
The convention simulation prioritizes **realism and satirical effect** over performance. Each attendee is simulated individually through a three-phase process.

**Phase 1: Attendee Generation**
- **FR-015**: System MUST generate 1000-3000 individual attendees, each with:
  - **Personal Budget**: Total money they'll spend today, influenced by global economic factors and random variation (range: $500-$5000)
  - **Target List**: 1-3 franchises they're specifically looking for, weighted by franchise Popularity (high P = more likely to be on target lists)
  - **Browse Tendency**: Probability of stopping at non-target booths (0.1-0.5), influenced by attendee personality type
  - **Price Sensitivity**: How much pricing affects their purchase decision (inverse correlation with franchise's B attribute for their targets)
- **FR-016**: Attendee generation MUST reflect franchise attributes:
  - High P franchises appear on more target lists (visibility creates interest)
  - High D franchises have attendees with higher intent-to-buy for that specific work
  - High B franchises have attendees willing to pay more per purchase and buy multiple copies

**Phase 2: Booth Visit Simulation (Pass → Stop → Browse)**
- **FR-017**: For each attendee, simulate their path through the convention:
  - **Pass Check**: Does the attendee walk past player's booth? (Affected by booth location lottery, general traffic patterns)
  - **Stop Check**: If passed, do they stop? Influenced by:
    - Is this franchise on their target list? (+50% base stop rate)
    - Cover quality / artist tier (AI: 20%, Friend: 30%, Pro-small: 50%, Pro-big: 80%)
    - Booth presentation (cosplay helper, display quality)
    - Random "eye-catch" factor
  - **Browse Check**: If stopped, do they pick up and look at the book? (Affected by title appeal, visible preview pages)
- **FR-018**: The "Air Stock" effect MUST be observably different:
  - High P + Low D franchises: Many people stop, look, take photos, comment "這個好有趣！" → but don't buy
  - System logs these interactions: "有人停下來拍照" "有人說『這個梗我知道！』然後走了"
  - Creates the satirical "很熱鬧但不賺錢" feeling

**Phase 3: Purchase Decision**
- **FR-019**: If attendee browses, simulate purchase decision:
  - **Price Check**: Compare book price vs. attendee's price tolerance (budget × price sensitivity × content match)
  - **Quality Check**: Essence level affects perceived quality; higher essence = stronger purchase intent for matching fans
  - **Multi-buy Check**: High B attendees may buy 2-3 copies (one to read, one to collect, one to gift)
  - **Budget Deduction**: Successful purchase reduces attendee's remaining budget for the day
- **FR-020**: Purchase logic MUST reflect P×D×B dynamics:
  - High D: Higher conversion rate (stop → buy)
  - High B: Higher average transaction value (more copies, less price haggling)
  - Low D + Low B: May buy cheapest item only, or "just looking"
- **FR-021**: System MUST calculate sales, revenue, and update player money and inventory after each purchase
- **FR-022**: System MUST display detailed convention event log showing:
  - Sample customer interactions ("鐵粉買了3本！" "路人翻了翻就放下了" "有人問『這個多少錢？』然後搖頭走了")
  - Running totals with emotional context ("第50位客人！" "連續10個人只是看看...")
  - Final booth atmosphere summary ("今天攤位很熱鬧，但..." for air stock scenarios)

#### Progression & Persistence
- **FR-023**: System MUST carry forward unsold inventory between rounds
- **FR-024**: System MUST charge storage fees (e.g., $1 per book per round) for inventory
- **FR-025**: System MUST track sales history (revenue, units sold, profit/loss per round)
- **FR-026**: System MUST allow player to skip convention participation (preserving inventory without sales)
- **FR-027**: System MUST shift franchise popularity/trends between rounds (seasonal effects, new releases)
- **FR-028**: System MUST persist game state in browser storage allowing session resumption

#### Dynamic Event System
Events simulate the volatile nature of ACG markets where franchise fortunes change due to external factors. This is the "stock market" aspect of the game.

- **FR-038**: System MUST maintain an **Event Pool** organized by category:

  **A. Official/Production Events** (官方劇情/製作事件)
  | Event | P Impact | D Impact | B Impact | Tag Changes |
  |-------|----------|----------|----------|-------------|
  | 神回/封神超展開 | P↑↑ | D↑ | B↑ | +「超展開」「名場面」「燃」 |
  | 暴死/劇情崩壞 | P↑(炎上) or P↓ | D↓ | B↓ | +「爛尾」「炎上」「作畫崩壞」 |
  | 作畫/製作品質提升 | P↑ | D↑ | B↑(small) | +「作畫神」「質感提升」 |
  | 作畫崩壞連發 | P↑(迷因) or P↓ | D↓ | B↓ | +「作畫崩壞」「爛到好笑」 |
  | 人氣角色退場/換主角 | P↔ | D↓ | B↔ | +「震撚」「刀」「胃痛」 |
  | 宣布第二季/劇場版 | P↑↑ | D↑ | B↑ | +「續作確定」「復權」 |

  **B. Social/Community Events** (社群/輿論事件)
  | Event | P Impact | D Impact | B Impact | Tag Changes |
  |-------|----------|----------|----------|-------------|
  | 迷因爆紅(梣圖洗版) | P↑↑ | D↔ or D↓ | B↓ | +「迷因化」「跟風潮」 |
  | 炎上(作者爭議/企劃爭議) | P↑↑ | D↓ | B split | +「炎上」「爭議」 |
  | CP戰爭(官方暗示/拆CP) | P↑ | D split | B↑(特定取向) | +「CP戰」「拆逆」「修羅場」 |
  | 大手帶風向(入坑) | P↑ | D↑ | B↑ | +「大手加持」 |
  | 大手帶風向(退坑) | P↓ | D↓ | B↔ | +「退潮」 |

  **C. Consumption/Purchasing Events** (消費取向事件)
  | Event | P Impact | D Impact | B Impact | Tag Changes |
  |-------|----------|----------|----------|-------------|
  | 官方高價週邊大賣 | P↑(small) | D↑(small) | B↑ | +「收藏向」「豪華」 |
  | 官方連續坱錢(粉絲破產) | P↑(吐槽) | D↔ | B↓ | +「錢包殺手」「破產」 |
  | 尺度轉向(擦邊/清水) | P↔ | D↔ | B↔ | Preference shift: R18↔ALL_AGES |
  | 平台限制/封禁 | P↓ | D↑ | B↑ | +「小眾化」「封禁」 |

  **D. Real-World Events** (現實系事件 - 諷刺味最重)
  | Event | P Impact | D Impact | B Impact | Tag Changes |
  |-------|----------|----------|----------|-------------|
  | 開播撞到超大作(被碾壓) | P↓ | D↓ | B↓ | +「生不逢時」 |
  | 聲優/演員出事(停播/換角) | P↑(新聞) | D↓ | B↔ | +「停播」「換角」 |
  | 正版管道變方便(串流上架) | P↑ | D↓(路人多) | B↔ | +「入坑門檻低」 |

- **FR-039**: System MUST trigger events with the following mechanics:
  - **Trigger Timing**: After each AP spent (represents one month passing)
  - **Roll Probability**: 40% chance of 1 event, 10% chance of 2 events, 50% chance of no event per AP
  - **Event Selection**: Random weighted selection from pool; recent events less likely to repeat
  - **Franchise Targeting**: Each event targets 1-3 franchises (can be random or based on current attributes)

- **FR-040**: System MUST apply event effects immediately and visibly:
  - Attribute changes reflect in social media post generation (P↑ = more posts appear)
  - Tag changes affect future content generation style
  - Player receives event notification with satirical flavor text ("【作品名】第三集封神！網路上都在吃『這什麼神仙操作』...")
  - Historical event log viewable for tracking market changes

- **FR-041**: System MUST support event chains and dependencies:
  - Some events can trigger follow-up events (e.g., "崩壞" may lead to "炎上" or "迷因化")
  - Seasonal events have higher probability at certain times (e.g., "續作確定" more likely in months 3-4)
  - Tag accumulation affects event probability (多個「爭議」 tag = higher 「炎上」 chance)

#### Content Generation System
- **FR-034**: System MUST maintain separated data structures for content generation to enable easy expansion:
  - **Title Templates**: Stored as array of template strings with placeholders (separate for Japanese and Chinese styles)
  - **Description Templates**: Stored as array of multi-sentence template structures with category tags (setting, character intro, conflict, hook, pitch)
  - **Post Templates**: Stored as array of short-form templates with fan type associations
  - **Dictionaries**: Organized by semantic category (places, roles, events, emotions, slang, memes) with each entry as a simple string
  - **Tag Mappings**: Configuration object defining how each tag affects template selection weights and dictionary biases
- **FR-035**: System MUST provide deterministic randomization using optional seed parameter:
  - Same seed produces identical franchise lineup, names, descriptions, and post sequences
  - Enables reproducible testing and debugging
  - Default behavior uses timestamp-based seed for varied gameplay
- **FR-036**: Content generation MUST follow template-filling algorithm:
  1. Select template based on style weights influenced by franchise tags
  2. Identify all placeholder slots in template (e.g., 【place】, 【role】, 【emotion】)
  3. For each slot, select replacement from corresponding dictionary
  4. Apply tag-based biases to dictionary selection (e.g., "燒腦" tag increases selection of "system", "truth", "contradiction" words)
  5. Fill template and apply post-processing (punctuation, formatting)
- **FR-037**: System MUST support content resource expansion without code changes:
  - New templates can be added to template arrays
  - New dictionary entries can be added to existing categories
  - New dictionary categories can be defined and referenced in templates
  - New tags can be added with associated weight mappings
  - Developers should be able to add 50+ new templates and 200+ dictionary entries in under 30 minutes of editing data structures

#### User Interface
- **FR-028**: System MUST display current resources in header (money, action points, round number)
- **FR-029**: System MUST provide phase navigation (social → action → prep → event → next round)
- **FR-030**: System MUST show player's current drafts, essence levels, and research progress
- **FR-031**: System MUST provide inventory view listing all unsold books with details
- **FR-032**: System MUST provide history view showing round-by-round performance
- **FR-033**: System MUST use clear visual feedback for actions (cost display, confirmation, results)

### Key Entities *(include if feature involves data)*

- **Player State**: Current money balance, round number, action points remaining; persists across game session

- **Franchise/Work**: Represents a fictional anime/game/media property that players can create fan works about
  - **Core Attributes (P×D×B Model)**:
    - `name` (string): Dynamically generated title (Japanese or Chinese)
    - `description` (string): Dynamically generated synopsis in Chinese (2-4 sentences)
    - `tags` (array of strings): 3-4 tags affecting generation style and gameplay (e.g., ["超展開", "角色魅力強", "全年齡向"]); tags evolve through dynamic events
    - `popularity` (number 1-100, displayed as P): Base fame level determining social media volume ("聲量")
    - `audienceDensity` (number 0.1-1.0, displayed as D): Core fan concentration; high D = true fans who actually buy
    - `purchasingPower` (number 0.5-2.0, displayed as B): Average spending per buyer; affected by merchandise fatigue, fan disposable income, content type
    - `audienceActivity` (number 0.1-1.0): Ratio of fans who actively post; determines social visibility (decoupled from purchasing)
    - `contentPreference` (enum: "R18_FRIENDLY" | "ALL_AGES"): Affects fan type distribution and acceptable content
    - `seasonal` (boolean): Whether currently trending due to new season/release
  - **Derived Metrics**:
    - `theoreticalMaxBuyers` = `popularity × audienceDensity` (represents potential market size - core fans)
    - `expectedRevenueMultiplier` = `audienceDensity × purchasingPower` (sales effectiveness; high D × high B = profitable)
    - `socialPostCount` = `popularity × audienceActivity × trendMultiplier` (visible engagement - can be misleading!)
    - `archetype` (enum): Derived from P×D×B combination → one of 8 archetypes (Blue Chip, Volume Play, Whale Fishing, **Air Stock**, Hidden Gem, Steady Circle, Niche Luxury, Dead Zone)
  - **Archetype Warning**:
    - "Air Stock" (High P, Low D, Low B): Maximum social volume, minimum actual sales - the satirical core of the game
    - Player must learn to distinguish P (noise) from D×B (signal)

- **Content Generation Resources**: Data structures supporting dynamic content creation
  - **Title Templates**: Object with style categories (A, B, C, D, E) containing template strings with placeholders
    - Japanese templates use katakana compound patterns, kanji combinations, light novel long-form
    - Chinese templates use core-word pairs, role-place structures, internet novel patterns
  - **Description Templates**: Array of sentence templates categorized by function
    - `setting`: Establishing world/premise (e.g., "在【place】，『【system】』被視為日常。")
    - `lead`: Introducing protagonist situation (e.g., "【lead】原本只想【goal】，卻意外捲入【conflict】。")
    - `conflict`: Presenting central tension (e.g., "為了【goal】，他必須【action】；失敗的代價是【stake】。")
    - `hook`: Creating intrigue (e.g., "然而，真正的【twist】才正要開始。")
    - `pitch`: Meta-commentary on genre/tone (e.g., "一場【tone】的【genre】，關於【theme】與【theme2】。")
  - **Dictionaries**: Organized word pools for filling template slots
    - Semantic categories: places, roles, events, systems, emotions, abstract concepts, slang, meme phrases
    - Each category contains 20-100+ string entries
    - Organized by language (Japanese vs. Chinese) and context (serious vs. comedic, R18 vs. all-ages)
  - **Tag Mappings**: Configuration defining tag influence on generation
    - Style weights: How each tag affects template category selection (e.g., "燒腦" → prefer style A templates)
    - Dictionary biases: How tags affect dictionary slot selection (e.g., "迷因化" → increase meme phrase probability)
    - Punctuation rates: How tags affect exclamation marks, question marks, symbols (e.g., "爛到好笑" → high "!!" rate)
  - **Post Templates**: Short-form templates for social media with fan type associations
    - Enthusiast templates: Emotional, supportive, detailed (e.g., "【作品】的【情節】真的太神了！【角色】的【行為】讓我哭了...")
    - Casual templates: Brief, non-committal (e.g., "看了一下【作品】，還行吧。")
    - Critic templates: Analytical, skeptical (e.g., "【作品】的【設定】有問題，這種【邏輯漏洞】很明顯啊。")
    - Memer templates: Joking, referential (e.g., "【作品】：【角色】做【行為】→ 觀眾：？？？ www")

- **Draft Progress**: Per-franchise tracking of stock count (drafts completed), essence level (content understanding 0-10), audience level (market research 0-10); represents player investment

- **Publication Item**: Title, franchise reference, print quantity, retail price, production cost, cover quality rate, essence snapshot, creation round; represents finished product

- **Inventory Entry**: Publication reference, remaining count, incurred storage costs; tracks unsold stock

- **Sales Record**: Round number, total revenue, units sold, notable events (e.g., "sellout", "flop"); historical tracking

- **Social Media Post**: Dynamically generated simulated post
  - `username` (string): Randomly generated user handle
  - `franchiseRef` (reference): Which franchise this post discusses
  - `content` (string): Generated text from post templates + dictionaries
  - `fanType` (enum): Which of 8 fan types posted this (affects template and tone)
  - `timestamp` (string): Simulated relative time (e.g., "3m", "2h", "1d")
  - `generationMetadata` (optional): Seed, template ID, dictionary selections for debugging

- **Convention Attendee**: Simulation agent for three-phase convention flow
  - `budget` (number): Total spending available for this convention (e.g., $1500-5000), reduced as purchases made
  - `targetList` (array of references): Prioritized list of must-buy circles/publications (from preparation phase promises)
  - `browseTendency` (number 0-1): Probability of visiting non-target booths; high value = more impulse browsing
  - `priceSensitivity` (number 0.5-2.0): Multiplier affecting purchase probability based on price vs. perceived value
  - `fatigueAccumulator` (number): Increases as convention phase progresses; reduces browse/purchase probability
  - `purchasedItems` (array): Track of items bought this convention for statistics
  - `franchiseAffinities` (map): Per-franchise interest level affecting browse and purchase decisions

- **Dynamic Event**: Represents market-changing occurrences during Action Phase
  - `eventId` (string): Unique identifier for event type
  - `category` (enum: "OFFICIAL" | "SOCIAL" | "CONSUMPTION" | "REALITY"): Event classification
  - `displayName` (string): Localized name shown to player (e.g., "神回/超展開封神")
  - `flavorText` (string): Satirical description text (e.g., "【作品名】第三集封神！網路上都在吃『這什麼神仙操作』...")
  - `affectedFranchises` (array of references): Which franchises this event impacts
  - `attributeChanges` (object): { popularity: delta, density: delta, purchasingPower: delta }
  - `tagChanges` (object): { add: [tags to add], remove: [tags to remove], shift: {from: tag, to: tag} }
  - `triggerConditions` (optional): Conditions that increase this event's probability (e.g., franchise has "爭議" tag)
  - `followUpEvents` (optional): Events that may chain from this one
  - `occurredOnRound` (number): Which round/AP this event triggered

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Player can complete one full round (social observation → draft creation → prep → convention → results) in under 10 minutes of focused play
- **SC-002**: Social media feed generation produces 50-100 posts with varied franchise distribution in under 2 seconds, maintaining responsive user experience; posts must feel natural and varied, not obviously templated (subjective evaluation: 80%+ of test players should not identify posts as template-generated without being told)
- **SC-003**: Sales simulation processes 2000+ attendees and calculates results within 3 seconds, providing quick feedback loop
- **SC-004**: Player can observe meaningful outcome differences between strategic choices (e.g., researched + high essence draft sells 2-3x more than unreserched low essence) within 2-3 rounds of play
- **SC-005**: Game demonstrates the core satirical concept through observable metrics: a franchise with (popularity=80, density=0.8, activity=0.6) generates 5-10x more sales than franchise with (popularity=20, density=0.3, activity=0.4) when both publications have identical essence levels and production quality, illustrating "choosing right topic > creating best content"
- **SC-005b** ("空氣股" Validation): An "Air Stock" franchise (P=90, D=0.2, B=0.6) demonstrates the satirical disconnect:
  - Social feed shows **high volume** of posts (appears extremely popular)
  - Convention attendee count is **high** (P attracts crowd)
  - Actual **sales are low** (D×B produces fewer buyers who spend less)
  - Player should observe "很熱鬧但不賺錢" (lots of buzz but no profit) - this is the core lesson
- **SC-005c** (Opposite Validation): A "Hidden Gem" franchise (P=25, D=0.8, B=1.5) shows inverse pattern:
  - Social feed shows **low volume** of posts (appears unpopular)
  - Convention attendee count is **moderate**
  - Actual **sales per visitor are high** (loyal fans who actually spend)
  - Player should observe "專攻小眾但穩賺" (niche but profitable)
- **SC-006**: Historical data tracks across 10+ rounds without performance degradation, supporting long-term play sessions
- **SC-007**: Player can recover from poor financial performance (loses money on 1-2 rounds) and return to profitability through improved strategy within 3-4 rounds, showing forgiving game balance
- **SC-008**: Game state persists in browser storage, allowing 90% of players to resume sessions after browser close/reopen without data loss
- **SC-009**: Interface remains usable on screens from 1280x720 to 4K resolution without requiring horizontal scrolling
- **SC-010**: New player understands core mechanic (pick popular franchise, sell at convention) within first round without external tutorial, demonstrated by appropriate genre selection in round 2
- **SC-011** (Dynamic Events Observability): Player observes market changes during Action Phase:
  - At least 1-2 events trigger per 5 AP (one round) on average
  - Events produce visible changes in social feed content (new tags appear in posts)
  - Attribute changes are reflected in next social observation refresh
  - Player can review event history log to understand market shifts
- **SC-012** (Three-Phase Convention Clarity): Convention simulation phases are distinguishable to player:
  - Phase 1 (Attendee Generation): Player sees estimated attendee count based on booth franchises' P values
  - Phase 2 (Booth Visit): Player observes browse metrics (visitors, interest level)
  - Phase 3 (Purchase Decision): Player sees real-time or summary sales as simulation completes
  - Final results clearly show discrepancy between visitors (P-driven) and buyers (D×B-driven)

### Assumptions

- Players have basic familiarity with doujin/fan creation culture (game targets anime/manga/game fans)
- Players understand simplified economic concepts (production cost, retail price, profit/loss)
- Single-player experience only; no multiplayer or social features required
- Browser environment is modern (Chrome, Firefox, Edge latest versions; ES6+ JavaScript support)
- Game session length expected 20-60 minutes per sitting, spread across multiple sessions
- No server backend; all computation and storage happens client-side
- Fan type distributions and purchasing logic use approximated/stylized reality, not actual market research data
- Cultural context is ACG (Anime/Comics/Games) subculture, primarily Japanese and Taiwanese doujin conventions
- **Content generation is abstracted**: Franchise names, descriptions, and posts are programmatically generated; no connection to real IPs
- **Templates and dictionaries are curated**: Initial content resources will be hand-crafted by developers to ensure quality and variety; expandable post-launch
- **Language assumptions**: Game will use mixed Japanese/Chinese for titles (reflecting real doujin culture), Chinese for descriptions and UI (target audience); English localization is out of scope for initial version
- **Natural language quality threshold**: Generated content should read naturally to native speakers 80%+ of the time; occasional awkward phrasings acceptable given purely template-based approach

### Out of Scope (Not Required)

- **Multiplayer features**: No player-vs-player competition, leaderboards, or social sharing
- **Narrative story mode**: No plot, characters, or story progression beyond mechanical simulation
- **Advanced creator options**: No actual content creation (drawing, writing); all content is abstracted to stats
- **Real franchise licensing**: All franchises are fictional/parody; no actual IP integration
- **Mobile touch optimization**: Desktop browser is primary target; mobile responsive but not touch-optimized
- **Accessibility features**: Screen reader support, colorblind modes, keyboard-only navigation not required for initial version
- **Localization**: Single language (Traditional Chinese or English chosen at implementation); no multi-language support
- **Save file export/import**: Data persists in browser storage only; no cloud save or file download
- **Monetization**: No in-app purchases, ads, or premium features
- **Tutorial system**: No guided tutorial or onboarding; learning through play expected
- **Achievement system**: No badges, milestones, or meta-progression rewards
- **Advanced AI**: Fan types and purchasing follow rule-based logic, not machine learning

## Stretch Goals *(optional, if time permits)*

- **Character customization**: Player can name their circle, choose avatar, add personality flavor text
- **Event variations**: Different convention types (large vs. small, genre-specific vs. general, international vs. local) with different attendee profiles
- **Reputation system**: Accumulated circle reputation affects booth traffic and trust-based purchases
- **Collaboration mechanics**: Ability to spend money to collaborate with NPC artists/writers affecting quality or appeal
- **Random events**: Mid-round events like "franchise announcement", "controversy/炎上", "anime adaptation confirmed" that shift market dynamics
- **Advanced helper system**: Beyond cover artist, add convention helpers (cosplayers, sales assistants) affecting booth performance
- **Difficulty modes**: Easy (forgiving economy, clear signals), Normal (current), Hard (volatile markets, hidden information)
- **New Game Plus**: After reaching certain milestones, unlock starting bonuses or new franchises for replayability
