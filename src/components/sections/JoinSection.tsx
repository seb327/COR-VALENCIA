import { useEffect, useRef, useState } from 'react';
import { gsap }              from 'gsap';
import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { AtSign, MapPin }    from 'lucide-react';
import { useLanguage }       from '@/components/providers/LanguageProvider';
import { BentoCard }         from '@/components/ui/BentoCard';

gsap.registerPlugin(ScrollTrigger);

export function JoinSection() {
  const { t, lang } = useLanguage();
  const sectionRef  = useRef<HTMLElement>(null);
  const [emailSent,   setEmailSent]   = useState(false);
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll('.join-reveal'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.10, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 70%', once: true } });
    }, section);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      id="join"
      key={lang}
      className="relative w-full px-6 py-32 md:px-[8vw] md:py-44"
    >
      {/* Header */}
      <div className="join-reveal mb-20 max-w-3xl" style={{ opacity: 0 }}>
        <p className="cor-label mb-5">{t.join.label}</p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[1.0]">
          <span style={{ color: 'var(--fg)' }}>{t.join.title}</span>
          <br /><em style={{ color: 'var(--gold)' }}>{t.join.titleEm}</em>
        </h2>
        <p className="mt-8 max-w-[42ch] text-[15px] font-light leading-[1.85]"
           style={{ color: 'var(--fg-soft)' }}>
          {t.join.blurb}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">

        {/* Newsletter card */}
        <BentoCard className="join-reveal flex flex-col gap-7 lg:col-span-5">
          <span className="font-display text-[12px] italic" style={{ color: 'var(--gold)' }}>
            {lang === 'en' ? 'Newsletter' : 'Boletín'}
          </span>

          {emailSent ? (
            <p className="font-display text-[18px] font-light italic leading-relaxed"
               style={{ color: 'var(--gold)' }}>
              ✓ {t.join.sent}
            </p>
          ) : (
            <form className="flex flex-wrap items-end gap-3"
                  onSubmit={(e) => { e.preventDefault(); setEmailSent(true); }}>
              <div className="flex min-w-[220px] flex-1 flex-col gap-2">
                <label className="font-sans text-[10px] uppercase tracking-[.24em]"
                       style={{ color: 'var(--fg-muted)' }}>{t.join.emailLabel}</label>
                <input type="email" required
                       placeholder={t.join.emailPlaceholder}
                       className="rounded-full px-5 py-3 text-[14px] font-light outline-none transition-colors duration-300 placeholder:opacity-30"
                       style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', color: 'var(--fg)' }}
                       onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--amber)')}
                       onBlur={ (e) => (e.currentTarget.style.borderColor = 'var(--card-border)')} />
              </div>
              <button type="submit" className="pill pill-primary">{t.join.cta}</button>
            </form>
          )}

          <div className="mt-4 flex flex-col gap-3 border-t pt-6"
               style={{ borderColor: 'var(--card-border)' }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="text-link flex items-center gap-3 text-[13px] no-underline"
               style={{ color: 'var(--fg-soft)' }}>
              <AtSign size={14} strokeWidth={1.2} />
              <span>{t.join.instagram}</span>
            </a>
            <div className="flex items-center gap-3 text-[13px]"
                 style={{ color: 'var(--fg-soft)' }}>
              <MapPin size={14} strokeWidth={1.2} />
              <span>{t.join.location}</span>
            </div>
          </div>
        </BentoCard>

        {/* Contact card */}
        <BentoCard className="join-reveal flex flex-col gap-7 lg:col-span-7">
          <span className="font-display text-[12px] italic" style={{ color: 'var(--gold)' }}>
            {t.join.contactLabel}
          </span>

          {contactSent ? (
            <div className="flex min-h-[220px] flex-col justify-center gap-3">
              <p className="font-display text-[20px] font-light italic leading-relaxed"
                 style={{ color: 'var(--fg)' }}>
                {lang === 'en'
                  ? 'Your note has arrived. Raquel will write back personally.'
                  : 'Tu nota ha llegado. Raquel te responderá personalmente.'}
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-6"
                  onSubmit={(e) => { e.preventDefault(); setContactSent(true); }}>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  ['cn', t.join.contactName, 'text'],
                  ['ce', t.join.emailLabel,   'email'],
                ].map(([id, label, type]) => (
                  <div key={id} className="flex flex-col gap-2">
                    <label className="font-sans text-[10px] uppercase tracking-[.24em]"
                           style={{ color: 'var(--fg-muted)' }}>{label}</label>
                    <input type={type} required
                      className="rounded-full px-5 py-3 text-[14px] font-light outline-none transition-colors duration-300"
                      style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', color: 'var(--fg)' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--amber)')}
                      onBlur={ (e) => (e.currentTarget.style.borderColor = 'var(--card-border)')} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] uppercase tracking-[.24em]"
                       style={{ color: 'var(--fg-muted)' }}>{t.join.contactMessage}</label>
                <textarea rows={4} required
                  className="resize-none rounded-2xl px-5 py-3 text-[14px] font-light leading-[1.6] outline-none transition-colors duration-300"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', color: 'var(--fg)' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--amber)')}
                  onBlur={ (e) => (e.currentTarget.style.borderColor = 'var(--card-border)')} />
              </div>
              <button type="submit" className="pill pill-primary mt-2 w-fit">
                {t.join.contactCta}
              </button>
            </form>
          )}
        </BentoCard>
      </div>

      {/* Footer */}
      <div className="join-reveal mt-24 flex flex-wrap items-baseline justify-between gap-6 border-t pt-10"
           style={{ borderColor: 'var(--card-border)', opacity: 0 }}>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-medium" style={{ color: 'var(--fg)' }}>cor</span>
          <span className="font-sans text-[10px] font-light uppercase tracking-[.34em]"
                style={{ color: 'var(--rose)' }}>València</span>
        </div>
        <p className="font-sans text-[10px] uppercase tracking-[.22em]"
           style={{ color: 'var(--fg-muted)' }}>{t.join.copyright}</p>
      </div>
    </section>
  );
}
