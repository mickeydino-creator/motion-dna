# RESEARCH: mandatory brand and subject research (Motion DNA)

Every new project gets online research **before** any design decision. Motion DNA defines *how things move*. The project identity defines *what it looks like and says*. Research supplies the second.

This research never involves the master reference video (see STYLE_GUIDE §0).

---

## 1. When to research

- **Required:** at the start of every new project, even when the same brand appeared in an earlier project. Identities change, and earlier research may be stale. You may reuse an earlier brief as a starting point, but re-verify its key facts (current logo, palette, product UI) with a fresh look at the official sources.
- **Reuse within a project:** the project's `PROJECT_BRIEF.md` is the cache. Don't search again for revisions, scene edits, or re-renders unless something is missing, outdated, or contradicted.
- **User-supplied brand guidelines or assets are authoritative.** Use them, and research only the gaps (for example, a guideline without UI screenshots means researching the product UI only).
- **Don't ask the user for anything that can reasonably be found online** (brand colors, logo, fonts, product description, positioning, public facts). Ask only for private, unpublished, or preference-based material.
- **No identifiable subject** (an abstract piece, or the user's own unbranded content): record "no external identity". The default Motion DNA palette and fonts (STYLE_GUIDE §3 and §4) apply.

## 2. Identify the subject
Write one line naming it: brand or company / product / person / event / topic. A project can have several (for example, a product launch at an event). Research each one only as far as the video needs.

## 3. What to collect

**Brands and companies**
- Official colors: hex values from a brand page, press kit, design system, or the official site's CSS (custom properties, theme color, `meta name="theme-color"`, primary button colors). Record the source for every value.
- Logo: the official file (SVG preferred) from the press or brand kit or the official site, and the correct variants (light and dark, mark versus wordmark, clear space, minimum size). **Never redraw, retype, or approximate a logo.** If no official file can be obtained, don't fake it. Use the brand name in a neutral typeface and flag it as a placeholder.
- Typography: the fonts named in brand guidelines, or identifiable from the official site (CSS `font-family`, font files). Note the license. Use the font only if it can be legally obtained (Google Fonts or an open license). Otherwise pick the closest open alternative and label it as a substitute.
- Website and current visual identity: layout conventions, gradients, illustration and photo style, iconography, recurring shapes.
- Product UI: real screenshots or interface patterns from the official site, docs, or app store pages (component shapes, corner radii, colors, density). Recreate UI faithfully as *illustrative mockups* based on these patterns. Never invent features the product doesn't have.
- Tone, positioning, and audience: the tagline, the product description in the company's own words, and the target users.

**Products:** the real product, its current version, real interface and key features, and official imagery.
**People:** verified biographical facts from reliable sources, and appropriate imagery (official, press, or licensed). Make no claims that can't be verified.
**Events:** the official event identity (colors, logo, key art), dates, location, atmosphere, and the official site and social accounts.
**Topics or concepts:** accurate facts and recognizable visual cues, with sources for every number shown on screen.

## 4. Source priority
1. Official brand guidelines, press kits, or design-system pages.
2. The official website (including its CSS and assets) and official product pages and docs.
3. Official social accounts, app store listings, and official blog or newsroom posts.
4. Reliable secondary sources (reputable press, Wikipedia for basic facts). Use these for context, never as the sole source for colors or logos.
Use the most recent material. Note the date checked for each item.

## 5. Tools (adapt to the environment)
- Search: the WebSearch tool (standard mode first, extended mode for niche or very recent subjects). Fetch pages with WebFetch, or with `curl` through the configured proxy.
- Colors from the site: fetch the HTML and CSS and look for `--color-*`, `--primary`, `theme-color`, and button or link colors. Verify against a brand page if one exists.
- Logos: download the official SVG or PNG into `<project>/assets/brand/`, and record the source URL in the brief.
- If browsing is unavailable in the environment, say so. Then base the brief only on user-supplied material and clearly labelled creative suggestions.

### Practical lessons (validated on a real brand, 2026-10-23)
- **Open and view every downloaded logo before use.** File names can mislead. A brand hub's `full-color-lockup` turned out to be a campaign lockup ("SheBuilds"), not the main logo. Match each file to the hub's own label (for example "Logo - Black, for light backgrounds").
- Brand hubs built as single-page apps keep their colors, fonts, and asset lists in the JS bundle. Fetch the bundle and search for `hex`, `font-family`, and asset paths when the rendered page text is empty.
- Official sites may block automated fetches (403, Cloudflare). Fall back to the brand hub or press page, app store listings, and secondary sources, and mark the unconfirmed items [S] with a to-do to verify them in a browser.
- Check font licenses. A brand font distributed as "licensed to <company>" is not free to use. Substitute it [S] unless the user confirms a license.
- Measure contrast for each signal and field pair. If an official color fails, swap the signal for that scene instead of altering an official brand color.

## 6. Labeling: verified versus suggested
Every item in the brief is tagged:
- **[V] Verified:** found in an official or reliable source (with a URL).
- **[S] Suggested:** a creative decision or substitution made because nothing reliable was found (for example, "closest open font", "secondary color derived from the primary").
Never present [S] items as official. Never invent official colors, logos, interfaces, statistics, or claims. On-screen numbers must be sourced, or clearly labelled as illustrative or sample data.

## 7. The project brief
Before final production, write `<project>/PROJECT_BRIEF.md` from `templates/PROJECT_BRIEF.md`. Keep it concise (1-2 screens). It must contain: subject and objective, the verified identity, the palette with its sources, the logo, typography and assets, the visual direction, and **the merge plan** (how the identity fills the Motion DNA slots; see STYLE_GUIDE §3.4 and §4.5). The beat sheet and the tokens file must reference the brief's values. The tokens file carries a source comment per brand value.

## 8. Merging the identity into Motion DNA (summary; the rules are in STYLE_GUIDE §2, §3.4 and §4.5)
- **Unchanged from Motion DNA:** timing, easing, the beat lock, motion blur, contained-shape transitions, the HUD structure, the three type *roles*, the dot motif, field rotation and contrast rules, the single-signal rule, and composition.
- **From the project identity:** the actual hues of the four field roles and the signal, the fonts filling the type roles (when suitable), the logo, product UI, imagery, copy, and tone.
- If the brand's identity conflicts with a CORE rule (for example, a brand with only pastel colors makes the dark field impossible), keep the rule's *function* with the brand's materials (for example, a deep tint of the brand primary as the dark field). Record the adaptation in the brief.

## 9. Verification (before delivery)
- Every brand color, logo, and font in the render traces back to a [V] entry, or is a labelled [S] decision.
- The logo is the official file, unmodified (scaled only), with correct clear space and the right light or dark variant for its field.
- The UI mockups match the real product's patterns, and no feature is invented.
- Claims and numbers on screen are sourced or labelled as sample data.
- The Motion DNA QC (STYLE_GUIDE §13) still passes in full.
