<script setup>
import { onBeforeUnmount, ref } from 'vue'

import BaseButton from '@/components/common/BaseButton.vue'
import { vReveal } from '@/composables/useAnimations'
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()

const audioEl = ref(null)
const speaking = ref(false)
const usingFallback = ref(false)
const unavailable = ref(false)

function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

function stopIntro() {
  const el = audioEl.value
  if (el) {
    el.pause()
    el.currentTime = 0
  }
  stopSpeech()
  usingFallback.value = false
  speaking.value = false
}

function speakScript() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    unavailable.value = true
    speaking.value = false
    return
  }

  stopSpeech()
  usingFallback.value = true
  speaking.value = true

  const utterance = new SpeechSynthesisUtterance(store.intro.script)
  utterance.rate = 0.98
  utterance.pitch = 1
  utterance.onend = () => {
    speaking.value = false
    usingFallback.value = false
  }
  utterance.onerror = () => {
    speaking.value = false
    usingFallback.value = false
  }

  window.speechSynthesis.speak(utterance)
}

function startIntro() {
  const el = audioEl.value

  if (!el) {
    speakScript()
    return
  }

  el.currentTime = 0
  const playback = el.play()

  if (playback && typeof playback.then === 'function') {
    playback.then(
      () => {
        speaking.value = true
        unavailable.value = false
      },
      () => speakScript(),
    )
  } else {
    speaking.value = true
  }
}

function toggleIntro() {
  if (speaking.value) {
    stopIntro()
    return
  }
  startIntro()
}

function onAudioEnded() {
  speaking.value = false
  if (audioEl.value) audioEl.value.currentTime = 0
}

function onAudioError() {
  if (!usingFallback.value) speakScript()
}

onBeforeUnmount(() => {
  audioEl.value?.pause()
  stopSpeech()
})
</script>

<template>
  <section id="home" class="relative scroll-mt-24 overflow-hidden">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="absolute -top-24 right-[-10%] size-[32rem] rounded-full bg-primary-soft blur-[130px]" />
      <div class="absolute bottom-0 left-[8%] size-[26rem] rounded-full bg-primary-glow blur-[110px]" />
    </div>

    <div
      class="relative mx-auto grid max-w-content items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
    >
      <div>
        <p
          v-reveal
          class="inline-flex items-center gap-2 rounded-full border border-line-soft bg-surface-soft px-3 py-1 text-xs font-medium text-muted backdrop-blur"
        >
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full bg-primary-soft motion-reduce:animate-none"
            />
            <span class="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {{ store.profile.availability }}
        </p>

        <p v-reveal="60" class="eyebrow mt-7">{{ store.hero.greeting }}</p>

        <h1 v-reveal="100" class="mt-3 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          {{ store.profile.name }}
          <span class="mt-2 block text-gradient">{{ store.profile.role }}</span>
        </h1>

        <p v-reveal="180" class="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {{ store.profile.summary }}
        </p>

        <div v-reveal="240" class="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
          <BaseButton
            size="lg"
            :aria-pressed="speaking"
            :data-state="speaking ? 'speaking' : 'idle'"
            @click="toggleIntro"
          >
            <svg
              v-if="speaking"
              class="size-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
            <svg
              v-else
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H3v6h3l5 4z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
            {{ speaking ? store.hero.introStop : store.hero.introCta }}
          </BaseButton>

          <p class="text-xs text-muted-soft">{{ store.hero.introNote }} · {{ store.intro.duration }}</p>
          <p v-if="unavailable" class="text-xs text-muted">Audio playback is not supported here.</p>
        </div>

        <audio
          ref="audioEl"
          :src="store.intro.audioSrc"
          preload="auto"
          aria-hidden="true"
          class="sr-only"
          @play="speaking = true"
          @ended="onAudioEnded"
          @error="onAudioError"
        />

        <dl v-reveal="320" class="mt-12 grid gap-6 border-t border-line-soft pt-8 sm:grid-cols-3">
          <div v-for="stat in store.stats" :key="stat.label">
            <dd class="text-3xl font-semibold tracking-tight text-foreground">{{ stat.value }}</dd>
            <dt class="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{{ stat.label }}</dt>
          </div>
        </dl>
      </div>

      <div v-reveal="200" class="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -bottom-8 -left-8 size-36 rounded-full bg-primary-glow blur-2xl"
        />

        <div class="relative rounded-[2.75rem] border border-line-soft bg-surface-soft p-3 backdrop-blur">
          <div
            class="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-raised"
            :class="{ 'is-speaking': speaking }"
          >
            <img
              :src="store.avatar.src"
              :alt="store.avatar.alt"
              width="900"
              height="1125"
              draggable="false"
              class="size-full object-cover object-center"
              :class="{ 'avatar-speaking': speaking }"
            />

            <div
              aria-hidden="true"
              class="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
              :style="{
                backgroundImage:
                  'linear-gradient(to top, var(--background-glass-color), transparent)',
              }"
            />

            <span
              v-if="speaking"
              aria-hidden="true"
              class="speak-ring pointer-events-none absolute inset-0 rounded-[2.25rem] border-2 border-primary"
            />

            <div
              class="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-line-soft bg-background-glass px-4 py-3 backdrop-blur-md"
            >
              <div class="flex items-center gap-2.5">
                <span aria-hidden="true" class="flex h-5 items-end gap-1">
                  <span
                    v-for="bar in 4"
                    :key="bar"
                    class="eq-bar h-4 w-1 rounded-full bg-primary"
                    :style="{ animationDelay: `${(bar - 1) * 130}ms` }"
                  />
                </span>
                <span class="text-xs font-medium text-muted" aria-live="polite">
                  {{ speaking ? store.hero.speakingLabel : store.hero.idleLabel }}
                </span>
              </div>
              <span class="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-soft">
                {{ store.intro.duration }}
              </span>
            </div>
          </div>
        </div>

        <ul class="mt-5 flex flex-wrap justify-center gap-2">
          <li
            v-for="tag in store.profile.stack"
            :key="tag"
            class="rounded-full border border-line-soft bg-surface-soft px-3 py-1 text-xs text-muted"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
