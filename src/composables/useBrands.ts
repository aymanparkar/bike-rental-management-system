import { ref } from 'vue'
import useAxios from './useAxios'

const useBrands = () => {
  const { axiosInstance } = useAxios()

  const loading = ref(false)
  const saving = ref(false)

  const brands = ref<{ id: string; name: string }[]>([])

  const fetchBrands = async () => {
    try {
      loading.value = true
      const { data } = await axiosInstance.get('/brands')
      brands.value = data
    } finally {
      loading.value = false
    }
  }

  const saveBrand = async (brandName: string) => {
    await axiosInstance.post('/brand', {
      name: brandName
    })
    await fetchBrands()
  }

  return { loading, saving, brands, fetchBrands, saveBrand }
}

export default useBrands
