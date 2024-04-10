<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail permanent>
        <v-list>
          <v-list-item
            :prepend-avatar="`https://api.dicebear.com/7.x/initials/svg?seed=${authStore.user?.name}`"
            :subtitle="capitalize(authStore.user?.type)"
            :title="authStore.user?.name"
          ></v-list-item>
        </v-list>

        <v-divider class="bg-black"></v-divider>

        <v-list v-model:selected="selectedNav" density="compact" nav>
          <v-list-item
            v-for="item in sideNavItems"
            :key="item.title"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.route"
            @click="() => $router.push({ name: item.route })"
          />
        </v-list>

        <template v-slot:append>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            @click="
              () => {
                $router.push({ name: BaseRouteNames.LOGIN })
                toast.success('Logged out successfully')
                authStore.logout()
              }
            "
          />
        </template>
      </v-navigation-drawer>

      <v-main>
        <main class="p-4 bg-gray-100" style="height: 100vh">
          <div class="text-lg font-[600] mb-4 flex justify-between">
            <span>
              {{ title }}
            </span>
            <div class="flex items-center space-x-2">
              <slot name="HEADER_ACTIONS" />
            </div>
          </div>
          <slot />
        </main>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { BaseRouteNames } from '@/router'
import { useAuthStore } from '@/stores/auth'
import { capitalize } from 'lodash'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

withDefaults(
  defineProps<{
    title: string
  }>(),
  {}
)

const route = useRoute()
const authStore = useAuthStore()

const selectedNav = computed(() => [route.name])

const sideNavItems = ref([
  {
    title: 'Home',
    icon: 'mdi-home',
    route: BaseRouteNames.HOME
  },
  ...(authStore.user?.type === 'admin'
    ? [
        {
          title: 'Brands',
          icon: 'mdi-tag-multiple',
          route: BaseRouteNames.BRANDS
        },
        {
          title: 'Bikes',
          icon: 'mdi-motorbike',
          route: BaseRouteNames.BIKES
        }
      ]
    : []),
  {
    title: 'Bookings',
    icon: 'mdi-ticket-confirmation',
    route: BaseRouteNames.BOOKINGS
  },
  ...(authStore.user?.type === 'admin'
    ? [
        {
          title: 'Customers',
          icon: 'mdi-account-group',
          route: BaseRouteNames.CUSTOMERS
        }
      ]
    : []),
  {
    title: 'Profile',
    icon: 'mdi-account-settings',
    route: BaseRouteNames.PROFILE
  }
])
</script>
