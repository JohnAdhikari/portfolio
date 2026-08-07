import Reveal from './Reveal';
import { gsap } from '../../lib/gsapRegister';
import { useEffect, useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

const badgeStyles = {
  Live: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  Mobile: 'bg-cyan-400/10 text-cyan-300 border border-cyan-400/30',
  'AI Agent': 'bg-violet-400/10 text-violet-300 border border-violet-400/30',
};

export default function ProjectCard({ project, index }) {
  const badgeCls = badgeStyles[project.badge] || 'bg-white/5 text-ink-dim border border-line';
  const logoRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !logoRef.current) return;
    const el = logoRef.current;
    gsap.set(el, { scale: 1, rotation: 0 });
    
    const tl = gsap.timeline({ paused: true });
    tl.to(el, { 
      scale: 1.08, 
      rotation: 3, 
      duration: 0.3, 
      ease: 'back.out(1.2)' 
    });
    
    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();
    
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced]);

  return (
    <Reveal delay={(index % 3) * 0.08}>
      <article className="project-card flex h-full flex-col rounded-2xl border border-line bg-panel p-7 group">
        <div className="mb-5 flex items-start justify-between">
          <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-accent/15">
            {project.logo && (
              <img
                ref={logoRef}
                src={project.logo}
                alt={`${project.title} logo`}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            )}
          </span>
          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${badgeCls}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            {project.badge}
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{project.desc}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t} className="rounded-md border border-line bg-white/[0.02] px-2.5 py-1 text-xs font-medium text-ink-dim">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-hi transition-colors hover:text-violet"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              In progress
            </span>
          )}
        </div>
      </article>
    </Reveal>
  );
}