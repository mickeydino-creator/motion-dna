---
name: motion-dna
description: Motion DNA is the user's permanent motion graphics house style ("Signal Reel"): hard-snapping kinetic typography, beat-locked scenes, shape-driven transitions, a technical HUD and a recurring dot motif, combined with each project's researched brand identity. Use it for any new animation, video, reel, promo, explainer, title sequence, product or UI animation, or a Remotion, After Effects or three.js composition, even when the skill isn't named. Also use it when the user says a generated video looks wrong, doesn't match the style or reference, or needs more accuracy (for example "הסרטון לא יצא טוב", "זה לא דומה לרפרנס", "תדייק את הסטייל"), which triggers the style-correction workflow. Before every new production, ask the intake questions and research the featured brand or subject online (colors, logo, fonts, product UI, tone).
---

# Motion DNA

Motion DNA is a permanent motion graphics house style (internal style name: "Signal Reel"). The invocation is `/motion-dna`.

## Files and the two kinds of video

- `STYLE_GUIDE.md` is **the default production specification.** It holds the rules, values, timing, typography, color, transitions, effects, recipes, examples, the QC checklist (§13), and the correction log (§15). **Read it in full before making creative decisions.**
- `RESEARCH.md` is the **mandatory brand and subject research protocol** for every new project: what to collect, source priority, [V]/[S] labeling, and how the identity merges with Motion DNA. `templates/PROJECT_BRIEF.md` is the brief every project fills in before production.
- `ANALYSIS.md` holds the evidence: a scene-by-scene breakdown of the master reference, with timestamps, and observed versus inferred facts.
- `references/keyframes/*.jpg` are contact sheets from the analysis. They give quick visual grounding without opening a video.
- `references/master-reference.<ext>` is the **master style reference**, the original video the user supplied to define the style. It is protected by `scripts/master_ref.sh` (read-only, checksummed). See `references/README.md`.

There are **two kinds of video. Never confuse them:**
- **A. Master style reference:** supplied only when the skill is created or when the user explicitly updates it. It is stored in `references/` and defines the design system. It is reopened **only** in Style-correction mode or Reference mode (below).
- **B. Project video:** footage the user supplies for a project, or a video this skill renders. It belongs to that project's folder (for example `<project>/out/`), is used for production and diagnosis, and **never** becomes or replaces the master. This holds even if the user attaches it again, and even if it looks like a reference. Only an explicit request such as "make this the new master reference" changes the master.

Before anything touches `references/`, identify which kind a video is. If an attached video's sha256 matches a render of the current project, it is a project video. If you can't tell whether an upload is meant to be the master, ask.

**Two design systems, never confused:**
- **Motion DNA (permanent):** how things move and are structured. Timing, easing, transitions, composition, HUD, type *roles*, the dot motif, the field-rotation and single-signal rules. It comes from STYLE_GUIDE.
- **Project identity (per project):** what it looks like and says. The colors that fill the roles, fonts, logo, product UI, imagery, copy, and claims. It comes from online research and the user's kit, recorded in `PROJECT_BRIEF.md`.
The reference's orange, navy, paper, and blue palette and its default fonts are a **fallback** for projects with no external identity. They are never imposed on a brand.

**Priority rule:** this design system overrides generic motion graphics conventions and your own defaults. The user's explicit instructions and their design kit override the guide (say so when that happens). Every other core rule stays intact.

## Style in one paragraph

The style is a fast, confident, engineered-feeling reel. Each scene lasts one musical bar (about 1.6 s at about 150 BPM), and every hard change lands on a beat. Elements **snap in** with an exponential ease-out (6-10 frames at 30 fps) and heavy directional motion blur, and sometimes with a chromatic RGB split. There is no bounce and no lazy fades. Then they **hold with living micro-motion**. Scenes never simply cut or crossfade. **A shape inside the current scene becomes the transition into the next one**: a line flares into a flash, a period grows into an ink mask, rings explode, a card collapses into a glowing square, a dot opens into a portal. Type mixes three voices: a **heavy uppercase grotesk** for impact words, a **lowercase high-contrast serif italic** for the human accent, and a **small, widely tracked uppercase mono** for technical HUD labels. The palette rotates between four base-field *roles* (dark, saturated brand field, light, cool), and adjacent scenes always contrast. One accent is the signal color. The default hues are ink navy, signal orange, paper off-white, and electric blue, and they are replaced by the project's researched identity. A persistent **HUD frame** (corner brackets, project label, scene counter, category tag, running timecode) makes the piece feel like a precise instrument. A single **dot** threads through the whole piece.

