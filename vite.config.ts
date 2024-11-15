import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    Markdown(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'packages')
    }
  },
  build: {
    target: 'esnext',
    sourcemap: false
  }
})
