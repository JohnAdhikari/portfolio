import { useCallback, useRef } from 'react';
import { gsap } from '../lib/gsapRegister';
import useReducedMotion from './useReducedMotion';

// Perspective tilt that follows the cursor. Mutates transform directly via
// GSAP quickTo (no React re-renders). Disabled for reduced motion / touch.
export default function useTilt(maxDeg = 6) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const bind = useCallback(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = '1';
    el.style.transformStyle = 'preserve-3d';
    gsap.set(el, { transformPerspective: 900 });

    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.35, ease: 'power2.out' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.35, ease: 'power2.out' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      ry((px - 0.5) * maxDeg);
      rx(-(py - 0.5) * maxDeg);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      delete el.dataset.tiltBound;
    };
  }, [maxDeg, reduced]);

  return { ref, bind };
}