import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@engine': path.resolve(__dirname, './engine'),
      '@data': path.resolve(__dirname, './data'),
      '@content': path.resolve(__dirname, './content'),
    },
  },
  test: {
    include: ['engine/**/*.test.ts', 'src/**/*.test.ts'],
    environment: 'node',
    environmentMatchGlobs: [['src/**', 'jsdom']],
  },
});
