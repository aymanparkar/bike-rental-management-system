<template>
  <MainLayout title="Dashboard">
    <LoadingState v-if="loading" />

    <dl v-else class="grid grid-cols-1 gap-5 sm:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.name"
        class="overflow-hidden rounded-lg bg-white px-4 py-4 shadow sm:p-6"
      >
        <dt class="text-sm font-medium leading-6 text-gray-500">{{ stat.name }}</dt>
        <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
          {{ stat.value }}
        </dd>
      </div>
    </dl>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import LoadingState from '@/components/LoadingState.vue'
import useStatistics from '@/composables/useStatistics'

const { loading, stats, fetchStats } = useStatistics()

fetchStats()
</script>
