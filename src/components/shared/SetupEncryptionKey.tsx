import { KeyRound, Info } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHasEncryptionKeyQuery, useInitializeEncryptionKeyMutation } from '@/store/api/keychain';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { ErrorCategory } from '@/lib/errors';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
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
  const hasShownToast = useRef(false);
  const {
    data: hasEncryptionKey,
    isSuccess: keyCheckSuccess,
    isError: keyCheckError,
    isFetching: keyCheckFetching,
    refetch: refetchKeyStatus,
  } = useHasEncryptionKeyQuery(undefined, {
    skip: !shouldCheckKey,
  });
  const keyCheckPending = shouldCheckKey && keyCheckFetching;
  const { handleError } = useErrorHandler({
    defaultCategory: ErrorCategory.KEYRING
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (keyCheckSuccess && hasEncryptionKey && shouldCheckKey && !hasShownToast.current) {
      hasShownToast.current = true;
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
  }, [hasEncryptionKey, keyCheckSuccess, onSuccess, shouldCheckKey, hasCreatedKey, showToast]);

  const [initializeEncryptionKey, { isLoading: initKeyLoading }] =
    useInitializeEncryptionKeyMutation();

  const actionDisabled = keyCheckPending || initKeyLoading;

  const handleAction = async () => {
    if (!shouldCheckKey) {
      setShouldCheckKey(true);
      return;
    }

    if (keyCheckPending) {
      return;
    }

    if (keyCheckError) {
      void refetchKeyStatus();
      return;
    }

    if (!keyCheckSuccess) {
      return;
    }

    if (hasEncryptionKey === false) {
      try {
        await initializeEncryptionKey().unwrap();
        setHasCreatedKey(true);
      } catch (error: any) {
        await handleError(error);
      }
    }
  };

  const getDescription = () => {
    if (!shouldCheckKey) {
      return "Click the button below to check if you already have an encryption key.";
    }
    if (keyCheckPending) {
      return "Checking your keychain…";
    }
    if (keyCheckError) {
      return "Dewey could not read the keychain status. Try again, or check that the app is allowed to use the keychain.";
    }
    return hasEncryptionKey
      ? "Your connections will already be secured with an encryption key."
      : "Dewey will store an encryption key in your login keychain (service: dewey). On macOS you usually will not see a system popup for this—access is tied to the app. If the keychain is locked, you may be prompted to unlock it.";
  };

  const getButtonText = () => {
    if (!shouldCheckKey) {
      return "Check for Existing Key";
    }
    if (keyCheckPending) {
      return "Checking…";
    }
    if (keyCheckError) {
      return "Retry";
    }
    if (initKeyLoading) {
      return "Setting up…";
    }
    return hasEncryptionKey ? "Continue" : "Create encryption key";
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
        <Button onClick={handleAction} className="mt-2" disabled={actionDisabled}>
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
      buttonDisabled={actionDisabled}
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