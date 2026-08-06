import { gsap } from '../../lib/gsapRegister';
import { useEffect, useRef } from 'react';
import Icon from './Icon';

// Skill proficiency bar with an animated fill on scroll into view.
export default function SkillBar({ label, level }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const fill = el.querySelector('[data-fill]');
    if (!fill) return;
    const tween = gsap.fromTo(
      fill,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      },
    );
    return () => tween.scrollTrigger?.kill();
  }, [level]);

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          <Icon name="check" className="text-accent-hi" size={14} />
          {label}
        </span>
        <span className="text-xs font-semibold text-accent-hi">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-panel border border-line">
        <div
          data-fill
          className="h-full rounded-full bg-gradient-to-r from-accent to-cyan"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}