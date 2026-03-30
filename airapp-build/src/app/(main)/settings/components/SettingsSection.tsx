'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SettingsSectionProps {
  id: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function SettingsSection({
  id,
  title,
  icon,
  children,
  defaultOpen = false,
}: SettingsSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0
  );

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
      // After transition, remove fixed height so content can resize naturally
      const timer = setTimeout(() => setContentHeight(undefined), 300);
      return () => clearTimeout(timer);
    } else {
      // Set the current height first, then collapse to 0
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setContentHeight(0);
        });
      });
    }
  }, [isOpen]);

  const headerId = `${id}-header`;
  const panelId = `${id}-panel`;

  return (
    <section
      aria-labelledby={headerId}
      className="bg-surface dark:bg-card rounded-[var(--radius-lg)] border border-surface-300 dark:border-muted overflow-hidden"
    >
      <button
        id={headerId}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left min-h-[var(--touch-min)] transition-colors duration-[--duration-micro] hover:bg-surface-100 dark:hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <span className="flex-shrink-0 text-primary-600 dark:text-primary-400" aria-hidden="true">
          {icon}
        </span>
        <span className="flex-1 text-sm font-semibold text-primary-900 dark:text-foreground">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-primary-500 dark:text-caption-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        ref={contentRef}
        style={{
          height: contentHeight !== undefined ? `${contentHeight}px` : 'auto',
          overflow: 'hidden',
          transition: 'height 0.3s ease',
        }}
      >
        <div className="px-4 pb-4 pt-1 space-y-3">
          {children}
        </div>
      </div>
    </section>
  );
}
