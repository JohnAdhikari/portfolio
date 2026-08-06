import Reveal from './Reveal';
import Icon from './Icon';

export default function CertCard({ cert, index }) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <article className="cert-card flex h-full flex-col rounded-2xl border border-line bg-panel p-7">
        <div className="mb-5 flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet/15 text-violet">
            <Icon name={cert.icon} size={22} />
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            {cert.badge}
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold">{cert.title}</h3>
        <p className="mt-1 text-xs font-medium text-ink-soft">{cert.issuer}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{cert.desc}</p>
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-hi transition-colors hover:text-violet"
        >
          <Icon name="checkCircle" size={16} className="text-emerald-400" />
          View certificate
          <Icon name="arrowRight" className="transition-transform group-hover:translate-x-0.5" size={16} />
        </a>
      </article>
    </Reveal>
  );
}