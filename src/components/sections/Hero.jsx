import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsapRegister';
import { profile, roles, heroStats, socials } from '../../data/content';
import useTypewriter from '../../hooks/useTypewriter';
import useReducedMotion from '../../hooks/useReducedMotion';
import MagneticButton from '../ui/MagneticButton';
import Icon from '../ui/Icon';
import WeatherClock from '../ui/WeatherClock';
import profileImage from '../../assets/optimized/profileImage.jpg';

const countUp = (el, end, reduced) => {
  if (reduced) {
    el.textContent = String(end);
    return;
  }
  const obj = { v: 0 };
  gsap.to(obj, {
    v: end,
    duration: 1.6,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = String(Math.round(obj.v));
    },
  });
};

export default function Hero({ onNavigate }) {
  const root = useRef(null);
  const typed = useTypewriter(roles);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!reduced) return;
    gsap.utils.toArray('[data-count]').forEach((el) => {
      el.textContent = el.getAttribute('data-count');
    });
  }, [reduced]);

  useGSAP(
    () => {
      if (reduced) return;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero-line]', { y: 26, autoAlpha: 0, duration: 0.7, stagger: 0.08 })
        .from('[data-hero-cta]', { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, '-=0.4')
        .from('[data-hero-social]', { y: 14, autoAlpha: 0, duration: 0.4, stagger: 0.05 }, '-=0.3')
        .from('[data-hero-portrait]', { scale: 0.9, autoAlpha: 0, duration: 0.9, ease: 'back.out(1.4)' }, '-=0.5');

      // count-up stats when they enter view
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const end = parseInt(el.getAttribute('data-count'), 10);
        ScrollTrigger.create({
          trigger: el,
          start: 'top 95%',
          once: true,
          onEnter: () => countUp(el, end, false),
        });
      });

      // profile parallax on mouse (desktop only)
      const mq = window.matchMedia('(pointer: fine)');
      if (!mq.matches) return;
      const img = root.current.querySelector('[data-hero-img]');
      const onMove = (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        gsap.to(img, {
          rotateY: ((e.clientX - cx) / cx) * 7,
          rotateX: -((e.clientY - cy) / cy) * 7,
          transformPerspective: 900,
          duration: 0.7,
          ease: 'power2.out',
        });
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    },
    { scope: root },
  );

  return (
    <section id="home" ref={root} className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-10">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <div
            data-hero-line
            className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-1.5 text-xs font-medium text-ink-dim"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            Available for new projects
          </div>

          <div data-hero-line className="mt-4 flex flex-wrap items-center gap-3">
            <WeatherClock />
          </div>

          <p data-hero-line className="mt-6 text-base text-ink-dim">
            Hi, I'm
          </p>
          <h1 data-hero-line className="mt-1 font-display text-5xl font-bold sm:text-6xl lg:text-7xl">
            {profile.name.split(' ')[0]} <span className="text-accent-gradient">{profile.name.split(' ')[1]}</span>
          </h1>
          <h2 data-hero-line className="mt-3 flex min-h-9 items-baseline font-display text-xl font-medium leading-normal text-accent-hi sm:text-2xl">
            {typed}
            <span className="caret text-accent-hi" aria-hidden="true" />
          </h2>

          <p data-hero-line className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {profile.summary}
          </p>

          <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton onClick={() => onNavigate('projects')} icon="arrowRight">
              View my work
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => onNavigate('contact')} icon="mail">
              Get in touch
            </MagneticButton>
          </div>

          <div data-hero-social className="mt-8 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-hi"
                aria-label={s.label}
              >
                <Icon name={s.id} size={17} />
              </a>
            ))}
          </div>

          <div data-hero-line className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.id} className="rounded-xl border border-line bg-panel p-3 text-center">
                <div className="font-display text-2xl font-bold text-accent-gradient">
                  <span data-count={s.value}>0</span>
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-ink-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait */}
        <div data-hero-portrait className="relative mx-auto flex justify-center">
          <div className="profile-ring absolute -inset-4 rounded-full opacity-70 blur-2xl" aria-hidden="true" />
          <div className="relative aspect-square w-64 overflow-hidden rounded-full border border-line sm:w-80">
            <img
              data-hero-img
              src={profileImage}
              alt={profile.avatarAlt}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(3,5,12,0.5)]" aria-hidden="true" />
          </div>
          <span className="absolute -right-2 top-6 flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
            <Icon name="star" size={14} className="text-accent-hi" />
            Open to work
          </span>
        </div>
      </div>
    </section>
  );
}