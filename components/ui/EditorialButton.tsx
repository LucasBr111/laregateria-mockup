'use client';
import { cn } from '@/lib/utils';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface EditorialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
  loading?: boolean;
}

export function EditorialButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  loading = false,
  className,
  disabled,
  ...props
}: EditorialButtonProps) {
  return (
    <button
      className={cn(
        variant === 'primary' && 'btn-editorial-primary',
        variant === 'ghost' && 'btn-editorial-ghost',
        variant === 'link' && 'btn-editorial-link',
        size === 'sm' && 'text-[11px] px-4 py-2.5',
        size === 'lg' && 'text-xs px-8 py-4',
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
