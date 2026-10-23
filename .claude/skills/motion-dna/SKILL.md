---
name: motion-dna
description: Motion DNA is the user's permanent motion graphics house style ("Signal Reel"). Apply it to any new animation, video, reel, promo, title sequence, explainer, product or UI animation, or motion design task. The style uses hard-snapping kinetic typography, a signal-orange, ink-navy, paper and electric-blue palette, technical HUD framing, one scene per musical bar, and a recurring "dot" motif that drives transitions. Use it whenever the user asks for motion graphics, an animated video, a Remotion, After Effects or three.js composition, or anything "in my style", even without naming the skill. Also use it when the user says a generated video doesn't look right, doesn't match the style or reference, or needs more style accuracy (including in Hebrew, for example "הסרטון לא יצא טוב", "זה לא דומה לרפרנס" or "תדייק את הסטייל"). That triggers the style-correction workflow. Always run the intake questions before a new production.
---

# Motion DNA

Motion DNA is a permanent motion graphics house style (internal style name: "Signal Reel"). The invocation is `/motion-dna`.

## Files and the two kinds of video

- `STYLE_GUIDE.md` is **the default production specification.** It holds the rules, values, timing, typography, color, transitions, effects, recipes, examples, the QC checklist (§13), and the correction log (§15). **Read it in full before making creative decisions.**
- `ANALYSIS.md` holds the evidence: a scene-by-scene breakdown of the master reference, with timestamps, and observed versus inferred facts.
- `references/keyframes/*.jpg` are contact sheets from the analysis. They give quick visual grounding without opening a video.
- `references/master-reference.<ext>` is the **master style reference**, the original video the user supplied to define the style. It is protected by `scripts/master_ref.sh` (read-only, checksummed). See `references/README.md`.

There are **two kinds of video. Never confuse them:**
- **A. Master style reference:** supplied only when the skill is created or when the user explicitly updates it. It is stored in `references/` and defines the design system. It is reopened **only** in Style-correction mode or Reference mode (below).
- **B. Project video:** footage the user supplies for a project, or a video this skill renders. It belongs to that project's folder (for example `<project>/out/`), is used for production and diagnosis, and **never** becomes or replaces the master. This holds even if the user attaches it again, and even if it looks like a reference. Only an explicit request such as "make this the new master reference" changes the master.

Before anything touches `references/`, identify which kind a video is. If an attached video's sha256 matches a render of the current project, it is a project video. If you can't tell whether an upload is meant to be the master, ask.

**Priority rule:** this design system overrides generic motion graphics conventions and your own defaults. The user's explicit instructions and their design kit override the guide (say so when that happens). Every other core rule stays intact.

## Style in one paragraph

The style is a fast, confident, engineered-feeling reel. Each scene lasts one musical bar (about 1.6 s at about 150 BPM), and every hard change lands on a beat. Elements **snap in** with an exponential ease-out (6-10 frames at 30 fps) and heavy directional motion blur, and sometimes with a chromatic RGB split. There is no bounce and no lazy fades. Then they **hold with living micro-motion**. Scenes never simply cut or crossfade. **A shape inside the current scene becomes the transition into the next one**: a line flares into a flash, a period grows into an ink mask, rings explode, a card collapses into a glowing square, a dot opens into a portal. Type mixes three voices: a **heavy uppercase grotesk** for impact words, a **lowercase high-contrast serif italic** for the human accent, and a **small, widely tracked uppercase mono** for technical HUD labels. The palette rotates between four base fields (**ink navy, signal orange, paper off-white, electric blue**), and adjacent scenes always contrast. Orange is the signal color. A persistent **HUD frame** (corner brackets, project label, scene counter, category tag, running timecode) makes the piece feel like a precise instrument. A single **dot** threads through the whole piece.

## Mode router (decide first, every time)

