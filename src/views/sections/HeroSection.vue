<script setup>
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import { vReveal } from '@/composables/useAnimations'
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()
</script>

<template>
  <section id="home" class="relative scroll-mt-24 overflow-hidden">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="absolute -top-24 right-[-10%] size-[32rem] rounded-full bg-accent/10 blur-[130px]" />
      <div class="absolute bottom-0 left-[10%] size-[26rem] rounded-full bg-accent/5 blur-[110px]" />
    </div>

    <div
      class="relative mx-auto grid max-w-content items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr]"
    >
      <div>
        <p
          v-reveal
          class="inline-flex items-center gap-2 rounded-full border border-line/70 bg-surface/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur"
        >
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-accent/60 motion-reduce:animate-none" />
            <span class="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {{ store.profile.availability }}
        </p>

        <h1 v-reveal="80" class="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          {{ store.profile.name }}
          <span class="mt-2 block text-gradient">{{ store.profile.role }}</span>
        </h1>

        <p v-reveal="160" class="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {{ store.profile.summary }}
        </p>

        <div v-reveal="240" class="mt-8 flex flex-wrap items-center gap-3">
          <PrimaryButton href="#projects">
            View projects
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </PrimaryButton>
          <PrimaryButton href="#contact" variant="ghost">Start a project</PrimaryButton>
        </div>

        <dl v-reveal="320" class="mt-12 grid gap-6 border-t border-line/60 pt-8 sm:grid-cols-3">
          <div v-for="stat in store.stats" :key="stat.label">
            <dd class="text-3xl font-semibold tracking-tight text-foreground">{{ stat.value }}</dd>
            <dt class="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{{ stat.label }}</dt>
          </div>
        </dl>
      </div>

      <div v-reveal="200" class="relative mx-auto w-full max-w-sm lg:max-w-none">
        <div class="relative aspect-square rounded-[2.5rem] border border-line/60 bg-surface/40 p-6 backdrop-blur">
          <div aria-hidden="true" class="absolute inset-4 rounded-[2rem] border border-accent/20" />
          <div class="relative flex h-full flex-col items-center justify-center gap-5 text-center">
            <span class="text-7xl font-bold tracking-tight text-gradient sm:text-8xl">
              {{ store.profile.initials }}
            </span>
            <p class="text-xs uppercase tracking-[0.3em] text-muted">{{ store.profile.role }}</p>
            <ul class="flex flex-wrap items-center justify-center gap-2">
              <li
                v-for="tag in store.profile.stack"
                :key="tag"
                class="rounded-full border border-line/70 bg-background/40 px-3 py-1 text-xs text-muted"
              >
                {{ tag }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
