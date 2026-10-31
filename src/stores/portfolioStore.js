import { defineStore } from 'pinia'

import avatarImage from '@/assets/images/avatar-abdul-hanan.webp'

// All page content lives here — sections only render this state.
export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    profile: {
      name: 'Abdul Hanan',
      initials: 'AH',
      role: 'Full-Stack Web Developer',
      tagline: 'I build fast, accessible web apps and the systems behind them.',
      summary:
        'Vue 3 on the front, clear data models on the back. I turn busy workflows into interfaces that feel simple, and I stay involved from the first wireframe to the last deploy.',
      location: 'Pakistan · Working worldwide',
      availability: 'Available for freelance & contract work',
      email: 'hello@abdulhanan.dev',
      stack: ['React', 'FastAPI', 'Laravel', 'MySQL'],
    },

    hero: {
      greeting: 'Hello, I am',
      introCta: 'Introduce myself',
      introStop: 'Stop introducing',
      introNote: 'Voice introduction',
      speakingLabel: 'Speaking now',
      idleLabel: 'Tap to hear my introduction',
    },

    avatar: {
      src: avatarImage,
      alt: 'Illustrated portrait of Abdul Hanan wearing headphones around his neck',
    },

    intro: {
      audioSrc: '/audio/intro.wav',
      duration: '0:24',
      script:
        'Hi, I am Abdul Hanan. I am a full-stack web developer. I build fast, accessible interfaces with Vue 3, Pinia and Tailwind CSS, and I care about clean architecture, smooth motion and the details that make a product feel effortless. Take a look around, and if you have a project in mind, let us talk.',
    },

    nav: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Projects', href: '#projects' },
      { label: 'Skills', href: '#skills' },
      { label: 'Contact', href: '#contact' },
    ],

    socials: [
      { label: 'GitHub', handle: '@abdulhanan', href: 'https://github.com/abdulhanan' },
      { label: 'LinkedIn', handle: 'in/abdulhanan', href: 'https://www.linkedin.com/in/abdulhanan' },
    ],

    stats: [
      { value: '4+', label: 'Years building for the web' },
      { value: '30+', label: 'Products and systems shipped' },
      { value: '100%', label: 'Responsive, tested interfaces' },
    ],

    about: {
      eyebrow: 'About',
      heading: 'Interfaces that feel simple, systems that stay dependable.',
      paragraphs: [
        'I am Abdul Hanan, a full-stack developer focused on Vue applications, management systems and the integrations that connect them. Most of my work starts with a messy manual process and ends with a tool a team actually enjoys using.',
        'I care about the unglamorous parts — loading states, keyboard access, empty states, sensible defaults — because those are the details that decide whether software feels trustworthy.',
      ],
      highlights: [
        'Vue 3, Pinia and Vue Router',
        'REST APIs and relational data models',
        'Design systems built on tokens',
        'Performance budgets and accessibility',
      ],
    },

    services: {
      eyebrow: 'Services',
      heading: 'What I build',
      blurb: 'From single-page marketing sites to internal tools that run day-to-day operations.',
      items: [
        {
          title: 'Web Development',
          summary:
            'Marketing sites and product interfaces that load fast, hold up on small screens and stay easy to update.',
          points: ['Vue 3 + Vite', 'Responsive layouts', 'Motion and interaction'],
        },
        {
          title: 'Management Systems',
          summary:
            'Dashboards, CRMs, inventory and booking tools that replace spreadsheets and manual follow-ups.',
          points: ['Role-based access', 'Reporting views', 'Import and export'],
        },
        {
          title: 'UI Implementation',
          summary:
            'Turning designs into reusable, token-driven components with the states and edge cases already handled.',
          points: ['Design tokens', 'Accessible components', 'Design-to-code handoff'],
        },
        {
          title: 'Automation & Integrations',
          summary:
            'Connecting payments, messaging and internal tools so data moves without anyone copying it by hand.',
          points: ['REST and webhook flows', 'WhatsApp and email alerts', 'Scheduled jobs'],
        },
      ],
    },

    projects: {
      eyebrow: 'Projects',
      heading: 'Selected work',
      blurb: 'A few builds that show how I approach interfaces, data and the space between them.',
      items: [
        {
          name: 'Royal Routes Travel Platform',
          year: '2026',
          summary:
            'A travel booking front end with immersive 360° destination previews, package comparison and WhatsApp booking flows.',
          stack: ['Vue 3', 'Pinia', 'Tailwind CSS', 'Three.js'],
          href: null,
        },
        {
          name: 'Inventory Management System',
          year: '2025',
          summary:
            'Stock, suppliers and purchase orders with role-based access, low-stock alerts and printable reports.',
          stack: ['Vue 3', 'Laravel', 'MySQL'],
          href: null,
        },
        {
          name: 'Clinic Booking Dashboard',
          year: '2025',
          summary:
            'Appointment scheduling with calendar views, automated reminders and invoice generation for a multi-doctor practice.',
          stack: ['Vue 3', 'REST API', 'Tailwind CSS'],
          href: null,
        },
        {
          name: 'POS & Billing App',
          year: '2024',
          summary:
            'A touch-first point of sale with offline-first carts, barcode scanning and daily reconciliation.',
          stack: ['Vue 3', 'Pinia', 'IndexedDB'],
          href: null,
        },
      ],
      showcase360: {
        eyebrow: 'Interactive demo',
        title: '360° studio walkthrough',
        description:
          'Drag to look around, scroll or pinch to zoom, then open a hotspot. The viewer below runs on a small composable — no WebGL dependency.',
        image: '/360-assets/studio-360.jpg',
        initialYaw: 140,
        initialPitch: 2,
        initialFov: 85,
        hotspots: [
          {
            id: 'desk',
            yaw: 158,
            pitch: 4,
            title: 'Build desk',
            description: 'Where the components get written and the tests get run.',
          },
          {
            id: 'skyline',
            yaw: 52,
            pitch: 14,
            title: 'Blue-hour skyline',
            description: 'Floor-to-ceiling windows and a city that never quite goes dark.',
          },
          {
            id: 'lounge',
            yaw: 274,
            pitch: -2,
            title: 'Reading corner',
            description: 'Bookshelf, plants and the chair where architecture decisions get argued with.',
          },
        ],
      },
    },

    skills: {
      eyebrow: 'Skills',
      heading: 'Tools I reach for',
      blurb: 'The stack I default to, plus the tooling that keeps it honest.',
      groups: [
        { group: 'Frontend', items: ['Vue 3', 'JavaScript (ES2023)', 'HTML & CSS', 'Tailwind CSS', 'Vite'] },
        { group: 'State & Data', items: ['Pinia', 'Vue Router', 'REST APIs', 'MySQL', 'IndexedDB'] },
        { group: 'Tooling', items: ['Git & GitHub', 'Figma', 'Playwright', 'Vitest', 'ESLint'] },
      ],
    },

    contact: {
      eyebrow: 'Contact',
      heading: 'Have a product, system or idea to build?',
      blurb:
        'Tell me what you are working on and where it hurts. I reply within one working day with honest next steps — even if the answer is that you do not need me.',
      cta: 'Send an email',
    },
  }),

  getters: {
    mailto: (state) => `mailto:${state.profile.email}?subject=Project%20enquiry`,
    year: () => new Date().getFullYear(),
  },
})
