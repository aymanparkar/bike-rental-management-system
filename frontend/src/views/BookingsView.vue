<template>
  <MainLayout title="Bookings">
    <template #HEADER_ACTIONS>
      <v-btn size="small" @click="fetchBookings"> Refresh </v-btn>
      <v-btn
        v-if="authStore.user?.type === 'user'"
        color="primary"
        size="small"
        @click="doShowModal = true"
      >
        Create Booking
      </v-btn>
    </template>

    <DataTable :loading :headers :items="bookings" />

    <CreateUpdateBookingModal v-model="doShowModal" @refresh="fetchBookings" />
  </MainLayout>
</template>

<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import useBookings from '@/composables/useBookings'
import MainLayout from '@/layouts/MainLayout.vue'
import CreateUpdateBookingModal from '@/components/CreateUpdateBookingModal.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const doShowModal = ref(false)

const { loading, bookings, fetchBookings } = useBookings()

const authStore = useAuthStore()

const headers = ref([
  { key: 'start_date', title: 'Start Date & Time', width: '130px' },
  { key: 'end_date', title: 'End Date & Time', width: '130px' },
  { key: 'brand_name', title: 'Brand', width: '100px' },
  { key: 'bike_model', title: 'Model', width: '100px' },
  { key: 'bike_name', title: 'Bike' },
  { key: 'bike_number', title: 'Reg. Number' },
  { key: 'customer_name', title: 'Customer Name', width: '150px' },
  { key: 'customer_phone', title: 'Customer Phone' },
  { key: 'booking_duration', title: 'Booking Duration' },
  { key: 'rent_per_day', title: 'Rent per day' },
  { key: 'booking_amount', title: 'Booking Amount' },
  { key: 'is_paid', title: 'Payment Status' }
])

fetchBookings()
</script>
