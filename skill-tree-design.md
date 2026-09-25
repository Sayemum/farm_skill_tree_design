# Mob Farm — one connected skill tree

**Design revision:** 24 September 2026. **Status:** interactive concept, not game implementation. Purchased skills permanently survive rebirths, as confirmed by the owner. The only purchase currency is Emeralds.

This replaces the four-directory, single-purchase layout proposed on 23 September. That earlier proposal remains in `../SkillTreeConcept` for comparison. This revision uses **one purchasable starting root, five outward branches, 30 upgrade nodes and 84 paid ranks**. The complete rank catalogue is generated in `node-catalogue.md` from `skill-tree-data.json`.

## 1. What was actually checked

Connected to the open **TESTING PLACE - Mob Farm Game**, place ID `72474345450984`, using the Studio connector. Read the live SkillTreeController, SkillTreeConfig, CombatFeelConfig and BossConfig. Revisited the previous analysis of the live progression configs and server reward/selling paths. Read both local Slime RNG reference documents and the previous concept document.

Started a Studio play test, opened the tree through its existing client command, visited the Player tree, selected Sharpness, and bought its first dummy rank. Screenshots confirmed the stone wall, colored beveled nodes, rank labels, reticle, bottom purchase card, Emerald counter decreasing from 25 to 24, and links opening toward Swift Strikes and Critical Edge. Invoked the existing close behavior and stopped the test. **No game scripts or authored instances were edited.** These purchases belong to the existing client-only dummy tree, not to the server economy.

Audio asset IDs, event ordering and timings were inspected in the controller. The connector supplies still screenshots, not a recording with audio; exact audio timbre and frame-by-frame animation fidelity were not independently auditioned. Public asset requests returned authentication/access errors. The web version therefore uses visibly disclosed synthesized cues. The current revision replaces placeholder symbols with 30 game-specific compositions using existing UI art, actual-model pixel portraits and a reference-based sword redraw. It does not claim to contain the original Cozy audio or Kenney atlas.

## 2. What makes the existing tree feel good

Keep the following visual language:

- A dark tiled stone wall with subtle parallax, vignette and sparse ambient pixels.
- Square buttons with thick black outlines, bright top-left bevels, dark bottom-right bevels and offset shadows.
- Gray available faces, colored purchased faces, gold completed faces, muted locked faces, and a visible selection reticle.
- A branch color that continues through the icon, outline, links, hover response and purchase particles.
- Emerald-green prices and a prominent Emerald counter. The pink currency in the supplied reference screenshots is an interaction example, not this game's currency.
- A short physical response to input: a brightened/pulsing hover, a squashed press, then a purchase punch.

The source purchase sequence is: press → currency flies from wallet → impact flash, two square rings, pixels and floating spend → links fill → newly reachable nodes wake → unlock/max toast. Capstones add confetti, border flash and branch-wide link surges. The web recreation retains this sequence in browser animations, with a smaller capstone celebration appropriate for a prototype. It does not reproduce haptics or every Roblox particle detail.

The source opening animation moves the top bar down over 0.4 seconds with a Back easing curve and cascades nearby nodes in over 0.3 seconds, staggered by distance. Its signature wipe is **16 columns × 9 rows**, each cell staggered by `(column + row) × 0.012 seconds`, scaling over **0.16 seconds**. Closing covers the panel with the same diagonal grid; category changes cover, swap and reveal. Those wipe dimensions and timings are reused for browser open/close. Branch shortcuts now pan the same board; they do not hide a separate page behind a wipe.

The current screen mixes navigation nodes and purchases. A first skill click selects its bottom card; another click or the card button buys. Far-away skills are unnamed question marks. The Plot tree repeats mutation/loot purchases for individual mob tiers and requires spending in each tier to advance. The Villager dummy roster has seven roles, while the real progression has eight stands. Those structures are not carried forward.

## 3. The new layout and interaction

**First Harvest** is the only visible upgrade in a fresh session. It costs 25 Emeralds and grants +5% normal-mob loot quantity, excluding bosses. Buying it reveals five connected starter upgrades. Five routes eventually fan outward:

