import { useRef, useState } from 'react';
import { ScrollTrigger, useGSAP } from '../../lib/gsapRegister';
import useSectionActive from '../../hooks/useSectionActive';
import { navItems } from '../../data/content';
import ThemeToggle from '../ui/ThemeToggle';
import Icon from '../ui/Icon';

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const active = useSectionActive(navItems.map((n) => n.id));

  const root = useRef(null);

  useGSAP(
    () => {
      const nav = root.current;
      if (!nav) return;
      ScrollTrigger.create({
        start: 40,
        end: 'max',
        onUpdate: (self) => nav.classList.toggle('is-scrolled', self.scroll() > 40),
      });
    },
    { scope: root },
  );

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={root}
      id="site-nav"
      className="fixed top-0 z-50 w-full border-b border-transparent"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <button
          onClick={() => scrollTo('home')}
          className="font-display text-xl font-bold tracking-tight cursor-pointer"
          aria-label="Back to top"
        >
          john<span className="text-cosmic">.space</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`nav-link text-sm font-medium transition-colors cursor-pointer ${
                active === id ? 'is-active text-ink' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-ink md:hidden cursor-pointer"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <Icon name="close" size={20} /> : <Icon name="menu" size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="mx-4 mb-4 rounded-2xl border border-line bg-panel/90 p-4 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                    active === id ? 'bg-accent/10 text-accent-hi' : 'text-ink-dim hover:bg-panel hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}