# Game-specific icon sources — 25 September 2026

This revision replaces the previous generic pixel illustrations. Reference inspection targeted the connected **TESTING PLACE - Mob Farm Game**, place ID `72474345450984`. No gameplay scripts or original models were edited. Temporary isolated model copies used to inspect swords were removed after capture.

## Exact existing artwork

- **Emerald:** `rbxassetid://17001682792`, verified at `StarterGui.SkillTreeGui.Root.TopBar.Points.Icon`, `Root.Detail.Cost.Icon`, and the main HUD currency icon. `assets/game-reference/emerald-17001682792.png` is the Roblox image thumbnail for that same asset. The prototype embeds it in the wallet, price tooltip, touch purchase button, purchase flight, spend popup and relevant upgrade icons. It is not an AI recreation.
- **Rotten Flesh / loot:** `rbxassetid://127144919314667`, verified in `ReplicatedStorage.SharedData.NPCTradeConfig.ITEM_ICONS.RottenFlesh`. The live `LootCounterController` and `LootPickupController` obtain their images through `NPCTradeConfig.GetItemIcon`; the AutoSellMachine also uses this asset. Local file: `assets/game-reference/loot-127144919314667.png`. This supersedes the stale static `StarterGui.GUI.HUD.Bottom.LootLabel.CoinIcon` image (`127594479111545`) used in the previous prototype revision. The static label alone was not sufficient to identify the runtime item icon.
- **Weapon crate:** copied from the project's `3D to 2D Images/Common.png`, matching the brown metal-bound crate and green wooden-sword emblem. Local file: `assets/game-reference/common-crate.png`.

Roblox's unauthenticated asset-delivery endpoint rejected the image download, so the existing UI images were obtained through Roblox's official asset-thumbnail endpoint. The Emerald was visually checked against the Studio HUD. The corrected Rotten Flesh image was checked against the runtime item configuration and the colors of `ReplicatedStorage.StackModels.RottenFlesh`. An unavailable sword HUD thumbnail was not used.

## Portraits from actual model geometry

`assets/game-reference/models.json` and `cage.json` contain read-only snapshots of visible primitive parts: transforms, dimensions, colors, transparency and source paths. `model-icons.mjs` renders orthographic portraits onto a 64×64 grid with depth testing and a dark silhouette outline. These preserve authored geometry and facial details; they are not AI-invented character portraits. Lighting is simplified for small-icon readability. Roblox materials, studs and live particle effects are not reproduced by this renderer.

- Zombie: `ReplicatedStorage.Assets.Mobs.Zombie`.
- Gold, Diamond and Obsidian zombies: `ServerStorage.MobMutationArt.Zombie.<variant>`. These show the actual armor, helmets, horns and chest details. Mutation chance uses the armored mob plus a small plus badge; mutation yield uses that same mob with the game's loot item.
- Giant Slayer: `ReplicatedStorage.Assets.BossMobs.ZombieBoss`, including its enlarged arms and bright green eyes. Replaces the unrelated metal helmet.
- Villager: `Workspace.SellStand.Villager`, preserving its long nose, brow, green eyes, clothing and folded arms.
- Trading stand: `Workspace.SellStand`, preserving its red-and-white roof, wood counter and villager. Replaces the cash register, weighing scales and green market stalls.
- Spawner cage: `ReplicatedStorage.Assets.SpawnerCages.Zombie`. The Faster Hatching icon combines its green cage with the actual zombie portrait as a small symbolic display; it is not a screenshot of a running spawner animation.

## Sword redraw

`assets/game-reference/rusty-iron-sword.png` was generated with the built-in image-generation tool using a Studio screenshot of `ReplicatedStorage.WeaponSystem.Assets.RustyIronSwordRig`. It is a reference-based pixel interpretation, not an exact render or extracted texture. The requested invariants were the broad rust-mottled grey blade, pointed tip, plain dark guard, wrapped brown grip and small grey pommel. It replaces the generic silver blade with a gold guard across combat and sword upgrades.

Prompt used:

> Create ONE transparent-background pixel-art inventory icon for this game's RUSTY IRON SWORD using the center sword in the reference screenshot. Ignore the wooden sword on left, all scenery and UI. Faithfully preserve the actual model: broad straight dark grey iron blade with conspicuous rusty brown mottled patches, blunt beveled spear-shaped pointed tip, slightly wider bevel shoulders near the tip, straight simple dark-grey crossguard with small rounded end knobs, dark brown wrapped grip, small grey disk pommel. NO gold guard, NO emerald or diamond embellishments, NO fantasy wings. Redraw as polished detailed pixel art, a disciplined 48x48 logical pixel grid enlarged nearest-neighbor to output, hard stepped edges, clusters of rust texture and grey steel shading. Sword diagonal bottom-left grip to upper-right tip, full silhouette visible with modest transparent margin. It is an icon for a Roblox Minecraft-themed mob farm and must resemble that exact rusty sword rather than a Minecraft default sword. Crisp dark contour. No labels, UI frame, backgrounds, glow, particles, or shadow outside the sword. Save transparent PNG.

## Upgrade symbols

Small plus marks, speed chevrons, hit flashes, moons, clock, check marks and heart communicate proposed upgrade effects; they are interface symbols rather than claims about game objects. Fleet Feet uses a neutral running block-avatar symbol because players have different avatars; it no longer implies a boot item or equipment system. Sword Vault uses inventory slots rather than an invented weapon rack. Combo icons use swords and a timing/expiry bar, informed by the existing ComboHudController, instead of a metronome, crown or unrelated flame item.

## Editing and embedding

- Change compositions in `icons.mjs`; model rendering is in `model-icons.mjs`.
- Shared symbols embed the source artwork once in each HTML page. Standalone `assets/icons/*.svg` files embed their definitions too, so they do not require a network connection.
- Run `node build.mjs`. This refreshes the prototype, all 30 standalone icons, and the 64px icon review sheet.
- Upgrade prices, rewards, gates and reveal rules are unchanged by this art revision.
