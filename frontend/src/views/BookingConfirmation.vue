<template>
  <div v-if="!isPaymentFailed" class="flex items-center w-screen h-screen">
    <div class="bill-container w-full">
      <h1 class="text-center font-bold text-2xl mb-6">BOOKING INVOICE</h1>
      <table class="w-full border border-gray-400">
        <tbody>
          <tr>
            <td class="font-semibold border-b border-gray-400 py-2">Customer Name:</td>
            <td class="border-b border-gray-400 py-2">{{ booking.customer_name }}</td>
          </tr>
          <tr>
            <td class="font-semibold border-b border-gray-400 py-2">Customer Phone:</td>
            <td class="border-b border-gray-400 py-2">{{ booking.customer_phone }}</td>
          </tr>
          <tr>
            <td class="font-semibold border-b border-gray-400 py-2">Bike Name:</td>
            <td class="border-b border-gray-400 py-2">{{ booking.bike_name }}</td>
          </tr>
          <tr>
            <td class="font-semibold border-b border-gray-400 py-2">Bike Model:</td>
            <td class="border-b border-gray-400 py-2">{{ booking.bike_model }}</td>
          </tr>
          <tr>
            <td class="font-semibold border-b border-gray-400 py-2">Brand Name:</td>
            <td class="border-b border-gray-400 py-2">{{ booking.brand_name }}</td>
          </tr>
          <tr>
            <td class="font-semibold border-b border-gray-400 py-2">Bike Number:</td>
            <td class="border-b border-gray-400 py-2">{{ booking.bike_number }}</td>
          </tr>
          <tr>
            <td class="font-semibold border-b border-gray-400 py-2">Start Date:</td>
            <td class="border-b border-gray-400 py-2">
              {{ booking.start_date }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold border-b border-gray-400 py-2">End Date:</td>
            <td class="border-b border-gray-400 py-2">
              {{ booking.end_date }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold border-b border-gray-400 py-2">Rent Per Day:</td>
            <td class="border-b border-gray-400 py-2">{{ booking.rent_per_day }}</td>
          </tr>
          <tr>
            <td class="font-semibold border-b border-gray-400 py-2">Booking Duration:</td>
            <td class="border-b border-gray-400 py-2">{{ booking.booking_duration }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="font-semibold py-2">Total Amount:</td>
            <td class="py-2 font-semibold">₹{{ totalAmount.toFixed(2) }}</td>
          </tr>
        </tfoot>
      </table>

      <div class="mt-6 w-full justify-center flex">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="$router.push({ name: BaseRouteNames.BOOKINGS })"
        >
          Go to Bookings
        </button>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center w-screen h-screen">
    <div class="bill-container w-full">
      <h1 class="text-center font-bold text-2xl mb-6">PAYMENT FAILED</h1>

      <div class="mt-6 w-full justify-center flex">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="$router.push({ name: BaseRouteNames.BOOKINGS })"
        >
          Go to Bookings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { BaseRouteNames } from '@/router'
import { useRoute } from 'vue-router'
import useBookings from '@/composables/useBookings'

const route = useRoute()

const booking = ref()
const isPaymentFailed = ref(false)

const { fetchBookings, getBookingById } = useBookings()
const init = async () => {
  await fetchBookings()
  const fetchedBooking = getBookingById(String(route.params.id))
  if (!fetchedBooking) {
    isPaymentFailed.value = true
  } else booking.value = getBookingById(String(route.params.id))
}
init()

const totalAmount = computed(() => {
  return parseInt(booking.value.og_booking_amount)
})
</script>

<style scoped>
.bill-container {
  max-width: 600px;
  margin: 0 auto;
}

table {
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #e2e8f0;
}

th {
  background-color: #f2f2f2;
}

td {
  padding: 8px;
}
</style>
