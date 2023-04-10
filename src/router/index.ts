import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '使用文档',
    component: () => import('../doc/guide/index.md')
  },
  {
    path: '/dialog',
    name: '弹窗组件',
    component: () => import('../doc/dialog/index.vue')
  },
  {
    path: '/code',
    name: '图片验证码',
    component: () => import('../doc/verify/index.vue')
  },
  {
    path: '/test',
    name: '日历组件',
    component: () => import('../doc/calendar/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
