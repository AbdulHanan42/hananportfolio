import { computed, onBeforeUnmount, onMounted, ref, toValue, watch } from 'vue'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const normalizeYaw = (value) => ((value % 360) + 360) % 360
const shortestAngle = (value) => ((((value + 180) % 360) + 360) % 360) - 180

export function use360(options = {}) {
  const image = computed(() => toValue(options.image) ?? '')
  const hotspots = computed(() => toValue(options.hotspots) ?? [])

  const startYaw = normalizeYaw(options.initialYaw ?? 180)
  const startPitch = options.initialPitch ?? 0
  const startFov = options.initialFov ?? 85
  const minFov = options.minFov ?? 38
  const maxFov = options.maxFov ?? 110
  const autoRotateSpeed = options.autoRotateSpeed ?? 4

  const stageEl = ref(null)
  const ready = ref(false)
  const failed = ref(false)
  const dragging = ref(false)
  const autoRotate = ref(false)

  const size = ref({ width: 0, height: 0 })
  const yaw = ref(startYaw)
  const pitch = ref(startPitch)
  const fov = ref(clamp(startFov, minFov, maxFov))

  const panoWidth = computed(() => size.value.width * (360 / fov.value))
  const panoHeight = computed(() => panoWidth.value / 2)

  const pitchLimit = computed(() => {
    const height = panoHeight.value
    const stageHeight = size.value.height
    if (!height || height <= stageHeight) return 0
    return ((height - stageHeight) / height) * 90
  })

  function clampPitch(value) {
    return clamp(value, -pitchLimit.value, pitchLimit.value)
  }

  // Two copies of the panorama are laid side by side so a full 360 stays seamless.
  const offsetX = computed(() => {
    const width = panoWidth.value
    if (!width) return 0
    const raw = size.value.width / 2 - width * (yaw.value / 360)
    return ((raw % width) + width) % width - width
  })

  const offsetY = computed(() => {
    const height = panoHeight.value
    const stageHeight = size.value.height
    if (!height) return 0
    if (height <= stageHeight) return (stageHeight - height) / 2
    return clamp(stageHeight / 2 - height * ((90 - pitch.value) / 180), stageHeight - height, 0)
  })

  const markers = computed(() => {
    const width = panoWidth.value
    const stageWidth = size.value.width
    const stageHeight = size.value.height
    if (!width) return []

    return hotspots.value.map((spot) => {
      const angle = shortestAngle(Number(spot.yaw) - yaw.value)
      const x = stageWidth / 2 + (angle / 360) * width
      const y = offsetY.value + panoHeight.value * ((90 - Number(spot.pitch)) / 180)
      const inView =
        Math.abs(angle) <= fov.value / 2 + 4 &&
        x > 64 &&
        x < stageWidth - 64 &&
        y > 16 &&
        y < stageHeight - 16
      return { ...spot, x, y, visible: inView }
    })
  })

  const pointers = new Map()
  let dragStart = null
  let pinchStart = null
  let lastMove = null
  let velocity = { yaw: 0, pitch: 0 }
  let inertiaId = 0
  let rotateId = 0
  let lastRotateFrame = 0
  let resizeObserver = null
  let preloader = null

  function stopInertia() {
    if (inertiaId) cancelAnimationFrame(inertiaId)
    inertiaId = 0
  }

  function startInertia() {
    const step = () => {
      velocity.yaw *= 0.94
      velocity.pitch *= 0.94
      if (Math.abs(velocity.yaw) < 0.0015 && Math.abs(velocity.pitch) < 0.0015) {
        inertiaId = 0
        return
      }
      yaw.value = normalizeYaw(yaw.value + velocity.yaw * 16)
      pitch.value = clampPitch(pitch.value + velocity.pitch * 16)
      inertiaId = requestAnimationFrame(step)
    }
    inertiaId = requestAnimationFrame(step)
  }

  function pointerDistance() {
    const [a, b] = [...pointers.values()]
    return Math.hypot(a.x - b.x, a.y - b.y)
  }

  function onPointerDown(event) {
    if (!ready.value) return
    stageEl.value?.setPointerCapture?.(event.pointerId)
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    autoRotate.value = false
    stopInertia()
    velocity = { yaw: 0, pitch: 0 }

    if (pointers.size === 1) {
      dragging.value = true
      dragStart = { x: event.clientX, y: event.clientY, yaw: yaw.value, pitch: pitch.value }
      lastMove = { x: event.clientX, y: event.clientY, time: performance.now() }
    } else if (pointers.size === 2) {
      pinchStart = { distance: pointerDistance(), fov: fov.value }
    }
  }

  function onPointerMove(event) {
    if (!pointers.has(event.pointerId)) return
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointers.size >= 2 && pinchStart) {
      const distance = pointerDistance()
      if (distance > 0) {
        fov.value = clamp(pinchStart.fov * (pinchStart.distance / distance), minFov, maxFov)
        pitch.value = clampPitch(pitch.value)
      }
      return
    }

    if (!dragging.value || !dragStart) return
    const width = panoWidth.value
    const height = panoHeight.value
    if (!width || !height) return

    const now = performance.now()
    yaw.value = normalizeYaw(dragStart.yaw - ((event.clientX - dragStart.x) / width) * 360)
    pitch.value = clampPitch(dragStart.pitch + ((event.clientY - dragStart.y) / height) * 180)

    if (lastMove && now > lastMove.time) {
      const elapsed = now - lastMove.time
      velocity.yaw = (-((event.clientX - lastMove.x) / width) * 360) / elapsed
      velocity.pitch = (((event.clientY - lastMove.y) / height) * 180) / elapsed
    }
    lastMove = { x: event.clientX, y: event.clientY, time: now }
  }

  function onPointerUp(event) {
    pointers.delete(event.pointerId)
    stageEl.value?.releasePointerCapture?.(event.pointerId)

    if (pointers.size === 1) {
      const [remaining] = pointers.values()
      dragStart = { x: remaining.x, y: remaining.y, yaw: yaw.value, pitch: pitch.value }
      lastMove = { x: remaining.x, y: remaining.y, time: performance.now() }
      pinchStart = null
      return
    }

    if (pointers.size > 0) {
      pinchStart = null
      return
    }

    dragging.value = false
    dragStart = null
    pinchStart = null
    if (Math.abs(velocity.yaw) > 0.002 || Math.abs(velocity.pitch) > 0.002) startInertia()
  }

  function onWheel(event) {
    if (!ready.value) return
    event.preventDefault()
    autoRotate.value = false
    fov.value = clamp(fov.value + event.deltaY * 0.05, minFov, maxFov)
    pitch.value = clampPitch(pitch.value)
  }

  function onKeydown(event) {
    const controlKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', '_']
    if (!controlKeys.includes(event.key)) return

    event.preventDefault()
    autoRotate.value = false
    const step = 6

    if (event.key === 'ArrowLeft') yaw.value = normalizeYaw(yaw.value - step)
    if (event.key === 'ArrowRight') yaw.value = normalizeYaw(yaw.value + step)
    if (event.key === 'ArrowUp') pitch.value = clampPitch(pitch.value + step)
    if (event.key === 'ArrowDown') pitch.value = clampPitch(pitch.value - step)
    if (event.key === '+' || event.key === '=') fov.value = clamp(fov.value - 5, minFov, maxFov)
    if (event.key === '-' || event.key === '_') fov.value = clamp(fov.value + 5, minFov, maxFov)
  }

  function reset() {
    autoRotate.value = false
    yaw.value = startYaw
    pitch.value = clamp(startPitch, -pitchLimit.value, pitchLimit.value)
    fov.value = clamp(startFov, minFov, maxFov)
  }

  function stopAutoRotateLoop() {
    if (rotateId) cancelAnimationFrame(rotateId)
    rotateId = 0
  }

  watch(autoRotate, (on) => {
    stopAutoRotateLoop()
    if (!on) return

    lastRotateFrame = performance.now()
    const step = (now) => {
      if (!autoRotate.value) {
        rotateId = 0
        return
      }
      const delta = Math.min(now - lastRotateFrame, 64)
      lastRotateFrame = now
      if (!dragging.value) yaw.value = normalizeYaw(yaw.value + (autoRotateSpeed * delta) / 1000)
      rotateId = requestAnimationFrame(step)
    }
    rotateId = requestAnimationFrame(step)
  })

  function measure() {
    const el = stageEl.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    size.value = { width: rect.width, height: rect.height }
  }

  function loadImage() {
    ready.value = false
    failed.value = false
    const src = image.value
    if (!src) return

    preloader = new Image()
    preloader.decoding = 'async'
    preloader.onload = () => {
      ready.value = true
    }
    preloader.onerror = () => {
      failed.value = true
    }
    preloader.src = src
  }

  watch(image, loadImage, { immediate: true })

  onMounted(() => {
    measure()
    stageEl.value?.addEventListener('wheel', onWheel, { passive: false })
    if (stageEl.value && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(measure)
      resizeObserver.observe(stageEl.value)
    }
  })

  onBeforeUnmount(() => {
    stopInertia()
    stopAutoRotateLoop()
    resizeObserver?.disconnect()
    stageEl.value?.removeEventListener('wheel', onWheel)
    if (preloader) {
      preloader.onload = null
      preloader.onerror = null
    }
  })

  return {
    stageEl,
    ready,
    failed,
    dragging,
    autoRotate,
    yaw,
    pitch,
    fov,
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
  }
}
