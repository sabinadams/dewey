import SetupEncryptionKey from '@/components/shared/SetupEncryptionKey';

interface KeychainStepProps {
  onNext: () => void;
}

const KeychainStep = ({ onNext }: KeychainStepProps) => {
  return <SetupEncryptionKey onSuccess={onNext} onSkip={onNext} />;
};

export default KeychainStep; 