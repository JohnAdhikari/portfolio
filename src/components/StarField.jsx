import { useEffect, useRef } from 'react';

// Interactive canvas starfield with twinkling stars, drift and shooting stars.
export default function StarField({ density = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stars = [];
    let shooting = [];
    let raf = null;
    let t = 0;

    const initStars = () => {
      const count = Math.min(420, Math.floor((canvas.width * canvas.height) / 9000) * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.4 + 0.04,
        phase: Math.random() * Math.PI * 2,
        hue:
          Math.random() > 0.94
            ? '#7dd3fc'
            : Math.random() > 0.9
              ? '#fbbf24'
              : Math.random() > 0.92
                ? '#f0abfc'
                : '#ffffff',
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const spawnShooting = () => {
      if (shooting.length < 2 && Math.random() < 0.006) {
        shooting.push({
          x: Math.random() * canvas.width * 0.8,
          y: Math.random() * canvas.height * 0.4,
          vx: 6 + Math.random() * 4,
          vy: 3 + Math.random() * 2,
          life: 1,
        });
      }
    };

    const draw = () => {
      if (reduced) return;
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        s.y += s.speed * 0.15;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
        const tw = 0.5 + 0.5 * Math.sin(t * 2 + s.phase);
        ctx.globalAlpha = 0.35 + tw * 0.65;
        ctx.fillStyle = s.hue;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      shooting.forEach((sh, i) => {
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life -= 0.012;
        if (sh.life <= 0) {
          shooting.splice(i, 1);
          return;
        }
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 6, sh.y - sh.vy * 6);
        grad.addColorStop(0, 'rgba(255,255,255,0.9)');
        grad.addColorStop(1, 'rgba(125,211,252,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 6, sh.y - sh.vy * 6);
        ctx.stroke();
      });

      spawnShooting();
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
