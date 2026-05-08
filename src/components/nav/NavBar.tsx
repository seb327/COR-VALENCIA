import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function NavBar() {
  const { t, lang, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NAV = [
    { label: t.nav.practice,   href: '#practice'  },
    { label: t.nav.sessions,   href: '#live'      },
    { label: t.nav.programmes, href: '#offerings' },
    { label: t.nav.join,       href: '#join'      },
  ];

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-700',
        scrolled ? 'border-b py-3' : 'py-5',
      )}
      style={{
        background:     scrolled ? 'rgba(27,42,74,.78)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderColor:    'var(--border)',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">

        {/* Logo wordmark — references the COR medallion */}
        <a href="#" className="group flex items-baseline gap-2 no-underline">
          <span
            className="font-display text-2xl font-medium tracking-tight transition-colors duration-500"
            style={{ color: 'var(--fg)' }}
          >
            cor
          </span>
          <span
            className="font-sans text-[10px] font-light uppercase tracking-[.34em] transition-colors duration-500"
            style={{ color: 'var(--rose)' }}
          >
            València
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map(({ label, href }) => (
            <a
              key={href} href={href}
              className="text-link text-[13px] font-light tracking-wide no-underline"
              style={{ color: 'var(--fg-soft)' }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-7 md:flex">
          {/* Lang toggle */}
          <button
            onClick={toggle}
            className="font-sans text-[11px] tracking-wide transition-colors"
            style={{ color: 'var(--fg-muted)' }}
          >
            <span style={{ color: lang==='en' ? 'var(--gold)' : 'var(--fg-muted)' }}>en</span>
            <span style={{ opacity:.4, padding:'0 .4em' }}>·</span>
            <span style={{ color: lang==='es' ? 'var(--gold)' : 'var(--fg-muted)' }}>es</span>
          </button>

          {/* CTA pill */}
          <a href="#live" className="pill pill-primary no-underline">
            {t.nav.book}
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(v => !v)}
          aria-label="Menu"
        >
          {[0,1,2].map(i => <span key={i} className="block h-px w-6" style={{ background:'var(--fg)' }} />)}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-5 px-6 pb-8 pt-6 md:hidden"
             style={{ background:'rgba(27,42,74,.97)' }}>
          {NAV.map(({ label, href }) => (
            <a key={href} href={href} className="text-sm no-underline"
               style={{ color: 'var(--fg-soft)' }}
               onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <button onClick={toggle} className="w-fit text-[11px] tracking-wide"
                  style={{ color:'var(--gold)' }}>
            {lang==='en' ? 'es' : 'en'}
          </button>
          <a href="#live" className="pill pill-primary w-fit no-underline" onClick={() => setOpen(false)}>
            {t.nav.book}
          </a>
        </div>
      )}
    </header>
  );
}
