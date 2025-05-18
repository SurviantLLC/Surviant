"use client"

import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import {
  Float,
  Text3D,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Environment,
  Sphere,
  Torus,
  Box,
  RoundedBox,
  Icosahedron,
  Octahedron,
  Dodecahedron,
} from "@react-three/drei"
import * as THREE from "three"
import { useScroll } from "@/hooks/use-scroll"

interface MainSceneProps {
  activeSection: string
}

export default function MainScene({ activeSection }: MainSceneProps) {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const { scrollY } = useScroll()

  // Camera animation based on scroll
  useFrame(() => {
    if (groupRef.current) {
      // Rotate the entire scene slowly
      groupRef.current.rotation.y += 0.001

      // Move camera based on scroll
      camera.position.y = -scrollY * 10
      camera.lookAt(0, -scrollY * 10, 0)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Environment */}
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <spotLight position={[-10, -10, -5]} intensity={0.5} color="#00a8ff" />

      {/* Logo */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, 0, 0]}>
        {/* Fallback to simple mesh if Text3D fails */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 0.2]} />
          <meshStandardMaterial color="#00a8ff" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, 0, 0]}>
        <Text3D
          font="/fonts/Geist_Bold.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelSegments={5}
        >
          S
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.5}
            thickness={0.5}
            distortionScale={0.2}
            temporalDistortion={0.2}
            transmissionSampler
            resolution={256}
            color="#00a8ff"
          />
        </Text3D>
      </Float>

      {/* Decorative Elements */}
      <FloatingElements activeSection={activeSection} />

      {/* Section-specific 3D elements */}
      <SectionElements activeSection={activeSection} scrollY={scrollY} />
    </group>
  )
}

function FloatingElements({ activeSection }: { activeSection: string }) {
  // Create a grid of floating elements
  return (
    <group>
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 40
        const y = (Math.random() - 0.5) * 40
        const z = (Math.random() - 0.5) * 40
        const scale = 0.1 + Math.random() * 0.5

        return (
          <group key={i} position={[x, y, z]}>
            <Float speed={1} rotationIntensity={1} floatIntensity={1}>
              {i % 3 === 0 ? (
                <Sphere args={[scale, 16, 16]}>
                  <MeshDistortMaterial
                    color={new THREE.Color().setHSL(i * 0.05, 0.8, 0.5)}
                    speed={0.5}
                    distort={0.3}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Sphere>
              ) : i % 3 === 1 ? (
                <Box args={[scale, scale, scale]}>
                  <MeshWobbleMaterial
                    color={new THREE.Color().setHSL(i * 0.05, 0.8, 0.5)}
                    factor={0.2}
                    speed={0.5}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Box>
              ) : (
                <Torus args={[scale, scale / 3, 16, 32]}>
                  <meshStandardMaterial
                    color={new THREE.Color().setHSL(i * 0.05, 0.8, 0.5)}
                    emissive={new THREE.Color().setHSL(i * 0.05, 0.8, 0.2)}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Torus>
              )}
            </Float>
          </group>
        )
      })}
    </group>
  )
}

