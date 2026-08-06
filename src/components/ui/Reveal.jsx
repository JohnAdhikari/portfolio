import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsapRegister';

// Scroll-triggered reveal wrapper. If children carry [data-reveal-child] they
// stagger in together; otherwise the element reveals as a whole. Rendered
// visible by default so content is never hidden under reduced-motion.
export default function Reveal({ children, delay = 0, y = 34, stagger = 0.08, className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const targets = ref.current.querySelectorAll('[data-reveal-child]');
      if (targets.length) {
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: 0.7,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        });
      } else {
        gsap.from(ref.current, {
          y,
          autoAlpha: 0,
          duration: 0.7,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        });
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}