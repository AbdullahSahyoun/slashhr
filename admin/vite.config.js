// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tagger from '@dhiwise/component-tagger';

export default defineConfig({
  plugins: [react(), tagger()],
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@components': path.resolve('./src/components'),
      '@pages': path.resolve('./src/pages'),
      '@assets': path.resolve('./src/assets'),
      '@constants': path.resolve('./src/constants'),
      '@styles': path.resolve('./src/styles'),
    },
  },
  server: {
    port: 4028,
    host: '0.0.0.0',
    strictPort: true,
    https: false, // ✅ HTTP only
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new'], // optional; keep/remove as you need
    proxy: {
      // Fastify API over HTTP
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/employee': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/docs': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // If you add a general API prefix later:
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      // },
    },
  },
});
