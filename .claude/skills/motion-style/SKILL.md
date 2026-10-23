---
name: motion-style
description: Applies the user's permanent motion graphics house style, "Signal Reel", to any new animation, video, reel, promo, title sequence, product or UI animation, or motion design task. The style uses hard-snapping kinetic typography, a signal-orange, ink-navy, paper and electric-blue palette, technical HUD framing, one scene per musical bar, and a recurring "dot" motif that drives transitions. Use it whenever the user asks for motion graphics, an animated video, a Remotion, After Effects or three.js composition, or anything "in my style" or "in the motion style", even if they don't name the skill. Always run the intake questions first (aspect ratio, references and design kit, and so on) before producing anything.
---

# motion-style: "Signal Reel" house style

The design system here was extracted once, frame by frame, from the user's reference reel. **The reference video is never needed again.** Everything required lives in this folder:

- `STYLE_GUIDE.md` is the permanent design system: rules, values, timing, typography, color, transitions, effects, implementation recipes, correct and incorrect examples, and the full QC checklist. **Read it in full before making any creative decision.**
- `ANALYSIS.md` holds the evidence: a scene-by-scene breakdown with timestamps, observed versus inferred facts, and uncertainties. Read it when a rule's intent is unclear or when you need a concrete precedent ("how did the reference handle a data scene?").
- `reference/*.jpg` are keyframe contact sheets taken from the reference, with timestamps. Look at them, using an image-reading tool, when you need visual grounding for a rule. They show the style, not content to copy.

**Priority rule:** this design system overrides generic motion graphics conventions and your own defaults. If a common practice (soft fades, bouncy springs, centered-everything templates, stock gradients, slow ease-in-out) conflicts with `STYLE_GUIDE.md`, the guide wins. If the user's explicit instruction or their design kit conflicts with the guide, the user wins. Say so, and keep every other core rule intact.

## Style in one paragraph

The style is a fast, confident, engineered-feeling reel. Each scene lasts one musical bar (about 1.6 s at about 150 BPM), and every hard change lands on a beat. Elements **snap in** with an exponential ease-out (6-10 frames at 30 fps) and heavy directional motion blur, and sometimes with a chromatic RGB split. There is no bounce and no lazy fades. Then they **hold with living micro-motion**. Scenes never simply cut or crossfade. **A shape inside the current scene becomes the transition into the next one**: a line flares into a flash, a period grows into an ink mask, rings explode, a card collapses into a glowing square, a dot opens into a portal. Type mixes three voices: a **heavy uppercase grotesk** for impact words, a **lowercase high-contrast serif italic** for the human accent, and a **small, widely tracked uppercase mono** for technical HUD labels. The palette rotates between four base fields (**ink navy, signal orange, paper off-white, electric blue**), and adjacent scenes always contrast. Orange is the signal color: dots, the cursor, the "%" sign, the last bar of a chart, toggles, progress. A persistent **HUD frame** (corner brackets, project label, scene counter, category tag, running timecode) makes the piece feel like a precise instrument. A single **dot** threads through the whole piece as the connecting motif.

## Workflow (follow in order)

### 1. Intake: ALWAYS ask first, every time the skill is used
Before any design or code, ask the user these questions in one compact message, in the user's language. Don't skip them even if the request looks complete. Only skip a question when the user has already answered it explicitly in the current request. Offer the default in parentheses so they can just confirm.

