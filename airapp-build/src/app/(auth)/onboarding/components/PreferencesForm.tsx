'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { AIRLINE_LIST } from '@/lib/constants/airlines';

interface PreferencesFormProps {
  onComplete: (data: PreferencesData) => void;
}

interface PreferencesData {
  name: string;
  email: string;
  preferredAirline: string;
  frequentFlyerNumber: string;
  acceptTerms: boolean;
}

export function PreferencesForm({ onComplete }: PreferencesFormProps) {
  const [formData, setFormData] = useState<PreferencesData>({
    name: '',
    email: '',
    preferredAirline: '',
    frequentFlyerNumber: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PreferencesData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PreferencesData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms to continue';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onComplete(formData);
    }
  };

  const updateField = (field: keyof PreferencesData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputBase = cn(
    'w-full px-4 py-3 border rounded-md text-base bg-background',
    'transition-colors duration-[--duration-short]',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    'dark:bg-card dark:text-foreground',
    'min-h-[var(--touch-preferred)]'
  );

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8">
      <div className="flex-1 flex flex-col items-center justify-start max-w-md w-full pt-8 md:pt-0 md:justify-center">
        <h2 className="text-2xl md:text-[28px] font-bold text-primary-900 dark:text-foreground mb-2 text-center tracking-[-0.25px]">
          Create Your Profile
        </h2>
        <p className="text-base text-primary-700 dark:text-muted-foreground mb-8 text-center max-w-sm leading-relaxed">
          A few details to personalize your travel experience.
        </p>

        <div className="w-full space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary-900 dark:text-foreground mb-1.5">
              Full Name <span className="text-error-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Alexandra Sterling"
              autoComplete="name"
              className={cn(
                inputBase,
                errors.name
                  ? 'border-error-500 focus:ring-error-500'
                  : 'border-surface-300 dark:border-muted'
              )}
            />
            {errors.name && (
              <p className="text-xs text-error-500 mt-1" role="alert">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-900 dark:text-foreground mb-1.5">
              Email Address <span className="text-error-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="alexandra@example.com"
              autoComplete="email"
              className={cn(
                inputBase,
                errors.email
                  ? 'border-error-500 focus:ring-error-500'
                  : 'border-surface-300 dark:border-muted'
              )}
            />
            {errors.email && (
              <p className="text-xs text-error-500 mt-1" role="alert">{errors.email}</p>
            )}
          </div>

          {/* Preferred Airline */}
          <div>
            <label htmlFor="airline" className="block text-sm font-medium text-primary-900 dark:text-foreground mb-1.5">
              Preferred Airline
            </label>
            <select
              id="airline"
              value={formData.preferredAirline}
              onChange={(e) => updateField('preferredAirline', e.target.value)}
              className={cn(inputBase, 'border-surface-300 dark:border-muted')}
            >
              <option value="">Select an airline (optional)</option>
              {AIRLINE_LIST.map((airline) => (
                <option key={airline.code} value={airline.code}>
                  {airline.name}
                </option>
              ))}
            </select>
          </div>

          {/* Frequent Flyer */}
          <div>
            <label htmlFor="ffn" className="block text-sm font-medium text-primary-900 dark:text-foreground mb-1.5">
              Frequent Flyer Number
            </label>
            <input
              id="ffn"
              type="text"
              value={formData.frequentFlyerNumber}
              onChange={(e) => updateField('frequentFlyerNumber', e.target.value)}
              placeholder="Optional"
              className={cn(inputBase, 'border-surface-300 dark:border-muted')}
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 pt-2">
            <input
              id="terms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => updateField('acceptTerms', e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-surface-300 text-primary-500 focus:ring-primary-500
                         cursor-pointer accent-primary-500 shrink-0"
            />
            <label htmlFor="terms" className="text-xs text-primary-700 dark:text-soft-foreground leading-relaxed cursor-pointer">
              I agree to the{' '}
              <span className="text-primary-600 dark:text-primary-400 underline">Terms of Service</span>{' '}
              and{' '}
              <span className="text-primary-600 dark:text-primary-400 underline">Privacy Policy</span>.
              Your data is handled with care per GDPR and CCPA requirements.
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-xs text-error-500" role="alert">{errors.acceptTerms}</p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="w-full max-w-md mt-6">
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-secondary-500 text-white font-medium rounded-md text-base
                     hover:bg-secondary-600 active:bg-secondary-700
                     transition-all duration-[--duration-short]
                     shadow-sm hover:shadow-md hover:-translate-y-0.5
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                     min-h-[var(--touch-preferred)]"
        >
          Complete &amp; Go to Home
        </button>
      </div>
    </div>
  );
}
