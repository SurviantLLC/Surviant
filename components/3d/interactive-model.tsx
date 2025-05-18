"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, Html, Text } from "@react-three/drei"
import * as THREE from "three"
import { useSpring, animated } from "@react-spring/three"

interface InteractiveModelProps {
  modelPath: string
  position?: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  hotspots?: Hotspot[]
}

interface Hotspot {
  id: string
  position: [number, number, number]
  title: string
  description: string
}

export default function InteractiveModel({
  modelPath,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  hotspots = [],
}: InteractiveModelProps) {
  const { scene, nodes, materials } = useGLTF(modelPath, true, true, (error) => {
    console.error(`Error loading model ${modelPath}:`, error)
  })
  const modelRef = useRef<THREE.Group>(null)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const [hovered, setHovered] = useState(false)

  // Clone and prepare the model
  useEffect(() => {
    if (!modelRef.current) return

    // Apply materials and settings to the model
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [])

  // Spring animation for hover effect
  const [springs, api] = useSpring(() => ({
    scale: scale,
    rotation: rotation,
    config: { mass: 1, tension: 280, friction: 60 },
  }))

  // Update on hover
  useEffect(() => {
    api.start({
      scale: hovered ? scale * 1.05 : scale,
      rotation: hovered ? [rotation[0], rotation[1] + Math.PI * 0.1, rotation[2]] : rotation,
    })
  }, [hovered, api, scale, rotation])

  // Animation loop
  useFrame((state) => {
    if (!modelRef.current) return

    // Gentle floating animation
    const time = state.clock.getElapsedTime()
    modelRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1
  })

  // Check if scene is available, if not render a fallback
  if (!scene) {
    return (
      <group position={position}>
        <mesh scale={scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#5f86ff" />
        </mesh>
        <Text position={[0, 1.5, 0]} fontSize={0.5} color="white">
          Model Failed to Load
        </Text>
      </group>
    )
  }

  return (
    <group position={position}>
      <animated.group
        ref={modelRef}
        scale={springs.scale}
        rotation={springs.rotation as any}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {scene ? (
          <primitive object={scene.clone()} />
        ) : (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#5f86ff" />
          </mesh>
        )}

        {/* Hotspots */}
        {hotspots.map((hotspot) => (
          <group key={hotspot.id} position={hotspot.position}>
            {/* Hotspot marker */}
            <mesh
              onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#5f86ff" emissive="#5f86ff" emissiveIntensity={0.5} toneMapped={false} />
            </mesh>

            {/* Pulsating ring */}
            <mesh>
              <ringGeometry args={[0.12, 0.15, 32]} />
              <meshBasicMaterial color="#5f86ff" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>

            {/* Hotspot info */}
            {activeHotspot === hotspot.id && (
              <Html position={[0, 0.3, 0]} center distanceFactor={10} className="pointer-events-none">
                <div className="w-48 p-3 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white">
                  <h3 className="text-sm font-bold mb-1">{hotspot.title}</h3>
                  <p className="text-xs text-white/70">{hotspot.description}</p>
                </div>
              </Html>
            )}

            {/* Hotspot label */}
            <Text
              position={[0, -0.2, 0]}
              fontSize={0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor="#000000"
            >
              {hotspot.title}
            </Text>
          </group>
        ))}
      </animated.group>
    </group>
  )
}
