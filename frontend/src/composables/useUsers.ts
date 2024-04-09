import { ref } from 'vue'
import useAxios from './useAxios'

const useUsers = () => {
  const { axiosInstance } = useAxios()

  const loading = ref(false)
  const saving = ref(false)

  const users = ref([])

  const fetchUsers = async () => {
    try {
      loading.value = true
      const { data } = await axiosInstance.get('/users')
      users.value = data
    } finally {
      loading.value = false
    }
  }

  return { loading, saving, users, fetchUsers }
}

export default useUsers
