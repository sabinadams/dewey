import { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/components/ui/card";
import { FileUpload, FileUploadIcon, FileUploadInput, FileUploadPreview, FileUploadTrigger } from "@/components/ui/file-upload";
import { ImageCropModal } from "@/components/ui/image-crop-modal";
import { useState } from "react";

const meta: Meta = {
  title: "Examples/FileUploadWithCropper",
  parameters: {
    layout: 'padded',
  },
};

export default meta;

interface FileUploadWithCropperProps {
  title: string;
  description: string;
  cropShape?: 'rect' | 'round';
  aspectRatio?: number;
}

const FileUploadWithCropper = ({ 
  title, 
  description, 
  cropShape = 'round', 
  aspectRatio = 1 
}: FileUploadWithCropperProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setShowCropper(true);
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    setFile(croppedFile);
    setPreviewUrl(URL.createObjectURL(croppedFile));
    setShowCropper(false);
    setSelectedFile(null);
  };

  const handleFileDelete = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-zinc-500 mb-4">{description}</p>

      {selectedFile && showCropper && (
        <ImageCropModal
          open={showCropper}
          onClose={() => {
            setShowCropper(false);
            setSelectedFile(null);
          }}
          image={selectedFile}
          onCropComplete={handleCropComplete}
          aspectRatio={aspectRatio}
          cropShape={cropShape}
        />
      )}

      <Card className="p-6">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium text-foreground">Upload Image</label>
            <p className="text-sm text-muted-foreground">
              Select an image to upload. You'll be able to crop it afterward.
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <FileUpload>
              {file && previewUrl ? (
                <FileUploadPreview
                  fileName={file.name}
                  fileUrl={previewUrl}
                  fileType={file.type}
                  onDelete={handleFileDelete}
                  size="icon"
                />
              ) : null}
              <FileUploadTrigger 
                inputId="cropper-demo-file" 
                className="p-4"
                disabled={!!file}
              >
                <div className="flex items-center gap-2">
                  <FileUploadIcon className="h-5 w-5" />
                  <span className="text-sm font-medium text-foreground">
                    {file ? "File already uploaded" : "Click to upload image"}
                  </span>
                </div>
              </FileUploadTrigger>
              <FileUploadInput 
                id="cropper-demo-file" 
                onChange={handleFileChange}
                disabled={!!file}
                accept="image/*"
              />
            </FileUpload>
          </div>
        </div>
      </Card>
    </div>
  );
};

type Story = StoryObj;

export const ProjectIcon: Story = {
  render: () => (
    <FileUploadWithCropper 
      title="Project Icon Upload" 
      description="Upload and crop a perfect project icon. The image will be cropped to a circle shape."
      cropShape="round"
      aspectRatio={1}
    />
  ),
};

export const ProfilePicture: Story = {
  render: () => (
    <FileUploadWithCropper 
      title="Profile Picture Upload" 
      description="Upload and crop your profile picture. The image will be cropped to a square shape."
      cropShape="rect"
      aspectRatio={1}
    />
  ),
};

export const BannerImage: Story = {
  render: () => (
    <FileUploadWithCropper 
      title="Banner Image Upload" 
      description="Upload and crop a banner image. The image will be cropped to a 16:9 widescreen ratio."
      cropShape="rect"
      aspectRatio={16/9}
    />
  ),
};

export const ComparisonView: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-10">
      <FileUploadWithCropper 
        title="Project Icon (Circle)" 
        description="Circular crop for project icons"
        cropShape="round"
        aspectRatio={1}
      />
      <FileUploadWithCropper 
        title="Profile Picture (Square)" 
        description="Square crop for profile pictures"
        cropShape="rect"
        aspectRatio={1}
      />
      <FileUploadWithCropper 
        title="Banner Image (16:9)" 
        description="Widescreen crop for banner images"
        cropShape="rect"
        aspectRatio={16/9}
      />
    </div>
  ),
}; 