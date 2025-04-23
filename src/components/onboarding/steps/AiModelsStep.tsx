import { Download, ChevronDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import BaseStep from './BaseStep';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React from 'react';

/**
 * These will all be downloaded from Dewey's CDN
 * There will be an AI manifest json file that has the following information:
 * - The version of the AI models 
 * - The date and time the models were downloaded
 * - The size of the models
 * - The MD5 hash of the models
 * - The URL of the models
 * - The models that are included in the manifest
 * 
 * Later on when the user has already been using a model it will routinely check for updates to the model
 * and if there is an update it will ask if you want to update to the new model. 
 */


interface AiModel {
  id: string;
  name: string;
  description: string;
  size: string;
  sizeInBytes: number;
}

const AVAILABLE_MODELS: AiModel[] = [
  {
    id: 'mistral-7b-instruct',
    name: 'Mistral 7B Instruct',
    description: 'A 7B parameter model fine-tuned for instruction following and chat',
    size: '4.1GB',
    sizeInBytes: 4.1 * 1024 * 1024 * 1024
  },
  {
    id: 'gemma-7b-instruct',
    name: 'Gemma 7B Instruct',
    description: 'Google\'s lightweight 7B model optimized for instruction following',
    size: '4.2GB',
    sizeInBytes: 4.2 * 1024 * 1024 * 1024
  },
  {
    id: 'llama-2-7b-chat',
    name: 'LLaMA 2 7B Chat',
    description: 'Meta\'s 7B parameter model optimized for chat interactions',
    size: '4.0GB',
    sizeInBytes: 4.0 * 1024 * 1024 * 1024
  },
  {
    id: 'openchat-3.5-7b',
    name: 'OpenChat 3.5 7B',
    description: 'A 7B parameter model fine-tuned for open-ended conversations',
    size: '4.1GB',
    sizeInBytes: 4.1 * 1024 * 1024 * 1024
  },
  {
    id: 'tinyllama-1.1b',
    name: 'TinyLlama 1.1B',
    description: 'A compact 1.1B parameter model for efficient inference',
    size: '0.6GB',
    sizeInBytes: 0.6 * 1024 * 1024 * 1024
  },
  {
    id: 'neuralbeagle-13b',
    name: 'NeuralBeagle (MythoMax-L2 13B)',
    description: 'A 13B parameter model combining MythoMax and L2 capabilities',
    size: '7.5GB',
    sizeInBytes: 7.5 * 1024 * 1024 * 1024
  },
  {
    id: 'sqlcoder-7b',
    name: 'SQLCoder 7B',
    description: 'Specialized for SQL query generation and database interactions',
    size: '4.1GB',
    sizeInBytes: 4.1 * 1024 * 1024 * 1024
  },
  {
    id: 'codellama-7b-instruct',
    name: 'CodeLLaMA 7B Instruct',
    description: 'A 7B parameter model specialized for code understanding and generation',
    size: '4.2GB',
    sizeInBytes: 4.2 * 1024 * 1024 * 1024
  },
  {
    id: 'deepseek-coder-6.7b',
    name: 'Deepseek Coder 6.7B',
    description: 'A 6.7B parameter model optimized for code-related tasks',
    size: '3.8GB',
    sizeInBytes: 3.8 * 1024 * 1024 * 1024
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
  const [showAllModels, setShowAllModels] = React.useState(false);

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

  const displayedModels = showAllModels ? AVAILABLE_MODELS : AVAILABLE_MODELS.slice(0, 2);

  return (
    <BaseStep
      icon={Download}
      title="Download AI Models"
      description="Optional: Download local models to save on API tokens. May take a few minutes."
      buttonText={isDownloading ? 'Downloading...' : `Download (${formatBytes(totalSize)})`}
      onAction={handleDownload}
      buttonDisabled={selectedModels.length === 0 || isDownloading}
      infoText={`These models are used to optionally power some of Dewey's features. You can download them later if you want. They will be downloaded from Dewey's CDN and stored on your machine. You will be notified when updates to those models are available.`}
      footer={
        <div className="space-y-2">
          <Progress value={downloadProgress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            {isDownloading ? 'Downloading models...' : 'Ready to download'}
          </p>
        </div>
      }
    >
      <div className="space-y-4">
        {displayedModels.map((model) => (
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
      {!showAllModels && AVAILABLE_MODELS.length > 2 && (
        <button
          onClick={() => setShowAllModels(true)}
          className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Show More Models
          <ChevronDown className="h-4 w-4" />
        </button>
      )}
    </BaseStep>
  );
};

export default AiModelsStep; 