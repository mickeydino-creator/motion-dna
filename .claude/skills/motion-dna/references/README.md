# Motion DNA references

## Master style reference
- **File:** `master-reference.<original extension>`, for example `master-reference.mp4`. Its checksum is in `master-reference.sha256`, and its technical metadata is in `master-reference.probe.json`.
- **Status:** check it with `bash scripts/master_ref.sh status`. If no `master-reference.*` video file is present, the master has **not been saved yet**, and the skill is waiting for the user's upload. Never claim otherwise.
- **What it is:** the one video the user designated to define the Motion DNA style. See "Current master" below for which video it is and how it relates to `STYLE_GUIDE.md`.
- **When to open it:** only in Style-correction mode (the user says the output doesn't look right or doesn't match the style, or asks for more accuracy) or in Reference mode (the user explicitly asks to analyze or update the reference). Never open it during normal production or ordinary revisions.
- **Protection:** the file is read-only (`chmod 444`). `install` refuses to run when a master already exists. `replace` is allowed only on an explicit user request, and it archives the previous master in `archive/` instead of deleting it.
- **Never store here:** project footage, generated videos, or revision renders. Those belong to the project's own folder (for example `examples/<project>/out/`), never to `references/`.

## Current master
`master-reference.mp4` is the Claude explainer. The user designated it as the master on 2026-10-23 (sha256 `08719522…80d8d`, 1920×1080, 30 fps, 15 s). See STYLE_GUIDE §0 and ANALYSIS §7.

## Keyframes (`keyframes/*.jpg`)
These are contact sheets extracted from the **original** analysis source, a different video that is not stored here (see `ANALYSIS.md` §0 and §6). They give quick visual grounding without opening the video. They are **not** a substitute for the master video.
