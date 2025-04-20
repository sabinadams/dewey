import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface Point {
  x: number
  y: number
}

interface Area {
  x: number
  y: number
  width: number
  height: number
}

interface ImageCropModalProps {
  open: boolean
  onClose: () => void
  image: File
  onCropComplete: (croppedImage: File) => void
  aspectRatio?: number
  cropShape?: 'rect' | 'round'
}

export function ImageCropModal({
  open,
  onClose,
  image,
  onCropComplete,
  aspectRatio = 1,
  cropShape = 'rect'
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  // Create a URL for the image when the component mounts
  React.useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image)
      setImageUrl(url)
      
      // Clean up the URL when the component unmounts
      return () => {
        URL.revokeObjectURL(url)
      }
    }
  }, [image])

  const onCropChange = (crop: Point) => {
    setCrop(crop)
  }

  const onZoomChange = (zoom: number) => {
    setZoom(zoom)
  }

  const onCropCompleteCallback = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  const createCroppedImage = async () => {
    if (!croppedAreaPixels) return

    try {
      const croppedImage = await getCroppedImg(
        imageUrl,
        croppedAreaPixels,
        0,
        image.name
      )
      onCropComplete(croppedImage)
      onClose()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="relative h-[300px] w-full my-4">
          {imageUrl && (
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              cropShape={cropShape}
              onCropChange={onCropChange}
              onCropComplete={onCropCompleteCallback}
              onZoomChange={onZoomChange}
            />
          )}
        </div>
        <div className="my-4">
          <div className="text-sm mb-2">Zoom</div>
          <Slider 
            min={1} 
            max={3} 
            step={0.1} 
            value={[zoom]} 
            onValueChange={(value) => setZoom(value[0])}
          />
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="dark:text-foreground"
          >
            Cancel
          </Button>
          <Button 
            onClick={createCroppedImage}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to create a cropped image
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })

// Helper function to get the cropped image
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  fileName: string
): Promise<File> {
  // Since SVGs are handled in the component directly, this function now only handles raster images
  
  const image = await createImage(imageSrc);
  
  // Use a larger intermediate canvas size for better quality
  // We'll use a constant size that's large enough for most images while being reasonable for memory
  const MAX_DIMENSION = 1024; // Maximum dimension for the intermediate canvas
  
  // Calculate the largest possible dimensions while maintaining aspect ratio
  const cropAspect = pixelCrop.width / pixelCrop.height;
  let intermediateWidth, intermediateHeight;
  
  if (cropAspect >= 1) { // Width >= Height
    intermediateWidth = Math.min(pixelCrop.width, MAX_DIMENSION);
    intermediateHeight = intermediateWidth / cropAspect;
  } else { // Height > Width
    intermediateHeight = Math.min(pixelCrop.height, MAX_DIMENSION);
    intermediateWidth = intermediateHeight * cropAspect;
  }
  
  // Round to integers
  intermediateWidth = Math.round(intermediateWidth);
  intermediateHeight = Math.round(intermediateHeight);
  
  // First, create a canvas that matches the crop dimensions to maintain quality
  const canvas = document.createElement('canvas');
  canvas.width = intermediateWidth;
  canvas.height = intermediateHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  
  // Clear canvas with white (for transparent PNGs that need a background)
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'source-over'; // Reset to default
  
  // Enable high-quality image scaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Draw the cropped portion at intermediate resolution
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    intermediateWidth,
    intermediateHeight
  );
  
  // Now create the final canvas for the 80x80 output
  const finalCanvas = document.createElement('canvas');
  const finalSize = 160; // Double the final display size for better quality on high-DPI screens
  finalCanvas.width = finalSize;
  finalCanvas.height = finalSize;
  
  const finalCtx = finalCanvas.getContext('2d');
  if (!finalCtx) {
    throw new Error('Failed to get final canvas context');
  }
  
  // Use better quality settings for the resize
  finalCtx.imageSmoothingEnabled = true;
  finalCtx.imageSmoothingQuality = 'high';
  
  // Draw the intermediate canvas onto the final canvas, resizing to the final size
  finalCtx.drawImage(
    canvas,
    0, 0, intermediateWidth, intermediateHeight,
    0, 0, finalSize, finalSize
  );
  
  // Determine output format - use PNG for higher quality
  const outputFormat = 'image/png';
  const fileExt = '.png';
  
  // Create appropriate filename
  const newFileName = fileName.includes('.')
    ? fileName.replace(/\.[^/.]+$/, fileExt)
    : `${fileName}${fileExt}`;
  
  // Convert canvas to blob with high quality
  return new Promise((resolve, reject) => {
    finalCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        
        const croppedFile = new File([blob], newFileName, {
          type: outputFormat,
          lastModified: Date.now(),
        });
        
        resolve(croppedFile);
      },
      outputFormat,
      1.0  // Use maximum quality
    );
  });
} 