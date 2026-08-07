import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import SkillBar from '../ui/SkillBar';
import Icon from '../ui/Icon';
import { SkillsOrbit } from '../three/lazy3d';
import { skillGroups, marqueeItems } from '../../data/content';

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Tools &"
          highlight="Stack"
          intro="The tech powering my work — always expanding."
        />

        <div className="mt-16 grid items-center gap-10 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {skillGroups.map((group, gi) => (
                <SkillGroup key={group.name} group={group} delay={gi * 0.1} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2} className="hidden md:block">
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <div className="pointer-events-none absolute inset-0" style={{ pointerEvents: 'none' }}>
                <SkillsOrbit />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-panel text-accent-hi">
                  <Icon name="chip" size={24} />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 mt-20 overflow-hidden border-y border-line bg-panel/40 py-5">
        <div className="marquee-gradient" aria-hidden="true" />
        <div className="marquee-track items-center">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="mx-6 flex items-center gap-6 whitespace-nowrap font-display text-lg font-medium text-ink-soft">
              {item}
              <span className="text-accent-hi" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillGroup({ group, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="glass h-full rounded-3xl border-line p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-line pb-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-hi">
            <Icon name={group.icon} size={20} />
          </span>
          <h3 className="font-display font-semibold text-accent-hi">{group.name}</h3>
        </div>
        <div className="space-y-5">
          {group.items.map((skill) => (
            <SkillBar key={skill.label} label={skill.label} level={skill.level} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}