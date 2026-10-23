import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, H, W} from '../tokens';
import {Field, accelEase, mono, prog} from '../lib';

// Bar 0: navy dot grid, falling spark -> dot, terminal line, orange line that becomes the flash.
export const Boot: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = W / 2;
  const cy = H / 2 - 20;

  const fall = prog(frame, 0, 9);
  const sparkY = interpolate(fall, [0, 1], [-200, cy]);
  const trail = (1 - fall) * 160;

  const full = 'claude / explained - 2026';
  const first = 'claude // explained';
  let typed = '';
  if (frame >= 11 && frame < 21) typed = first.slice(0, Math.floor((frame - 11) * 2));
  else if (frame >= 21) typed = full.slice(0, Math.min(full.length, 6 + Math.floor((frame - 21) * 2.2)));
  const cursorOn = Math.floor(frame / 4) % 2 === 0;

  const lineW = prog(frame, 22, 8) * W * 1.05;
  const wave = frame >= 30 && frame < 40 ? Math.sin((frame - 30) / 10 * Math.PI) * 10 : 0;
  const thick = interpolate(frame, [33, 40], [4, 14], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const band = prog(frame, 40, 7, accelEase) * H * 1.2;
  const lineH = thick + band;

  const gridGap = 120;
  return (
    <Field base={C.navy} glow="#14213C" at="50% 45%">
      <svg width={W} height={H} style={{position: 'absolute'}}>
        {Array.from({length: Math.ceil(W / gridGap) + 1}).map((_, i) => (
          <line key={`v${i}`} x1={i * gridGap} y1={0} x2={i * gridGap} y2={H} stroke="#ffffff" strokeOpacity={0.05} />
        ))}
        {Array.from({length: Math.ceil(H / gridGap) + 1}).map((_, j) => (
          <line key={`h${j}`} x1={0} y1={j * gridGap} x2={W} y2={j * gridGap} stroke="#ffffff" strokeOpacity={0.05} />
        ))}
        {Array.from({length: Math.ceil(W / gridGap) + 1}).flatMap((_, i) =>
          Array.from({length: Math.ceil(H / gridGap) + 1}).map((__, j) => (
            <circle key={`d${i}-${j}`} cx={i * gridGap} cy={j * gridGap} r={2.2} fill="#ffffff" fillOpacity={0.55} />
          )),
        )}
      </svg>

      {/* spark and its trail */}
      {frame < 40 ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: cx - 3,
              top: sparkY - trail,
              width: 6,
              height: trail,
              background: `linear-gradient(to bottom, transparent, ${C.orange})`,
              opacity: 0.8,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: cx - 11,
              top: sparkY - 11,
              width: 22,
              height: 22,
              borderRadius: 22,
              background: '#FFB27A',
              boxShadow: `0 0 18px 6px ${C.orange}, 0 0 60px 20px rgba(255,84,20,0.35)`,
            }}
          />
        </>
      ) : null}

      {/* terminal line */}
      {frame >= 11 && frame < 44 ? (
        <div style={{position: 'absolute', left: 0, right: 0, top: cy + 46, display: 'flex', justifyContent: 'center'}}>
          <span style={mono(26, C.white, {textTransform: 'none', letterSpacing: '0.06em', fontWeight: 700})}>
            {typed}
            <span style={{background: cursorOn ? C.orange : 'transparent', color: 'transparent'}}>_</span>
          </span>
        </div>
      ) : null}

      {/* the line that becomes the flash */}
      {frame >= 22 ? (
        <AbsoluteFill>
          <div
            style={{
              position: 'absolute',
              left: cx - lineW / 2,
              top: cy - lineH / 2 + wave,
              width: lineW,
              height: lineH,
              borderRadius: lineH,
              background: band > 20 ? '#FFF6E8' : '#FFD7B8',
              boxShadow: `0 0 ${14 + band * 0.2}px ${4 + band * 0.1}px ${C.orange}, 0 0 80px 20px rgba(255,84,20,0.45)`,
            }}
          />
        </AbsoluteFill>
      ) : null}
    </Field>
  );
};
