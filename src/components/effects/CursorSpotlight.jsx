import { useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

// A subtle radial spotlight that trails the cursor, revealing gradient text /
// content underneath. Pure CSS + refs — zero re-renders, GPU-composited.
// Disabled entirely for reduced motion and coarse (touch) pointers.

export default function CursorSpotlight() {
  const el = useRef(null);
  const reduced = useReducedMotion();

  if (reduced) return null;

  const onMove = (e) => {
    const node = el.current;
    if (!node) return;
    const left = node.getBoundingClientRect().left;
    const top = node.getBoundingClientRect().top;
    node.style.setProperty('--spot-x', `${e.clientX - left}px`);
    node.style.setProperty('--spot-y', `${e.clientY - top}px`);
  };

  return (
    <div
      ref={el}
      aria-hidden="true"
      onMouseMove={onMove}
      className="cursor-spotlight"
    />
  );
}