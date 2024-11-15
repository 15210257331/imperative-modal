/// <reference types="vite/client" />

declare module '*.md' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}
