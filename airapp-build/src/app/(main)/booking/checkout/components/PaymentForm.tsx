'use client';

import { cn } from '@/lib/utils/cn';
import { CreditCard, Smartphone, ShieldCheck } from 'lucide-react';

export type PaymentMethod = 'card' | 'apple-pay' | 'google-pay';

export interface PaymentData {
  method: PaymentMethod;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

interface PaymentFormProps {
  data: PaymentData;
  onChange: (data: PaymentData) => void;
  errors: Record<string, string>;
}

const METHODS: { value: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { value: 'card', label: 'Credit Card', icon: CreditCard },
  { value: 'apple-pay', label: 'Apple Pay', icon: Smartphone },
  { value: 'google-pay', label: 'Google Pay', icon: Smartphone },
];

export function PaymentForm({ data, onChange, errors }: PaymentFormProps) {
  const update = (field: keyof PaymentData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          Payment Method
        </h2>
        <p className="text-sm text-primary-500 dark:text-[oklch(60%_0.005_50)] mt-0.5">
          Choose how you&apos;d like to pay
        </p>
      </div>

      {/* Method Selector */}
      <div className="space-y-2" role="radiogroup" aria-label="Payment method">
        {METHODS.map((method) => {
          const Icon = method.icon;
          const isSelected = data.method === method.value;
          return (
            <button
              key={method.value}
              role="radio"
              aria-checked={isSelected}
              onClick={() => update('method', method.value)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left',
                'transition-all duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-preferred)]',
                isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-[oklch(20%_0.015_262)] dark:border-[oklch(55%_0.194_262)]'
                  : 'border-surface-300 dark:border-[oklch(28%_0.005_50)] hover:border-primary-300 dark:hover:border-[oklch(40%_0.05_262)]'
              )}
            >
              <div className={cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                isSelected
                  ? 'border-primary-500 dark:border-[oklch(55%_0.194_262)]'
                  : 'border-surface-300 dark:border-[oklch(40%_0.005_50)]'
              )}>
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-500 dark:bg-[oklch(55%_0.194_262)]" />
                )}
              </div>
              <Icon className="w-5 h-5 text-primary-500 dark:text-[oklch(65%_0.194_262)]" />
              <span className="text-sm font-medium text-primary-900 dark:text-[oklch(92%_0.002_50)]">
                {method.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Credit Card Fields */}
      {data.method === 'card' && (
        <div className="space-y-3 p-4 rounded-xl bg-surface-50 dark:bg-[oklch(16%_0.003_50)] border border-surface-200 dark:border-[oklch(25%_0.005_50)]">
          <div>
            <label className="block text-xs font-medium text-primary-700 dark:text-[oklch(80%_0.005_50)] mb-1">
              Card Number <span className="text-error-500">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={formatCardNumber(data.cardNumber)}
              onChange={(e) => update('cardNumber', e.target.value.replace(/\D/g, ''))}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              className={cn(
                'w-full px-3 py-2.5 border rounded-md text-sm bg-background font-mono tracking-wider',
                'focus:outline-none focus:ring-2 focus:ring-primary-500',
                'dark:bg-[oklch(18%_0.003_50)] dark:text-[oklch(95%_0.002_50)]',
                'min-h-[var(--touch-min)]',
                'placeholder:text-primary-400 dark:placeholder:text-[oklch(45%_0.005_50)]',
                errors.cardNumber
                  ? 'border-error-400'
                  : 'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
              )}
              aria-label="Card number"
              aria-invalid={!!errors.cardNumber}
            />
            {errors.cardNumber && (
              <p className="text-xs text-error-500 mt-1" role="alert">{errors.cardNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-primary-700 dark:text-[oklch(80%_0.005_50)] mb-1">
              Cardholder Name <span className="text-error-500">*</span>
            </label>
            <input
              type="text"
              value={data.cardName}
              onChange={(e) => update('cardName', e.target.value)}
              placeholder="John Doe"
              className={cn(
                'w-full px-3 py-2.5 border rounded-md text-sm bg-background',
                'focus:outline-none focus:ring-2 focus:ring-primary-500',
                'dark:bg-[oklch(18%_0.003_50)] dark:text-[oklch(95%_0.002_50)]',
                'min-h-[var(--touch-min)]',
                'placeholder:text-primary-400 dark:placeholder:text-[oklch(45%_0.005_50)]',
                'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
              )}
              aria-label="Cardholder name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-primary-700 dark:text-[oklch(80%_0.005_50)] mb-1">
                Expiry <span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={formatExpiry(data.expiry)}
                onChange={(e) => update('expiry', e.target.value.replace(/\D/g, ''))}
                placeholder="MM/YY"
                maxLength={5}
                className={cn(
                  'w-full px-3 py-2.5 border rounded-md text-sm bg-background font-mono',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  'dark:bg-[oklch(18%_0.003_50)] dark:text-[oklch(95%_0.002_50)]',
                  'min-h-[var(--touch-min)]',
                  'placeholder:text-primary-400 dark:placeholder:text-[oklch(45%_0.005_50)]',
                  'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
                )}
                aria-label="Expiry date"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-primary-700 dark:text-[oklch(80%_0.005_50)] mb-1">
                CVV <span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={data.cvv}
                onChange={(e) => update('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                maxLength={4}
                className={cn(
                  'w-full px-3 py-2.5 border rounded-md text-sm bg-background font-mono',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  'dark:bg-[oklch(18%_0.003_50)] dark:text-[oklch(95%_0.002_50)]',
                  'min-h-[var(--touch-min)]',
                  'placeholder:text-primary-400 dark:placeholder:text-[oklch(45%_0.005_50)]',
                  'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
                )}
                aria-label="CVV"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <ShieldCheck className="w-4 h-4 text-success-500 dark:text-[oklch(65%_0.15_155)]" />
            <span className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
              Secure checkout — your payment info is encrypted
            </span>
          </div>
        </div>
      )}

      {data.method !== 'card' && (
        <div className="p-4 rounded-xl bg-surface-50 dark:bg-[oklch(16%_0.003_50)] border border-surface-200 dark:border-[oklch(25%_0.005_50)] text-center">
          <p className="text-sm text-primary-600 dark:text-[oklch(75%_0.005_50)]">
            You&apos;ll be redirected to complete payment after review.
          </p>
        </div>
      )}
    </div>
  );
}
