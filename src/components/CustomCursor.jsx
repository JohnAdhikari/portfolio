import { useEffect, useState } from 'react';

// Custom space cursor: small glowing dot + trailing ring that grows on hover.
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => {
      const interactive = e.target && e.target.closest
        ? e.target.closest('a, button, input, textarea, select, [role="button"]')
        : null;
      setHovering(Boolean(interactive));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div className={`cursor-dot ${hovering ? 'hovering' : ''}`} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }} />
      <div className={`cursor-ring ${hovering ? 'hovering' : ''}`} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }} />
    </>
  );
}