1. **Production (the default).** The user wants a new video. Use the Production workflow below. **Don't open the master reference, and don't ask the user to upload it.** The style guide is enough.
2. **Revision.** The user wants a normal change: text, footage, a scene, duration, aspect ratio, music, colors from a kit, or a "make it faster" request. Apply the change to the project with the style guide. **No master reanalysis.**
3. **Style correction.** The user says the result is wrong, inaccurate, doesn't look right, or doesn't match the style or reference, or asks for more style accuracy. For example: "The video doesn't look right", "This isn't accurate enough", "The style doesn't match", "הסרטון לא יצא טוב", "זה לא דומה לרפרנס", "תדייק את הסטייל". Use the Correction workflow below. If the complaint gives no reason, diagnose it yourself first (steps 1-3) instead of asking follow-up questions.
4. **Reference mode.** The user explicitly asks to analyze, set up, or update the master reference. Use Master setup / update below.

If a request mixes modes (for example "change the text, and it also doesn't look like the reference"), do the correction first, then the revision.

## Production workflow

### 1. Intake: always ask first, on every new production
Ask these questions in one compact message, in the user's language, with defaults in parentheses. Skip only the questions the user has already answered explicitly in the current request. Never ask for the master reference.
1. **Aspect ratio and resolution:** 16:9, 9:16, 1:1, 4:5, or other? (default 16:9 at 1920×1080)
2. **References or design kit for this project:** a brand book, logo, fonts, colors, or project references? (A kit fills only the project slots in STYLE_GUIDE §3.4 and §4.5. Project references are type-B material, not a new master.)
3. **Goal and message:** what is the piece for, and which words must appear?
4. **Duration and FPS:** (default 12-20 s at 30 fps)
5. **Audio:** a track or BPM? (default 150 BPM, 1 scene = 1 bar)
6. **Assets:** screenshots, UI, footage, data?
7. **Tool and output:** (default Remotion + React, plus three.js if 3D is needed; render an MP4 if the environment allows it)
8. **Presentation wrapper:** a device mockup with a mirrored reflection and caption, or full-frame? (default full-frame)
9. **On-screen language:** (Hebrew or Arabic means RTL; see STYLE_GUIDE §4.6)

Wait for the answers. If the user says "just go" or "use defaults", proceed with the defaults and list them in one line.

### 2. Load the system
Read `STYLE_GUIDE.md` fully, including §15, the correction log. Its entries are binding. Map any kit onto the brand-swappable slots and note which slots changed.

### 3. CORE vs PROJECT brief
- **CORE:** motion grammar, easing and timing, beat-locked scenes, contained-shape transitions, the three type voices, the HUD, the dot motif, field rotation, and orange as the signal.
- **PROJECT:** copy, brand, logo, data, scene subjects, kit fonts and colors, number of scenes, aspect ratio, wrapper, and footage.

### 4. Beat sheet
For each scene, list the bar, start and end frame, field, hero element, hold micro-motion, and **exit device**. Follow the structure in STYLE_GUIDE §6. Check the field rotation and the dot motif (it must appear at the boot, mid-piece, and on the end card).

### 5. Layout per aspect ratio
Follow STYLE_GUIDE §5 and §9.

### 6. Implement
Use STYLE_GUIDE §10. Put all values in one tokens file, and use seeded, deterministic randomness. Motion blur on fast moves is mandatory. Keep all project files and renders in the project folder, never in the skill's `references/`.

### 7. Self-inspect and correct
Render stills at every scene midpoint and every transition midpoint (`bash scripts/master_ref.sh inspect <render> <dir>` gives a contact sheet of a project render). Score them against STYLE_GUIDE §13 and fix every failure before delivering. This step uses the guide, not the master reference.

### 8. Deliver
Give the output, the beat sheet, the CORE versus PROJECT summary, the kit slots that were applied, and any deliberate deviations with their reasons.

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
- [ ] Each scene lasts about one bar, and hard changes land on beats.
- [ ] Snaps are expo-out at 6-10 f, with motion blur. No bounce, no slow fades.
- [ ] Every transition is made from a shape in the outgoing scene. No crossfades.
- [ ] Three type voices, each in its role.
- [ ] The fields rotate, and there is one orange signal per scene.
- [ ] The HUD is on showcase scenes only, and the dot motif opens, recurs, and closes the piece.
- [ ] Holds are alive, and nothing from the AVOID list (§12) is present.
- [ ] Project videos stayed in the project folder, and `references/` is unchanged.
