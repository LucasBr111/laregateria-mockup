'use client';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0–100
  color?: string;
  height?: 'thin' | 'base' | 'thick';
  showLabel?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
}

export function ProgressBar({
  value,
  color = 'var(--primary)',
  height = 'base',
  showLabel = false,
  label,
  className,
  animated = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-[var(--text-muted)]">{label}</span>
          <span className="text-xs font-semibold" style={{ color }}>{clampedValue}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full overflow-hidden',
          'bg-[var(--bg-surface-elevated)]',
          height === 'thin' && 'h-1',
          height === 'base' && 'h-2',
          height === 'thick' && 'h-3',
        )}
      >
        <div
          className={cn(
            'h-full rounded-full',
            animated && 'transition-all duration-700 ease-out'
          )}
          style={{
            width: `${clampedValue}%`,
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: `0 0 8px ${color}55`,
          }}
        />
      </div>
    </div>
  );
}
