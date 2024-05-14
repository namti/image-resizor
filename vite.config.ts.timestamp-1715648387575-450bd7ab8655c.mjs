// vite.config.ts
import { resolve } from "file:///Users/inboxdesign/Documents/Jasper/image-resizor/node_modules/pathe/dist/index.mjs";
import { defineConfig } from "file:///Users/inboxdesign/Documents/Jasper/image-resizor/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/inboxdesign/Documents/Jasper/image-resizor/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/inboxdesign/Documents/Jasper/image-resizor";
var vite_config_default = defineConfig({
  plugins: [dts({
    insertTypesEntry: true
  })],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "ImageResizor",
      // the proper extensions will be added
      fileName: "image-resizor",
      formats: ["cjs", "umd", "iife", "es"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaW5ib3hkZXNpZ24vRG9jdW1lbnRzL0phc3Blci9pbWFnZS1yZXNpem9yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvaW5ib3hkZXNpZ24vRG9jdW1lbnRzL0phc3Blci9pbWFnZS1yZXNpem9yL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9pbmJveGRlc2lnbi9Eb2N1bWVudHMvSmFzcGVyL2ltYWdlLXJlc2l6b3Ivdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogWyBkdHMoe1xuICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gIH0pIF0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICAvLyBDb3VsZCBhbHNvIGJlIGEgZGljdGlvbmFyeSBvciBhcnJheSBvZiBtdWx0aXBsZSBlbnRyeSBwb2ludHNcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgbmFtZTogJ0ltYWdlUmVzaXpvcicsXG4gICAgICAvLyB0aGUgcHJvcGVyIGV4dGVuc2lvbnMgd2lsbCBiZSBhZGRlZFxuICAgICAgZmlsZU5hbWU6ICdpbWFnZS1yZXNpem9yJyxcbiAgICAgIGZvcm1hdHM6IFsnY2pzJywgJ3VtZCcsICdpaWZlJywgJ2VzJ10sXG4gICAgfSxcbiAgfSxcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVSxTQUFTLGVBQWU7QUFDN1YsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBRmhCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBRSxJQUFJO0FBQUEsSUFDYixrQkFBa0I7QUFBQSxFQUNwQixDQUFDLENBQUU7QUFBQSxFQUNILE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQTtBQUFBLE1BRUgsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUE7QUFBQSxNQUVOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxPQUFPLE9BQU8sUUFBUSxJQUFJO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
