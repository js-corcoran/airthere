'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils/cn';
import { EntertainmentItem } from '@/lib/types/inflight';
import { Film, Tv, Gamepad2, Music, Search, Star, Clock, Sparkles } from 'lucide-react';

interface EntertainmentHubProps {
  items: EntertainmentItem[];
  flightDurationMinutes: number;
}

type TabId = 'recommended' | 'movies' | 'shows' | 'games' | 'music';

const TABS: Array<{ id: TabId; label: string; icon: typeof Film }> = [
  { id: 'recommended', label: 'For You', icon: Sparkles },
  { id: 'movies', label: 'Movies', icon: Film },
  { id: 'shows', label: 'TV', icon: Tv },
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'music', label: 'Music', icon: Music },
];

export function EntertainmentHub({ items, flightDurationMinutes }: EntertainmentHubProps) {
  const [activeTab, setActiveTab] = useState<TabId>('recommended');
  const [selectedItem, setSelectedItem] = useState<EntertainmentItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let result = items;

    if (activeTab !== 'recommended') {
      const typeMap: Record<TabId, string> = {
        recommended: '',
        movies: 'movie',
        shows: 'show',
        games: 'game',
        music: 'music',
      };
      result = result.filter((i) => i.type === typeMap[activeTab] || i.type === 'podcast');
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) => i.title.toLowerCase().includes(q) || i.genre.some((g) => g.toLowerCase().includes(q))
      );
    }

    return result;
  }, [items, activeTab, searchQuery]);

  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm overflow-hidden',
        'bg-surface dark:bg-card',
        'border-surface-300 dark:border-muted'
      )}
      aria-label="In-flight entertainment"
    >
      {/* Header */}
      <div className="p-4 pb-0">
        <h2 className="text-base font-semibold text-primary-900 dark:text-foreground mb-3">
          Entertainment
        </h2>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-600 dark:text-faint-foreground" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, shows, games..."
            className={cn(
              'w-full pl-9 pr-3 py-2 text-sm rounded-md border',
              'bg-background border-surface-300',
              'dark:bg-background dark:border-muted',
              'text-primary-900 dark:text-foreground',
              'placeholder:text-primary-500 dark:placeholder:text-faint-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              'min-h-[var(--touch-min)]'
            )}
            aria-label="Search entertainment"
          />
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 px-4 pb-3 overflow-x-auto"
        role="tablist"
        aria-label="Entertainment categories"
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            onClick={() => setActiveTab(id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap',
              'transition-colors duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)]',
              activeTab === id
                ? 'bg-primary-500 text-white dark:bg-primary-400'
                : 'bg-surface-200 text-primary-700 dark:bg-input dark:text-muted-foreground hover:bg-surface-300 dark:hover:bg-muted'
            )}
          >
            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {/* Content grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 pt-0"
        role="tabpanel"
        aria-label={`${activeTab} content`}
      >
        {filteredItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={cn(
              'text-left rounded-lg overflow-hidden',
              'bg-surface-200 dark:bg-surface-elevated',
              'hover:shadow-md hover:-translate-y-0.5 transition-all duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]'
            )}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Poster placeholder */}
            <div
              className={cn(
                'aspect-[3/4] flex items-center justify-center',
                'bg-gradient-to-br from-primary-200 to-primary-100',
                'dark:from-surface-primary dark:to-surface-primary'
              )}
            >
              {item.type === 'movie' && <Film className="w-8 h-8 text-primary-500 dark:text-primary-400" />}
              {item.type === 'show' && <Tv className="w-8 h-8 text-primary-500 dark:text-primary-400" />}
              {item.type === 'game' && <Gamepad2 className="w-8 h-8 text-primary-500 dark:text-primary-400" />}
              {(item.type === 'music' || item.type === 'podcast') && <Music className="w-8 h-8 text-primary-500 dark:text-primary-400" />}
              {item.isNew && (
                <span className="absolute top-1.5 left-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-secondary-500 text-white font-medium">
                  NEW
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-2">
              <p className="text-xs font-semibold text-primary-900 dark:text-foreground truncate">
                {item.title}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Star className="w-3 h-3 text-secondary-500" aria-hidden="true" />
                <span className="text-[10px] text-primary-700 dark:text-caption-foreground">
                  {item.rating}
                </span>
                <Clock className="w-3 h-3 text-primary-600 dark:text-faint-foreground ml-1" aria-hidden="true" />
                <span className="text-[10px] text-primary-700 dark:text-caption-foreground">
                  {item.runtime}m
                </span>
              </div>
              <p className="text-[10px] text-primary-600 dark:text-faint-foreground mt-0.5 truncate">
                {item.genre.join(', ')}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Selected item detail */}
      {selectedItem && (
        <div
          className={cn(
            'fixed inset-0 z-50 flex items-end',
            'bg-overlay-dark'
          )}
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          <div
            className={cn(
              'w-full max-h-[70vh] overflow-y-auto rounded-t-2xl p-5',
              'bg-background dark:bg-background',
              'animate-[slideUp_var(--duration-short)_var(--ease-in-out)]'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-surface-300 dark:bg-muted rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-bold text-primary-900 dark:text-foreground mb-1">
              {selectedItem.title}
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-secondary-500" aria-hidden="true" />
                <span className="text-sm font-medium text-primary-700 dark:text-muted-foreground">
                  {selectedItem.rating}/10
                </span>
              </div>
              <span className="text-sm text-primary-600 dark:text-faint-foreground">
                {selectedItem.runtime} min
              </span>
              {selectedItem.ageRestriction && (
                <span className="text-xs px-2 py-0.5 rounded-full border border-primary-300 text-primary-600 dark:border-primary dark:text-caption-foreground">
                  {selectedItem.ageRestriction}
                </span>
              )}
            </div>
            <p className="text-sm text-primary-700 dark:text-muted-foreground leading-relaxed mb-4">
              {selectedItem.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {selectedItem.genre.map((g) => (
                <span
                  key={g}
                  className="text-xs px-2.5 py-1 rounded-full bg-surface-200 text-primary-700 dark:bg-input dark:text-muted-foreground"
                >
                  {g}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className={cn(
                'w-full py-3 text-sm font-medium rounded-md',
                'bg-primary-500 text-white',
                'hover:bg-primary-600 active:bg-primary-700',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]'
              )}
            >
              {selectedItem.type === 'game' ? 'Play Now' : 'Watch Now'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
