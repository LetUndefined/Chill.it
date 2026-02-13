import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainLayout from '@/layout/MainLayout.vue'
import { supabase } from '@/stores/supaBase'
import { useAdminStore } from '@/stores/AdminStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/listview',
          name: 'listview',
          component: () => import('@/views/ListView.vue'),
        },
        {
          path: '/adminview',
          name: 'adminview',
          component: () => import('@/views/AdminView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignUpView.vue'),
    },
  ],
})

// Handle 404 redirect from GitHub Pages
router.isReady().then(() => {
  const redirect = sessionStorage.getItem('redirect')
  if (redirect) {
    sessionStorage.removeItem('redirect')
    router.replace(redirect)
  }
})

router.beforeEach(async (to) => {
  const adminStore = useAdminStore()
  const { adminCheck, isAdmin } = adminStore

  const { data, error } = await supabase.auth.getUser()
  if (data.user?.id) {
    await adminCheck(data.user?.id)
    if (!isAdmin && to.name === 'adminview') {
      return { name: 'home' }
    }
  }
  if ((error || !data.user) && to.name !== 'login' && to.name !== 'signup') {
    return { name: 'login' }
  }
  if (data.user && !error && (to.name === 'login' || to.name === 'signup')) {
    return { name: 'home' }
  }
})

export default router
