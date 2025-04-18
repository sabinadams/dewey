import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { File, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"

const FileUpload = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
))
FileUpload.displayName = "FileUpload"

const FileUploadLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium text-foreground", className)}
    {...props}
  >
    {children}
  </label>
))
FileUploadLabel.displayName = "FileUploadLabel"

const FileUploadTrigger = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    inputId: string
  }
>(({ className, children, inputId, ...props }, ref) => (
  <label
    ref={ref}
    htmlFor={inputId}
    className={cn(
      "relative cursor-pointer rounded-md border border-dashed border-primary/50 bg-background p-6 shadow-sm hover:bg-muted/50 transition-colors group",
      className
    )}
    {...props}
  >
    {children}
  </label>
))
FileUploadTrigger.displayName = "FileUploadTrigger"

const FileUploadInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "file", ...props }, ref) => (
  <Input
    ref={ref}
    type={type}
    className={cn("hidden", className)}
    {...props}
  />
))
FileUploadInput.displayName = "FileUploadInput"

const FileUploadIcon = React.forwardRef<
  React.ElementRef<typeof Upload>,
  React.ComponentPropsWithoutRef<typeof Upload>
>(({ className, ...props }, ref) => (
  <Upload
    ref={ref}
    className={cn("h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors", className)}
    {...props}
  />
))
FileUploadIcon.displayName = "FileUploadIcon"

const FileUploadItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 rounded-md border bg-muted/40 p-2 text-sm", className)}
    {...props}
  >
    {children}
  </div>
))
FileUploadItem.displayName = "FileUploadItem"

const FileUploadItemIcon = React.forwardRef<
  React.ElementRef<typeof File>,
  React.ComponentPropsWithoutRef<typeof File>
>(({ className, ...props }, ref) => (
  <File
    ref={ref}
    className={cn("h-4 w-4 text-primary", className)}
    {...props}
  />
))
FileUploadItemIcon.displayName = "FileUploadItemIcon"

const FileUploadItemName = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("flex-1 truncate", className)}
    {...props}
  />
))
FileUploadItemName.displayName = "FileUploadItemName"

const FileUploadItemDeleteTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size="icon"
    className={cn("h-6 w-6", className)}
    {...props}
  >
    <span className="sr-only">Remove file</span>
    <X className="h-4 w-4" />
  </Button>
))
FileUploadItemDeleteTrigger.displayName = "FileUploadItemDeleteTrigger"

export {
  FileUpload,
  FileUploadLabel,
  FileUploadTrigger,
  FileUploadInput,
  FileUploadIcon,
  FileUploadItem,
  FileUploadItemIcon,
  FileUploadItemName,
  FileUploadItemDeleteTrigger
} 