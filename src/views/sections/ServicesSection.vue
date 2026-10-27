<script setup>
import AnimatedCard from '@/components/common/AnimatedCard.vue'
import { vReveal } from '@/composables/useAnimations'
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()
</script>

<template>
  <section id="services" class="scroll-mt-24 border-t border-line/50 py-20 sm:py-28">
    <div class="mx-auto max-w-content px-5 sm:px-8">
      <div v-reveal class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-xl">
          <p class="eyebrow">{{ store.services.eyebrow }}</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {{ store.services.heading }}
          </h2>
        </div>
        <p class="max-w-sm text-sm leading-relaxed text-muted sm:text-right">
          {{ store.services.blurb }}
        </p>
      </div>

      <div class="mt-10 grid gap-5 sm:grid-cols-2">
        <AnimatedCard
          v-for="(service, index) in store.services.items"
          :key="service.title"
          :delay="index * 80"
        >
          <p class="text-xs font-semibold tracking-[0.2em] text-accent">
            {{ String(index + 1).padStart(2, '0') }}
          </p>
          <h3 class="mt-3 text-lg font-semibold">{{ service.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ service.summary }}</p>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="point in service.points"
              :key="point"
              class="rounded-full border border-line/70 bg-background/40 px-2.5 py-1 text-xs text-muted"
            >
              {{ point }}
            </li>
          </ul>
        </AnimatedCard>
      </div>
    </div>
  </section>
</template>
