import { Meta, StoryObj } from "@storybook/react";
import { ImageCropModal } from "@/components/ui/image-crop-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUploadPreview } from "@/components/ui/file-upload";

const meta: Meta<typeof ImageCropModal> = {
  title: "UI/ImageCropModal",
  component: ImageCropModal,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    aspectRatio: {
      control: { type: 'number' },
      description: 'Aspect ratio for the crop area',
      defaultValue: 1,
    },
    cropShape: {
      control: { type: 'select', options: ['rect', 'round'] },
      description: 'Shape of the crop area',
      defaultValue: 'rect',
    },
  },
};

export default meta;

// Create a mock image file for the stories
const createMockImageFile = () => {
  // This is a base64 encoded 1x1 transparent pixel
  const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  
  // Convert the base64 string to a blob
  const byteString = atob(base64.split(',')[1]);
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
  
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  const blob = new Blob([ab], { type: mimeString });
  return new File([blob], "test-image.png", { type: "image/png" });
};

// Base component for all examples
interface CropExampleProps {
  title: string;
  aspectRatio?: number;
  cropShape?: 'rect' | 'round';
  iconSize?: boolean;
}

const CropExample = ({ 
  title, 
  aspectRatio = 1, 
  cropShape = 'round', 
  iconSize = true 
}: CropExampleProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  
  const handleSelectFile = () => {
    // Create a mock image file
    const mockFile = createMockImageFile();
    setFile(mockFile);
    setShowCropper(true);
  };
  
  const handleCropComplete = (croppedFile: File) => {
    setFile(croppedFile);
    setPreviewUrl(URL.createObjectURL(croppedFile));
    setShowCropper(false);
  };
  
  const handleDelete = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
  };
  
  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="text-lg font-medium">{title}</h3>
      
      {previewUrl && file ? (
        <div className="flex flex-col items-center gap-4">
          <FileUploadPreview
            fileName={file.name}
            fileUrl={previewUrl}
            fileType={file.type}
            onDelete={handleDelete}
            size={iconSize ? "icon" : "default"}
          />
          <Button onClick={() => { setFile(null); handleSelectFile(); }}>
            Choose Another Image
          </Button>
        </div>
      ) : (
        <Button onClick={handleSelectFile}>
          Select Image to Crop
        </Button>
      )}
      
      {file && showCropper && (
        <ImageCropModal
          open={showCropper}
          onClose={() => setShowCropper(false)}
          image={file}
          onCropComplete={handleCropComplete}
          aspectRatio={aspectRatio}
          cropShape={cropShape}
        />
      )}
    </div>
  );
};

type Story = StoryObj<typeof ImageCropModal>;

// Circle crop for project icons (default)
export const CircleProjectIcon: Story = {
  render: () => <CropExample title="Circle Project Icon" cropShape="round" aspectRatio={1} />,
};

// Square crop for project icons
export const SquareProjectIcon: Story = {
  render: () => <CropExample title="Square Project Icon" cropShape="rect" aspectRatio={1} />,
};

// Rectangular crop for banners (16:9)
export const BannerCrop: Story = {
  render: () => <CropExample title="Banner Image (16:9)" cropShape="rect" aspectRatio={16/9} iconSize={false} />,
};

// Square crop for profile pictures
export const ProfilePicture: Story = {
  render: () => <CropExample title="Profile Picture" cropShape="rect" aspectRatio={1} />,
};

// Multiple examples side by side
export const ComparisonExamples: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
      <CropExample title="Circle Icon" cropShape="round" aspectRatio={1} />
      <CropExample title="Square Icon" cropShape="rect" aspectRatio={1} />
      <CropExample title="Widescreen (16:9)" cropShape="rect" aspectRatio={16/9} iconSize={false} />
      <CropExample title="Portrait (3:4)" cropShape="rect" aspectRatio={3/4} iconSize={false} />
    </div>
  ),
}; 