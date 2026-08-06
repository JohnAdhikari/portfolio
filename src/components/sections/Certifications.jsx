import SectionHeading from '../ui/SectionHeading';
import CertCard from '../ui/CertCard';
import { certifications } from '../../data/content';

export default function Certifications() {
  return (
    <section id="certifications" className="relative z-10 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          intro="Credentials earned along the way."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}