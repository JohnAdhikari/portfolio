import React, { useState, useEffect, useRef } from 'react';
import {
  FaFacebookF, FaLinkedinIn, FaInstagram, FaGithub, FaSun, FaMoon,
  FaBars, FaTimes, FaBolt, FaSatellite, FaRocket, FaCheckCircle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight,
} from "react-icons/fa";
import StarField from './components/StarField';
import MouseTrail from './components/MouseTrail';
import CustomCursor from './components/CustomCursor';
import profileImage from './assets/profileImage.png';

const projects = [
  {
    title: 'Zone Mart', emoji: '🛒', color: 'from-amber-400 to-yellow-500',
    desc: 'A full galaxy of products — search, filters, cart, checkout and account. Survives the vacuum (offline PWA) with 15 currencies & 4 languages.',
    tech: ['React', 'Vite', 'PWA'],
    link: 'https://johnadhikari.github.io/zone-mart/',
    badge: 'Live',
  },
  {
    title: 'Zone Media', emoji: '💬', color: 'from-pink-500 to-rose-500',
    desc: 'A space station for socializing — signup/login, post feed, likes & comments powered by a FastAPI + SQLite core.',
    tech: ['React', 'Tailwind', 'FastAPI'],
    link: 'https://JohnAdhikari.github.io/social-media/',
    badge: 'Live',
  },
  {
    title: 'Zone AI Chat Assistant', emoji: '🤖', color: 'from-emerald-500 to-teal-500',
    desc: 'An AI co-pilot that switches between Gemini and GPT-4o Mini — the mission computer of chat interfaces.',
    tech: ['React', 'Gemini', 'OpenAI'],
    link: 'https://JohnAdhikari.github.io/chat-bot/',
    badge: 'Live',
  },
  {
    title: 'Paila — Offline GPS', emoji: '🗺️', color: 'from-orange-500 to-amber-500',
    desc: 'A star map for Nepal — offline navigation, road routing, trip logs and 210+ hidden points of interest, no signal needed.',
    tech: ['Flutter', 'flutter_map', 'OSRM'],
    link: '',
    badge: 'Mobile',
  },
  {
    title: 'Web Agent', emoji: '🕸️', color: 'from-blue-500 to-cyan-500',
    desc: 'A fleet of AI drones that plans and builds whole apps (React + FastAPI + SQLite) from a single command.',
    tech: ['Python', 'CrewAI', 'Gemini'],
    link: '',
    badge: 'AI Agent',
  },
  {
    title: 'First Agent', emoji: '📡', color: 'from-violet-500 to-purple-500',
    desc: 'A signal-relay AI that sorts your inbox, triages messages and drafts replies automatically.',
    tech: ['Python', 'CrewAI', 'SMTP/IMAP'],
    link: '',
    badge: 'AI Agent',
  },
];

const skillGroups = [
  {
    name: 'frontend', icon: '🎨',
    items: [
      { label: 'React', level: 92, emoji: '⚛️' },
      { label: 'JavaScript', level: 90, emoji: '🟨' },
      { label: 'Tailwind CSS', level: 90, emoji: '🎨' },
      { label: 'HTML & CSS', level: 95, emoji: '🧱' },
    ],
  },
  {
    name: 'backend', icon: '🛰️',
    items: [
      { label: 'Python', level: 86, emoji: '🐍' },
      { label: 'FastAPI', level: 84, emoji: '⚡' },
      { label: 'SQLite', level: 82, emoji: '🗄️' },
      { label: 'REST APIs', level: 85, emoji: '🔗' },
    ],
  },
  {
    name: 'ai & agents', icon: '🤖',
    items: [
      { label: 'Gemini AI', level: 88, emoji: '✨' },
      { label: 'OpenAI', level: 85, emoji: '🧠' },
      { label: 'CrewAI', level: 87, emoji: '🤝' },
      { label: 'Prompt Eng.', level: 90, emoji: '📡' },
    ],
  },
];

const marqueeItems = ['React', 'Python', 'CrewAI', 'Gemini AI', 'OpenAI', 'Tailwind CSS', 'Flutter', 'FastAPI', 'GitHub Pages', 'PWA', 'JavaScript', 'AI Agents'];

const roles = ['Full-Stack Developer', 'AI Agent Builder', 'Front-End Developer', 'Flutter Mobile Dev'];

