<template>
  <MainLayout title="Brands">
    <template #HEADER_ACTIONS>
      <v-btn size="small" @click="fetchBrands"> Refresh </v-btn>
      <v-btn color="primary" size="small" @click="doShowModal = true"> Add Brand </v-btn>
    </template>

    <DataTable :loading :headers :items="brands" />

    <AddEditBrandModal v-model="doShowModal" @save="handleAddBrand">
      <v-text-field
        v-model="brandName"
        class="w-full"
        label="Brand Name*"
        variant="outlined"
        required
      />
    </AddEditBrandModal>
  </MainLayout>
</template>

<script setup lang="ts">
import AddEditBrandModal from '@/components/AddEditBrandModal.vue'
import DataTable from '@/components/DataTable.vue'
import useBrands from '@/composables/useBrands'
import MainLayout from '@/layouts/MainLayout.vue'
import { ref } from 'vue'

const doShowModal = ref(false)
const headers = ref([{ key: 'name', title: 'Name' }])

const { loading, brands, fetchBrands, saveBrand } = useBrands()

const brandName = ref('')

const handleAddBrand = async () => {
  try {
    await saveBrand(brandName.value)
    doShowModal.value = false
    brandName.value = ''
  } catch (e) {
    console.error(e)
  }
}

fetchBrands()
</script>
