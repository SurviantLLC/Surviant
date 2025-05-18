"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface CursorFollowProps {
  children?: React.ReactNode
}

export default function CursorFollow({ children }: CursorFollowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement
      const isLink =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")

      setLinkHovered(!!isLink)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)
    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  // Only show custom cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  if (isTouchDevice) return <>{children}</>

  return (
    <>
      <AnimatePresence>
        {!hidden && (
          <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[999] pointer-events-none mix-blend-difference"
            animate={{
              x: position.x - (linkHovered ? 16 : 4),
              y: position.y - (linkHovered ? 16 : 4),
              scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className={cn("relative flex items-center justify-center", linkHovered ? "w-8 h-8" : "w-2 h-2")}>
              <div
                className={cn(
                  "absolute rounded-full bg-white",
                  linkHovered ? "w-8 h-8 opacity-20" : "w-2 h-2 opacity-80",
                )}
              />
              {linkHovered && <div className="w-1 h-1 rounded-full bg-white" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
