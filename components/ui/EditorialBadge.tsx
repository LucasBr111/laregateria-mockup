'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type BadgeVariant = 'gold' | 'sale' | 'new' | 'dark' | 'outline';

interface EditorialBadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function EditorialBadge({ variant = 'gold', children, className }: EditorialBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-none select-none border',
        variant === 'gold' && 'bg-[var(--accent-gold-muted)] text-[var(--accent-gold)] border-[var(--accent-gold)]/30',
        variant === 'sale' && 'bg-[var(--accent-sale)] text-white border-[var(--accent-sale)]',
        variant === 'new' && 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border-[var(--border-medium)]',
        variant === 'dark' && 'bg-[var(--text-primary)] text-[var(--bg-base)] border-[var(--text-primary)]',
        variant === 'outline' && 'bg-transparent text-[var(--text-secondary)] border-[var(--border-subtle)]',
        className
      )}
    >
      {children}
    </span>
  );
}
