import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../tokens';
import {Field, impact, mono, prog} from '../lib';

// Bar 3: Claude answers a data question. Split dashboard, one orange signal per element group.
const BARS = [28, 41, 34, 49, 45, 57, 52, 66, 59, 71, 68, 88];

export const Data: React.FC = () => {
  const f = useCurrentFrame();
  const count = Math.round(interpolate(prog(f, 5, 26), [0, 1], [0, 38]));
  const rolling = f < 28;
  const donut = prog(f, 7, 24) * 0.92;
  const lineP = prog(f, 12, 16);
  const tip = prog(f, 27, 5);

  const chart = {x: 900, y: 330, w: 820, h: 440};
  const bw = 42;
  const gap = (chart.w - bw * BARS.length) / (BARS.length - 1);
  const pts = BARS.map((v, i) => [
    chart.x + i * (bw + gap) + bw / 2,
    chart.y + chart.h - (v / 100) * chart.h * 0.92 - 60,
  ]);
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const R = 92;
  const circ = 2 * Math.PI * R;

  return (
    <Field base="#E9ECE8" glow="#F5F6F2" at="30% 30%">
      <AbsoluteFill>
        <div style={{position: 'absolute', left: 200, top: 190, opacity: prog(f, 2, 4)}}>
          <span style={mono(19, 'rgba(18,18,24,0.6)')}>{'PROMPT > "WHAT CHANGED IN Q3?"'}</span>
        </div>
        <div style={{position: 'absolute', left: 200, top: 300, opacity: prog(f, 4, 4)}}>
          <span style={mono(18, C.ink)}>{'REVENUE - Q3 · SAMPLE DATA'}</span>
        </div>
        <div style={{position: 'absolute', left: 190, top: 340, display: 'flex', alignItems: 'baseline'}}>
          <span style={{...impact(170, C.ink), filter: rolling ? 'blur(2.5px)' : undefined, opacity: prog(f, 4, 3)}}>
            {`+${count}`}
          </span>
          <span style={{...impact(170, C.orange), opacity: prog(f, 4, 3)}}>%</span>
        </div>
        <div style={{position: 'absolute', left: 200, top: 520, opacity: prog(f, 8, 4)}}>
          <span style={mono(17, 'rgba(18,18,24,0.6)', {textTransform: 'none'})}>vs. Q2</span>
        </div>
        <svg width={260} height={260} style={{position: 'absolute', left: 190, top: 600}}>
          <circle cx={130} cy={130} r={R} fill="none" stroke="rgba(18,18,24,0.12)" strokeWidth={18} />
          <circle
            cx={130}
            cy={130}
            r={R}
            fill="none"
            stroke={C.orange}
            strokeWidth={18}
            strokeDasharray={`${circ * donut} ${circ}`}
            transform="rotate(-90 130 130)"
            strokeLinecap="butt"
          />
          <text x={130} y={138} textAnchor="middle" fontFamily={FONT.impact} fontSize={46} fill={C.ink}>
            {`${Math.round(donut * 100)}%`}
          </text>
          <text x={130} y={168} textAnchor="middle" fontFamily={FONT.mono} fontSize={13} letterSpacing={3} fill="rgba(18,18,24,0.6)">
            ON TARGET
          </text>
        </svg>

        <div style={{position: 'absolute', left: chart.x, top: chart.y - 60, opacity: prog(f, 4, 4)}}>
          <span style={mono(18, C.ink)}>MONTHLY REVENUE</span>
        </div>
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
          {[0, 0.25, 0.5, 0.75, 1].map((g) => (
            <line
              key={g}
              x1={chart.x}
              x2={chart.x + chart.w}
              y1={chart.y + chart.h - g * chart.h}
              y2={chart.y + chart.h - g * chart.h}
              stroke="rgba(18,18,24,0.12)"
            />
          ))}
          {BARS.map((v, i) => {
            const p = prog(f, 6 + i * 1.5, 8);
            const h = (v / 100) * chart.h * p;
            return (
              <rect
                key={i}
                x={chart.x + i * (bw + gap)}
                y={chart.y + chart.h - h}
                width={bw}
                height={h}
                fill={i === BARS.length - 1 ? C.orange : C.ink}
              />
            );
          })}
          <path
            d={path}
            fill="none"
            stroke={C.chartBlue}
            strokeWidth={5}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - lineP}
            strokeLinejoin="round"
          />
          {tip > 0 ? (
            <g transform={`translate(${pts[11][0]}, ${pts[11][1]}) scale(${tip})`}>
              <circle r={11} fill={C.chartBlue} stroke="#fff" strokeWidth={4} />
              <rect x={-60} y={-70} width={120} height={42} rx={21} fill={C.ink} />
              <text x={0} y={-42} textAnchor="middle" fontFamily={FONT.mono} fontSize={18} fill={C.white}>
                ↑ 38%
              </text>
            </g>
          ) : null}
          {'JFMAMJJASOND'.split('').map((m, i) => (
            <text
              key={i}
              x={chart.x + i * (bw + gap) + bw / 2}
              y={chart.y + chart.h + 34}
              textAnchor="middle"
              fontFamily={FONT.mono}
              fontSize={15}
              fill="rgba(18,18,24,0.55)"
            >
              {m}
            </text>
          ))}
        </svg>
      </AbsoluteFill>
    </Field>
  );
};
