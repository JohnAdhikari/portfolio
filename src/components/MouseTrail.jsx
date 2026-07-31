import { useEffect, useRef } from 'react';

// Comet-style stardust trail that follows the mouse.
export default function MouseTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduced || !fine) return;

    let particles = [];
    let raf = null;
    let last = 0;
    const mouse = { x: -100, y: -100, px: -100, py: -100 };
    const colors = ['#22d3ee', '#a78bfa', '#f472b6', '#ffffff', '#fbbf24'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawn = (x, y) => {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
        r: Math.random() * 2 + 1,
        color: colors[(Math.random() * colors.length) | 0],
      });
      if (particles.length > 240) particles.splice(0, particles.length - 240);
    };

    const draw = (t) => {
      const dt = Math.min(40, t - last);
      last = t;

      const dist = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      const steps = Math.min(10, Math.max(1, dist / 7));
      for (let i = 0; i <= steps; i += 1) {
        const k = i / steps;
        spawn(mouse.px + (mouse.x - mouse.px) * k, mouse.py + (mouse.y - mouse.py) * k);
      }
      mouse.px = mouse.x;
      mouse.py = mouse.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          return;
        }
        ctx.globalAlpha = Math.max(0, p.life) * 0.85;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life + 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -100;
      mouse.y = -100;
      mouse.px = -100;
      mouse.py = -100;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="mouse-trail" aria-hidden="true" />;
}
