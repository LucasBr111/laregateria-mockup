'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Banknote, CreditCard, QrCode, Check, ChevronRight, ChevronLeft, Upload, Copy } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice, buildWhatsAppMessage } from '@/lib/utils';
import { GlassButton } from '@/components/ui/GlassButton';
import { BANK_INFO, WHATSAPP_NUMBER } from '@/lib/mock-data';
import type { ShippingZone, PaymentMethod } from '@/types';
import { SHIPPING_LABELS, SHIPPING_COSTS } from '@/types';
import { cn } from '@/lib/utils';

type Step = 'cart-review' | 'shipping' | 'payment' | 'confirm';

const ZONES: ShippingZone[] = ['asuncion', 'gran-asuncion', 'interior', 'retiro'];
const PAYMENT_METHODS: { value: PaymentMethod; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: 'whatsapp', label: 'WhatsApp',     icon: <MessageCircle size={20} />, desc: 'Coordinamos por chat' },
  { value: 'transfer', label: 'Transferencia',icon: <Banknote size={20} />,      desc: 'CBU / Cuenta bancaria' },
  { value: 'card',     label: 'Tarjeta / QR', icon: <CreditCard size={20} />,    desc: 'Pago online seguro' },
];

function StepIndicator({ current, steps }: { current: Step; steps: Step[] }) {
  const idx = steps.indexOf(current);
  return (
    <div className="flex items-center gap-1 mb-8">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-1 flex-1">
          <div
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
              i < idx ? 'text-black' : i === idx ? 'text-black ring-2 ring-[var(--primary)]/40' : 'border border-[var(--glass-border)] text-[var(--text-dim)]'
            )}
            style={i <= idx ? { background: 'var(--primary)' } : {}}
          >
            {i < idx ? <Check size={12} /> : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className={cn('flex-1 h-px transition-all', i < idx ? 'opacity-100' : 'opacity-20')}
              style={{ background: 'var(--primary)' }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CheckoutPage() {
  const items      = useCartStore((s) => s.items);
  const subtotal   = useCartStore((s) => s.subtotal());
  const zone       = useCartStore((s) => s.shippingZone);
  const setZone    = useCartStore((s) => s.setShippingZone);
  const shipping   = useCartStore((s) => s.shippingCost());
  const total      = useCartStore((s) => s.total());
  const clearCart  = useCartStore((s) => s.clearCart);

  const [step, setStep]           = useState<Step>('cart-review');
  const [payment, setPayment]     = useState<PaymentMethod | null>(null);
  const [copied, setCopied]       = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const steps: Step[] = ['cart-review', 'shipping', 'payment', 'confirm'];

  const whatsappMsg = buildWhatsAppMessage(
    items.map((i) => ({
      name: i.product.name,
      size: i.variant.size,
      color: i.variant.color,
      price: i.product.price,
      qty: i.quantity,
    })),
    subtotal,
    shipping,
    zone ? SHIPPING_LABELS[zone] : 'No seleccionado'
  );

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
    clearCart();
  };

  const copyBankInfo = () => {
    navigator.clipboard.writeText(`${BANK_INFO.bank}\nCuenta: ${BANK_INFO.account}\nAlias: ${BANK_INFO.alias}\nTitular: ${BANK_INFO.holder}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (items.length === 0 && !orderConfirmed) {
    return (
      <div className="min-h-dvh pt-20 pb-nav flex items-center justify-center">
        <div className="text-center glass-card p-10 max-w-sm mx-4">
          <p className="font-display text-2xl text-[var(--text-cream)] mb-3">Tu carrito está vacío</p>
          <p className="text-sm text-[var(--text-muted)] mb-6">Agregá productos para continuar.</p>
          <Link href="/catalog"><GlassButton fullWidth>Explorar colección</GlassButton></Link>
        </div>
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className="min-h-dvh pt-20 pb-nav flex items-center justify-center">
        <div className="text-center glass-card p-10 max-w-sm mx-4 space-y-5 animate-fade-in-up">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center animate-gold-glow"
            style={{ background: 'var(--primary-muted)', border: '2px solid var(--primary)' }}>
            <Check size={28} style={{ color: 'var(--primary)' }} />
          </div>
          <h2 className="text-display-md text-[var(--text-cream)]">¡Pedido confirmado!</h2>
          <p className="text-sm text-[var(--text-muted)]">
            {payment === 'whatsapp'
              ? 'Te contactamos por WhatsApp para coordinar el pago y entrega.'
              : payment === 'transfer'
              ? 'Verificamos tu comprobante y coordinamos la entrega.'
              : 'Tu pago fue procesado. Recibirás confirmación por email.'}
          </p>
          <Link href="/"><GlassButton fullWidth>Volver al inicio</GlassButton></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh pt-20 pb-nav md:pb-12">
      <div className="container-app max-w-2xl py-8">
        <div className="text-center mb-6">
          <h1 className="text-display-md text-[var(--text-cream)]">Checkout</h1>
        </div>

        <StepIndicator current={step} steps={steps} />

        {/* Step 1 — Revisión */}
        {step === 'cart-review' && (
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="font-display text-xl text-[var(--text-cream)]">Revisá tu pedido</h2>
            {items.map((item) => (
              <div key={item.variant.id} className="glass-card p-4 flex gap-3">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 bg-[var(--bg-surface)]">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-cream)]">{item.product.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.variant.size} / {item.variant.color}</p>
                  <p className="text-xs text-[var(--text-muted)]">Cantidad: {item.quantity}</p>
                  <p className="text-sm font-semibold mt-1" style={{ color: 'var(--primary)' }}>
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2">
              <span className="text-[var(--text-muted)]">Subtotal</span>
              <span className="font-semibold text-[var(--text-cream)]">{formatPrice(subtotal)}</span>
            </div>
            <GlassButton fullWidth onClick={() => setStep('shipping')}>
              Continuar <ChevronRight size={16} />
            </GlassButton>
          </div>
        )}

        {/* Step 2 — Envío */}
        {step === 'shipping' && (
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="font-display text-xl text-[var(--text-cream)]">Zona de entrega</h2>
            <div className="space-y-2">
              {ZONES.map((z) => (
                <button
                  key={z}
                  onClick={() => setZone(z)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl flex items-center justify-between transition-all',
                    zone === z
                      ? 'text-black font-medium'
                      : 'border border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--primary)]'
                  )}
                  style={zone === z
                    ? { background: 'var(--primary)' }
                    : { background: 'var(--glass-bg)' }
                  }
                >
                  <span>{SHIPPING_LABELS[z]}</span>
                  <span className="text-sm">{z === 'retiro' ? 'Gratis' : formatPrice(SHIPPING_COSTS[z])}</span>
                </button>
              ))}
            </div>
            {zone && (
              <div className="flex justify-between text-sm pt-2">
                <span className="text-[var(--text-muted)]">Total estimado</span>
                <span className="font-bold" style={{ color: 'var(--primary)' }}>{formatPrice(total)}</span>
              </div>
            )}
            <div className="flex gap-2">
              <GlassButton variant="ghost" onClick={() => setStep('cart-review')}><ChevronLeft size={15} /></GlassButton>
              <GlassButton fullWidth disabled={!zone} onClick={() => setStep('payment')}>
                Elegir método de pago <ChevronRight size={15} />
              </GlassButton>
            </div>
          </div>
        )}

        {/* Step 3 — Pago */}
        {step === 'payment' && (
          <div className="space-y-5 animate-fade-in-up">
            <h2 className="font-display text-xl text-[var(--text-cream)]">Método de pago</h2>

            {/* Payment method selector */}
            <div className="space-y-2">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.value}
                  onClick={() => setPayment(pm.value)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all',
                    payment === pm.value
                      ? 'border-[var(--primary)] text-[var(--primary)]'
                      : 'border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--primary)]'
                  )}
                  style={{
                    background: payment === pm.value ? 'var(--primary-muted)' : 'var(--glass-bg)',
                    border: `1px solid ${payment === pm.value ? 'var(--primary)' : 'var(--glass-border)'}`,
                  }}
                >
                  {pm.icon}
                  <div>
                    <p className="font-semibold text-sm">{pm.label}</p>
                    <p className="text-xs opacity-70">{pm.desc}</p>
                  </div>
                  {payment === pm.value && (
                    <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--primary)' }}>
                      <Check size={11} className="text-black" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Payment detail panels */}
            {payment === 'whatsapp' && (
              <div className="glass-card p-4 space-y-3 animate-fade-in-up">
                <p className="text-sm font-semibold text-[var(--text-cream)] flex items-center gap-2">
                  <MessageCircle size={16} style={{ color: 'var(--primary)' }} />
                  Mensaje para WhatsApp
                </p>
                <pre className="text-xs text-[var(--text-muted)] whitespace-pre-wrap leading-relaxed p-3 rounded-lg"
                  style={{ background: 'var(--bg-surface-elevated)' }}>
                  {whatsappMsg}
                </pre>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlassButton fullWidth>
                    <MessageCircle size={16} /> Abrir WhatsApp
                  </GlassButton>
                </a>
              </div>
            )}

            {payment === 'transfer' && (
              <div className="glass-card p-4 space-y-3 animate-fade-in-up">
                <p className="text-sm font-semibold text-[var(--text-cream)] flex items-center gap-2">
                  <Banknote size={16} style={{ color: 'var(--primary)' }} />
                  Datos bancarios
                </p>
                <div className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <div className="flex justify-between"><span>Banco</span><span className="text-[var(--text-cream)]">{BANK_INFO.bank}</span></div>
                  <div className="flex justify-between"><span>Cuenta</span><span className="text-[var(--text-cream)]">{BANK_INFO.account}</span></div>
                  <div className="flex justify-between"><span>Alias</span><span className="text-[var(--text-cream)]">{BANK_INFO.alias}</span></div>
                  <div className="flex justify-between"><span>Titular</span><span className="text-[var(--text-cream)]">{BANK_INFO.holder}</span></div>
                  <div className="flex justify-between"><span>RUC</span><span className="text-[var(--text-cream)]">{BANK_INFO.ruc}</span></div>
                </div>
                <GlassButton variant="ghost" fullWidth onClick={copyBankInfo}>
                  <Copy size={14} /> {copied ? '¡Copiado!' : 'Copiar datos'}
                </GlassButton>
                {/* Comprobante upload */}
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-2">Subir comprobante de transferencia</p>
                  <label className="flex flex-col items-center gap-2 py-6 rounded-xl border-2 border-dashed border-[var(--glass-border)] cursor-pointer hover:border-[var(--primary)] transition-colors">
                    {fileUploaded
                      ? <><Check size={20} style={{ color: 'var(--accent-success)' }} /><span className="text-xs text-[var(--accent-success)]">Comprobante enviado ✓</span></>
                      : <><Upload size={20} style={{ color: 'var(--text-dim)' }} /><span className="text-xs text-[var(--text-muted)]">Tocá para subir (JPG, PNG, PDF)</span></>
                    }
                    <input type="file" className="sr-only" accept="image/*,.pdf"
                      onChange={() => setFileUploaded(true)} />
                  </label>
                </div>
              </div>
            )}

            {payment === 'card' && (
              <div className="glass-card p-4 space-y-4 animate-fade-in-up">
                <p className="text-sm font-semibold text-[var(--text-cream)] flex items-center gap-2">
                  <CreditCard size={16} style={{ color: 'var(--primary)' }} />
                  Pago con tarjeta
                </p>
                <div className="space-y-3">
                  <input className="input-glass" placeholder="Número de tarjeta" maxLength={19} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input-glass" placeholder="MM/AA" maxLength={5} />
                    <input className="input-glass" placeholder="CVV" maxLength={4} />
                  </div>
                  <input className="input-glass" placeholder="Nombre en la tarjeta" />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                  <QrCode size={40} style={{ color: 'var(--primary)' }} />
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-cream)]">También podés pagar con QR</p>
                    <p className="text-xs text-[var(--text-muted)]">Bancard, Pagopar o billetera electrónica</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <GlassButton variant="ghost" onClick={() => setStep('shipping')}><ChevronLeft size={15} /></GlassButton>
              <GlassButton fullWidth disabled={!payment} onClick={() => setStep('confirm')}>
                Revisar pedido <ChevronRight size={15} />
              </GlassButton>
            </div>
          </div>
        )}

        {/* Step 4 — Confirmar */}
        {step === 'confirm' && (
          <div className="space-y-5 animate-fade-in-up">
            <h2 className="font-display text-xl text-[var(--text-cream)]">Resumen final</h2>
            <div className="glass-card p-4 space-y-2 text-sm">
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Envío</span><span>{zone ? (shipping === 0 ? 'Gratis' : formatPrice(shipping)) : '—'}</span>
              </div>
              <div className="divider-gold" />
              <div className="flex justify-between font-bold text-base">
                <span className="text-[var(--text-cream)]">Total</span>
                <span style={{ color: 'var(--primary)' }}>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Método de pago</span>
                <span>{PAYMENT_METHODS.find((p) => p.value === payment)?.label}</span>
              </div>
              {zone && (
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Envío a</span><span>{SHIPPING_LABELS[zone].split(' (')[0]}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <GlassButton variant="ghost" onClick={() => setStep('payment')}><ChevronLeft size={15} /></GlassButton>
              <GlassButton fullWidth onClick={handleConfirmOrder}>
                <Check size={16} /> Confirmar pedido
              </GlassButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
