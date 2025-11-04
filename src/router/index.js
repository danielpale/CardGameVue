import { createRouter, createWebHistory } from 'vue-router'
import TheMainLayout from '@/components/layout/TheMainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TheMainLayout,
      redirect: { name: 'CardPlayground' },
      children: [
        {
          path: 'CardPlayground',
          name: 'CardPlayground',
          component: () => import('@/views/CardPlaygroundView.vue'),
        },
      ],
    },
  ],
})

export default router
