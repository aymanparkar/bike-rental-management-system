import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type User = {
  id: string
  name: string
  phone: string
  userName: string
  type: 'admin' | 'user'
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const isLoggedIn = computed(() => !!user.value)

    const logout = () => {
      user.value = null
    }

    return { user, isLoggedIn, logout }
  },
  {
    persist: true
  }
)
