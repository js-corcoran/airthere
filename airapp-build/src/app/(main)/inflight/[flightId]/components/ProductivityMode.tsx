'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';
import { ProductivityData } from '@/lib/types/inflight';
import { Wifi, Mail, FileText, StickyNote, Target, Play, Pause, RotateCcw, WifiOff } from 'lucide-react';

interface ProductivityModeProps {
  data: ProductivityData;
  timeRemainingMinutes: number;
}

const TOOLS = [
  { icon: Mail, label: 'Email', requiresWifi: true },
  { icon: FileText, label: 'Docs', requiresWifi: false },
  { icon: StickyNote, label: 'Notes', requiresWifi: false },
  { icon: Target, label: 'Focus', requiresWifi: false },
];

export function ProductivityMode({ data, timeRemainingMinutes }: ProductivityModeProps) {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [timer, setTimer] = useState(data.focusSessionMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTimer = useCallback(() => {
    setTimer(data.focusSessionMinutes * 60);
    setIsRunning(false);
  }, [data.focusSessionMinutes]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const hoursRemaining = Math.floor(timeRemainingMinutes / 60);
  const minsRemaining = timeRemainingMinutes % 60;

  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm p-4',
        'bg-info-50 border-info-200',
        'dark:bg-card dark:border-info'
      )}
      aria-label="Productivity mode"
    >
      <h2 className="text-base font-semibold text-primary-900 dark:text-foreground mb-3">
        Productivity
      </h2>

      {/* WiFi status */}
      <div className="flex items-center gap-2 mb-4">
        {data.wifiConnected ? (
          <>
            <Wifi className="w-4 h-4 text-success-500 dark:text-success-400" aria-hidden="true" />
            <span className="text-sm font-medium text-success-700 dark:text-success-300">
              WiFi Connected
            </span>
            <span className="text-xs text-primary-600 dark:text-faint-foreground">
              ({data.wifiBandwidth} Mbps)
            </span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4 text-error-500" aria-hidden="true" />
            <span className="text-sm font-medium text-error-700 dark:text-error-300">
              WiFi Disconnected
            </span>
          </>
        )}
      </div>

      {/* Quick tools */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {TOOLS.map(({ icon: Icon, label, requiresWifi }, i) => {
          const disabled = requiresWifi && !data.wifiConnected;
          return (
            <button
              key={label}
              disabled={disabled}
              style={{ animationDelay: `${i * 60}ms` }}
              className={cn(
                'flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]',
                'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]',
                disabled
                  ? 'opacity-40 cursor-not-allowed bg-surface-200 dark:bg-surface-elevated'
                  : 'bg-background dark:bg-background hover:bg-primary-50 dark:hover:bg-surface-primary'
              )}
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              <span className="text-[10px] font-medium text-primary-700 dark:text-muted-foreground">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Focus timer */}
      <div
        className={cn(
          'rounded-lg p-4',
          isFocusMode
            ? 'bg-primary-500 dark:bg-primary-600'
            : 'bg-primary-100 dark:bg-surface-primary'
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={cn(
              'text-sm font-medium',
              isFocusMode
                ? 'text-white'
                : 'text-primary-800 dark:text-subtle-foreground'
            )}
          >
            Focus Session
          </span>
          <button
            onClick={() => {
              setIsFocusMode(!isFocusMode);
              if (!isFocusMode) setIsRunning(true);
              else {
                setIsRunning(false);
                resetTimer();
              }
            }}
            className={cn(
              'text-xs px-3 py-1 rounded-full font-medium',
              'transition-colors duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)] flex items-center',
              isFocusMode
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            )}
          >
            {isFocusMode ? 'Exit Focus' : 'Start Focus'}
          </button>
        </div>

        {/* Timer display */}
        <div className="text-center my-3">
          <span
            className={cn(
              'text-4xl font-bold font-mono',
              isFocusMode
                ? 'text-white'
                : 'text-primary-900 dark:text-foreground'
            )}
          >
            {formatTimer(timer)}
          </span>
        </div>

        {/* Controls */}
        {isFocusMode && (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={cn(
                'p-2 rounded-full bg-white/20 hover:bg-white/30',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                'min-w-[var(--touch-min)] min-h-[var(--touch-min)] flex items-center justify-center'
              )}
              aria-label={isRunning ? 'Pause timer' : 'Resume timer'}
            >
              {isRunning ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={resetTimer}
              className={cn(
                'p-2 rounded-full bg-white/20 hover:bg-white/30',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                'min-w-[var(--touch-min)] min-h-[var(--touch-min)] flex items-center justify-center'
              )}
              aria-label="Reset timer"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        <p
          className={cn(
            'text-xs text-center mt-2',
            isFocusMode
              ? 'text-white/70'
              : 'text-primary-600 dark:text-faint-foreground'
          )}
        >
          Productive time remaining: {hoursRemaining}h {minsRemaining}m
        </p>
      </div>
    </section>
  );
}
