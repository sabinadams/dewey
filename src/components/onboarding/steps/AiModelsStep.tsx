import { Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import BaseStep from './BaseStep';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React from 'react';

interface AiModel {
  id: string;
  name: string;
  description: string;
  size: string;
  sizeInBytes: number;
}

const AVAILABLE_MODELS: AiModel[] = [
  {
    id: 'code-llama',
    name: 'Code Llama',
    description: 'Specialized for code understanding and generation',
    size: '2.5GB',
    sizeInBytes: 2.5 * 1024 * 1024 * 1024
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description: 'General purpose model for text understanding',
    size: '3.2GB',
    sizeInBytes: 3.2 * 1024 * 1024 * 1024
  }
];

interface AiModelsStepProps {
  isDownloading: boolean;
  downloadProgress: number;
  onDownload: (selectedModels: string[]) => void;
}

const formatBytes = (bytes: number): string => {
  const gb = bytes / (1024 * 1024 * 1024);
  return `${gb.toFixed(1)}GB`;
};

const AiModelsStep = ({ isDownloading, downloadProgress, onDownload }: AiModelsStepProps) => {
  const [selectedModels, setSelectedModels] = React.useState<string[]>([]);

  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleDownload = () => {
    if (selectedModels.length > 0) {
      onDownload(selectedModels);
    }
  };

  const totalSize = selectedModels.reduce((total, modelId) => {
    const model = AVAILABLE_MODELS.find(m => m.id === modelId);
    return total + (model?.sizeInBytes || 0);
  }, 0);

  return (
    <BaseStep
      icon={Download}
      title="Download AI Models"
      description="Optional: Download local models to save on API tokens. May take a few minutes."
      buttonText={isDownloading ? 'Downloading...' : `Download (${formatBytes(totalSize)})`}
      onAction={handleDownload}
      buttonDisabled={selectedModels.length === 0 || isDownloading}
      infoText={`These models are used to optionally power some of Dewey's features. You can download them later if you want. They will be downloaded from Dewey's CDN and stored on your machine. You will be notified when updates to those models are available.`}
    >
      <div className="space-y-4">
        <div className="space-y-4">
          {AVAILABLE_MODELS.map((model) => (
            <div key={model.id} className="flex items-start space-x-2">
              <Checkbox
                id={model.id}
                checked={selectedModels.includes(model.id)}
                onCheckedChange={() => handleModelToggle(model.id)}
                disabled={isDownloading}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor={model.id} className="text-sm font-medium leading-none">
                  {model.name} ({model.size})
                </Label>
                <p className="text-sm text-muted-foreground">
                  {model.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Progress value={downloadProgress} className="h-2" />
        <p className="text-sm text-muted-foreground text-center">
          {isDownloading ? 'Downloading models...' : 'Ready to download'}
        </p>
      </div>
    </BaseStep>
  );
};

export default AiModelsStep; 