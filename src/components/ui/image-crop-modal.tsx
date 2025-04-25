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

  const onCropCompleteCallback = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  const createCroppedImage = async () => {
    if (!croppedAreaPixels) return

    try {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, image.name)
      onCropComplete(croppedImage)
      onClose()
    } catch (e) {
      // Log the error; ErrorBoundary will show a toast.
      console.error('Failed to crop image:', e);
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
              onCropChange={setCrop}
              onCropComplete={onCropCompleteCallback}
              onZoomChange={setZoom}
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
          <Button onClick={createCroppedImage}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to create an image element from a URL
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })

// Simplified function to get a high-quality cropped image
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  fileName: string
): Promise<File> {
  const image = await createImage(imageSrc)
  
  const finalSize = 160 // Final size for the output image (doubled for high-DPI screens)
  
  // Create canvas setup for high quality
  const canvas = document.createElement('canvas')
  canvas.width = finalSize
  canvas.height = finalSize
  
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Failed to get canvas context')
  }
  
  // Set up for high quality
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  
  // Fill with white background for transparent images
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Draw the cropped image directly with high quality
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    finalSize,
    finalSize
  )
  
  // Configure output as PNG for best quality
  const outputFormat = 'image/png'
  const fileExt = '.png'
  
  // Create appropriate filename
  const newFileName = fileName.includes('.')
    ? fileName.replace(/\.[^/.]+$/, fileExt)
    : `${fileName}${fileExt}`
  
  // Convert canvas to blob with high quality
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        
        const croppedFile = new File([blob], newFileName, {
          type: outputFormat,
          lastModified: Date.now(),
        })
        
        resolve(croppedFile)
      },
      outputFormat,
      1.0  // Maximum quality
    )
  })
} 