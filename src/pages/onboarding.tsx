import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useStoreOnboardingMutation } from '@/store/api/onboarding.api';
import { useState, useCallback } from 'react';
import { Progress } from '@/components/ui/progress';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIVectorBackground from '@/components/onboarding/AiVectorBackground';
import DecorativeBlobs from '@/components/onboarding/DecorativeBlobs';
import WelcomeStep from '@/components/onboarding/steps/WelcomeStep';
import AiModelsStep from '@/components/onboarding/steps/AiModelsStep';
import KeychainStep from '@/components/onboarding/steps/KeychainStep';
import CompleteStep from '@/components/onboarding/steps/CompleteStep';

type OnboardingStep = 'welcome' | 'ai-models' | 'keychain' | 'complete';

// Define types for ProgressBar props
interface ProgressBarProps {
  isDownloading: boolean;
  downloadProgress: number;
  handleDownloadModels: () => void;
}

// Correct the ProgressBar component to use the props
function ProgressBar({ isDownloading, downloadProgress, handleDownloadModels }: ProgressBarProps) {
  return (
    <motion.div
      key="ai-models"
      variants={{ enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ opacity: { duration: 0.3, ease: "easeInOut" } }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Download className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Download AI Models</h2>
        <p className="text-muted-foreground mb-6">
          Dewey needs to download some AI models to power its features. This may take a few minutes.
        </p>
      </div>
      <div className="space-y-4">
        <Progress value={downloadProgress} className="h-2" />
        <p className="text-sm text-muted-foreground text-center">
          {isDownloading ? 'Downloading models...' : 'Ready to download'}
        </p>
      </div>
      <Button
        size="lg"
        className="w-full"
        onClick={handleDownloadModels}
        disabled={isDownloading}
      >
        {isDownloading ? 'Downloading...' : 'Download Models'}
      </Button>
    </motion.div>
  );
}

// Update the glowEffect class to include a transition for the box-shadow
const glowEffect = 'shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-shadow duration-300';

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
        setCurrentStep('welcome');
    //   await storeOnboarding(true);
    //   navigate('/');
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

  return (
    <>
      <div className="fixed inset-0 z-0">
        <AIVectorBackground />
      </div>
      <DecorativeBlobs step={currentStep} />
      <div className="min-h-screen flex flex-col relative">
        <div className="flex-1 flex items-center justify-center p-8 relative z-10">
          <div className="w-full max-w-lg relative">
            <AnimatePresence mode="wait">
              {getStepContent()}
            </AnimatePresence>
          </div>
        </div>
        <div className="border-t py-4 px-8 relative z-10">
          <div className="max-w-lg mx-auto">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1 flex items-center">
                  <div className="flex-1 flex items-center">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        steps.findIndex(s => s.id === currentStep) >= index
                          ? `bg-primary ${steps.findIndex(s => s.id === currentStep) === index ? glowEffect : ''}`
                          : 'bg-muted'
                      }`}
                      style={{
                        width: steps.findIndex(s => s.id === currentStep) === index ? '100%' : '100%',
                        transform: steps.findIndex(s => s.id === currentStep) === index ? 'scaleY(1.5)' : 'scaleY(1)',
                      }}
                    />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-2 h-2 rounded-full mx-2 bg-muted" />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {steps.find(step => step.id === currentStep)?.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}