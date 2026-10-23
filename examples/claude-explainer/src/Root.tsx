import React from 'react';
import {AbsoluteFill, Composition, Sequence, useCurrentFrame} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {BEAT, C, DURATION, FPS, H, S, W} from './tokens';
import {HUD} from './lib';
import {ensureFonts} from './fonts';
import {Boot} from './scenes/Boot';
import {Title} from './scenes/Title';
import {KineticType} from './scenes/KineticType';
import {Data} from './scenes/Data';
import {Code} from './scenes/Code';
import {Chat} from './scenes/Chat';
import {Tools} from './scenes/Tools';
import {End} from './scenes/End';
import {ColumnDissolve, CollapseBloom, Flash, Portal, RadialBurst, SlabWipe} from './transitions';

ensureFonts();

const TOTAL = 6;
// HUD values per absolute frame range: [start, end, scene, tag, color]
const HUD_MAP: [number, number, number, string, string][] = [
  [S.title + 4, S.type, 1, 'IDENTITY / TYPE', C.ink],
  [S.type, S.type + BEAT, 2, 'KINETIC TYPOGRAPHY', C.ink],
  [S.type + BEAT, S.type + BEAT * 3, 2, 'KINETIC TYPOGRAPHY', C.white],
  [S.type + BEAT * 3, S.data, 2, 'KINETIC TYPOGRAPHY', C.ink],
  [S.data, S.code - 4, 3, 'DATA / ANALYSIS', C.ink],
  [S.code - 4, S.chat, 4, 'CODE / AGENTIC', C.white],
  [S.chat, S.tools, 5, 'UI / CONVERSATION', C.white],
  [S.tools, S.end, 6, 'TOOLS / CONNECTORS', C.ink],
];

const HUDLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const row = HUD_MAP.find(([a, b]) => frame >= a && frame < b);
  if (!row) return null;
  return <HUD scene={row[2]} total={TOTAL} tag={row[3]} color={row[4]} />;
};

const Reel: React.FC = () => (
  <AbsoluteFill style={{background: C.black}}>
    <CameraMotionBlur shutterAngle={270} samples={6}>
      <AbsoluteFill>
        <Sequence from={S.boot} durationInFrames={S.title} name="Boot">
          <Boot />
        </Sequence>
        <Sequence from={S.title} durationInFrames={50} name="Title">
          <Title />
        </Sequence>
        <Sequence from={S.type} durationInFrames={48} name="Kinetic type">
          <KineticType />
        </Sequence>
        <Sequence from={S.data} durationInFrames={48} name="Data">
          <Data />
        </Sequence>
        <Sequence from={S.code} durationInFrames={48} name="Code">
          <Code />
        </Sequence>
        <Sequence from={S.chat} durationInFrames={48} name="Chat">
          <Chat />
        </Sequence>
        <Sequence from={S.tools} durationInFrames={48} name="Tools">
          <Tools />
        </Sequence>
        <Sequence from={S.end} durationInFrames={DURATION - S.end} name="End">
          <End />
        </Sequence>

        <Sequence from={S.title - 2} durationInFrames={14} name="T: line -> flash">
          <Flash />
        </Sequence>
        <Sequence from={S.data - 3} durationInFrames={14} name="T: slab wipe">
          <SlabWipe />
        </Sequence>
        <Sequence from={S.code - 9} durationInFrames={14} name="T: column dissolve">
          <ColumnDissolve />
        </Sequence>
        <Sequence from={S.chat - 8} durationInFrames={12} name="T: radial burst">
          <RadialBurst />
        </Sequence>
        <Sequence from={S.tools - 2} durationInFrames={12} name="T: collapse bloom">
          <CollapseBloom />
        </Sequence>
        <Sequence from={S.end - 8} durationInFrames={14} name="T: portal">
          <Portal />
        </Sequence>
      </AbsoluteFill>
    </CameraMotionBlur>
    <HUDLayer />
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <Composition id="ClaudeExplainer" component={Reel} durationInFrames={DURATION} fps={FPS} width={W} height={H} />
);
