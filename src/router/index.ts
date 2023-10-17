import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dialog'
  },
  {
    path: '/dialog',
    name: '弹窗组件',
    component: () => import('../views/Dialog/index.vue')
  },
  {
    path: '/vue',
    name: 'vue',
    component: () => import('../views/VueCase/index.vue')
  },
  {
    path: '/canvas',
    name: 'canvas',
    component: () => import('../views/CanvasCase/index.vue')
  },
  {
    path: '/svg',
    name: 'SVG',
    component: () => import('../views/SvgCase/index.vue')
  },
  {
    path: '/three',
    name: 'three.js',
    component: () => import('../views/ThreejsCase/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
