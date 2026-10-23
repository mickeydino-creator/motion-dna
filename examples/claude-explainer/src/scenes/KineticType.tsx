import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {BEAT, C} from '../tokens';
import {ChromaWord, Field, SliceWord, accent, impact, mono, prog} from '../lib';

// Bar 2: one word per beat. READS / WRITES / CODES / with you.
const Center: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>{children}</AbsoluteFill>
);

const Reads: React.FC<{f: number}> = ({f}) => (
  <Field base="#E9ECE8" glow="#F6F7F3" at="50% 45%">
    <Center>
      <ChromaWord text="READS" start={0} from={360} dur={4} style={impact(300, C.ink)} />
    </Center>
  </Field>
);

const Writes: React.FC<{f: number}> = ({f}) => {
  const p = prog(f, 0, 5);
  const rows = 9;
  return (
    <Field base="#0B0E16" glow="#141B2C" at="50% 50%">
      {Array.from({length: rows}).map((_, r) => {
        const dir = r % 2 === 0 ? 1 : -1;
        const x = -400 + dir * f * 9 - (r % 3) * 180;
        return (
          <div
            key={r}
            style={{
              position: 'absolute',
              top: -40 + r * 135,
              left: x,
              ...impact(150, 'transparent'),
              WebkitTextStroke: '1.5px rgba(247,247,244,0.22)',
              opacity: r === 4 ? 0 : 1,
            }}
          >
            {'WRITES WRITES WRITES WRITES WRITES'}
          </div>
        );
      })}
      <Center>
        <span
          style={{
            ...impact(230, 'transparent'),
            background: 'linear-gradient(to bottom, #FFE7C2 0%, #FFA24A 45%, #FF5414 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            transform: `scale(${0.35 + 0.65 * p})`,
            filter: `drop-shadow(0 0 28px rgba(255,120,40,0.55))${p < 1 ? ` blur(${(1 - p) * 12}px)` : ''}`,
            paddingBottom: 10,
          }}
        >
          WRITES
        </span>
      </Center>
    </Field>
  );
};

const Codes: React.FC<{f: number}> = ({f}) => {
  const hue = interpolate(f, [9, 12], [0, 148], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const br = (style: React.CSSProperties) => (
    <div style={{position: 'absolute', width: 44, height: 44, borderColor: C.white, borderStyle: 'solid', borderWidth: 0, ...style}} />
  );
  return (
    <AbsoluteFill style={{filter: hue > 0 ? `hue-rotate(${hue}deg) saturate(1.2)` : undefined}}>
      <Field base={C.blue} glow={C.cyan} at="8% 55%">
        <Center>
          <div style={{position: 'relative', padding: '50px 90px'}}>
            {br({left: 0, top: 0, borderLeftWidth: 3, borderTopWidth: 3})}
            {br({right: 0, top: 0, borderRightWidth: 3, borderTopWidth: 3})}
            {br({left: 0, bottom: 0, borderLeftWidth: 3, borderBottomWidth: 3})}
            {br({right: 0, bottom: 0, borderRightWidth: 3, borderBottomWidth: 3})}
            <div style={{position: 'absolute', left: 6, top: -36, ...mono(18, C.white, {fontWeight: 700})}}>{'> CLAUDE CODE'}</div>
            <div style={{position: 'absolute', right: 6, bottom: -36, ...mono(18, C.white, {fontWeight: 700})}}>{'ANY LANGUAGE'}</div>
            <SliceWord text="CODES" start={0} style={impact(260, C.white)} />
          </div>
        </Center>
      </Field>
    </AbsoluteFill>
  );
};

const WithYou: React.FC<{f: number}> = ({f}) => {
  const p = prog(f, 0, 6);
  const line = prog(f, 3, 7);
  return (
    <Field base="#F04A0C" glow="#FF6A1F" at="70% 30%">
      <Center>
        <div style={{position: 'relative', transform: `translateX(${(1 - p) * 60}px)`, filter: p < 1 ? `blur(${(1 - p) * 14}px)` : undefined}}>
          <span style={accent(230, C.ink)}>with you.</span>
          <svg width={460} height={60} style={{position: 'absolute', left: 330, top: 250}} viewBox="0 0 460 60">
            <path
              d="M4 34 C 90 18, 190 44, 300 26 S 430 20, 456 30"
              fill="none"
              stroke={C.ink}
              strokeWidth={6}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - line}
            />
          </svg>
        </div>
      </Center>
    </Field>
  );
};

export const KineticType: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = Math.min(3, Math.floor(frame / BEAT));
  const f = frame - beat * BEAT;
  const iris = prog(frame, 0, 8);
  return (
    <AbsoluteFill style={{background: C.black}}>
      <AbsoluteFill style={{clipPath: `circle(${iris * 120}% at 50% 50%)`}}>
        {beat === 0 ? <Reads f={f} /> : null}
        {beat === 1 ? <Writes f={f} /> : null}
        {beat === 2 ? <Codes f={f} /> : null}
        {beat === 3 ? <WithYou f={f} /> : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

