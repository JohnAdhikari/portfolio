import { useEffect, useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

// Ink splash click effect — pencil-ink dots spray from the click point and fade.
// Canvas-based, fine-pointer only, fully inert under reduced-motion.
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

    let raf = null;
    let particles = [];

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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.life -= p.decay;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        ctx.globalAlpha = Math.max(0, p.life) * 0.9;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      if (particles.length) raf = requestAnimationFrame(draw);
    };

    const onPointerDown = (e) => {
      spawnInk(e.clientX, e.clientY);
      if (!raf) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      cancelAnimationFrame(raf);
      raf = null;
      particles = [];
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="click-effect" aria-hidden="true" />;
}
