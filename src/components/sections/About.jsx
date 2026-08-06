import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';
import { missions } from '../../data/content';

export default function About() {
  return (
    <section id="about" className="relative z-10 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About"
          title="Hi, I'm"
          highlight="John"
          intro="A self-taught developer who started with HTML and ended up directing AI agents to ship real apps."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-3xl p-8">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-hi">
                  <Icon name="terminal" size={18} />
                </span>
                The story so far
              </h3>
              <p className="mt-5 leading-relaxed text-ink-soft">
                A developer working across frontend and AI. I design clean interfaces, wire up reliable
                APIs, and teach AI agents to write code. Currently based in Kathmandu, building for the
                whole planet.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                <li className="rounded-full border border-line bg-panel px-3.5 py-1.5 text-xs font-medium text-ink-dim">Kathmandu, Nepal</li>
                <li className="rounded-full border border-line bg-panel px-3.5 py-1.5 text-xs font-medium text-ink-dim">English</li>
                <li className="rounded-full border border-line bg-panel px-3.5 py-1.5 text-xs font-medium text-ink-dim">Self-taught</li>
                <li className="rounded-full border border-line bg-panel px-3.5 py-1.5 text-xs font-medium text-ink-dim">Remote-ready</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass h-full rounded-3xl p-8">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet/15 text-violet">
                  <Icon name="satellite" size={18} />
                </span>
                What I'm building now
              </h3>
              <ul className="mt-5 space-y-3">
                {missions.map((m) => (
                  <li
                    key={m}
                    className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-4 transition-colors duration-300 hover:border-accent/40"
                  >
                    <Icon name="check" size={18} className="shrink-0 text-emerald-400" />
                    <span className="text-sm text-ink-dim">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}