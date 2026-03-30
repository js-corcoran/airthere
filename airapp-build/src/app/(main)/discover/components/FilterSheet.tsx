'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { X, RotateCcw } from 'lucide-react';
import { DiscoverFilters, DiscoverRegion, DEFAULT_FILTERS } from '../types';
import { DISCOVER_TAGS } from '../data/discover-data';

interface FilterSheetProps {
  isOpen: boolean;
  filters: DiscoverFilters;
  onApply: (filters: DiscoverFilters) => void;
  onClose: () => void;
}

const REGIONS: { id: DiscoverRegion; label: string }[] = [
  { id: 'europe', label: 'Europe' },
  { id: 'asia', label: 'Asia' },
  { id: 'north-america', label: 'North America' },
  { id: 'south-america', label: 'South America' },
  { id: 'middle-east', label: 'Middle East' },
  { id: 'oceania', label: 'Oceania' },
  { id: 'africa', label: 'Africa' },
];

export function FilterSheet({ isOpen, filters, onApply, onClose }: FilterSheetProps) {
  const [draft, setDraft] = useState<DiscoverFilters>(filters);

  const handleReset = () => {
    setDraft(DEFAULT_FILTERS);
  };

  const toggleRegion = (region: DiscoverRegion) => {
    setDraft((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  };

  const toggleTag = (tag: string) => {
    setDraft((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-overlay-dark"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 bg-surface dark:bg-card
                   rounded-t-2xl shadow-xl max-h-[80vh] flex flex-col
                   animate-[slideUp_300ms_ease-out]"
        role="dialog"
        aria-modal="true"
        aria-label="Filter destinations"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1" aria-hidden="true">
          <div className="w-10 h-1 rounded-full bg-surface-300 dark:bg-muted" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-300 dark:border-muted">
          <h2 className="text-lg font-semibold text-primary-900 dark:text-foreground">
            Filters
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-medium text-primary-500 dark:text-primary-400
                         hover:text-primary-600 transition-colors duration-[--duration-micro]
                         min-h-[var(--touch-min)] px-2
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              aria-label="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Reset
            </button>
            <button
              onClick={onClose}
              className="w-[var(--touch-min)] h-[var(--touch-min)] flex items-center justify-center rounded-md
                         hover:bg-surface-200 dark:hover:bg-input
                         transition-colors duration-[--duration-micro]
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              aria-label="Close filters"
            >
              <X className="w-5 h-5 text-primary-700 dark:text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Budget range */}
          <section>
            <h3 className="text-sm font-semibold text-primary-900 dark:text-foreground mb-3">
              Budget Range
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-primary-700 dark:text-soft-foreground">
                <span>${draft.budget[0].toLocaleString()}</span>
                <span>${draft.budget[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10000}
                step={100}
                value={draft.budget[1]}
                onChange={(e) => setDraft((prev) => ({ ...prev, budget: [prev.budget[0], parseInt(e.target.value)] }))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer
                           bg-surface-300 dark:bg-muted
                           accent-secondary-500"
                aria-label={`Maximum budget: $${draft.budget[1]}`}
              />
            </div>
          </section>

          {/* Regions */}
          <section>
            <h3 className="text-sm font-semibold text-primary-900 dark:text-foreground mb-3">
              Regions
            </h3>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((region) => {
                const isSelected = draft.regions.includes(region.id);
                return (
                  <button
                    key={region.id}
                    onClick={() => toggleRegion(region.id)}
                    className={cn(
                      'px-3 py-2 rounded-full text-sm font-medium transition-all duration-[--duration-short]',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                      'min-h-[var(--touch-min)]',
                      isSelected
                        ? 'bg-primary-500 dark:bg-primary-500 text-white'
                        : 'bg-surface-200 dark:bg-input text-primary-700 dark:text-muted-foreground hover:bg-surface-300 dark:hover:bg-muted'
                    )}
                    aria-pressed={isSelected}
                  >
                    {region.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Tags / interests */}
          <section>
            <h3 className="text-sm font-semibold text-primary-900 dark:text-foreground mb-3">
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {DISCOVER_TAGS.map((tag) => {
                const isSelected = draft.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-[--duration-short]',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                      'min-h-[var(--touch-min)]',
                      isSelected
                        ? 'bg-secondary-500 dark:bg-secondary-500 text-white'
                        : 'bg-surface-200 dark:bg-input text-primary-600 dark:text-soft-foreground hover:bg-surface-300 dark:hover:bg-muted'
                    )}
                    aria-pressed={isSelected}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Apply button */}
        <div className="px-4 py-4 border-t border-surface-300 dark:border-muted pb-[env(safe-area-inset-bottom)]">
          <button
            onClick={() => {
              onApply(draft);
              onClose();
            }}
            className="w-full py-3 rounded-lg text-base font-semibold
                       bg-secondary-500 dark:bg-secondary-500 text-white
                       hover:bg-secondary-600 dark:hover:bg-secondary-600
                       active:bg-secondary-700
                       transition-colors duration-[--duration-short]
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                       min-h-[var(--touch-preferred)]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
