import { createRouter, createWebHashHistory } from "vue-router";
 
const routes = [
  {
    path: '/',
    name: '使用文档',
    component: () => import('../views/doc/index.vue')
  },
  {
    path: '/examples',
    name: '组件demo',
    component: () => import('../views/examples/index.md')
  }
]
 
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
 
export default router;