import { createRouter, createWebHistory } from 'vue-router'
import PlaygroundLayout from '@/components/layout/PlaygroundLayout.vue'
import TheMainLayout from '@/components/layout/TheMainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TheMainLayout,
      redirect: { name: 'Home' },
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'Game',
          name: 'Game',
          component: () => import('@/views/GameView.vue'),
        },
      ],
    },
    {
      path: '/Playground',
      component: PlaygroundLayout,
      redirect: { name: 'CardPlayground' },
      children: [
        {
          path: 'Card',
          name: 'CardPlayground',
          meta: { testing: true },
          component: () => import('@/views/CardPlaygroundView.vue'),
        },
        {
          path: 'Deck',
          name: 'DeckPlayground',
          meta: { testing: true },
          component: () => import('@/views/DeckPlaygroundView.vue'),
        },
        {
          path: 'Game',
          name: 'GamePlayground',
          meta: { testing: true },
          component: () => import('@/views/GamePlaygroundView.vue'),
        },
      ],
    },
  ],
})

export default router
