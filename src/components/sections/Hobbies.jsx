import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import Icon from '../ui/Icon';
import { sports, favorites } from '../../data/content';

import harryPotter from '../../assets/optimized/harry-potter.jpg';
import interstellar from '../../assets/optimized/interstellar.jpg';
import breakingBad from '../../assets/optimized/breaking-bad.jpg';
import fromPoster from '../../assets/optimized/from.jpg';
import conjuring from '../../assets/optimized/the-conjuring.jpg';

const posterMap = {
  'harry-potter.jpg': harryPotter,
  'interstellar.jpg': interstellar,
  'breaking-bad.jpg': breakingBad,
  'from.jpg': fromPoster,
  'the-conjuring.jpg': conjuring,
};

export default function Hobbies() {
  return (
    <section id="hobbies" className="relative z-10 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Off duty"
          title="Interests"
          highlight="Beyond the code"
          intro="Even developers need a break."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-3xl p-8">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-hi">
                  <Icon name="globe" size={18} />
                </span>
                Sports I play
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {sports.map((s) => (
                  <div key={s.name} className="rounded-2xl border border-line bg-white/[0.02] p-5 transition-colors duration-300 hover:border-accent/40">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent-hi">
                      <Icon name={s.icon} size={20} />
                    </span>
                    <div className="mt-3 font-semibold">{s.name}</div>
                    <div className="text-sm text-ink-soft">{s.line}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass h-full rounded-3xl p-8">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet/15 text-violet">
                  <Icon name="sparkles" size={18} />
                </span>
                Movie & series favorites
              </h3>
              <ul className="mt-6 space-y-3">
                {favorites.map((f) => (
                  <li
                    key={f.title}
                    className="flex items-center gap-4 rounded-2xl border border-line bg-white/[0.02] p-4 transition-colors duration-300 hover:border-accent/40"
                  >
                    <img
                      src={posterMap[f.poster]}
                      alt={`${f.title} poster`}
                      loading="lazy"
                      width={52}
                      height={78}
                      className="h-[78px] w-[52px] shrink-0 rounded-lg border border-line object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">{f.title}</div>
                      <div className="text-xs text-ink-soft">{f.note}</div>
                    </div>
                    <span className="shrink-0 text-sm text-gold" aria-label={`${f.stars} out of 5 stars`}>
                      {'★'.repeat(f.stars)}
                      <span className="text-ink-soft/50">{'☆'.repeat(5 - f.stars)}</span>
                    </span>
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