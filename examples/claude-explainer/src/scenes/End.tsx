import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {C} from '../tokens';
import {Decode, Field, accent, impact, mono, prog} from '../lib';

// End card: the dot returns and writes the wordmark. HUD is off.
export const End: React.FC = () => {
  const f = useCurrentFrame();
  const appear = prog(f, 6, 6);
  const move = prog(f, 14, 10);
  const wordW = 660;
  const gap = 34;
  const dot = 40;
  // the group is centred; the dot starts at screen centre and slides to the group's left edge
  const startOffset = (wordW + gap) / 2;
  const dx = startOffset * (1 - move);
  const reveal = move;
  // the word emerges from the dot: everything left of the dot's current position stays hidden
  const hideLeft = Math.max(0, dx - dot / 2 - gap);
  const glitch = reveal > 0 && reveal < 1;
  const pulse = 1 + 0.06 * Math.sin(f / 7);
  return (
    <Field base={C.navy} glow="#15223D" at="50% 45%">
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-20px)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap}}>
            <div
              style={{
                width: dot,
                height: dot,
                borderRadius: dot,
                position: 'relative',
                zIndex: 2,
                background: '#FFC08F',
                transform: `translateX(${dx}px) scale(${appear * pulse})`,
                boxShadow: `0 0 20px 6px ${C.orange}, 0 0 90px 40px rgba(255,84,20,0.28)`,
              }}
            />
            <div style={{width: wordW, position: 'relative', clipPath: `inset(-20% -5% -20% ${hideLeft}px)`, opacity: move > 0.02 ? 1 : 0}}>
              {glitch
                ? Array.from({length: 5}).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        ...impact(170, C.white),
                        clipPath: `inset(${i * 20}% 0 ${100 - (i + 1) * 20}% 0)`,
                        transform: `translateX(${(random(`g${i}-${f}`) - 0.5) * 60 * (1 - reveal)}px)`,
                      }}
                    >
                      Claude
                    </span>
                  ))
                : null}
              <span style={{...impact(170, C.white), visibility: glitch ? 'hidden' : 'visible'}}>Claude</span>
            </div>
          </div>
          <div style={{marginTop: 18, marginLeft: dot + gap, opacity: prog(f, 26, 6), filter: f < 32 ? `blur(${(1 - prog(f, 26, 6)) * 10}px)` : undefined}}>
            <span style={accent(70, C.white)}>your AI collaborator</span>
          </div>
          <div
            style={{
              marginTop: 30,
              marginLeft: dot + gap,
              height: 1.5,
              width: interpolate(prog(f, 30, 8), [0, 1], [0, 760]),
              background: 'rgba(120,150,210,0.55)',
            }}
          />
          <div style={{marginTop: 28, marginLeft: dot + gap, height: 34}}>
            <Decode text="ASK ANYTHING. BUILD ANYTHING." start={36} style={mono(26, C.orange, {fontWeight: 700, letterSpacing: '0.3em'})} />
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 110}}>
        <Decode
          text="MADE ENTIRELY IN CODE - REACT · REMOTION - 0 KEYFRAMES DRAGGED"
          start={62}
          perChar={0.5}
          style={mono(15, 'rgba(247,247,244,0.7)', {fontWeight: 700})}
        />
      </AbsoluteFill>
    </Field>
  );
};
