import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../tokens';
import {Field, mono, prog} from '../lib';

// Bar 4: Claude fixes a bug, tests pass. The ✓ dot seeds the radial burst out.
export const CHECK_DOT = {x: 1298, y: 604};

const LINES: {t: string; fix?: boolean}[] = [
  {t: 'export function total(items: Item[]) {'},
  {t: '  let sum = 0;'},
  {t: '  for (let i = 0; i <= items.length; i++) {', fix: true},
  {t: '    sum += items[i].price;'},
  {t: '  }'},
  {t: '  return sum;'},
  {t: '}'},
];

export const Code: React.FC = () => {
  const f = useCurrentFrame();
  const card = prog(f, 4, 8);
  const hl = prog(f, 10, 6);
  const fixed = f >= 16;
  const cmd = '$ npm test';
  const typed = cmd.slice(0, Math.max(0, Math.floor((f - 18) * 1.5)));
  const pass = prog(f, 28, 5);
  const cursorOn = Math.floor(f / 4) % 2 === 0;
  return (
    <Field base={C.black} glow="#111827" at="40% 40%">
      <AbsoluteFill>
        <div style={{position: 'absolute', left: 250, top: 205, opacity: prog(f, 3, 4)}}>
          <span style={mono(19, 'rgba(247,247,244,0.7)')}>{'FIX > OFF-BY-ONE IN total()'}</span>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 250,
            top: 260,
            width: 960,
            height: 520,
            borderRadius: 18,
            background: '#11141C',
            border: '1px solid rgba(255,255,255,0.08)',
            transform: `translateY(${(1 - card) * 80}px) scale(${0.94 + 0.06 * card})`,
            filter: card < 1 ? `blur(${(1 - card) * 16}px)` : undefined,
            opacity: card > 0 ? 1 : 0,
            overflow: 'hidden',
          }}
        >
          <div style={{height: 54, display: 'flex', alignItems: 'center', gap: 10, padding: '0 22px', borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{width: 12, height: 12, borderRadius: 12, background: 'rgba(255,255,255,0.18)'}} />
            ))}
            <span style={{...mono(15, 'rgba(247,247,244,0.55)', {textTransform: 'none', letterSpacing: '0.06em'}), marginLeft: 14}}>pricing.ts</span>
          </div>
          <div style={{padding: '26px 0'}}>
            {LINES.map((l, i) => {
              const text = l.fix && fixed ? l.t.replace('<=', '<') : l.t;
              return (
                <div key={i} style={{position: 'relative', height: 56, display: 'flex', alignItems: 'center'}}>
                  {l.fix ? (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        height: 48,
                        width: `${hl * 100}%`,
                        background: 'rgba(255,84,20,0.16)',
                        borderLeft: `4px solid ${C.orange}`,
                      }}
                    />
                  ) : null}
                  <span style={{width: 70, textAlign: 'right', fontFamily: FONT.mono, fontSize: 22, color: 'rgba(247,247,244,0.3)'}}>{i + 1}</span>
                  <span style={{marginLeft: 34, fontFamily: FONT.mono, fontSize: 26, color: C.white, whiteSpace: 'pre', position: 'relative'}}>
                    {text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 1250,
            top: 470,
            width: 470,
            height: 230,
            borderRadius: 16,
            background: '#0E1017',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '30px 34px',
            transform: `translateX(${(1 - prog(f, 14, 7)) * 140}px)`,
            opacity: f >= 14 ? 1 : 0,
            filter: f < 19 ? `blur(${(1 - prog(f, 14, 7)) * 14}px)` : undefined,
          }}
        >
          <div style={{fontFamily: FONT.mono, fontSize: 24, color: C.white}}>
            {typed}
            {pass === 0 ? <span style={{background: cursorOn ? C.orange : 'transparent', color: 'transparent'}}>_</span> : null}
          </div>
          <div style={{marginTop: 56, display: 'flex', alignItems: 'center', gap: 18, opacity: pass > 0 ? 1 : 0}}>
            <div style={{width: 28, height: 28, borderRadius: 28, background: C.orange, transform: `scale(${pass})`, boxShadow: '0 0 24px rgba(255,84,20,0.6)'}} />
            <span style={{fontFamily: FONT.mono, fontSize: 24, color: C.white}}>{'24 tests passed'}</span>
          </div>
        </div>
      </AbsoluteFill>
    </Field>
  );
};
