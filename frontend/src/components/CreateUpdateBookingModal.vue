<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" fullscreen>
      <v-card title="Create Booking" :height="600">
        <v-card-text>
          <div class="flex flex-col gap-4">
            <BikeSelectionCardList v-model="bookingFormData.bike" :bikes />

            <RadioGroupLabel class="text-base font-semibold leading-6 text-gray-900"
              >Select Booking Duration</RadioGroupLabel
            >
            <VueDatePicker
              v-model="bookingFormData.date_range"
              :disabled="!bookingFormData.bike"
              class="mb-[22px] !z-[10000]"
              placeholder="Select start date and time"
              input-class-name="h-[56px]"
              :min-date="currentDateTime"
              range
              time-picker-inline
              prevent-min-max-navigation
              min-range="1"
              :disabled-dates="disabledDates"
              format="dd/MM/yyyy HH:mm"
            />
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <div v-if="bookingFormData.date_range" class="flex gap-4">
            <span class="font-bold">Total Booking Amount:</span>
            <div>
              {{
                `₹${Number(dayjs(bookingFormData.date_range[1]).diff(dayjs(bookingFormData.date_range[0]), 'days') * bookingFormData?.bike?.og_rent_per_day).toFixed(2)}`
              }}
            </div>
          </div>
          <v-spacer />
          <v-btn size="small" text="Close" variant="plain" @click="dialog = false"></v-btn>
          <v-btn
            size="small"
            color="primary"
            text="Checkout"
            variant="flat"
            @click="handleCreateBooking"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import useBikes from '@/composables/useBikes'
import BikeSelectionCardList from './BikeSelectionCardList.vue'
import dayjs from 'dayjs'
import useBookings from '@/composables/useBookings'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'

const currentDateTime = new Date()

const dialog = defineModel<boolean>()
const { bikes, fetchBikes, fetchBikeBookings } = useBikes()
const { createBooking } = useBookings()
const selectedBikeBookings = ref<any>([])

const bookingFormData = ref<any>({
  date_range: undefined,
  bike: null
})

const disabledDates = computed(() => {
  const disabledDates: Date[] = []
  selectedBikeBookings.value.forEach((element: any) => {
    const startDate = new Date(element.start_date)
    const endDate = new Date(element.end_date)
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      disabledDates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
  })
  return disabledDates
})

const handleCreateBooking = async () => {
  try {
    if (!bookingFormData.value.bike) {
      return
    }

    const [start_date, end_date] = bookingFormData.value.date_range as any
    const bike_id = bookingFormData.value.bike.id
    const booking_amount = Number(
      dayjs(end_date).diff(dayjs(start_date), 'days') * bookingFormData.value?.bike?.og_rent_per_day
    )

    await createBooking({
      start_date,
      end_date,
      bike_id,
      booking_amount,
      customer_id: useAuthStore().user?.id
    })

    // dialog.value = false
    // toast.success('Booking created successfully')
    // bookingFormData.value = {
    //   date_range: undefined,
    //   bike: null
    // }
    emit('refresh')
  } catch (error) {
    toast.error('Failed to create booking')
  }
}

fetchBikes()

watch(
  () => unref(bookingFormData).bike,
  async (val) => {
    if (val) {
      selectedBikeBookings.value = await fetchBikeBookings(String(val.id))
    }
    bookingFormData.value.date_range = undefined
  }
)

const emit = defineEmits(['save', 'refresh'])
</script>
