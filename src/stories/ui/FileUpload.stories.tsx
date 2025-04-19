import { Meta, StoryObj } from "@storybook/react";
import {
  FileUpload,
  FileUploadLabel,
  FileUploadTrigger,
  FileUploadInput,
  FileUploadIcon,
  FileUploadItem,
  FileUploadItemIcon,
  FileUploadItemName,
  FileUploadItemDeleteTrigger,
  FileUploadPreview
} from "@/components/ui/file-upload";
import React from "react";

const meta: Meta<typeof FileUpload> = {
  title: "UI/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: () => (
    <FileUpload className="w-full max-w-sm">
      <FileUploadLabel htmlFor="file">Upload file</FileUploadLabel>
      <FileUploadTrigger inputId="file">
        <div className="flex flex-col items-center gap-2">
          <FileUploadIcon />
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-foreground">Drop files here or click to upload</span>
            <span className="text-xs text-muted-foreground">
              Supports images, documents and videos up to 10MB
            </span>
          </div>
        </div>
      </FileUploadTrigger>
      <FileUploadInput id="file" />
    </FileUpload>
  ),
};

export const WithPreview: Story = {
  render: () => (
    <FileUpload className="w-full max-w-sm">
      <FileUploadLabel htmlFor="file">Upload file</FileUploadLabel>
      <FileUploadTrigger inputId="file">
        <div className="flex flex-col items-center gap-2">
          <FileUploadIcon />
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-foreground">Drop files here or click to upload</span>
            <span className="text-xs text-muted-foreground">
              Supports images, documents and videos up to 10MB
            </span>
          </div>
        </div>
      </FileUploadTrigger>
      <FileUploadInput id="file" />
      <FileUploadItem>
        <FileUploadItemIcon />
        <FileUploadItemName>document.pdf</FileUploadItemName>
        <FileUploadItemDeleteTrigger />
      </FileUploadItem>
    </FileUpload>
  ),
};

export const MultipleFiles: Story = {
  render: () => (
    <FileUpload className="w-full max-w-sm">
      <FileUploadLabel htmlFor="files">Upload files</FileUploadLabel>
      <FileUploadTrigger inputId="files">
        <div className="flex flex-col items-center gap-2">
          <FileUploadIcon />
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-foreground">Drop files here or click to upload</span>
            <span className="text-xs text-muted-foreground">
              Upload multiple files at once
            </span>
          </div>
        </div>
      </FileUploadTrigger>
      <FileUploadInput id="files" multiple />
      <div className="space-y-2">
        <FileUploadItem>
          <FileUploadItemIcon />
          <FileUploadItemName>document.pdf</FileUploadItemName>
          <FileUploadItemDeleteTrigger />
        </FileUploadItem>
        <FileUploadItem>
          <FileUploadItemIcon />
          <FileUploadItemName>image.jpg</FileUploadItemName>
          <FileUploadItemDeleteTrigger />
        </FileUploadItem>
        <FileUploadItem>
          <FileUploadItemIcon />
          <FileUploadItemName>presentation.pptx</FileUploadItemName>
          <FileUploadItemDeleteTrigger />
        </FileUploadItem>
      </div>
    </FileUpload>
  ),
};

export const Compact: Story = {
  render: () => (
    <FileUpload className="w-full max-w-sm">
      <FileUploadLabel htmlFor="compact-file">Upload file</FileUploadLabel>
      <FileUploadTrigger inputId="compact-file" className="p-4">
        <div className="flex items-center gap-2">
          <FileUploadIcon className="h-5 w-5" />
          <span className="text-sm font-medium text-foreground">
            Click to upload file
          </span>
        </div>
      </FileUploadTrigger>
      <FileUploadInput id="compact-file" />
      <FileUploadItem>
        <FileUploadItemIcon />
        <FileUploadItemName>document.pdf</FileUploadItemName>
        <FileUploadItemDeleteTrigger />
      </FileUploadItem>
    </FileUpload>
  ),
};

