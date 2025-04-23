import { KeyRound } from 'lucide-react';
import BaseStep from './BaseStep';

interface KeychainStepProps {
  onNext: () => void;
}

const KeychainStep = ({ onNext }: KeychainStepProps) => {
  return (
    <BaseStep
      icon={KeyRound}
      title="Secure Your Data"
      description="Dewey needs access to your system keychain to securely store your database credentials."
      buttonText="Grant Keychain Access"
      onAction={onNext}
    />
  );
};

export default KeychainStep; 