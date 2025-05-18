"use client"

import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Text3D, Float, MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"

interface HeroSceneProps {
  section: string
}

export default function HeroScene({ section }: HeroSceneProps) {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const targetPosition = useRef(new THREE.Vector3(0, 0, 10))

  useEffect(() => {
    // Update camera position based on current section
    if (section === "hero") {
      targetPosition.current.set(0, 0, 10)
    } else if (section === "services") {
      targetPosition.current.set(0, 10, 15)
    } else if (section === "portfolio") {
      targetPosition.current.set(10, 0, 15)
    } else if (section === "about") {
      targetPosition.current.set(-10, 0, 15)
    } else if (section === "contact") {
      targetPosition.current.set(0, -10, 15)
    }
  }, [section])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }

    // Smoothly move camera to target position
    camera.position.lerp(targetPosition.current, delta * 2)
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={groupRef}>
      {/* 3D Logo */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text3D font="/fonts/Inter_Bold.json" size={1.5} height={0.2} curveSegments={12} position={[-5, 0, 0]}>
          S
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.5}
            thickness={0.5}
            distortionScale={0}
            temporalDistortion={0.1}
            transmissionSampler
            resolution={256}
            color="#00a8ff"
          />
        </Text3D>
      </Float>

      {/* Decorative Elements */}
      <group position={[0, 0, -5]}>
        {/* Grid of cubes */}
        {Array.from({ length: 5 }).map((_, i) =>
          Array.from({ length: 5 }).map((_, j) => (
            <mesh
              key={`${i}-${j}`}
              position={[(i - 2) * 2.5, (j - 2) * 2.5, Math.sin(i * 0.5) * Math.cos(j * 0.5) * 2]}
              scale={0.2}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={new THREE.Color().setHSL((i + j) * 0.05, 0.8, 0.5)}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          )),
        )}
      </group>

      {/* Floating spheres */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1} rotationIntensity={1} floatIntensity={1}>
          <mesh
            position={[Math.sin(i * 0.5) * 10, Math.cos(i * 0.5) * 10, Math.sin(i) * 5]}
            scale={0.2 + Math.random() * 0.3}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={new THREE.Color().setHSL(i * 0.05, 0.8, 0.5)}
              emissive={new THREE.Color().setHSL(i * 0.05, 0.8, 0.2)}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
