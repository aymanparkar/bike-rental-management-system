<template>
  <MainLayout title="Bikes">
    <template #HEADER_ACTIONS>
      <v-btn size="small" @click="fetchBikes"> Refresh </v-btn>
      <v-btn color="primary" size="small" @click="doShowModal = true"> Add Bike </v-btn>
    </template>

    <DataTable :loading :headers :items="bikes" @edit="handleEdit" @delete="handleDelete" />

    <AddEditBikeModal
      v-model="doShowModal"
      v-model:form-data="bikeFormData"
      @save="handleAddBike"
      @refresh="fetchBikes"
    />

    <DeleteConfirmationDialog
      v-model="doShowConfimationDialog"
      title="Confirm"
      text="Are you sure you want to delete bike?"
      @confirm="confirmDeletion"
    />
  </MainLayout>
</template>

<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import useBikes, { type BikeFormModel } from '@/composables/useBikes'
import MainLayout from '@/layouts/MainLayout.vue'
import AddEditBikeModal from '@/components/AddEditBikeModal.vue'
import { ref, watch } from 'vue'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue'
import useAxios from '@/composables/useAxios'
import { toast } from 'vue-sonner'

const doShowModal = ref(false)
const doShowConfimationDialog = ref(false)
const { axiosInstance } = useAxios()
const { loading, bikes, fetchBikes } = useBikes()

const headers = ref([
  { key: 'brand_name', title: 'Brand' },
  { title: 'model', key: 'model' },
  { key: 'name', title: 'Name' },
  { title: 'seater', key: 'seater' },
  { title: 'engine', key: 'engine' },
  { title: 'Fuel Type', key: 'fuel_type' },
  { title: 'Mileage', key: 'mileage' },
  { title: 'Side Mirrors', key: 'has_side_mirrors' },
  { title: 'Reg. Number', key: 'bike_number' },
  { title: 'Rent Per Day', key: 'rent_per_day' },
  { title: 'Actions', key: 'actions' }
])

const selectedBike = ref<BikeFormModel | undefined>(undefined)

const bikeFormData = ref<BikeFormModel>({
  brand_id: '',
  model: '',
  name: '',
  seater: 0,
  engine: 0,
  fuel_type: '',
  mileage: 0,
  has_side_mirrors: false,
  bike_number: '',
  rent_per_day: 0
})

const handleAddBike = async () => {
  doShowModal.value = true
}

const handleEdit = (bike: BikeFormModel) => {
  const payload = {
    ...bike,
    has_side_mirrors: String(bike.has_side_mirrors) === 'Yes',
    mileage: Number(bike.og_mileage),
    engine: bike.og_engine,
    rent_per_day: Number(bike.og_rent_per_day)
  }
  bikeFormData.value = payload as BikeFormModel
  doShowModal.value = true
}
const handleDelete = (bike: BikeFormModel) => {
  doShowConfimationDialog.value = true
  selectedBike.value = {
    ...bike,
    has_side_mirrors: String(bike.has_side_mirrors) === 'Yes',
    mileage: Number(bike.og_mileage),
    engine: bike.og_engine,
    rent_per_day: Number(bike.og_rent_per_day)
  }
}

const confirmDeletion = async () => {
  try {
    doShowConfimationDialog.value = true
    await axiosInstance.delete(`/bike/${selectedBike.value?.id}`)
    toast.success('Bike deleted successfully')
    fetchBikes()
  } catch (e) {
    toast.error('Failed to delete bike')
  } finally {
    doShowConfimationDialog.value = false
    fetchBikes()
  }
}

watch(doShowModal, (v) => {
  if (!v) {
    bikeFormData.value = {
      brand_id: undefined,
      model: undefined,
      name: undefined,
      seater: 0,
      engine: 0,
      fuel_type: undefined,
      mileage: 0,
      has_side_mirrors: true,
      bike_number: undefined,
      rent_per_day: 0
    }
  }
})

fetchBikes()
</script>
