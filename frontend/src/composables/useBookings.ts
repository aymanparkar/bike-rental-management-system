import { ref } from 'vue'
import useAxios from './useAxios'
import dayjs from 'dayjs'
import { useAuthStore } from '@/stores/auth'
// import { useAuthStore } from '@/stores/auth'

const useBookings = () => {
  const { axiosInstance } = useAxios()
  // const authStore = useAuthStore()
  const loading = ref(false)
  const bookings = ref([])

  const fetchBookings = async () => {
    try {
      const authStore = useAuthStore()

      loading.value = true
      const { data } = await axiosInstance.get(
        authStore.user?.type === 'admin' ? '/bookings' : `/user-bookings/${authStore.user?.id}`
      )

      bookings.value = data.map((booking: any) => {
        const start_date = dayjs(booking.start_date)
        const end_date = dayjs(booking.end_date)

        return {
          ...booking,
          start_date: start_date.format('DD-MM-YYYY hh:mm A'),
          end_date: end_date.format('DD-MM-YYYY hh:mm A'),
          rent_per_day: `₹${Number(booking.rent_per_day).toFixed(2)}`,
          booking_duration: `${end_date.diff(start_date, 'days')} DAY(S)`,
          booking_amount: `₹${Number(end_date.diff(start_date, 'days') * booking.rent_per_day).toFixed(2)}`,
          is_paid: booking.is_paid ? 'PAID' : 'UNPAID'
        }
      })
    } finally {
      loading.value = false
    }
  }

  const createBooking = async (booking: any) => {
    try {
      loading.value = true
      const initiationResponse = await axiosInstance.post('/initiate', booking)
      window.location.replace(initiationResponse.data.charge.transaction.url)
      await fetchBookings()
    } finally {
      loading.value = false
    }
  }

  return { loading, bookings, fetchBookings, createBooking }
}

export default useBookings
