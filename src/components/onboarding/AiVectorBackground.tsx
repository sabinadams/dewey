import { useEffect, useRef, useState } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface Connection {
  source: number
  target: number
  strength: number
}

interface DataPacket {
  connectionIndex: number
  progress: number
  speed: number
  size: number
  hue: string // Added hue property for color variation
}

export default function AIVectorBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 })
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([])
  const animationRef = useRef<number>(0)
  const lastPacketTime = useRef<number>(0)
  const [initialized, setInitialized] = useState(false)

  // Color options for data packets
  const packetColors = ["#00FFFF", "#7DF9FF", "#48D1CC", "#00CED1", "#5F9EA0"]

  // Initialize nodes and connections
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    // Initial dimensions update
    updateDimensions()

    // Add resize listener
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, []) // Empty dependency array since we only want to set up the listener once

  // Update nodes when dimensions change
  useEffect(() => {
    if (!containerRef.current) return

    const { width, height } = dimensions
    const targetNodeCount = Math.floor((width * height) / 25000)
    const currentNodeCount = nodes.length

    if (currentNodeCount < targetNodeCount) {
      // Add new nodes
      const newNodes = [...nodes]
      const nodesToAdd = targetNodeCount - currentNodeCount

      for (let i = 0; i < nodesToAdd; i++) {
        newNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2.5 + 1.5,
        })
      }

      setNodes(newNodes)
    } else if (currentNodeCount > targetNodeCount) {
      // Remove excess nodes
      const nodesToKeep = nodes.slice(0, targetNodeCount)
      setNodes(nodesToKeep)
    }

    // Update connections
    const newConnections: Connection[] = []
    const connectionDistance = Math.min(width, height) / 4

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          newConnections.push({
            source: i,
            target: j,
            strength: 1 - distance / connectionDistance,
          })
        }
      }
    }

    setConnections(newConnections)
    setInitialized(true)
  }, [dimensions]) // Only update nodes when dimensions change

  // Create new data packets occasionally
  const createDataPacket = () => {
    if (connections.length === 0) return

    // Only create a new packet if we don't have too many already
    if (dataPackets.length < 10) {
      const connectionIndex = Math.floor(Math.random() * connections.length)
      const randomColorIndex = Math.floor(Math.random() * packetColors.length)

      setDataPackets((prev) => [
        ...prev,
        {
          connectionIndex,
          progress: 0,
          speed: 0.005 + Math.random() * 0.01, // Random speed
          size: 1.5 + Math.random() * 1.5, // Random size
          hue: packetColors[randomColorIndex], // Random color from our palette
        },
      ])
    }
  }

  // Animation loop
  useEffect(() => {
    if (!initialized) return

    const animate = (timestamp: number) => {
      // Move nodes
      setNodes((prevNodes) => {
        return prevNodes.map((node) => {
          let newX = node.x + node.vx
          let newY = node.y + node.vy

          // Bounce off edges
          if (newX < 0 || newX > dimensions.width) {
            node.vx *= -1
            newX = node.x + node.vx
          }

          if (newY < 0 || newY > dimensions.height) {
            node.vy *= -1
            newY = node.y + node.vy
          }

          return {
            ...node,
            x: newX,
            y: newY,
          }
        })
      })

      // Create new data packets occasionally
      if (timestamp - lastPacketTime.current > 800) {
        // Create a new packet roughly every 800ms
        createDataPacket()
        lastPacketTime.current = timestamp
      }

      // Move data packets along connections
      setDataPackets((prev) => {
        return prev
          .map((packet) => ({
            ...packet,
            progress: packet.progress + packet.speed,
          }))
          .filter((packet) => packet.progress < 1) // Remove packets that have completed their journey
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions, initialized, connections.length])

  // Calculate position of a data packet along its connection
  const getPacketPosition = (packet: DataPacket) => {
    const connection = connections[packet.connectionIndex]
    if (!connection) return { x: 0, y: 0 }

    const sourceNode = nodes[connection.source]
    const targetNode = nodes[connection.target]
    if (!sourceNode || !targetNode) return { x: 0, y: 0 }

    // Linear interpolation between source and target nodes
    return {
      x: sourceNode.x + (targetNode.x - sourceNode.x) * packet.progress,
      y: sourceNode.y + (targetNode.y - sourceNode.y) * packet.progress,
    }
  }

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden bg-transparent">
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute top-0 left-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Connections between nodes */}
        {connections.map((connection, index) => {
          const source = nodes[connection.source]
          const target = nodes[connection.target]
          if (!source || !target) return null

          return (
            <line
              key={`connection-${index}`}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              className="stroke-primary"
              strokeWidth={connection.strength * 0.8}
              opacity={connection.strength * 0.15}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node, index) => (
          <circle
            key={`node-${index}`}
            cx={node.x}
            cy={node.y}
            r={node.radius}
            className="fill-primary"
            opacity={0.3}
          />
        ))}

        {/* Solid rings around some nodes */}
        {nodes
          .filter((_, i) => i % 4 === 0)
          .map((node, index) => (
            <circle
              key={`ring-${index}`}
              cx={node.x}
              cy={node.y}
              r={node.radius * 2.5}
              className="stroke-primary"
              fill="none"
              strokeWidth="0.5"
              opacity={0.2}
            />
          ))}

        {/* Data packets moving along connections */}
        {dataPackets.map((packet, index) => {
          const position = getPacketPosition(packet)
          return (
            <g key={`packet-${index}`}>
              {/* Glow effect */}
              <circle
                cx={position.x}
                cy={position.y}
                r={packet.size * 2}
                className="fill-primary"
                opacity={0.2}
                style={{ filter: "blur(2px)" }}
              />
              {/* Bright center */}
              <circle 
                cx={position.x} 
                cy={position.y} 
                r={packet.size} 
                className="fill-primary"
                opacity={0.6} 
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

