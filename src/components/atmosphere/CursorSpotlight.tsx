import { useEffect } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   CursorSpotlight — soft amber radial glow that follows the cursor.
   "Linen / skin" texture cue from the brief: a warm light on tactile surface.
   Rendered at z-index above content but with mix-blend-overlay + pointer-events:none.
   ──────────────────────────────────────────────────────────────────────── */
export function CursorSpotlight() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9997]"
      style={{
        /* Rose-gold from the COR medallion — softer than gold, warmer than amber */
        background:
          'radial-gradient(560px circle at var(--mx, 50%) var(--my, 50%), rgba(194,144,120,0.08), transparent 60%)',
        mixBlendMode: 'plus-lighter',
      }}
    />
  );
}
