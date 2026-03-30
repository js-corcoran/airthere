'use client';

import { cn } from '@/lib/utils/cn';
import { User } from 'lucide-react';

export interface PassengerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  specialRequests: string;
}

interface PassengerFormProps {
  passengers: PassengerData[];
  onChange: (passengers: PassengerData[]) => void;
  errors: Record<string, string>;
  persona?: string;
}

function FormField({
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-primary-700 dark:text-soft-foreground mb-1">
        {label} {required && <span className="text-error-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full px-3 py-2.5 border rounded-md text-sm bg-background',
          'transition-colors duration-[--duration-short]',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'dark:bg-card dark:text-foreground',
          'min-h-[var(--touch-min)]',
          'placeholder:text-primary-400 dark:placeholder:text-faint-foreground disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-error-400 dark:border-error-600'
            : 'border-surface-300 dark:border-muted'
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${label}-error` : undefined}
      />
      {error && (
        <p id={`${label}-error`} className="text-xs text-error-500 mt-1" role="alert">{error}</p>
      )}
    </div>
  );
}

export function PassengerForm({ passengers, onChange, errors, persona }: PassengerFormProps) {
  const updatePassenger = (index: number, field: keyof PassengerData, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-primary-900 dark:text-foreground">
          Passenger Details
        </h2>
        <p className="text-sm text-primary-500 dark:text-faint-foreground mt-0.5">
          Enter details as they appear on travel documents
        </p>
      </div>

      {passengers.map((pax, i) => (
        <div
          key={i}
          className="p-4 rounded-xl border border-surface-300 dark:border-input space-y-3 opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-primary-500 dark:text-primary-400" />
            <h3 className="text-sm font-semibold text-primary-900 dark:text-foreground">
              Passenger {i + 1}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="First Name"
              value={pax.firstName}
              onChange={(v) => updatePassenger(i, 'firstName', v)}
              error={errors[`pax${i}-firstName`]}
              placeholder="John"
              required
            />
            <FormField
              label="Last Name"
              value={pax.lastName}
              onChange={(v) => updatePassenger(i, 'lastName', v)}
              error={errors[`pax${i}-lastName`]}
              placeholder="Doe"
              required
            />
          </div>

          <FormField
            label="Email"
            value={pax.email}
            onChange={(v) => updatePassenger(i, 'email', v)}
            error={errors[`pax${i}-email`]}
            type="email"
            placeholder="john@example.com"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Date of Birth"
              value={pax.dateOfBirth}
              onChange={(v) => updatePassenger(i, 'dateOfBirth', v)}
              error={errors[`pax${i}-dateOfBirth`]}
              type="date"
              required
            />
            <FormField
              label="Phone"
              value={pax.phone}
              onChange={(v) => updatePassenger(i, 'phone', v)}
              type="tel"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {persona === 'family' && (
            <FormField
              label="Special Requests"
              value={pax.specialRequests}
              onChange={(v) => updatePassenger(i, 'specialRequests', v)}
              placeholder="Dietary needs, bassinet, wheelchair..."
            />
          )}
        </div>
      ))}
    </div>
  );
}
