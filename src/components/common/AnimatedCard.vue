<script setup>
import { vReveal } from '@/composables/useAnimations'

defineProps({
  delay: { type: Number, default: 0 },
})
</script>

<template>
  <div
    v-reveal="delay"
    class="group relative overflow-hidden rounded-2xl border border-line-soft bg-surface-soft p-6 transition-colors duration-300 ease-smooth hover:border-primary hover:bg-surface-glass hover:shadow-xl"
  >
    <slot />
  </div>
</template>
