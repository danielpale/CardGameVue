<script setup>
import { ref, provide } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'

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

provide('insideDeck', true)

const cardSelected = ref(null)
</script>

<template>
  <div class="base-deck">
    <base-card v-model="cardSelected" v-for="card in cards" :key="card" :card="card" />
  </div>
</template>

<style lang="scss" scoped>
.base-deck {
  display: flex;
  align-items: center;

  & > .base-card__container {
    margin-left: -100px;
  }
}
</style>
