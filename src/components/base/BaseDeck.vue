<script setup>
import { ref, provide, useTemplateRef, onMounted, onBeforeUnmount, computed } from 'vue'

import BaseCard from '@/components/base/BaseCard.vue'

import { WIDTH } from '@/constants/card.js'

onMounted(() => {
  updateContainerWidth()
  window.addEventListener('resize', updateContainerWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateContainerWidth)
})

const cards = [
  'yellow-1',
  'yellow-2',
  'yellow-3',
  'yellow-4',
  'yellow-5',
  'yellow-6',
  'yellow-7',
  'yellow-8',
  'yellow-9',
  'yellow-0',
  'yellow-plus-two',
  'yellow-skip',
  'yellow-reverse',
  'red-1',
  'red-2',
  'red-3',
  'red-4',
  'red-5',
  'red-6',
  'red-7',
  'red-8',
  'red-9',
  'red-0',
]

const cardSelected = ref(null)
const containerWidth = ref(0)
const baseDeckRef = useTemplateRef('baseDeck')

const overlap = computed(() => {
  const numCards = cards.length
  if (numCards <= 1) return 0
  const rawOverlap = (WIDTH * numCards - containerWidth.value) / (numCards - 1)
  return rawOverlap
  // const minOverlap = WIDTH - WIDTH * 0.2
  // return Math.min(Math.max(rawOverlap, minOverlap), WIDTH * 0.9)
})

function updateContainerWidth() {
  containerWidth.value = baseDeckRef.value.parentElement.clientWidth //baseDeckRef.value.clientWidth
}

provide('insideDeck', true)
provide('overlap', overlap)
</script>

<template>
  <div ref="baseDeck" class="base-deck" :style="{ '--overlap': `-${overlap}px` }">
    <base-card v-model="cardSelected" v-for="card in cards" :key="card" :card="card" />
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
