<script setup>
import { RouterView } from 'vue-router'

import TheFooter from '@/components/layout/TheFooter.vue'
import TheNavbar from '@/components/layout/TheNavbar.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <TheNavbar />
    <main class="flex-1">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>
