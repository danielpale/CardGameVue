<script setup>
import { useTemplateRef } from 'vue'

import BaseCard from '@/components/base/BaseCard.vue'

const cards = [
  'back',
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
  'red-plus-two',
  'red-skip',
  'red-reverse',
  'blue-1',
  'blue-2',
  'blue-3',
  'blue-4',
  'blue-5',
  'blue-6',
  'blue-7',
  'blue-8',
  'blue-9',
  'blue-0',
  'blue-plus-two',
  'blue-skip',
  'blue-reverse',
  'green-1',
  'green-2',
  'green-3',
  'green-4',
  'green-5',
  'green-6',
  'green-7',
  'green-8',
  'green-9',
  'green-0',
  'green-plus-two',
  'green-skip',
  'green-reverse',
]

const baseCardRef = useTemplateRef('baseCard')

function flipCard() {
  baseCardRef.value.flipCard()
}
</script>

<template>
  <section class="card-playground">
    <!-- <base-card v-for="card in cards" :key="card" :card="card" /> -->
    <div class="grid">
      <base-card ref="baseCard" card="yellow-4" />
    </div>
    <div class="d-flex ga-4 align-center justify-center pa-4">
      <v-btn @click="flipCard">Flip</v-btn>
    </div>
  </section>
</template>

<style>
.card-playground {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.grid {
  flex-grow: 1;
  display: grid;
  place-items: center;
}
</style>
