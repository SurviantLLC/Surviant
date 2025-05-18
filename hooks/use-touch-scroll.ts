"use client"

import { useEffect, useRef, useState } from "react"

interface UseTouchScrollOptions {
  onScroll?: (direction: "up" | "down") => void
  threshold?: number
  throttleMs?: number
  debug?: boolean
}

export function useTouchScroll({
  onScroll,
  threshold = 20,
  throttleMs = 500,
  debug = false,
}: UseTouchScrollOptions = {}) {
  const [direction, setDirection] = useState<"up" | "down" | null>(null)
  const touchStartY = useRef<number | null>(null)
  const lastScrollTime = useRef<number>(0)
  const isScrolling = useRef<boolean>(false)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      if (debug) console.log("Touch start:", touchStartY.current)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null || isScrolling.current) return

      const touchY = e.touches[0].clientY
      const deltaY = touchStartY.current - touchY

      if (debug) console.log("Touch move, delta:", deltaY)

      // Only trigger if significant movement
      if (Math.abs(deltaY) < threshold) return

      // Throttle touch events
      const now = Date.now()
      if (now - lastScrollTime.current < throttleMs) return

      lastScrollTime.current = now
      isScrolling.current = true

      // Determine direction
      const newDirection = deltaY > 0 ? "down" : "up"
      setDirection(newDirection)

      if (debug) console.log("Touch direction:", newDirection)

      // Call the callback
      if (onScroll) {
        onScroll(newDirection)
      }

      // Reset touch position
      touchStartY.current = null

      // Reset scrolling state after animation completes
      setTimeout(() => {
        isScrolling.current = false
        if (debug) console.log("Reset scrolling state")
      }, throttleMs)
    }

    // Use document for more reliable event capture
    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [onScroll, threshold, throttleMs, debug])

  return { direction, isScrolling: isScrolling.current }
}
