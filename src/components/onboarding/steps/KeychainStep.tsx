import { KeyRound } from 'lucide-react';
import BaseStep from './BaseStep';
import SetupEncryptionKey from '@/components/shared/SetupEncryptionKey';

interface KeychainStepProps {
  onNext: () => void;
}

const KeychainStep = ({ onNext }: KeychainStepProps) => {
  return <SetupEncryptionKey onSuccess={onNext} onSkip={onNext} />;
};

export default KeychainStep; 