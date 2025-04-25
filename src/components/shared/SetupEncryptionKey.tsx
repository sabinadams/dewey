import { KeyRound, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHasEncryptionKeyQuery, useInitializeEncryptionKeyMutation } from '@/store/api/keychain';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { ErrorCategory } from '@/lib/errors';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BaseStep from '@/components/onboarding/steps/BaseStep';

interface SetupEncryptionKeyProps {
  onSuccess?: () => void;
  variant?: 'dialog' | 'step';
  onSkip?: () => void;
}

const SetupEncryptionKey = ({ onSuccess, variant = 'step', onSkip }: SetupEncryptionKeyProps) => {
  const [shouldCheckKey, setShouldCheckKey] = useState(false);
  const [hasCreatedKey, setHasCreatedKey] = useState(false);
  const { data: hasEncryptionKey, isSuccess } = useHasEncryptionKeyQuery(undefined, {
    skip: !shouldCheckKey
  });
  const { handleError } = useErrorHandler({
    defaultCategory: ErrorCategory.KEYRING
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (isSuccess && hasEncryptionKey && shouldCheckKey) {
      if (hasCreatedKey) {
        showToast(
          'Encryption key created',
          'success',
          { description: 'Your connections will now be secured with an encryption key.' }
        );
      } else {
        showToast(
          'Encryption key found',
          'success',
          { description: 'Your connections will already be secured with an encryption key.' }
        );
      }
      if (onSuccess) {
        const timer = setTimeout(() => onSuccess(), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [hasEncryptionKey, isSuccess, onSuccess, shouldCheckKey, hasCreatedKey, showToast]);

  const [initializeEncryptionKey] = useInitializeEncryptionKeyMutation();

  const handleAction = async () => {
    if (!shouldCheckKey) {
      setShouldCheckKey(true);
      return;
    }

    if (!hasEncryptionKey) {
      try {
        await initializeEncryptionKey().unwrap();
        setHasCreatedKey(true);
        setShouldCheckKey(true);
      } catch (error: any) {
        await handleError(error);
      }
    }
  };

  const getDescription = () => {
    if (!shouldCheckKey) {
      return "Click the button below to check if you already have an encryption key.";
    }
    return hasEncryptionKey
      ? "Your connections will already be secured with an encryption key."
      : "Dewey needs access to your system keychain to securely store your database credentials.";
  };

  const getButtonText = () => {
    if (!shouldCheckKey) {
      return "Check for Existing Key";
    }
    return hasEncryptionKey ? "Continue" : "Grant Keychain Access";
  };

  const titleWithTooltip = (
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold">Secure Your Connection</h2>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Dewey needs access to your system keychain to securely store your database credentials. When you connect to a database, Dewey will use the keychain to securely store your credentials.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const content = (
    <AnimatePresence mode="wait">
      <motion.div
        key={shouldCheckKey ? 'checked' : 'unchecked'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="text-sm"
      >
        {getDescription()}
      </motion.div>
    </AnimatePresence>
  );

  if (variant === 'dialog') {
    return (
      <div className="flex flex-col gap-4">
        {titleWithTooltip}
        {content}
        <Button onClick={handleAction} className="mt-2">
          {getButtonText()}
        </Button>
      </div>
    );
  }

  return (
    <BaseStep
      icon={KeyRound}
      title="Secure Your Connection"
      infoText='Dewey needs access to your system keychain to securely store your database credentials. When you connect to a database, Dewey will use the keychain to securely store your credentials. If this is skipped now, you will be asked to grant access when you connect to a database for the first time.'
      description={content}
      buttonText={getButtonText()}
      onAction={handleAction}
      footer={onSkip && (
        <Button
          variant="ghost"
          size="lg"
          className="w-full"
          onClick={onSkip}
        >
          Skip for Now
        </Button>
      )}
    />
  );
};

export default SetupEncryptionKey; 