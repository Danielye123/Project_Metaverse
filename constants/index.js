export const exploreWorlds = [
  {
    id: 'world-1',
    imgUrl: '/planet-01.webp',
    title: 'Lumina Reach',
    theme: { accent: '#F5A623', glow: '#FFCE73' },
    ambience: 'embers',
    tagline: 'Lumina Reach — a world that never sleeps.',
    blurb: 'Neon canyons and floating night-markets that glow brighter the deeper you wander.',
  },
  {
    id: 'world-2',
    imgUrl: '/planet-02.webp',
    title: 'The Verdant Expanse',
    theme: { accent: '#2BB673', glow: '#7CF0B2' },
    ambience: 'fireflies',
    tagline: 'The Verdant Expanse — wilderness without end.',
    blurb: 'Endless forests and slow rivers you can genuinely get lost in, and want to.',
  },
  {
    id: 'world-3',
    imgUrl: '/planet-03.webp',
    title: 'Halcyon Drift',
    theme: { accent: '#22B8C7', glow: '#7FE9F0' },
    ambience: 'aurora',
    tagline: 'Halcyon Drift — drift, and breathe.',
    blurb: 'A calm archipelago in the clouds, built for slowing all the way down.',
  },
  {
    id: 'world-4',
    imgUrl: '/planet-04.webp',
    title: 'Obsidian Spire',
    theme: { accent: '#7C3AED', glow: '#C4A0FF' },
    ambience: 'dense',
    tagline: 'Obsidian Spire — a vertical city carved into the dark.',
    blurb: 'A tower-world of black glass where the night never quite ends.',
  },
  {
    id: 'world-5',
    imgUrl: '/planet-05.webp',
    title: 'Aurora Sands',
    theme: { accent: '#FF4D8D', glow: '#FF9EC4' },
    ambience: 'comets',
    tagline: 'Aurora Sands — where the sky is always dawn.',
    blurb: 'Rose-gold dunes beneath a sky that ripples like the northern lights.',
  },
];

export const startingFeatures = [
  'Pick a world that matches the experience you are after',
  'Pull on your headset and step across the threshold',
  'Move, build, and meet others — the world responds to you',
];

export const newFeatures = [
  {
    imgUrl: '/vrpano.svg',
    title: 'New worlds weekly',
    subtitle:
        'Fully-realized worlds drop every week, so there is always somewhere new to lose yourself.',
  },
  {
    imgUrl: '/headset.svg',
    title: 'True presence',
    subtitle:
        'Spatial audio and full-body tracking make every world feel close enough to reach out and touch.',
  },
];

export const insights = [
  {
    imgUrl: '/planet-06.webp',
    category: 'Spatial',
    readTime: '6 min read',
    title: 'How spatial computing quietly rewired the internet',
    subtitle:
        'The jump from screens to spaces changed how we meet, work, and play online — here is what shifted and why it stuck.',
  },
  {
    imgUrl: '/planet-07.webp',
    category: 'Guides',
    readTime: '4 min read',
    title: 'Seven ways to feel at home in your first virtual world',
    subtitle:
        'New to AETHER? These small habits help the worlds stop feeling like software and start feeling like places.',
  },
  {
    imgUrl: '/planet-08.webp',
    category: 'Worlds',
    readTime: '5 min read',
    title: 'One platform, a thousand worlds: a tour of what is possible',
    subtitle:
        'From quiet retreats to sprawling cities, a look at the range of worlds you can step into without leaving your room.',
  },
];

export const socials = [
  {
    name: 'twitter',
    url: '/twitter.svg',
    link: 'https://twitter.com',
  },
  {
    name: 'linkedin',
    url: '/linkedin.svg',
    link: 'https://linkedin.com',
  },
  {
    name: 'instagram',
    url: '/instagram.svg',
    link: 'https://instagram.com',
  },
  {
    name: 'facebook',
    url: '/facebook.svg',
    link: 'https://facebook.com',
  },
];

export const navLinks = [
  { id: 'explore', title: 'Worlds' },
  { id: 'pricing', title: 'Pricing' },
  { id: 'faq', title: 'FAQ' },
];

export const statistics = [
  { value: 1200, suffix: '+', label: 'Living worlds' },
  { value: 480, suffix: 'K', label: 'Active explorers' },
  { value: 3.1, suffix: 'M', label: 'Hours explored' },
  { value: 4.9, suffix: '', label: 'Avg. world rating' },
];

export const pricingPlans = [
  {
    id: 'explorer',
    title: 'Explorer',
    monthly: 0,
    annual: 0,
    blurb: 'Step in and wander the public worlds, free forever.',
    features: [
      'Access to all public worlds',
      'Spatial audio & full-body presence',
      'Up to 3 saved worlds',
    ],
    popular: false,
  },
  {
    id: 'creator',
    title: 'Creator',
    monthly: 12,
    annual: 9,
    blurb: 'Build, host, and share worlds of your own.',
    features: [
      'Everything in Explorer',
      'Build & publish unlimited worlds',
      'Invite up to 50 explorers at once',
      'Priority world rendering',
    ],
    popular: true,
  },
  {
    id: 'studio',
    title: 'Studio',
    monthly: 39,
    annual: 31,
    blurb: 'For teams shipping persistent, large-scale worlds.',
    features: [
      'Everything in Creator',
      'Persistent worlds with 500+ explorers',
      'Team roles & shared assets',
      'Analytics & dedicated support',
    ],
    popular: false,
  },
];

export const faqs = [
  {
    question: 'What headset do I need to use AETHER?',
    answer:
        'AETHER runs on every major standalone and PC-tethered headset. No headset yet? You can still explore most worlds in a flat 2D mode from your browser.',
  },
  {
    question: 'Do worlds work offline?',
    answer:
        'Saved worlds cache locally so you can wander them offline. Live, shared features like seeing other explorers need a connection.',
  },
  {
    question: 'Can I build my own world?',
    answer:
        'Yes. On the Creator plan and up you can build, publish, and host your own worlds with no code required, then invite others straight in.',
  },
  {
    question: 'How much does AETHER cost?',
    answer:
        'Exploring is free forever. Building and hosting your own worlds starts at $9/month on an annual Creator plan. See the pricing section above for details.',
  },
  {
    question: 'Who can see my data?',
    answer:
        'Your worlds and presence are private by default. You choose what to publish, and we never sell your activity to third parties.',
  },
];
