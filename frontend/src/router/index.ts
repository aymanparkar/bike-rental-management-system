import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

export enum BaseRouteNames {
  NOT_FOUND = 'not-found',
  LOGIN = 'login',
  SIGN_UP = 'sign-up',
  HOME = 'home',
  BOOKINGS = 'bookings',
  BOOKING_CONFIRMATION = 'booking-confirmation',
  BRANDS = 'brands',
  BIKES = 'bikes',
  CUSTOMERS = 'customers',
  PROFILE = 'profile'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: BaseRouteNames.NOT_FOUND,
      component: () => import('@/views/NotFoundView.vue')
    },
    {
      path: '/login',
      name: BaseRouteNames.LOGIN,
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/sign-up',
      name: BaseRouteNames.SIGN_UP,
      component: () => import('@/views/CreateAccountView.vue')
    },
    {
      path: '/',
      name: BaseRouteNames.HOME,
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/bookings',
      name: BaseRouteNames.BOOKINGS,
      component: () => import('@/views/BookingsView.vue')
    },
    {
      path: '/booking-confirmation/:id',
      name: BaseRouteNames.BOOKING_CONFIRMATION,
      component: () => import('@/views/BookingConfirmation.vue')
    },
    {
      path: '/brands',
      name: BaseRouteNames.BRANDS,
      component: () => import('@/views/BrandsView.vue')
    },
    {
      path: '/bikes',
      name: BaseRouteNames.BIKES,
      component: () => import('@/views/BikesView.vue')
    },
    {
      path: '/profile',
      name: BaseRouteNames.PROFILE,
      component: () => import('@/views/UserProfile.vue')
    },
    {
      path: '/customers',
      name: BaseRouteNames.CUSTOMERS,
      component: () => import('@/views/CustomersView.vue')
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  if (authStore.isLoggedIn) {
    switch (to.name) {
      case BaseRouteNames.LOGIN:
        return next({ name: BaseRouteNames.HOME })
      case BaseRouteNames.SIGN_UP:
        return next({ name: BaseRouteNames.HOME })
      default:
        return next()
    }
  } else {
    switch (to.name) {
      case BaseRouteNames.SIGN_UP:
        return next()
      case BaseRouteNames.LOGIN:
        return next()
      default:
        return next({ name: BaseRouteNames.LOGIN })
    }
  }
})

export default router
