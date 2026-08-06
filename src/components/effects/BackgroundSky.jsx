// Theme-driven background layer. The visual itself lives in CSS (`.bg-fx`
// keyed to the active theme class) so each theme gets its own backdrop with
// zero per-theme JS. Reduced-motion friendly by construction.
export default function BackgroundSky() {
  return <div className="bg-fx" aria-hidden="true" />;
}