import { useEffect, useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

// Ink splash click effect — pencil-ink dots spray from the click point, fall
// under light gravity, and fade. Plays on EVERY click, fine-pointer only,
// fully inert under reduced-motion.
const INK = ['#4a4a4a', '#6b6559', '#b08d5f', '#8a5a3b'];

export default function ClickEffect() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reduced) return;

    let running = false;
    let raf = null;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawnInk = (x, y) => {
      const n = 12 + Math.floor(Math.random() * 7);
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          r: 1.6 + Math.random() * 2.4,
          life: 1,
          decay: 0.008 + Math.random() * 0.008,
          color: INK[Math.floor(Math.random() * INK.length)],
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.life -= p.decay;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vy += 0.05; // gentle gravity
        p.x += p.vx;
        p.y += p.vy;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * Math.min(1, p.life * 2), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      if (particles.length) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        raf = null;
      }
    };

    const start = () => {
      if (running || raf) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onPointerDown = (e) => {
      spawnInk(e.clientX, e.clientY);
      start();
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      cancelAnimationFrame(raf);
      raf = null;
      running = false;
      particles = [];
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="click-effect" aria-hidden="true" />;
}
