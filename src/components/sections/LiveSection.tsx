import { useEffect, useRef, useState } from 'react';
import { gsap }              from 'gsap';
import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { MapPin, Calendar }  from 'lucide-react';
import { useLanguage }       from '@/components/providers/LanguageProvider';
import { BentoCard }         from '@/components/ui/BentoCard';

gsap.registerPlugin(ScrollTrigger);

export function LiveSection() {
  const { t, lang } = useLanguage();
  const sectionRef  = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll('.live-reveal'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.10, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 70%', once: true } });
    }, section);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      id="live"
      key={lang}
      className="relative w-full px-6 py-32 md:px-[8vw] md:py-44"
    >
      <div className="grid gap-10 lg:grid-cols-12">

        {/* Left: copy */}
        <div className="flex flex-col gap-8 lg:col-span-7">

          {/* Live status badge */}
          <div className="live-reveal inline-flex w-fit items-center gap-3 rounded-full border px-4 py-2"
               style={{ borderColor: 'rgba(193,123,63,0.40)', background: 'rgba(193,123,63,0.06)', opacity: 0 }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-live absolute inset-0 rounded-full" style={{ background: 'var(--amber)' }} />
              <span className="absolute inset-0 rounded-full" style={{ background: 'var(--amber)' }} />
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[.32em]" style={{ color: 'var(--amber)' }}>
              {t.live.status}
            </span>
          </div>

          <p className="live-reveal cor-label" style={{ opacity: 0 }}>
            {t.live.label}
          </p>

          <h2 className="live-reveal font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.0]"
              style={{ color: 'var(--fg)', opacity: 0 }}>
            {t.live.title}
          </h2>

          <p className="live-reveal max-w-[52ch] text-[16px] font-light leading-[1.85]"
             style={{ color: 'var(--fg)', opacity: 0 }}>
            {t.live.desc}
          </p>

          <p className="live-reveal max-w-[52ch] font-display text-[16px] font-light italic leading-[1.7]"
             style={{ color: 'var(--gold)', opacity: 0 }}>
            {t.live.gift}
          </p>

          <div className="live-reveal flex flex-wrap items-center gap-8" style={{ opacity: 0 }}>
            <div className="flex items-center gap-3">
              <Calendar size={14} strokeWidth={1.2} style={{ color: 'var(--rose)' }} />
              <span className="text-[13px] font-light" style={{ color: 'var(--fg-soft)' }}>{t.live.when}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={14} strokeWidth={1.2} style={{ color: 'var(--rose)' }} />
              <span className="text-[13px] font-light" style={{ color: 'var(--fg-soft)' }}>{t.live.where}</span>
            </div>
          </div>
        </div>

        {/* Right: RSVP card (glassmorphic) */}
        <div className="lg:col-span-5">
          <BentoCard className="live-reveal flex flex-col gap-7" as="aside">
            <header className="flex flex-col gap-2 border-b pb-6"
                    style={{ borderColor: 'var(--card-border)' }}>
              <span className="font-display text-[12px] italic" style={{ color: 'var(--gold)' }}>RSVP</span>
              <h3 className="font-display text-[1.6rem] font-medium leading-tight"
                  style={{ color: 'var(--fg)' }}>
                {t.live.formLabel}
              </h3>
              <p className="font-display text-[12px] font-light italic" style={{ color: 'var(--fg-muted)' }}>
                {t.live.formNote}
              </p>
            </header>

            {sent ? (
              <div className="flex min-h-[200px] flex-col justify-center gap-3">
                <span className="font-sans text-[10px] uppercase tracking-[.32em]"
                      style={{ color: 'var(--amber)' }}>
                  ✓ {lang === 'en' ? 'held' : 'reservado'}
                </span>
                <p className="font-display text-[18px] font-light italic leading-relaxed"
                   style={{ color: 'var(--gold)' }}>
                  {t.live.sent}
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-6"
                    onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                {[
                  ['name',  lang === 'en' ? 'Your name'  : 'Tu nombre',  'text'],
                  ['email', lang === 'en' ? 'Your email' : 'Tu email',   'email'],
                ].map(([id, label, type]) => (
                  <div key={id} className="flex flex-col gap-2">
                    <label htmlFor={id} className="font-sans text-[10px] uppercase tracking-[.24em]"
                           style={{ color: 'var(--fg-muted)' }}>
                      {label}
                    </label>
                    <input
                      id={id} type={type} required
                      className="rounded-full px-5 py-3 text-[14px] font-light outline-none transition-colors duration-300"
                      style={{
                        background:  'var(--input-bg)',
                        border:      '1px solid var(--card-border)',
                        color:       'var(--fg)',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--amber)')}
                      onBlur={ (e) => (e.currentTarget.style.borderColor = 'var(--card-border)')}
                    />
                  </div>
                ))}

                <button type="submit" className="pill pill-primary mt-3 w-fit">
                  {t.live.cta}
                </button>
              </form>
            )}
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
