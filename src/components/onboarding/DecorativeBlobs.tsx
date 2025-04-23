import { motion } from "framer-motion"
import { useMemo, useRef, useEffect, useState } from "react"
import React from "react"

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

export default function DecorativeBlobs({ step }: DecorativeBlobsProps) {
  const numBlobs = useRef(2) 
  const [positions, setPositions] = useState<{ x: number; y: number; targetSide: 'left' | 'right' | 'top' | 'bottom' }[]>([])
  const [targetPositions, setTargetPositions] = useState<{ x: number; y: number; targetSide: 'left' | 'right' | 'top' | 'bottom' }[]>([])
  const [debouncedStep, setDebouncedStep] = useState(step)

  const getRandomPosition = (index: number): { x: number; y: number; targetSide: 'left' | 'right' | 'top' | 'bottom' } => {
    const ranges: [number, number] = [-95, 95]

    let newPosition: { x: number; y: number; targetSide: 'left' | 'right' | 'top' | 'bottom' }

    switch (index) {
      case 0: // Left side
        newPosition = {
          x: Math.random() * (0 - ranges[0]) + ranges[0],
          y: Math.random() * (ranges[1] - ranges[0]) + ranges[0],
          targetSide: 'left'
        }
        break
      case 1: // Right side
        newPosition = {
          x: Math.random() * (ranges[1] - 0) + 0,
          y: Math.random() * (ranges[1] - ranges[0]) + ranges[0],
          targetSide: 'right'
        }
        break
      default:
        newPosition = {
          x: Math.random() * (ranges[1] - ranges[0]) + ranges[0],
          y: Math.random() * (ranges[1] - ranges[0]) + ranges[0],
          targetSide: 'left'
        }
    }

    return newPosition
  }

  // Initialize positions on mount
  useEffect(() => {
    if (positions.length === 0) {
      const initialPositions = Array.from({ length: numBlobs.current }, (_, i) => getRandomPosition(i))
      setPositions(initialPositions)
      setTargetPositions(initialPositions)
    }
  }, [])

  // Debounce step changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedStep(step)
    }, 300) // Adjust the debounce delay as needed

    return () => clearTimeout(handler)
  }, [step])

  // Update target positions on debounced step change
  useEffect(() => {
    setTargetPositions(Array.from({ length: numBlobs.current }, (_, i) => getRandomPosition(i)))
  }, [debouncedStep])

  const getRandomSize = () => Math.random() * 200 + 300

  // Update current positions after animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPositions(targetPositions)
    }, 1500) // Match the animation duration

    return () => clearTimeout(timeout)
  }, [targetPositions])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {positions.map((pos, index) => (
        <Blob
          key={`${step}-${index}`}
          color={`hsl(${210 + index * 10}, 100%, 50%)`}
          size={getRandomSize()}
          index={index}
          currentX={pos.x}
          currentY={pos.y}
          x={targetPositions[index]?.x || pos.x}
          y={targetPositions[index]?.y || pos.y}
          targetSide={pos.targetSide}
        />
      ))}
    </div>
  )
} 