# ANALYSIS: evidence behind the "Signal Reel" design system

This is a one-time analysis of the user's reference video. It is kept so that every rule in `STYLE_GUIDE.md` can be traced back to evidence. The video itself is **not** needed again. Representative keyframes are saved in `reference/`.

## 0. Method and source facts

- **File:** an H.264 MP4 with 720×1280 (9:16) video at about 29.9 fps (431 frames, about 14.42 s of video), plus 44.1 kHz stereo AAC audio (about 14.53 s).
- **Extraction:** a full contact sheet every 0.25 s; full-resolution crops of the screen area at about 40 timestamps; dense strips at 15 fps (every second frame) across 13 transition windows; zoomed crops of the HUD text, the data scene, the UI card, the shape scene, and the end card; FFmpeg scene-change detection (threshold 0.25, no hard cuts found); a per-100 ms RMS audio envelope; and 20×20 px color samples (camera-shifted).
- **Limitations:** the reel is seen *on a laptop screen inside a 9:16 composite*. The colors are affected by the screen and camera (or mockup) rendering, the white balance shifts paper toward cyan or green, the fine type is softened by about 3-4× downscaling and compression, and the perspective distorts proportions. The frame timing resolution is 1 frame at about 30 fps (about 33 ms). The reel content may have been rendered at 60 fps (it says "60 FPS" on screen), but only 30 fps reaches us.

Key: [O] observed, [I] inferred, [U] undeterminable.

---

## 1. Outer layer: presentation wrapper (0.0-14.4 s, constant)

- [O] A dark, moody room. A laptop sits at a low 3/4 angle on a glossy surface, and its screen fills about 75% of the frame width in the upper half.
- [O] A caption "5.5 is ridiculous at motion" in a white bold sans, sentence case, rotated to follow the screen perspective and overlapping the top bezel, with a salmon-orange starburst or asterisk mark at the left.
- [O] **The floor reflection includes the caption and the mark, mirrored.** This proves the lower half is a *composited vertical mirror* of the upper composite, at roughly 35-50% opacity with a fade. It is not a real reflection.
- [O] The wrapper is static: there is no camera move on the laptop for the whole 14.4 s.
- [I] Likely implementation: the 16:9 reel was corner-pinned onto a laptop photo or 3D mockup, and the caption plus mirrored reflection were added in a vertical edit (CapCut, AE, or similar).
- → This is classified as an **OPTIONAL wrapper** (STYLE_GUIDE §9.5). It is the packaging, and the reel on screen is the style.

## 2. Inner reel: scene-by-scene log

All times are on the source timeline (± 1 frame, about 33 ms).

### Scene A: BOOT (0.00-1.45 s). Field: ink navy.
- [O] A navy field with a faint grid: thin lines at low opacity, with bright white "+" or dot marks at the intersections, and a slight perspective falloff.
- [O] 0.0-0.3 s: a small orange spark or streak drops vertically to the center (it looks like a falling ember with a short trail).
- [O] 0.5-0.7 s: the spark settles into an orange dot, and the lowercase mono text `claude // motion` types beside it with an orange cursor.
- [O] 0.75-0.95 s: an orange glowing line stretches out to the full frame width from the dot. The text is rewritten to `claude / motion reel - 2026` with a block cursor.
- [O] 1.0-1.3 s: the line flexes slightly (a gentle wave) and thickens with a stronger bloom.
- [O] HUD: absent. A tiny circle icon sits at the bottom-right.
- Audio [O]: quiet and low-level (about -28 to -35 dB RMS).

### Transition A→B: LINE → FLASH (1.35-1.60 s)
- [O] 1.38 s: the line thickens into a band about 15% of the height tall. By 1.42-1.48 s it is a full-frame white-hot flash with warm edges. From 1.55 s it decays into orange as the title starts.
- Timing [O]: from band to full flash in about 2-3 frames, holding near-white for about 2 frames, then cooling over about 8-10 frames into the orange field.

