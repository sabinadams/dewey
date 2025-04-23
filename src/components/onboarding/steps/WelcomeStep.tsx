import { ReactComponent as LogoSVG } from '@/assets/dewey.svg';
import BaseStep from './BaseStep';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="text-center space-y-6" style={{ width: '100%' }}>
      <BaseStep
        title="Let's get started"
        description="Get ready to supercharge your database workflow with AI! Your data is powerful - it deserves an equally powerful tool."
        buttonText="Begin Setup"
        onAction={onNext}
        header={
          <div className="w-32 h-32 mx-auto flex items-center justify-center mb-6">
            <LogoSVG className="w-full h-full" />
          </div>
        }
      />
    </div>
  );
};

export default WelcomeStep; 