## Mode router (decide first, every time)

1. **Production (the default).** The user wants a new video. Use the Production workflow below, which **always includes online research of the featured brand or subject before design**. **Don't open the master reference, and don't ask the user to upload it.** Brand research never triggers master reanalysis.
2. **Revision.** The user wants a normal change: text, footage, a scene, duration, aspect ratio, music, colors from a kit, or a "make it faster" request. Apply the change to the project with the style guide and the existing `PROJECT_BRIEF.md`. **No master reanalysis**, and no new research unless the revision introduces a new subject or the brief is missing something.
3. **Style correction.** The user says the result is wrong, inaccurate, doesn't look right, or doesn't match the style or reference, or asks for more style accuracy. For example: "The video doesn't look right", "This isn't accurate enough", "The style doesn't match", "הסרטון לא יצא טוב", "זה לא דומה לרפרנס", "תדייק את הסטייל". Use the Correction workflow below. If the complaint gives no reason, diagnose it yourself first (steps 1-3) instead of asking follow-up questions.
4. **Reference mode.** The user explicitly asks to analyze, set up, or update the master reference. Use Master setup / update below.

If a request mixes modes (for example "change the text, and it also doesn't look like the reference"), do the correction first, then the revision.

## Production workflow

Follow this order on every new project, including a brand that appeared in an earlier project. **Final production must not start before steps 1-4 are complete.**

### 1. Understand the request and identify the subject
Name the brand, company, product, person, event, or topic the video features (there may be several), the objective, and the audience. Then ask the intake questions in one compact message, in the user's language, with defaults in parentheses. Skip the questions the user has already answered explicitly. **Don't ask for anything that can be found online** (brand colors, logo, fonts, product facts), and never ask for the master reference.
1. **Aspect ratio and resolution:** (default 16:9 at 1920×1080)
2. **References or design kit:** brand guidelines, logo files, fonts, or project references? (Optional. Online research of the brand happens anyway. A supplied kit is authoritative, and only its gaps get researched. Project references are type-B material, not a new master.)
3. **Goal and message:** what is the piece for, and which words or claims must appear?
4. **Duration and FPS:** (default 12-20 s at 30 fps)
5. **Audio:** a track or BPM? (default 150 BPM, 1 scene = 1 bar)
6. **Private assets:** unpublished screenshots, footage, or data? (Public product imagery gets researched.)
7. **Tool and output:** (default Remotion + React, plus three.js if 3D is needed; render an MP4 if possible)
8. **Presentation wrapper:** a device mockup with a mirrored reflection and caption, or full-frame? (default full-frame)
9. **On-screen language:** (Hebrew or Arabic means RTL; see STYLE_GUIDE §4.6)
If the user says "just go", use the defaults and list them in one line. Research (step 2) can run while you wait for answers.

### 2. Research the brand and subject online (mandatory)
Follow `RESEARCH.md`. Use web search and fetch tools on official sources first: brand guidelines, press kit, the official site and its CSS, product pages, and docs. Collect only what this video needs: the official palette (with sources), logo files and variants, fonts, current visual identity, real product UI, brand graphic elements, tone, positioning, and audience. For people, events, and topics, collect verified facts and appropriate visuals. Tag everything [V] (verified, with URL) or [S] (suggested). If browsing is unavailable, say so and label the affected decisions [S].

### 3. Gather assets
Download official assets (logo SVG or PNG, product imagery) into `<project>/assets/brand/`, and record the source of each. Never redraw a logo or invent UI or claims. Use labelled placeholders when no official file exists.

### 4. Establish the visual direction: PROJECT_BRIEF.md
Fill `templates/PROJECT_BRIEF.md` into `<project>/PROJECT_BRIEF.md`: the subject and objective, the verified identity, the palette and its sources, the logo, typography and assets, the visual direction, and **the merge plan** (which brand values fill which Motion DNA slots, per STYLE_GUIDE §3.4 and §4.5, plus any adaptations where the brand conflicts with a CORE rule). Then:
- **CORE (Motion DNA):** motion grammar, easing and timing, beat-locked scenes, contained-shape transitions, type roles, the HUD, the dot motif, the field-rotation and single-signal rules.
- **PROJECT (identity):** palette hues, fonts, logo, UI, imagery, copy, data, scene subjects, aspect ratio, and wrapper.
The brief is the project's research cache. Reuse it for later steps and revisions, and re-research only what is missing or outdated.

