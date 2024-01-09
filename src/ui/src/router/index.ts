import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TournamentsView from '../views/TournamentsView.vue'
import SignInView from '../views/SignInView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/tournaments',
      name: 'Tournaments',
      component: TournamentsView
    },
    {
      path: '/sign-in',
      name: 'Sign-in',
      component: SignInView
    }
  ]
})

export default router
