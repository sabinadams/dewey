import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageCropModal } from "@/components/ui/image-crop-modal"
import { FileUpload, FileUploadIcon, FileUploadInput, FileUploadPreview, FileUploadTrigger } from "@/components/ui/file-upload"
import { useRef, useState, useEffect } from "react"
import { useCreateProjectContext } from "@/contexts/create-project.context"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { invoke } from '@tauri-apps/api/core'
import { z } from 'zod'
import { ControllerRenderProps } from 'react-hook-form'
import { useAppSelector } from "@/store/hooks"

// Define the form schema to match the one in create-project.context.tsx
const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  icon: z.string().optional(),
})

// Create a type for the form data
type FormData = z.infer<typeof formSchema>

const CreateProjectForm = () => {
  // Track the actual file and preview URL separately from the form state
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector(state => 
    state.auth.user
  );

  const { form } = useCreateProjectContext();
  
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

      setCurrentFile(file);
      form.setValue("icon", url);
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
    setCurrentFile(croppedFile);
    form.setValue("icon", url);
    setPreviewUrl(url);
    setShowCropper(false);
    setSelectedFile(null);
  };

  const handleFileDelete = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setCurrentFile(null);
    form.setValue("icon", "");
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

  /**
   * Convert a File to a base64 string
   */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const onSubmit = form.handleSubmit(async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Create the project with or without a custom icon
      const projectParams: Record<string, any> = {
        name: data.name,
        user_id: user?.id
      };
      
      // If there's a file to upload, add it to the project params
      if (currentFile) {
        // Convert file to base64 string for Rust backend
        const fileBase64 = await fileToBase64(currentFile);
        
        // Add the custom icon data to the params
        projectParams.custom_icon_data = fileBase64;
      }

      // Create the project in the database and save the icon in one operation
      const projectId = await invoke<number>('create_project', projectParams);

      console.log("Project created with ID:", projectId);
      
      // Here you might want to redirect to the new project
      // or show a success message
      
      // Reset the form
      form.reset();
      handleFileDelete();
      
    } catch (error) {
      console.error("Error creating project:", error);
      // Handle error (show error message, etc.)
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <>
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

      <Form {...form}>
        <form onSubmit={onSubmit}>
          <Card className="p-6">
            <div className="flex flex-row gap-6">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: { field: ControllerRenderProps<FormData, "name"> }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Project" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be the display name for your project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex flex-col gap-2 justify-center">
                {/* Don't use FormField for file upload - manage directly */}
                <FileUpload>
                  {currentFile && previewUrl ? (
                    <FileUploadPreview
                      fileName={currentFile.name}
                      fileUrl={previewUrl}
                      fileType={currentFile.type}
                      onDelete={handleFileDelete}
                      size="icon"
                    />
                  ) : (
                    <>
                      <FileUploadTrigger
                        inputId="compact-file"
                        className="p-4"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <FileUploadIcon className="h-5 w-5" />
                            <span className="text-sm font-medium text-foreground">
                              Click to upload project icon
                            </span>
                          </div>
                        </div>
                      </FileUploadTrigger>

                      <FileUploadInput
                        key={fileInputKey}
                        ref={fileInputRef}
                        id="compact-file"
                        onChange={handleFileChange}
                        accept="image/*,.svg"
                      />
                    </>
                  )}
                </FileUpload>
              </div>
            </div>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default CreateProjectForm 