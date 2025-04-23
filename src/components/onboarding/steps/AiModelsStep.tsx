import { Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import BaseStep from './BaseStep';

interface AiModelsStepProps {
  isDownloading: boolean;
  downloadProgress: number;
  onDownload: () => void;
}

const AiModelsStep = ({ isDownloading, downloadProgress, onDownload }: AiModelsStepProps) => {
  return (
    <BaseStep
      icon={Download}
      title="Download AI Models"
      description="Dewey needs to download some AI models to power its features. This may take a few minutes."
      buttonText={isDownloading ? 'Downloading...' : 'Download Models'}
      onAction={onDownload}
    >
      <div className="space-y-4">
        <Progress value={downloadProgress} className="h-2" />
        <p className="text-sm text-muted-foreground text-center">
          {isDownloading ? 'Downloading models...' : 'Ready to download'}
        </p>
      </div>
    </BaseStep>
  );
};

export default AiModelsStep; 