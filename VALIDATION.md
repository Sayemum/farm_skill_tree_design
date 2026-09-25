# Runtime Rotten Flesh icon correction — 25 September 2026

- Traced the live loot icon through `LootCounterController` and `LootPickupController` to `NPCTradeConfig.GetItemIcon`. The authoritative Rotten Flesh asset is `127144919314667`; the previously inspected static HUD image `127594479111545` is stale.
- Downloaded the configured image through Roblox's official asset-thumbnail endpoint and checked its olive/brown pixel palette against `ReplicatedStorage.StackModels.RottenFlesh`.
- Updated the shared loot symbol, replacing the image in First Harvest and all six other loot-related upgrade icons. Progression and purchase behavior are unchanged.

# Game-specific art correction — 25 September 2026

- Verified the live Emerald asset ID (`17001682792`) in both the main HUD and SkillTreeGui; embedded its existing image rather than redrawing it. Verified the loot image (`127594479111545`) in the HUD.
- Inspected the Rusty Iron Sword model, actual villagers and red/white stand, Zombie and ZombieBoss, mutation armor, and the Zombie spawner cage. Asset paths and limitations are recorded in `ICON_SOURCES.md`.
- Replaced all 30 icon compositions with game-specific subjects. Inspected the complete browser sheet at 64px, then the root and five newly revealed starters in the playable tree. Mutation icons now depict the corresponding armored mobs; loot rewards depict the game's actual loot.
- Exact Emerald artwork renders in the wallet and the 150-Emerald Combo Keeper tooltip. Purchase-spend feedback references the same `#art-emerald` symbol. Flying currency and the touch purchase button use that shared symbol as well.
- First purchase still reveals six total nodes. Reset returns to one unowned root and 5,000 demo Emeralds. No browser errors were reported during these checks.
- Build validates all icon symbol references and embeds only required artwork in each standalone SVG. The standalone page embeds shared artwork once and requires no external image requests.
- The below pixel-only revision is historical; its invented bag, material icons and generic sword have been superseded. Current art is a mixture of existing raster assets, geometry-derived pixel portraits and a generated reference-based sword.

# Superseded pixel-only icon revision — 25 September 2026

- Replaced all 30 smooth-vector icon compositions with original 32×32 sprites. SVG output uses integer-aligned rectangles and crisp-edge rendering.
- Inspected all 30 icons in the browser at a 64px artwork size, including the spawner bars, weapon-crate emblem, diamond facets, obsidian texture, iron helmet and three-sword rack.
- Confirmed all 30 rendered SVGs have the expected 32×32 view box and crisp-edge attribute.
- Refreshed the playable prototype and visually checked the updated starting icon and Emerald wallet. Default visibility remains one unowned First Harvest node; browser error log is empty.
- Build passed: 30 distinct icons, 30 nodes, 84 paid ranks, valid graph and prerequisites. Progression data and purchase behavior were not changed in this art revision.

# Progressive-disclosure revision checks

- Fresh version-3 session: one visible First Harvest button, zero connector groups, 5,000 demo Emeralds. Hidden buttons are absent from the accessibility tree.
- First Harvest purchase: rank 1/1, 4,975 Emeralds, six visible icons and five connector groups. No deeper nodes appear.
- Combo Keeper purchase: eight visible nodes; only Perfect Timing and Combo Sweep are newly revealed.
- Rank-2 discovery: after Perfect Timing rank 1, Quick Finisher stays hidden and visible count remains eight. After rank 2, Quick Finisher and Rhythm Master appear, increasing the count to ten.
- Preview is not persisted: reloading from full-tree testing mode returns to earned visibility. Purchase ranks remain saved.
- Browser error log remained empty after the new reveal tests.
- Full-tree testing switch: 30 visible nodes. Turning it off returns to the same eight earned nodes without changing ranks or wallet.
- All 30 distinct icon compositions were visually inspected in the browser review sheet. Corrected Quick Finisher blade direction and Giant Slayer clipping.
- Build checks unique IDs, valid prices/gates, acyclic prerequisites, one unowned root, and one distinct icon composition per node.

## Prior purchase-engine checks

The checks below refer to the previous 83-rank build before First Harvest became purchasable. The same purchase engine remains in use; the new disclosure checks above supersede its old all-visible navigation behavior.


Checked 24 September 2026 against the local standalone build.

- Build validates unique IDs, positive integer prices, nondecreasing rank gates, valid prerequisite ranks, valid categories, and an acyclic graph: 30 nodes including the root; 83 purchasable ranks.
- First purchase: Combo Keeper 0/3 → 1/3; 150 Emeralds spent; next price 600; Perfect Timing and Combo Sweep become reachable.
- Repeat purchase: Combo Keeper 1/3 → 2/3; next price 500K, blocked at preview rebirth 0.
- Prerequisite check: Quick Finisher requires Perfect Timing 2/3. Purchasing that second rank makes the finisher available at an eligible rebirth.
- Capstone: Quick Finisher reaches 1/1 and MAXED. Another click gives a denial and does not buy another rank.
- Insufficient funds: with 250 Emeralds, a 1,500-Emerald Crate Finder purchase fails and stays 0/3. Wallet remains 250.
- Drag beginning on an available Faster Hatching node pans the board, leaves it 0/5, and leaves the wallet unchanged.
- Reload retains wallet and purchased ranks. Increasing preview rebirth retains all five previously bought ranks.
- Whole-tree and branch camera shortcuts, central root navigation, tooltip focus, and open/close were checked in the browser.
- Desktop preview at 1280×720 and responsive layout at 390×844 were visually inspected. Mobile opens at the root; branch controls remain visible; tooltip fits the viewport. Physical multi-touch hardware was not available for this check.
- Browser error log was empty after the interaction checks. Exact Roblox audio was not accessible; generated Web Audio cues are an explicitly disclosed approximation.

No production economy, combat or multiplayer behavior is being tested here. Those remain proposals in the design document. No game source was edited. The temporary Studio play test was stopped and the place returned to Edit mode.
