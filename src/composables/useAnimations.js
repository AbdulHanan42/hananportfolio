const REVEALED = 'is-visible'

let observer = null

function reducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add(REVEALED)
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return observer
}

export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')

    const delay = Number(binding.value) || 0
    if (delay > 0) el.style.animationDelay = `${delay}ms`

    // No observer (tests, older browsers) or reduced motion: show immediately.
    if (reducedMotion() || typeof IntersectionObserver === 'undefined') {
      el.classList.add(REVEALED)
      return
    }

    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
