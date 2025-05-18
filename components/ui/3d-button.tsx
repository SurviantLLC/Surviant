"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { RoundedBox, MeshTransmissionMaterial } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import * as THREE from "three"

interface ThreeDButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  color?: string
}

export default function ThreeDButton({
  children,
  onClick,
  className,
  variant = "default",
  size = "default",
  color = "#5f86ff",
}: ThreeDButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-full",
        size === "sm" ? "h-9" : size === "lg" ? "h-12" : size === "icon" ? "h-10 w-10" : "h-10",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onTapStart={() => setPressed(true)}
      onTap={() => {
        setPressed(false)
        onClick && onClick()
      }}
      onTapCancel={() => setPressed(false)}
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ pointerEvents: "none" }}
        >
          <ButtonMesh hovered={hovered} pressed={pressed} color={color} />
        </Canvas>
      </div>
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        className={cn(
          "relative z-10 bg-transparent border-transparent hover:bg-transparent",
          variant === "outline" ? "border border-white/20" : "",
        )}
      >
        {children}
      </Button>
    </motion.div>
  )
}

interface ButtonMeshProps {
  hovered: boolean
  pressed: boolean
  color: string
}

function ButtonMesh({ hovered, pressed, color }: ButtonMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Animate based on interaction state
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, hovered ? 1.1 : 1, delta * 5)
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, pressed ? 0.9 : 1, delta * 5)
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <RoundedBox ref={meshRef} args={[4, 1, 0.2]} radius={0.5} smoothness={4}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.5}
          thickness={0.5}
          distortionScale={0.2}
          temporalDistortion={0.1}
          transmissionSampler
          resolution={256}
          distortion={hovered ? 0.5 : 0.2}
          color={color}
          anisotropicBlur={0.5}
          chromaticAberration={0.5}
        />
      </RoundedBox>
    </>
  )
}
