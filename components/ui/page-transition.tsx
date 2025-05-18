"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
  isChanging: boolean
  direction?: "up" | "down" | "left" | "right"
}

export default function PageTransition({ children, isChanging, direction = "down" }: PageTransitionProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isChanging) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isChanging])

  // Set transform values based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 }
      case "down":
        return { y: -50, opacity: 0 }
      case "left":
        return { x: 50, opacity: 0 }
      case "right":
        return { x: -50, opacity: 0 }
      default:
        return { y: 50, opacity: 0 }
    }
  }

  const getExitTransform = () => {
    switch (direction) {
      case "up":
        return { y: -50, opacity: 0 }
      case "down":
        return { y: 50, opacity: 0 }
      case "left":
        return { x: -50, opacity: 0 }
      case "right":
        return { x: 50, opacity: 0 }
      default:
        return { y: -50, opacity: 0 }
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isAnimating ? "animating" : "static"}
        initial={getInitialTransform()}
        animate={{ x: 0, y: 0, opacity: 1 }}
        exit={getExitTransform()}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 1,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
