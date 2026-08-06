import { socials, profile } from '../../data/content';
import Icon from '../ui/Icon';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-sm font-semibold">
            john<span className="text-cosmic">.space</span>
          </p>
          <p className="mt-1 text-sm text-ink-soft">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>

        <nav className="flex items-center gap-3" aria-label="Social links">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-hi"
              aria-label={s.label}
            >
              <Icon name={s.id} size={17} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}