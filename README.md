# motion-dna

**Motion DNA** is a permanent motion graphics house style ("Signal Reel"), packaged as a Claude Skill and invoked with `/motion-dna`.

```
.claude/skills/motion-dna/
  SKILL.md                    # modes (production / revision / style correction / reference), intake, workflows, QC
  STYLE_GUIDE.md              # the default production spec (§0 master reference, §13 QC, §15 correction log)
  RESEARCH.md                 # mandatory brand/subject research protocol (every new project)
  templates/PROJECT_BRIEF.md  # research brief filled before production
  ANALYSIS.md                 # evidence from the master reference, with timestamps
  references/
    README.md                 # master-reference rules
    master-reference.<ext>    # the user's original master video (added at setup, read-only, checksummed)
    keyframes/*.jpg           # contact sheets from the analysis
  scripts/master_ref.sh       # install / verify / targeted frames / inspect / compare (guards the master)
examples/claude-explainer/    # an example project (Remotion) - project videos live here, never in references/
examples/lovable-dryrun/      # dry run of the research step: real PROJECT_BRIEF + tokens for Lovable
dist/motion-dna.zip           # the same skill, packaged for upload
```

## Install
- **Claude Code, in this repo:** automatic (project skill).
- **Claude Code, globally:** `cp -r .claude/skills/motion-dna ~/.claude/skills/`
- **Claude.ai / Claude Desktop:** Settings → Capabilities → Skills → Upload skill → `dist/motion-dna.zip`. The zip includes the master reference once it has been saved.

## Use
- New video: type `/motion-dna`, or ask for a motion piece. The skill asks the intake questions, researches the brand or subject online (PROJECT_BRIEF.md), then builds with the Motion DNA motion system and the brand's verified identity.
- Style looks off: say so (for example "זה לא דומה לרפרנס"). The skill inspects the render, re-checks only the relevant parts of the master, fixes the project, and logs validated rules in STYLE_GUIDE §15.
