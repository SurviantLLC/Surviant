"use client"

import { type ReactNode, useRef, useEffect } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { useScroll } from "@/hooks/use-scroll"

interface ScrollControlsProps {
  pages: number
  damping?: number
  children: ReactNode
}

export function ScrollControls({ pages, damping = 0.1, children }: ScrollControlsProps) {
  const { setScrollY, setScrollTarget } = useScroll()
  const { size, viewport } = useThree()
  const scrollRef = useRef(0)
  const targetRef = useRef(0)

  // Handle scroll events
  useEffect(() => {
    const onScroll = (e: WheelEvent) => {
      e.preventDefault()

      // Update target scroll position
      targetRef.current = Math.max(0, Math.min(pages - 1, targetRef.current + e.deltaY / (size.height * 0.5)))

      // Update global scroll target
      setScrollTarget(targetRef.current)
    }

    // Add event listener
    window.addEventListener("wheel", onScroll, { passive: false })

    // Handle touch events for mobile
    let touchStartY = 0

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return

      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY

      // Update target scroll position
      targetRef.current = Math.max(0, Math.min(pages - 1, targetRef.current + deltaY / (size.height * 0.5)))

      // Update global scroll target
      setScrollTarget(targetRef.current)

      // Update touch start position
      touchStartY = touchY
    }

    window.addEventListener("touchstart", onTouchStart, { passive: false })
    window.addEventListener("touchmove", onTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", onScroll)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
    }
  }, [pages, size.height, setScrollTarget])

  // Smooth scrolling with damping
  useFrame(() => {
    // Apply damping to scroll
    scrollRef.current = scrollRef.current + (targetRef.current - scrollRef.current) * damping

    // Update global scroll position
    setScrollY(scrollRef.current)
  })

  return <>{children}</>
}
