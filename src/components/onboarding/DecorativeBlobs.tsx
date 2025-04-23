import { useRef, useEffect, useState, memo } from "react"
import Blob from './Blob';

interface DecorativeBlobsProps {
  step: 'welcome' | 'ai-models' | 'keychain' | 'complete'
}

export default memo(DecorativeBlobs, (prevProps, nextProps) => prevProps.step === nextProps.step)

function DecorativeBlobs({ step }: DecorativeBlobsProps) {
  const numBlobs = useRef(2) 
  const [positions, setPositions] = useState<{ x: number; y: number; targetSide: 'left' | 'right' | 'top' | 'bottom' }[]>([])
  const [targetPositions, setTargetPositions] = useState<{ x: number; y: number; targetSide: 'left' | 'right' | 'top' | 'bottom' }[]>([])

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

  // Update target positions on step change directly
  useEffect(() => {
    setTargetPositions(Array.from({ length: numBlobs.current }, (_, i) => getRandomPosition(i)))
  }, [step])

  const getRandomSize = () => Math.random() * 200 + 300

  // Update positions immediately on targetPositions change
  useEffect(() => {
    console.log('Updating positions to target positions:', targetPositions);
    setPositions(targetPositions);
  }, [targetPositions]);

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