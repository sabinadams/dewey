import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageCropModal } from "@/components/ui/image-crop-modal"
import { FileUpload, FileUploadIcon, FileUploadInput, FileUploadPreview, FileUploadTrigger } from "@/components/ui/file-upload"
import { useRef, useState, useEffect } from "react"
import { useCreateProjectContext, CreateProjectFormData, validateAndTransformConnection } from "@/contexts/create-project.context"
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
import { useAppSelector } from "@/hooks/useStore"
import { useCreateProjectMutation } from "@/store/api/projects.api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { fileToBase64 } from "@/lib/utils"
import { selectAuthUser } from "@/store/selectors"
import CreateConnectionForm from "./CreateConnectionForm"

const CreateProjectForm = () => {
  // Track the actual file and preview URL separately from the form state
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector(selectAuthUser);
  const navigate = useNavigate();
  const [createProject] = useCreateProjectMutation();

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

  const onSubmit = form.handleSubmit(async (data: CreateProjectFormData) => {
    try {
      const loadingToastId = toast.loading('Creating project...', {
        duration: Infinity,
      });

      // Create the project params object
      const projectParams = {
        name: data.name,
        user_id: user?.id || '',
      } as any;

      // If there's a file to upload, add it to the project params
      if (currentFile) {
        const fileBase64 = await fileToBase64(currentFile);
        projectParams.custom_icon_data = fileBase64;
      }

      // Validate and transform connection data if present
      const connection = validateAndTransformConnection(data);
      if (connection) {
        projectParams.initial_connection = connection;
      }

      // Create the project using RTK Query mutation
      const result = await createProject(projectParams).unwrap();
      
      toast.dismiss(loadingToastId);
      toast.success('Project created successfully!');
      
      // Navigate to the new project
      navigate(`/project/${result}`);
    } catch (error) {
      toast.error('Failed to create project. Please try again.');
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <Card className="p-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={() => (
                <FormItem>
                  <FormLabel>Project Icon</FormLabel>
                  <FormControl>
                    <FileUpload>
                      <FileUploadInput
                        ref={fileInputRef}
                        key={fileInputKey}
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {!previewUrl ? (
                        <FileUploadTrigger>
                          <FileUploadIcon />
                          <span>Upload Icon</span>
                        </FileUploadTrigger>
                      ) : (
                        <FileUploadPreview
                          src={previewUrl}
                          onDelete={handleFileDelete}
                        />
                      )}
                    </FileUpload>
                  </FormControl>
                  <FormDescription>
                    Upload a custom icon for your project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <CreateConnectionForm />

        <Button type="submit" className="w-full">
          Create Project
        </Button>
      </form>

      {showCropper && selectedFile && (
        <ImageCropModal
          file={selectedFile}
          onComplete={handleCropComplete}
          onClose={handleCloseCropper}
          aspect={1}
        />
      )}
    </Form>
  );
}

export default CreateProjectForm; 