# Claude explainer: motion-style example

A 15 s, 1920×1080, 30 fps explainer built with the `motion-style` skill ("Signal Reel").
Output: `out/claude-explainer.mp4`.

Render: `npm install`, then `npx remotion render ClaudeExplainer out/claude-explainer.mp4` (add `--browser-executable=<chrome>` if Remotion can't download one).
QC stills: `node stills.mjs <frames...>`. All tokens are in `src/tokens.ts`.

## Beat sheet (150 BPM, beat = 12 f, bar = 48 f)
| Bar | Frames | Scene | Field | Exit device |
|---|---|---|---|---|
| 0 | 0-48 | Boot: spark -> dot, terminal line | navy | line -> flash |
| 1 | 48-96 | Title: CLAUDE. / your AI collaborator | orange | period -> ink mask (iris open) |
| 2 | 96-144 | READS / WRITES / CODES / with you. (1 word per beat) | paper / black / blue -> hue sweep / orange | diagonal slab wipe |
| 3 | 144-192 | Data: prompt -> +38%, donut, bars (sample data) | paper | column dissolve |
| 4 | 192-240 | Code: fixes off-by-one, tests pass (✓ dot) | black | radial burst from ✓ dot |
| 5 | 240-288 | Chat: Lisbon trip, typing dots | blue | card collapses -> dark square, orange bloom |
| 6 | 288-336 | Tools: one dot splits into 6 tools, superformula | orange | dot -> portal rings |
| 7+ | 336-450 | End: the dot writes "Claude", tagline decodes | navy | final hold |

CORE (style): beat-locked bars, expo-out snaps + motion blur (shutter 270°), contained-shape transitions, three type voices, HUD on scenes 1-6, field rotation, a single orange signal, the dot motif.
PROJECT: all copy, the chat/code/data content, 6 scenes, 16:9, English, no wrapper, no audio. No design kit was supplied, so the default fonts were used (Archivo Black / Instrument Serif Italic / JetBrains Mono / Inter UI).
Deviation: no 3D mograph scene (optional in the guide). This keeps the example dependency-light.
