'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { cn } from '@/lib/utils/cn';
import { Plane, List, Map } from 'lucide-react';
import { getLoungesForPersona, getAccessibleCount, getAccessReason, Lounge } from './data/mock-lounges';
import { AccessSummary } from './components/AccessSummary';
import { LoungeCard } from './components/LoungeCard';
import { LoungeDetail } from './components/LoungeDetail';

type LoadingState = 'loading' | 'success' | 'error';
type ViewMode = 'list' | 'map';

export default function LoungeFinderPage() {
  const { persona } = usePersona();
  const [state, setState] = useState<LoadingState>('loading');
  const [lounges, setLounges] = useState<Lounge[]>([]);
  const [accessibleCount, setAccessibleCount] = useState(0);
  const [accessReason, setAccessReason] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showAccessibleOnly, setShowAccessibleOnly] = useState(false);
  const [selectedLounge, setSelectedLounge] = useState<Lounge | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setLounges(getLoungesForPersona(persona));
        setAccessibleCount(getAccessibleCount(persona));
        setAccessReason(getAccessReason(persona));
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [persona]);

  const filteredLounges = useMemo(() => {
    if (showAccessibleOnly) {
      return lounges.filter((l) => l.access.type === 'included');
    }
    return lounges;
  }, [lounges, showAccessibleOnly]);

  const handleSelectLounge = useCallback((lounge: Lounge) => {
    setSelectedLounge(lounge);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedLounge(null);
  }, []);

  if (state === 'loading') return <PageSkeleton />;

  if (state === 'error') {
    return (
      <ErrorState
        message="We couldn't load lounge information. Please try again."
        onRetry={() => {
          setState('loading');
          setTimeout(() => {
            setLounges(getLoungesForPersona(persona));
            setAccessibleCount(getAccessibleCount(persona));
            setAccessReason(getAccessReason(persona));
            setState('success');
          }, 600);
        }}
      />
    );
  }

  return (
    <main
      role="main"
      aria-label="Airport Lounge Finder"
      className="min-h-screen bg-background dark:bg-[oklch(12%_0.002_50)] pb-24"
    >
      {/* Header */}
      <header className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Plane
            className="w-5 h-5 text-primary-600 dark:text-primary-400"
            aria-hidden="true"
          />
          <h1 className="text-xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            Airport Lounges
          </h1>
        </div>
        <p className="text-sm text-primary-500 dark:text-[oklch(70%_0.008_50)]">
          SFO — San Francisco International, Terminal 3
        </p>
      </header>

      {/* Access summary sticky bar */}
      <AccessSummary accessibleCount={accessibleCount} reason={accessReason} />

      <div className="px-4 pt-4 space-y-6">
        {/* View toggle + filter */}
        <div className="flex items-center justify-between">
          {/* View toggle */}
          <div
            className={cn(
              'inline-flex rounded-[var(--radius-md)] overflow-hidden',
              'border border-surface-300 dark:border-[oklch(32%_0.008_50)]'
            )}
            role="radiogroup"
            aria-label="View mode"
          >
            <button
              role="radio"
              aria-checked={viewMode === 'list'}
              onClick={() => setViewMode('list')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 text-xs font-medium',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]',
                viewMode === 'list'
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-surface dark:bg-[oklch(18%_0.003_50)] text-primary-700 dark:text-[oklch(85%_0.005_50)]'
              )}
            >
              <List className="w-3.5 h-3.5" aria-hidden="true" />
              List
            </button>
            <button
              role="radio"
              aria-checked={viewMode === 'map'}
              onClick={() => setViewMode('map')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 text-xs font-medium',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]',
                viewMode === 'map'
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-surface dark:bg-[oklch(18%_0.003_50)] text-primary-700 dark:text-[oklch(85%_0.005_50)]'
              )}
            >
              <Map className="w-3.5 h-3.5" aria-hidden="true" />
              Map
            </button>
          </div>

          {/* Accessible-only toggle */}
          <label className="flex items-center gap-2 cursor-pointer min-h-[var(--touch-min)]">
            <span className="text-xs font-medium text-primary-700 dark:text-[oklch(85%_0.005_50)]">
              Accessible only
            </span>
            <button
              role="switch"
              aria-checked={showAccessibleOnly}
              onClick={() => setShowAccessibleOnly((prev) => !prev)}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                showAccessibleOnly
                  ? 'bg-primary-600 dark:bg-primary-500'
                  : 'bg-surface-300 dark:bg-[oklch(32%_0.008_50)]'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-[--duration-micro]',
                  'shadow-[var(--shadow-sm)]',
                  showAccessibleOnly ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          </label>
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <section aria-label="Lounge list" className="space-y-4">
            {filteredLounges.length > 0 ? (
              filteredLounges.map((lounge, i) => (
                <div
                  key={lounge.id}
                  className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <LoungeCard
                    lounge={lounge}
                    onSelect={handleSelectLounge}
                  />
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm text-primary-500 dark:text-[oklch(70%_0.008_50)]">
                  No lounges match your filter. Try showing all lounges.
                </p>
                <button
                  onClick={() => setShowAccessibleOnly(false)}
                  className={cn(
                    'mt-3 px-4 py-2 text-sm font-medium rounded-[var(--radius-md)]',
                    'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400',
                    'text-white',
                    'transition-colors duration-[--duration-micro]',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    'min-h-[var(--touch-min)]'
                  )}
                >
                  Show All Lounges
                </button>
              </div>
            )}
          </section>
        ) : (
          /* Map placeholder terminal diagram */
          <section aria-label="Terminal map" className="space-y-3">
            <div
              className={cn(
                'relative rounded-[var(--radius-lg)] overflow-hidden',
                'bg-surface dark:bg-[oklch(18%_0.003_50)]',
                'border border-surface-300 dark:border-[oklch(32%_0.008_50)]',
                'shadow-[var(--shadow-sm)]',
                'h-[400px]'
              )}
            >
              {/* Terminal outline */}
              <svg
                viewBox="0 0 400 360"
                className="w-full h-full"
                role="img"
                aria-label="SFO Terminal 3 map showing lounge locations"
              >
                {/* Terminal shape */}
                <rect
                  x="30"
                  y="40"
                  width="340"
                  height="280"
                  rx="16"
                  className="fill-surface-100 dark:fill-[oklch(22%_0.003_50)] stroke-surface-300 dark:stroke-[oklch(32%_0.008_50)]"
                  strokeWidth="2"
                />

                {/* Terminal label */}
                <text
                  x="200"
                  y="70"
                  textAnchor="middle"
                  className="fill-primary-400 dark:fill-[oklch(50%_0.005_50)] text-xs"
                  fontSize="12"
                  fontWeight="600"
                >
                  SFO TERMINAL 3
                </text>

                {/* Gate areas */}
                <rect
                  x="50"
                  y="85"
                  width="120"
                  height="60"
                  rx="8"
                  className="fill-surface-200 dark:fill-[oklch(25%_0.005_50)] stroke-surface-300 dark:stroke-[oklch(32%_0.008_50)]"
                  strokeWidth="1"
                />
                <text
                  x="110"
                  y="120"
                  textAnchor="middle"
                  className="fill-primary-500 dark:fill-[oklch(60%_0.005_50)]"
                  fontSize="10"
                >
                  Gates B1-B8
                </text>

                <rect
                  x="230"
                  y="85"
                  width="120"
                  height="60"
                  rx="8"
                  className="fill-surface-200 dark:fill-[oklch(25%_0.005_50)] stroke-surface-300 dark:stroke-[oklch(32%_0.008_50)]"
                  strokeWidth="1"
                />
                <text
                  x="290"
                  y="120"
                  textAnchor="middle"
                  className="fill-primary-500 dark:fill-[oklch(60%_0.005_50)]"
                  fontSize="10"
                >
                  Gates C1-C16
                </text>

                {/* Concourse */}
                <rect
                  x="50"
                  y="165"
                  width="300"
                  height="30"
                  rx="4"
                  className="fill-surface-200/50 dark:fill-[oklch(28%_0.003_50)]"
                />
                <text
                  x="200"
                  y="185"
                  textAnchor="middle"
                  className="fill-primary-400 dark:fill-[oklch(50%_0.005_50)]"
                  fontSize="9"
                >
                  Main Concourse
                </text>

                {/* Lounge markers */}
                {filteredLounges
                  .filter((l) => l.terminal === 'Terminal 3')
                  .map((l, i) => {
                    const positions = [
                      { cx: 270, cy: 110, label: 'C12' },
                      { cx: 320, cy: 110, label: 'E2' },
                      { cx: 130, cy: 240, label: 'C8' },
                    ];
                    const pos = positions[i] || { cx: 200 + i * 40, cy: 260, label: '' };
                    const color =
                      l.access.type === 'included'
                        ? 'fill-success-500'
                        : l.access.type === 'upgrade'
                          ? 'fill-info-500'
                          : 'fill-primary-300 dark:fill-[oklch(40%_0.005_50)]';

                    return (
                      <g key={l.id}>
                        <circle
                          cx={pos.cx}
                          cy={pos.cy}
                          r="12"
                          className={cn(color, 'cursor-pointer')}
                          onClick={() => handleSelectLounge(l)}
                        />
                        <circle
                          cx={pos.cx}
                          cy={pos.cy}
                          r="12"
                          className="fill-transparent stroke-white dark:stroke-[oklch(95%_0.002_50)]"
                          strokeWidth="2"
                        />
                        <text
                          x={pos.cx}
                          y={pos.cy + 3.5}
                          textAnchor="middle"
                          className="fill-white"
                          fontSize="7"
                          fontWeight="700"
                        >
                          L
                        </text>
                        <text
                          x={pos.cx}
                          y={pos.cy + 26}
                          textAnchor="middle"
                          className="fill-primary-700 dark:fill-[oklch(85%_0.005_50)]"
                          fontSize="8"
                          fontWeight="500"
                        >
                          {l.name.length > 14 ? l.name.slice(0, 14) + '...' : l.name}
                        </text>
                      </g>
                    );
                  })}

                {/* Other terminal lounges - reference dots */}
                <rect
                  x="50"
                  y="215"
                  width="300"
                  height="90"
                  rx="8"
                  className="fill-surface-200/30 dark:fill-[oklch(20%_0.003_50)] stroke-surface-300 dark:stroke-[oklch(32%_0.008_50)]"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />
                <text
                  x="200"
                  y="240"
                  textAnchor="middle"
                  className="fill-primary-400 dark:fill-[oklch(50%_0.005_50)]"
                  fontSize="10"
                >
                  Other Terminals
                </text>

                {filteredLounges
                  .filter((l) => l.terminal !== 'Terminal 3')
                  .map((l, i) => {
                    const cx = 100 + i * 80;
                    const cy = 275;
                    const color =
                      l.access.type === 'included'
                        ? 'fill-success-500'
                        : l.access.type === 'upgrade'
                          ? 'fill-info-500'
                          : 'fill-primary-300 dark:fill-[oklch(40%_0.005_50)]';
                    return (
                      <g key={l.id}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r="10"
                          className={cn(color, 'cursor-pointer opacity-70')}
                          onClick={() => handleSelectLounge(l)}
                        />
                        <circle
                          cx={cx}
                          cy={cy}
                          r="10"
                          className="fill-transparent stroke-white/70"
                          strokeWidth="1.5"
                        />
                        <text
                          x={cx}
                          y={cy + 3}
                          textAnchor="middle"
                          className="fill-white"
                          fontSize="6"
                          fontWeight="700"
                        >
                          L
                        </text>
                        <text
                          x={cx}
                          y={cy + 22}
                          textAnchor="middle"
                          className="fill-primary-600 dark:fill-[oklch(75%_0.005_50)]"
                          fontSize="7"
                          fontWeight="500"
                        >
                          {l.name.length > 16 ? l.name.slice(0, 16) + '...' : l.name}
                        </text>
                      </g>
                    );
                  })}

                {/* Legend */}
                <g transform="translate(50, 330)">
                  <circle cx="6" cy="0" r="4" className="fill-success-500" />
                  <text x="14" y="3" className="fill-primary-500 dark:fill-[oklch(60%_0.005_50)]" fontSize="8">
                    Included
                  </text>
                  <circle cx="76" cy="0" r="4" className="fill-info-500" />
                  <text x="84" y="3" className="fill-primary-500 dark:fill-[oklch(60%_0.005_50)]" fontSize="8">
                    Upgrade
                  </text>
                  <circle cx="146" cy="0" r="4" className="fill-primary-300 dark:fill-[oklch(40%_0.005_50)]" />
                  <text
                    x="154"
                    y="3"
                    className="fill-primary-500 dark:fill-[oklch(60%_0.005_50)]"
                    fontSize="8"
                  >
                    Not available
                  </text>
                </g>
              </svg>
            </div>

            {/* List below map for quick tap */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-primary-700 dark:text-[oklch(85%_0.005_50)] uppercase tracking-wider">
                Tap a lounge for details
              </h3>
              {filteredLounges.map((lounge) => (
                <button
                  key={lounge.id}
                  onClick={() => handleSelectLounge(lounge)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-[var(--radius-md)]',
                    'bg-surface dark:bg-[oklch(18%_0.003_50)]',
                    'border border-surface-300 dark:border-[oklch(32%_0.008_50)]',
                    'hover:bg-surface-200 dark:hover:bg-[oklch(22%_0.003_50)]',
                    'transition-colors duration-[--duration-micro]',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    'min-h-[var(--touch-min)]',
                    'text-left'
                  )}
                  aria-label={`${lounge.name}, ${lounge.terminal}. ${lounge.access.type === 'included' ? 'Access included' : lounge.access.type === 'upgrade' ? 'Upgrade available' : 'Not available'}`}
                >
                  <div>
                    <span className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                      {lounge.name}
                    </span>
                    <span className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)] ml-2">
                      {lounge.terminal}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'w-2.5 h-2.5 rounded-full flex-shrink-0',
                      lounge.access.type === 'included'
                        ? 'bg-success-500'
                        : lounge.access.type === 'upgrade'
                          ? 'bg-info-500'
                          : 'bg-primary-300 dark:bg-[oklch(40%_0.005_50)]'
                    )}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lounge detail bottom sheet */}
      {selectedLounge && (
        <LoungeDetail lounge={selectedLounge} onClose={handleCloseDetail} />
      )}
    </main>
  );
}
