import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@engine': path.resolve(__dirname, './engine'),
      '@data': path.resolve(__dirname, './data'),
      '@content': path.resolve(__dirname, './content'),
    },
  },
  build: {
    target: ['safari12', 'es2018'],
  },
});
