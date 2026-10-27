<script setup>
import { vReveal } from '@/composables/useAnimations'

defineProps({
  delay: { type: Number, default: 0 },
})
</script>

<template>
  <div
    v-reveal="delay"
    class="group relative overflow-hidden rounded-2xl border border-line/60 bg-surface/50 p-6 transition-colors duration-300 ease-smooth hover:border-accent/50 hover:bg-surface/70 hover:shadow-xl hover:shadow-accent/5"
  >
    <slot />
  </div>
</template>
