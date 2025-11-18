<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const routes = computed(() => router.getRoutes().filter((route) => route.path !== '/'))
</script>

<template>
  <v-app>
    <div class="pa-4">
      <v-btn color="red">
        Routes
        <v-menu activator="parent">
          <v-list nav>
            <v-list-item v-for="route in routes" :key="route.name" :to="{ name: route.name }">
              {{ route.name }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style></style>
