// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import clerk from '@clerk/astro';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react({ experimentalReactChildren: true })],
  adapter: vercel(),
  output: 'server',
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
