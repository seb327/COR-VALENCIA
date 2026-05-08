import { useEffect, useRef } from 'react';
import { gsap }              from 'gsap';
import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { ZoomParallax }      from '@/components/ui/zoom-parallax';
import { useLanguage }       from '@/components/providers/LanguageProvider';

gsap.registerPlugin(ScrollTrigger);

/* Atmospheric placeholders — real photography to follow from the founder */
const IMAGES = [
  { src:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=70', alt:'Light through leaves' },
  { src:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=70', alt:'Open landscape, breath' },
  { src:'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=70',    alt:'Texture and rhythm' },
  { src:'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=70', alt:'Water as movement' },
  { src:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=70',  alt:'Stillness in form' },
  { src:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=70', alt:'Light on surface' },
  { src:'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=70', alt:'Warmth at threshold' },
];

export function GallerySection() {
  const { t, lang } = useLanguage();
  const headerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: header, start: 'top 78%', once: true,
        onEnter() {
          gsap.fromTo(
            header.querySelectorAll('.gallery-anim'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power2.out' },
          );
        },
      });
    }, header);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section className="relative w-full" key={lang}>
      <div ref={headerRef} className="px-6 pb-16 pt-20 md:px-[8vw]">
        <p className="gallery-anim cor-label mb-5" style={{ opacity: 0 }}>
          {t.gallery.label}
        </p>
        <h2 className="gallery-anim font-display leading-[1.0]" style={{ opacity: 0 }}>
          <span className="block text-[clamp(2.4rem,6vw,5.2rem)] font-medium"
                style={{ color: 'var(--fg)' }}>
            {t.gallery.title}
          </span>
          <span className="block text-[clamp(2.4rem,6vw,5.2rem)] font-medium italic"
                style={{ color: 'var(--gold)' }}>
            {t.gallery.titleEm}
          </span>
        </h2>
      </div>

      <ZoomParallax images={IMAGES} />
    </section>
  );
}
