<script setup>
import { ref, provide, useTemplateRef, onMounted, onBeforeUnmount, computed } from 'vue'

import BaseCard from '@/components/base/BaseCard.vue'

import { WIDTH } from '@/constants/card.js'

const props = defineProps({
  cards: { type: Array, default: () => [] },
  cardHeight: Number,
  cardWidth: { type: Number, default: WIDTH },
})

onMounted(() => {
  updateContainerWidth()
  window.addEventListener('resize', updateContainerWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateContainerWidth)
})

const cardSelected = ref(null)
const containerWidth = ref(0)
const baseDeckRef = useTemplateRef('baseDeck')

const maxOverlap = computed(() => props.cardWidth * 0.85)
const minOverlap = computed(() => props.cardWidth - props.cardWidth * 0.7)
const overlap = computed(() => {
  const numCards = props.cards.length
  if (numCards <= 1) return 0
  const rawOverlap = (props.cardWidth * numCards - containerWidth.value) / (numCards - 1)
  return Math.min(Math.max(rawOverlap, minOverlap.value), maxOverlap.value)
})

function updateContainerWidth() {
  containerWidth.value = baseDeckRef.value.parentElement.clientWidth //baseDeckRef.value.clientWidth
}

provide('insideDeck', true)
provide('overlap', overlap)
</script>

<template>
  <div ref="baseDeck" class="base-deck" :style="{ '--overlap': `-${overlap}px` }">
    <base-card
      v-model="cardSelected"
      v-for="card in cards"
      :key="card"
      :card="card"
      :height="cardHeight"
      :width="cardWidth"
    />
  </div>
</template>

<style lang="scss" scoped>
.base-deck {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > .base-card__container:not(:first-child) {
    margin-left: var(--overlap);
  }
}
</style>
