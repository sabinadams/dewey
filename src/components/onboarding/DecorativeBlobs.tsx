import { motion } from "framer-motion"

interface BlobProps {
  color: string
  size: number
  x: number
  y: number
  delay?: number
}

const Blob = ({ color, size, x, y, delay = 0 }: BlobProps) => {
  return (
    <motion.div
      initial={{ x: '0%', y: '0%', width: size, height: size, backgroundColor: color }}
      animate={{
        x: `${x}%`,
        y: `${y}%`,
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.4,
        scale: 1,
      }}
      transition={{
        duration: 1.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute rounded-full"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(50px)',
        mixBlendMode: 'screen',
      }}
    />
  )
}

interface DecorativeBlobsProps {
  step: 'welcome' | 'ai-models' | 'keychain' | 'complete'
}

export default function DecorativeBlobs({ step }: DecorativeBlobsProps) {
  const blobs = {
    welcome: [
      { color: 'hsl(210, 100%, 50%)', size: 400, x: -40, y: -30, delay: 0 },
      { color: 'hsl(210, 100%, 50%)', size: 350, x: 40, y: 30, delay: 0.1 },
    ],
    'ai-models': [
      { color: 'hsl(220, 100%, 50%)', size: 380, x: -35, y: -20, delay: 0 },
      { color: 'hsl(220, 100%, 50%)', size: 320, x: 35, y: 20, delay: 0.1 },
    ],
    keychain: [
      { color: 'hsl(230, 100%, 50%)', size: 360, x: -30, y: -10, delay: 0 },
      { color: 'hsl(230, 100%, 50%)', size: 340, x: 30, y: 10, delay: 0.1 },
    ],
    complete: [
      { color: 'hsl(240, 100%, 50%)', size: 400, x: -20, y: -20, delay: 0 },
      { color: 'hsl(240, 100%, 50%)', size: 350, x: 20, y: 20, delay: 0.1 },
    ],
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs[step].map((blob, index) => (
        <Blob key={`${step}-${index}`} {...blob} />
      ))}
    </div>
  )
} 