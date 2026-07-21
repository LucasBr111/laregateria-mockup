'use client';
import { useEffect, useState, useRef } from 'react';
import { getTimeRemaining } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  title?: string;
  subtitle?: string;
}

interface Digit {
  current: number;
  prev: number;
  flipping: boolean;
}

function useFlipDigit(value: number) {
  const [digit, setDigit] = useState<Digit>({ current: value, prev: value, flipping: false });
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setDigit({ current: value, prev: prevValueRef.current, flipping: true });
      const timer = setTimeout(() => {
        setDigit((d) => ({ ...d, flipping: false }));
      }, 400);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return digit;
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const digit = useFlipDigit(value);
  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="relative w-14 h-16 sm:w-16 sm:h-18 flex items-center justify-center rounded-xl overflow-hidden"
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 4px 20px rgba(212,175,55,0.15)',
        }}
      >
        {/* Background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

        {/* Number */}
        <span
          key={digit.current}
          className="font-display text-3xl sm:text-4xl font-light text-gold-gradient select-none"
          style={{
            animation: digit.flipping ? 'flipDigit 0.4s ease-in-out' : 'none',
          }}
        >
          {display}
        </span>

        {/* Divider line */}
        <div
          className="absolute left-0 right-0 h-px opacity-30"
          style={{ top: '50%', background: 'var(--primary)' }}
        />
      </div>
      <span className="text-[10px] tracking-widest uppercase text-[var(--text-dim)] font-medium">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate, title, subtitle }: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const expired = time.total <= 0;

  return (
    <div className="glass-card p-5 sm:p-6 flex flex-col items-center text-center gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center animate-gold-glow"
          style={{ background: 'var(--primary-muted)', border: '1px solid var(--glass-border)' }}
        >
          <Zap size={15} style={{ color: 'var(--primary)' }} className="fill-current" />
        </div>
        <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: 'var(--primary)' }}>
          Venta Relámpago
        </span>
      </div>

      {title && (
        <div>
          <h3 className="text-display-md text-[var(--text-cream)]">{title}</h3>
          {subtitle && <p className="text-sm text-[var(--text-muted)] mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Countdown */}
      {!expired ? (
        <div className="flex items-end gap-2 sm:gap-3">
          <FlipUnit value={time.hours}   label="Horas"    />
          <span className="text-2xl text-[var(--primary)] mb-5 font-light opacity-60">:</span>
          <FlipUnit value={time.minutes} label="Minutos"  />
          <span className="text-2xl text-[var(--primary)] mb-5 font-light opacity-60">:</span>
          <FlipUnit value={time.seconds} label="Segundos" />
        </div>
      ) : (
        <p className="text-[var(--text-muted)] text-sm">La oferta ha finalizado.</p>
      )}
    </div>
  );
}
