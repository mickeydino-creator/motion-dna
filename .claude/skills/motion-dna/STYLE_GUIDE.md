# STYLE GUIDE: Motion DNA ("Signal Reel" motion system)

The permanent design system for the **Motion DNA** skill (`/motion-dna`). **This file is the default production specification.** Every new video is built from it without reopening the master reference video. It was extracted from a single reference reel (14.4 s, recorded or composited as a 9:16 social video of a laptop screen playing a 16:9 motion reel). All values below are meant for production use. The evidence behind them is in `ANALYSIS.md`, and the visual keyframes are in `references/keyframes/`.

## 0. Master reference

- **Location:** `references/master-reference.<original extension>` (for example `master-reference.mp4`), with its checksum in `references/master-reference.sha256`. Check whether it is present with `bash scripts/master_ref.sh status`. If it is not present, the user has not uploaded it to the skill yet, and it must not be described as saved.
- **Current master (designated by the user on 2026-10-23):** `references/master-reference.mp4`, sha256 `08719522e5c8bb9e18108eea31b46de785b5d5c085d66878766e5ae996080d8d` (1920×1080, 30 fps, 15.0 s, H.264, no audio). This is the "Claude explainer" (`examples/claude-explainer`), which was produced *from this guide* and passed the §13 QC. The user then explicitly designated it as the master. Its scene map is in ANALYSIS.md §7.
- **Original analysis source:** the rules in §1-§12 were extracted from an earlier reel, sha256 `c5c6620a168182ef7428ea1dc13bd9243f23ff337f2136fe976c0864663e5a7e` (720×1280, about 14.5 s; evidence in ANALYSIS.md §0-§6 and `references/keyframes/`). That file is **not** stored in the skill.
- **How to use the two in a correction:** compare the project output against the master (via `master_ref.sh compare`, with timestamps from ANALYSIS §7) first. For style elements the master does not contain (3D mograph, flow-field particles, the device wrapper, the repeat-field and viewfinder words of the original, audio sync), the evidence is ANALYSIS §1-§6 and the keyframes. Since the master was built from this guide, a difference between the master and the guide usually means the project drifted, not that the guide is wrong. Log a §15 rule only when the master itself shows the better behavior.
- **Purpose:** this video is the ground truth for the style. This guide is the working translation of it.
- **When to use it:** production and normal revisions use **only this guide**. The master is reopened only (a) when the user reports that a generated video doesn't look right, doesn't match the style, or needs more accuracy, or (b) when the user explicitly asks to analyze or update the reference. Reanalysis is **targeted**: only the scenes and aspects in question (see SKILL.md, Correction workflow).
- **Separation:** project footage and generated videos are never stored in `references/`, and never replace the master. The master is replaced only on an explicit user request (`master_ref.sh replace`, which archives the previous master).


**Confidence tags** used throughout:
- **[O] Observed:** directly visible in the extracted frames.
- **[I] Inferred:** a reasonable conclusion from what is visible (for example, an easing curve estimated from frame spacing).
- **[U] Uncertain:** not determinable from the reference. The value given is a recommended default that fits the style, not a measurement.

The reference was captured *through a camera or mockup*, so the colors are shifted and the fine detail is softened. Exact hex values and font names are therefore **[I]** at best. The *relationships* (contrast, role, rhythm) are **[O]** and are what matter.

---

## 1. Identity: what makes it recognizable

These seven signatures define the style. If one of them is missing, the piece stops looking like this style.

1. **Snap and hold.** Elements arrive almost instantly (expo-out, 6-10 frames) with heavy motion blur, then sit still while something inside them keeps living. Energy comes from contrast in speed, not from constant movement. [O]
2. **The scene is a bar.** Each scene lasts one musical bar (about 1.55-1.65 s at about 150 BPM), and sub-events land on beats (about 0.4 s). Type sequences change one word per beat. [O/I]
3. **Contained-shape transitions.** The next scene is always born from a shape that already exists in the current one: a line, a period, a ring, a card, a dot. There are no crossfades and no unmotivated wipes. [O]
4. **The dot motif.** A single circle or dot recurs as the connective tissue. It opens the piece (a falling orange spark that becomes a dot), it is the period in the title, a glass sphere on the 3D wave, the center blob in the liquid scene, the portal, and finally the glowing orange dot that "writes" the wordmark at the end. [O]
5. **Three typographic voices.** A heavy uppercase grotesk (impact), a lowercase serif italic (human or poetic accent), and a tiny widely tracked uppercase mono (technical metadata). [O]
6. **A four-field palette with a single signal.** Base fields rotate between four *roles* (dark, saturated brand field, light, cool or secondary), and one accent is reserved for the signal: the thing your eye must find. In the reference the hues were ink navy, signal orange, paper off-white, and electric blue, with orange as the signal [O]. Those hues are the **default palette**, not a fixed rule (see §2 and §3.4).
7. **The HUD frame.** A precise "instrument" overlay sits on every showcase scene: corner brackets, a project label with an orange dot, a scene counter, a category tag, and a running timecode. [O]

Tone: engineered, precise, confident, a little playful (the serif italic), and never decorative for its own sake.

---

## 2. Core vs optional

**CORE (keep in every project):** signatures 1-7 above, the easing family (§7), the transition grammar (§8), the field-rotation rule (§3.5), the three-voice type roles (§4), the HUD structure (§5.3), and motion blur on fast moves (§11.1).

**OPTIONAL (choose per project):** specific showcase scene types (3D mograph, particles, data, UI, liquid shapes; see §6.3), specific transition devices from the catalog, chromatic aberration intensity, glitch slicing, iridescent 3D materials, the boot "terminal typing" intro, the device-mockup wrapper with floor reflection (§9.5), the exact BPM, the number of scenes, and the HUD text content.

