import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from '../tokens';
import {Field, LetterReveal, accelEase, accent, impact, mono, prog} from '../lib';

// Bar 1: flash cools into orange, CLAUDE. reveals; its period grows into the ink mask.
export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, 48], [1, 1.03]);
  const dotIn = prog(frame, 12, 5);
  const grow = prog(frame, 38, 10, accelEase);
  const dotScale = 1 + grow * 90;
  const d = 52;
  return (
    <Field base="#F04A0C" glow="#FF6A1F" at="22% 40%">
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{transform: `scale(${push}) translateY(-30px)`, display: 'flex', flexDirection: 'column'}}>
          <div style={{opacity: prog(frame, 6, 4), marginBottom: 22, marginLeft: 10}}>
            <span style={mono(20, C.ink)}>{'EXPLAINER ------ 01'}</span>
          </div>
          <div style={{display: 'flex', alignItems: 'flex-end'}}>
            <LetterReveal text="CLAUDE" start={2} stagger={1.5} dur={6} style={impact(300, C.ink)} />
            <div
              style={{
                width: d,
                height: d,
                marginLeft: 10,
                marginBottom: 36,
                position: 'relative',
                transform: `scale(${dotIn})`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: d,
                  background: `radial-gradient(circle, ${C.black} 55%, rgba(8,9,12,0.0) 72%)`,
                  transform: `scale(${dotScale * 1.35})`,
                }}
              />
            </div>
          </div>
          <div style={{alignSelf: 'flex-end', marginTop: -6, marginRight: 40}}>
            <LetterReveal
              text="your AI collaborator"
              start={9}
              stagger={0.6}
              dur={7}
              style={accent(104, C.white)}
            />
          </div>
        </div>
      </AbsoluteFill>
    </Field>
  );
};
