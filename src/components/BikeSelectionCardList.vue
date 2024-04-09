<template>
  <RadioGroup v-model="selectedBikes">
    <RadioGroupLabel class="text-base font-semibold leading-6 text-gray-900"
      >Select a Bike</RadioGroupLabel
    >

    <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
      <RadioGroupOption
        as="template"
        v-for="bike in bikes"
        :key="bike.id"
        :value="bike"
        v-slot="{ active, checked }"
      >
        <div
          :class="[
            'relative flex cursor-pointer rounded-lg border  p-4 shadow-sm focus:outline-none ',
            active
              ? 'border-indigo-600 ring-2 ring-indigo-600 bg-gray-50'
              : 'border-gray-500  bg-gray-50'
          ]"
        >
          <span class="flex flex-1">
            <span class="flex flex-col">
              <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">
                {{ bike.brand_name }} {{ bike.model }} {{ bike.name }}
              </RadioGroupLabel>
              <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500">
                <div>
                  <div class="flex gap-1">
                    <div>{{ bike.fuel_type }}</div>
                    -
                    <div>{{ bike.seater }} seater</div>
                  </div>
                  <div>{{ bike.engine }}</div>
                  <div>{{ bike.mileage }}</div>
                  <div>Side Mirrors: {{ bike.has_side_mirrors }}</div>
                </div>
              </RadioGroupDescription>
              <RadioGroupDescription as="span" class="mt-6 text-sm font-medium text-gray-900">
                <div>{{ bike.rent_per_day }}</div>
              </RadioGroupDescription>
            </span>
          </span>
          <CheckCircleIcon
            :class="[!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600']"
            aria-hidden="true"
          />
          <span
            :class="[
              active ? 'border' : 'border-2',
              checked ? 'border-indigo-600' : 'border-transparent',
              'pointer-events-none absolute -inset-px rounded-lg'
            ]"
            aria-hidden="true"
          />
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script lang="ts" setup>
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption
} from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'

withDefaults(
  defineProps<{
    bikes: any
  }>(),
  {}
)

const selectedBikes = defineModel<any>({
  default: () => []
})
</script>
