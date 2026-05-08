import { cn } from '@/lib/utils';

interface BentoCardProps {
  className?: string;
  children:   React.ReactNode;
  as?:        'div' | 'article' | 'aside' | 'section';
}

/* ────────────────────────────────────────────────────────────────────────
   BentoCard — glassmorphic rounded container.
   Backdrop-blur + subtle cream-tinted bg + soft border.
   ──────────────────────────────────────────────────────────────────────── */
export function BentoCard({ className, children, as = 'div' }: BentoCardProps) {
  const Component = as;
  return (
    <Component className={cn('bento p-8 md:p-10', className)}>
      {children}
    </Component>
  );
}
