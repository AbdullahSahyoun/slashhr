// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tagger from '@dhiwise/component-tagger';
import fs from 'fs';

// Allow toggling HTTPS via env (default true for dev convenience)
const USE_HTTPS = (process.env.VITE_HTTPS ?? 'true').toLowerCase() === 'true';
const KEY_PATH = process.env.VITE_SSL_KEY || '../certs/key.pem';
const CERT_PATH = process.env.VITE_SSL_CERT || '../certs/cert.pem';

let httpsConfig = false;
if (USE_HTTPS) {
  try {
    httpsConfig = {
      key: fs.readFileSync(KEY_PATH),
      cert: fs.readFileSync(CERT_PATH),
    };
    // eslint-disable-next-line no-console
    console.log(`🔐 Vite HTTPS enabled (key: ${KEY_PATH}, cert: ${CERT_PATH})`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('⚠️  Could not read SSL certs for Vite. Falling back to HTTP.', e.message);
    httpsConfig = false;
  }
}

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
    https: httpsConfig, // self-signed HTTPS for dev
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new'],
    proxy: {
      // Fastify API (your prefixes)
      '/auth': {
        target: 'https://localhost:3000',
        changeOrigin: true,
        secure: false, // accept self-signed cert from Fastify
      },
      '/employee': {
        target: 'https://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      // Optional: view Swagger via https://localhost:4028/docs
      '/docs': {
        target: 'https://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      // If you later add a general /api prefix, keep this:
      // '/api': {
      //   target: 'https://localhost:3000',
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
  },
});
