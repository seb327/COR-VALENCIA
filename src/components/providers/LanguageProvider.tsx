import { createContext, useContext, useState, useCallback } from 'react';
import { COPY, type Lang, type Copy } from '@/lib/copy';

interface Ctx {
  lang:   Lang;
  t:      Copy;
  toggle: () => void;
  set:    (l: Lang) => void;
}

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'es' : 'en')), []);

  return (
    <LanguageContext.Provider value={{ lang, t: COPY[lang], toggle, set: setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
