import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BaseStepProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onAction: () => void;
  children?: React.ReactNode;
  iconSize?: 'sm' | 'lg';
}

const BaseStep = ({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  onAction, 
  children,
  iconSize = 'sm'
}: BaseStepProps) => {
  const iconContainerSize = iconSize === 'sm' ? 'w-16 h-16' : 'w-24 h-24';
  const iconSizeClass = iconSize === 'sm' ? 'w-8 h-8' : 'w-12 h-12';

  return (
    <motion.div
      key={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-6"
    >
      <div className="text-center">
        {Icon && (
          <div className={`${iconContainerSize} mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4`}>
            <Icon className={`${iconSizeClass} text-primary`} />
          </div>
        )}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
      </div>
      {children}
      <Button
        size="lg"
        className="w-full"
        onClick={onAction}
      >
        {buttonText}
      </Button>
    </motion.div>
  );
};

export default BaseStep; 