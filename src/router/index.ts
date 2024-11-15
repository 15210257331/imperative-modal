import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dialog'
  },
  {
    path: '/dialog',
    name: '弹窗组件',
    meta: {
      show: true
    },
    component: () => import('../views/Dialog/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
