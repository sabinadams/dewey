import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface GradientIconProps {
  /** The Lucide icon component to render */
  icon: LucideIcon
  /** Size in pixels (both width and height). Defaults to 24. */
  size?: number
  /** Optional className to apply to the container */
  className?: string
  /** Optional gradient configuration. Can be customized later if needed */
  gradient?: {
    from: string
    to: string
  }
}

/**
 * GradientIcon applies a gradient to any Lucide icon using SVG masking.
 * This ensures the gradient is applied consistently across all parts of the icon.
 */
export const GradientIcon = React.forwardRef<
  SVGSVGElement,
  GradientIconProps
>(({
  icon: Icon,
  size = 24,
  className,
  gradient = {
    from: "rgb(168, 85, 247)",  // purple-500
    to: "rgb(20, 184, 166)",    // teal-500
  }
}, ref) => {
  const id = React.useId()
  
  return (
    <div className={cn("inline-block", className)}>
      <svg width={size} height={size} viewBox="0 0 24 24" ref={ref}>
        <defs>
          <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradient.from} />
            <stop offset="100%" stopColor={gradient.to} />
          </linearGradient>
          <mask id={`mask-${id}`}>
            <Icon size={24} className="text-white" />
          </mask>
        </defs>
        <rect 
          width="24" 
          height="24" 
          fill={`url(#gradient-${id})`}
          mask={`url(#mask-${id})`}
        />
      </svg>
    </div>
  )
})

GradientIcon.displayName = "GradientIcon" 