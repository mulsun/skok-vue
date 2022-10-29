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
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
});