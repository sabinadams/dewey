import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageCropModal } from "@/components/ui/image-crop-modal"
import { FileUpload, FileUploadIcon, FileUploadInput, FileUploadPreview, FileUploadTrigger } from "@/components/ui/file-upload"
import { useRef, useState, useEffect } from "react"
import { useCreateProjectContext, CreateProjectFormData, validateAndTransformConnection } from "@/contexts/create-project.context"
import { CreateProjectParams } from "@/types"
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
import { useAuth } from '@/hooks/useAuth'
import { useCreateProjectMutation } from "@/store/api/projects.api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { fileToBase64 } from "@/lib/utils"
import CreateConnectionForm from "./CreateConnectionForm"
import { ErrorCategory, KeyringSubcategory } from "@/lib/errors"
import { useErrorHandler } from '@/hooks/use-error-handler'

const CreateProjectForm = () => {
  // Track the actual file and preview URL separately from the form state
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [createProject, { isLoading: isMutationLoading }] = useCreateProjectMutation();
  const { form } = useCreateProjectContext();

  const { handleError } = useErrorHandler({
    defaultCategory: ErrorCategory.PROJECT,
    onError: (error) => {
      // Handle encryption key errors specifically
      if (error.category === ErrorCategory.KEYRING &&
          error.subcategory === KeyringSubcategory.KeyNotFound) {
        toast.error('Encryption Key Error', {
          description: 'Please set up an encryption key to continue.',
          duration: Infinity,
          dismissible: true,
          action: {
            label: 'Set Up',
            onClick: () => {
              console.log('Set Up button clicked'); // TODO: Implement actual navigation/action
            }
          }
        });
        return true; // Indicate this specific error was handled locally
      }
      // Let useErrorHandler handle other errors (show toast, throw)
      return false;
    }
  });

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

  const onSubmit = form.handleSubmit(async (data: CreateProjectFormData) => {
    const loadingToastId = toast.loading('Creating project...', {
      duration: Infinity,
    });
    try {
      const projectParams: CreateProjectParams = {
        name: data.name,
        user_id: userId || '',
      };
      if (currentFile) {
        const fileBase64 = await fileToBase64(currentFile);
        projectParams.custom_icon_data = fileBase64;
      }
      const connection = validateAndTransformConnection(data);
      if (connection) {
        projectParams.initial_connection = connection;
      }

      // Reinstate unwrap() to get promise rejection on error
      const result = await createProject(projectParams).unwrap();

      toast.dismiss(loadingToastId);
      toast.success('Project created successfully!');
      navigate(`/project/${result}`);

    } catch (error) { // This error is thrown by unwrap() and should be the AppError
      toast.dismiss(loadingToastId);

      // Call handleError. It will call onError.
      // If onError returns false, handleError shows toast and throws.
      // We catch the throw here so it doesn't propagate further.
      try {
        await handleError(error);
      } catch (handledError) {
        // Error was thrown by handleError (because onError returned false),
        // but we don't need to do anything else with it here.
        // The toast was already shown by showErrorToast inside handleError.
      }
    }
    // No finally block needed
  });

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

    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <div className="flex flex-row gap-6">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="My Project"
                          {...field}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be the display name for your project
                      </FormDescription>
                      <FormMessage className="text-sm text-destructive" />
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

          <CreateConnectionForm />

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={isMutationLoading}>
              {isMutationLoading ? "Creating..." : "Create Project"}
            </Button>
          </div>

        </div>
      </form>
    </Form>
  </>
}

export default CreateProjectForm; 