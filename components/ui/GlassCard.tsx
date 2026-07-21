'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section' | 'li';
}

export function GlassCard({
  children,
  className,
  hover = true,
  onClick,
  as: Tag = 'div',
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        'glass-card',
        hover && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
}
