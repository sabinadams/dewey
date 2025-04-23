import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useStoreOnboardingMutation } from '@/store/api/onboarding.api';
import { useState, useCallback } from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Download, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactComponent as LogoSVG } from '@/assets/dewey.svg';
import AIVectorBackground from '@/components/onboarding/AiVectorBackground';
import DecorativeBlobs from '@/components/onboarding/DecorativeBlobs';

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
    const variants = {
      enter: {
        opacity: 0
      },
      center: {
        opacity: 1
      },
      exit: {
        opacity: 0
      }
    };

    const stepIndex = steps.findIndex(step => step.id === currentStep);
    const direction = stepIndex - steps.findIndex(step => step.id === currentStep);

    switch (currentStep) {
      case 'welcome':
        return (
          <motion.div
            key="welcome"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.3, ease: "easeInOut" }
            }}
            className="text-center space-y-6"
          >
            <div className="w-32 h-32 mx-auto flex items-center justify-center">
              <LogoSVG className="w-full h-full" />
            </div>
            <h1 className="text-4xl font-bold">Let's get you started</h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              Let's set up everything you need to get started.
            </p>
            <Button size="lg" onClick={() => setCurrentStep('ai-models')}>
              Begin Setup
            </Button>
          </motion.div>
        );
      case 'ai-models':
        return (
          <motion.div
            key="ai-models"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.3, ease: "easeInOut" }
            }}
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
      case 'keychain':
        return (
          <motion.div
            key="keychain"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.3, ease: "easeInOut" }
            }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <KeyRound className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Secure Your Data</h2>
              <p className="text-muted-foreground mb-6">
                Dewey needs access to your system keychain to securely store your database credentials.
              </p>
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={() => setCurrentStep('complete')}
            >
              Grant Keychain Access
            </Button>
          </motion.div>
        );
      case 'complete':
        return (
          <motion.div
            key="complete"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.3, ease: "easeInOut" }
            }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">You're All Set!</h2>
            <p className="text-muted-foreground">
              Dewey is ready to help you manage your databases with AI assistance.
            </p>
            <Button size="lg" onClick={handleComplete}>
              Start Using Dewey
            </Button>
          </motion.div>
        );
    }
  }, [currentStep, downloadProgress, isDownloading]);

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
                          ? 'bg-primary'
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