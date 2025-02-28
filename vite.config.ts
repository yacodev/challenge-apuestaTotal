import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

const DETAILS_URL = process.env.VITE_DETAILS_URL || 'http://localhost:3001';
const HISTORY_URL = process.env.VITE_HISTORY_URL || 'http://localhost:3002';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      filename: 'remoteEntry.js',
      exposes: {
        './pokemonStore': './src/store/pokemonStore/index.ts',
        './pokemonServices': './src/services/pokemonServices.ts',
      },
      remotes: {
        details: `${DETAILS_URL}/assets/remoteEntry.js`,
        history: `${HISTORY_URL}/assets/remoteEntry.js`,
      },
      shared: ['react', 'react-dom', 'zustand'],
    }),
    tailwindcss(),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
