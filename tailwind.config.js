/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-strong': 'var(--primary-strong-color)',
        'primary-ink': 'var(--primary-ink-color)',
        'primary-soft': 'var(--primary-soft-color)',
        'primary-glow': 'var(--primary-glow-color)',
        background: 'var(--background-color)',
        'background-glass': 'var(--background-glass-color)',
        surface: 'var(--surface-color)',
        'surface-soft': 'var(--surface-soft-color)',
        'surface-glass': 'var(--surface-glass-color)',
        'surface-strong': 'var(--surface-strong-color)',
        raised: 'var(--raised-color)',
        foreground: 'var(--foreground-color)',
        muted: 'var(--muted-color)',
        'muted-soft': 'var(--muted-soft-color)',
        line: 'var(--border-color)',
        'line-soft': 'var(--border-soft-color)',
        'line-strong': 'var(--border-strong-color)',
      },
      maxWidth: {
        content: '72rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
