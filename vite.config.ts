import { resolve } from 'pathe'
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [ dts({
    insertTypesEntry: true,
  }) ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ImageResizor',
      // the proper extensions will be added
      fileName: 'image-resizor',
      formats: ['cjs', 'umd', 'iife', 'es'],
    },
  },
})