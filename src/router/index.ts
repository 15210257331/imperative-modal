import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '列表',
    component: () => import('../doc/List.vue')
  },
  {
    path: '/dialog',
    name: '弹窗',
    component: () => import('../doc/dialog/index.vue')
  },
  {
    path: '/:id',
    name: '详情',
    component: () => import('../doc/Detail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
