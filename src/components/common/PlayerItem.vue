<script setup>
import { computed } from 'vue'

import DefaultAvatar from '@/assets/images/default-avatar.png'

const props = defineProps({ username: String, col: Number, row: Number, isOnTurn: Boolean })

const position = computed(() => ({
  gridColumn: `${props.col} / span 2`,
  gridRow: `${props.row} / span 2`,
}))
</script>

<template>
  <div class="player-item" :style="{ ...position }">
    <v-card
      width="fit-content"
      tile
      flat
      :border="`md opacity-100 ${isOnTurn ? 'error' : 'black'} `"
    >
      <v-img :src="DefaultAvatar" height="80" width="80" />
    </v-card>
    <p class="player-item__username">{{ username }}</p>
  </div>
</template>

<style lang="scss" scoped>
.player-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  align-self: center;
  justify-self: center;

  &__username {
    max-width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
