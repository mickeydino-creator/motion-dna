import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, H, W} from '../tokens';
import {Field, accelEase, accent, driftEase, mono, prog} from '../lib';

// Bar 6: one dot splits into six tools and merges back into one dot (the portal seed).
const TOOLS = ['SEARCH', 'FILES', 'CODE', 'DOCS', 'APIS', 'DATA'];
const SIZES = [40, 34, 44, 36, 42, 32];

const superformula = (m: number, r: number, cx: number, cy: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const t = (i / 240) * Math.PI * 2;
    const a = Math.abs(Math.cos((m * t) / 4)) ** 0.7;
    const b = Math.abs(Math.sin((m * t) / 4)) ** 0.7;
    const k = (a + b) ** (-1 / 0.9);
    const rr = r * k;
    pts.push(`${i === 0 ? 'M' : 'L'}${(cx + rr * Math.cos(t)).toFixed(1)},${(cy + rr * Math.sin(t)).toFixed(1)}`);
  }
  return pts.join(' ') + 'Z';
};

export const Tools: React.FC = () => {
  const f = useCurrentFrame();
  const cx = W / 2;
  const cy = H / 2 + 30;
  const split = prog(f, 9, 8);
  const merge = prog(f, 32, 8, accelEase);
  const radius = 240 * split * (1 - merge);
  const spin = interpolate(f, [0, 48], [0, 0.6]);
  const m = interpolate(f, [14, 30], [0, 6], {easing: driftEase, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const outline = prog(f, 11, 7) * (1 - merge);
  const labelsOn = f >= 16 && f < 32;
  return (
    <Field base="#F04A0C" glow="#FF6A1F" at="20% 50%">
      <svg width={W} height={H} style={{position: 'absolute'}}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation={14} result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11" />
          </filter>
        </defs>
        <g filter="url(#goo)">
          <circle cx={cx} cy={cy} r={60} fill={C.black} />
          {TOOLS.map((_, i) => {
            const a = (i / TOOLS.length) * Math.PI * 2 + spin - Math.PI / 2;
            return <circle key={i} cx={cx + Math.cos(a) * radius} cy={cy + Math.sin(a) * radius} r={SIZES[i] * Math.max(split, 0.6)} fill={C.black} />;
          })}
        </g>
        {outline > 0 ? (
          <path
            d={superformula(m, 330, cx, cy)}
            fill="none"
            stroke={C.cream}
            strokeWidth={2}
            opacity={0.9}
            transform={`translate(${cx} ${cy}) scale(${outline}) translate(${-cx} ${-cy})`}
          />
        ) : null}
      </svg>
      {labelsOn
        ? TOOLS.map((t, i) => {
            const a = (i / TOOLS.length) * Math.PI * 2 + spin - Math.PI / 2;
            const p = prog(f, 16 + i * 1, 4);
            return (
              <div
                key={t}
                style={{
                  position: 'absolute',
                  left: cx + Math.cos(a) * 420 - 80,
                  top: cy + Math.sin(a) * 400 - 14,
                  width: 160,
                  textAlign: 'center',
                  opacity: p,
                  ...mono(20, C.ink, {fontWeight: 700}),
                }}
              >
                {t}
              </div>
            );
          })
        : null}
      <AbsoluteFill style={{alignItems: 'center'}}>
        <div style={{marginTop: 120, opacity: prog(f, 11, 5) * (1 - merge), transform: `translateY(${(1 - prog(f, 11, 7)) * 30}px)`}}>
          <span style={accent(78, C.white)}>connects to your tools.</span>
        </div>
      </AbsoluteFill>
      <div style={{position: 'absolute', left: 200, bottom: 190, opacity: prog(f, 10, 4) * (1 - merge)}}>
        <div style={mono(17, C.ink, {textTransform: 'none', letterSpacing: '0.08em'})}>{'r(θ) = superformula'}</div>
        <div style={{...mono(17, C.ink, {textTransform: 'none', letterSpacing: '0.08em'}), marginTop: 8}}>{`m = ${m.toFixed(2)}`}</div>
      </div>
    </Field>
  );
};
