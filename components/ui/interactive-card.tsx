"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  glareColor?: string
  borderColor?: string
  intensity?: number
}

export default function InteractiveCard({
  children,
  className = "",
  glareColor = "#ffffff",
  borderColor = "#5f86ff",
  intensity = 0.15,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [mouseOver, setMouseOver] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouchDevice) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    // Calculate rotation based on mouse position
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * intensity * 10
    const rotateX = -((mouseY - centerY) / (rect.height / 2)) * intensity * 10

    // Calculate glare position
    const glareX = ((mouseX - rect.left) / rect.width) * 100
    const glareY = ((mouseY - rect.top) / rect.height) * 100

    setRotateX(rotateX)
    setRotateY(rotateY)
    setGlarePosition({ x: glareX, y: glareY })
  }

  // Handle touch events for mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const touch = e.touches[0]
    const touchX = touch.clientX
    const touchY = touch.clientY

    // Calculate rotation based on touch position - reduced intensity for touch
    const rotateY = ((touchX - centerX) / (rect.width / 2)) * (intensity * 5)
    const rotateX = -((touchY - centerY) / (rect.height / 2)) * (intensity * 5)

    // Calculate glare position
    const glareX = ((touchX - rect.left) / rect.width) * 100
    const glareY = ((touchY - rect.top) / rect.height) * 100

    setRotateX(rotateX)
    setRotateY(rotateY)
    setGlarePosition({ x: glareX, y: glareY })
  }

  // Make sure we have valid colors
  const safeGlareColor = glareColor || "#ffffff"
  const safeBorderColor = borderColor || "#5f86ff"

  // Simplified effect for mobile
  const mobileVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5 },
  }

  if (isMobile || isTouchDevice) {
    return (
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/20 border border-gray-800 transition-all duration-300",
          className,
        )}
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        variants={mobileVariants}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Simplified border effect for mobile */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${safeBorderColor}66, transparent)`,
            backgroundSize: "200% 100%",
          }}
        />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/20 border border-gray-800 transition-all duration-300",
        mouseOver && "border-opacity-0",
        className,
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setMouseOver(true)}
      onTouchStart={() => setMouseOver(true)}
      onMouseLeave={() => {
        setMouseOver(false)
        setRotateX(0)
        setRotateY(0)
      }}
      onTouchEnd={() => {
        setTimeout(() => {
          setMouseOver(false)
          setRotateX(0)
          setRotateY(0)
        }, 100)
      }}
      role="article"
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${safeBorderColor}66, transparent)`,
          backgroundSize: "200% 100%",
          zIndex: -1,
        }}
        animate={{
          backgroundPosition: mouseOver ? ["0% 0%", "200% 0%"] : "0% 0%",
        }}
        transition={{
          duration: 1.5,
          repeat: mouseOver ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
      />

      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${safeGlareColor}33 0%, transparent 50%)`,
          opacity: mouseOver ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
