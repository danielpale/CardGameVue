<script setup>
import { ref, provide, useTemplateRef, onMounted, onBeforeUnmount, computed } from 'vue'

import BaseCard from '@/components/base/BaseCard.vue'

import { WIDTH } from '@/constants/card.js'

const props = defineProps({ cards: { type: Array, default: () => [] } })

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

const overlap = computed(() => {
  const numCards = props.cards.length
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
