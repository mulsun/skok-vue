import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssPresetEnv from 'postcss-preset-env';
// import path from 'path';
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [postcssPresetEnv({ stage: 0 })],
    },
  },
  build: {
    outDir: 'public',
  },
  publicDir: 'assets',
});