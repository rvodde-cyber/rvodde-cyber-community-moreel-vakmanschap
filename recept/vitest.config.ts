import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@engine': path.resolve(__dirname, './engine'),
      '@data': path.resolve(__dirname, './data'),
    },
  },
  test: {
    include: ['engine/**/*.test.ts'],
  },
});
