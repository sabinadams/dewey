import { CheckCircle2 } from 'lucide-react';
import BaseStep from './BaseStep';

interface CompleteStepProps {
  onComplete: () => void;
}

const CompleteStep = ({ onComplete }: CompleteStepProps) => {
  return (
    <BaseStep
      icon={CheckCircle2}
      title="You're All Set!"
      description="Dewey is ready to help you manage your databases with AI assistance."
      buttonText="Start Using Dewey"
      onAction={onComplete}
      iconSize="lg"
    />
  );
};

export default CompleteStep; 