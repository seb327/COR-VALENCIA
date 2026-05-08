import { useEffect, useRef } from 'react';
import { gsap }              from 'gsap';
import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { useLanguage }       from '@/components/providers/LanguageProvider';
import { IMG }               from '@/lib/images';

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
      const image    = section.querySelector<HTMLElement>('.hero-image');

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo(motto,    { opacity: 0, y: 12 },     { opacity: 1, y: 0, duration: 1.0 })
        .fromTo(label,    { opacity: 0, y: 16 },     { opacity: 1, y: 0, duration: 1.0 }, '-=0.5')
        .fromTo(words,    { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.4, stagger: 0.07 }, '-=0.5')
        .fromTo(subtitle, { opacity: 0, y: 22 },     { opacity: 1, y: 0, duration: 1.1 }, '-=0.6')
        .fromTo(ctas,     { opacity: 0, y: 18 },     { opacity: 1, y: 0, duration: 1.0, stagger: 0.12 }, '-=0.6')
        .fromTo(image,    { opacity: 0, x: 30 },     { opacity: 1, x: 0, duration: 1.6, ease: 'power2.out' }, 0.2)
        .fromTo(cue,      { opacity: 0 },            { opacity: 1, duration: 0.8 }, '-=0.3');
    }, section);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      key={lang}
      className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pt-32 md:px-12"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-12">

        {/* ─── Left: text ─────────────────────────────────────── */}
        <div className="flex flex-col items-start text-left md:col-span-7">

          <p className="hero-motto font-sans text-[11px] uppercase tracking-[.34em]"
             style={{ color: 'var(--rose)', opacity: 0 }}>
            {t.hero.motto}
          </p>

          <p className="hero-label cor-label mt-7" style={{ opacity: 0 }}>
            {t.hero.label}
          </p>

          <h1 className="font-display mt-9 leading-[0.95]">
            <span className="block text-[clamp(3.2rem,8vw,8rem)] font-medium"
                  style={{ color: 'var(--fg)' }}>
              <SplitWords text={t.hero.titleA} />{' '}
              <SplitWords text={t.hero.titleB} />
            </span>
            <span className="mt-2 block text-[clamp(3.2rem,8vw,8rem)] font-medium italic"
                  style={{ color: 'var(--copper)' }}>
              <SplitWords text={t.hero.titleC} />
            </span>
          </h1>

          <p className="hero-subtitle mt-9 max-w-[44ch] text-[15px] font-light leading-[1.85]"
             style={{ color: 'var(--fg-soft)', opacity: 0 }}>
            {t.hero.subtitle}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4">
            <a href="#live"   className="hero-cta pill pill-primary" style={{ opacity: 0 }}>
              {t.hero.ctaPrimary}
            </a>
            <a href="#essence" className="hero-cta pill pill-ghost"   style={{ opacity: 0 }}>
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* ─── Right: somatic image (hidden on mobile) ─────────── */}
        <div className="hidden md:col-span-5 md:block">
          <div
            className="hero-image relative overflow-hidden rounded-[2rem]"
            style={{
              opacity: 0,
              boxShadow: '0 40px 80px -30px rgba(27,42,74,.25), 0 0 0 1px rgba(27,42,74,.06)',
            }}
          >
            <img
              src={IMG.hero.src}
              alt={IMG.hero.alt}
              className="img-soft h-[68vh] w-full object-cover"
              loading="eager"
            />
            {/* warm copper overlay tint for tonal cohesion */}
            <div className="pointer-events-none absolute inset-0"
                 style={{
                   background: 'linear-gradient(180deg, transparent 0%, rgba(245,239,228,.10) 70%, rgba(245,239,228,.30) 100%)',
                 }} />
          </div>
        </div>
      </div>

      {/* Soft scroll cue — bottom-left on desktop, bottom-center on mobile */}
      <div className="hero-cue absolute bottom-10 left-6 flex flex-col items-center gap-3 md:left-12"
           style={{ opacity: 0 }}>
        <span className="font-sans text-[10px] uppercase tracking-[.34em]"
              style={{ color: 'var(--fg-muted)' }}>
          {t.hero.scroll}
        </span>
        <span className="block h-10 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--copper), transparent)' }} />
      </div>
    </section>
  );
}
