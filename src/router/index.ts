import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '使用文档',
    component: () => import('../doc/guide/index.md')
  },
  {
    path: '/dialog',
    name: '组件示例',
    component: () => import('../doc/dialog/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
