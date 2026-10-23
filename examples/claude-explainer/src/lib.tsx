import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, useCurrentFrame} from 'remotion';
import {C, EASE, FONT, PROJECT_LABEL, FPS} from './tokens';

const bez = (e: readonly number[]) => Easing.bezier(e[0], e[1], e[2], e[3]);
export const snapEase = bez(EASE.snap);
export const accelEase = bez(EASE.accel);
export const driftEase = bez(EASE.drift);

// 0..1 progress with the style's default snap (expo-out).
export const prog = (
  frame: number,
  start: number,
  dur: number,
  ease: (t: number) => number = snapEase,
) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Soft radial field, never pure black or white.
export const Field: React.FC<{base: string; glow?: string; at?: string; children?: React.ReactNode}> = ({
  base,
  glow,
  at = '30% 40%',
  children,
}) => (
  <AbsoluteFill
    style={{
      background: glow
        ? `radial-gradient(ellipse 90% 90% at ${at}, ${glow} 0%, ${base} 70%)`
        : base,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const mono = (size: number, color: string, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.mono,
  fontSize: size,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color,
  whiteSpace: 'pre',
  ...extra,
});

export const impact = (size: number, color: string, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.impact,
  fontSize: size,
  letterSpacing: '-0.03em',
  lineHeight: 0.9,
  color,
  whiteSpace: 'pre',
  ...extra,
});

export const accent = (size: number, color: string, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.accent,
  fontStyle: 'italic',
  fontSize: size,
  color,
  whiteSpace: 'pre',
  ...extra,
});

// Letter-sequential masked reveal with smear (STYLE_GUIDE §4.4).
export const LetterReveal: React.FC<{
  text: string;
  start: number;
  style: React.CSSProperties;
  stagger?: number;
  dur?: number;
}> = ({text, start, style, stagger = 1.5, dur = 6}) => {
  const frame = useCurrentFrame();
  return (
    <span style={{display: 'inline-flex', ...style}}>
      {text.split('').map((ch, i) => {
        const p = prog(frame, start + i * stagger, dur);
        const vel = p < 1 ? (1 - p) * 18 : 0;
        return (
          <span key={i} style={{display: 'inline-block', overflow: 'hidden', paddingBottom: '0.08em'}}>
            <span
              style={{
                display: 'inline-block',
                transform: `translateX(${(1 - p) * -60}%)`,
                opacity: p > 0 ? 1 : 0,
                filter: vel > 0.5 ? `blur(${vel * 0.35}px)` : undefined,
              }}
            >
              {ch === ' ' ? ' ' : ch}
            </span>
          </span>
        );
      })}
    </span>
  );
};

// Mono decode: characters resolve left to right from random glyphs.
export const Decode: React.FC<{text: string; start: number; style: React.CSSProperties; perChar?: number}> = ({
  text,
  start,
  style,
  perChar = 1,
}) => {
  const frame = useCurrentFrame();
  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#*';
  const out = text
    .split('')
    .map((ch, i) => {
      const t = frame - start - i * perChar;
      if (t < 0) return ' ';
      if (t >= 3 || ch === ' ') return ch;
      return glyphs[Math.floor(random(`d${i}-${frame}`) * glyphs.length)];
    })
    .join('');
  return <span style={style}>{out}</span>;
};

// Persistent instrument frame (STYLE_GUIDE §5.3). Layout never animates; only values change.
export const HUD: React.FC<{scene: number; total: number; tag: string; color: string}> = ({
  scene,
  total,
  tag,
  color,
}) => {
  const frame = useCurrentFrame();
  const s = Math.floor(frame / FPS);
  const f = frame % FPS;
  const tc = `00:00:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
  const m = 80;
  const br = (pos: React.CSSProperties, rot: number) => (
    <div
      style={{
        position: 'absolute',
        width: 22,
        height: 22,
        borderLeft: `1.5px solid ${color}`,
        borderTop: `1.5px solid ${color}`,
        transform: `rotate(${rot}deg)`,
        ...pos,
      }}
    />
  );
  return (
    <AbsoluteFill style={{opacity: 0.72, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: m, top: m - 30, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 9, height: 9, borderRadius: 9, background: C.orange}} />
        <span style={mono(17, color)}>{PROJECT_LABEL}</span>
      </div>
      <div style={{position: 'absolute', right: m + 36, top: m - 30}}>
        <span style={mono(17, color)}>{`SCENE ${String(scene).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}</span>
      </div>
      {br({right: m - 6, top: m - 34}, 90)}
      {br({left: m - 30, bottom: m - 34}, -90)}
      <div style={{position: 'absolute', left: m, bottom: m - 32}}>
        <span style={mono(17, color)}>{tag}</span>
      </div>
      <div style={{position: 'absolute', right: m, bottom: m - 32, display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{width: 8, height: 8, borderRadius: 8, background: C.orange, opacity: f < 20 ? 1 : 0.25}} />
        <span style={mono(17, color)}>{`REC ${tc}`}</span>
        <div style={{width: 14, height: 14, borderRadius: 14, border: `1.5px solid ${color}`}} />
      </div>
      <div style={{position: 'absolute', right: m - 30, top: '50%', ...mono(14, color)}}>↓</div>
    </AbsoluteFill>
  );
};

// Chromatic whip: three tinted copies collapse onto the sharp word.
export const ChromaWord: React.FC<{
  text: string;
  start: number;
  style: React.CSSProperties;
  from?: number;
  dur?: number;
}> = ({text, start, style, from = 320, dur = 4}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, start, dur);
  const x = (1 - p) * from;
  const split = (1 - p) * 70;
  const blur = (1 - p) * 26;
  const layer = (dx: number, color: string, op: number, blend: React.CSSProperties['mixBlendMode']) => (
    <span
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        ...style,
        color,
        opacity: op,
        mixBlendMode: blend,
        transform: `translateX(${x + dx}px)`,
        filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
      }}
    >
      {text}
    </span>
  );
  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      <span style={{...style, visibility: 'hidden'}}>{text}</span>
      {p < 1 ? layer(split, '#FF2A2A', 0.7, 'multiply') : null}
      {p < 1 ? layer(-split, '#1E6BFF', 0.7, 'multiply') : null}
      {layer(0, style.color as string, p > 0 ? 1 : 0, 'normal')}
    </div>
  );
};

// Horizontal glitch-slice decode (STYLE_GUIDE §4.4).
export const SliceWord: React.FC<{text: string; start: number; style: React.CSSProperties; slices?: number; dur?: number}> = ({
  text,
  start,
  style,
  slices = 7,
  dur = 5,
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, start, dur);
  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      <span style={{...style, visibility: 'hidden'}}>{text}</span>
      {Array.from({length: slices}).map((_, i) => {
        const top = (i / slices) * 100;
        const bottom = 100 - ((i + 1) / slices) * 100;
        const dir = random(`s${i}`) > 0.5 ? 1 : -1;
        const off = (1 - p) * dir * (120 + random(`o${i}`) * 260);
        const visible = frame >= start + Math.floor(random(`v${i}`) * 2);
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              ...style,
              clipPath: `inset(${top}% 0 ${bottom}% 0)`,
              transform: `translateX(${off}px)`,
              opacity: visible ? 1 : 0,
            }}
          >
            {text}
          </span>
        );
      })}
    </div>
  );
};
