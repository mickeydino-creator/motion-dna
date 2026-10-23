// Motion DNA tokens for a Lovable project: brand values come from PROJECT_BRIEF.md.
// Motion values (BPM, EASE, T) are unchanged Motion DNA CORE.
export const FPS = 30;
export const BPM = 150;
export const BEAT = Math.round((60 / BPM) * FPS);
export const BAR = BEAT * 4;

export const C = {
  dark: '#1B1B1B', // field.dark = Lovable Black [V] Brand Hub Colors
  light: '#F7F4ED', // field.light = Lovable Creme [V] Brand Hub Colors
  cool: '#4B73FF', // field.cool = Lovable Blue [V] Brand Hub Colors
  signal: '#FF0178', // signal = Lovable Pink [V] Brand Hub Colors
  ink: '#1B1B1B', // [V]
  white: '#F7F4ED', // [V]
};

// field.brand = Lovable "Horizontal Full" gradient [V] Brand Hub Colors & Gradients (key stops).
export const BRAND_GRADIENT =
  'linear-gradient(to right, #4F88FF 0%, #B0ACFE 29%, #FD49A8 52%, #FA1F41 67%, #FF8F1B 100%)';

export const EASE = {
  snap: [0.16, 1, 0.3, 1],
  accel: [0.7, 0, 0.84, 0],
  drift: [0.45, 0, 0.55, 1],
} as const;

export const FONT = {
  impact: 'Inter Display', // [S] substitute for Camera Plain Bold (licensed to Lovable Labs)
  accent: 'Instrument Serif', // [S] Motion DNA accent role (Lovable has no serif)
  mono: 'JetBrains Mono', // [S] Motion DNA technical role
  ui: 'Inter', // [S] substitute for Camera Plain
};

export const LOGO = {
  onLight: 'assets/brand/lockup-black-DoV_IwHG.png', // [V] Brand Hub "Logo - Black"
  onDark: 'assets/brand/lockup-creme-BmOocTKd.png', // [V] Brand Hub "Logo - Creme"
  mark: 'assets/brand/lovable-logo-mark-Ccij-USX.png', // [V] gradient heart = the dot motif
};
