import { useRef } from 'react';
import { gsap } from '../../lib/gsapRegister';
import useReducedMotion from '../../hooks/useReducedMotion';
import Icon from './Icon';

const styles = {
  primary: 'btn-primary bg-accent px-7 py-3.5 text-sm font-semibold text-[var(--btn-fg)]',
  ghost: 'btn-ghost border border-line px-7 py-3.5 text-sm font-semibold text-ink-dim hover:text-ink',
};

export default function MagneticButton({ children, onClick, href, variant = 'primary', icon, className = '', type }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const attached = useRef(false);

  const bind = () => {
    const el = ref.current;
    if (!el || reduced || attached.current) return;
    attached.current = true;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3.out' });
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * 0.3);
      yTo((e.clientY - (rect.top + rect.height / 2)) * 0.3);
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.35)' });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () =>
      () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        gsap.killTweensOf(el);
      };
  };

  const Tag = href ? 'a' : 'button';
  const cls = `group inline-flex items-center justify-center gap-2.5 rounded-full ${styles[variant]} ${className}`;

  return (
    <Tag ref={ref} href={href} onClick={onClick} onMouseEnter={bind} type={type} className={cls}>
      {children}
      {icon && <Icon name={icon} className="transition-transform duration-300 group-hover:translate-x-0.5" />}
    </Tag>
  );
}