const sports = [
  { name: 'Basketball', emoji: '🏀', line: 'Weekend hooper', color: 'from-orange-400 to-amber-500' },
  { name: 'Football', emoji: '⚽', line: 'Kickabouts with friends', color: 'from-green-500 to-emerald-500' },
];

const favorites = [
  { title: 'Harry Potter', emoji: '🧙‍♂️', note: 'All 8 films — I grew up with the magic', stars: 5, color: 'from-violet-500 to-purple-600' },
  { title: 'Interstellar', emoji: '🚀', note: 'Space — obviously', stars: 5, color: 'from-cyan-500 to-blue-600' },
  { title: 'Breaking Bad', emoji: '🧪', note: 'I am the one who builds', stars: 5, color: 'from-emerald-600 to-green-700' },
  { title: 'The Conjuring', emoji: '👻', note: 'All films — the lights stay on', stars: 4, color: 'from-slate-600 to-zinc-700' },
];

function useTypewriter(words, speed = 80, pause = 1700) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timer;
    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timer = setTimeout(() => setText(word.slice(0, text.length + (deleting ? -1 : 1))), speed);
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const typed = useTypewriter(roles);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const textColor = darkMode ? 'text-white' : 'text-slate-900';
  const secondaryText = darkMode ? 'text-slate-300' : 'text-slate-600';
  const accent = darkMode ? 'text-cyan-300' : 'text-cyan-700';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#04060f]' : 'bg-[#eef4ff]'} ${textColor} transition-colors duration-300 overflow-x-hidden font-body`}>
      {/* cosmic background */}
      <StarField />
      <MouseTrail />
      <CustomCursor />
      <div className="nebula">
        <div className={darkMode ? 'bg-[#3b1d8f]/25' : 'bg-[#a78bfa]/30'} style={{ top: '-10%', left: '-8%', width: 500, height: 500 }} />
        <div className={darkMode ? 'bg-[#0e5a8a]/25' : 'bg-[#7dd3fc]/30'} style={{ top: '45%', right: '-10%', width: 460, height: 460 }} />
        <div className={darkMode ? 'bg-[#7a1d6b]/20' : 'bg-[#f472b6]/25'} style={{ bottom: '-10%', left: '30%', width: 420, height: 420 }} />
      </div>

      {/* planets */}
      <div className="planet planet-1 planet-ring animate-float-slow" style={{ top: '12%', right: '6%' }} />
      <div className="planet planet-2 animate-float" style={{ bottom: '18%', left: '4%', animationDuration: '8s' }} />
      <div className="planet planet-3 animate-float" style={{ top: '58%', right: '14%', animationDuration: '7s' }} />

      {/* ---------- Header ---------- */}
      <nav className={`fixed top-0 w-full z-50 ${darkMode ? 'bg-[#04060f]/80' : 'bg-[#eef4ff]/80'} backdrop-blur-md px-5 md:px-8 py-4 border-b ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => scrollToSection('home')} className="font-display text-xl md:text-2xl font-bold cursor-pointer">
            john<span className="galaxy-text">.space</span>
            <span className="inline-block ml-1 animate-wiggle">🛰️</span>
          </button>

          <ul className="hidden md:flex items-center gap-8">
            {[
              ['home', 'Home'],
              ['about', 'About'],
              ['skills', 'Skills'],
              ['projects', 'Missions'],
              ['hobbies', 'Interests'],
              ['contact', 'Contact'],
            ].map(([id, label]) => (
              <li key={id} onClick={() => scrollToSection(id)} className="cursor-pointer transition-colors hover:text-cyan-400">
                {label}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-amber-400 text-black' : 'bg-slate-800 text-amber-400'} transition-all hover:scale-110 hover:rotate-12`}
              aria-label="Toggle day/night"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2" aria-label="Menu">
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 ${darkMode ? 'bg-[#0a0f2a]' : 'bg-white'} rounded-lg border ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <ul className="flex flex-col gap-3 px-4">
              {[
                ['home', 'Home'],
                ['about', 'About'],
                ['skills', 'Skills'],
                ['projects', 'Missions'],
                ['hobbies', 'Interests'],
                ['contact', 'Contact'],
              ].map(([id, label]) => (
                <li key={id} onClick={() => scrollToSection(id)} className="cursor-pointer py-2 border-b border-white/10">
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* ---------- Hero ---------- */}
      <section id="home" className="relative min-h-screen flex items-center px-5 sm:px-8 pt-20 md:pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 w-full relative z-10">
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-medium border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 animate-float" style={{ animationDuration: '6s' }}>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Systems online · Ready for launch
            </div>
            <h3 className="text-xl mb-2 text-slate-400">Greetings, Earth. I'm</h3>
            <h1 className="font-display text-4xl md:text-6xl font-black mb-4 galaxy-text">John Adhikari</h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 min-h-10 text-fuchsia-400">
              {typed}
              <span className="cursor-blink" />
            </h2>
            <p className={`${secondaryText} mb-8 leading-relaxed max-w-xl`}>
              Exploring the universe of code — React web apps, AI agents with CrewAI,
              and a Flutter rover for offline navigation. Boldly shipping to production. 🚀
            </p>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <button
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 hover:shadow-cyan-500/50"
              >
                Explore My Missions <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-7 py-3.5 rounded-full border-2 border-slate-500 font-semibold transition-all hover:scale-105 ${darkMode ? 'hover:bg-white hover:text-black' : 'hover:bg-slate-800 hover:text-cyan-300'}`}
              >
                Open Comm Channel 📡
              </button>
            </div>

            {/* socials */}
            <div className="flex items-center gap-4 mb-8">
              {[
                ['https://www.facebook.com/jack.septiceye.31945', <FaFacebookF key="f" />],
                ['https://www.instagram.com/john_adhikarii/', <FaInstagram key="i" />],
                ['https://www.linkedin.com/in/your_profile', <FaLinkedinIn key="l" />],
                ['https://github.com/JohnAdhikari', <FaGithub key="g" />],
              ].map(([href, icon]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 border-2 border-slate-500 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-125 hover:-rotate-12 ${darkMode ? 'hover:bg-cyan-400 hover:text-black' : 'hover:bg-slate-800 hover:text-cyan-300'}`}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* mission stats */}
            <div className="flex flex-wrap gap-3">
              {[
                ['🛰️', '6 missions flown'],
                ['🌍', '4 live satellites'],
                ['🤖', '2 AI probes'],
                ['🧪', '1 rover'],
              ].map(([emoji, label]) => (
                <div key={label} className={`px-4 py-2 rounded-full text-sm font-medium border ${darkMode ? 'bg-[#0a0f2a]/70 border-cyan-400/20' : 'bg-white border-cyan-200'}`}>
                  <span className="mr-1.5">{emoji}</span>{label}
                </div>
              ))}
            </div>
          </div>

          {/* profile in a space helmet / portal */}
          <div className="flex-shrink-0 relative">
            <div className="absolute -inset-3 rounded-full bg-[conic-gradient(from_0deg,#22d3ee,#a78bfa,#f472b6,#fbbf24,#22d3ee)] animate-spin-slow opacity-80" />
            <div className="absolute -inset-6 rounded-full border border-cyan-400/30 animate-spin-slow" style={{ animationDuration: '40s' }} />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-2xl tilt-card">
              <img src={profileImage} alt="John Adhikari" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-cyan-500 to-violet-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg animate-float" style={{ animationDuration: '5s' }}>
              🚀 Mission Control
            </div>
            <div className="absolute -top-4 -left-4 text-4xl animate-float" style={{ animationDuration: '4s' }}>👨‍🚀</div>
          </div>
        </div>
      </section>

      {/* ---------- Skills marquee ---------- */}
      <div className={`py-4 border-y ${darkMode ? 'border-cyan-400/20 bg-cyan-400/5' : 'border-cyan-200 bg-white'} overflow-hidden relative z-10`}>
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={`mx-6 text-lg font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
              {item} <span className="text-cyan-400">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------- About ---------- */}
      <section id="about" className={`px-5 sm:px-8 py-16 md:py-24 relative z-10 ${darkMode ? '' : 'bg-sky-100/60'}`}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
              About the <span className="galaxy-text">Explorer</span>
            </h2>
            <p className={`${secondaryText} text-center max-w-2xl mx-auto mb-12`}>
              A self-taught voyager who started with HTML and ended up commanding AI agents through deep space. 🧠✨
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className={`glass p-8 rounded-3xl shadow-xl border ${darkMode ? '' : '!bg-white !border-cyan-200'}`}>
                <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                  <FaSatellite className="text-cyan-400 animate-wiggle" /> Mission Log
                </h3>
                <p className={`${secondaryText} leading-relaxed mb-6`}>
                  I'm a developer orbiting between front-end and AI. I design clean interfaces,
                  wire up reliable APIs, and teach AI agents to write code. Currently stationed in
                  Kathmandu, building for the whole planet.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['🌍 Kathmandu, Nepal', '💬 English', '⚡ Self-taught', '🛰️ Remote-ready'].map((tag) => (
                    <span key={tag} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${darkMode ? 'bg-white/5 border-cyan-400/20 text-slate-300' : 'bg-cyan-50 border-cyan-200 text-slate-600'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className={`glass p-8 rounded-3xl shadow-xl border ${darkMode ? '' : '!bg-white !border-cyan-200'}`}>
                <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                  <FaRocket className="text-fuchsia-400 animate-float" /> Current Missions
                </h3>
                <ul className="space-y-4">
                  {[
                    ['Teaching AI agents to build whole apps', '🤖'],
                    ['Brewing an offline GPS star map for Nepal', '🗺️'],
                    ['Perfecting intergalactic e-commerce UIs', '🛒'],
                    ['Always learning a new technology', '🌱'],
                  ].map(([label, emoji]) => (
                    <li key={label} className={`p-4 rounded-xl hover:scale-[1.02] transition-transform flex items-center gap-3 ${darkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                      <span className="text-2xl">{emoji}</span>
                      <span className={secondaryText}>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Skills ---------- */}
      <section id="skills" className={`px-5 sm:px-8 py-16 md:py-24 relative z-10 ${darkMode ? '' : 'bg-sky-100/60'}`}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
              Systems <span className="galaxy-text">Inventory</span>
            </h2>
            <p className={`${secondaryText} text-center max-w-2xl mx-auto mb-12`}>The tech powering my spacecraft. 🛠️</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {skillGroups.map((group, gi) => (
              <Reveal key={group.name} delay={gi * 100}>
                <div className={`glass p-8 rounded-3xl border h-full ${darkMode ? '' : '!bg-white !border-cyan-200'}`}>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <span className="text-3xl">{group.icon}</span>
                    <h3 className="font-display font-bold text-cyan-400">{group.name}/</h3>
                  </div>
                  <div className="space-y-5">
                    {group.items.map((skill) => (
                      <div key={skill.label}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className={`text-sm font-medium ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                            {skill.emoji} {skill.label}
                          </span>
                          <span className="text-xs text-cyan-400 font-semibold">{skill.level}%</span>
                        </div>
                        <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
                          <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 animate-pulse-glow" style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Hobbies ---------- */}
      <section id="hobbies" className={`px-5 sm:px-8 py-16 md:py-24 relative z-10 ${darkMode ? '' : 'bg-sky-100/60'}`}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
              Off-Duty <span className="galaxy-text">Interests</span>
            </h2>
            <p className={`${secondaryText} text-center max-w-2xl mx-auto mb-12`}>
              Even astronauts need a break. 🛸
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Sports */}
            <Reveal>
              <div className={`glass p-8 rounded-3xl border h-full ${darkMode ? '' : '!bg-white !border-cyan-200'}`}>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <span className="text-3xl">🏅</span>
                  <h3 className="font-display text-xl font-bold">Sports I Play</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sports.map((sport, i) => (
                    <div key={sport.name} className={`glass p-5 rounded-2xl border tilt-card ${darkMode ? '' : '!bg-sky-50 !border-cyan-200'}`}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sport.color} flex items-center justify-center text-2xl shadow-lg mb-3 animate-float`} style={{ animationDuration: `${4 + i}s` }}>
                        {sport.emoji}
                      </div>
                      <div className="font-bold">{sport.name}</div>
                      <div className={`text-sm ${secondaryText}`}>{sport.line}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Favorites */}
            <Reveal delay={120}>
              <div className={`glass p-8 rounded-3xl border h-full ${darkMode ? '' : '!bg-white !border-cyan-200'}`}>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <span className="text-3xl">🎬</span>
                  <h3 className="font-display text-xl font-bold">Movie & Series Favorites</h3>
                </div>
                <ul className="space-y-3">
                  {favorites.map((fav, i) => (
                    <li key={fav.title} className={`flex items-center gap-4 p-4 rounded-2xl border hover:scale-[1.02] transition-transform ${darkMode ? 'bg-white/5' : 'bg-sky-50'}`}>
                      <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${fav.color} flex items-center justify-center text-2xl shadow-lg shrink-0`}>{fav.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold truncate">{fav.title}</div>
                        <div className={`text-xs ${secondaryText}`}>{fav.note}</div>
                      </div>
                      <span className="text-amber-400 text-sm tracking-tight shrink-0" aria-label={`${fav.stars} out of 5 stars`}>
                        {'★'.repeat(fav.stars)}
                        <span className="text-slate-500">{'☆'.repeat(5 - fav.stars)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className={`text-xs mt-4 italic ${secondaryText}`}>
                  …and a few more I can't quite remember 😅
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Projects ---------- */}
      <section id="projects" className="px-5 sm:px-8 py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
              My <span className="galaxy-text">Missions</span>
            </h2>
            <p className={`${secondaryText} text-center max-w-2xl mx-auto mb-12`}>
              Real launches, real deployments — hover to engage shields. ✨
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 80}>
                <div className={`glow-card glass p-7 rounded-3xl border shadow-xl tilt-card h-full flex flex-col ${darkMode ? '' : '!bg-white !border-cyan-200'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-3xl shadow-lg animate-float`} style={{ animationDuration: `${4 + i}s` }}>
                      {project.emoji}
                    </span>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${project.badge === 'Live' ? 'bg-green-500/15 text-green-400 border border-green-500/30' : darkMode ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-400/30' : 'bg-cyan-100 text-cyan-700 border border-cyan-300'}`}>
                      {project.badge === 'Live' && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                      {project.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className={`${secondaryText} text-sm mb-4 flex-1`}>{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className={`px-2.5 py-1 rounded-md text-xs font-medium ${darkMode ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-2 font-semibold ${accent} hover:text-fuchsia-400 transition-colors`}
                    >
                      <FaCheckCircle className="text-green-400" /> View mission
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 font-semibold text-gray-400">
                      <FaBolt className="text-amber-400" /> In the hangar
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className={`px-5 sm:px-8 py-16 md:py-24 relative z-10 ${darkMode ? '' : 'bg-sky-100/60'}`}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
              Open a <span className="galaxy-text">Channel</span>
            </h2>
            <p className={`${secondaryText} text-center mb-12`}>Signal received — always happy to talk. 📡💬</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              [<FaEnvelope key="e" />, 'Comms Relay', 'johnadhikari99@gmail.com', 'mailto:johnadhikari99@gmail.com', 'text-cyan-400'],
              [<FaPhoneAlt key="p" />, 'Direct Line', '+977 9849099677', 'tel:+9779849099677', 'text-green-400'],
              [<FaMapMarkerAlt key="m" />, 'Base Station', 'Kathmandu, Nepal', undefined, 'text-fuchsia-400'],
            ].map(([icon, label, value, href, color]) => {
              const body = (
                <div className={`glass p-6 rounded-2xl shadow-lg border flex flex-col items-center gap-3 text-center transition-all hover:scale-105 hover:-rotate-1 ${darkMode ? '' : '!bg-white !border-cyan-200'}`}>
                  <div className={`text-4xl ${color} animate-float`} style={{ animationDuration: '5s' }}>{icon}</div>
                  <h4 className="font-display font-bold">{label}</h4>
                  <p className={`${secondaryText} text-sm break-all`}>{value}</p>
                </div>
              );
              return href ? (
                <a key={label} href={href} className="h-full">{body}</a>
              ) : (
                <div key={label} className="h-full">{body}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className={`relative z-10 ${darkMode ? 'bg-[#02040b] border-t border-white/10' : 'bg-slate-900'} text-white py-8 text-center`}>
        <p className="mb-1">© {new Date().getFullYear()} John Adhikari. All rights reserved.</p>
        <p className="text-gray-400 text-sm">Built somewhere in the cosmos 💫 · React, stardust & a few too many emoji</p>
      </footer>
    </div>
  );
}

export default App;
