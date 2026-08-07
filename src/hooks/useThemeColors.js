import { useEffect, useState } from 'react';

// Reads the portfolio's CSS custom properties (from tokens.css) and exposes
// them as plain hex strings. Re-reads whenever the .dark class flips so the
// 3D scenes re-tint to match the active theme.
const TOKENS = ['accent', 'accent-hi', 'violet', 'cyan', 'gold', 'ink', 'ink-dim', 'line'];

function readVars() {
  const out = {};
  const el = document.documentElement;
  const styles = window.getComputedStyle(el);
  TOKENS.forEach((name) => {
    const raw = styles.getPropertyValue(`--${name}`).trim();
    out[name] = raw || (name === 'accent' ? '#c4a77d' : '#1a1a1a');
  });
  return out;
}

export default function useThemeColors() {
  const [colors, setColors] = useState(() => (typeof window === 'undefined' ? {} : readVars()));
  const [dark, setDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const refresh = () => {
      setColors(readVars());
      setDark(document.documentElement.classList.contains('dark'));
    };
    const mo = new MutationObserver(refresh);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', refresh);
    return () => {
      mo.disconnect();
      window.removeEventListener('resize', refresh);
    };
  }, []);

  return { colors, dark };
}