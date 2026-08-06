import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, highlight, intro, center = true }) {
  return (
    <Reveal className={center ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-hi">
          <span className="h-px w-6 bg-accent-hi/60" aria-hidden="true" />
          {eyebrow}
          <span className="h-px w-6 bg-accent-hi/60" aria-hidden="true" />
        </span>
      )}
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title} {highlight && <span className="text-accent-gradient">{highlight}</span>}
      </h2>
      {intro && <p className="mt-4 text-lg text-ink-soft">{intro}</p>}
    </Reveal>
  );
}