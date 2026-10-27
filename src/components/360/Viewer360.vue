<script setup>
import { computed, ref } from 'vue'

import { use360 } from '@/composables/use360'

const props = defineProps({
  eyebrow: { type: String, default: '360° viewer' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  initialYaw: { type: Number, default: 140 },
  initialPitch: { type: Number, default: 0 },
  initialFov: { type: Number, default: 85 },
  hotspots: { type: Array, default: () => [] },
})

const {
  stageEl,
  ready,
  failed,
  dragging,
  autoRotate,
  panoWidth,
  panoHeight,
  offsetX,
  offsetY,
  markers,
  reset,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onKeydown,
} = use360({
  image: () => props.image,
  hotspots: () => props.hotspots,
  initialYaw: props.initialYaw,
  initialPitch: props.initialPitch,
  initialFov: props.initialFov,
})

const activeHotspot = ref(null)

const rowStyle = computed(() => ({
  width: `${panoWidth.value * 2}px`,
  height: `${panoHeight.value}px`,
  transform: `translate3d(${offsetX.value}px, ${offsetY.value}px, 0)`,
}))

const imageStyle = computed(() => ({
  width: `${panoWidth.value}px`,
  height: `${panoHeight.value}px`,
}))

function openHotspot(marker) {
  activeHotspot.value = marker
  autoRotate.value = false
}

// Stage pointer capture would otherwise retarget clicks on the overlay controls.
function onStagePointerDown(event) {
  if (event.target.closest('button, a, article')) return
  onPointerDown(event)
}
</script>

<template>
  <div class="overflow-hidden rounded-3xl border border-line/60 bg-surface/40">
    <div class="flex flex-col gap-3 p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
      <div class="max-w-xl">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{{ eyebrow }}</p>
        <h3 class="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{{ title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ description }}</p>
      </div>
      <p class="hidden text-xs text-muted/80 sm:block">Drag · scroll to zoom · open a hotspot</p>
    </div>

    <div
      ref="stageEl"
      class="relative h-[340px] touch-none select-none overflow-hidden bg-background outline-none sm:h-[460px]"
      :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
      role="group"
      tabindex="0"
      aria-label="360 degree studio panorama. Drag, use arrow keys to look around, or scroll to zoom."
      @pointerdown="onStagePointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown="onKeydown"
      @keydown.escape="activeHotspot = null"
    >
      <div v-if="ready" class="absolute left-0 top-0 flex will-change-transform" :style="rowStyle">
        <img :src="image" alt="" :style="imageStyle" draggable="false" class="block max-w-none" />
        <img :src="image" alt="" :style="imageStyle" draggable="false" class="block max-w-none" />
      </div>

      <div
        v-else-if="failed || !image"
        class="absolute inset-0 grid place-items-center p-6 text-center"
      >
        <div class="max-w-sm rounded-2xl border border-dashed border-line/70 bg-surface/40 p-6">
          <p class="text-sm font-semibold">No panorama loaded</p>
          <p class="mt-1 text-xs leading-relaxed text-muted">
            Add a 2:1 equirectangular image to
            <code class="rounded bg-background/60 px-1 py-0.5 text-accent">public/360-assets</code>
            and set its path on the showcase in the store.
          </p>
        </div>
      </div>

      <p v-else class="absolute inset-0 grid place-items-center text-sm text-muted">
        Loading panorama…
      </p>

      <button
        v-for="marker in markers"
        :key="marker.id"
        type="button"
        class="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition duration-300"
        :class="
          marker.visible
            ? 'border-accent/50 bg-background/80 text-foreground opacity-100'
            : 'pointer-events-none border-transparent bg-transparent opacity-0'
        "
        :style="{ left: `${marker.x}px`, top: `${marker.y}px` }"
        @pointerdown.stop
        @click.stop="openHotspot(marker)"
      >
        <span class="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        {{ marker.title }}
      </button>

      <div class="absolute right-3 top-3 z-20 flex items-center gap-2">
        <button
          type="button"
          class="grid size-9 place-items-center rounded-lg border backdrop-blur-md transition"
          :class="
            autoRotate
              ? 'border-accent bg-accent text-accent-ink'
              : 'border-line/70 bg-background/70 text-foreground hover:border-accent/50'
          "
          :aria-pressed="autoRotate"
          aria-label="Toggle auto-rotation"
          @click="autoRotate = !autoRotate"
        >
          <svg v-if="autoRotate" class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
          </svg>
          <svg v-else class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <button
          type="button"
          class="grid size-9 place-items-center rounded-lg border border-line/70 bg-background/70 text-foreground backdrop-blur-md transition hover:border-accent/50"
          aria-label="Reset view"
          @click="reset"
        >
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
          </svg>
        </button>
      </div>

      <p
        v-if="!activeHotspot"
        class="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center px-3"
      >
        <span class="rounded-full border border-line/60 bg-background/70 px-3 py-1 text-[0.7rem] text-muted backdrop-blur-md">
          Drag to look around · scroll or pinch to zoom
        </span>
      </p>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-y-3 opacity-0"
        leave-active-class="transition duration-200 ease-in"
        leave-to-class="translate-y-3 opacity-0"
      >
        <article
          v-if="activeHotspot"
          class="absolute inset-x-3 bottom-3 z-20 rounded-2xl border border-line/70 bg-background/85 p-4 backdrop-blur-md sm:inset-x-auto sm:left-4 sm:w-80"
          aria-live="polite"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent">Hotspot</p>
              <h4 class="mt-1 text-base font-semibold">{{ activeHotspot.title }}</h4>
            </div>
            <button
              type="button"
              class="grid size-8 shrink-0 place-items-center rounded-lg border border-line/60 text-muted transition hover:border-accent/50 hover:text-foreground"
              aria-label="Close hotspot details"
              @click="activeHotspot = null"
            >
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ activeHotspot.description }}</p>
        </article>
      </Transition>
    </div>
  </div>
</template>
