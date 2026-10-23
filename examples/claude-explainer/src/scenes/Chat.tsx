import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../tokens';
import {Field, accelEase, mono, prog} from '../lib';

// Bar 5: a conversation. Card snaps in on a parallax stack, collapses into a dark square at the end.
const REPLY = ['Day 1 · Alfama, the castle, sunset at a miradouro', 'Day 2 · Belém and pastéis de nata', 'Day 3 · A day trip to Sintra'];

export const Chat: React.FC = () => {
  const f = useCurrentFrame();
  const inP = prog(f, 2, 8);
  const out = prog(f, 40, 8, accelEase);
  const scale = (0.9 + 0.1 * inP) * (1 - out * 0.86);
  const think = f >= 8;
  const typing = f >= 11 && f < 20;
  const ui = (size: number, color: string, weight = 400): React.CSSProperties => ({fontFamily: FONT.ui, fontSize: size, color, fontWeight: weight});
  return (
    <Field base="#0A1A9A" glow={C.blue} at="50% 50%">
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', perspective: 1600}}>
        {[-1, 1].map((s) => (
          <div
            key={s}
            style={{
              position: 'absolute',
              width: 820,
              height: 560,
              borderRadius: 28,
              background: 'rgba(80,110,255,0.35)',
              transform: `translateX(${s * 120 * inP}px) rotate(${s * 4}deg) scale(${1 - out * 0.9})`,
              opacity: 0.55 * inP * (1 - out),
            }}
          />
        ))}
        <div
          style={{
            width: 900,
            height: 620,
            borderRadius: interpolate(out, [0, 1], [28, 60]),
            background: out > 0 ? `color-mix(in srgb, ${C.ink} ${out * 100}%, #F4F5F2)` : '#F4F5F2',
            boxShadow: `0 40px 80px rgba(0,0,30,0.35)${out > 0 ? `, 0 0 ${out * 120}px ${out * 30}px rgba(255,84,20,${out * 0.7})` : ''}`,
            transform: `translateY(${(1 - inP) * 70}px) rotateX(${(1 - inP) * 14}deg) scale(${scale})`,
            filter: inP < 1 ? `blur(${(1 - inP) * 18}px)` : undefined,
            opacity: inP > 0 ? 1 : 0,
            padding: '40px 48px',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{opacity: 1 - out * 3}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <div style={ui(34, C.ink, 600)}>Claude</div>
                <div style={{...mono(14, 'rgba(18,18,24,0.5)'), marginTop: 6}}>CHAT · NEW CONVERSATION</div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <span style={ui(20, 'rgba(18,18,24,0.75)')}>Extended thinking</span>
                <div style={{width: 58, height: 32, borderRadius: 32, background: think ? C.orange : 'rgba(18,18,24,0.2)', position: 'relative'}}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 4,
                      left: 4 + prog(f, 8, 5) * 26,
                      width: 24,
                      height: 24,
                      borderRadius: 24,
                      background: '#fff',
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{height: 1, background: 'rgba(18,18,24,0.1)', margin: '26px 0'}} />
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <div
                style={{
                  ...ui(24, C.white),
                  background: C.ink,
                  borderRadius: 22,
                  padding: '16px 24px',
                  transform: `translateY(${(1 - prog(f, 4, 6)) * 30}px)`,
                  opacity: prog(f, 4, 3),
                }}
              >
                Plan a 3-day trip to Lisbon
              </div>
            </div>
            <div style={{marginTop: 28, minHeight: 180}}>
              {typing ? (
                <div style={{display: 'flex', gap: 10, padding: '14px 0'}}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 16,
                        background: C.orange,
                        opacity: 0.35 + 0.65 * Math.max(0, Math.sin(((f - 11) / 6) * Math.PI * 2 - i * 1.2)),
                      }}
                    />
                  ))}
                </div>
              ) : null}
              {REPLY.map((r, i) => {
                const p = prog(f, 20 + i * 3, 6);
                return (
                  <div
                    key={i}
                    style={{
                      ...ui(25, C.ink),
                      marginBottom: 16,
                      opacity: p > 0 ? 1 : 0,
                      transform: `translateX(${(1 - p) * -40}px)`,
                      filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined,
                    }}
                  >
                    {r}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                position: 'absolute',
                left: 48,
                right: 48,
                bottom: 36,
                height: 64,
                borderRadius: 32,
                border: '1.5px solid rgba(18,18,24,0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px 0 26px',
              }}
            >
              <span style={ui(20, 'rgba(18,18,24,0.4)')}>Reply to Claude…</span>
              <div style={{width: 46, height: 46, borderRadius: 46, background: C.orange}} />
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Field>
  );
};
