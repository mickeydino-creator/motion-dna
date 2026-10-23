// Single source of truth for the Motion DNA style (see motion-dna STYLE_GUIDE §10).
export const W = 1920;
export const H = 1080;
export const FPS = 30;
export const BPM = 150;
export const BEAT = Math.round((60 / BPM) * FPS); // 12 f
export const BAR = BEAT * 4; // 48 f
export const DURATION = 450; // 15 s

export const C = {
  navy: '#0D1628',
  black: '#08090C',
  orange: '#FF5414',
  paper: '#EEF0EC',
  blue: '#1F3BFF',
  cyan: '#3FD2FF',
  ink: '#121218',
  white: '#F7F7F4',
  cream: '#F6E3C4',
  chartBlue: '#2B3BD9',
  magenta: '#E04AF0',
};

export const EASE = {
  snap: [0.16, 1, 0.3, 1],
  accel: [0.7, 0, 0.84, 0],
  drift: [0.45, 0, 0.55, 1],
} as const;

export const T = {
  snap: 8,
  letterStagger: 1.5,
  itemStagger: 2.5,
  whip: 4,
  transition: 6,
};

export const FONT = {
  impact: 'Archivo Black',
  accent: 'Instrument Serif',
  mono: 'JetBrains Mono',
  ui: 'Inter',
};

// Scene map: one showcase scene = one bar. Frames are absolute.
export const S = {
  boot: 0,
  title: BAR * 1, // 48
  type: BAR * 2, // 96
  data: BAR * 3, // 144
  code: BAR * 4, // 192
  chat: BAR * 5, // 240
  tools: BAR * 6, // 288
  end: BAR * 7, // 336
};

export const PROJECT_LABEL = 'CLAUDE - EXPLAINED 2026';