1. **Combat:** manual rhythm → precision or reach → finishers, streaks and combo rewards.
2. **Plot:** spawn pacing → collection or offline production → movement and longer rest.
3. **Mutations:** Gold chance → Diamond or Obsidian chance → their loot quantity.
4. **Trading:** global selling speed → value or backlog processing → optional social bonus or stand synergy.
5. **Swords:** damage → attack speed or finding swords → crits/boss damage or inventory/pity.

The tree is one continuous spatial map, gradually discovered through purchases. The board displays only revealed icons and their connecting lines. It has no permanent skill names, ranks, price tags, category headings, category tabs, legend, help paragraph, or minimap. Emerald balance, close, a small settings gear and an icon-only recenter control remain in the corners.

A node is revealed if it is the root, already purchased, or every prerequisite rank has been reached. Rebirth and affordability determine whether that revealed node can be bought; they do not hide it again. A rank-2 child stays completely absent until its parent reaches rank 2. All three connector layers and moving sparks obey the same visibility rule. Hidden nodes are removed from layout and keyboard navigation, not merely painted transparent.

Hover or keyboard focus shows name, reward, current rank, next price and any unmet requirement. Touch pins those details and offers a Buy button. A purchase does not automatically zoom out or jump the camera. The recenter control fits only revealed nodes. The settings gear contains **Show full tree (testing only)**, which exposes all icons and lines without buying anything or bypassing requirements. Turning it off restores earned visibility. The testing toggle starts off on every page load. **Fund test** changes only the demo wallet and rebirth preview.

### Purchase rules

- Desktop: hover or keyboard-focus to inspect; click or Enter buys one rank when eligible. This deliberately follows the current user request rather than the older proposal's select-only model.
- Touch: tap once to pin the hover card, then use its large Buy button. This avoids spending while trying to read a small node. Dragging beyond 7 pixels always pans and suppresses the purchase click.
- A normal parent requires only rank 1 to open its two choices. A deeper leaf requires rank 2 of its immediate parent. There is no hidden branch-spend total and no requirement to max every earlier node.
- Every prerequisite is authored by ID and rank. Moving an icon cannot change eligibility. There are no mutually exclusive routes and no respec trap.
- The tooltip shows current owned rank, **next rank's reward**, current effect, next Emerald price and unmet requirements. It also states when the next rank reveals upgrades. At maximum it shows the final effect and MAXED; it never advertises another price.
- An unsuccessful click shakes the node and gives a denial cue plus the reason. It never spends.
- Demo controls can grant currency or preview rebirth 0–32. The Fund test preset sets R4 and 10T Emeralds, enough for every proposed rank, while retaining prerequisite purchasing. Lowering the preview rebirth does not remove bought ranks.
- Demo data is saved only in browser localStorage. Reset restores 5,000 Emeralds, an unowned First Harvest, and natural reveal mode. Version-3 storage leaves the earlier version-2 prototype progress untouched. No Roblox account, remote or save is contacted.

## 4. Gameplay constraints that shaped the proposal

### Real progression remains the main progression

The current game has 48 authored spawner tiers and 32 rebirths. Three spawners merge into the next tier. Buy prices begin at 5 Emeralds and scale with owned tier weight. Rebirths already gate bosses, raise multipliers and unlock sword equip slots. This first tree is a foundational R0–R4 proposal with permanent usefulness, not a finished endgame sink for all 32 rebirths. Higher ranks and new branches should follow playtesting, not a copy-pasted tier ladder.

Swords start at two equipped slots, gain one each rebirth and cap at eight. Three identical same-level swords merge for free. Sword level caps at 10, damage scales by `1.6^(level − 1)`, attack interval has a 0.3-second floor, and inventory starts at 50. The tree therefore offers an inventory increase, bounded speed/damage bonuses and crate progression. It does not sell equipped slots or access to an already-free forge.

### Active combat already has depth

The existing manual combo has a 3-second kill window and reaches x1.8 loot at 67 kills. Auto Kill has a separate x1.2 cap; ordinary automatic attacks do not inherit the full manual bonus. Perfect timing starts with a 0.17-second window, shrinking by 0.007 per chain to a 0.10-second floor. The finisher currently needs **five perfect hits**, uses a 2.1 radius factor and a 2.5 damage multiplier. These are existing abilities, not future unlocks.