### Scene B: TITLE / IDENTITY (1.55-3.10 s). Field: signal orange (radial, brighter at the left).
- [O] The hero "CLAUDE." is in a heavy uppercase grotesk in near-black ink, about 20% of the screen height, centered, with the period as a distinct round dot.
- [O] The accent "motion designer" is a white, lowercase, high-contrast serif italic placed under the right half of the hero and right-aligned to it.
- [O] The overline `SHOWREEL ------ 2026` is in tracked mono, small, left-aligned above the hero (in the reference the dashes appear as a long rule).
- [O] The HUD appears here: top-left `CLAUDE - MOTION REEL 2026`, the bottom-left tag `IDENTITY / TYPE`, the bottom-right timecode, and the corner brackets.
- [O] Reveal (from the 15 fps strips): "C" appears at about 1.62 s, "CL" by about 1.69 s, "CLAU" at about 1.75 s, "CLAUDE" at about 1.82 s, and the full word with the period settled by about 2.0 s. Each letter enters inside a mask with heavy horizontal smear. The serif starts at about 1.80 s with a blur and resolves by about 2.0 s.
- [I] Letter stagger is about 1-2 frames, and each letter's entrance is about 4-6 frames of expo-out.
- [O] Hold from 2.0 to 2.9 s. There is minimal motion, and the field gradient shifts slightly.
- Audio [O]: a riser from 2.2 to 2.8 s (-28 rising to -18 dB), a **silence dip at 2.9 s (-40 dB)**, and **the drop at 3.0-3.1 s (-10 dB)**.

### Transition B→C: PERIOD → INK MASK (2.90-3.15 s)
- [O] At 2.95 s the period of "CLAUDE." begins to grow. By 3.05 s it is a large soft-edged black disc covering the right third, and the letters near it blur. By 3.15 s the frame is dark and the next scene fades up from the darkness.
- [I] The growth accelerates (expo-in), and the edge feather is wide (a soft, ink-like edge).
- **This is the clearest evidence for the "dot motif" and "contained-shape transitions" rules.** The transition is synced to the music drop.

### Scene C: 3D / MOGRAPH (3.15-4.85 s). Field: near-black. HUD tag `3D / MOGRAPH`, `SCENE 02 / 07`.
- [O] A tilted plane of about 24×20 instanced rounded cubes in steel blue, seen from a high angle, with a slow rotation.
- [O] 3.3-3.6 s: a central glowing node with a ring sends a radial wave outward. The cubes lift, and the coloring shifts with height to orange, pink, and violet (iridescent). The camera rotates the plane about 20-30°.
- [O] 3.6-4.8 s: the wave forms a raised ring or plateau. A glass or chrome sphere with orbit rings rises on a cube pillar at the center. Soft lighting and no hard shadows.
- [I] Implementation: three.js `InstancedMesh`, a height field `sin(dist - t)` with an envelope, and color from height. The credits confirm Three.js.

### Scene D: KINETIC TYPOGRAPHY (4.85-6.45 s). HUD tag `KINETIC TYPOGRAPHY`.
- [O] **4.85-4.95 s, "EVERY":** black heavy caps on paper (pale cyan-ish through the camera). It arrives with strong horizontal blur and an RGB or chromatic split, and is sharp by about 4.95 s. It holds until about 5.3 s.
- [O] **5.30-5.40 s, "SINGLE":** a small orange word appears inside or behind "EVERY", and the field turns dark navy or black. "SINGLE" scales up with a hot gradient fill (cream to orange) and glow. It is surrounded by about 7 rows of outline-only "SINGLE" repeats that scroll in alternating directions.
- [O] **5.75-5.85 s, "FRAME":** white caps on an electric-blue field with a cyan radial gradient at the left. The word is built from horizontal glitch slices that resolve in about 4 frames, inside viewfinder brackets with the labels `1920 × 1080` at the top-left and `60 FPS` at the bottom-right.
- [O] **6.05-6.10 s:** a hue sweep (blue to magenta-pink to orange) over about 2 frames.
- [O] **6.10-6.35 s, "on purpose.":** a black serif italic, lowercase, on orange. It resolves from blur with a slight drift, and a hand-drawn underline stroke draws under "purpose".
- [O] **6.30-6.45 s:** a diagonal slab wipe of 2-3 parallel bars (orange and white, at about -20°) reveals the paper field.
- Rhythm [O/I]: the word changes at about 4.88, 5.33, 5.78, and 6.15 s, so the spacing is about 0.43-0.45 s (≈ 1 beat). Four words make one bar.
- Audio peaks [O]: at 4.7, 5.9, and 6.3 s.

### Scene E: DATA / INFOGRAPHICS (6.45-8.05 s). Field: paper. HUD `DATA / INFOGRAPHICS`, `SCENE 04 / 07`.
- [O] Left: the mono label `ENGAGEMENT - Q3`, the KPI `+312%` (heavy, ink, with "%" in orange), and below it `vs. last quarter` in small mono. A donut ring goes from 0% to 78% (an orange arc on a light grey track) with the label `RETENTION`.
- [O] Right: the label `MONTHLY REACH`, gridlines at 0/25/50/75/100, 12 black bars (J-D) that grow with a left-to-right stagger with the **last bar in orange**, and a blue line that draws over the bars ending in a dot and a dark tooltip pill `↑ 4.2k`.
- [O] Counter: it reads 38 at 6.60 s, 163 at 6.65 s, 269 at 6.7 s, 279 at 6.8 s, 311 at 7.0 s, and 312 at about 7.25 s. Digits are blurred while rolling. **Expo-out deceleration over about 0.8-0.9 s.**
- [O] Donut: 0% at 6.6 s, 28-58% at 6.7-6.8 s, 77% at 7.0 s, and 78% at 7.25 s.
- [O] Bars: they start at about 6.65 s and are complete by about 7.0 s, with a stagger of about 1-2 frames per bar.
- [O] Hold from 7.25 to 8.0 s.

