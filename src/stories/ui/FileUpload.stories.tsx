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
  FileUploadItemDeleteTrigger
} from "@/components/ui/file-upload";

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