import {continueRender, delayRender} from 'remotion';
import archivo from '@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff2';
import serifItalic from '@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2';
import mono400 from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2';
import mono700 from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2';
import inter400 from '@fontsource/inter/files/inter-latin-400-normal.woff2';
import inter600 from '@fontsource/inter/files/inter-latin-600-normal.woff2';
import {FONT} from './tokens';

const faces: [string, string, FontFaceDescriptors][] = [
  [FONT.impact, archivo, {weight: '400'}],
  [FONT.accent, serifItalic, {style: 'italic', weight: '400'}],
  [FONT.mono, mono400, {weight: '400'}],
  [FONT.mono, mono700, {weight: '700'}],
  [FONT.ui, inter400, {weight: '400'}],
  [FONT.ui, inter600, {weight: '600'}],
];

let loaded = false;
export const ensureFonts = () => {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;
  const handle = delayRender('fonts');
  Promise.all(
    faces.map(([family, url, desc]) => {
      const f = new FontFace(family, `url(${url})`, desc);
      (document.fonts as unknown as {add: (f: FontFace) => void}).add(f);
      return f.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch((e) => {
      console.error(e);
      continueRender(handle);
    });
};