### Transition E→F: COLUMN DISSOLVE (8.00-8.20 s)
- [O] The frame breaks into vertical strips of varying width, starting from the left. The strips slide or stretch vertically (pixel-sort look) and reveal black. By 8.15 s only the right part of the chart remains, and by 8.2 s it is gone.

### Scene F: GENERATIVE / PARTICLES (8.20-9.75 s). Field: black. HUD `GENERATIVE / PARTICLES`, `SCENE 05 / 07`.
- [O] 8.25-8.6 s: a dense flow field of short white streaks (with sparse orange and blue ones) curling in organic currents. This suggests curl noise.
- [O] 8.7-9.0 s: the streaks converge into a chaotic starburst or tangle at the center.
- [O] 9.0-9.6 s: they organize into concentric dotted rings (a torus seen from the front). An annotation leader line points to the labels `n = 2,400` and `φ = 137.508°` (the golden angle, which means **phyllotaxis**, 2,400 particles).
- [O] **9.65-9.85 s, transition:** the rings explode radially into long white streaks (a hyperspace burst), and blue concentric discs expand from the center. The field becomes electric blue.

### Scene G: UI / PRODUCT MOTION (9.85-11.30 s). Field: electric blue with a vignette. HUD `UI / PRODUCT MOTION`, `SCENE 06 / 07`.
- [O] 9.9-10.0 s: the card flies in with heavy motion blur and a slight 3D tilt. It is sharp by about 10.0 s. Two translucent blue back-cards sit behind it, rotated a few degrees.
- [O] The card shows "Render queue" (semibold sans), the sub-line `showreel_v1.mp4 · 900 frames` (mono), a `● LIVE` badge, a "Motion blur" toggle, "Frame rate" options 30 and **60**, and a black "Render ▸" button.
- [O] The cursor moves in and clicks the toggle, which turns orange at about 10.15 s. The cursor clicks "Render" at about 10.7 s, and the button becomes an orange progress fill reading "Rendering... 86%" at 11.0 s and "Done ✓" at 11.2 s. A dark toast notification slides in at the top-right (about 11.15 s, "900 frames rendered" [I, the text is partly illegible]).
- [O] 11.25-11.40 s, transition: the card collapses into a blank pale rounded square, then darkens into a black rounded square with an orange or pink bloom ring, which expands. The field becomes orange with a black blob at the center.

### Scene H: SHAPE / LIQUID (11.40-12.95 s). Field: orange. HUD `SHAPE / LIQUID`, `SCENE 07 / 07`.
- [O] A black central blob splits gooily (metaballs) into 1 center blob plus 6 orbiting blobs inside a thin cream circle outline.
- [O] 12.0-12.4 s: the outline morphs from a circle into a wobbly 5-point star, with the labels `r(θ) = superformula` and `m = 5.98`. The blobs orbit and wobble.
- [O] 12.5-12.75 s: the blobs merge back into one central black dot, and the outline disappears.
- [O] 12.8-13.1 s, transition: the dot grows into concentric dark rings (portal) that zoom past the camera. The navy field appears with a tiny orange dot in a ring at the center.

### Scene I: END CARD (13.10-14.42 s). Field: ink navy. HUD: absent.
- [O] 13.15-13.3 s: an orange glowing dot with a halo (bokeh) settles at the center.
- [O] 13.3-13.7 s: the dot moves to the left, and the wordmark "Claude" (heavy sans, white, sentence case) is revealed to its right with glitch slices. It is clean by about 13.75 s.
- [O] 13.75-13.85 s: the serif italic "motion designer" appears below in white, and a thin hairline rule draws under it.
- [O] 13.85-14.2 s: the mono tagline `EVERY FRAME, ON PURPOSE.` in orange, widely tracked, types or decodes from left to right.
- [O] 14.2-14.3 s: the credit line appears in small white mono: `MADE ENTIRELY IN CODE - REACT · REMOTION · THREE.JS - 0 KEYFRAMES DRAGGED`.
- [O] It holds until the end. Audio: it drops to -34 to -42 dB at 14.0 s (the music ends at the reveal).

