import { Card } from "@/components/ui/card";
import { FileUpload, FileUploadIcon, FileUploadInput, FileUploadPreview, FileUploadTrigger } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ImageCropModal } from "@/components/ui/image-crop-modal";

export default function CreateProjectPage() {
    const [projectName, setProjectName] = useState("");
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
        <div className="flex flex-col gap-6 w-2/3 mx-auto">
            <div>
                <h1 className="text-2xl font-bold">Create Project</h1>
                <p className="text-sm text-zinc-500">
                    Set up a new database project with AI-enhanced capabilities
                </p>
            </div>

            {selectedFile && showCropper && (
                <ImageCropModal
                    open={showCropper}
                    onClose={() => {
                        setShowCropper(false);
                        setSelectedFile(null);
                    }}
                    image={selectedFile}
                    onCropComplete={handleCropComplete}
                    aspectRatio={1}
                    cropShape="round"
                />
            )}

            <Card className="p-6">
                <div className="flex flex-row gap-6">
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="project-name" className="text-sm font-medium text-foreground">Project Name</label>
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
                                inputId="compact-file" 
                                className="p-4"
                                disabled={!!file}
                            >
                                <div className="flex items-center gap-2">
                                    <FileUploadIcon className="h-5 w-5" />
                                    <span className="text-sm font-medium text-foreground">
                                        {file ? "File already uploaded" : "Click to upload project icon"}
                                    </span>
                                </div>
                            </FileUploadTrigger>
                            <FileUploadInput 
                                id="compact-file" 
                                onChange={handleFileChange}
                                disabled={!!file}
                                accept="image/*"
                            />
                        </FileUpload>
                    </div>
                </div>
            </Card>
        </div>
    )
}