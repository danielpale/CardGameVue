<script setup>
defineProps({
  width: { type: [String, Number], default: 600 },
  title: String,
  primLabel: { type: String, default: 'Accept' },
  secLabel: { type: String, default: 'Cancel' },
})
const emit = defineEmits(['on-close', 'on-prim-click', 'on-sec-click'])

const model = defineModel()

function handleClose() {
  model.value = false
  emit('on-close')
}
</script>

<template>
  <v-dialog v-model="model" width="600" scrollable persistent>
    <v-card tile>
      <v-card-title
        class="pa-4 d-flex align-center justify-space-between border-b-sm border-opacity-100"
      >
        <h5>{{ title }}</h5>
        <v-btn variant="text" size="32">
          <v-icon icon="close" size="20" @click="handleClose" />
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-4">
        <slot></slot>
      </v-card-text>
      <v-card-actions class="pa-4 border-t-sm border-opacity-100">
        <slot name="actions">
          <v-btn variant="outlined" @click="emit('on-sec-click')">{{ secLabel }}</v-btn>
          <v-btn variant="flat" @click="emit('on-prim-click')">{{ primLabel }}</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style></style>
