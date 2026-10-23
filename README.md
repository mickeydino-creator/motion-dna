# motion-dna

A permanent motion graphics style captured as the Claude Skill `motion-style` ("Signal Reel"). It was extracted once from a reference reel. The reference video is not needed for future use.

```
.claude/skills/motion-style/
  SKILL.md          # activation, mandatory intake questions, workflow, quick QC
  STYLE_GUIDE.md    # full design system: color, type, composition, timing, motion, transitions, effects, recipes, AVOID list, QC checklist, examples
  ANALYSIS.md       # scene-by-scene evidence with timestamps, observed/inferred/uncertain
  reference/*.jpg   # keyframe contact sheets from the reference
dist/motion-style.zip  # the same skill, packaged for upload
```

## Install

- **Claude Code, in this repo:** nothing to install. The project skill in `.claude/skills/motion-style/` is discovered automatically.
- **Claude Code, globally (all projects):** `cp -r .claude/skills/motion-style ~/.claude/skills/`
- **Claude.ai / Claude Desktop:** Settings → Capabilities → Skills → Upload skill → `dist/motion-style.zip`.

## Use

Type `/motion-style`, or just ask for a motion piece, for example "make a 15 s launch video in my motion style". The skill always starts by asking for the aspect ratio, references or design kit, goal, duration and FPS, audio or BPM, assets, tool, wrapper, and language.