export const WithFileUploadPreview: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Image Preview</h3>
        <FileUpload className="w-full max-w-sm">
          <FileUploadLabel htmlFor="preview-image">Upload image</FileUploadLabel>
          <FileUploadTrigger inputId="preview-image" className="p-4">
            <div className="flex items-center gap-2">
              <FileUploadIcon className="h-5 w-5" />
              <span className="text-sm font-medium text-foreground">
                Click to upload image
              </span>
            </div>
          </FileUploadTrigger>
          <FileUploadInput id="preview-image" />
          <FileUploadPreview
            fileName="example-image.jpg"
            fileUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            fileType="image/jpeg"
            onDelete={() => console.log('Image deleted')}
          />
        </FileUpload>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Document Preview</h3>
        <FileUpload className="w-full max-w-sm">
          <FileUploadLabel htmlFor="preview-doc">Upload document</FileUploadLabel>
          <FileUploadTrigger inputId="preview-doc" className="p-4">
            <div className="flex items-center gap-2">
              <FileUploadIcon className="h-5 w-5" />
              <span className="text-sm font-medium text-foreground">
                Click to upload document
              </span>
            </div>
          </FileUploadTrigger>
          <FileUploadInput id="preview-doc" />
          <FileUploadPreview
            fileName="presentation.pptx"
            fileType="application/vnd.openxmlformats-officedocument.presentationml.presentation"
            onDelete={() => console.log('Document deleted')}
          />
        </FileUpload>
      </div>
    </div>
  ),
};

export const WithInteractivePreview: Story = {
  render: () => {
    // Using React's useState hook in a Story component
    const [file, setFile] = React.useState<{
      name: string;
      url: string;
      type: string;
    } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        // In a real app, we would use URL.createObjectURL here
        // For the story, we'll simulate with a placeholder image
        setFile({
          name: selectedFile.name,
          // Use a placeholder image for the story
          url: selectedFile.type.startsWith('image/') 
               ? "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
               : "",
          type: selectedFile.type
        });
      }
    };

    const handleDelete = () => {
      setFile(null);
    };

    return (
      <FileUpload className="w-full max-w-sm">
        <FileUploadLabel htmlFor="interactive-preview">
          Interactive File Upload with Preview
        </FileUploadLabel>
        {file && (
          <FileUploadPreview
            fileName={file.name}
            fileUrl={file.url}
            fileType={file.type}
            onDelete={handleDelete}
          />
        )}
        <FileUploadTrigger 
          inputId="interactive-preview"
          disabled={!!file}
        >
          <div className="flex flex-col items-center gap-2">
            <FileUploadIcon />
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-medium text-foreground">
                {file ? "File already uploaded" : "Try uploading a file"}
              </span>
              <span className="text-xs text-muted-foreground">
                {file ? "Delete the current file to upload a new one" : "To see the preview in action"}
              </span>
            </div>
          </div>
        </FileUploadTrigger>
        <FileUploadInput 
          id="interactive-preview" 
          onChange={handleFileChange}
          disabled={!!file}
        />
      </FileUpload>
    );
  }
};

export const DisabledState: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Disabled Upload</h3>
        <FileUpload className="w-full max-w-sm">
          <FileUploadLabel htmlFor="disabled-file">Upload file (Disabled)</FileUploadLabel>
          <FileUploadTrigger inputId="disabled-file" className="p-4" disabled>
            <div className="flex items-center gap-2">
              <FileUploadIcon className="h-5 w-5" />
              <span className="text-sm font-medium text-foreground">
                Upload disabled
              </span>
            </div>
          </FileUploadTrigger>
          <FileUploadInput id="disabled-file" disabled />
        </FileUpload>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Disabled with Preview</h3>
        <FileUpload className="w-full max-w-sm">
          <FileUploadPreview
            fileName="example-image.jpg"
            fileUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            fileType="image/jpeg"
            onDelete={() => console.log('Image deleted')}
          />
          <FileUploadLabel htmlFor="disabled-preview-file">Upload file (Disabled with Preview)</FileUploadLabel>
          <FileUploadTrigger inputId="disabled-preview-file" className="p-4" disabled>
            <div className="flex items-center gap-2">
              <FileUploadIcon className="h-5 w-5" />
              <span className="text-sm font-medium text-foreground">
                File already uploaded
              </span>
            </div>
          </FileUploadTrigger>
          <FileUploadInput id="disabled-preview-file" disabled />
        </FileUpload>
      </div>
    </div>
  ),
}; 