Combat upgrades refine that loop. Quick Finisher reduces the requirement to four. Perfect Timing adds at most 0.03 seconds. Combo Sweep affects ordinary manual swings only. Perfect Streak rewards ten consecutive perfects and resets on a miss. Rhythm Master empowers one earned finisher; it never kills every mob in the server. Combo Bounty ends at x2.1 rather than x3 and preserves the existing climb to the cap.

At full proposal strength, a rhythmic finisher can combine x1.25 Sharpness, x1.15 Perfect Streak and x1.25 Rhythm Master, or about **x1.797** over the existing finisher before crits, sword levels and rebirth scaling. Giant Slayer would make that about **x2.066** against a boss. These are balance review cases, not measured DPS improvements; swing limits, timing and target availability matter.

### Production and selling are separate bottlenecks

Income is approximately `min(deposited loot supply, selling throughput) × sale value`. More spawning or mutations can create a larger backlog without increasing immediately spendable Emeralds. That is why Trading is a visible peer of combat/production.

Nominal spawn interval is 5 seconds with jitter. There are 60-mob-per-player and 600-mob server caps. A 4.5-second endpoint preserves those caps. Loot collection currently uses a 10-stud radius and walk speed starts at 22; their endpoints are 18 studs and 25 studs/s.

Sell rates start at 1, 3, 6, 11, 18 and 27 loot/s, then grow by 1.12 per level. Existing friends add 5% each for up to three. The current SellController drains **one global rate** and splits the results among eight unlocked stand tills. NPCTradeController's customer animations do not consume loot or award their displayed price. Selling speed must affect the real drain, not make decorative customers walk faster.

Fast Counters, Busy Counters and Full House together can yield `1.25 × 1.15 × 1.20 = 1.725` selling throughput under the relevant backlog/stand conditions. Fair Value adds at most 9% to actual loot sale value. Friendly Market changes the existing per-friend bonus from 5% to at most 8%, rather than adding a second social multiplier. These bonuses must remain distinct from direct boss cash rewards to prevent recursive rebirth-payout inflation.

### Mutations and bosses already exist

Normal mutation baselines are Gold 10% / x3 quantity, Diamond 2% / x5 and Obsidian 0.4% / x10. These stay available without buying skills. Proposed endpoints are Gold 12.5%, Diamond 2.6%, Obsidian 0.52%, with Diamond x6 and Obsidian x12 loot. Chances are exclusive; extra probability comes from Normal. Tutorial suppression remains. Quantity bonuses exclude bosses in this draft.

If those exclusive baselines apply, their expected quantity multiplier rises from `0.876 + 0.10×3 + 0.02×5 + 0.004×10 = 1.316` to `0.8438 + 0.125×3 + 0.026×6 + 0.0052×12 = 1.4372`, approximately **+9.2%**. This is an analytical quantity estimate, not an income or live drop-rate measurement. Other rewards and bottlenecks still apply.

Boss health is frozen using a first-spawn DPS snapshot; required bosses and guarantee clocks are part of rebirth pacing. Giant Slayer is a bounded optional damage leaf. Future integration must define the snapshot so buying a permanent bonus does not immediately cause matching HP inflation and erase the reward. Spawn-rate boosts and boss cash multipliers are deferred pending a boss pacing simulation.

### Offline and weapon crates

Offline production currently has 15% efficiency, an 8-hour limit, 25-kills/s and quarter-sell-rate limits, and a quarter-of-next-rebirth payout ceiling. Rested Farm reaches 21% efficiency; Longer Rest reaches 10 hours. Existing ceilings remain, and tooltips explicitly state this so capped players are not promised money they cannot receive.

Weapon crates drop from eligible mobs at a 1.5% base chance before boosts and caps. NPC crate gifts and lucky blocks were retired. Crate Finder improves the relative chance rather than creating a second overlapping crate-luck path. Crate Insurance is a genuinely new proposed server mechanic: after 200 eligible kills without a mob-drop crate, the next qualifying outcome awards one, resets the counter, and cannot double-award alongside a natural drop. It needs a pending claim when inventory space is unavailable. It is not implemented in the game or simulated as 200 combat events in this page.

