import { capitalize } from 'lodash'
import { ref } from 'vue'
import useAxios from './useAxios'

export type BikeFormModel = {
  id?: string | undefined
  brand_id: string | undefined
  model: string | undefined
  name: string | undefined
  seater: number
  engine: string | undefined
  og_engine?: string | undefined
  fuel_type: string | undefined
  mileage: number
  has_side_mirrors: boolean
  bike_number: string | undefined
  rent_per_day: number
  og_mileage?: number
  og_rent_per_day?: number
}

const useBikes = () => {
  const loading = ref(false)
  const saving = ref(false)
  const bikes = ref<BikeFormModel[]>([])
  const { axiosInstance } = useAxios()

  const fetchBikes = async () => {
    try {
      loading.value = true
      const { data } = await axiosInstance.get('/bikes')
      bikes.value = data.map((bike: any) => ({
        ...bike,
        engine: `${bike.engine} cc`,
        og_engine: bike.engine,
        fuel_type: capitalize(bike.fuel_type),
        mileage: `${bike.mileage} KM/L`,
        og_mileage: bike.mileage,
        has_side_mirrors: bike.has_side_mirrors ? 'Yes' : 'No',
        rent_per_day: `₹${Number(bike.rent_per_day).toFixed(2)}`,
        og_rent_per_day: bike.rent_per_day
      }))
    } finally {
      loading.value = false
    }
  }

  const fetchBikeBookings = async (bike_id: string) => {
    const { data } = await axiosInstance.get(`/bike/${bike_id}/bookings`)
    return data
  }

  const saveBike = async (bike: any) => {
    saving.value = true
    await axiosInstance.post('/bike', bike)
  }

  const updateBike = async (bike: any) => {
    saving.value = true
    await axiosInstance.put(`/bike/${bike.id}`, bike)
  }

  return { loading, saving, bikes, fetchBikes, fetchBikeBookings, saveBike, updateBike }
}

export default useBikes
