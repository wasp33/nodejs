import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SampleView from '../views/SampleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/sample',
      name: 'sample',
      component: () => import('../views/SampleView.vue'),
    },
    {
      path: '/sample2',
      name: 'sample2',
      component: () => import('../views/Sample2View.vue'),
    },
    {
      path: '/nest',
      name: 'nest',
      component: () => import('../views/NestView.vue'),
      children: [
        {
          path: '',
          name: 'nest-child-default',
          component: () => import('../views/NestChildDefaultView.vue'),
        },
        {
          path: 'child',
          name: 'nest-child',
          component: () => import('../views/NestChildView.vue'),
        },
        {
          path: ':id',

          component: () => import('../views/DynaView.vue'),
        },
      ]
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
