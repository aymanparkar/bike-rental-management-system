import { ref } from 'vue'
import useAxios from './useAxios'

const useCustomers = () => {
  const { axiosInstance } = useAxios()

  const loading = ref(false)
  const saving = ref(false)

  const customers = ref([])

  const fetchCustomers = async () => {
    try {
      loading.value = true
      const { data } = await axiosInstance.get('/customers')
      customers.value = data
    } finally {
      loading.value = false
    }
  }

  const addCustomer = async (customerName: string) => {
    await axiosInstance.post('/customer', {
      name: customerName
    })
    await fetchCustomers()
  }

  return { loading, saving, customers, fetchCustomers, addCustomer }
}

export default useCustomers
