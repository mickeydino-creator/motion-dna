import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setCrf(16);
Config.setBrowserExecutable(
  process.env.REMOTION_BROWSER ?? null,
);
