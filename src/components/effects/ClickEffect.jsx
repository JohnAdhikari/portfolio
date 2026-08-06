import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

// Click effects for the Raw (paper/pencil) theme. Canvas-based, fine-pointer
// only, fully inert under reduced-motion. A floating switcher lets the owner
// preview all variants; the choice is persisted so it can be locked in later.
const VARIANTS = [
  { id: 'ink', label: 'Ink splash' },
  { id: 'dotring', label: 'Dot + ring' },
  { id: 'sparkle', label: 'Sparkles' },
  { id: 'ripple', label: 'Ripple' },
];

const INK = ['#4a4a4a', '#6b6559', '#b08d5f', '#8a5a3b'];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function ClickEffect() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();
  const [variant, setVariant] = useState(() => {
    const stored = window.localStorage.getItem('portfolio-click-effect');
    return VARIANTS.some((v) => v.id === stored) ? stored : 'ink';
  });

  useEffect(() => {
    window.localStorage.setItem('portfolio-click-effect', variant);
  }, [variant]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reduced) return;

    let raf = null;
    let particles = [];
    let ripples = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawnInk = (x, y) => {
      const n = 9 + Math.floor(Math.random() * 5);
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 3.4;
        particles.push({
          type: 'ink',
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1.4 + Math.random() * 2.2,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          color: INK[Math.floor(Math.random() * INK.length)],
        });
      }
    };

    const spawnDotRing = (x, y) => {
      particles.push({ type: 'dot', x, y, r: 3, life: 1, decay: 0.045, color: '#b08d5f' });
      particles.push({ type: 'ring', x, y, r: 4, life: 1, decay: 0.03, color: '#4a4a4a' });
    };

    const spawnSparkle = (x, y) => {
      const n = 7 + Math.floor(Math.random() * 4);
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 + Math.random() * 0.4;
        const speed = 1.6 + Math.random() * 2.6;
        particles.push({
          type: 'sparkle',
          x,
          y,
          angle,
          speed,
          size: 3 + Math.random() * 3,
          life: 1,
          decay: 0.03 + Math.random() * 0.02,
          color: Math.random() > 0.5 ? '#c4a77d' : '#8a5a3b',
        });
      }
    };

    const spawnRipple = (x, y) => {
      ripples.push({ x, y, r: 2, maxR: 90, alpha: 1, decay: 0.02 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.life -= p.decay;
        if (p.type === 'ink') {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          ctx.globalAlpha = Math.max(0, p.life) * 0.9;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'dot') {
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'ring') {
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + (1 - p.life) * 44, 0, Math.PI * 2);
          ctx.stroke();
        } else if (p.type === 'sparkle') {
          p.angle += 0.02;
          const d = (1 - p.life) * 56;
          const sx = p.x + Math.cos(p.angle) * d;
          const sy = p.y + Math.sin(p.angle) * d;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.4;
          const s = p.size * Math.max(0, p.life);
          ctx.beginPath();
          ctx.moveTo(sx - s, sy);
          ctx.lineTo(sx + s, sy);
          ctx.moveTo(sx, sy - s);
          ctx.lineTo(sx, sy + s);
          ctx.stroke();
        }
      });

      ripples = ripples.filter((r) => r.alpha > 0);
      ripples.forEach((r) => {
        r.r = lerp(2, r.maxR, 1 - Math.pow(1 - r.alpha, 2));
        r.alpha -= r.decay;
        ctx.globalAlpha = Math.max(0, r.alpha) * 0.6;
        ctx.strokeStyle = '#b08d5f';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      if (particles.length || ripples.length) raf = requestAnimationFrame(draw);
    };

    const onPointerDown = (e) => {
      const { clientX, clientY } = e;
      if (variant === 'ink') spawnInk(clientX, clientY);
      if (variant === 'dotring') spawnDotRing(clientX, clientY);
      if (variant === 'sparkle') spawnSparkle(clientX, clientY);
      if (variant === 'ripple') spawnRipple(clientX, clientY);
      if (!raf) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      cancelAnimationFrame(raf);
      raf = null;
      particles = [];
      ripples = [];
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [variant, reduced]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="click-effect"
        aria-hidden="true"
      />

      {/* Floating switcher to preview the variants (desktop only) */}
      <div className="click-switcher hidden md:block" role="group" aria-label="Click effect switcher">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setVariant(v.id)}
            className={`click-chip ${variant === v.id ? 'is-active' : ''}`}
            aria-pressed={variant === v.id}
          >
            {v.label}
          </button>
        ))}
      </div>
    </>
  );
}
