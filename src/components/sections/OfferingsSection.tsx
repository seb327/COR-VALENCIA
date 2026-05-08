import { useEffect, useRef, useState } from 'react';
import { gsap }              from 'gsap';
import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { useLanguage }       from '@/components/providers/LanguageProvider';
import { IMG }               from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

export function OfferingsSection() {
  const { t, lang } = useLanguage();
  const sectionRef  = useRef<HTMLElement>(null);
  const [kidsSent,  setKidsSent]  = useState(false);
  const [adultSent, setAdultSent] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelector('.off-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', once: true } });

      gsap.fromTo(section.querySelectorAll('.offering-card'),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.18, ease: 'power2.out',
          scrollTrigger: { trigger: section.querySelector('.offerings-grid'), start: 'top 80%', once: true } });
    }, section);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      id="offerings"
      key={lang}
      className="relative w-full px-6 py-32 md:px-[8vw] md:py-44"
    >
      {/* Header */}
      <div className="off-header mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
           style={{ opacity: 0 }}>
        <div className="max-w-2xl">
          <p className="cor-label mb-5">{t.offerings.label}</p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] font-medium leading-[1.05]">
            <span style={{ color: 'var(--fg)' }}>{t.offerings.title}</span>
            <br /><em style={{ color: 'var(--copper)' }}>{t.offerings.titleEm}</em>
          </h2>
        </div>
        <p className="max-w-[30ch] text-[14px] font-light leading-[1.8]"
           style={{ color: 'var(--fg-soft)' }}>
          {t.offerings.blurb}
        </p>
      </div>

      {/* Bento: Kids + Adult — image on top of each */}
      <div className="offerings-grid grid gap-5 md:grid-cols-2">

        {/* ── Kids Valencia ────────────────────────────────────── */}
        <article className="offering-card bento group flex flex-col overflow-hidden p-0">
          <div className="relative h-56 w-full overflow-hidden md:h-64">
            <img
              src={IMG.offerings[0].src}
              alt={IMG.offerings[0].alt}
              loading="lazy"
              className="img-soft h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                 style={{ background: 'linear-gradient(to bottom, transparent, rgba(245,239,228,.55))' }} />
            <span className="absolute left-5 top-5 rounded-full px-3 py-1 backdrop-blur-md font-display text-[11px] italic"
                  style={{ background: 'rgba(245,239,228,.85)', color: 'var(--copper)', border: '1px solid rgba(160,104,80,.30)' }}>
              {t.offerings.kids.status}
            </span>
            <span className="absolute right-5 top-5 rounded-full px-3 py-1 backdrop-blur-md font-sans text-[10px] uppercase tracking-[.28em]"
                  style={{ background: 'rgba(245,239,228,.85)', color: 'var(--fg-muted)' }}>
              {lang === 'en' ? 'outdoor · valència' : 'aire libre · valència'}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-6 p-8 md:p-10">
            <h3 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-tight"
                style={{ color: 'var(--fg)' }}>
              {t.offerings.kids.title}
            </h3>

            <p className="text-[15px] font-light leading-[1.85]" style={{ color: 'var(--fg)' }}>
              {t.offerings.kids.desc}
            </p>

            <p className="font-display text-[13px] font-light italic" style={{ color: 'var(--copper)' }}>
              {t.offerings.kids.openTo}
            </p>

            <div className="flex flex-col">
              {t.offerings.kids.prices.map(({ label, price }) => (
                <div key={label}
                     className="flex items-center justify-between border-t py-3 text-[13px] font-light"
                     style={{ borderColor: 'var(--card-border)' }}>
                  <span style={{ color: 'var(--fg-soft)' }}>{label}</span>
                  <span className="font-display tabular-nums" style={{ color: 'var(--copper)' }}>{price}</span>
                </div>
              ))}
            </div>

            {kidsSent ? (
              <p className="mt-2 font-display text-[14px] font-light italic" style={{ color: 'var(--amber)' }}>
                ✓ {t.offerings.kids.sent}
              </p>
            ) : (
              <form className="mt-4 flex flex-wrap items-end gap-3"
                    onSubmit={(e) => { e.preventDefault(); setKidsSent(true); }}>
                <div className="flex min-w-[200px] flex-1 flex-col gap-2">
                  <label className="font-sans text-[10px] uppercase tracking-[.24em]"
                         style={{ color: 'var(--fg-muted)' }}>
                    {lang === 'en' ? 'Email for launch updates' : 'Email para avisos'}
                  </label>
                  <input type="email" required
                    className="rounded-full px-5 py-3 text-[14px] font-light outline-none transition-colors duration-300"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', color: 'var(--fg)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--amber)')}
                    onBlur={ (e) => (e.currentTarget.style.borderColor = 'var(--card-border)')}
                  />
                </div>
                <button type="submit" className="pill pill-primary">
                  {t.offerings.kids.cta}
                </button>
              </form>
            )}
          </div>
        </article>

        {/* ── Adult Course ─────────────────────────────────────── */}
        <article className="offering-card bento group flex flex-col overflow-hidden p-0">
          <div className="relative h-56 w-full overflow-hidden md:h-64">
            <img
              src={IMG.offerings[1].src}
              alt={IMG.offerings[1].alt}
              loading="lazy"
              className="img-soft h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                 style={{ background: 'linear-gradient(to bottom, transparent, rgba(245,239,228,.55))' }} />
            <span className="absolute left-5 top-5 rounded-full px-3 py-1 backdrop-blur-md font-display text-[11px] italic"
                  style={{ background: 'rgba(245,239,228,.85)', color: 'var(--copper)', border: '1px solid rgba(160,104,80,.30)' }}>
              {t.offerings.adult.status}
            </span>
            <span className="absolute right-5 top-5 rounded-full px-3 py-1 backdrop-blur-md font-sans text-[10px] uppercase tracking-[.28em]"
                  style={{ background: 'rgba(245,239,228,.85)', color: 'var(--fg-muted)' }}>
              {lang === 'en' ? '4 sessions · premium' : '4 sesiones · premium'}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-6 p-8 md:p-10">
            <h3 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-tight"
                style={{ color: 'var(--fg)' }}>
              {t.offerings.adult.title}
            </h3>

            <p className="text-[15px] font-light leading-[1.85]" style={{ color: 'var(--fg)' }}>
              {t.offerings.adult.desc}
            </p>

            <p className="border-l pl-5 font-display text-[14px] font-light italic leading-[1.8]"
               style={{ borderColor: 'var(--copper)', color: 'var(--fg-soft)' }}>
              {t.offerings.adult.focus}
            </p>

            <p className="text-[13px] font-light tracking-wide" style={{ color: 'var(--copper)' }}>
              — {t.offerings.adult.tag}
            </p>

            {adultSent ? (
              <p className="mt-auto pt-6 font-display text-[14px] font-light italic" style={{ color: 'var(--amber)' }}>
                ✓ {t.offerings.adult.sent}
              </p>
            ) : (
              <form className="mt-auto flex flex-wrap items-end gap-3 pt-6"
                    onSubmit={(e) => { e.preventDefault(); setAdultSent(true); }}>
                <div className="flex min-w-[200px] flex-1 flex-col gap-2">
                  <label className="font-sans text-[10px] uppercase tracking-[.24em]"
                         style={{ color: 'var(--fg-muted)' }}>
                    {lang === 'en' ? 'Email for waitlist' : 'Email para lista de espera'}
                  </label>
                  <input type="email" required
                    className="rounded-full px-5 py-3 text-[14px] font-light outline-none transition-colors duration-300"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', color: 'var(--fg)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--copper)')}
                    onBlur={ (e) => (e.currentTarget.style.borderColor = 'var(--card-border)')}
                  />
                </div>
                <button type="submit" className="pill"
                        style={{ background: 'var(--copper)', color: '#FFFCF5',
                                 boxShadow: '0 12px 32px -8px rgba(160,104,80,.45)' }}>
                  {t.offerings.adult.cta}
                </button>
              </form>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
