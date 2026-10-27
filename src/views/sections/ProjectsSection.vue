<script setup>
import Viewer360 from '@/components/360/Viewer360.vue'
import AnimatedCard from '@/components/common/AnimatedCard.vue'
import { vReveal } from '@/composables/useAnimations'
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()
</script>

<template>
  <section id="projects" class="scroll-mt-24 border-t border-line/50 py-20 sm:py-28">
    <div class="mx-auto max-w-content px-5 sm:px-8">
      <div v-reveal class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-xl">
          <p class="eyebrow">{{ store.projects.eyebrow }}</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {{ store.projects.heading }}
          </h2>
        </div>
        <p class="max-w-sm text-sm leading-relaxed text-muted sm:text-right">
          {{ store.projects.blurb }}
        </p>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <AnimatedCard
          v-for="(project, index) in store.projects.items"
          :key="project.name"
          :delay="index * 80"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-lg font-semibold leading-snug">{{ project.name }}</h3>
            <span class="shrink-0 rounded-full border border-line/70 px-2.5 py-0.5 text-xs text-muted">
              {{ project.year }}
            </span>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ project.summary }}</p>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="tech in project.stack"
              :key="tech"
              class="rounded-full bg-accent/10 px-2.5 py-1 text-[0.7rem] font-medium text-accent"
            >
              {{ tech }}
            </li>
          </ul>
          <a
            v-if="project.href"
            :href="project.href"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
          >
            View project
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </AnimatedCard>
      </div>

      <div v-reveal class="mt-14">
        <Viewer360 v-bind="store.projects.showcase360" />
      </div>
    </div>
  </section>
</template>
