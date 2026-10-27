<script setup>
import { onBeforeUnmount, ref } from 'vue'

import PrimaryButton from '@/components/common/PrimaryButton.vue'
import { vReveal } from '@/composables/useAnimations'
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()
const copied = ref(false)
let copyTimer = 0

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(store.profile.email)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    window.location.href = store.mailto
  }
}

onBeforeUnmount(() => clearTimeout(copyTimer))
</script>

<template>
  <section id="contact" class="scroll-mt-24 border-t border-line/50 py-20 sm:py-28">
    <div class="mx-auto max-w-content px-5 sm:px-8">
      <div
        v-reveal
        class="relative overflow-hidden rounded-3xl border border-line/60 bg-surface/40 p-8 sm:p-12"
      >
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-accent/10 blur-[100px]"
        />

        <div class="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p class="eyebrow">{{ store.contact.eyebrow }}</p>
            <h2 class="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              {{ store.contact.heading }}
            </h2>
            <p class="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {{ store.contact.blurb }}
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton :href="store.mailto">
                {{ store.contact.cta }}
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </PrimaryButton>

              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full border border-line/70 bg-background/40 px-4 py-2.5 text-sm font-medium text-muted transition hover:border-accent/50 hover:text-foreground"
                @click="copyEmail"
              >
                {{ copied ? 'Email copied' : store.profile.email }}
                <svg v-if="copied" class="size-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <svg v-else class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                </svg>
              </button>
            </div>
          </div>

          <div class="rounded-2xl border border-line/60 bg-background/40 p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Elsewhere</p>
            <div class="mt-4 space-y-2">
              <a
                v-for="social in store.socials"
                :key="social.label"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-surface/40 px-4 py-3 text-sm transition hover:border-accent/50"
              >
                <span class="font-medium">{{ social.label }}</span>
                <span class="text-xs text-muted">{{ social.handle }}</span>
              </a>
              <a
                :href="store.mailto"
                class="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-surface/40 px-4 py-3 text-sm transition hover:border-accent/50"
              >
                <span class="font-medium">Email</span>
                <span class="text-xs text-muted">{{ store.profile.email }}</span>
              </a>
            </div>
            <p class="mt-5 flex items-center gap-2 text-xs text-muted">
              <span class="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {{ store.profile.location }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
