import { useEffect, useRef } from 'react';
import { gsap }              from 'gsap';
import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { useLanguage }       from '@/components/providers/LanguageProvider';

gsap.registerPlugin(ScrollTrigger);

export function VoiceSection() {
  const { t, lang } = useLanguage();
  const sectionRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section, start: 'top 70%', once: true,
        onEnter() {
          const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
          tl.fromTo(section.querySelector('.section-label'),
              { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.0 })
            .fromTo(section.querySelectorAll('.voice-line'),
              { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.18 }, '-=0.5')
            .fromTo(section.querySelector('.voice-attr'),
              { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.4')
            .fromTo(section.querySelector('.voice-aside'),
              { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.6');
        },
      });
    }, section);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      key={lang}
      className="relative flex w-full items-center overflow-hidden px-6 py-32 md:px-[8vw] md:py-44"
    >
      <div className="relative z-10 w-full">
        <p className="section-label cor-label mb-12" style={{ opacity: 0 }}>
          {t.voice.label}
        </p>

        <div className="grid gap-12 md:grid-cols-12">
          <blockquote className="md:col-span-7">
            {t.voice.lines.map(({ text, gold }, i) => (
              <p
                key={i}
                className="voice-line font-display text-[clamp(2.6rem,6vw,6.5rem)] font-medium leading-[1.0]"
                style={{
                  color:     gold ? 'var(--gold)' : 'var(--fg)',
                  fontStyle: gold ? 'italic' : 'normal',
                  opacity:   0,
                }}
              >
                {text}
              </p>
            ))}
          </blockquote>

          <div className="flex flex-col gap-6 md:col-span-5 md:pt-6">
            <div className="voice-attr flex items-center gap-4" style={{ opacity: 0 }}>
              <span className="block h-px w-10" style={{ background: 'var(--gold)' }} />
              <span className="font-display text-[14px] italic" style={{ color: 'var(--gold)' }}>
                {t.voice.attribution}
              </span>
            </div>
            <p className="voice-aside font-display text-[15px] font-light italic leading-[1.85]"
               style={{ color: 'var(--fg-soft)', opacity: 0 }}>
              {t.voice.aside}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
