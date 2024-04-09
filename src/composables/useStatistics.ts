import { ref } from 'vue'
import useAxios from './useAxios'

const useStatistics = () => {
  const { axiosInstance } = useAxios()

  const loading = ref(false)

  const stats = ref<{ name: string; value: string }[]>([])

  const fetchStats = async () => {
    try {
      loading.value = true
      const { data } = await axiosInstance.get('/dashboard-stats')
      stats.value = data
    } finally {
      loading.value = false
    }
  }

  return { loading, stats, fetchStats }
}

export default useStatistics
