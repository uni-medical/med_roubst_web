import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://uni-medical.github.io',
  base: '/med_roubst_web',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  build: {
    format: 'file',
    assets: 'assets',
  },
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },
  compressHTML: true,
});
