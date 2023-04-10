import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
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
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
