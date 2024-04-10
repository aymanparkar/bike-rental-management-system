import { ref } from 'vue'
import useAxios from './useAxios'
import { useAuthStore } from '@/stores/auth'

const useStatistics = () => {
  const authStore = useAuthStore()
  const { axiosInstance } = useAxios()

  const loading = ref(false)

  const stats = ref<{ name: string; value: string }[]>([])

  const fetchStats = async () => {
    try {
      loading.value = true
      const { data } = await axiosInstance.get(
        authStore.user?.type === 'admin' ? '/dashboard-stats' : `/user-stats/${authStore.user?.id}`
      )
      stats.value = data
    } finally {
      loading.value = false
    }
  }

  return { loading, stats, fetchStats }
}

export default useStatistics
