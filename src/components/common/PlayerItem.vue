<script setup>
import { computed } from 'vue'

import DefaultAvatar from '@/assets/images/default-avatar.png'

const props = defineProps({
  username: String,
  col: Number,
  row: Number,
  colSpan: Number,
  rowSpan: Number,
  isOnTurn: Boolean,
  cardsRemaining: { type: Number, default: 0 },
})

const position = computed(() => ({
  gridColumn: `${props.col} / span ${props.colSpan}`,
  gridRow: `${props.row} / span ${props.rowSpan}`,
}))
</script>

<template>
  <div class="player-item" :style="{ ...position }">
    <v-hover>
      <template #default="{ isHovering, props }">
        <v-card
          :id="username"
          width="fit-content"
          tile
          flat
          :elevation="isOnTurn ? '24' : '0'"
          border="md opacity-100"
          v-bind="props"
        >
          <v-img :src="DefaultAvatar" height="80" width="80" />
          <v-overlay :model-value="isHovering" class="player-item__stats" contained opacity="0.8">
            <p class="text-center font-weight-bold">{{ cardsRemaining }}</p>
            <small class="text-center">Cards remaining</small>
          </v-overlay>
        </v-card>
      </template>
    </v-hover>
    <p class="player-item__username">{{ username }}</p>
  </div>
  <v-tooltip
    :model-value="isOnTurn"
    :activator="`#${username}`"
    location="bottom"
    :content-props="{ class: 'bg-black rounded-0 py-1' }"
    contained
    width="80"
    :open-on-hover="false"
  >
    <div class="loader mx-auto"></div>
  </v-tooltip>
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

.loader {
  width: 32px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #ffffff 90%, #ffffff00);
  background:
    var(--_g) 0% 50%,
    var(--_g) 50% 50%,
    var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  20% {
    background-position:
      0% 0%,
      50% 50%,
      100% 50%;
  }
  40% {
    background-position:
      0% 100%,
      50% 0%,
      100% 50%;
  }
  60% {
    background-position:
      0% 50%,
      50% 100%,
      100% 0%;
  }
  80% {
    background-position:
      0% 50%,
      50% 50%,
      100% 100%;
  }
}
</style>

<style lang="scss">
.player-item__stats {
  display: flex;
  flex-direction: column;
  justify-content: center;

  > .v-overlay__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    color: white;
  }
}
</style>
