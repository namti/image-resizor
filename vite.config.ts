import { resolve } from 'pathe';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [ dts({ insertTypesEntry: true }) ],
  build: {
    minify: 'terser',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ImageResizor',
      fileName: 'image-resizor',
      formats: [
        'umd',
        'iife',
        'es',
      ],
    },
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'ImageResizor',
      },
		 },
  },
});