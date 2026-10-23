// Renders QC stills (scene midpoints + transition midpoints) from one bundle.
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';

const frames = process.argv.slice(2).map(Number);
const browserExecutable = process.env.REMOTION_BROWSER;
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id: 'ClaudeExplainer', browserExecutable});
for (const frame of frames) {
  await renderStill({composition, serveUrl, frame, output: `out/stills/f${String(frame).padStart(3, '0')}.jpg`, imageFormat: 'jpeg', scale: 0.5, browserExecutable});
  console.log('still', frame);
}
