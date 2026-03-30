'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import type { TripRecapData } from '../data/mock-recap';

interface MemoriesCarouselProps {
  memories: TripRecapData['memories'];
}

export function MemoriesCarousel({ memories }: MemoriesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, memories.length - 1));
      setCurrentIndex(clamped);
      itemRefs.current[clamped]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    },
    [memories.length],
  );

  const handlePrev = useCallback(() => scrollToIndex(currentIndex - 1), [currentIndex, scrollToIndex]);
  const handleNext = useCallback(() => scrollToIndex(currentIndex + 1), [currentIndex, scrollToIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext],
  );

  // Sync scroll position with index via IntersectionObserver
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setCurrentIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 },
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [memories.length]);

  if (memories.length === 0) {
    return (
      <section aria-labelledby="memories-heading" className="space-y-3">
        <h3
          id="memories-heading"
          className="text-lg font-semibold text-primary-900 dark:text-foreground"
        >
          Memories
        </h3>
        <div className="flex flex-col items-center justify-center py-10 bg-surface dark:bg-card rounded-[var(--radius-lg)] border border-surface-300 dark:border-muted">
          <Images className="w-8 h-8 text-primary-300 dark:text-faint-foreground mb-2" aria-hidden="true" />
          <p className="text-sm text-primary-500 dark:text-caption-foreground">
            No photos from this trip yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="memories-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h3
          id="memories-heading"
          className="text-lg font-semibold text-primary-900 dark:text-foreground"
        >
          Memories
        </h3>
        <button
          className="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-[--duration-micro] min-h-[var(--touch-min)] flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          View All
        </button>
      </div>

      {/* Carousel container */}
      <div
        className="relative"
        role="region"
        aria-roledescription="carousel"
        aria-label="Trip memories"
        onKeyDown={handleKeyDown}
      >
        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4"
          tabIndex={0}
          aria-live="polite"
        >
          {memories.map((memory, i) => (
            <div
              key={memory.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${memories.length}: ${memory.caption}`}
              className="flex-none w-64 snap-center opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className={`w-full h-40 rounded-[var(--radius-lg)] bg-gradient-to-br ${memory.gradient} flex items-end`}
              >
                <div className="w-full p-3 bg-gradient-to-t from-overlay-dark to-transparent rounded-b-[var(--radius-lg)]">
                  <p className="text-xs font-medium text-white truncate">{memory.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {memories.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous photo"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-surface/90 dark:bg-card/90 shadow-[var(--shadow-sm)] text-primary-700 dark:text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-opacity duration-[--duration-micro] min-h-[var(--touch-min)] min-w-[var(--touch-min)] -ml-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === memories.length - 1}
              aria-label="Next photo"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-surface/90 dark:bg-card/90 shadow-[var(--shadow-sm)] text-primary-700 dark:text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-opacity duration-[--duration-micro] min-h-[var(--touch-min)] min-w-[var(--touch-min)] -mr-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Counter dots */}
      {memories.length > 1 && (
        <div className="flex items-center justify-center gap-1.5" aria-hidden="true">
          {memories.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors duration-[--duration-micro] ${
                i === currentIndex
                  ? 'bg-primary-600 dark:bg-primary-400'
                  : 'bg-primary-200 dark:bg-muted'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-primary-500 dark:text-caption-foreground">
            {currentIndex + 1} of {memories.length}
          </span>
        </div>
      )}
    </section>
  );
}