## 5. Whiteboard decisions

- **Sell speed — keep.** Apply it to SellController's real global drain. Do not multiply per NPC or speed up theatrical trades and call that income.
- **Faster slashing — keep with a ceiling.** Three ranks reduce interval by 3/6/9%; preserve the current 0.3-second floor and validated manual timing.
- **Fewer kills for a finisher — reshape.** The live mechanic counts perfect hits, not kills. Five becomes four in one meaningful purchase.
- **Damage after 10/20/30 perfects — simplify.** One readable ten-perfect threshold, three ranks of 5/10/15% damage. Avoid overlapping thresholds that make players memorize hidden breakpoints.
- **Special rhythm that kills all mobs — reshape.** Rhythm Master improves one finisher by 25% after ten consecutive perfects. Existing reach rules remain. A server-wide wipe would erase target selection and overload boss/other-player boundaries.
- **Radius grows with combo — keep bounded.** At ten manual kills, gain 5/10/15% normal sweep radius. Do not recursively enlarge finishers or the automatic attack.
- **Combo loot grows from x1.1 to x3 — keep the direction, reduce the endpoint.** Current cap is already x1.8. Add x1.9/x2/x2.1 cap ranks; preserve Auto Kill's separate cap.
- **Buy a sword upgrade stand — discard as an access purchase.** Sword merging already exists and is free. Sword Vault and Crate Insurance add new value without selling the same feature again.
- **Deposit loot speed — discard.** The current deposit is immediate. Loot Magnet and Fleet Feet shorten gathering/travel instead.
- **Friend bonus — keep as an optional leaf.** Three small ranks, existing three-friend limit, no solo-required descendants.
- **Weapon crate spawn chance — keep once.** One eligible-mob drop path; no duplicate rarity/chance labels and no retired NPC gift mechanics.
- **+5% Gold mutations — clarify.** Each rank is a 5% relative increase to the 10% baseline: 10.5%, not 15%. Show final absolute chance in the tooltip.
- **Unlock Diamond/Obsidian — reshape.** Both are already in the game. Increase their existing chance and quantity; never remove free baseline access.
- **More mutation types — defer.** A new mutation needs assets, spawn odds, loot expectations and a reason to exist beyond another color. Existing three are enough for this first tree.
- **Better boss loot — defer.** Direct boss cash scales with next-rebirth cost. Any future skill should explicitly choose raw loot or cash and have a capped economy model.
- **Boss spawn chance — defer.** Existing random rolls and guarantee clocks already pace required kills. A later bounded guarantee-time reduction is clearer than an opaque random spawn multiplier.
- **Boss crit chance — fold into Critical Edge.** Avoid selling another nearly identical crit statistic. Giant Slayer supplies a recognizable boss-specific reward.
- **Boss mutation chance — defer.** Do not silently route ordinary-mob mutation skills into boss rewards. Boss snapshots and payouts need a separate specification.
- **Copy another game's entire tree — reject as a design approach.** The whiteboard's external-game reference is inspiration, not an instruction to clone it. Copy the understandable rank/hover interaction, not unrelated mechanics, art or reward numbers.

## 6. What carries over from earlier work and Slime RNG

Keep permanent Emerald purchases, explicit prerequisites, existing-system upgrades, an early choice of useful routes, and readable long-term rewards. Collapse repeated numerical upgrades into multi-rank nodes. Separate active rhythm from weapon ownership so the fantasy of each direction is clear. Remove the older 80-card inventory and directory navigation; the new request specifically asks for a connected root.

The local Slime RNG snapshot documents 163 one-purchase hexes, cheap opening choices, stat-family branches, occasional feature unlocks and long-tail price growth. Its adjacency was reconstructed from a community map, not verified server rules. Borrow thematic branches and affordable first choices. Do not copy its currency scale, hidden adjacency, 163-node size, or separate pages. Our explicit rank requirements survive layout edits, and multi-rank nodes follow the supplied examples rather than Slime RNG's single-purchase scheme.

