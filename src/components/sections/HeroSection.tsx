import { useEffect, useRef } from 'react';
import { gsap }              from 'gsap';
import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { useLanguage }       from '@/components/providers/LanguageProvider';

gsap.registerPlugin(ScrollTrigger);

function SplitWords({ text }: { text: string }) {
  return (
    <span>
      {text.split(' ').map((w, i, arr) => (
        <span key={i} className="word-clip" style={{ marginRight: i < arr.length - 1 ? '.26em' : 0 }}>
          <span className="word-inner">{w}</span>
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const { t, lang } = useLanguage();
  const sectionRef  = useRef<HTMLElement>(null);

  /* Re-run entrance when language toggles */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const motto    = section.querySelector<HTMLElement>('.hero-motto');
      const label    = section.querySelector<HTMLElement>('.hero-label');
      const words    = section.querySelectorAll<HTMLElement>('.word-inner');
      const subtitle = section.querySelector<HTMLElement>('.hero-subtitle');
      const ctas     = section.querySelectorAll<HTMLElement>('.hero-cta');
      const cue      = section.querySelector<HTMLElement>('.hero-cue');

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo(motto,    { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1.0 })
        .fromTo(label,    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.5')
        .fromTo(words,    { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.4, stagger: 0.07 }, '-=0.5')
        .fromTo(subtitle, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1 }, '-=0.6')
        .fromTo(ctas,     { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.0, stagger: 0.12 }, '-=0.6')
        .fromTo(cue,      { opacity: 0 },        { opacity: 1, duration: 0.8 }, '-=0.3');
    }, section);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      key={lang}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pt-32 md:px-12"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">

        {/* Motto from logo */}
        <p
          className="hero-motto font-sans text-[11px] uppercase tracking-[.34em]"
          style={{ color: 'var(--rose)', opacity: 0 }}
        >
          {t.hero.motto}
        </p>

        {/* Soft section label */}
        <p className="hero-label cor-label mt-8" style={{ opacity: 0 }}>
          {t.hero.label}
        </p>

        {/* Display headline — Playfair Display */}
        <h1 className="font-display mt-10 leading-[0.95]">
          <span
            className="block text-[clamp(3.5rem,9vw,9rem)] font-medium"
            style={{ color: 'var(--fg)' }}
          >
            <SplitWords text={t.hero.titleA} />{' '}
            <SplitWords text={t.hero.titleB} />
          </span>
          <span
            className="mt-2 block text-[clamp(3.5rem,9vw,9rem)] font-medium italic"
            style={{ color: 'var(--gold)' }}
          >
            <SplitWords text={t.hero.titleC} />
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle mt-10 max-w-[44ch] text-[15px] font-light leading-[1.85]"
          style={{ color: 'var(--fg-soft)', opacity: 0 }}
        >
          {t.hero.subtitle}
        </p>

        {/* CTAs — pill shaped */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#live"   className="hero-cta pill pill-primary" style={{ opacity: 0 }}>
            {t.hero.ctaPrimary}
          </a>
          <a href="#essence" className="hero-cta pill pill-ghost"   style={{ opacity: 0 }}>
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Soft scroll cue */}
      <div className="hero-cue absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
           style={{ opacity: 0 }}>
        <span className="font-sans text-[10px] uppercase tracking-[.34em]"
              style={{ color: 'var(--fg-muted)' }}>
          {t.hero.scroll}
        </span>
        <span className="block h-10 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
      </div>
    </section>
  );
}
