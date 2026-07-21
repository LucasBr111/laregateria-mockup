'use client';
import { cn } from '@/lib/utils';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
  loading?: boolean;
}

export function GlassButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  loading = false,
  className,
  disabled,
  ...props
}: GlassButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none',
        variant === 'primary' && 'btn-primary',
        variant === 'ghost' && 'btn-ghost',
        variant === 'danger' && 'bg-red-900/30 border border-red-700/40 text-red-400 rounded-xl px-4 py-2 hover:bg-red-900/50',
        size === 'sm' && 'text-xs px-3 py-2 rounded-lg',
        size === 'lg' && 'text-base px-6 py-4',
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
