import { useEffect, useRef, useState } from 'react';
import { gsap }              from 'gsap';
import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { useLanguage }       from '@/components/providers/LanguageProvider';
import { BentoCard }         from '@/components/ui/BentoCard';

gsap.registerPlugin(ScrollTrigger);

export function TailoredSection() {
  const { t, lang } = useLanguage();
  const sectionRef  = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll('.tailor-reveal'),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.09, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 72%', once: true } });
    }, section);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      id="tailored"
      key={lang}
      className="relative w-full px-6 py-32 md:px-[8vw] md:py-44"
    >
      <div className="grid gap-12 lg:grid-cols-12">

        {/* Left: title + audience tags */}
        <div className="flex flex-col gap-8 lg:col-span-6">
          <p className="tailor-reveal cor-label" style={{ opacity: 0 }}>
            {t.tailored.label}
          </p>

          <h2 className="tailor-reveal font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-medium leading-[1.05]"
              style={{ opacity: 0 }}>
            <span style={{ color: 'var(--fg)' }}>{t.tailored.title}</span>
            <br /><em style={{ color: 'var(--gold)' }}>{t.tailored.titleEm}</em>
          </h2>

          <p className="tailor-reveal max-w-[44ch] text-[15px] font-light leading-[1.85]"
             style={{ color: 'var(--fg)', opacity: 0 }}>
            {t.tailored.blurb}
          </p>

          <div className="tailor-reveal flex flex-wrap gap-2 pt-2" style={{ opacity: 0 }}>
            {t.tailored.audiences.map((audience) => (
              <span
                key={audience}
                className="rounded-full border px-4 py-2 text-[11px] tracking-wide transition-colors duration-500"
                style={{
                  borderColor: 'var(--card-border)',
                  color:       'var(--fg-soft)',
                  background:  'var(--card-bg)',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,168,75,0.40)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--fg-soft)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--card-border)';
                }}
              >
                {audience}
              </span>
            ))}
          </div>
        </div>

        {/* Right: enquiry card */}
        <div className="lg:col-span-6">
          <BentoCard className="tailor-reveal flex flex-col gap-7" as="aside">
            <p className="font-display text-[18px] font-light italic leading-[1.6]"
               style={{ color: 'var(--gold)' }}>
              "{t.tailored.prompt}"
            </p>

            {sent ? (
              <div className="flex min-h-[280px] flex-col justify-center gap-3">
                <span className="font-sans text-[10px] uppercase tracking-[.32em]"
                      style={{ color: 'var(--amber)' }}>
                  ✓ {lang === 'en' ? 'received' : 'recibido'}
                </span>
                <p className="font-display text-[16px] font-light italic leading-relaxed"
                   style={{ color: 'var(--fg)' }}>
                  {t.tailored.sent}
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-6"
                    onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    ['name',  lang === 'en' ? 'Your name'    : 'Tu nombre',     'text'],
                    ['email', lang === 'en' ? 'Your email'   : 'Tu email',      'email'],
                    ['org',   lang === 'en' ? 'Group / org'  : 'Grupo / org',   'text'],
                    ['size',  lang === 'en' ? 'Approx. size' : 'Tamaño aprox.', 'text'],
                  ].map(([id, label, type]) => (
                    <div key={id} className="flex flex-col gap-2">
                      <label htmlFor={id} className="font-sans text-[10px] uppercase tracking-[.24em]"
                             style={{ color: 'var(--fg-muted)' }}>
                        {label}
                      </label>
                      <input
                        id={id} type={type} required
                        className="rounded-full px-5 py-3 text-[14px] font-light outline-none transition-colors duration-300"
                        style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', color: 'var(--fg)' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
                        onBlur={ (e) => (e.currentTarget.style.borderColor = 'var(--card-border)')}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="msg" className="font-sans text-[10px] uppercase tracking-[.24em]"
                         style={{ color: 'var(--fg-muted)' }}>
                    {lang === 'en' ? 'Tell us about your group' : 'Cuéntanos sobre tu grupo'}
                  </label>
                  <textarea
                    id="msg" rows={4} required
                    className="resize-none rounded-2xl px-5 py-3 text-[14px] font-light leading-[1.6] outline-none transition-colors duration-300"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', color: 'var(--fg)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
                    onBlur={ (e) => (e.currentTarget.style.borderColor = 'var(--card-border)')}
                  />
                </div>

                <button type="submit" className="pill mt-2 w-fit"
                        style={{ background: 'var(--gold)', color: 'var(--bg)' }}>
                  {t.tailored.cta}
                </button>
              </form>
            )}
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
