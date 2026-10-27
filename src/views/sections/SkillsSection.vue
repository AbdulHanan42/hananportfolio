<script setup>
import AnimatedCard from '@/components/common/AnimatedCard.vue'
import { vReveal } from '@/composables/useAnimations'
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()
</script>

<template>
  <section id="skills" class="scroll-mt-24 border-t border-line/50 py-20 sm:py-28">
    <div class="mx-auto max-w-content px-5 sm:px-8">
      <div v-reveal class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-xl">
          <p class="eyebrow">{{ store.skills.eyebrow }}</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {{ store.skills.heading }}
          </h2>
        </div>
        <p class="max-w-sm text-sm leading-relaxed text-muted sm:text-right">
          {{ store.skills.blurb }}
        </p>
      </div>

      <div class="mt-10 grid gap-5 sm:grid-cols-3">
        <AnimatedCard
          v-for="(group, index) in store.skills.groups"
          :key="group.group"
          :delay="index * 80"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{{ group.group }}</p>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="item in group.items"
              :key="item"
              class="rounded-full border border-line/70 bg-background/40 px-3 py-1.5 text-sm text-foreground/90"
            >
              {{ item }}
            </li>
          </ul>
        </AnimatedCard>
      </div>
    </div>
  </section>
</template>
