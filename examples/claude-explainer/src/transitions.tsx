import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {C, H, W} from './tokens';
import {accelEase, prog} from './lib';
import {CHECK_DOT} from './scenes/Code';

// Each device is born from a shape in the outgoing scene (STYLE_GUIDE §8). Frames are local to the Sequence.

// Line -> flash: the boot line has already grown into a full-height band; hold white-hot, then cool.
export const Flash: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 4, 12], [1, 1, 0], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill
      style={{
        opacity: o,
        background: 'radial-gradient(ellipse 80% 70% at 45% 50%, #FFF8EE 0%, #FFE2C4 45%, #FF8A3D 100%)',
      }}
    />
  );
};

// Diagonal slab wipe: three staggered slabs; the last one is paper, so the data scene continues it.
export const SlabWipe: React.FC = () => {
  const f = useCurrentFrame();
  const slabs = ['#FF7A3A', C.white, '#E9ECE8'];
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      {slabs.map((c, i) => {
        const p = prog(f, i * 2, 7);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: -1400,
              top: -800,
              width: 4200,
              height: 2800,
              background: c,
              transform: `rotate(-20deg) translateY(${interpolate(p, [0, 1], [2900, 0])}px)`,
              opacity: f < 12 || i < 2 ? 1 : 0,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Column dissolve: strips of varying width drop in and turn the frame black.
export const ColumnDissolve: React.FC = () => {
  const f = useCurrentFrame();
  const cols: {x: number; w: number; d: number}[] = [];
  let x = 0;
  let i = 0;
  while (x < W) {
    const w = 40 + random(`cw${i}`) * 140;
    cols.push({x, w, d: (x / W) * 6 + random(`cd${i}`) * 2});
    x += w;
    i++;
  }
  return (
    <AbsoluteFill>
      {cols.map((c, k) => {
        const p = prog(f, c.d, 5);
        return (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: c.x,
              top: 0,
              width: c.w + 1,
              height: H,
              background: `linear-gradient(to bottom, #3A3D44 0%, ${C.black} 25%)`,
              transform: `translateY(${(1 - p) * -H * 1.1}px) scaleY(${1 + (1 - p) * 0.6})`,
              transformOrigin: 'top',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Radial burst from the ✓ dot: streaks fly out, blue discs open into the chat field.
export const RadialBurst: React.FC = () => {
  const f = useCurrentFrame();
  const streak = prog(f, 0, 7);
  const disc = prog(f, 3, 8);
  const maxR = 2600;
  return (
    <AbsoluteFill>
      <svg width={W} height={H} style={{position: 'absolute', opacity: 1 - prog(f, 8, 4)}}>
        {Array.from({length: 120}).map((_, i) => {
          const a = random(`ra${i}`) * Math.PI * 2;
          const r0 = 30 + streak * 900 * (0.5 + random(`rr${i}`));
          const len = 80 + streak * 700 * random(`rl${i}`);
          const col = i % 11 === 0 ? C.orange : i % 7 === 0 ? '#6C8CFF' : C.white;
          return (
            <line
              key={i}
              x1={CHECK_DOT.x + Math.cos(a) * r0}
              y1={CHECK_DOT.y + Math.sin(a) * r0}
              x2={CHECK_DOT.x + Math.cos(a) * (r0 + len)}
              y2={CHECK_DOT.y + Math.sin(a) * (r0 + len)}
              stroke={col}
              strokeWidth={2}
              strokeOpacity={0.85}
            />
          );
        })}
      </svg>
      {['#2A48FF', '#1F3BFF', '#0A1A9A'].map((c, i) => {
        const r = Math.max(0, disc - i * 0.12) * maxR;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: CHECK_DOT.x - r,
              top: CHECK_DOT.y - r,
              width: r * 2,
              height: r * 2,
              borderRadius: '50%',
              background: c,
              opacity: f < 10 ? 1 : 0,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Collapse: the dark square left by the chat card blooms orange and settles into the tools blob.
export const CollapseBloom: React.FC = () => {
  const f = useCurrentFrame();
  const bloom = prog(f, 0, 9);
  const r = bloom * 1500;
  const sq = interpolate(prog(f, 0, 8), [0, 1], [126, 120]);
  const radius = interpolate(prog(f, 2, 8), [0, 1], [30, 60]);
  const fade = f >= 10 ? 0 : 1;
  return (
    <AbsoluteFill style={{opacity: fade}}>
      <div
        style={{
          position: 'absolute',
          left: W / 2 - r,
          top: H / 2 + 30 - r,
          width: r * 2,
          height: r * 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, #F04A0C 62%, #FF4FA0 72%, rgba(120,60,255,0) 80%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: W / 2 - sq / 2,
          top: H / 2 + 30 - sq / 2,
          width: sq,
          height: sq,
          borderRadius: radius,
          background: C.black,
        }}
      />
    </AbsoluteFill>
  );
};

// Portal: the merged dot opens into concentric rings that rush past the camera into navy.
export const Portal: React.FC = () => {
  const f = useCurrentFrame();
  const s = 1 + prog(f, 0, 11, accelEase) * 40;
  const rings = [
    {k: 1, c: '#1A0D08'},
    {k: 0.82, c: '#2B140B'},
    {k: 0.66, c: '#0F0B10'},
    {k: 0.5, c: C.navy},
  ];
  const R = 60;
  return (
    <AbsoluteFill style={{opacity: f >= 14 ? 0 : 1}}>
      {rings.map((r, i) => {
        const rr = R * r.k * s;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: W / 2 - rr,
              top: H / 2 + 30 - rr,
              width: rr * 2,
              height: rr * 2,
              borderRadius: '50%',
              background: r.c,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
