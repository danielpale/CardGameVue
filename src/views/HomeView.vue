<script setup>
import BaseSection from '@/components/base/BaseSection.vue'
</script>

<template>
  <base-section class="home-view">
    <h1 class="title bg-black">UNO</h1>
    <v-btn color="black" variant="flat">Create Game</v-btn>
    <v-btn color="black" variant="outlined">Join Game</v-btn>
  </base-section>
</template>

<style>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 48px;
}
</style>
