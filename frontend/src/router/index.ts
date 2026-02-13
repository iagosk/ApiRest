import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

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
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/admin/',
      name: 'admin',
      component: () => import('@/views/UsersView.vue'),
    },
    {
      path: '/users/users-edit/:id',
      name: 'user-info',
      component: () => import('@/views/UserEditView.vue'),
      props: true,
    },
    {
      path: '/register-user',
      name: 'register-user',
      component: () => import('@/views/RegisterUserView.vue'),
    },
    {
      path: '/login-user',
      name: 'login-user',
      component: () => import('@/views/LoginUserView.vue'),
    },
  ],
})

export default router
