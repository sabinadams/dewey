import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface CompleteStepProps {
  onComplete: () => void;
}

const CompleteStep = ({ onComplete }: CompleteStepProps) => {
  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      key="complete"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ opacity: { duration: 0.3, ease: 'easeInOut' } }}
      className="text-center space-y-6"
    >
      <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
        <CheckCircle2 className="w-12 h-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold">You're All Set!</h2>
      <p className="text-muted-foreground">
        Dewey is ready to help you manage your databases with AI assistance.
      </p>
      <Button size="lg" onClick={onComplete}>
        Start Using Dewey
      </Button>
    </motion.div>
  );
};

export default CompleteStep; 