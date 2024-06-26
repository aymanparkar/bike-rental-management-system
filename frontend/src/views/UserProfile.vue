<template>
  <MainLayout title="Profile">
    <div>
      <form class="space-y-6">
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
            >User Name</label
          >
        </div>
        <div class="mt-2">
          <input
            v-model="userName"
            disabled
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <InputComponent
          v-model="name.value.value"
          :errors="name.errors.value"
          label="Name"
          type="text"
        />
        <InputComponent
          v-model="phone.value.value"
          :errors="phone.errors.value"
          label="Mobile Number"
          type="text"
        />
        <InputComponent
          v-model="password.value.value"
          :errors="password.errors.value"
          label="Password"
          type="password"
          placeholder="Leave empty if you don't want to change password"
        />
        <div>
          <ButtonComponent
            text="Save"
            :is-loading="isLoggingIn"
            :style="'width: 100%'"
            @click="signUp"
          />
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'
import useAxios from '@/composables/useAxios'
import MainLayout from '@/layouts/MainLayout.vue'

const { handleSubmit } = useForm({
  validationSchema: {
    name(value: string) {
      if (value?.length > 0) return true

      return 'Name is required'
    },
    phone(value: string) {
      if (value?.length > 0) return true

      return 'Mobile Number is required'
    }
  }
})

const isLoggingIn = ref(false)
const { axiosInstance } = useAxios()
const authStore = useAuthStore()

const userName = ref(authStore.user?.userName)

const name = useField('name')
const phone = useField('phone')
const password = useField('password')

name.setValue(authStore.user?.name)
phone.setValue(authStore.user?.phone)

const signUp = handleSubmit(async (values: any) => {
  try {
    isLoggingIn.value = true
    await axiosInstance.put(`/update-profile/${authStore.user?.id}`, values)
    authStore.user = { ...authStore.user, ...values }
    toast.success('Profile updated successfully')
  } catch (e: any) {
    toast.error(e.response.data)
  } finally {
    isLoggingIn.value = false
  }
})
</script>

<style scoped>
.spinner_ajPY {
  transform-origin: center;
  animation: spinner_AtaB 0.75s infinite linear;
}
@keyframes spinner_AtaB {
  100% {
    transform: rotate(360deg);
  }
}
</style>
