import { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsapRegister';
import useReducedMotion from '../../hooks/useReducedMotion';

// GSAP-lerped custom cursor: fast dot + lagging ring that grows on interactive hover.
// Desktop (fine pointer) + non-reduced motion only. Degrades gracefully otherwise.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    document.documentElement.classList.add('has-custom-cursor');

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.32, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.32, ease: 'power3.out' });

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const onOver = (e) => {
      const interactive = e.target?.closest
        ? e.target.closest('a, button, input, textarea, select, [role="button"]')
        : null;
      ring.classList.toggle('is-hover', Boolean(interactive));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      gsap.killTweensOf([dot, ring]);
    };
  }, [reduced]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}