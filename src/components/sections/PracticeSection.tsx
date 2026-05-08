import { useEffect, useRef } from 'react';
import { gsap }              from 'gsap';
import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { Activity, Wind, Hand, Sparkles } from 'lucide-react';
import { useLanguage }       from '@/components/providers/LanguageProvider';
import { BentoCard }         from '@/components/ui/BentoCard';

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Activity, Wind, Hand, Sparkles];

export function PracticeSection() {
  const { t, lang } = useLanguage();
  const sectionRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelector('.practice-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', once: true } });

      gsap.fromTo(section.querySelectorAll('.pillar-card'),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.14, ease: 'power2.out',
          scrollTrigger: { trigger: section.querySelector('.pillars-grid'), start: 'top 78%', once: true } });
    }, section);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      id="practice"
      key={lang}
      className="relative w-full px-6 py-32 md:px-[8vw] md:py-44"
    >
      {/* Header */}
      <div className="practice-header mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
           style={{ opacity: 0 }}>
        <div className="max-w-2xl">
          <p className="cor-label mb-5">{t.practice.label}</p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] font-medium leading-[1.05]">
            <span style={{ color: 'var(--fg)' }}>{t.practice.title}</span>
            <br />
            <em style={{ color: 'var(--gold)' }}>{t.practice.titleEm}</em>
          </h2>
        </div>
        <p className="max-w-[28ch] text-[14px] font-light leading-[1.8]"
           style={{ color: 'var(--fg-soft)' }}>
          {t.practice.blurb}
        </p>
      </div>

      {/* 4 pillars — bento grid */}
      <div className="pillars-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.practice.pillars.map((p, i) => {
          const Icon = ICONS[i];
          return (
            <BentoCard key={p.name}
              className="pillar-card group flex flex-col gap-7"
              as="article">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-700 group-hover:scale-110"
                style={{
                  background: 'rgba(212,168,75,0.08)',
                  color:      'var(--gold)',
                  border:     '1px solid rgba(212,168,75,0.20)',
                }}
              >
                <Icon size={20} strokeWidth={1.1} />
              </div>

              <span className="font-display text-[12px] italic" style={{ color: 'var(--rose)' }}>
                0{i+1}
              </span>

              <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium leading-[1.1]"
                  style={{ color: 'var(--fg)' }}>
                {p.name}
              </h3>

              <p className="font-display text-[14px] font-light italic leading-[1.7]"
                 style={{ color: 'var(--fg-soft)' }}>
                — {p.quote}
              </p>
            </BentoCard>
          );
        })}
      </div>
    </section>
  );
}
