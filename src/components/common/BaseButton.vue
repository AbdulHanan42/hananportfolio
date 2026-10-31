<script setup>
import { computed, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'ghost'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
})

const attrs = useAttrs()

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm sm:text-base',
  lg: 'px-6 py-3.5 text-base',
}

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 ease-smooth disabled:pointer-events-none disabled:opacity-50',
  props.variant === 'ghost'
    ? 'border border-line-soft bg-surface-soft text-foreground backdrop-blur hover:-translate-y-0.5 hover:border-primary hover:bg-surface-strong'
    : 'bg-primary text-primary-ink shadow-[0_18px_40px_-18px_var(--primary-glow-color)] hover:-translate-y-0.5 hover:bg-primary-strong',
  sizeClasses[props.size],
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
