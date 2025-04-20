import { Card } from "@/components/ui/card";
import { FileUpload, FileUploadIcon, FileUploadInput, FileUploadPreview, FileUploadTrigger } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { ImageCropModal } from "@/components/ui/image-crop-modal";

export default function CreateProjectPage() {
    const [projectName, setProjectName] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [showCropper, setShowCropper] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileInputKey, setFileInputKey] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Clean up preview URL when component unmounts
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Check if it's an SVG
            const isSvg = file.name.toLowerCase().endsWith('.svg') || file.type === 'image/svg+xml';
            
            // If it's SVG, skip cropping and use the original file
            if (isSvg) {
                setFile(file);
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            } else {
                // For raster images, open the cropper
                setSelectedFile(file);
                setShowCropper(true);
            }
        }
    };

    const handleCropComplete = (croppedFile: File) => {
        // Clean up old preview URL if exists
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        
        setFile(croppedFile);
        const url = URL.createObjectURL(croppedFile);
        setPreviewUrl(url);
        setShowCropper(false);
        setSelectedFile(null);
    };

    const handleFileDelete = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setFile(null);
        setPreviewUrl(null);
        
        // Reset the file input by updating its key
        setFileInputKey(prev => prev + 1);
        
        // Also reset the input value if using a ref
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
        </div>
    )
}