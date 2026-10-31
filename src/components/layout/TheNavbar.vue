<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import BaseButton from '@/components/common/BaseButton.vue'
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()
const open = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300"
    :class="scrolled ? 'border-line-soft bg-background-glass' : 'border-transparent bg-transparent'"
  >
    <div class="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-3 sm:px-8">
      <a href="#home" class="group inline-flex items-center gap-3" @click="open = false">
        <span
          class="grid size-10 place-items-center rounded-xl border border-line-soft bg-surface text-sm font-bold text-primary transition group-hover:border-primary"
        >
          {{ store.profile.initials }}
        </span>
        <span class="flex flex-col leading-tight">
          <span class="text-sm font-semibold tracking-tight">{{ store.profile.name }}</span>
          <span class="text-[0.7rem] text-muted">{{ store.profile.role }}</span>
        </span>
      </a>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Primary">
        <a
          v-for="link in store.nav"
          :key="link.href"
          :href="link.href"
          class="rounded-full px-3 py-2 text-sm text-muted transition hover:bg-surface hover:text-foreground"
        >
          {{ link.label }}
        </a>
      </nav>

      <BaseButton href="#contact" size="sm" class="hidden md:inline-flex">Let's talk</BaseButton>

      <button
        type="button"
        class="grid size-10 place-items-center rounded-xl border border-line-soft bg-surface-soft text-foreground transition hover:border-primary md:hidden"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        @click="open = !open"
      >
        <svg v-if="open" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
        <svg v-else class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav
        v-if="open"
        id="mobile-nav"
        class="border-t border-line-soft bg-background-glass px-5 pb-5 pt-3 md:hidden"
        aria-label="Mobile"
      >
        <a
          v-for="link in store.nav"
          :key="link.href"
          :href="link.href"
          class="block rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-surface hover:text-foreground"
          @click="open = false"
        >
          {{ link.label }}
        </a>
        <BaseButton href="#contact" size="sm" class="mt-3 w-full" @click="open = false">
          Let's talk
        </BaseButton>
      </nav>
    </Transition>
  </header>
</template>
