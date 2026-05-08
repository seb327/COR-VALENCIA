import { useEffect, useRef } from 'react';
import { gsap }              from 'gsap';
import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { useLanguage }       from '@/components/providers/LanguageProvider';

gsap.registerPlugin(ScrollTrigger);

export function EssenceSection() {
  const { t, lang } = useLanguage();
  const sectionRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start:   'top 70%',
        once:    true,
        onEnter() {
          const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
          tl.fromTo(section.querySelector('.section-label'),
              { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.0 })
            .fromTo(section.querySelectorAll('.essence-line'),
              { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.3, stagger: 0.16 }, '-=0.5')
            .fromTo(section.querySelector('.essence-body'),
              { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1 }, '-=0.5')
            .fromTo(section.querySelector('.essence-aside'),
              { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.5');
        },
      });
    }, section);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      id="essence"
      key={lang}
      className="relative w-full px-6 py-32 md:px-[8vw] md:py-44"
    >
      <div className="grid gap-16 md:grid-cols-12">

        <div className="md:col-span-12">
          <p className="section-label cor-label" style={{ opacity: 0 }}>
            {t.essence.label}
          </p>
        </div>

        {/* Poem column */}
        <div className="md:col-span-7">
          {t.essence.lines.map((line, i) => (
            <p
              key={i}
              className="essence-line font-display text-[clamp(2.8rem,7vw,7rem)] font-medium leading-[1.0]"
              style={{
                color:     i === t.essence.lines.length - 1 ? 'var(--gold)' : 'var(--fg)',
                fontStyle: i === t.essence.lines.length - 1 ? 'italic' : 'normal',
                opacity:   0,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Prose column */}
        <div className="flex flex-col gap-7 md:col-span-5 md:pt-6">
          <p className="essence-body text-[16px] font-light leading-[1.85]"
             style={{ color: 'var(--fg)', opacity: 0 }}>
            {t.essence.body}
          </p>
          <div className="essence-aside flex flex-col gap-4 border-l pl-6"
               style={{ borderColor: 'var(--gold)', opacity: 0 }}>
            <p className="font-display text-[14px] font-light italic leading-[1.7]"
               style={{ color: 'var(--fg-soft)' }}>
              {t.essence.aside}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
