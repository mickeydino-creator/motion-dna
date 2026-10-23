#!/usr/bin/env bash
# Motion DNA - master reference guard.
# The master reference is the ONE video that defines the style. Project footage and
# generated videos must never be written here. See references/README.md.
#
#   master_ref.sh status                      show whether the master is saved and intact
#   master_ref.sh install <video>             save the user's master upload (refuses if one exists)
#   master_ref.sh replace <video>             ONLY when the user explicitly asks to update the master
#   master_ref.sh verify                      check the checksum (exit 1 on mismatch or missing)
#   master_ref.sh frames <out_dir> <start> <end> [fps]
#                                             extract frames from a time window of the master (targeted reanalysis)
#   master_ref.sh inspect <video> <out_dir> [fps]
#                                             contact sheet + frames of a PROJECT video (never touches the master)
#   master_ref.sh compare <video> <out_dir> <t1> [t2 ...]
#                                             side-by-side stills: master vs project at the same timestamps
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REF_DIR="$DIR/references"
SUM_FILE="$REF_DIR/master-reference.sha256"
# Known fingerprint of the video the current design system was extracted from (see ANALYSIS.md §0).
ANALYSIS_SOURCE_SHA256="c5c6620a168182ef7428ea1dc13bd9243f23ff337f2136fe976c0864663e5a7e"

die() { echo "motion-dna: $*" >&2; exit 1; }

master_path() {
  # The master keeps its original extension: master-reference.<ext>
  local f
  for f in "$REF_DIR"/master-reference.*; do
    case "$f" in *.sha256|*.json) continue ;; esac
    [ -f "$f" ] && { echo "$f"; return 0; }
  done
  return 1
}

save() {
  local src="$1" ext dest
  [ -f "$src" ] || die "file not found: $src"
  ffprobe -v error -select_streams v:0 -show_entries stream=codec_type -of csv=p=0 "$src" | grep -q video \
    || die "not a readable video: $src"
  ext="${src##*.}"; ext="$(echo "$ext" | tr 'A-Z' 'a-z')"
  dest="$REF_DIR/master-reference.$ext"
  cp -p "$src" "$dest"
  chmod 444 "$dest"
  (cd "$REF_DIR" && sha256sum "$(basename "$dest")" > "$(basename "$SUM_FILE")")
  ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate \
    -of json "$dest" > "$REF_DIR/master-reference.probe.json"
  echo "saved master reference: $dest"
  cat "$SUM_FILE"
  if [ "$(cut -d' ' -f1 "$SUM_FILE")" = "$ANALYSIS_SOURCE_SHA256" ]; then
    echo "match: this is the same video the current STYLE_GUIDE was extracted from."
  else
    echo "NOTE: this is NOT the video the current STYLE_GUIDE was extracted from."
    echo "      A full analysis of this master is required before production (SKILL.md, Master setup)."
  fi
}

cmd="${1:-status}"; shift || true
case "$cmd" in
  status)
    if m="$(master_path)"; then
      echo "master: $m"; ls -l "$m"
      (cd "$REF_DIR" && sha256sum -c "$(basename "$SUM_FILE")") || echo "WARNING: checksum mismatch"
    else
      echo "master: NOT SAVED (waiting for the user's upload)"
    fi ;;
  install)
    [ $# -eq 1 ] || die "usage: install <video>"
    if m="$(master_path)"; then die "a master already exists ($m). Use 'replace' only on an explicit user request."; fi
    save "$1" ;;
  replace)
    [ $# -eq 1 ] || die "usage: replace <video>"
    if m="$(master_path)"; then
      ts="$(date +%Y%m%d-%H%M%S)"; mkdir -p "$REF_DIR/archive"
      chmod 644 "$m"; mv "$m" "$REF_DIR/archive/$(basename "${m%.*}")-$ts.${m##*.}"
      [ -f "$SUM_FILE" ] && mv "$SUM_FILE" "$REF_DIR/archive/master-reference-$ts.sha256"
      echo "previous master archived in references/archive/"
    fi
    save "$1" ;;
  verify)
    m="$(master_path)" || die "master reference not saved"
    (cd "$REF_DIR" && sha256sum -c "$(basename "$SUM_FILE")") ;;
  frames)
    [ $# -ge 3 ] || die "usage: frames <out_dir> <start> <end> [fps]"
    m="$(master_path)" || die "master reference not saved - cannot reanalyze"
    out="$1"; mkdir -p "$out"
    ffmpeg -v error -ss "$2" -to "$3" -i "$m" -vf "fps=${4:-15}" "$out/master_%04d.png"
    ffmpeg -v error -y -ss "$2" -to "$3" -i "$m" \
      -vf "fps=${4:-15},scale=320:-1,drawtext=text='%{pts\:flt}':x=4:y=4:fontsize=16:fontcolor=yellow:box=1:boxcolor=black,tile=6x4" \
      -frames:v 1 "$out/master_sheet.jpg"
    echo "master frames -> $out" ;;
  inspect)
    [ $# -ge 2 ] || die "usage: inspect <video> <out_dir> [fps]"
    src="$1"; out="$2"; mkdir -p "$out"
    if m="$(master_path)" && [ "$(realpath "$src")" = "$(realpath "$m")" ]; then die "that is the master, not a project video"; fi
    ffmpeg -v error -y -i "$src" \
      -vf "fps=${3:-2},scale=320:-1,drawtext=text='%{pts\:flt}':x=4:y=4:fontsize=16:fontcolor=yellow:box=1:boxcolor=black,tile=6x5" \
      -frames:v 1 "$out/project_sheet.jpg"
    echo "project sheet -> $out/project_sheet.jpg" ;;
  compare)
    [ $# -ge 3 ] || die "usage: compare <video> <out_dir> <t1> [t2 ...]"
    src="$1"; out="$2"; shift 2; mkdir -p "$out"
    m="$(master_path)" || die "master reference not saved - cannot compare"
    for t in "$@"; do
      ffmpeg -v error -y -ss "$t" -i "$m" -frames:v 1 -vf "scale=-1:540" "$out/m_$t.png"
      ffmpeg -v error -y -ss "$t" -i "$src" -frames:v 1 -vf "scale=-1:540" "$out/p_$t.png"
      ffmpeg -v error -y -i "$out/m_$t.png" -i "$out/p_$t.png" -filter_complex hstack "$out/compare_$t.png"
    done
    echo "comparisons -> $out" ;;
  *) die "unknown command: $cmd" ;;
esac
