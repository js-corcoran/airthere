'use client';

import { FileDown } from 'lucide-react';
import type { PersonaType } from '@/lib/types/user';
import type { TripRecapData } from '../data/mock-recap';

interface ExpenseBreakdownProps {
  expenses: TripRecapData['expenses'];
  totalCost: number;
  currency: string;
  persona: PersonaType;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const FAMILY_MEMBERS = 4; // Chen family size

export function ExpenseBreakdown({ expenses, totalCost, currency, persona }: ExpenseBreakdownProps) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <section aria-labelledby="expense-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h3
          id="expense-heading"
          className="text-lg font-semibold text-primary-900 dark:text-foreground"
        >
          Expense Breakdown
        </h3>

        {/* Business persona: prominent export */}
        {persona === 'business' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success-50 dark:bg-success-900/30 text-success-600 dark:text-success-400 text-xs font-medium">
            Within Policy
          </span>
        )}
      </div>

      <div className="bg-surface dark:bg-card rounded-[var(--radius-lg)] border border-surface-300 dark:border-muted p-4 space-y-4">
        {/* Stacked bar */}
        <div
          className="flex h-4 rounded-full overflow-hidden"
          role="img"
          aria-label={`Expense breakdown: ${expenses.map((e) => `${e.category} ${formatCurrency(e.amount, currency)}`).join(', ')}`}
        >
          {expenses.map((expense) => {
            const pct = (expense.amount / total) * 100;
            return (
              <div
                key={expense.category}
                className={`${expense.color} transition-all duration-[--duration-short]`}
                style={{ width: `${pct}%` }}
                aria-hidden="true"
              />
            );
          })}
        </div>

        {/* Category list */}
        <ul className="space-y-2.5" aria-label="Expense categories">
          {expenses.map((expense, i) => {
            const pct = ((expense.amount / total) * 100).toFixed(0);
            return (
              <li key={expense.category} className="flex items-center justify-between opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-sm ${expense.color} flex-shrink-0`}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-primary-700 dark:text-muted-foreground">
                    {expense.category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-primary-500 dark:text-caption-foreground">
                    {pct}%
                  </span>
                  <span className="text-sm font-medium text-primary-900 dark:text-foreground tabular-nums w-16 text-right">
                    {formatCurrency(expense.amount, currency)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div className="border-t border-surface-300 dark:border-muted" aria-hidden="true" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary-900 dark:text-foreground">
            Total
          </span>
          <span className="text-lg font-bold text-primary-900 dark:text-foreground tabular-nums">
            {formatCurrency(totalCost, currency)}
          </span>
        </div>

        {/* Family per-person breakdown */}
        {persona === 'family' && (
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-primary-500 dark:text-caption-foreground">
              Per person ({FAMILY_MEMBERS} travelers)
            </span>
            <span className="text-sm font-medium text-primary-700 dark:text-muted-foreground tabular-nums">
              {formatCurrency(Math.round(totalCost / FAMILY_MEMBERS), currency)}
            </span>
          </div>
        )}

        {/* Export button */}
        <button
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors duration-[--duration-micro] min-h-[var(--touch-preferred)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
            persona === 'business'
              ? 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 text-white'
              : 'border border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-surface-elevated'
          }`}
        >
          <FileDown className="w-4 h-4" aria-hidden="true" />
          {persona === 'business' ? 'Export Expense Report' : 'Export Summary'}
        </button>
      </div>
    </section>
  );
}
