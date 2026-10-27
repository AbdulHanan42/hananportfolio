<script setup>
import AnimatedCard from '@/components/common/AnimatedCard.vue'
import { vReveal } from '@/composables/useAnimations'
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()
</script>

<template>
  <section id="about" class="scroll-mt-24 border-t border-line/50 py-20 sm:py-28">
    <div
      class="mx-auto grid max-w-content gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
    >
      <div v-reveal>
        <p class="eyebrow">{{ store.about.eyebrow }}</p>
        <h2 class="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
          {{ store.about.heading }}
        </h2>
        <div class="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
          <p v-for="paragraph in store.about.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </div>
      </div>

      <AnimatedCard :delay="120" class="lg:sticky lg:top-24">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Working principles</p>
        <ul class="mt-4 space-y-3">
          <li
            v-for="item in store.about.highlights"
            :key="item"
            class="flex items-start gap-3 text-sm text-foreground/90"
          >
            <span class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
              <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            {{ item }}
          </li>
        </ul>
        <p class="mt-6 border-t border-line/60 pt-4 text-xs text-muted">{{ store.profile.location }}</p>
      </AnimatedCard>
    </div>
  </section>
</template>