1. **Aspect ratio and resolution:** 16:9, 9:16, 1:1, 4:5, or other? (default 16:9 at 1920×1080)
2. **References or design kit:** is there a brand book, design kit, logo, fonts, color palette, or additional references for this project? If so, ask them to share it. The kit replaces the *project-specific* slots (fonts, brand colors, logo). It does not replace the core motion language.
3. **Goal and message:** what is the piece for (launch, showreel, product demo, social ad, explainer, title card)? What are the key words or lines that must appear?
4. **Duration and FPS:** (default 12-20 s at 30 fps, or 60 fps if the project asks for it)
5. **Audio:** is there a music track or BPM? (default: design to 150 BPM, 1 scene = 1 bar)
6. **Assets:** screenshots, product UI, footage, data or numbers to visualize?
7. **Tool and output:** Remotion/React, After Effects, three.js, CSS/GSAP, Lottie, a storyboard or spec only, or whatever is available? (default: Remotion + three.js if code is possible)
8. **Presentation wrapper:** should the final piece be shown inside a device mockup with a mirrored floor reflection and a social caption, as in the reference, or delivered full-frame? (default: full-frame)
9. **Language and direction:** what language is the on-screen text in? (Hebrew or Arabic means RTL; see the RTL rules in STYLE_GUIDE §4.6.)

Wait for the answers. If the user says "just go" or "use defaults", proceed with the defaults and list them in one line.

### 2. Load the system
Read `STYLE_GUIDE.md` fully. If a kit was supplied, map it onto the token slots in STYLE_GUIDE §3.4 and §4.5 ("brand-swappable slots") and write down which slots changed.

### 3. Classify every decision as CORE or PROJECT
Write a short brief that separates the two:
- **CORE (required by the style):** motion grammar, easing and timing, beat-locked scene lengths, contained-shape transitions, the three-voice type system and its roles, the HUD frame, the dot motif, base-field rotation, and orange as the signal color.
- **PROJECT (specific to this piece):** the words, brand name, logo, data, scene subjects, exact fonts and colors from the kit, the number of scenes, aspect ratio, and the wrapper.

### 4. Beat sheet
Build a timeline table: scene, bar number, start and end frame, base field, hero element, micro-motion during the hold, and the **exit device that becomes the next scene's entrance**. Use the structure in STYLE_GUIDE §6 (boot, title, N showcase scenes, end card). Check the field rotation (no two adjacent scenes on the same base) and check that the dot motif appears at least at the boot, at one mid-piece transition, and at the end card.

### 5. Layout per aspect ratio
Apply STYLE_GUIDE §5 (composition) and §9 (aspect-ratio adaptation): safe margins, HUD placement, hero scale, and how multi-element scenes re-stack in vertical formats.

### 6. Implement
Use the recipes in STYLE_GUIDE §10 for the tool you are using. Put all values in one token or constants file (colors, fonts, easing curves, frame durations, BPM), so the style can be audited and re-themed. Motion blur is not optional on fast moves. Use the tool's native motion blur, or a sub-frame accumulation or trail fallback.

### 7. Self-inspect and correct
Render stills at every scene's midpoint and at every transition's midpoint (or, if you can't render, walk through the code frame by frame). Score them against the **QC checklist** at the end of STYLE_GUIDE (§13). Fix every failed item and re-check. Don't report "done" with open failures. If something can't be fixed in this environment, say exactly what and why.

### 8. Deliver
Give the output, the beat sheet, the CORE versus PROJECT summary, which kit slots were applied, and any deliberate deviation from the guide with its reason.

## Quick QC (the full list is in STYLE_GUIDE §13)
- [ ] Intake questions were asked and answered (or defaults confirmed).
- [ ] Every scene lasts about one bar, and every hard change sits on a beat.
- [ ] Entrances snap with expo-out in 6-10 frames, with visible motion blur. No bounce, no slow fades.
- [ ] Every transition is made from a shape inside the outgoing scene. No plain cuts or crossfades between scenes.
- [ ] Three type voices only (heavy grotesk caps, serif italic lowercase, tracked mono caps), each in its role.
- [ ] The base field rotates, and adjacent scenes contrast. Orange is used only as a signal, never as a body or text color on paper or navy.
- [ ] The HUD frame is present on showcase scenes and absent on boot and end cards.
- [ ] The dot motif opens the piece, recurs, and closes it.
- [ ] Holds are alive (wave, particles, counters, cursor), and no frame is fully static for more than about 0.5 s except the final hold.
- [ ] Nothing from the AVOID list (STYLE_GUIDE §12) is present.
- [ ] CORE and PROJECT decisions are reported separately.
