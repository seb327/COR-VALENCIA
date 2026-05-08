import { useEffect, useRef } from 'react';
import { gsap }              from 'gsap';
import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { useLanguage }       from '@/components/providers/LanguageProvider';
import { IMG }               from '@/lib/images';

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
            .fromTo(section.querySelector('.voice-portrait'),
              { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4 }, '-=0.8')
            .fromTo(section.querySelector('.voice-attr'),
              { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.6')
            .fromTo(section.querySelector('.voice-aside'),
              { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.7');
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

        <div className="grid gap-14 md:grid-cols-12">

          {/* Manifesto */}
          <blockquote className="md:col-span-7">
            {t.voice.lines.map(({ text, gold }, i) => (
              <p
                key={i}
                className="voice-line font-display text-[clamp(2.6rem,6vw,6.5rem)] font-medium leading-[1.0]"
                style={{
                  color:     gold ? 'var(--copper)' : 'var(--fg)',
                  fontStyle: gold ? 'italic' : 'normal',
                  opacity:   0,
                }}
              >
                {text}
              </p>
            ))}
          </blockquote>

          {/* Portrait + attribution */}
          <div className="flex flex-col gap-7 md:col-span-5 md:pt-6">

            {/* Portrait — placeholder until founder provides real image */}
            <div
              className="voice-portrait relative overflow-hidden rounded-[2rem]"
              style={{
                opacity: 0,
                boxShadow: '0 30px 70px -25px rgba(27,42,74,.22), 0 0 0 1px rgba(27,42,74,.06)',
              }}
            >
              <img
                src={IMG.raquel.src}
                alt={IMG.raquel.alt}
                loading="lazy"
                className="img-soft h-80 w-full object-cover md:h-96"
              />
              <div className="pointer-events-none absolute inset-0"
                   style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(245,239,228,.30) 100%)' }} />
            </div>

            <div className="voice-attr flex items-center gap-4" style={{ opacity: 0 }}>
              <span className="block h-px w-10" style={{ background: 'var(--copper)' }} />
              <span className="font-display text-[14px] italic" style={{ color: 'var(--copper)' }}>
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
