import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageCropModal } from "@/components/ui/image-crop-modal"
import { FileUpload, FileUploadIcon, FileUploadInput, FileUploadPreview, FileUploadTrigger } from "@/components/ui/file-upload"
import { useState, useRef, useEffect } from "react"


const CreateProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up preview URL when component unmounts
  useEffect(() => {
      return () => {
          if (previewUrl) {
              URL.revokeObjectURL(previewUrl);
          }
      };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      
      const file = e.target.files[0];
      const isSvg = file.name.toLowerCase().endsWith('.svg') || file.type === 'image/svg+xml';
      
      if (isSvg) {
          // SVGs don't need cropping
          if (previewUrl) URL.revokeObjectURL(previewUrl);
          const url = URL.createObjectURL(file);
          
          setFile(file);
          setPreviewUrl(url);
      } else {
          // Raster images go through the cropper
          setSelectedFile(file);
          setShowCropper(true);
      }
  };

  const handleCropComplete = (croppedFile: File) => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      
      const url = URL.createObjectURL(croppedFile);
      setFile(croppedFile);
      setPreviewUrl(url);
      setShowCropper(false);
      setSelectedFile(null);
  };

  const handleFileDelete = () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      
      setFile(null);
      setPreviewUrl(null);
      setFileInputKey(prev => prev + 1);
      
      if (fileInputRef.current) {
          fileInputRef.current.value = '';
      }
  };

  const handleCloseCropper = () => {
      setShowCropper(false);
      setSelectedFile(null);
  };

  return <>
    {selectedFile && showCropper && (
      <ImageCropModal
        open={showCropper}
        onClose={handleCloseCropper}
        image={selectedFile}
        onCropComplete={handleCropComplete}
        aspectRatio={1}
        cropShape="round"
      />
    )}

    <Card className="p-6">
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="project-name" className="text-sm font-medium text-foreground">
            Project Name
          </label>
          <Input
            id="project-name"
            placeholder="My Project"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            This will be the display name for your project
          </p>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <FileUpload>
            {file && previewUrl && (
              <FileUploadPreview
                fileName={file.name}
                fileUrl={previewUrl}
                fileType={file.type}
                onDelete={handleFileDelete}
                size="icon"
              />
            )}

            <FileUploadTrigger
              inputId="compact-file"
              className="p-4"
              disabled={!!file}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FileUploadIcon className="h-5 w-5" />
                  <span className="text-sm font-medium text-foreground">
                    {file ? "File already uploaded" : "Click to upload project icon"}
                  </span>
                </div>
              </div>
            </FileUploadTrigger>

            <FileUploadInput
              key={fileInputKey}
              ref={fileInputRef}
              id="compact-file"
              onChange={handleFileChange}
              disabled={!!file}
              accept="image/*,.svg"
            />
          </FileUpload>
        </div>
      </div>
    </Card>
  </>
}

export default CreateProjectForm 