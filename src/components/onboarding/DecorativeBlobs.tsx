import { motion } from "framer-motion"
import { useMemo, useRef, useEffect } from "react"

interface BlobProps {
  color: string
  size: number
  x: number
  y: number
  delay?: number
  targetSide: 'left' | 'right' | 'top' | 'bottom'
  index: number
  currentX?: number
  currentY?: number
}

const Blob = ({ color, size, x, y, delay = 0, targetSide, index, currentX = 0, currentY = 0 }: BlobProps) => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.4,
        filter: 'blur(50px)',
        mixBlendMode: 'screen',
        borderRadius: '50%',
      }}
      initial={{
        x: `${currentX}%`,
        y: `${currentY}%`,
      }}
      animate={{
        x: `${x}%`,
        y: `${y}%`,
      }}
      transition={{
        duration: 1.5,
        delay,
        ease: "easeInOut",
        type: "tween"
      }}
    />
  )
}

interface DecorativeBlobsProps {
  step: 'welcome' | 'ai-models' | 'keychain' | 'complete'
}

type Range = [number, number]

export default function DecorativeBlobs({ step }: DecorativeBlobsProps) {
  const currentPositions = useRef<{ x: number; y: number }[]>([])
  const targetPositions = useRef<{ x: number; y: number; targetSide: 'left' | 'right' | 'top' | 'bottom' }[]>([])
  const numBlobs = useRef(4) // Always 4 blobs, one for each side
  const previousStep = useRef(step)

  const getRandomPosition = (index: number): { x: number; y: number; targetSide: 'left' | 'right' | 'top' | 'bottom' } => {
    // Define position ranges
    const ranges = {
      x: [-95, 95] as Range,
      y: [-95, 95] as Range
    }

    // Get current position
    const currentPos = currentPositions.current[index] || { x: 0, y: 0 }

    // Generate new position ensuring it's different from current
    let newPosition: { x: number; y: number; targetSide: 'left' | 'right' | 'top' | 'bottom' }
    let attempts = 0
    const maxAttempts = 20

    do {
      // Generate position based on index to ensure one blob per side
      switch (index) {
        case 0: // Left side
          newPosition = {
            x: Math.random() * (0 - ranges.x[0]) + ranges.x[0],
            y: Math.random() * (ranges.y[1] - ranges.y[0]) + ranges.y[0],
            targetSide: 'left'
          }
          break
        case 1: // Right side
          newPosition = {
            x: Math.random() * (ranges.x[1] - 0) + 0,
            y: Math.random() * (ranges.y[1] - ranges.y[0]) + ranges.y[0],
            targetSide: 'right'
          }
          break
        case 2: // Top side
          // Ensure this blob stays on the left side
          newPosition = {
            x: Math.random() * (0 - ranges.x[0]) + ranges.x[0],
            y: Math.random() * (0 - ranges.y[0]) + ranges.y[0],
            targetSide: 'top'
          }
          break
        case 3: // Bottom side
          // Ensure this blob stays on the right side
          newPosition = {
            x: Math.random() * (ranges.x[1] - 0) + 0,
            y: Math.random() * (ranges.y[1] - 0) + 0,
            targetSide: 'bottom'
          }
          break
        default:
          newPosition = {
            x: Math.random() * (ranges.x[1] - ranges.x[0]) + ranges.x[0],
            y: Math.random() * (ranges.y[1] - ranges.y[0]) + ranges.y[0],
            targetSide: 'left'
          }
      }

      attempts++
    } while (
      attempts < maxAttempts && 
      Math.abs(newPosition.x - currentPos.x) < 60 && 
      Math.abs(newPosition.y - currentPos.y) < 60
    )

    return newPosition
  }

  // Initialize positions if they don't exist
  useEffect(() => {
    if (currentPositions.current.length === 0) {
      currentPositions.current = Array.from({ length: numBlobs.current }, (_, i) => {
        const pos = getRandomPosition(i)
        return { x: pos.x, y: pos.y }
      })
      targetPositions.current = currentPositions.current.map(pos => ({
        ...pos,
        targetSide: 'left' as const
      }))
    }
  }, [])

  // Update target positions when step changes
  useEffect(() => {
    if (previousStep.current !== step) {
      targetPositions.current = Array.from({ length: numBlobs.current }, (_, i) => getRandomPosition(i))
      previousStep.current = step
    }
  }, [step])

  const blobs = useMemo(() => {
    const getRandomSize = () => {
      return Math.random() * 200 + 300
    }

    // Generate blobs for each step with the same positions
    const generateBlobs = (hue: number) => 
      targetPositions.current.map((pos, i) => ({
        color: `hsl(${hue}, 100%, 50%)`,
        size: getRandomSize(),
        ...pos,
        index: i,
        delay: i * 0.1, // Consistent delay based on index
        currentX: currentPositions.current[i]?.x || 0,
        currentY: currentPositions.current[i]?.y || 0
      }))

    return {
      welcome: generateBlobs(210),
      'ai-models': generateBlobs(220),
      keychain: generateBlobs(230),
      complete: generateBlobs(240),
    }
  }, [step])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {blobs[step].map((blob, index) => (
        <Blob key={`${step}-${index}`} {...blob} />
      ))}
    </div>
  )
} 