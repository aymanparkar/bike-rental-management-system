<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card max-width="400" :title :text>
      <template v-slot:actions>
        <div class="flex justify-end w-full">
          <v-btn text="Cancel" @click="dialog = false"></v-btn>
          <v-btn
            color="red-darken-2"
            text="Yes"
            variant="flat"
            @click="
              () => {
                dialog = false
                $emit('confirm')
              }
            "
          />
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel<boolean>({
  default: false
})

withDefaults(
  defineProps<{
    title: string
    text: string
  }>(),
  {}
)

defineEmits(['confirm'])
</script>
