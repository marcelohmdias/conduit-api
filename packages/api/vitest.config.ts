import { resolve } from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
      '@config': resolve(__dirname, './src/config'),
      '@core': resolve(__dirname, './src/core'),
      '@ports': resolve(__dirname, './src/ports'),
      '@adapters': resolve(__dirname, './src/adapters')
    }
  },
  test: {
    environment: 'node',
    globals: false,
    isolate: true,
    setupFiles: ['./tests/setup.ts']
  }
})