## 7. Prices, gates and balancing limits

Starter ranks cost 100–200 Emeralds. Follow-up pre-rebirth ranks cost 400–3,000; first fork ranks generally cost 1,500. Later price anchors are roughly 500K at R1, 20M–100M at R2, 20B at R3 and 500B at R4. Each exact rank is authored in the catalogue; nothing scales with current wallet or purchase order.

These values reuse the order of magnitude of the previous live-economy proposal and are **not a validated time-to-buy curve**. The jump between 1,500 and 500K is made explicit by the rebirth gate. A player should see the price and next requirement before purchasing the prior rank. Do not market this draft as production-balanced.

All 84 ranks cost **5,721,587,524,275 Emeralds**. The 10T test preset is therefore sufficient. First Harvest adds one bounded x1.05 normal-loot modifier before the other proposed normal-loot bonuses; it never boosts direct boss cash. There are no mandatory skill purchases for rebirth; the tree is an optional permanent progression layer. The proposed entry point should appear after the initial spawner/sell onboarding, not compete with the first 5-Emerald spawner.

Before implementation: measure first-session income, deposits and sell backlog; time five starter purchases; test R1/R2 gates with ordinary and boosted accounts; compare active vs automatic earnings; test worst-case combined damage against boss snapshots; and model loot gain vs sell gain. Target a first preferred starter within a few minutes after onboarding, then a real choice between improving a bottleneck and opening another branch.

## 8. Future integration boundaries

This prototype only changes ranks, its wallet, links and displayed stat summaries. It does not simulate combat, spawn actual mobs, or implement every proposed mechanic. The eventual game server must own permanent skill ranks and validate the requested next rank, parents, rebirth, balance and transaction rate. The client requests a node ID; it must never submit trusted cost or effect values.

Keep skill bonuses in one calculation layer; apply each once alongside existing configs. Persist ranks with the player profile, not plot ownership. Never import the current client dummy levels. A failed or duplicated purchase must not double-spend, double-grant, or play a success celebration. The UI should apply the purchase effects only after server success and preserve the existing plot-stand close/re-entry suppression. None of those game changes are authorized in this conceptualization pass.

## 9. Files and editing

- `skill-tree-data.json`: canonical names, coordinates, prerequisite ranks, prices, gates, effect text and design limits.
- `template.html`: progressive visibility, hover details, synthesized audio, pan/zoom, purchase logic and transitions.
- `icons.mjs`: individually composed icon artwork; the build exports each SVG and an icon review sheet.
- `build.mjs`: validates the graph and generates the standalone page and rank catalogue.
- `dist/index.html`: self-contained browser deliverable; no network assets or build tools required to view.
- `node-catalogue.md`: all 30 skills, every price and gate, generated from the same data as the page.

### Icon direction and asset references

The 25 September correction replaces the generic icon set with game-specific subjects. First Harvest and loot bonuses use the real brown-and-green loot image. Every Emerald display uses Roblox asset `17001682792`, the same image referenced by the live HUD and SkillTreeGui. Mutation skills show the actual armored zombie variants; yield skills pair those variants with loot. Trading uses the inspected red-and-white stand and villager. Boss damage shows the actual ZombieBoss. Crates use the existing Common.png render. Sword skills use a new pixel redraw referenced to the actual Rusty Iron Sword. Small operation badges distinguish effects within each family.

`ICON_SOURCES.md` records source paths, image IDs, rendering limitations and the complete sword-generation prompt. `model-icons.mjs` produces pixel portraits from read-only model geometry snapshots. `icons.mjs` composes the 30 upgrades with those portraits and embedded artwork. The exact UI images are reused, the geometry portraits have simplified lighting, and the sword is a reference-based interpretation; these are intentionally distinguished in the provenance document.

The Press Start 2P font is reused from the local Roblox installation, with its SIL Open Font License included in `assets/OFL.txt`, `dist/OFL.txt`, and embedded in the standalone HTML. Existing game artwork remains the project's source artwork. Browser verification and its limits are recorded in `VALIDATION.md`.
