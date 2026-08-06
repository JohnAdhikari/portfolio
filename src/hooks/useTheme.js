import { useMemo, useReducer, useEffect } from 'react';

function initMode() {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('portfolio-mode');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// Single theme (Raw). Toggle light / dark mode only.
export default function useTheme() {
  const [mode, toggleMode] = useReducer((m) => (m === 'dark' ? 'light' : 'dark'), null, initMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    window.localStorage.setItem('portfolio-mode', mode);
  }, [mode]);

  return useMemo(() => ({ mode, toggleMode }), [mode]);
}