import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: '列表',
  //   component: () => import('../doc/List.vue')
  // },
  {
    path: '/dialog',
    name: '弹窗组件',
    component: () => import('../views/Dialog/index.vue')
  },
  {
    path: '/svg',
    name: 'SVG案例',
    component: () => import('../views/SvgCase/index.vue')
  },
  {
    path: '/three',
    name: 'three.js案例',
    component: () => import('../views/ThreejsCase/index.vue')
  },
  {
    path: '/upload',
    name: '文件上传',
    component: () => import('../views/Upload/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
