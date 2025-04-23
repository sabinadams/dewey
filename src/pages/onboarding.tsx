import { useNavigate } from 'react-router-dom';
import { useStoreOnboardingMutation } from '@/store/api/onboarding.api';
import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AIVectorBackground from '@/components/onboarding/AiVectorBackground';
import DecorativeBlobs from '@/components/onboarding/DecorativeBlobs';
import WelcomeStep from '@/components/onboarding/steps/WelcomeStep';
import AiModelsStep from '@/components/onboarding/steps/AiModelsStep';
import KeychainStep from '@/components/onboarding/steps/KeychainStep';
import CompleteStep from '@/components/onboarding/steps/CompleteStep';
import WizardStepsIndicator from '@/components/onboarding/WizardStepsIndicator';
import { ThemeToggle } from '@/components/ui';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';

type OnboardingStep = 'welcome' | 'ai-models' | 'keychain' | 'complete';

export default function Onboarding() {
  const navigate = useNavigate();
  const [storeOnboarding] = useStoreOnboardingMutation();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const steps = [
    { id: 'welcome', title: 'Welcome to Dewey' },
    { id: 'ai-models', title: 'AI Models' },
    { id: 'keychain', title: 'Security' },
    { id: 'complete', title: 'Complete' },
  ];

  const handleComplete = useCallback(async () => {
    try {
        await storeOnboarding(true);
        navigate('/');
    } catch (error) {
      console.error('Failed to store onboarding completion:', error);
    }
  }, [storeOnboarding]);

  const handleDownloadModels = useCallback(async () => {
    setIsDownloading(true);
    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDownloadProgress(i);
    }
    setIsDownloading(false);
    setCurrentStep('keychain');
  }, []);

  const getStepContent = useCallback(() => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep onNext={() => setCurrentStep('ai-models')} />;
      case 'ai-models':
        return <AiModelsStep isDownloading={isDownloading} downloadProgress={downloadProgress} onDownload={handleDownloadModels} />;
      case 'keychain':
        return <KeychainStep onNext={() => setCurrentStep('complete')} />;
      case 'complete':
        return <CompleteStep onComplete={handleComplete} />;
    }
  }, [currentStep, handleDownloadModels, isDownloading, downloadProgress]);

  const handleStepClick = useCallback((stepId: string) => {
    setCurrentStep(stepId as OnboardingStep);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <AIVectorBackground />
      </div>
      <DecorativeBlobs step={currentStep} />
      <div className="flex flex-col relative w-full h-full py-8">
        <div className="flex-1">
          <div className="absolute top-4 right-4 z-50">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <ThemeToggle />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Toggle Theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 relative z-10 mx-auto">
          <div className="w-full max-w-lg relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {getStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex-1"/>
        <div className="mx-auto w-full max-w-lg">
          <WizardStepsIndicator
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </div>
      </div>
    </>
  );
}