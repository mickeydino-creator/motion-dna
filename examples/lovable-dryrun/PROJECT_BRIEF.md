# PROJECT BRIEF: Lovable promo (dry run of the Motion DNA research step)
Date researched: 2026-10-23 · Motion DNA: STYLE_GUIDE §15 has no entries yet

This brief verifies the research workflow (SKILL.md steps 1-4). No video was produced.

## 1. Subject and objective
- Subject: Lovable (company and product: an AI app and website builder).
- Objective (example): a 15 s product promo for social and the web.
- Format (example defaults): 16:9 at 1920×1080, 30 fps, English, 150 BPM, Remotion.

## 2. Verified identity
- Product: turns ideas described in plain language into working apps and websites [V] App Store listing, https://apps.apple.com/EG/app/id6757471107
- Homepage headline: "Build something Lovable", with a prompt box ("Ask Lovable") as the hero [S, from secondary sources only] https://www.saasui.design/pattern/landing/lovable. lovable.dev returned 403 or a Cloudflare challenge to automated fetches, so confirm the headline before putting it on screen.
- Official brand resources: the press page links to the Brand Hub [V] https://lovable.dev/brand → https://lovablebrand.lovable.app/
- Imagery rule from the Brand Hub: no "stock talent, models, or generic office photography" [V] Brand Hub (Photos section)
- Voice guide exists: `/__l5e/assets-v1/53e83640-1944-4198-961f-d3d2a8a729da/lovable-voice-guide.pdf` on the Brand Hub [V]. Read it before writing the final copy.

## 3. Palette (source: Brand Hub, Colors & Gradients data in https://lovablebrand.lovable.app/assets/index-CFp4AYJI.js)
- Accents [V]: Light Blue `#4E93FF` · Blue `#4B73FF` · Violet `#BBC1FF` · Bubblegum `#FFA6F9` · Pink `#FF0178` · Red `#F7101D` · Orange `#FF6D1B` · Yellow `#FFA517`
- Neutrals [V]: Black `#1B1B1B` (60% and 30% tints) · Creme `#F7F4ED` (60% and 30% tints)
- Signature gradient [V], "Horizontal Full": blue `#4F88FF` → lavender `#B0ACFE` → pink `#FD49A8` → red `#FA1F41` → orange `#FF8F1B` (22 stops). It also comes in Warm and Cool variants. The logomark itself uses this gradient.
- **Mapping into the Motion DNA roles:**
  - field.dark = Black `#1B1B1B` [V] (replaces the default navy)
  - field.light = Creme `#F7F4ED` [V] (replaces paper)
  - field.brand = the "Horizontal Full" gradient used as a soft field [V] (replaces the orange field)
  - field.cool = Blue `#4B73FF` [V] (replaces electric blue)
  - signal = Pink `#FF0178` [V]. It is the most saturated accent, and it contrasts on Black, Creme, and Blue. Never put it on the gradient field (rule §3.5.3: type there is Black or Creme).
  - ink = Black `#1B1B1B` · white = Creme `#F7F4ED` [V]
- Contrast (measured, WCAG): Pink on Black 4.53:1 ✓ · Pink on Creme 3.46:1 ✓ · **Pink on Blue 1.06:1 ✗** → on the Blue field the signal role uses Creme `#F7F4ED` (3.68:1) [S]. Per STYLE_GUIDE §3.4 this would normally mean adjusting the field, but Blue is an official brand color, so the signal is swapped for that one scene instead.

## 4. Logo, typography, assets
- Logo [V], downloaded from the Brand Hub into `assets/brand/`: `lockup-black-DoV_IwHG.png` (light backgrounds), `lockup-creme-BmOocTKd.png` (dark backgrounds), `wordmark-black-D3nWgFdd.png`, `wordmark-creme-BGXIXqty.png`, and `lovable-logo-mark-Ccij-USX.png` (the gradient heart mark).
- Logo rules [V]: don't stretch or distort it, change its colors, add effects such as shadows or outlines, or place it on busy backgrounds. Maintain the minimum clear space, and download the latest versions from the hub.
- Caution [V, found during this research]: files named `full-color-lockup-*` and `full-color-wordmark-*` on the hub are **"SheBuilds" campaign lockups**, not the main Lovable logo. They were identified by viewing them and discarded.
- Typography [V]: "Lovable Camera Plain" (Dinamo), the primary font for all UI, headings, and body, in weights 400/500/600/700 with italics. The font package is licensed to Lovable Labs (`DINAMO_-_LovableLabsIncorporated_-_Camera_Plain_14.zip`). **Use it only if the user or the client holds a license.** Otherwise substitute [S]: impact = Inter Display Bold or ExtraBold (closest open grotesk), mono = JetBrains Mono, and accent = Instrument Serif Italic (Lovable has no serif, so the accent voice stays a Motion DNA role, used sparingly).
- Product UI: the hero is a centered prompt box on a gradient glow [S, secondary source]. Recreate it as an illustrative mockup only after viewing current screenshots on lovable.dev in a browser.

## 5. Visual direction
Warm, optimistic, and builder-focused. Creme and Black fields carry the type. The signature blue-to-orange gradient appears as the "brand field" and as the glow behind the prompt box. The heart mark plays the role of the Motion DNA dot: it opens the piece as a gradient spark and writes the lockup on the end card.

## 6. Merge plan: Motion DNA × Lovable
- **Kept (CORE):** beat-locked bars, expo-out snaps with motion blur, contained-shape transitions, the HUD (in Creme or Black mono), the three type roles, field rotation (Black → gradient → Creme → Blue …), and a single Pink signal per scene.
- **From Lovable:** all the hues above, the logo files, the gradient, product prompt-box UI patterns, and copy in Lovable's voice.
- **Adaptations:**
  - The dot motif is rendered as the heart logomark (or a gradient circle cut from it) [S].
  - The impact voice uses Camera Plain Bold when licensed, otherwise Inter Display [S].
  - The orange-field "ink type" rule is applied to the gradient field (Black type only).

## 7. Open items
- Confirm the current homepage headline and capture product screenshots in a real browser (automated fetch was blocked).
- Read the voice guide PDF before finalizing the copy.
- Confirm the Camera Plain license status with the user.
