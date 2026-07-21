'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type BadgeVariant = 'new' | 'sale' | 'stock-low' | 'stock-out' | 'gold' | 'rank';

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
  pulse?: boolean;
  style?: React.CSSProperties;
}

export function Badge({ variant, children, className, pulse = false, style }: BadgeProps) {
  return (
    <span
      style={style}
      className={cn(
        'inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full',
        variant === 'new' && 'badge-new',
        variant === 'sale' && 'badge-sale',
        variant === 'stock-low' && 'badge-stock-low',
        variant === 'stock-out' && 'bg-neutral-800 border border-neutral-700 text-neutral-400',
        variant === 'gold' && 'bg-[var(--primary-muted)] border border-[var(--glass-border)] text-[var(--primary)]',
        variant === 'rank' && 'bg-[var(--primary-muted)] border border-[var(--primary)]/30 text-[var(--primary)]',
        pulse && 'animate-pulse',
        className
      )}
    >
      {variant === 'stock-low' && (
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sale)] animate-pulse" />
      )}
      {children}
    </span>
  );
}
