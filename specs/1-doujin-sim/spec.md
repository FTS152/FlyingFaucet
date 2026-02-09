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

1. **Given** a new game session, **When** player views the social media phase, **Then** they see 20-50 simulated posts about various franchises with different sentiment types (enthusiastic fans, casual viewers, critics)
2. **Given** the social media phase complete, **When** player enters action phase with 5 action points, **Then** they can spend action points to create drafts for different franchises
3. **Given** player has created at least one draft, **When** they proceed to convention preparation, **Then** they can configure basic print run and pricing
4. **Given** convention preparation complete, **When** convention simulation runs, **Then** sales results show based on franchise popularity, fan type distribution, and player's choices
5. **Given** convention ends, **When** results displayed, **Then** player sees money earned/lost, books sold, and can proceed to next round

---

### User Story 2 - Strategic Action Management (Priority: P2)

During the action phase, a player strategically allocates limited action points across multiple activities: creating drafts for different franchises, researching franchises to understand content depth, and analyzing fan communities to predict sales potential. They must balance risk (creating early with incomplete information) versus reward (higher quality from deeper understanding).

**Why this priority**: This adds strategic depth to what would otherwise be a simple "pick popular thing" game. It introduces meaningful player choice and skill expression through resource allocation, making the game engaging rather than deterministic.

**Independent Test**: In action phase, verify player can: (1) create multiple drafts for different franchises, (2) spend actions to increase "understanding" of a franchise (affecting quality), (3) spend actions to reveal fan demographics for a franchise (affecting sales prediction), and (4) see meaningful differences in sales outcomes based on these choices when tested across multiple rounds.

**Acceptance Scenarios**:

1. **Given** player in action phase with 5 AP, **When** they create a draft, **Then** one action point is consumed and draft stock increases
2. **Given** player has remaining AP, **When** they "study" a franchise (watch/read content), **Then** that franchise's "essence" level increases, improving potential quality of future drafts
3. **Given** player has remaining AP, **When** they "research community" for a franchise, **Then** market intelligence is revealed showing fan type distribution (e.g., "250 enthusiast fans, 100 casual fans, 50 wealthy fans")
4. **Given** multiple drafts created with different essence levels, **When** convention occurs, **Then** higher essence drafts generate more sales from quality-sensitive fan types (enthusiasts, collectors)
5. **Given** player researched community demographics, **When** choosing which draft to print, **Then** they can make informed decisions based on revealed fan base size and spending patterns

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

## Requirements *(mandatory)*

### Functional Requirements

#### Core Simulation
- **FR-001**: System MUST simulate 10+ distinct franchises/genres, each with unique fan base compositions (8 fan types: casual, enthusiast, lurker, critic, wealthy, mega-fan, hater, anti-fan)
- **FR-002**: System MUST generate 20-50 simulated social media posts per round reflecting franchise popularity and fan sentiment
- **FR-003**: System MUST provide action point system (5 AP per round) for resource-constrained decision making
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

#### Convention Simulation
- **FR-015**: System MUST simulate 1000-3000 attendees per convention with realistic flow
- **FR-016**: System MUST match attendees to player's available books by franchise preference
- **FR-017**: System MUST apply cover quality as attraction filter (high quality = more stop rate)
- **FR-018**: System MUST apply fan-type-specific purchasing logic (e.g., enthusiasts buy multiple, critics rarely buy, mega-fans buy in bulk, wealthy fans price-insensitive)
- **FR-019**: System MUST apply essence level modifier to appeal (higher essence = more enthusiast/mega-fan purchases)
- **FR-020**: System MUST calculate sales, revenue, and update player money and inventory in real-time
- **FR-021**: System MUST display convention event log showing sample customer interactions (e.g., "Enthusiast bought 3 copies")

