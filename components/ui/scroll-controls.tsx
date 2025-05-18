"use client"

import type React from "react"

import { useEffect } from "react"
import { useWheelScroll } from "@/hooks/use-wheel-scroll"
import { useTouchScroll } from "@/hooks/use-touch-scroll"

interface ScrollControlsProps {
  onScroll?: (direction: "up" | "down") => void
  children?: React.ReactNode
  debug?: boolean
}

export default function ScrollControls({ onScroll, children, debug = false }: ScrollControlsProps) {
  // Use our custom hooks
  const { direction: wheelDirection } = useWheelScroll({
    onScroll,
    debug,
  })

  const { direction: touchDirection } = useTouchScroll({
    onScroll,
    debug,
  })

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (debug) console.log("Key down detected")
        if (onScroll) onScroll("down")
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (debug) console.log("Key up detected")
        if (onScroll) onScroll("up")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onScroll, debug])

  // Add debugging controls to window
  useEffect(() => {
    if (typeof window !== "undefined" && debug) {
      ;(window as any).scrollUp = () => (onScroll?.("up")(window as any).scrollDown = () => onScroll?.("down"))
    }

    return () => {
      if (typeof window !== "undefined" && debug) {
        delete (window as any).scrollUp
        delete (window as any).scrollDown
      }
    }
  }, [onScroll, debug])

  return <>{children}</>
}
