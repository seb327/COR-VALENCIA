/* ────────────────────────────────────────────────────────────────────────
   Curated placeholder imagery — somatic movement, breath, embodiment.
   The brief says "no stock photography" once live; the founder will
   replace these with real session photographs. For the demo build,
   each image is a calm, atmospheric placeholder.
   ──────────────────────────────────────────────────────────────────────── */

interface Img { src: string; alt: string; }

export const IMG: {
  hero:      Img;
  practice:  readonly Img[];
  offerings: readonly Img[];
  raquel:    Img;
} = {
  hero: {
    src: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&h=1200&fit=crop&crop=entropy&auto=format&q=72',
    alt: 'Hands meeting in stillness',
  },
  practice: [
    /* Movement */
    { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=720&h=480&fit=crop&crop=entropy&auto=format&q=72',
      alt: 'A body in soft motion' },
    /* Breath */
    { src: 'https://images.unsplash.com/photo-1532798442725-41036acc7489?w=720&h=480&fit=crop&crop=entropy&auto=format&q=72',
      alt: 'Breath at rest' },
    /* Touch */
    { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=720&h=480&fit=crop&crop=entropy&auto=format&q=72',
      alt: 'Touch and grounding' },
    /* Stillness */
    { src: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=720&h=480&fit=crop&crop=entropy&auto=format&q=72',
      alt: 'Stillness in form' },
  ],
  offerings: [
    /* Kids — outdoor circle/community */
    { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1080&h=600&fit=crop&crop=entropy&auto=format&q=72',
      alt: 'Movement together, outdoors' },
    /* Adult course — deep journey */
    { src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1080&h=600&fit=crop&crop=entropy&auto=format&q=72',
      alt: 'A four-session journey' },
  ],
  raquel: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=750&fit=crop&crop=entropy&auto=format&q=72',
    alt: 'Raquel — Founder of COR València',
  },
};
