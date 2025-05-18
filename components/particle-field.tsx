"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Canvas } from "@react-three/fiber"
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei"
import type * as THREE from "three"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ParticleField() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <Canvas
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 15], fov: 50, near: 0.1, far: 2000 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Particles count={isMobile ? 500 : 2000} />
    </Canvas>
  )
}

interface ParticlesProps {
  count: number
}

function Particles({ count }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate particles with fewer calculations
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Simpler positioning
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20

      // Simplified colors
      colors[i3] = 0.5 + Math.random() * 0.5 // Blue
      colors[i3 + 1] = 0.5 + Math.random() * 0.5 // Green
      colors[i3 + 2] = 1.0 // Full blue

      // Smaller sizes
      sizes[i] = Math.random() * 1.5 + 0.5
    }

    return { positions, colors, sizes }
  }, [count])

  // Simplified animation
  useFrame((state) => {
    if (!pointsRef.current) return

    // Just rotate the entire system
    pointsRef.current.rotation.y += 0.001
    pointsRef.current.rotation.x += 0.0005
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute attach="attributes-size" count={particles.sizes.length} array={particles.sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  )
}
