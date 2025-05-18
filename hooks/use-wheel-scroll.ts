"use client"

import { useEffect, useRef, useState } from "react"

interface UseWheelScrollOptions {
  onScroll?: (direction: "up" | "down") => void
  throttleMs?: number
  debug?: boolean
}

export function useWheelScroll({ onScroll, throttleMs = 500, debug = false }: UseWheelScrollOptions = {}) {
  const [direction, setDirection] = useState<"up" | "down" | null>(null)
  const lastScrollTime = useRef<number>(0)
  const isScrolling = useRef<boolean>(false)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (debug) console.log("Wheel event detected", e.deltaY)

      // Throttle scroll events
      const now = Date.now()
      if (now - lastScrollTime.current < throttleMs || isScrolling.current) {
        if (debug) console.log("Throttled or already scrolling")
        return
      }

      lastScrollTime.current = now
      isScrolling.current = true

      // Determine scroll direction
      const newDirection = e.deltaY > 0 ? "down" : "up"
      setDirection(newDirection)

      if (debug) console.log("Scroll direction:", newDirection)

      // Call the callback
      if (onScroll) {
        onScroll(newDirection)
      }

      // Reset scrolling state after animation completes
      setTimeout(() => {
        isScrolling.current = false
        if (debug) console.log("Reset scrolling state")
      }, throttleMs)
    }

    // Use document for more reliable event capture
    document.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      document.removeEventListener("wheel", handleWheel)
    }
  }, [onScroll, throttleMs, debug])

  return { direction, isScrolling: isScrolling.current }
}
