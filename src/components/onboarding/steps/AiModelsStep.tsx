import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download } from 'lucide-react';

interface AiModelsStepProps {
  isDownloading: boolean;
  downloadProgress: number;
  onDownload: () => void;
}

const AiModelsStep = ({ isDownloading, downloadProgress, onDownload }: AiModelsStepProps) => {
  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      key="ai-models"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ opacity: { duration: 0.3, ease: 'easeInOut' } }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Download className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Download AI Models</h2>
        <p className="text-muted-foreground mb-6">
          Dewey needs to download some AI models to power its features. This may take a few minutes.
        </p>
      </div>
      <div className="space-y-4">
        <Progress value={downloadProgress} className="h-2" />
        <p className="text-sm text-muted-foreground text-center">
          {isDownloading ? 'Downloading models...' : 'Ready to download'}
        </p>
      </div>
      <Button
        size="lg"
        className="w-full"
        onClick={onDownload}
        disabled={isDownloading}
      >
        {isDownloading ? 'Downloading...' : 'Download Models'}
      </Button>
    </motion.div>
  );
};

export default AiModelsStep; 