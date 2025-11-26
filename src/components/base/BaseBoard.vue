<script setup>
import { computed } from 'vue'

import BaseCard from './BaseCard.vue'

import { HEIGHT, WIDTH } from '@/constants/card.js'

const props = defineProps({
  cardHeight: { type: Number, default: HEIGHT },
  cardWidth: { type: Number, default: WIDTH },
  discardPileCard: String,
  disabledDrawCard: Boolean,
})

const OFFSET = 16

const drawSelected = defineModel('draw-selected', { type: Boolean, default: false })

const dimensions = computed(() => ({
  '--pile-height': `${props.cardHeight + OFFSET}px`,
  '--pile-width': `${props.cardWidth + OFFSET}px`,
}))
</script>

<template>
  <div class="base-board" :style="dimensions">
    <div class="discard-pile">
      <base-card :card="discardPileCard" :height="cardHeight" :width="cardWidth" disabled />
    </div>
    <div class="draw-pile">
      <base-card
        v-model="drawSelected"
        :height="cardHeight"
        :width="cardWidth"
        :disabled="disabledDrawCard"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-board {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
}

.discard-pile,
.draw-pile {
  height: var(--pile-height);
  width: var(--pile-width);
  display: grid;
  place-items: center;
  border: 1px dashed rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}
</style>
