<template>
  <MainLayout title="Customers">
    <template #HEADER_ACTIONS>
      <v-btn size="small" @click="fetchCustomers"> Refresh </v-btn>
    </template>

    <DataTable :loading :headers :items="customers" />
  </MainLayout>
</template>

<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import useCustomers from '@/composables/useCustomers'
import MainLayout from '@/layouts/MainLayout.vue'
import { ref } from 'vue'

const { loading, customers, fetchCustomers } = useCustomers()

const headers = ref([
  { key: 'name', title: 'Name' },
  // { key: 'phone', title: 'Phone' },
  // { key: 'email', title: 'Email' },
  { key: 'no_of_bookings', title: 'No. of Bookings' }
])

fetchCustomers()
</script>
