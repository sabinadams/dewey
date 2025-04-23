import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ReactComponent as LogoSVG } from '@/assets/dewey.svg';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      key="welcome"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ opacity: { duration: 0.3, ease: 'easeInOut' } }}
      className="text-center space-y-6"
    >
      <div className="w-32 h-32 mx-auto flex items-center justify-center">
        <LogoSVG className="w-full h-full" />
      </div>
      <h1 className="text-4xl font-bold">Let's get you started</h1>
      <p className="text-xl text-muted-foreground max-w-lg mx-auto">
        Let's set up everything you need to get started.
      </p>
      <Button size="lg" onClick={onNext}>
        Begin Setup
      </Button>
    </motion.div>
  );
};

export default WelcomeStep; 