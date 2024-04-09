<template>
  <main class="h-[100vh] w-[100vw] flex justify-center items-center">
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6">
          <InputComponent
            v-model="userName.value.value"
            :errors="userName.errors.value"
            label="Username"
            type="text"
          />
          <InputComponent
            v-model="password.value.value"
            :errors="password.errors.value"
            label="Password"
            type="password"
          />
          <div>
            <ButtonComponent
              text="Sign in"
              :is-loading="isLoggingIn"
              :style="'width: 100%'"
              @click="login"
            />
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          {{ ' ' }}
          <a
            @click="$router.push({ name: BaseRouteNames.SIGN_UP })"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >Create an account</a
          >
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import { useRouter } from 'vue-router'
import { BaseRouteNames } from '@/router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'
import useAxios from '@/composables/useAxios'

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: {
    userName(value: string) {
      if (value?.length > 0) return true

      return 'Username is required'
    },
    password(value: string) {
      if (value?.length > 0) return true

      return 'Password can not be empty'
    }
  }
})

const isLoggingIn = ref(false)

const userName = useField('userName')
const password = useField('password')

const { axiosInstance } = useAxios()

const authStore = useAuthStore()

const login = handleSubmit(async (values) => {
  try {
    isLoggingIn.value = true
    const { data } = await axiosInstance.post('/login', values)
    authStore.user = data
    router.push({ name: BaseRouteNames.HOME })
    toast.success('Logged in successfully')
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
