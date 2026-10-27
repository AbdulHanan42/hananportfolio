<script setup>
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()
</script>

<template>
  <footer class="border-t border-line/60 bg-surface/30">
    <div class="mx-auto max-w-content px-5 py-12 sm:px-8">
      <div class="flex flex-col gap-10 sm:flex-row sm:justify-between">
        <div class="max-w-sm">
          <div class="flex items-center gap-3">
            <span class="grid size-9 place-items-center rounded-lg border border-line/70 bg-surface text-xs font-bold text-accent">
              {{ store.profile.initials }}
            </span>
            <span class="font-semibold">{{ store.profile.name }}</span>
          </div>
          <p class="mt-4 text-sm text-muted">{{ store.profile.tagline }}</p>
          <p class="mt-3 text-xs text-muted/80">{{ store.profile.location }}</p>
        </div>

        <div class="grid grid-cols-2 gap-10 sm:gap-16">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Explore</p>
            <ul class="mt-3 space-y-2">
              <li v-for="link in store.nav" :key="link.href">
                <a :href="link.href" class="text-sm text-muted transition hover:text-foreground">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Elsewhere</p>
            <ul class="mt-3 space-y-2">
              <li v-for="social in store.socials" :key="social.label">
                <a
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-muted transition hover:text-foreground"
                >
                  {{ social.label }}
                  <span class="ml-1 text-xs text-muted/70">{{ social.handle }}</span>
                </a>
              </li>
              <li>
                <a :href="store.mailto" class="text-sm text-muted transition hover:text-foreground">Email</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col gap-2 border-t border-line/60 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ store.year }} {{ store.profile.name }}. All rights reserved.</p>
        <p>Built with Vue 3, Pinia &amp; Tailwind CSS.</p>
      </div>
    </div>
  </footer>
</template>
