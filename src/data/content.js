// Single source of truth for all portfolio content.
import profileImage from '../assets/optimized/profileImage.jpg';
import certificate from '../assets/logos/John_Adhikari_Certificate.pdf';
import zoneMartLogo from '../assets/logos/zone-mart-logo.svg';
import zoneMediaLogo from '../assets/logos/zone-media-logo.png';
import chatBotLogo from '../assets/logos/chat-bot-logo.svg';
import pailaLogo from '../assets/logos/paila-logo.svg';
import webAgentLogo from '../assets/logos/web-agent-logo.svg';
import firstAgentLogo from '../assets/logos/first-agent-logo.svg';

export const profile = {
  name: 'John Adhikari',
  firstName: 'John',
  domain: '.space',
  tagline: 'Full-Stack Developer · AI Agent Builder · Flutter Mobile Dev',
  summary:
    'I design clean interfaces, wire reliable APIs, and teach AI agents to write real code. Currently based in Kathmandu, building for the whole planet.',
  location: 'Kathmandu, Nepal',
  email: 'johnadhikari99@gmail.com',
  phone: '+977 9849099677',
  image: profileImage,
  avatarAlt: 'John Adhikari — portfolio portrait',
};

export const roles = ['Full-Stack Developer', 'AI Agent Builder', 'Front-End Developer', 'Flutter Mobile Dev'];

export const socials = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/JohnAdhikari' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/john-adhikari' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/john_adhikarii/' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/jack.septiceye.31945' },
];

export const heroStats = [
  { id: 'projects', label: 'Projects built', value: 6 },
  { id: 'live', label: 'Live deploys', value: 4 },
  { id: 'agents', label: 'AI agents built', value: 2 },
  { id: 'apps', label: 'Mobile apps', value: 1 },
];

export const marqueeItems = [
  'React',
  'Python',
  'CrewAI',
  'Gemini AI',
  'OpenAI',
  'Tailwind CSS',
  'Flutter',
  'FastAPI',
  'GitHub Pages',
  'PWA',
  'JavaScript',
  'AI Agents',
];

export const skillGroups = [
  {
    name: 'Frontend',
    icon: 'layers',
    items: [
      { label: 'React', level: 92 },
      { label: 'JavaScript', level: 90 },
      { label: 'Tailwind CSS', level: 90 },
      { label: 'HTML & CSS', level: 95 },
    ],
  },
  {
    name: 'Backend',
    icon: 'server',
    items: [
      { label: 'Python', level: 86 },
      { label: 'FastAPI', level: 84 },
      { label: 'SQLite', level: 82 },
      { label: 'REST APIs', level: 85 },
    ],
  },
  {
    name: 'AI & Agents',
    icon: 'chip',
    items: [
      { label: 'Gemini AI', level: 88 },
      { label: 'OpenAI', level: 85 },
      { label: 'CrewAI', level: 87 },
      { label: 'Prompt Engineering', level: 90 },
    ],
  },
];

export const missions = [
  'Teaching AI agents to build whole applications',
  'Brewing an offline GPS map for Nepal',
  'Perfecting e-commerce interfaces that scale',
  'Always learning a new technology',
];

export const sports = [
  { name: 'Basketball', line: 'Weekend hooper', icon: 'basketball' },
  { name: 'Football', line: 'Kickabouts with friends', icon: 'football' },
];

export const favorites = [
  { title: 'Harry Potter', note: 'All 8 films — I grew up with the magic', stars: 5, poster: 'harry-potter.jpg' },
  { title: 'Interstellar', note: 'Space — obviously', stars: 5, poster: 'interstellar.jpg' },
  { title: 'Breaking Bad', note: 'I am the one who builds', stars: 5, poster: 'breaking-bad.jpg' },
  { title: 'From', note: 'A town that traps you — mystery horror at its best', stars: 5, poster: 'from.jpg' },
  { title: 'The Conjuring', note: 'All films — the lights stay on', stars: 4, poster: 'the-conjuring.jpg' },
];

export const certifications = [
  {
    title: 'Generative AI Mastermind',
    issuer: 'Certificate of completion',
    icon: 'brain',
    desc: 'Immersive, hands-on journey through modern generative AI — models, prompting, and real-world agent workflows.',
    link: certificate,
    badge: 'Verified',
  },
];

export const projects = [
  {
    title: 'Zone Mart',
    icon: 'cart',
    logo: zoneMartLogo,
    desc: 'A full galaxy of products — search, filters, cart, checkout and account. Survives the vacuum (offline PWA) with 15 currencies & 4 languages.',
    tech: ['React', 'Vite', 'PWA'],
    link: 'https://johnadhikari.github.io/zone-mart/',
    badge: 'Live',
  },
  {
    title: 'Zone Media',
    icon: 'chat',
    logo: zoneMediaLogo,
    desc: 'A space station for socializing — auth, live post feed with likes & comments, friends, real-time messaging with read receipts, and an editable profile, powered by FastAPI + Postgres.',
    tech: ['React', 'Tailwind', 'FastAPI', 'Postgres'],
    link: 'https://JohnAdhikari.github.io/social-media/',
    badge: 'Live',
  },
  {
    title: 'Zone AI Chat Assistant',
    icon: 'bot',
    logo: chatBotLogo,
    desc: 'An AI co-pilot that switches between Gemini and GPT-4o Mini — the mission computer of chat interfaces.',
    tech: ['React', 'Gemini', 'OpenAI'],
    link: 'https://JohnAdhikari.github.io/chat-bot/',
    badge: 'Live',
  },
  {
    title: 'Paila — Offline GPS',
    icon: 'map',
    logo: pailaLogo,
    desc: 'A star map for Nepal — offline navigation, road routing, trip logs and 210+ hidden points of interest, no signal needed.',
    tech: ['Flutter', 'flutter_map', 'OSRM'],
    link: '',
    badge: 'Mobile',
  },
  {
    title: 'Web Agent',
    icon: 'network',
    logo: webAgentLogo,
    desc: 'A fleet of AI drones that plans and builds whole apps (React + FastAPI + SQLite) from a single command.',
    tech: ['Python', 'CrewAI', 'Gemini'],
    link: '',
    badge: 'AI Agent',
  },
  {
    title: 'First Agent',
    icon: 'antenna',
    logo: firstAgentLogo,
    desc: 'A signal-relay AI that sorts your inbox, triages messages and drafts replies automatically.',
    tech: ['Python', 'CrewAI', 'SMTP/IMAP'],
    link: '',
    badge: 'AI Agent',
  },
];

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'hobbies', label: 'Interests' },
  { id: 'certifications', label: 'Badges' },
  { id: 'contact', label: 'Contact' },
];
