'use client';

import { useState, useEffect, useCallback, useId } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { getSettingsForPersona, type UserSettings } from './data/mock-settings';
import { SettingsSection } from './components/SettingsSection';
import { ToggleRow } from './components/ToggleRow';
import { SelectRow } from './components/SelectRow';
import {
  Plane,
  Bell,
  Sparkles,
  Shield,
  Accessibility,
  User,
  Info,
  ExternalLink,
  Download,
  Trash2,
  Check,
  Users,
  Sun,
  Moon,
  Monitor,
  PenTool,
} from 'lucide-react';
import { useTheme, type ThemeMode } from '@/stores/useThemeStore';

type LoadingState = 'loading' | 'success' | 'error';

/* ───── Checkbox group helper ───── */
function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const groupId = useId();

  return (
    <fieldset className="py-1.5">
      <legend
        id={groupId}
        className="text-sm text-primary-800 dark:text-subtle-foreground mb-2"
      >
        {label}
      </legend>
      <div className="flex flex-wrap gap-2" role="group" aria-labelledby={groupId}>
        {options.map((opt) => {
          const isChecked = selected.includes(opt);
          return (
            <label
              key={opt}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5
                rounded-[var(--radius-md)] border text-xs font-medium
                cursor-pointer transition-colors duration-[--duration-micro]
                min-h-[var(--touch-min)]
                focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary-500
                ${
                  isChecked
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-surface-primary dark:text-primary-300'
                    : 'border-surface-300 dark:border-muted text-primary-600 dark:text-soft-foreground hover:bg-surface-100 dark:hover:bg-surface-elevated'
                }
              `}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={() => {
                  if (isChecked) {
                    onChange(selected.filter((s) => s !== opt));
                  } else {
                    onChange([...selected, opt]);
                  }
                }}
              />
              {isChecked && <Check className="w-3 h-3" aria-hidden="true" />}
              {opt}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ───── Main page ───── */
export default function SettingsPage() {
  const { persona, setPersona } = usePersona();
  const { mode: themeMode, setMode: setThemeMode, isDark } = useTheme();
  const [state, setState] = useState<LoadingState>('loading');
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setState('loading');
    const timer = setTimeout(() => {
      try {
        const data = getSettingsForPersona(persona);
        setSettings(data);
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [persona]);

  /* Generic updater that triggers save toast */
  const update = useCallback(
    <K extends keyof UserSettings>(
      section: K,
      key: keyof UserSettings[K],
      value: UserSettings[K][keyof UserSettings[K]]
    ) => {
      setSettings((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [section]: { ...prev[section], [key]: value },
        };
      });
      setShowToast(true);
    },
    []
  );

  /* Auto-hide toast */
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 2500);
    return () => clearTimeout(timer);
  }, [showToast]);

  /* ── Loading / Error ── */
  if (state === 'loading') return <PageSkeleton />;
  if (state === 'error' || !settings) {
    return (
      <ErrorState
        title="Unable to load settings"
        message="We're having trouble loading your preferences. Please try again."
        onRetry={() => setState('loading')}
      />
    );
  }

  return (
    <main
      role="main"
      aria-label="Settings and preferences"
      className="min-h-screen bg-background dark:bg-background pb-24"
    >
      {/* Save confirmation toast */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        <div
          className={`
            flex items-center gap-2 px-4 py-2.5
            rounded-[var(--radius-lg)] shadow-lg
            bg-success-600 dark:bg-success-500 text-white text-sm font-medium
            transition-all duration-300
            ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
        >
          <Check className="w-4 h-4" aria-hidden="true" />
          Preferences saved
        </div>
      </div>

      <div className="px-4 pt-4 space-y-6">
        {/* Page header */}
        <header>
          <h1 className="text-lg font-semibold text-primary-900 dark:text-foreground">
            Settings &amp; Preferences
          </h1>
          <p className="text-sm text-primary-700 dark:text-caption-foreground mt-1">
            Customize your AirThere experience
          </p>
        </header>

        {/* ── Appearance ── */}
        <SettingsSection
          id="appearance"
          title="Appearance"
          icon={<Sun className="w-5 h-5" />}
          defaultOpen
        >
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              {isDark ? (
                <Moon className="w-5 h-5 text-primary-500 dark:text-primary-400" aria-hidden="true" />
              ) : (
                <Sun className="w-5 h-5 text-secondary-500" aria-hidden="true" />
              )}
              <div>
                <p className="text-sm font-medium text-primary-900 dark:text-foreground">
                  {themeMode === 'wireframe' ? 'Wireframe' : isDark ? 'Dark' : 'Light'} Mode
                </p>
                <p className="text-xs text-primary-600 dark:text-faint-foreground">
                  {themeMode === 'system' ? 'Following system preference' : `Manually set to ${themeMode}`}
                </p>
              </div>
            </div>
            <button
              role="switch"
              aria-checked={isDark}
              aria-label={`Dark mode: ${isDark ? 'on' : 'off'}`}
              onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
              className={`
                relative inline-flex h-7 w-[52px] shrink-0 rounded-full border-2 border-transparent
                transition-colors duration-200 ease-in-out
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                ${isDark
                  ? 'bg-primary-600 dark:bg-primary-500'
                  : 'bg-surface-300 dark:bg-muted'
                }
              `}
            >
              <span
                aria-hidden="true"
                className={`
                  pointer-events-none inline-flex h-6 w-6 items-center justify-center
                  rounded-full bg-white shadow
                  transform transition duration-200 ease-in-out
                  ${isDark ? 'translate-x-[24px]' : 'translate-x-0'}
                `}
              >
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 text-primary-600" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-secondary-500" />
                )}
              </span>
            </button>
          </div>

          {/* Mode selector for System/Light/Dark */}
          <div className="flex gap-2 mt-2">
            {([
              { key: 'system' as ThemeMode, label: 'System', icon: Monitor },
              { key: 'light' as ThemeMode, label: 'Light', icon: Sun },
              { key: 'dark' as ThemeMode, label: 'Dark', icon: Moon },
              { key: 'wireframe' as ThemeMode, label: 'Wireframe', icon: PenTool },
            ]).map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.key}
                  onClick={() => setThemeMode(opt.key)}
                  className={`
                    flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5
                    rounded-[var(--radius-md)] border text-xs font-medium
                    transition-colors duration-[--duration-micro]
                    min-h-[var(--touch-min)]
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                    ${themeMode === opt.key
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-surface-primary dark:text-primary-300'
                      : 'border-surface-300 dark:border-muted text-primary-600 dark:text-soft-foreground hover:bg-surface-100 dark:hover:bg-surface-elevated'
                    }
                  `}
                  aria-pressed={themeMode === opt.key}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </SettingsSection>

        {/* ── 1. Travel Preferences ── */}
        <SettingsSection
          id="travel"
          title="Travel Preferences"
          icon={<Plane className="w-5 h-5" />}
          defaultOpen
        >
          <SelectRow
            label="Seat preference"
            value={settings.travel.seatPreference}
            options={[
              { label: 'Window', value: 'window' },
              { label: 'Aisle', value: 'aisle' },
              { label: 'Middle', value: 'middle' },
              { label: 'No preference', value: 'no-preference' },
            ]}
            onChange={(v) =>
              update('travel', 'seatPreference', v as UserSettings['travel']['seatPreference'])
            }
          />
          <SelectRow
            label="Cabin class"
            value={settings.travel.cabinClass}
            options={[
              { label: 'Economy', value: 'economy' },
              { label: 'Premium Economy', value: 'premium-economy' },
              { label: 'Business', value: 'business' },
              { label: 'First', value: 'first' },
            ]}
            onChange={(v) =>
              update('travel', 'cabinClass', v as UserSettings['travel']['cabinClass'])
            }
          />
          <SelectRow
            label="Meal preference"
            value={settings.travel.mealPreference}
            options={[
              { label: 'Standard', value: 'standard' },
              { label: 'Vegetarian', value: 'vegetarian' },
              { label: 'Vegan', value: 'vegan' },
              { label: 'Halal', value: 'halal' },
              { label: 'Kosher', value: 'kosher' },
              { label: 'Gluten-free', value: 'gluten-free' },
            ]}
            onChange={(v) => update('travel', 'mealPreference', v)}
          />
          <CheckboxGroup
            label="Dietary restrictions"
            options={['Nut allergy', 'Dairy-free', 'Low sodium']}
            selected={settings.travel.dietaryRestrictions}
            onChange={(v) => update('travel', 'dietaryRestrictions', v as never)}
          />
          <CheckboxGroup
            label="Preferred airlines"
            options={['United', 'American', 'Delta', 'British Airways', 'Singapore Airlines']}
            selected={settings.travel.preferredAirlines}
            onChange={(v) => update('travel', 'preferredAirlines', v as never)}
          />
        </SettingsSection>

        {/* ── 2. Notifications ── */}
        <SettingsSection
          id="notifications"
          title="Notifications"
          icon={<Bell className="w-5 h-5" />}
        >
          {/* Channels */}
          <p className="text-xs font-medium text-primary-600 dark:text-primary-400 pt-1">
            Channels
          </p>
          <ToggleRow
            label="Push notifications"
            checked={settings.notifications.pushEnabled}
            onChange={(v) => update('notifications', 'pushEnabled', v as never)}
          />
          <ToggleRow
            label="Email notifications"
            checked={settings.notifications.emailEnabled}
            onChange={(v) => update('notifications', 'emailEnabled', v as never)}
          />
          <ToggleRow
            label="SMS notifications"
            checked={settings.notifications.smsEnabled}
            onChange={(v) => update('notifications', 'smsEnabled', v as never)}
          />

          {/* Alert types */}
          <div className="border-t border-surface-300 dark:border-muted my-1" />
          <p className="text-xs font-medium text-primary-600 dark:text-primary-400">
            Alert types
          </p>
          <ToggleRow
            label="Flight alerts"
            description="Delays, cancellations, and status changes"
            checked={settings.notifications.flightAlerts}
            onChange={(v) => update('notifications', 'flightAlerts', v as never)}
          />
          <ToggleRow
            label="Gate changes"
            checked={settings.notifications.gateChanges}
            onChange={(v) => update('notifications', 'gateChanges', v as never)}
          />
          <ToggleRow
            label="Check-in reminders"
            checked={settings.notifications.checkInReminders}
            onChange={(v) => update('notifications', 'checkInReminders', v as never)}
          />
          <ToggleRow
            label="Price drop alerts"
            checked={settings.notifications.priceDrops}
            onChange={(v) => update('notifications', 'priceDrops', v as never)}
          />
          <ToggleRow
            label="Loyalty updates"
            checked={settings.notifications.loyaltyUpdates}
            onChange={(v) => update('notifications', 'loyaltyUpdates', v as never)}
          />
          <ToggleRow
            label="Marketing emails"
            checked={settings.notifications.marketingEmails}
            onChange={(v) => update('notifications', 'marketingEmails', v as never)}
          />

          {/* Quiet hours */}
          <div className="border-t border-surface-300 dark:border-muted my-1" />
          <p className="text-xs font-medium text-primary-600 dark:text-primary-400">
            Quiet hours
          </p>
          <SelectRow
            label="Start"
            value={settings.notifications.quietHoursStart}
            options={[
              { label: '8:00 PM', value: '20:00' },
              { label: '9:00 PM', value: '21:00' },
              { label: '10:00 PM', value: '22:00' },
              { label: '11:00 PM', value: '23:00' },
              { label: '12:00 AM', value: '00:00' },
            ]}
            onChange={(v) => update('notifications', 'quietHoursStart', v as never)}
          />
          <SelectRow
            label="End"
            value={settings.notifications.quietHoursEnd}
            options={[
              { label: '5:00 AM', value: '05:00' },
              { label: '6:00 AM', value: '06:00' },
              { label: '7:00 AM', value: '07:00' },
              { label: '8:00 AM', value: '08:00' },
              { label: '9:00 AM', value: '09:00' },
            ]}
            onChange={(v) => update('notifications', 'quietHoursEnd', v as never)}
          />
        </SettingsSection>

        {/* ── 3. AI & Automation ── */}
        <SettingsSection
          id="ai"
          title="AI & Automation"
          icon={<Sparkles className="w-5 h-5" />}
        >
          <ToggleRow
            label="AI Copilot"
            description="Enable smart travel assistance powered by AI"
            checked={settings.ai.copilotEnabled}
            onChange={(v) => update('ai', 'copilotEnabled', v as never)}
          />
          <SelectRow
            label="Autonomy level"
            description="How much should AI act on your behalf?"
            value={settings.ai.autonomyLevel}
            options={[
              { label: 'Manual -- I decide everything', value: 'manual' },
              { label: 'Copilot -- Suggest, I confirm', value: 'copilot' },
              { label: 'Curator -- Act within guardrails', value: 'curator' },
              { label: 'Autonomous -- Full delegation', value: 'autonomous' },
            ]}
            onChange={(v) =>
              update('ai', 'autonomyLevel', v as UserSettings['ai']['autonomyLevel'])
            }
          />
          <ToggleRow
            label="Auto-rebook on disruption"
            description="Automatically rebook when flights are cancelled or heavily delayed"
            checked={settings.ai.autoRebook}
            onChange={(v) => update('ai', 'autoRebook', v as never)}
          />
          <ToggleRow
            label="Auto check-in"
            description="Check in automatically 24 hours before departure"
            checked={settings.ai.autoCheckin}
            onChange={(v) => update('ai', 'autoCheckin', v as never)}
          />
          <ToggleRow
            label="Smart suggestions"
            description="Get personalized recommendations based on your travel history"
            checked={settings.ai.smartSuggestions}
            onChange={(v) => update('ai', 'smartSuggestions', v as never)}
          />
        </SettingsSection>

        {/* ── 4. Privacy & Data ── */}
        <SettingsSection
          id="privacy"
          title="Privacy & Data"
          icon={<Shield className="w-5 h-5" />}
        >
          <SelectRow
            label="Data sharing level"
            description="Controls what data is shared with partners"
            value={settings.privacy.dataSharing}
            options={[
              { label: 'Minimal -- Essential only', value: 'minimal' },
              { label: 'Standard -- Improve services', value: 'standard' },
              { label: 'Full -- Personalized experience', value: 'full' },
            ]}
            onChange={(v) =>
              update('privacy', 'dataSharing', v as UserSettings['privacy']['dataSharing'])
            }
          />
          <ToggleRow
            label="Personalization"
            description="Use your preferences to personalize your experience"
            checked={settings.privacy.personalization}
            onChange={(v) => update('privacy', 'personalization', v as never)}
          />
          <ToggleRow
            label="Location tracking"
            description="Enable real-time airport and destination features"
            checked={settings.privacy.locationTracking}
            onChange={(v) => update('privacy', 'locationTracking', v as never)}
          />
          <ToggleRow
            label="Analytics opt-in"
            description="Help us improve by sharing anonymous usage data"
            checked={settings.privacy.analyticsOptIn}
            onChange={(v) => update('privacy', 'analyticsOptIn', v as never)}
          />

          <div className="border-t border-surface-300 dark:border-muted my-1" />

          <button
            type="button"
            className="
              w-full flex items-center justify-center gap-2
              px-4 py-2.5 rounded-[var(--radius-md)]
              border border-primary-300 dark:border-primary-600
              text-primary-700 dark:text-primary-300
              text-sm font-medium
              hover:bg-primary-50 dark:hover:bg-surface-elevated
              transition-colors duration-[--duration-micro]
              min-h-[var(--touch-min)]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
            "
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Download My Data
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="
              w-full flex items-center justify-center gap-2
              px-4 py-2.5 rounded-[var(--radius-md)]
              border border-error-300 dark:border-error-600
              text-error-600 dark:text-error-400
              text-sm font-medium
              hover:bg-error-50 dark:hover:bg-surface-error
              transition-colors duration-[--duration-micro]
              min-h-[var(--touch-min)]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
            "
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            Delete Account
          </button>
        </SettingsSection>

        {/* ── 5. Accessibility ── */}
        <SettingsSection
          id="accessibility"
          title="Accessibility"
          icon={<Accessibility className="w-5 h-5" />}
        >
          <ToggleRow
            label="Reduce motion"
            description="Minimize animations throughout the app"
            checked={settings.accessibility.reduceMotion}
            onChange={(v) => update('accessibility', 'reduceMotion', v as never)}
          />
          <ToggleRow
            label="High contrast mode"
            description="Increase contrast for better visibility"
            checked={settings.accessibility.highContrast}
            onChange={(v) => update('accessibility', 'highContrast', v as never)}
          />
          <ToggleRow
            label="Large text"
            description="Increase base font size for easier reading"
            checked={settings.accessibility.largeText}
            onChange={(v) => update('accessibility', 'largeText', v as never)}
          />
          <ToggleRow
            label="Screen reader optimized"
            description="Enhanced markup and announcements for screen readers"
            checked={settings.accessibility.screenReaderOptimized}
            onChange={(v) => update('accessibility', 'screenReaderOptimized', v as never)}
          />
        </SettingsSection>

        {/* ── 6. Account ── */}
        <SettingsSection
          id="account"
          title="Account"
          icon={<User className="w-5 h-5" />}
        >
          {/* Display name */}
          <div className="py-1.5">
            <label
              htmlFor="settings-display-name"
              className="block text-xs font-medium text-primary-600 dark:text-primary-400 mb-1"
            >
              Display name
            </label>
            <input
              id="settings-display-name"
              type="text"
              value={settings.account.displayName}
              onChange={(e) => update('account', 'displayName', e.target.value as never)}
              className="w-full px-3 py-2.5 rounded-[var(--radius-md)] border border-surface-300 dark:border-muted bg-surface dark:bg-surface-elevated text-sm text-primary-800 dark:text-subtle-foreground focus:outline-none focus:ring-1 focus:ring-primary-300 dark:focus:ring-primary-600 min-h-[var(--touch-min)]"
            />
          </div>

          {/* Email (read-only) */}
          <div className="py-1.5">
            <label
              htmlFor="settings-email"
              className="block text-xs font-medium text-primary-600 dark:text-primary-400 mb-1"
            >
              Email
            </label>
            <input
              id="settings-email"
              type="email"
              value={settings.account.email}
              readOnly
              aria-readonly="true"
              className="w-full px-3 py-2.5 rounded-[var(--radius-md)] border border-surface-300 dark:border-muted bg-surface-100 dark:bg-background text-sm text-primary-700 dark:text-caption-foreground min-h-[var(--touch-min)] cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div className="py-1.5">
            <label
              htmlFor="settings-phone"
              className="block text-xs font-medium text-primary-600 dark:text-primary-400 mb-1"
            >
              Phone
            </label>
            <input
              id="settings-phone"
              type="tel"
              value={settings.account.phone}
              onChange={(e) => update('account', 'phone', e.target.value as never)}
              className="w-full px-3 py-2.5 rounded-[var(--radius-md)] border border-surface-300 dark:border-muted bg-surface dark:bg-surface-elevated text-sm text-primary-800 dark:text-subtle-foreground focus:outline-none focus:ring-1 focus:ring-primary-300 dark:focus:ring-primary-600 min-h-[var(--touch-min)]"
            />
          </div>

          <SelectRow
            label="Currency"
            value={settings.account.currency}
            options={[
              { label: 'USD ($)', value: 'USD' },
              { label: 'EUR (\u20AC)', value: 'EUR' },
              { label: 'GBP (\u00A3)', value: 'GBP' },
              { label: 'JPY (\u00A5)', value: 'JPY' },
              { label: 'AUD (A$)', value: 'AUD' },
            ]}
            onChange={(v) => update('account', 'currency', v as never)}
          />
          <SelectRow
            label="Language"
            value={settings.account.language}
            options={[
              { label: 'English', value: 'en' },
              { label: 'Spanish', value: 'es' },
              { label: 'French', value: 'fr' },
              { label: 'German', value: 'de' },
              { label: 'Japanese', value: 'ja' },
            ]}
            onChange={(v) => update('account', 'language', v as never)}
          />
        </SettingsSection>

        {/* ── 7. Demo Persona ── */}
        <SettingsSection
          id="persona"
          title="Demo Persona"
          icon={<Users className="w-5 h-5" />}
        >
          <p className="text-xs text-primary-700 dark:text-caption-foreground mb-3">
            Switch persona to preview different traveler experiences.
          </p>
          <div className="flex gap-2">
            {([
              { key: 'premium' as const, label: 'Premium', sub: 'Alexandra' },
              { key: 'business' as const, label: 'Business', sub: 'Marcus' },
              { key: 'family' as const, label: 'Family', sub: 'Chen' },
            ]).map((p) => (
              <button
                key={p.key}
                onClick={() => setPersona(p.key)}
                className={`
                  flex-1 px-3 py-2.5 rounded-[var(--radius-md)] border text-center
                  transition-colors duration-[--duration-micro]
                  min-h-[var(--touch-preferred)]
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                  ${persona === p.key
                    ? 'border-primary-500 bg-primary-50 dark:bg-surface-primary dark:border-primary-400'
                    : 'border-surface-300 dark:border-muted hover:bg-surface-100 dark:hover:bg-surface-elevated'
                  }
                `}
                aria-pressed={persona === p.key}
              >
                <span className={`block text-sm font-medium ${
                  persona === p.key
                    ? 'text-primary-700 dark:text-primary-300'
                    : 'text-primary-600 dark:text-soft-foreground'
                }`}>
                  {p.label}
                </span>
                <span className="block text-[10px] text-primary-600 dark:text-faint-foreground mt-0.5">
                  {p.sub}
                </span>
              </button>
            ))}
          </div>
        </SettingsSection>

        {/* ── 8. About ── */}
        <SettingsSection
          id="about"
          title="About"
          icon={<Info className="w-5 h-5" />}
        >
          <div className="py-1.5 flex items-center justify-between">
            <span className="text-sm text-primary-800 dark:text-subtle-foreground">
              Version
            </span>
            <span className="text-sm text-primary-700 dark:text-caption-foreground">
              AirThere v2.1.0
            </span>
          </div>

          <div className="border-t border-surface-300 dark:border-muted my-1" />

          <AboutLink label="Terms of Service" />
          <AboutLink label="Privacy Policy" />
          <AboutLink label="Contact Support" />
          <AboutLink label="Send Feedback" />

          <p className="text-xs text-center text-primary-600 dark:text-faint-foreground pt-3">
            Made with care for travelers
          </p>
        </SettingsSection>
      </div>

      {/* ── Delete Account Confirmation Dialog ── */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Delete account confirmation"
        >
          <div
            className="absolute inset-0 bg-overlay-dark"
            onClick={() => setShowDeleteConfirm(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-sm bg-background dark:bg-card rounded-t-2xl sm:rounded-2xl p-6 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-error-50 dark:bg-error-900 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-error-500" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-bold text-primary-900 dark:text-foreground text-center mb-2">
              Delete Account?
            </h2>
            <p className="text-sm text-primary-600 dark:text-soft-foreground text-center mb-6 leading-relaxed">
              This action is permanent and cannot be undone. All your data, bookings, and loyalty points will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-[var(--radius-md)] border border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-300 text-sm font-medium hover:bg-primary-50 dark:hover:bg-surface-elevated transition-colors min-h-[var(--touch-preferred)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-[var(--radius-md)] bg-error-600 hover:bg-error-700 dark:bg-error-500 dark:hover:bg-error-400 text-white text-sm font-semibold transition-colors min-h-[var(--touch-preferred)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ───── About link row ───── */
function AboutLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="
        flex items-center justify-between py-2.5
        text-sm text-primary-700 dark:text-muted-foreground
        hover:text-primary-900 dark:hover:text-foreground
        transition-colors duration-[--duration-micro]
        min-h-[var(--touch-min)]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
      "
    >
      {label}
      <ExternalLink className="w-4 h-4 text-primary-600 dark:text-faint-foreground" aria-hidden="true" />
    </a>
  );
}
