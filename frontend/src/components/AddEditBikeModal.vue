<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card :title="`${bikeFormData.id ? 'Edit' : 'Add'} Bike`">
        <v-card-text>
          <form>
            <v-row dense>
              <v-col cols="6">
                <v-select
                  v-model="bikeFormData.brand_id"
                  label="Brand"
                  :items="brands"
                  item-title="name"
                  item-value="id"
                  variant="outlined"
                />
                <v-text-field variant="outlined" v-model="bikeFormData.model" label="Model" />
                <v-text-field variant="outlined" v-model="bikeFormData.name" label="Name" />

                <v-text-field
                  v-model="bikeFormData.seater"
                  variant="outlined"
                  label="Seater"
                  type="number"
                  @update:model-value="bikeFormData.seater = Number($event)"
                />

                <v-text-field
                  v-model="bikeFormData.engine"
                  variant="outlined"
                  label="Engine CC"
                  type="number"
                  @update:model-value="bikeFormData.engine = Number($event)"
                >
                  <template #append>cc</template>
                </v-text-field>
              </v-col>

              <v-col cols="6">
                <v-select
                  v-model="bikeFormData.fuel_type"
                  label="Fuel Type"
                  :items="[
                    { label: 'Petrol', value: 'petrol' },
                    { label: 'Diesel', value: 'diesel' }
                  ]"
                  item-title="label"
                  item-value="value"
                  variant="outlined"
                />

                <v-text-field
                  v-model="bikeFormData.mileage"
                  variant="outlined"
                  label="Mileage"
                  type="number"
                  @update:model-value="bikeFormData.mileage = Number($event)"
                >
                  <template #append>kmpl</template>
                </v-text-field>

                <div class="flex items-center justify-between h-[56px] mb-[22px]">
                  <div>Has Side Mirrors</div>
                  <v-switch
                    v-model="bikeFormData.has_side_mirrors"
                    inset
                    color="green-darken-2"
                    hide-details
                  >
                  </v-switch>
                </div>

                <v-text-field
                  v-model="bikeFormData.bike_number"
                  variant="outlined"
                  label="Reg. Number"
                />

                <v-text-field
                  v-model="bikeFormData.rent_per_day"
                  variant="outlined"
                  label="Rent per day"
                  type="number"
                  @update:model-value="bikeFormData.rent_per_day = Number($event)"
                >
                  <template #append>₹</template>
                </v-text-field>
              </v-col>
            </v-row>
          </form>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn text="Close" variant="plain" @click="dialog = false" />
          <v-btn color="primary" text="Save" variant="elevated" @click="handleSaveBike" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import useBrands from '@/composables/useBrands'
import { useForm } from 'vee-validate'
import useBikes, { type BikeFormModel } from '@/composables/useBikes'
import { toast } from 'vue-sonner'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

const dialog = defineModel<boolean>()

const { brands, fetchBrands } = useBrands()
const { saving, saveBike, updateBike } = useBikes()

const emptyFormData: BikeFormModel = {
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

const bikeFormData = defineModel<BikeFormModel>('formData', {
  default: {
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
})

const handleSaveBike = async () => {
  try {
    if (!bikeFormData.value.id) {
      await saveBike(bikeFormData.value)
      toast.success('Bike saved successfully')
    } else {
      await updateBike(bikeFormData.value)
      toast.success('Bike updated successfully')
    }
    dialog.value = false
    bikeFormData.value = { ...emptyFormData }
    emit('refresh')
  } catch (e) {
    toast.error('Failed to save bike')
  } finally {
    saving.value = false
  }
}

fetchBrands()

// const { handleSubmit } =
useForm({
  validationSchema: {
    name(value: any) {
      if (value?.length >= 2) return true

      return 'Name needs to be at least 2 characters.'
    },
    phone(value: any) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true

      return 'Phone number needs to be at least 9 digits.'
    },
    email(value: any) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    }
  }
})

const emit = defineEmits(['save', 'refresh'])
</script>
