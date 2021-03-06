import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'firecomponents',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  globalStyle: 'src/global/theme.css',
  enableCache: false
};
