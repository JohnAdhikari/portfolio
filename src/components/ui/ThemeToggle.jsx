import Icon from './Icon';

export default function ThemeToggle({ theme, toggle }) {
  return (
    <button
      onClick={toggle}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-ink-dim transition-all duration-300 hover:text-ink hover:rotate-12 cursor-pointer"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Icon name="sun" size={18} /> : <Icon name="moon" size={18} />}
    </button>
  );
}