import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import Markdown from 'vite-plugin-md';
import libCss from './build/insertCss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(
      {
        include: [/\.vue$/, /\.md$/],
      }
    ),
    vueJsx(),
    Markdown(),
    {
      apply: 'build',
      enforce: 'post',
      ...libCss(),
    }
  ],
  build: {
    target: "esnext",
    outDir: 'lib',
    cssCodeSplit: true,
    lib: {
      entry: "packages/dialog/index.ts",
      name: "vue3-dialog",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `vue3-dialog.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
