import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsapRegister';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function ScrollProgress() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.to(ref.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: () => document.documentElement.scrollHeight - window.innerHeight,
          scrub: 0.3,
        },
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      id="scroll-progress"
      className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left bg-gradient-to-r from-accent via-violet to-cyan"
      aria-hidden="true"
    />
  );
}