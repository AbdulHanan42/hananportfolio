<script setup>
import { computed, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
})

const attrs = useAttrs()

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 ease-smooth disabled:pointer-events-none disabled:opacity-50',
  props.variant === 'ghost'
    ? 'border border-line/70 bg-surface/40 text-foreground backdrop-blur hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface/70'
    : 'bg-accent text-accent-ink shadow-lg shadow-accent/20 hover:-translate-y-0.5 hover:bg-accent/90',
  props.size === 'sm' ? 'px-4 py-2 text-sm' : 'px-5 py-3 text-sm sm:text-base',
])
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes" v-bind="attrs">
    <slot />
  </RouterLink>
  <a v-else-if="href" :href="href" :class="classes" v-bind="attrs">
    <slot />
  </a>
  <button v-else type="button" :class="classes" v-bind="attrs">
    <slot />
  </button>
</template>
