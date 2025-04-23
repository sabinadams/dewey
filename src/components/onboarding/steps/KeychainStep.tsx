import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { KeyRound } from 'lucide-react';

interface KeychainStepProps {
  onNext: () => void;
}

const KeychainStep = ({ onNext }: KeychainStepProps) => {
  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      key="keychain"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ opacity: { duration: 0.3, ease: 'easeInOut' } }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <KeyRound className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Secure Your Data</h2>
        <p className="text-muted-foreground mb-6">
          Dewey needs access to your system keychain to securely store your database credentials.
        </p>
      </div>
      <Button
        size="lg"
        className="w-full"
        onClick={onNext}
      >
        Grant Keychain Access
      </Button>
    </motion.div>
  );
};

export default KeychainStep; 