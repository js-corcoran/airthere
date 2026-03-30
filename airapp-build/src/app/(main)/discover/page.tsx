'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';
import { usePersona } from '@/stores/usePersonaStore';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes';
import { DiscoverTabs } from './components/DiscoverTabs';
import { DiscoverSearchBar } from './components/DiscoverSearchBar';
import { DiscoverDestinationCard } from './components/DiscoverDestinationCard';
import { DealAlertCard } from './components/DealAlertCard';
import { TrendingSection } from './components/TrendingSection';
import { FilterSheet } from './components/FilterSheet';
import { DiscoverSkeleton } from './components/DiscoverSkeleton';
import { DISCOVER_DESTINATIONS, DEAL_ALERTS, TRENDING_REGIONS } from './data/discover-data';
import { DiscoverTab, DiscoverFilters, DEFAULT_FILTERS, DiscoverDestination } from './types';

type LoadingState = 'loading' | 'success' | 'error';

const WISHLIST_KEY = 'airthere-wishlist';

function loadWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(WISHLIST_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveWishlist(ids: string[]) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  } catch {
    // localStorage unavailable
  }
}

export default function DiscoverPage() {
  const { persona } = usePersona();
  const router = useRouter();
  const [state, setState] = useState<LoadingState>('loading');
  const [activeTab, setActiveTab] = useState<DiscoverTab>('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DiscoverFilters>(DEFAULT_FILTERS);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Load data with simulated delay
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setWishlist(loadWishlist());
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id];
      saveWishlist(next);
      return next;
    });
  }, []);

  const hasActiveFilters = filters.regions.length > 0 || filters.tags.length > 0 || filters.budget[1] < 10000;

  // Filter destinations by persona + search + filters
  const filteredDestinations = useMemo(() => {
    let results = DISCOVER_DESTINATIONS.filter((d) => d.persona.includes(persona));

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (d) =>
          d.city.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.tags.some((t) => t.includes(q))
      );
    }

    if (filters.regions.length > 0) {
      results = results.filter((d) => filters.regions.includes(d.region));
    }

    if (filters.tags.length > 0) {
      results = results.filter((d) => d.tags.some((t) => filters.tags.includes(t)));
    }

    if (filters.budget[1] < 10000) {
      results = results.filter((d) => d.priceFrom <= filters.budget[1]);
    }

    return results;
  }, [persona, searchQuery, filters]);

  // Filter deals by persona
  const filteredDeals = useMemo(() => {
    return DEAL_ALERTS.filter((d) => d.persona.includes(persona)).sort((a, b) => {
      // Hot deals first
      const order = { hot: 0, warm: 1, cool: 2 };
      return order[a.popularity] - order[b.popularity];
    });
  }, [persona]);

  // Wishlist destinations
  const wishlistDestinations = useMemo(() => {
    return DISCOVER_DESTINATIONS.filter((d) => wishlist.includes(d.id));
  }, [wishlist]);

  // Persona-specific copy
  const sectionTitle = useMemo(() => {
    switch (persona) {
      case 'premium':
        return { heading: 'Curated Escapes', subtitle: 'Handpicked luxury destinations for you' };
      case 'business':
        return { heading: 'Smart Routes', subtitle: 'Efficient connections for your next trip' };
      case 'family':
        return { heading: 'Family Adventures', subtitle: 'Destinations the whole family will love' };
    }
  }, [persona]);

  if (state === 'loading') return <DiscoverSkeleton />;

  if (state === 'error') {
    return (
      <ErrorState
        message="We couldn't load destinations. Please try again."
        onRetry={() => {
          setState('loading');
          setTimeout(() => setState('success'), 600);
        }}
      />
    );
  }

  return (
    <div className="pb-4">
      {/* Search bar */}
      <DiscoverSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onFilterToggle={() => setFilterOpen(true)}
        hasActiveFilters={hasActiveFilters}
        isFilterOpen={filterOpen}
      />

      {/* Tabs */}
      <DiscoverTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        wishlistCount={wishlist.length}
      />

      {/* Tab content */}
      <div className="mt-1">
        {/* ─── Recommended Tab ─── */}
        {activeTab === 'recommended' && (
          <section
            id="recommended-panel"
            role="tabpanel"
            aria-labelledby="recommended-tab"
          >
            {filteredDestinations.length > 0 ? (
              <div className="px-4 pt-3">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-primary-900 dark:text-foreground">
                    {sectionTitle.heading}
                  </h2>
                  <p className="text-xs text-primary-700 dark:text-caption-foreground mt-0.5">
                    {sectionTitle.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredDestinations.map((dest, i) => (
                    <div key={dest.id} className={cn('opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]', i === 0 && 'col-span-2')} style={{ animationDelay: `${i * 60}ms` }}>
                      <DiscoverDestinationCard
                        destination={dest}
                        persona={persona}
                        isSaved={wishlist.includes(dest.id)}
                        onToggleSave={toggleWishlist}
                        variant={i === 0 ? 'featured' : 'grid'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                icon="🔍"
                title="No destinations found"
                description={
                  hasActiveFilters
                    ? 'Try adjusting your filters or search terms.'
                    : 'No destinations match your search.'
                }
                action={
                  hasActiveFilters
                    ? {
                        label: 'Reset Filters',
                        onClick: () => {
                          setFilters(DEFAULT_FILTERS);
                          setSearchQuery('');
                        },
                      }
                    : undefined
                }
              />
            )}
          </section>
        )}

        {/* ─── Trending Tab ─── */}
        {activeTab === 'trending' && (
          <section
            id="trending-panel"
            role="tabpanel"
            aria-labelledby="trending-tab"
            className="pt-3"
          >
            <TrendingSection regions={TRENDING_REGIONS} persona={persona} />
          </section>
        )}

        {/* ─── Deals Tab ─── */}
        {activeTab === 'deals' && (
          <section
            id="deals-panel"
            role="tabpanel"
            aria-labelledby="deals-tab"
          >
            {filteredDeals.length > 0 ? (
              <div className="px-4 pt-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-primary-900 dark:text-foreground">
                      {persona === 'premium'
                        ? 'Premium Deals'
                        : persona === 'business'
                          ? 'Business Class Offers'
                          : 'Family Deals'}
                    </h2>
                    <p className="text-xs text-primary-700 dark:text-caption-foreground mt-0.5">
                      {filteredDeals.length} deals available · prices updated live
                    </p>
                  </div>
                </div>

                {/* Deal alert banner for family */}
                {persona === 'family' && (
                  <div className="p-3 rounded-lg bg-success-50 dark:bg-surface-success border border-success-200 dark:border-success">
                    <p className="text-xs text-success-700 dark:text-success-400 font-medium">
                      Prices shown are per person. Multiply by your family size for total cost.
                    </p>
                  </div>
                )}

                {filteredDeals.map((deal, index) => (
                  <div key={deal.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${index * 60}ms` }}>
                    <DealAlertCard deal={deal} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="💰"
                title="No deals right now"
                description="We're always searching for the best prices. Check back soon!"
                action={{
                  label: 'Search Flights',
                  onClick: () => router.push(ROUTES.SEARCH),
                }}
              />
            )}
          </section>
        )}

        {/* ─── Wishlist Tab ─── */}
        {activeTab === 'wishlist' && (
          <section
            id="wishlist-panel"
            role="tabpanel"
            aria-labelledby="wishlist-tab"
          >
            {wishlistDestinations.length > 0 ? (
              <div className="px-4 pt-3">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-primary-900 dark:text-foreground">
                    Saved Destinations
                  </h2>
                  <p className="text-xs text-primary-700 dark:text-caption-foreground mt-0.5">
                    {wishlistDestinations.length} destination{wishlistDestinations.length !== 1 ? 's' : ''} saved
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {wishlistDestinations.map((dest, index) => (
                    <div key={dest.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${index * 60}ms` }}>
                      <DiscoverDestinationCard
                        destination={dest}
                        persona={persona}
                        isSaved={true}
                        onToggleSave={toggleWishlist}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                icon="❤️"
                title="No saved destinations"
                description="Tap the heart icon on any destination to save it for later."
                action={{
                  label: 'Explore Destinations',
                  onClick: () => setActiveTab('recommended'),
                }}
              />
            )}
          </section>
        )}
      </div>

      {/* Filter sheet */}
      <FilterSheet
        isOpen={filterOpen}
        filters={filters}
        onApply={setFilters}
        onClose={() => setFilterOpen(false)}
      />
    </div>
  );
}
