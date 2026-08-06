import { useEffect, useState } from 'react';
import { ScrollTrigger } from '../lib/gsapRegister';

// Tracks which section id is currently in view (for nav active state).
export default function useSectionActive(ids) {
  const [active, setActive] = useState(ids[0] || null);

  useEffect(() => {
    const triggers = ids
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActive(id),
          onEnterBack: () => setActive(id),
        });
      })
      .filter(Boolean);

    return () => triggers.forEach((t) => t.kill());
  }, [ids]);

  return active;
}
