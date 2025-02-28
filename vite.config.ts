import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
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
        details: 'http://localhost:3001/assets/remoteEntry.js',
        history: 'http://localhost:3002/assets/remoteEntry.js',
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
