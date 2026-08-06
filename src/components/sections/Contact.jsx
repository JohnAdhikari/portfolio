import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import Icon from '../ui/Icon';
import { profile } from '../../data/content';

const channels = [
  { id: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, color: 'text-accent-hi' },
  { id: 'phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, color: 'text-emerald-400' },
  { id: 'map', label: 'Location', value: profile.location, href: undefined, color: 'text-violet' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Contact"
          title="Get in"
          highlight="Touch"
          intro="Always happy to talk — drop a message."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {channels.map((c, i) => {
            const inner = (
              <div className="glass flex h-full flex-col items-center gap-3 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 ${c.color}`}>
                  <Icon name={c.id} size={20} />
                </span>
                <h4 className="font-display font-semibold">{c.label}</h4>
                <p className="break-all text-sm text-ink-soft">{c.value}</p>
              </div>
            );
            return (
              <Reveal key={c.label} delay={i * 0.08}>
                {c.href ? (
                  <a href={c.href} className="block h-full">
                    {inner}
                  </a>
                ) : (
                  <div className="h-full">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}