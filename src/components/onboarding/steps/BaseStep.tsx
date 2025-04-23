import { motion } from 'framer-motion';
import { LucideIcon, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface BaseStepProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onAction: () => void;
  children?: React.ReactNode;
  iconSize?: 'sm' | 'lg';
  buttonDisabled?: boolean;
  infoText?: string;
  footer?: React.ReactNode;
}

const BaseStep = ({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  onAction, 
  children,
  iconSize = 'sm',
  buttonDisabled = false,
  infoText,
  footer
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
      className="h-[calc(100vh-12rem)] flex flex-col"
    >
      <div className="shrink-0 text-center">
        {Icon && (
          <div className={`${iconContainerSize} mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4`}>
            <Icon className={`${iconSizeClass} text-primary`} />
          </div>
        )}
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          {infoText && (
            <Tooltip >
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px] break-words" side="bottom">
                <p className="whitespace-normal">{infoText}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <p className="text-muted-foreground mb-6">{description}</p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        {children}
      </div>
      <div className="shrink-0 pt-4 space-y-4">
        <Button
          size="lg"
          className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
          onClick={onAction}
          disabled={buttonDisabled}
        >
          {buttonText}
        </Button>
        {footer}
      </div>
    </motion.div>
  );
};

export default BaseStep; 