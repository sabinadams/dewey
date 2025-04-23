import { KeyRound } from 'lucide-react';
import BaseStep from './BaseStep';
import { useHasEncryptionKeyQuery, useInitializeEncryptionKeyMutation } from '@/store/api/keychain';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KeychainStepProps {
  onNext: () => void;
}

const KeychainStep = ({ onNext }: KeychainStepProps) => {
  const [shouldCheckKey, setShouldCheckKey] = useState(false);
  const { data: hasEncryptionKey, isSuccess } = useHasEncryptionKeyQuery(undefined, {
    skip: !shouldCheckKey
  });

  useEffect(() => {
    if (isSuccess && hasEncryptionKey) {
      toast.success('Encryption key found', {
        description: 'Your connections will already be secured with an encryption key.',
        duration: 1500
      });
      onNext();
    }
  }, [hasEncryptionKey, isSuccess, onNext]);

  const [initializeEncryptionKey] = useInitializeEncryptionKeyMutation();

  const handleAction = async () => {
    if (!shouldCheckKey) {
      setShouldCheckKey(true);
      return;
    }

    if (!hasEncryptionKey) {
      try {
        await initializeEncryptionKey();
        toast.success('Encryption key created successfully', {
          duration: 1500
        });
        onNext();
      } catch (error) {
        toast.error('Failed to create encryption key', {
          duration: 1500
        });
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