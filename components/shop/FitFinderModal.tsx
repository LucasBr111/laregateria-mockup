'use client';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { GlassButton } from '@/components/ui/GlassButton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { calcFitRecommendation } from '@/lib/utils';
import type { FitFinderInput, FitFinderResult, SizeMeasurement } from '@/types';
import { Ruler, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FitFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  measurements: SizeMeasurement[];
}

type Step = 1 | 2 | 3;

const SIZES  = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;
const FITS   = [
  { value: 'ajustado', label: 'Ajustado',  desc: 'Marca la silueta' },
  { value: 'estandar', label: 'Estándar',  desc: 'Fiel a la tabla'  },
  { value: 'suelto',   label: 'Suelto',    desc: 'Con amplitud'     },
] as const;
const HEIGHTS = [
  { value: 152, label: '< 155 cm' },
  { value: 158, label: '155–162 cm' },
  { value: 165, label: '163–168 cm' },
  { value: 170, label: '169–174 cm' },
  { value: 176, label: '175+ cm' },
];

export function FitFinderModal({ isOpen, onClose, productName, measurements }: FitFinderModalProps) {
  const [step, setStep]       = useState<Step>(1);
  const [input, setInput]     = useState<Partial<FitFinderInput>>({});
  const [result, setResult]   = useState<FitFinderResult | null>(null);

  const handleReset = () => {
    setStep(1);
    setInput({});
    setResult(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const calculate = () => {
    if (!input.usualSize || !input.fitPreference || !input.heightCm) return;
    const res = calcFitRecommendation(input as FitFinderInput, measurements);
    setResult(res);
    setStep(3);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Probador Inteligente" size="md">
      <div className="space-y-5">
        {/* Product name */}
        <p className="text-sm text-[var(--text-muted)]">
          Calculando talle para: <span className="text-[var(--text-cream)] font-medium">{productName}</span>
        </p>

        {/* Progress steps */}
        {step !== 3 && (
          <div className="flex items-center gap-2">
            {([1, 2] as const).map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    step >= s
                      ? 'text-black'
                      : 'border border-[var(--glass-border)] text-[var(--text-dim)]'
                  )}
                  style={step >= s ? { background: 'var(--primary)' } : {}}
                >
                  {s}
                </div>
                <span className={cn('text-xs', step >= s ? 'text-[var(--text-cream)]' : 'text-[var(--text-dim)]')}>
                  {s === 1 ? 'Tu talle' : 'Altura y calce'}
                </span>
                {s < 2 && <div className="flex-1 h-px bg-[var(--glass-border)]" />}
              </div>
            ))}
          </div>
        )}

        {/* Step 1 — Talle habitual */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            <h3 className="font-display text-lg text-[var(--text-cream)]">¿Cuál es tu talle habitual?</h3>
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setInput((p) => ({ ...p, usualSize: size }))}
                  className={cn(
                    'py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200',
                    input.usualSize === size
                      ? 'text-black'
                      : 'border border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                  )}
                  style={input.usualSize === size
                    ? { background: 'var(--primary)' }
                    : { background: 'var(--glass-bg)' }
                  }
                >
                  {size}
                </button>
              ))}
            </div>
            <GlassButton
              fullWidth
              disabled={!input.usualSize}
              onClick={() => setStep(2)}
            >
              Continuar <ChevronRight size={15} />
            </GlassButton>
          </div>
        )}

        {/* Step 2 — Altura y calce */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <h3 className="font-display text-lg text-[var(--text-cream)] mb-3">¿Cuál es tu altura?</h3>
              <div className="grid grid-cols-1 gap-1.5">
                {HEIGHTS.map((h) => (
                  <button
                    key={h.value}
                    onClick={() => setInput((p) => ({ ...p, heightCm: h.value }))}
                    className={cn(
                      'py-2.5 px-4 rounded-xl text-sm text-left transition-all duration-200',
                      input.heightCm === h.value
                        ? 'text-black font-medium'
                        : 'border border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--primary)]'
                    )}
                    style={input.heightCm === h.value
                      ? { background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))' }
                      : { background: 'var(--glass-bg)' }
                    }
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-base text-[var(--text-cream)] mb-2">Calce preferido</h3>
              <div className="grid grid-cols-3 gap-2">
                {FITS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setInput((p) => ({ ...p, fitPreference: f.value }))}
                    className={cn(
                      'py-3 px-2 rounded-xl flex flex-col items-center gap-1 text-center transition-all duration-200',
                      input.fitPreference === f.value
                        ? 'text-black'
                        : 'border border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--primary)]'
                    )}
                    style={input.fitPreference === f.value
                      ? { background: 'var(--primary)' }
                      : { background: 'var(--glass-bg)' }
                    }
                  >
                    <span className="text-sm font-semibold">{f.label}</span>
                    <span className={cn('text-[10px]', input.fitPreference === f.value ? 'text-black/70' : 'text-[var(--text-dim)]')}>
                      {f.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <GlassButton variant="ghost" onClick={() => setStep(1)}>
                <ChevronLeft size={15} /> Atrás
              </GlassButton>
              <GlassButton
                fullWidth
                disabled={!input.heightCm || !input.fitPreference}
                onClick={calculate}
              >
                <Ruler size={15} /> Calcular talle
              </GlassButton>
            </div>
          </div>
        )}

        {/* Step 3 — Resultado */}
        {step === 3 && result && (
          <div className="space-y-5 animate-fade-in-up">
            <div className="text-center py-6 rounded-2xl"
              style={{ background: 'var(--primary-muted)', border: '1px solid var(--glass-border)' }}>
              <CheckCircle size={36} className="mx-auto mb-3" style={{ color: 'var(--primary)' }} />
              <p className="text-sm text-[var(--text-muted)] mb-1">Tu talle recomendado</p>
              <p className="text-6xl font-display font-light text-gold-gradient">{result.recommendedSize}</p>
            </div>

            {/* Confidence */}
            <div>
              <ProgressBar
                value={result.confidence}
                label="Confianza del resultado"
                showLabel
                height="thick"
              />
              <p className="text-xs text-[var(--text-muted)] mt-2 italic">{result.notes}</p>
            </div>

            {/* Tabla de medidas */}
            {measurements.length > 0 && (
              <details className="group">
                <summary className="text-xs text-[var(--text-muted)] cursor-pointer hover:text-[var(--primary)] transition-colors list-none flex items-center gap-1">
                  <span>Ver tabla de medidas completa</span>
                  <ChevronRight size={12} className="group-open:rotate-90 transition-transform" />
                </summary>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-xs text-[var(--text-muted)]">
                    <thead>
                      <tr className="border-b border-[var(--glass-border)]">
                        <th className="py-1.5 text-left">Talle</th>
                        <th className="py-1.5 text-center">Busto</th>
                        <th className="py-1.5 text-center">Cintura</th>
                        <th className="py-1.5 text-center">Cadera</th>
                      </tr>
                    </thead>
                    <tbody>
                      {measurements.map((m) => (
                        <tr
                          key={m.size}
                          className={cn('border-b border-[var(--glass-border)]/50',
                            m.size === result.recommendedSize && 'text-[var(--primary)] font-semibold')}
                        >
                          <td className="py-1.5">{m.size}</td>
                          <td className="py-1.5 text-center">{m.bustCm || '—'} cm</td>
                          <td className="py-1.5 text-center">{m.waistCm} cm</td>
                          <td className="py-1.5 text-center">{m.hipCm} cm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            )}

            <div className="flex gap-2">
              <GlassButton variant="ghost" size="sm" onClick={handleReset}>
                Recalcular
              </GlassButton>
              <GlassButton fullWidth onClick={handleClose}>
                Usar talle {result.recommendedSize}
              </GlassButton>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
