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
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: () => import('@/views/UsersView.vue'),
    },
    {
      path: '/admin/users-edit/:id',
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
    {
      path: '/user-dashboard',
      name: 'user-dashboard',
      meta: { requiresAuth: true },
      component: () => import('@/views/DashboardView.vue'),
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')

  if(to.meta.requiresAuth && !token) {
    next('login-user')
  }else {
    next()
  }
})

export default router
