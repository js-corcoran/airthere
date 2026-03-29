'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { usePersona } from '@/stores/usePersonaStore';
import { getMockUserForPersona } from '@/lib/mock-data/users';
import { PersonaType } from '@/lib/types/user';
import { ROUTES } from '@/lib/constants/routes';

import { OnboardingProgress } from './components/OnboardingProgress';
import { WelcomeStep } from './components/WelcomeStep';
import { ValuePropSlides } from './components/ValuePropSlides';
import { PersonaSelector } from './components/PersonaSelector';
import { PreferencesForm } from './components/PreferencesForm';

type OnboardingStep = 0 | 1 | 2 | 3;

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>(0);
  const { setPersona, setUser, setOnboarded } = usePersona();
  const router = useRouter();

  const handleGetStarted = useCallback(() => {
    setStep(1);
  }, []);

  const handleSkip = useCallback(() => {
    setPersona('business');
    setUser(getMockUserForPersona('business'));
    setOnboarded(true);
    router.push(ROUTES.SEARCH);
  }, [setPersona, setUser, setOnboarded, router]);

  const handleValuePropComplete = useCallback(() => {
    setStep(2);
  }, []);

  const handlePersonaSelect = useCallback(
    (persona: PersonaType) => {
      setPersona(persona);
      setUser(getMockUserForPersona(persona));
      setStep(3);
    },
    [setPersona, setUser]
  );

  const handlePreferencesComplete = useCallback(() => {
    setOnboarded(true);
    router.push(ROUTES.HOME);
  }, [setOnboarded, router]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <OnboardingProgress currentStep={step} totalSteps={3} />

      {step === 0 && (
        <WelcomeStep onGetStarted={handleGetStarted} onSkip={handleSkip} />
      )}

      {step === 1 && (
        <ValuePropSlides onComplete={handleValuePropComplete} />
      )}

      {step === 2 && (
        <PersonaSelector onSelect={handlePersonaSelect} />
      )}

      {step === 3 && (
        <PreferencesForm onComplete={handlePreferencesComplete} />
      )}
    </div>
  );
}
