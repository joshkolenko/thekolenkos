// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';
import clerk from '@clerk/astro';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [clerk(), react({ experimentalReactChildren: true })],
  adapter: node({ mode: 'standalone' }),
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
  },
});
