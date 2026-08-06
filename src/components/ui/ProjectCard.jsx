import Reveal from './Reveal';
import Icon from './Icon';

const badgeStyles = {
  Live: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  Mobile: 'bg-cyan-400/10 text-cyan-300 border border-cyan-400/30',
  'AI Agent': 'bg-violet-400/10 text-violet-300 border border-violet-400/30',
};

export default function ProjectCard({ project, index }) {
  const badgeCls = badgeStyles[project.badge] || 'bg-white/5 text-ink-dim border border-line';

  return (
    <Reveal delay={(index % 3) * 0.08}>
      <article className="project-card flex h-full flex-col rounded-2xl border border-line bg-panel p-7">
        <div className="mb-5 flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-hi">
            <Icon name={project.icon} size={22} />
          </span>
          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${badgeCls}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            {project.badge}
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{project.desc}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t} className="rounded-md border border-line bg-white/[0.02] px-2.5 py-1 text-xs font-medium text-ink-dim">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-hi transition-colors hover:text-violet"
            >
              <Icon name="external" size={16} />
              View project
              <Icon name="arrowRight" className="transition-transform group-hover:translate-x-0.5" size={16} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft">
              <Icon name="bolt" size={16} className="text-gold" />
              In progress
            </span>
          )}
        </div>
      </article>
    </Reveal>
  );
}