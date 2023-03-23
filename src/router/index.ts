import { createRouter, createWebHashHistory } from "vue-router";
 
const routes = [
  {
    path: '/',
    name: '组件页面',
    component: () => import('@/home.vue'),
    children: [
      {
        path: '/dialog',
        name: '弹窗',
        component: () => import('@/examples/dialog/index.md')
      },
      {
        path: '/input',
        name: '验证码',
        component: () => import('@/examples/verification-code/index.md')
      }
    ]
  }
]
 
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
 
export default router;