## 3. Cross-scene patterns (from the log above)

- **Scene boundaries:** about 1.45, 3.12, 4.87, 6.45, 8.15, 9.8, 11.38, 13.0, and 14.42 s. The mean showcase-scene length is about 1.6 s. [O]
- **Audio:** after the drop, the RMS peaks come in pairs about 0.4 s apart, repeating every 1.55-1.6 s (4.3/4.7, 5.9/6.3, 7.4/7.8, 9.0/9.4, 10.5/10.9, 12.1/12.5, 13.7). This implies about 150-155 BPM with accents on beats 1 and 2 of each bar. [I] The scene changes fall within about 1-4 frames of these bar positions. [I]
- **Field sequence:** navy, orange, black, paper, black, blue, (magenta sweep), orange, paper, black, blue, orange, navy. There is never the same field twice in a row. [O]
- **Dot or circle appearances:** the boot spark and dot, the line origin, the title period, the ink disc, the wave-origin node, the glass sphere, the HUD dots, the donut, the line-chart end dot, the particle rings, the blue discs, the toggle knob, the blob, the portal, the end-card dot, and the HUD project dot. That is 15+ occurrences. [O]
- **No overshoot or bounce:** no element in any strip passes its rest position and returns. [O within 33 ms resolution]
- **No crossfades:** every scene change has a visible device (see STYLE_GUIDE §8). [O]
- **Motion blur:** present on every fast move: letters, words, the card, the slab wipe, and the streaks. [O]
- **The HUD is constant in layout** across scenes C-H. Only the text values change. [O]

## 4. Color samples (raw, camera-shifted)

These are 20×20 px area averages taken through the camera, so they are darker or shifted. The recommended working values are in STYLE_GUIDE §3.
- Orange field at 2.6 s: rgb(230, 77, 9), i.e. `#E64D09`. At 12.2 s: rgb(201, 64, 8). The working value `#FF5414` assumes a camera loss of about 10-15%.
- Navy at 0.9 s: rgb(14, 25, 45), i.e. `#0E192D`. At 5.5 s (behind SINGLE): rgb(19, 26, 41).
- Electric blue at 10.7 s: rgb(7, 19, 120), with heavy camera darkening. The on-screen value is likely around `#1F3BFF`. [I]
- Paper at 7.5 s: rgb(162, 178, 170), and at 5.2 s: rgb(142, 185, 192). This is a camera white-balance shift. The original is likely a near-white, slightly cool `#EEF0EC`. [I]

## 5. Uncertainties and things not determinable

- [U] **Exact font families.** Only the class is reliable (heavy geometric grotesk, high-contrast serif italic, mono). The candidates are listed in STYLE_GUIDE §4.
- [U] **Exact hex values.** See §4 above. The roles and relationships are reliable.
- [U] **Native frame rate.** The reel claims 60 fps, but we see about 30 fps. Sub-frame easing details are estimated.
- [U] **Exact easing curves.** They are estimated from the frame-to-frame displacement (≈ expo-out). The exact Bézier values are recommendations.
- [U] **Grain, noise, and DOF.** Compression and the camera hide them.
- [U] **Exact BPM.** 150-155 is inferred from the RMS peaks. No beat-tracking library was available, so the estimate is ± 5 BPM.
- [U] **Some small text** (toast content, some HUD values) is only partly legible.
- [U] Whether the wrapper is a real camera shot or a full mockup composite. The mirrored caption in the reflection points to a composite, at least for the lower half.

## 6. Reference keyframe files

- `reference/00_full_frame_wrapper.jpg`: the full 9:16 composite at 2.2 s (laptop, caption, mirrored reflection).
- `reference/01_boot_title.jpg`: 0.3, 0.6, 0.95, 1.45, 1.65, 1.8, 2.2, 2.95, and 3.1 s (boot, line → flash, title reveal, period → ink).
- `reference/02_3d_kinetic_type.jpg`: 3.3, 3.6, 4.2, 4.95, 5.5, 5.85, 6.05, 6.25, and 6.5 s (3D wave, EVERY / SINGLE / FRAME / hue sweep / on purpose. / slab wipe).
- `reference/03_data_particles_ui.jpg`: 6.75, 7.5, 8.05, 8.4, 8.9, 9.3, 9.85, 10.7, and 11.05 s (dashboard, column dissolve, flow field, phyllotaxis, burst, UI card).
- `reference/04_shape_portal_end.jpg`: 11.3, 11.45, 11.8, 12.25, 12.8, 13.0, 13.3, 13.6, and 14.35 s (card collapse, metaballs, superformula, portal, dot-led wordmark, end card).