function SectionElements({ activeSection, scrollY }: { activeSection: string; scrollY: number }) {
  // Section-specific 3D elements
  const homeGroup = useRef<THREE.Group>(null)
  const servicesGroup = useRef<THREE.Group>(null)
  const workGroup = useRef<THREE.Group>(null)
  const clientsGroup = useRef<THREE.Group>(null)
  const technologiesGroup = useRef<THREE.Group>(null)
  const aboutGroup = useRef<THREE.Group>(null)
  const contactGroup = useRef<THREE.Group>(null)

  // Update visibility based on active section
  useEffect(() => {
    if (homeGroup.current) homeGroup.current.visible = activeSection === "home"
    if (servicesGroup.current) servicesGroup.current.visible = activeSection === "services"
    if (workGroup.current) workGroup.current.visible = activeSection === "work"
    if (clientsGroup.current) clientsGroup.current.visible = activeSection === "clients"
    if (technologiesGroup.current) technologiesGroup.current.visible = activeSection === "technologies"
    if (aboutGroup.current) aboutGroup.current.visible = activeSection === "about"
    if (contactGroup.current) contactGroup.current.visible = activeSection === "contact"
  }, [activeSection])

  // Animate based on scroll
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Add section-specific animations here
    if (homeGroup.current) {
      homeGroup.current.rotation.y = Math.sin(time * 0.2) * 0.1
    }

    if (servicesGroup.current) {
      servicesGroup.current.rotation.z = Math.sin(time * 0.1) * 0.1
    }

    if (workGroup.current) {
      workGroup.current.rotation.x = Math.sin(time * 0.15) * 0.1
    }
  })

  // Create a more complex scene for each section
  return (
    <>
      <group ref={homeGroup} position={[0, 0, -5]} visible={activeSection === "home"}>
        {/* Home section 3D elements */}
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
          <Torus args={[3, 0.2, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <MeshDistortMaterial color="#00a8ff" speed={2} distort={0.3} metalness={1} roughness={0.3} />
          </Torus>
        </Float>

        <group position={[0, 0, 0]}>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const radius = 4
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius

            return (
              <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={0.5} position={[x, 0, z]}>
                <Sphere args={[0.2, 16, 16]}>
                  <meshStandardMaterial
                    color={new THREE.Color().setHSL(i * 0.1, 0.8, 0.5)}
                    emissive={new THREE.Color().setHSL(i * 0.1, 0.8, 0.2)}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Sphere>
              </Float>
            )
          })}
        </group>
      </group>

      <group ref={servicesGroup} position={[0, -10, -5]} visible={activeSection === "services"}>
        {/* Services section 3D elements */}
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
          <Box args={[4, 4, 4]} position={[0, 0, 0]}>
            <MeshWobbleMaterial color="#a855f7" factor={0.4} speed={1} metalness={0.8} roughness={0.2} />
          </Box>
        </Float>

        <group position={[0, 0, 0]}>
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2
            const radius = 6
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius

            return (
              <Float key={i} speed={1.2} rotationIntensity={0.6} floatIntensity={0.6} position={[x, 0, z]}>
                <Box args={[1, 1, 1]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                  <MeshDistortMaterial
                    color={new THREE.Color().setHSL(i * 0.15 + 0.5, 0.8, 0.5)}
                    speed={0.8}
                    distort={0.4}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Box>
              </Float>
            )
          })}
        </group>
      </group>

      <group ref={workGroup} position={[0, -20, -5]} visible={activeSection === "work"}>
        {/* Work section 3D elements */}
        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere args={[3, 32, 32]} position={[0, 0, 0]}>
            <MeshTransmissionMaterial
              backside
              backsideThickness={0.5}
              thickness={0.5}
              distortionScale={0.2}
              temporalDistortion={0.2}
              transmissionSampler
              resolution={256}
              color="#ec4899"
            />
          </Sphere>
        </Float>

        <group position={[0, 0, 0]}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2
            const radius = 5
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <Float key={i} speed={0.8} rotationIntensity={0.4} floatIntensity={0.4} position={[x, y, 0]}>
                <Torus args={[0.5, 0.2, 16, 32]}>
                  <meshStandardMaterial
                    color={new THREE.Color().setHSL(i * 0.08 + 0.2, 0.8, 0.5)}
                    emissive={new THREE.Color().setHSL(i * 0.08 + 0.2, 0.8, 0.2)}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Torus>
              </Float>
            )
          })}
        </group>
      </group>

      <group ref={clientsGroup} position={[0, -30, -5]} visible={activeSection === "clients"}>
        {/* Clients section 3D elements */}
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
          <Torus args={[3, 1, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
            <MeshDistortMaterial color="#3b82f6" speed={1.5} distort={0.2} metalness={0.9} roughness={0.1} />
          </Torus>
        </Float>

        <group position={[0, 0, 0]}>
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i / 10) * Math.PI * 2
            const radius = 6
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius * 0.5
            const z = Math.sin(angle * 2) * 2

            return (
              <Float key={i} speed={1.5} rotationIntensity={0.7} floatIntensity={0.7} position={[x, y, z]}>
                <Sphere args={[0.3, 16, 16]}>
                  <MeshWobbleMaterial
                    color={new THREE.Color().setHSL(i * 0.1 + 0.6, 0.8, 0.5)}
                    factor={0.3}
                    speed={0.6}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Sphere>
              </Float>
            )
          })}
        </group>
      </group>

      <group ref={technologiesGroup} position={[0, -40, -5]} visible={activeSection === "technologies"}>
        {/* Technologies section 3D elements */}
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
          <Box args={[4, 4, 4]} position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <MeshTransmissionMaterial
              backside
              backsideThickness={0.5}
              thickness={0.5}
              distortionScale={0.1}
              temporalDistortion={0.1}
              transmissionSampler
              resolution={256}
              color="#06b6d4"
            />
          </Box>
        </Float>

        <group position={[0, 0, 0]}>
          {Array.from({ length: 20 }).map((_, i) => {
            const phi = Math.acos(-1 + (2 * i) / 20)
            const theta = Math.sqrt(20 * Math.PI) * phi
            const radius = 6

            const x = radius * Math.cos(theta) * Math.sin(phi)
            const y = radius * Math.sin(theta) * Math.sin(phi)
            const z = radius * Math.cos(phi)

            return (
              <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={0.5} position={[x, y, z]}>
                <Box args={[0.4, 0.4, 0.4]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                  <meshStandardMaterial
                    color={new THREE.Color().setHSL(i * 0.05 + 0.5, 0.8, 0.5)}
                    emissive={new THREE.Color().setHSL(i * 0.05 + 0.5, 0.8, 0.2)}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Box>
              </Float>
            )
          })}
        </group>
      </group>

      <group ref={aboutGroup} position={[0, -50, -5]} visible={activeSection === "about"}>
        {/* About section 3D elements */}
        <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.2}>
          <Dodecahedron args={[3, 0]} position={[0, 0, 0]}>
            <MeshTransmissionMaterial
              backside
              backsideThickness={0.5}
              thickness={0.5}
              distortionScale={0.3}
              temporalDistortion={0.1}
              transmissionSampler
              resolution={256}
              color="#10b981"
            />
          </Dodecahedron>
        </Float>

        <group position={[0, 0, 0]}>
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2
            const radius = 5
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <Float key={i} speed={0.5} rotationIntensity={0.3} floatIntensity={0.3} position={[x, y, 0]}>
                <Icosahedron args={[1, 0]}>
                  <MeshDistortMaterial
                    color={new THREE.Color().setHSL(i * 0.2 + 0.3, 0.8, 0.5)}
                    speed={0.4}
                    distort={0.2}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Icosahedron>
              </Float>
            )
          })}
        </group>
      </group>

      <group ref={contactGroup} position={[0, -60, -5]} visible={activeSection === "contact"}>
        {/* Contact section 3D elements */}
        <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.6}>
          <RoundedBox args={[4, 4, 4]} radius={0.5} position={[0, 0, 0]}>
            <MeshDistortMaterial color="#f59e0b" speed={1.5} distort={0.4} metalness={0.9} roughness={0.1} />
          </RoundedBox>
        </Float>

        <group position={[0, 0, 0]}>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const radius = 6
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <Float key={i} speed={1.2} rotationIntensity={0.5} floatIntensity={0.5} position={[x, y, 0]}>
                <Octahedron args={[0.8, 0]}>
                  <MeshWobbleMaterial
                    color={new THREE.Color().setHSL(i * 0.1 + 0.1, 0.8, 0.5)}
                    factor={0.4}
                    speed={0.7}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Octahedron>
              </Float>
            )
          })}
        </group>
      </group>
    </>
  )
}
