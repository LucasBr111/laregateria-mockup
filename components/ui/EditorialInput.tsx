'use client';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface EditorialInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const EditorialInput = forwardRef<HTMLInputElement, EditorialInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn('input-editorial', error && 'border-[var(--accent-sale)]', className)}
          {...props}
        />
        {error && <p className="text-xs text-[var(--accent-sale)] mt-1">{error}</p>}
      </div>
    );
  }
);

EditorialInput.displayName = 'EditorialInput';
