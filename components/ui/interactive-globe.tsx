"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

interface InteractiveGlobeProps {
  className?: string
  size?: number
  color?: string
  speed?: number
  distort?: number
  points?: number
}

export default function InteractiveGlobe({
  className = "",
  size = 200,
  color = "#5f86ff",
  speed = 0.5,
  distort = 0.3,
  points = 50,
}: InteractiveGlobeProps) {
  const [hovered, setHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hovered) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    setRotation({ x: y * 0.5, y: x * 0.5 })
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Globe rotation={rotation} color={color} speed={speed} distort={distort} points={points} hovered={hovered} />
      </Canvas>
    </div>
  )
}

interface GlobeProps {
  rotation: { x: number; y: number }
  color: string
  speed: number
  distort: number
  points: number
  hovered: boolean
}

function Globe({ rotation, color, speed, distort, points, hovered }: GlobeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Simplified animation
  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Auto rotation (slower)
    meshRef.current.rotation.y += delta * speed * 0.2

    // Interactive rotation (simplified)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotation.x, 0.05)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotation.y, 0.05)
  })

  return (
    <group>
      <Sphere ref={meshRef} args={[1, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={hovered ? distort : distort * 0.5}
          speed={speed * 0.5}
          metalness={0.8}
          roughness={0.2}
          opacity={0.8}
          transparent
        />
      </Sphere>
    </group>
  )
}
