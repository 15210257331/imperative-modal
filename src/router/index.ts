import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/vue'
  },
  {
    path: '/dialog',
    name: '弹窗组件',
    meta: {
      show: true
    },
    component: () => import('../views/Dialog/index.vue')
  },
  {
    path: '/vue',
    name: 'vue',
    meta: {
      show: true
    },
    component: () => import('../views/VueCase/index.vue')
  },
  {
    path: '/canvas',
    name: 'canvas',
    meta: {
      show: true
    },
    component: () => import('../views/CanvasCase/index.vue')
  },
  {
    path: '/echarts',
    name: 'echarts',
    meta: {
      show: false
    },
    component: () => import('../views/EchartsCase/index.vue')
  },
  {
    path: '/svg',
    name: 'SVG',
    meta: {
      show: true
    },
    component: () => import('../views/SvgCase/index.vue')
  },
  {
    path: '/three',
    name: 'three.js',
    meta: {
      show: true
    },
    component: () => import('../views/ThreejsCase/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
