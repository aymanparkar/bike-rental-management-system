<template>
  <RouterView />
  <Toaster richColors position="bottom-right" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
</script>