#### Progression & Persistence
- **FR-022**: System MUST carry forward unsold inventory between rounds
- **FR-023**: System MUST charge storage fees (e.g., $1 per book per round) for inventory
- **FR-024**: System MUST track sales history (revenue, units sold, profit/loss per round)
- **FR-025**: System MUST allow player to skip convention participation (preserving inventory without sales)
- **FR-026**: System MUST shift franchise popularity/trends between rounds (seasonal effects, new releases)
- **FR-027**: System MUST persist game state in browser storage allowing session resumption

#### User Interface
- **FR-028**: System MUST display current resources in header (money, action points, round number)
- **FR-029**: System MUST provide phase navigation (social → action → prep → event → next round)
- **FR-030**: System MUST show player's current drafts, essence levels, and research progress
- **FR-031**: System MUST provide inventory view listing all unsold books with details
- **FR-032**: System MUST provide history view showing round-by-round performance
- **FR-033**: System MUST use clear visual feedback for actions (cost display, confirmation, results)

### Key Entities *(include if feature involves data)*

- **Player State**: Current money balance, round number, action points remaining; persists across game session
- **Franchise/Genre**: Name, tag array (e.g., ["TRPG", "sci-fi"]), fan distribution array (8 counts), seasonal flag; defines market characteristics
- **Draft Progress**: Per-franchise tracking of stock count (drafts completed), essence level (content understanding 0-10), audience level (market research 0-10); represents player investment
- **Publication Item**: Title, franchise reference, print quantity, retail price, production cost, cover quality rate, essence snapshot, creation round; represents finished product
- **Inventory Entry**: Publication reference, remaining count, incurred storage costs; tracks unsold stock
- **Sales Record**: Round number, total revenue, units sold, notable events (e.g., "sellout", "flop"); historical tracking
- **Social Media Post**: Username, franchise reference, content text, fan type, timestamp (simulated); drives player research
- **Convention Attendee**: Franchise preference, fan type, purchasing power; simulation agent during event phase

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Player can complete one full round (social observation → draft creation → prep → convention → results) in under 10 minutes of focused play
- **SC-002**: Social media feed generation produces 50 posts with varied franchise distribution in under 2 seconds, maintaining responsive user experience
- **SC-003**: Sales simulation processes 2000+ attendees and calculates results within 3 seconds, providing quick feedback loop
- **SC-004**: Player can observe meaningful outcome differences between strategic choices (e.g., researched + high essence draft sells 2-3x more than unreserched low essence) within 2-3 rounds of play
- **SC-005**: Game demonstrates the core satirical concept: identical quality drafts of popular vs. unpopular franchises show 5-10x sales differences, illustrating "choosing right topic > creating best content"
- **SC-006**: Historical data tracks across 10+ rounds without performance degradation, supporting long-term play sessions
- **SC-007**: Player can recover from poor financial performance (loses money on 1-2 rounds) and return to profitability through improved strategy within 3-4 rounds, showing forgiving game balance
- **SC-008**: Game state persists in browser storage, allowing 90% of players to resume sessions after browser close/reopen without data loss
- **SC-009**: Interface remains usable on screens from 1280x720 to 4K resolution without requiring horizontal scrolling
- **SC-010**: New player understands core mechanic (pick popular franchise, sell at convention) within first round without external tutorial, demonstrated by appropriate genre selection in round 2

### Assumptions

- Players have basic familiarity with doujin/fan creation culture (game targets anime/manga/game fans)
- Players understand simplified economic concepts (production cost, retail price, profit/loss)
- Single-player experience only; no multiplayer or social features required
- Browser environment is modern (Chrome, Firefox, Edge latest versions; ES6+ JavaScript support)
- Game session length expected 20-60 minutes per sitting, spread across multiple sessions
- No server backend; all computation and storage happens client-side
- Fan type distributions and purchasing logic use approximated/stylized reality, not actual market research data
- Cultural context is ACG (Anime/Comics/Games) subculture, primarily Japanese and Taiwanese doujin conventions

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
