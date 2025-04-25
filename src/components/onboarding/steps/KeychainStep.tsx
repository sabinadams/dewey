import { KeyRound } from 'lucide-react';
import BaseStep from './BaseStep';
import { useHasEncryptionKeyQuery, useInitializeEncryptionKeyMutation } from '@/store/api/keychain';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { ErrorCategory } from '@/lib/errors';
import { useToast } from '@/hooks/use-toast';

interface KeychainStepProps {
  onNext: () => void;
}

const KeychainStep = ({ onNext }: KeychainStepProps) => {
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
      const timer = setTimeout(() => onNext(), 500);
      return () => clearTimeout(timer);
    }
  }, [hasEncryptionKey, isSuccess, onNext, shouldCheckKey, hasCreatedKey, showToast]);

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
  
  return (
    <BaseStep
      icon={KeyRound}
      title="Secure Your Connection"
      infoText='Dewey needs access to your system keychain to securely store your database credentials. When you connect to a database, Dewey will use the keychain to securely store your credentials. If this is skipped now, you will be asked to grant access when you connect to a database for the first time.'
      description={
        <AnimatePresence mode="wait">
          <motion.div
            key={shouldCheckKey ? 'checked' : 'unchecked'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {getDescription()}
          </motion.div>
        </AnimatePresence>
      }
      buttonText={getButtonText()}
      onAction={handleAction}
    />
  );
};

export default KeychainStep; 