**PROJECT IDENTITY (comes from research or the user's kit, never from the reference; see RESEARCH.md):** the actual hues filling the field and signal roles, the fonts filling the three type roles (when suitable, §4.5), the logo, product UI, imagery, copy, claims, and tone. The reference's orange, navy, paper, and blue are used **only** when the project has no external identity (abstract work, the user's own unbranded content) or when the user asks for them. They must never be imposed on a brand that has its own identity.

**PROJECT-SPECIFIC CONTENT (never copy from the reference):** the words "CLAUDE", "motion designer", "every frame, on purpose", the statistics (+312%, 78%), "Render queue", the asterisk logo, the caption "5.5 is ridiculous at motion", and any brand marks. These were the reference's *content*, not its style.

---

## 3. Color system

### 3.1 Base fields (full-frame backgrounds)
The values are recommended working values. The reference samples were camera-shifted, and the sampled values are listed in ANALYSIS.md.

- **INK NAVY** `#0D1628` (range `#0A1222`-`#131E36`). Used for the boot, the end card, and dark technical scenes. Often has a very subtle radial lift toward the center (+3-5% luminance). [O hue / I exact]
- **DEEP BLACK** `#08090C`. Particle and 3D scenes. It reads as "off", a near-black that is slightly cool. [O]
- **SIGNAL ORANGE (as a field)** `#FF5414` (range `#F04A0C`-`#FF6A2A`). Used for the title scene and the shape scene. The field has a soft radial gradient: brighter and slightly yellower at one edge (toward `#FF6A1F`) and deeper toward the opposite corner (toward `#E2430A`). [O]
- **PAPER** `#EEF0EC` (range `#E8EBE7`-`#F5F5F1`). A cool off-white that is never pure `#FFFFFF`. Used for the data and typography scenes. [O hue / I exact]
- **ELECTRIC BLUE** `#1F3BFF` (range `#1530E0`-`#2A48FF`). UI and type scenes. It carries a radial gradient toward cyan `#3FD2FF` on one side (FRAME scene) or a darker vignette `#0A1A9A` toward the edges (UI scene). [O]

### 3.2 Signal and ink colors (elements)
- **SIGNAL ORANGE** `#FF5414` on dark, paper, or blue fields. Used for dots, cursors, the "%" glyph, the highlighted last bar, toggles, progress fills, the HUD project dot, and the end tagline. [O]
- **INK** `#121218`, a near-black for heavy type and bars on orange or paper. It is never pure black on paper, and is slightly warm on orange. [O]
- **WHITE TYPE** `#F7F7F4`, for type on navy, blue, or black. [O]
- **CREAM LINE** `#F6E3C4`, for thin (1-2 px at 1080p) outline strokes on orange, such as the superformula outline. [O]
- **CHART BLUE** `#2B3BD9`, a secondary data line on paper. [O]
- **HUD GREY**: 55-70% opacity of the type color on the current field. [O]

### 3.3 Gradients and special materials
- **Iridescent mograph gradient:** steel blue `#4B8FC8` to violet `#7A4BD8` to pink `#F07AB0` to orange `#FF7A2A`, driven by height or distance from the wave origin, with soft specular highlights. [O]
- **Hot fill for impact type:** `#FFE7C2` to `#FFA24A` to `#FF5414`, vertical, plus outer glow (the "SINGLE" word). [O]
- **Hue-sweep:** the full field hue rotates (blue to magenta `#E04AF0` to orange) over 2-4 frames as a transition. [O]
- **Light flash:** white-hot `#FFF6E8` with orange edges `#FF7A2A`, as a light-leak look. [O]

### 3.4 Brand-swappable slots (filled from the PROJECT_BRIEF)
§3.1-§3.3 describe the **default palette** (the reference's own hues). For any project with a researched or supplied identity, fill the roles from the verified brand palette in `PROJECT_BRIEF.md` (RESEARCH.md §7) and record the source of each value in the tokens file. The roles are CORE and the hues are PROJECT. Mapping:
- `signal` is the brand's most saturated accent. It must keep ≥ 3:1 contrast against every base field it touches. If it fails on one field, adjust that field rather than the signal.
- `field.warm`: by default this is the same hue as `signal`, used as a field.
- `field.dark`, `field.light`, `field.cool`: brand neutrals and a secondary color.
- `ink`, `white`: the brand's text colors.
Keep the **number** of fields (4) and the **roles**, even when the hues change. If the brand has fewer colors, derive the missing roles from the brand's own colors (a deep tint of the primary for `field.dark`, the brand's off-white or a 3-5% tint for `field.light`, a secondary or analogous hue for `field.cool`). Mark derived values [S] in the brief. Brand gradients or textures that are part of the identity may replace the soft radial field gradient. Keep them soft enough for type contrast.

### 3.5 Color rules (CORE)
1. **Field rotation:** adjacent scenes must differ in base field, and should alternate in value (dark ↔ light or saturated). The reference order was navy, orange, black (3D), paper, black, blue, orange, paper (data), black (particles), blue (UI), orange (shape), navy (end). [O]
2. **One signal:** at any moment, the brightest-saturation accent on screen is the signal color, and there is at most one "signal object" per scene (one dot, one bar, one %, one toggle).
3. **The signal hue as a field means ink type:** on the saturated brand field (orange by default), type is INK (heavy) or WHITE (serif italic), never signal-on-signal.
4. **No pure #000 or #FFF fields.** They are always slightly tinted.
5. **Gradients are radial and soft** (a lit-from-one-side feel). There are no hard linear rainbow gradients except the iridescent 3D material.

---

## 4. Typography

### 4.1 The three voices (CORE roles)
**A. IMPACT: a heavy grotesk, UPPERCASE** [O]
- Character: a black or extra-bold weight with geometric-grotesk proportions, slightly wide, compact apertures, and a flat terminal on "C". Counters are small at this weight.
- Candidates [I]: Archivo Black, Inter Display Black or ExtraBold, Satoshi Black, General Sans Bold, Neue Haas Grotesk Display Black, Clash Display Bold. Choose the one closest to the kit.
- Case: ALL CAPS for impact words (CLAUDE., EVERY, SINGLE, FRAME). Sentence case is allowed only for the final wordmark ("Claude") on the end card.
- Tracking: -2% to -4% (tight). Leading is not applicable (one word per line is the norm).
- Punctuation as a graphic element: a full stop after the title word ("CLAUDE.") is a **real dot that later becomes the transition**. Keep this idea.

**B. ACCENT: a high-contrast serif italic, lowercase** [O]
- Character: a transitional or Didone italic with lively, calligraphic, sharp entry strokes ("motion designer", "on purpose.").
- Candidates [I]: Instrument Serif Italic, Playfair Display Italic, DM Serif Display Italic, Canela Light Italic, GT Super Italic.
- Case: always lowercase, and may end with a period.
- Placement: under the impact word, **right-aligned to the impact word's right edge or offset right**, slightly overlapping its baseline zone (about -10% to +15% of the cap height gap). Alternatively, it can be used alone as a full scene ("on purpose.") with a hand-drawn underline stroke.
- Size: 35-45% of the impact word's cap height.
- Color: WHITE on orange, navy, or blue. INK when it is the hero on orange.

**C. TECHNICAL: a monospace, UPPERCASE, wide tracking** [O]
- Character: a small, clean mono. At reference resolution it reads almost pixel or bitmap.
- Candidates [I]: JetBrains Mono, IBM Plex Mono, Space Mono, Geist Mono, Berkeley Mono.
- Case: UPPERCASE for HUD labels, category tags, and taglines ("EVERY FRAME, ON PURPOSE."). The boot terminal line is lowercase ("claude / motion reel - 2026").
- Tracking: +12% to +25%.
- Size: 1.2-1.8% of the frame height (13-19 px at 1080p) for the HUD, and 2-2.5% for the end tagline.
- Separators: " - " (spaced dash), " / " (spaced slash), and " · " (middle dot). Use code-like notation for parameters: `r(θ) = superformula`, `m = 5.98`, `n = 2,400`, `φ = 137.508°`, `1920 × 1080`, `60 FPS`.

**D. UI TEXT (only inside product or UI mockups)** [O]: a neutral UI sans (Inter, SF Pro, or similar), in a semibold title plus regular labels. Treat it as *content*, not as a fourth style voice.

### 4.2 Size hierarchy (relative to the frame, for a 16:9 frame)
- Hero impact word: cap height **18-22% of the frame height**, with a word width of **55-70% of the frame width**. [O]
- KPI number (data scenes): cap height 10-13% of the height. The signal-colored unit (%) is at the same size. [O]
- Accent serif: 35-45% of the hero cap height. [O]
- End wordmark: cap height 9-11% of the height (smaller than the title-scene hero, so it reads as calm and final). [O]
- HUD mono: 1.2-1.8% of the height. [O]
Use a ratio of about 1 : 0.4 : 0.08 (impact : accent : mono), which gives an extreme scale contrast.

### 4.3 Text layout
- One impact word per scene or beat. Don't set sentences in the impact voice. Break messages into words and give each word its own beat ("EVERY / SINGLE / FRAME / on purpose."). [O]
- The final line of a sequence switches to the serif-italic voice, which acts as the "human resolution" of the mechanical words. [O]
- Small mono "overlines" sit above hero words, left-aligned to the hero, often containing a long rule: `SHOWREEL ------ 2026` (a label, a long dash rule, then a year or number). [O]
- A thin hairline rule (1 px, 40% opacity) can separate a wordmark from a tagline. [O]

### 4.4 Text animation vocabulary
- **Letter-sequential masked reveal with motion blur** [O]: letters appear left to right, staggered 1-2 frames per letter, each sliding in a short distance (20-40% of the letter width) inside its own mask, heavily smeared. The full word completes in about 0.35-0.45 s. The serif accent starts when the impact word is about 60% complete.
- **Whip-in with chromatic split** [O]: the word enters horizontally from 10-20% of the width offset, over 3-4 frames, with an RGB split (2-6% of the width) and a blur that resolves to sharp on frame 4-5.
- **Repeat-field** [O]: the hero word sits filled and glowing in the center, surrounded by rows of the same word in outline only (1-2 px stroke, 15-30% opacity). The rows scroll horizontally in alternating directions at a constant speed.
- **Glitch-slice decode** [O]: the word is built from 4-8 horizontal slices that slide in with offsets and resolve within about 4-5 frames, framed by viewfinder corner brackets and technical labels (`1920 × 1080`, `60 FPS`).
- **Serif write-on** [O]: the serif words resolve from blur with a slight horizontal drift, then a hand-drawn underline stroke is drawn (trim path, 6-8 frames, ease-out).
- **Counter roll** [O]: KPI digits roll quickly with vertical motion blur and settle on the final value in about 0.9-1.0 s. They decelerate hard (expo-out), and the last digits keep flickering longer than the first.
- **Terminal type-on** [O]: lowercase mono typed with an orange block cursor. The text may be *rewritten* mid-way ("claude // motion" becomes "claude / motion reel - 2026").
- **Dot-led wipe** [O]: a glowing dot moves horizontally, and the wordmark is revealed behind it as if the dot were painting it, with slice glitching during the reveal.
- **Decode or scramble** [I]: the mono tagline characters resolve from random glyphs, left to right, at 1-2 frames per character.

### 4.5 Brand-swappable type slots
`font.impact`, `font.accent`, `font.mono`, `font.ui`. Fill them from the brief (the brand's verified fonts) when they are legally obtainable and fit the role. If not, use the closest open alternative, labelled [S]. The brand's display font goes into impact *only if it is heavy* (≥ 700 and ideally ≥ 800). If the kit has no serif italic, choose one from the candidates above rather than dropping the accent voice. The accent voice is CORE.

### 4.6 RTL and Hebrew adaptation [U, recommended]
- The letter-sequential reveal runs **right to left**. Whip-ins enter from the left (moving toward the reading start) or mirror the original direction consistently across the piece.
- Impact: a heavy Hebrew sans (Heebo Black, Assistant ExtraBold, Rubik Black, Ploni Black). Accent: a Hebrew serif (Frank Ruhl Libre, David Libre), with an oblique feel created by motion rather than a fake italic. Mono stays Latin for technical labels, or uses Rubik Mono or Heebo for Hebrew metadata.
- Hebrew has no uppercase. Use weight and scale to deliver the impact instead. Keep the tracking tight on display and wider on the mono.
- Mirror the HUD: the project label goes to the top-right, the scene counter to the top-left, and the category tag to the bottom-right.

---

## 5. Composition

### 5.1 Grid and safe area (16:9 reference)
- HUD margin: **3.5-4.5% of the width** from each edge (about 70-85 px at 1920 px). [O]
- Hero content sits within the central 70% × 60%. [O]
- The optical center is slightly above the geometric center (-2% to -4% of the height) for hero type. [I]

### 5.2 Layout patterns observed [O]
- **Centered hero:** the impact word is centered, the accent is right-offset below, and the mono overline is left-aligned above. This is the title and typography pattern.
- **Centered object:** a 3D surface, particle ring, card, or blob is centered with generous negative space (35-50% of the frame is empty field).
- **Split dashboard:** the left 35% holds the KPI and a donut stacked, and the right 55% holds the chart, both top-aligned to a mono label row.
- **Full-bleed field:** particle flow fields and repeat-type fields fill edge to edge, with the HUD floating on top.

### 5.3 HUD frame (CORE on showcase scenes) [O]
- **Top-left:** an orange dot (about 0.6% of the height) followed by the project label in mono caps, `PROJECT - TITLE YEAR`.
- **Top-right:** `SCENE 0N / 0T` in mono caps, plus an L-shaped corner bracket (about 1.5% of the height on each leg, 1 px).
- **Bottom-left:** an L-bracket and the category tag `CATEGORY / SUBCATEGORY` (e.g. `3D / MOGRAPH`, `KINETIC TYPOGRAPHY`, `DATA / INFOGRAPHICS`, `GENERATIVE / PARTICLES`, `UI / PRODUCT MOTION`, `SHAPE / LIQUID`, `IDENTITY / TYPE`).
- **Bottom-right:** a small REC-style dot, then a running timecode `00:00:SS:FF` that updates every frame, plus a tiny circular icon.
- The HUD is **absent** on the boot and end cards and appears with the first showcase scene. It does not animate between scenes. Only the text values change (an instant swap or a 2-3 frame decode). Its opacity is 55-80%.
- Small tick marks or a "↓" glyph at the mid-right edge [O, minor] can serve as a scroll or position indicator.

### 5.4 Depth
- 3D scenes use a tilted, high-angle camera (40-60° from horizontal) with a slow orbit and a perspective FOV of about 30-40°. [I]
- UI cards use a parallax stack: 1-2 translucent back-cards in the field color (+10% lightness, 40-60% opacity), offset and rotated ±3-6°, behind a solid front card with a soft shadow (y-offset of about 2% of the height, 40-60 px blur at 1080p, 25-35% opacity). [O]
- 2D scenes are flat. Depth comes only from blur, glow, and scale.

---

## 6. Structure, timing and rhythm

### 6.1 Clock
- **Reference tempo: about 150-155 BPM** (one beat is about 0.39-0.40 s, one 4-beat bar is about 1.55-1.6 s). [I, from audio peaks spaced about 0.4 s and scene changes spaced about 1.6 s]
- At 30 fps, 1 beat is about 12 frames and 1 bar is about 48 frames. At 60 fps, 1 beat is about 24 frames and 1 bar is about 96 frames.
- If the user gives a track, derive the beat and bar frames from its BPM, and keep the rule **1 showcase scene = 1 bar**. If the BPM is below 110, use 1 scene = 2 bars at half density. If it is above 170, use 1 scene = 1 bar but with fewer sub-events.

### 6.2 Macro structure template [O]
1. **Boot (about 1.5 s, 1 bar):** the darkest field (navy), a faint dot grid, a single orange spark or dot, a mono terminal line typing, and an orange line that stretches across the frame. It builds tension with low energy.
2. **Title (about 1.5 s, 1 bar):** the flash resolves into the warm field, the impact word plus accent plus overline reveal, a hold, and then the exit through the period or dot. **The music drop lands on this exit** (the reference has a silence dip at about 2.9 s and the drop at about 3.0 s).
3. **Showcase scenes ×N (about 1.6 s each, 1 bar each):** each one is a different discipline or message, each with a category tag and the scene counter incremented. The reference used 6 (3D, type, data, particles, UI, shape).
4. **End card (about 1.5 s or more):** the darkest field again, the dot returns, the wordmark is written by the dot, the accent, a hairline, the mono tagline decodes, the credit line appears, and the final hold is still (the only allowed fully static hold, of at least 0.5 s).

The total is about (N + 3) bars. The reference was 9 bars and 14.4 s.

### 6.3 Inside a showcase scene (1 bar = 4 beats)
- **Beat 1 (downbeat):** the entrance completes. It is the tail of the previous transition plus a 6-10 frame snap.
- **Beats 2-3:** the hold with micro-motion. Secondary elements stagger in (labels, the accent, chart bars) at 2-3 frames per item.
- **Late beat 4:** the exit device starts 4-8 frames before the next downbeat, so the cut point lands on the downbeat.
- **Kinetic-type variant:** one word per beat (EVERY, SINGLE, FRAME, on purpose.), so 4 words equal 1 bar, and each word gets its own field and treatment.

### 6.4 Duration table (at 30 fps; double for 60 fps)
- Primary entrance (snap): **6-10 f** (200-330 ms).
- Letter stagger: **1-2 f** per letter.
- Secondary element stagger: **2-3 f** per item.
- Whip or chromatic entrance: **3-5 f**.
- Scene transition (shape device): **4-8 f** for the main change (the device may begin growing 2-6 f earlier).
- Flash peak: **2-3 f** at full white, then a **6-10 f** decay into the next field.
- Counter or progress fill: **24-30 f** (expo-out).
- Line or stroke draw-on: **6-10 f**.
- Minimum hold before an exit: **10 f**. Typical hold: **20-30 f**.
- Final hold: **≥ 15 f**, fully settled.

---

## 7. Motion language

### 7.1 Easing (CORE)
- **Snap-in (default for entrances):** expo-out, `cubic-bezier(0.16, 1, 0.3, 1)`. About 80% of the distance is covered in the first 30% of the duration. [I, from frame spacing: letters are mostly in place after 3-4 frames]
- **Hard accelerate (exits and the start of transition devices):** expo-in, `cubic-bezier(0.7, 0, 0.84, 0)`. Devices such as the growing ink dot accelerate to fill the frame.
- **Camera and slow drift:** a gentle in-out, `cubic-bezier(0.45, 0, 0.55, 1)`, for orbits, parallax, and repeat-field scrolls (or linear for scrolls).
- **Data counters and progress:** expo-out, with digits flickering until about 85%.
- **Springs:** avoid visible overshoot. If you use a spring (for example Remotion `spring()`), make it critically or over-damped (`damping ≥ 200`, `mass 0.5-1`, `stiffness 100-200`, `overshootClamping: true`). [O: no bounce or overshoot was visible in any element]

### 7.2 Direction
- Type reveals travel **left to right** (the reading direction). Whip-ins come from the right or left, consistently within one sequence. [O]
- Transition devices grow **from their own location** (a period at the right end of the title grows rightward and outward), so the direction is motivated by the shape's position. [O]
- Particle fields move in curling flow and then converge to the center. Exits explode **radially outward**. [O]
- The camera tilts or orbits slowly. There is no handheld shake. [O]

### 7.3 Motion blur (CORE)
- Heavy, directional motion blur on every fast move. The look is a shutter angle of **270-360°** (smears as long as the per-frame displacement). [O: visible smears on letters, words, the UI card, and wipes]
- Slow moves (≤ 1% of the frame per frame) get no visible blur.

### 7.4 Holds
- During holds, something keeps moving: the 3D wave propagates, particles flow, the repeat field scrolls, counters settle, a cursor moves and clicks, blobs orbit, the timecode runs. [O]
- A slow push or scale on the hero (100% to 102-104% over the hold) is allowed [I]. Avoid big movements during a hold.

---

## 8. Transition grammar (CORE: a shape in the outgoing scene becomes the next scene)

Pick a device per scene change. Don't repeat the same device twice in a row. Each device below is **[O]** in the reference, with its approximate timestamp.

1. **Line → flash** (1.3-1.6 s): a thin glowing orange line spans the frame, thickens, and blooms vertically into a white-hot full-frame flash. The flash cools into the next field color while the next hero reveals.
2. **Punctuation → ink mask** (2.9-3.15 s): the period or dot of the title word grows as a soft-edged black circle (edge feather of about 3-5% of the diameter), accelerating to cover the frame, and the next scene emerges from the dark.
3. **Whip with chromatic split** (4.85-4.95 s): the next word arrives with a horizontal blur and RGB split over 3-4 f. It acts as a hard cut disguised by motion.
4. **Field swap behind the word** (5.3-5.4 s): the next word appears small or blurred inside the current word and scales up while the field changes.
5. **Glitch-slice** (5.75-5.85 s): horizontal slices displace and resolve.
6. **Hue sweep** (6.05-6.1 s): the entire field hue rotates over 2-3 f to the next color.
7. **Diagonal slab wipe** (6.3-6.45 s): 2-3 parallel diagonal bars (about -15° to -25°) sweep across in staggered layers (orange and white), revealing the next field.
8. **Column or pixel-sort dissolve** (8.0-8.2 s): the frame breaks into vertical strips of varying width that slide or stretch vertically to reveal black.
9. **Radial burst** (9.7-9.85 s): a ring or particle structure explodes outward into streaks, and a concentric disc in the next field's color expands from the center.
10. **Collapse to a glowing shape** (11.25-11.4 s): a UI card shrinks into a dark rounded square with a colored bloom ring, which becomes the next scene's central object (a black blob on orange).
11. **Portal rings** (12.8-13.1 s): the central dot grows into concentric rings (alternating dark tones) that zoom toward the camera and reveal the next field through the center.
12. **Dot-led reveal** (13.3-13.9 s, end card): the glowing dot travels, and the wordmark is revealed in its wake.

The rule of motivation: before choosing a device, name the object in the outgoing scene that will perform it. If there is no suitable object, add one (a dot, a line, a ring) as part of the scene's design a few beats earlier, so that it feels planted.

---

## 9. Aspect-ratio adaptation

Keep the identity by preserving the **ratios between voices**, the **HUD at the corners**, and the **beat structure**. Re-flow the layout. Don't just scale.

### 9.1 16:9 (master)
As specified above.

### 9.2 9:16 (vertical, native)
- HUD margins are 5-6% of the width. The HUD stays in the four corners. Move the bottom labels above the platform UI safe zone (keep the bottom 12-15% and the top 8-10% free of essential content on social platforms).
- The hero impact word spans 80-90% of the width. If a word is too long, scale it down rather than breaking it. Two-word messages stack vertically, one word per line, with tight leading (0.85-0.9).
- The accent serif stays right-aligned under the hero.
- Split dashboards become a vertical stack: the KPI on top, the chart in the middle, the donut at the bottom-left with a stat to its right.
- Repeat-fields use more rows (8-12) with fewer repetitions per row.
- 3D and particle objects scale to 90% of the width and center slightly above the middle.
- Horizontal devices (line → flash, slab wipes) can rotate to vertical. Keep the direction consistent across the piece.

### 9.3 1:1 and 4:5
- The hero spans 75-85% of the width. Dashboards use a 2×2 arrangement. The HUD margins are 4.5-5%.

### 9.4 Ultra-wide (21:9) or banners
- The hero spans 45-55% of the width. Add a mono annotation block to one side to balance the negative space.

### 9.5 Presentation wrapper (OPTIONAL, ask in intake) [O]
The reference delivered the 16:9 reel *inside* a 9:16 social frame:
- A laptop in a dark room, seen from a low 3/4 angle (the screen rotated about 15-20° in Y and tilted back slightly), occupying about 75% of the width in the upper half.
- **A mirrored floor reflection:** a vertical flip of the entire upper composite (including the caption), at about 35-50% opacity, with a slight blur and a fade toward the bottom. The caption also appears mirrored in the reflection, which shows it is a composited mirror rather than a physical reflection.
- A caption: a bold sans in sentence case, white, rotated to follow the screen's perspective, overlapping the top bezel, with a brand mark at its left.
- The screen content itself remains the style. The wrapper is packaging.

---

## 10. Implementation recipes (adapt to the available tool)

Create a tokens or constants module first:
```ts
// tokens.ts: single source of truth
export const FPS = 30;
export const BPM = 150;                       // from the track if provided
export const BEAT = Math.round((60 / BPM) * FPS); // ≈12 f
export const BAR = BEAT * 4;                  // ≈48 f
export const C = {
  navy: '#0D1628', black: '#08090C', orange: '#FF5414', paper: '#EEF0EC',
  blue: '#1F3BFF', cyan: '#3FD2FF', ink: '#121218', white: '#F7F7F4',
  cream: '#F6E3C4', chartBlue: '#2B3BD9',
};
export const EASE = {
  snap: [0.16, 1, 0.3, 1], accel: [0.7, 0, 0.84, 0], drift: [0.45, 0, 0.55, 1],
} as const;
export const T = { snap: 8, letterStagger: 1.5, itemStagger: 2.5, whip: 4, transition: 6, flashPeak: 2, flashDecay: 8, counter: 28, minHold: 10 };
export const FONTS = { impact: 'Archivo Black', accent: 'Instrument Serif', mono: 'JetBrains Mono', ui: 'Inter' };
```

### 10.1 Remotion + React (+ three.js) [O: the reference credits "REACT · REMOTION · THREE.JS - 0 KEYFRAMES DRAGGED"]
- Make one `<Sequence>` per scene, with `from = barIndex * BAR`, and use `<Series>` for showcase scenes. Make transitions their own short sequences that overlap the scene boundaries by 4-8 f.
- Easing: `interpolate(frame, [0, T.snap], [from, to], { easing: Easing.bezier(...EASE.snap), extrapolateRight: 'clamp' })`.
- Motion blur: wrap fast elements in `<CameraMotionBlur shutterAngle={300} samples={8}>` from `@remotion/motion-blur`, or use `<Trail>` for smears. For three.js, render with accumulated sub-frames or a velocity-based blur pass.
- 3D mograph: `@remotion/three` with an instanced mesh of boxes (for example 24×24). Height = `sin(dist * k - t * ω) * envelope(t)`. Color comes from the height through the iridescent gradient. A glass sphere uses `MeshPhysicalMaterial` with transmission, plus thin orbit rings as `TorusGeometry` lines.
- Particles: a flow field (curl noise) drawn as short line segments with additive blending, morphing into a phyllotaxis ring (`θ = i × 137.508°`, `r = c√i`, `n ≈ 2,400`). Draw these on `<canvas>` or with three `Points`, always deterministically from `frame`, never from `Math.random()` without a seed.
- Metaballs and liquid: an SVG `feGaussianBlur` plus `feColorMatrix` alpha threshold (the gooey filter), or an SDF shader. The outline uses the superformula `r(θ)` with `m` animated (for example 0 → 5.98).
- Ink-dot or portal transitions: a circle `clipPath` or mask with radius = `interpolate(..., EASE.accel)` up to the frame diagonal, with a feathered edge done by a blur on the mask.
- Glitch slices: N absolutely positioned copies, each with `clip-path: inset()` for one strip and its own `translateX` driven by seeded noise.
- Chromatic split: three copies with `mix-blend-mode: screen` in pure R, G, and B, offset ±x and collapsing to 0 over the whip.
- Counters: `Math.round(interpolate(...))` for the value, and render the rolling digits as vertical strips with motion blur.
- HUD: a top-level component outside the scene sequences, with the timecode computed from `frame`, the scene number from the active sequence, and visibility only between the boot end and the end-card start.

### 10.2 After Effects
- Comp at 1920×1080 at 30 or 60 fps. Enable motion blur, with a shutter angle of 270-360° and a phase of -180°.
- Easing: in the graph editor, 0% influence in and 85-95% influence out on entrances (expo-out). Alternatively, use Flow presets with the curves above.
- Letter reveal: a Text Animator (Position, Opacity) with a Range Selector by character, an ease-high setting, and an offset of 1-2 f per character via the Wiggly or Expression selector, with each character masked using track mattes.
- Transitions: shape layers parented to the outgoing object (the period, line, or card), with Scale or Path driven by expo-in keys. The flash uses a solid plus Glow, and a light-leak overlay from an orange radial gradient.
- 3D: Cinema 4D (MoGraph Cloner + Shader or Formula Effector) or Element 3D. Particles: Trapcode Particular or Form. Liquid: a gooey effect from Blur + Levels (alpha).
- HUD: a precomp on top, with the timecode from the Timecode effect or a `timeToTimecode()` expression.

### 10.3 Web (CSS / GSAP / Canvas / WebGL)
- GSAP eases: `expo.out` (snap), `expo.in` (accel), `sine.inOut` (drift). Use a timeline with labels at beat positions (`BEAT_SEC = 60/BPM`).
- Motion blur: an SVG `feGaussianBlur` with a directional `stdDeviation="x 0"` whose value is proportional to the velocity, or duplicated ghost copies at decreasing opacity.
- Use deterministic rendering if the output is exported to video (capture frame by frame).

### 10.4 No-code or spec-only output
Deliver a beat sheet (§6), per-scene style cards (field, voices, hero, micro-motion, exit device, HUD tag), and a token table, so that any animator can execute it.

---

## 11. Effects specification

1. **Motion blur:** CORE (see §7.3).
2. **Glow and bloom:** on orange signal elements and light sources only (the dot, the line, hot type, rings). Radius 0.5-2% of the height, intensity moderate. The end-card dot has a soft halo about 3× its diameter. [O]
3. **Chromatic aberration:** only during fast moves and transitions (2-6 f), never on a held frame. [O]
4. **Radial field gradients and vignettes:** subtle and always present. [O]
5. **Flash or light-leak:** used once or twice per piece as a high-energy transition. [O]
6. **Glitch and slice:** short (≤ 5 f) and structured (horizontal bands). It is not a constant VHS noise. [O]
7. **3D materials:** a matte or satin cube field with an iridescent gradient, plus a single glass or chrome hero sphere. Soft studio lighting with no hard shadows. [O]
8. **Particles:** thin white streaks with sparse orange and blue accents, using additive blending, on black. [O]
9. **Soft card shadow:** only on UI cards. [O]
10. **Film grain or noise:** [U] cannot be confirmed (compression). Optional: very subtle grain (2-3% luminance) only on gradient fields to avoid banding.
11. **Lens or DOF:** [U] the 3D scenes may use a slight DOF falloff. It is optional.
Things that are absent from the reference: drop shadows on type, bevels or emboss, lens flares (apart from the flash), particle sparkles or confetti, and long gradients on type (except the single hot-fill word).

---

## 12. AVOID (these break the style)

- Crossfades or dissolves between scenes. Plain hard cuts without a motion device. Slide-in or push transitions that aren't motivated by an object in the scene.
- Bouncy, elastic, or overshooting springs. Back-easing "pop" scale-ins. Wobble.
- Slow entrances (> 15 f at 30 fps) for hero elements. Linear easing on entrances.
- Sentences in the impact voice. Paragraphs on screen. More than one impact word per beat.
- Light or regular-weight display type. Script fonts. A fourth decorative type family.
- An uppercase serif accent, or a non-italic accent.
- Orange used as text body color, as a large type color on paper or navy (except the tagline and the KPI unit), or more than one signal object per scene.
- Pure black or pure white fields. Rainbow or linear multi-stop gradients on fields. Neon glow on everything.
- Two adjacent scenes on the same base field.
- A fully static frame longer than about 0.5 s before the end card.
- Removing the HUD on showcase scenes, or animating the HUD around (it must be stable).
- Generic template elements: lower-third bars, light streak stock overlays, lens flares, 3D extruded logos, glossy plastic text.
- Randomness that changes between renders (unseeded).
- Copying the reference's content (names, words, stats, logos, caption).
- Applying the default orange, navy, paper, and blue palette or the default fonts to a brand that has its own identity. Inventing brand colors, redrawing a logo, faking a product UI, or showing unsourced claims (RESEARCH.md).

---

## 13. QC checklist (score every item; all must pass)

**Intake**
- [ ] The aspect ratio, references or design kit, goal, duration and FPS, audio and BPM, assets, tool, wrapper, and language were asked and answered (or the defaults were confirmed).
- [ ] The CORE vs PROJECT decisions are written down.

**Project identity (RESEARCH.md §9)**
- [ ] Online research was done for this project, and `PROJECT_BRIEF.md` exists with sources and [V]/[S] tags.
- [ ] Every brand color, font, and logo in the render traces to the brief. The logo is the official, unmodified file.
- [ ] The UI and imagery reflect the real product or subject. Claims and numbers are sourced or labelled as sample data.
- [ ] The default palette and fonts are used only if the brief says "no external identity" or the user asked for them.

**Rhythm**
- [ ] The BPM is set, and BEAT and BAR are computed in frames.
- [ ] Each showcase scene lasts 1 bar (±2 f). Every hard visual change lands on a beat (±1 f).
- [ ] Kinetic type changes one word per beat.
- [ ] The macro structure is boot, title, N showcase scenes, end card, and the drop (or the biggest moment) lands on the title exit.

**Motion**
- [ ] All primary entrances are expo-out at 6-10 f (30 fps), with no overshoot.
- [ ] Fast moves have visible directional motion blur.
- [ ] Every hold has micro-motion, and no static frame is longer than 15 f except the end.
- [ ] Letter stagger is 1-2 f, and secondary stagger is 2-3 f.

**Transitions**
- [ ] Each scene change is performed by a shape that exists in the outgoing scene (the device is named in the beat sheet).
- [ ] No device repeats twice in a row. There are no crossfades.
- [ ] The dot motif appears at the boot, at least once mid-piece, and on the end card.

**Typography**
- [ ] Only three voices are used, in their correct roles: impact (heavy caps, tight tracking), accent (lowercase serif italic, right-offset), and technical (tracked mono caps).
- [ ] The scale contrast is about 1 : 0.4 : 0.08. The hero cap height is 18-22% of the frame height (16:9).
- [ ] RTL rules are applied if the text is Hebrew or Arabic.

**Color**
- [ ] The four base fields rotate, and adjacent scenes differ.
- [ ] There is one signal object per scene, in the signal color (the brand's signal role, per the brief).
- [ ] No pure #000 or #FFF fields. The gradients are soft and radial.
- [ ] Contrast is ≥ 4.5:1 for small mono text and ≥ 3:1 for large type.

**Composition**
- [ ] The HUD has four corners, correct margins, a correct scene counter, a running timecode, and is absent on the boot and end cards.
- [ ] Layouts are re-flowed (not just scaled) for the target aspect ratio, and the platform safe zones are respected.

**Technical**
- [ ] All tokens live in one file. Randomness is seeded and deterministic.
- [ ] Stills at each scene midpoint and each transition midpoint were reviewed against this list, and any failures were fixed.

---

## 14. Examples

### 14.1 Correct applications
- **SaaS product launch, 16:9, 15 s, 150 BPM.** The boot shows a navy field, a dot grid, an orange dot, and `acme / launch - 2027` typing. The line flashes to orange: "ACME." in the impact voice with "now with autopilot" in the accent voice. The period grows into an ink mask, revealing a black 3D cube wave forming the product icon. The next word sequence is "SHIP / FASTER / THAN / ever." with one word per beat, each with its own field and treatment. A diagonal slab wipe leads into a paper dashboard (+48% in the impact voice, an orange %, and a bar chart whose last bar is orange). A column dissolve leads into a blue UI card demo where the cursor toggles an orange switch. The card collapses into a glowing square, which becomes a dot. The portal opens to navy: the dot writes "Acme", the accent reads "autopilot", and the mono tagline reads `BUILT FOR TEAMS THAT SHIP.` Why it is right: the beats are locked, each transition is motivated by an object, the three voices are used, the fields rotate, and the dot threads through the piece.
- **9:16 social teaser in Hebrew.** The same grammar is used with right-to-left reveals, Heebo Black impact words stacked one per line at 85% of the width, a Frank Ruhl Libre accent line, a mirrored HUD, and bottom labels lifted above the platform UI zone.
- **A real brand (researched).** For example, a promo for a startup whose official site defines a violet primary and a near-black UI. The research brief records the site CSS variables and the press-kit logo. Violet fills the signal and saturated-field roles, the brand's near-black is the dark field, and its off-white is the light field. The brand's sans fills the impact role (heavy weight). The official SVG logo is written by the dot on the end card, and the product UI scene mirrors real screenshots. The motion, beats, transitions, HUD, and type roles are pure Motion DNA.
- **The brand kit has a green signal color.** Green replaces orange in every signal role, and the warm field becomes the brand green. The navy, paper, and blue fields are re-tinted to brand neutrals. The motion, type roles, HUD, and transitions are unchanged.

### 14.2 Incorrect applications (and the fix)
- *A video for a well-known brand built in the default orange and navy, with a hand-typed imitation of its logo.* **Fix:** research the brand first (RESEARCH.md), fill the roles from its verified palette, and use the official logo file.
- *A "premium" slow reveal:* the title fades in over 1.5 s with an ease-in-out. **Fix:** an 8 f expo-out letter-sequential masked reveal with motion blur, then a hold.
- *A centered sentence in bold caps:* "WE MAKE TEAMS FASTER" on one line. **Fix:** split it into one impact word per beat and resolve the last word in the serif italic accent.
- *Scenes joined by crossfades or generic slide pushes.* **Fix:** plant a dot, line, or ring in each outgoing scene and use it as the device.
- *A bouncy logo pop with overshoot.* **Fix:** a critically damped snap, or a dot-led reveal.
- *Orange everywhere* (orange text, orange icons, orange bars on an orange field). **Fix:** one signal object per scene, and orange as a field only with ink or white type.
- *Two consecutive navy scenes.* **Fix:** rotate the field (for example navy, then paper or orange).
- *The HUD slides around between scenes, or is dropped on some scenes.* **Fix:** a fixed HUD layer, where only the values change.
- *The reference's words ("CLAUDE.", "motion designer", "+312%") reused in a client project.* **Fix:** these are content. Replace them with the project's content.

---

## 15. Correction log (validated, binding)

This section holds corrections confirmed by comparing a generated video against the master reference during the correction workflow. Each entry **overrides** any earlier rule it contradicts, and must be applied in all future productions. Only reusable style rules belong here, not project-specific preferences. The format is:

`YYYY-MM-DD - symptom - master evidence (timestamps) - rule change - sections edited`

- (no entries yet)

