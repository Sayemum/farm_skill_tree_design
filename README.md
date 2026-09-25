# Skill tree redesign — 24 September 2026

This is the current progressively revealed, single-root, multi-rank design exploration. It starts with one purchasable First Harvest icon. Buy upgrades to reveal adjacent choices. Open the corner gear for the optional full-tree testing switch. It supersedes the navigation and purchase model in `../SkillTreeConcept`, which remains intact for comparison.

Open `dist/index.html` in a browser, or serve `dist` with a local HTTP server. No installation or Roblox connection is needed. Run `node build.mjs` after editing `skill-tree-data.json` or `template.html`.

Only the web prototype spends its simulated wallet. Purchases survive a simulated rebirth. Reset clears this browser's prototype progress. Nothing connects to Roblox saves, remotes, or accounts.

See `skill-tree-design.md` for findings, whiteboard decisions, mechanics, and effect fidelity. See `node-catalogue.md` for every rank's price, reward and gate.

Icon compositions: `icons.mjs`. Actual-model pixel rendering: `model-icons.mjs`. Asset provenance, verified Studio paths, and sword-generation prompt: `ICON_SOURCES.md`. Source artwork and geometry snapshots: `assets/game-reference`. Individual standalone SVGs: `assets/icons`. Review all icons at 64px: `dist/icons.html`. Run `node build.mjs` after changing any icon source.
