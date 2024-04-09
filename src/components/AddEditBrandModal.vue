<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" :width="350" max-width="600">
      <v-card title="Add Brand">
        <v-card-text>
          <slot />
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn size="small" text="Close" variant="plain" @click="dialog = false"></v-btn>
          <v-btn
            size="small"
            color="primary"
            text="Save"
            variant="elevated"
            @click="$emit('save')"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
defineEmits(['save'])

const dialog = defineModel<boolean>()
</script>
