<template>
  <div class="flex items-center justify-between">
    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">{{
      label
    }}</label>
  </div>
  <div class="mt-2">
    <input
      v-model="modelValue"
      :id="label"
      :name="label"
      :type
      :autocomplete="label"
      :placeholder="placeholder"
      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
    <p v-if="errors" class="mt-2 text-sm text-red-600" id="email-error">
      {{ errors[0] }}
    </p>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel()

withDefaults(
  defineProps<{
    label: string
    type: 'text' | 'password' | 'email' | 'number'
    errors: string[]
    placeholder?: string
  }>(),
  {
    errors: () => []
  }
)
</script>
