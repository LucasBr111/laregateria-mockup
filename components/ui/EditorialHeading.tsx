'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface EditorialHeadingProps {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center' | 'right';
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

export function EditorialHeading({
  label,
  title,
  subtitle,
  align = 'left',
  size = 'lg',
  className,
}: EditorialHeadingProps) {
  return (
    <div
      className={cn(
        'space-y-3',
        align === 'center' && 'text-center mx-auto max-w-2xl',
        align === 'right' && 'text-right ml-auto',
        className
      )}
    >
      {label && <p className="editorial-label">{label}</p>}
      <h2
        className={cn(
          'text-[var(--text-primary)] font-serif font-light tracking-tight',
          size === 'md' && 'text-display-medium',
          size === 'lg' && 'text-display-large',
          size === 'xl' && 'text-display-giant'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-secondary)] font-sans max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
