import { motion } from "framer-motion";

interface BlobProps {
  color: string;
  size: number;
  x: number;
  y: number;
  delay?: number;
  targetSide: 'left' | 'right' | 'top' | 'bottom';
  index: number;
  currentX?: number;
  currentY?: number;
}

const Blob = ({ color, size, x, y, delay = 0, currentX = 0, currentY = 0 }: BlobProps) => {
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
        scale: 1
      }}
      animate={{
        x: `${x}%`,
        y: `${y}%`,
        scale: 1
      }}
      transition={{
        duration: 1.5,
        delay,
        ease: "easeInOut",
        type: "tween"
      }}
    />
  );
};

export default Blob; 