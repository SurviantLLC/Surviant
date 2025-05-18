"use client"

import { useState } from "react"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useAnimationFrame, useMotionValue } from "framer-motion"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

export default function Marquee({
  children,
  className = "",
  speed = 1,
  direction = "left",
  pauseOnHover = false,
}: MarqueeProps) {
  const baseVelocity = direction === "left" ? -speed : speed
  const baseX = useMotionValue(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  })

  const scrollVelocity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 5]), { damping: 50, stiffness: 400 })

  const x = useTransform(baseX, (v) => `${v}%`)
  const directionFactor = useRef<number>(1)
  const [isPaused, setIsPaused] = useState(false)

  useAnimationFrame((t, delta) => {
    if (isPaused) return

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    // Add scroll velocity influence
    moveBy += directionFactor.current * scrollVelocity.get() * (delta / 1000)

    baseX.set(baseX.get() + moveBy)

    // Reset position when it moves out of view
    if (baseX.get() <= -100) {
      baseX.set(0)
    }
    if (baseX.get() >= 0) {
      baseX.set(-100)
    }
  })

  return (
    <div
      ref={scrollRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        <div className="flex items-center justify-center mr-4">{children}</div>
        <div className="flex items-center justify-center mr-4">{children}</div>
        <div className="flex items-center justify-center mr-4">{children}</div>
        <div className="flex items-center justify-center">{children}</div>
      </motion.div>
    </div>
  )
}