### 5. Apply Motion DNA
Read `STYLE_GUIDE.md` fully, including §15, the binding correction log. Build the beat sheet: for each scene, list the bar, start and end frame, field role and its **brand hue**, hero element, hold micro-motion, and **exit device**. Follow the structure in STYLE_GUIDE §6. Check the field rotation and the dot motif. Lay out each aspect ratio per §5 and §9.

### 6. Produce
Implement per STYLE_GUIDE §10. **The tokens file takes its colors and fonts from the brief**, with a source comment on each brand value. Use seeded randomness, and motion blur on fast moves is mandatory. Keep all project files and renders in the project folder, never in the skill's `references/`.

### 7. Verify both systems
Render stills at every scene midpoint and transition midpoint (`bash scripts/master_ref.sh inspect <render> <dir>` gives a contact sheet). Check them against STYLE_GUIDE §13 (Motion DNA, including the identity section) and RESEARCH.md §9 (identity fidelity: colors, logo, UI, and claims trace to the brief). Fix every failure before delivering. This step doesn't open the master reference.

### 8. Deliver
Give the output, the PROJECT_BRIEF summary with its key sources, the beat sheet, the CORE versus PROJECT split, and any deliberate deviations with their reasons.

## Correction workflow (Style-correction mode only)

1. **Inspect the current output.** Use the actual video rendered for this project, or the one the user attached (type B). Use `scripts/master_ref.sh inspect <video> <dir>`, plus dense frames around the scenes the user mentions. List the concrete symptoms.
2. **Reanalyze the saved master, targeted.** Run `bash scripts/master_ref.sh verify`, then extract only the relevant windows: `frames <dir> <start> <end> [fps]`. Find the matching moments through ANALYSIS.md's timestamps, and use `compare <project video> <dir> <t…>` for side-by-sides. Re-examine only the aspects in question (for example, only the transitions or only the type). **Don't redo the full analysis** unless the whole style is off. If the master is not saved, say so plainly, ask the user to upload it, and meanwhile diagnose from ANALYSIS.md and the keyframes, stating that the master was unavailable.
3. **Identify the mismatch.** For each symptom, decide whether it is an *execution error* (the guide was right, but the project didn't follow it) or a *system gap* (the guide was wrong, vague, or missing a rule). Cite the master timestamps as evidence.
4. **Correct the production.** Fix the execution errors in the project. For system gaps, first update the rule in `STYLE_GUIDE.md` (and the evidence in ANALYSIS.md), then revise or re-render the project with the corrected rule. Re-run the QC in §13.
5. **Preserve the learning.** Append each validated, reusable correction to STYLE_GUIDE §15 (date, symptom, master evidence, rule change, sections edited). Don't log project-specific preferences there. Those stay in the project. Never modify or replace the master file during a correction.

## Master setup / update (Reference mode only)

- **Initial setup:** wait for the user to upload the master. Don't search for an earlier video, and don't assume one is available. When it arrives, run `bash scripts/master_ref.sh install <uploaded file>`. This keeps the original file and extension, sets it read-only, and records its sha256. If the script reports that the file **matches** the analysis source fingerprint, the existing STYLE_GUIDE already describes it. Confirm that and stop. If it does **not** match, run a full analysis (as documented in ANALYSIS.md §0) and rebuild STYLE_GUIDE and ANALYSIS from it, keeping §15.
- **Update:** only when the user explicitly asks to change the master, run `replace <file>`, which archives the old one, and then re-analyze.
- If the upload can't be read or saved, say so. Never report that a master was saved unless `master_ref.sh status` confirms it.

## Quick QC (the full list is in STYLE_GUIDE §13)
- [ ] The mode was chosen correctly. In production and revisions, the master reference was not opened.
- [ ] Intake was answered (or defaults confirmed), and the §15 corrections were applied.
- [ ] Online research was done for this project. `PROJECT_BRIEF.md` exists, and its colors, fonts, logo, and UI are actually used in the tokens and render (default palette only if there is no external identity).
- [ ] Each scene lasts about one bar, and hard changes land on beats.
- [ ] Snaps are expo-out at 6-10 f, with motion blur. No bounce, no slow fades.
- [ ] Every transition is made from a shape in the outgoing scene. No crossfades.
- [ ] Three type voices, each in its role.
- [ ] The fields rotate, and there is one signal (in the brand's signal hue) per scene.
- [ ] The HUD is on showcase scenes only, and the dot motif opens, recurs, and closes the piece.
- [ ] Holds are alive, and nothing from the AVOID list (§12) is present.
- [ ] Project videos stayed in the project folder, and `references/` is unchanged.
