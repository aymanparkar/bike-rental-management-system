<template>
  <v-data-table :items :loading :headers>
    <template v-slot:headers="{ columns }">
      <tr style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
        <template v-for="column in columns" :key="column.key">
          <td>
            <div
              :class="`text-[12px] font-[600] mr-2 cursor-pointer w-[${column?.width || '100px'}]`"
            >
              {{ column.title?.toUpperCase() }}
            </div>
          </td>
        </template>
      </tr>
    </template>

    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10" />
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <div class="flex gap-2">
        <v-btn
          color="yellow-darken-3"
          size="small"
          density="comfortable"
          icon="mdi-pencil"
          @click="$emit('edit', item)"
        />
        <v-btn
          color="red-darken-3"
          size="small"
          density="comfortable"
          icon="mdi-delete"
          @click="$emit('delete', item)"
        />
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    items: any
    headers: { key: string; title: string }[]
    loading: boolean
  }>(),
  {
    loading: false
  }
)

defineEmits(['edit', 'delete'])
</script>
