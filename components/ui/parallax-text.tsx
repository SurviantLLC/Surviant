"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxTextProps {
  children: React.ReactNode
  className?: string
  baseVelocity?: number
  direction?: "left" | "right"
}

export default function ParallaxText({
  children,
  className = "",
  baseVelocity = 5,
  direction = "left",
}: ParallaxTextProps) {
  const baseX = direction === "left" ? "100%" : "-100%"
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, direction === "left" ? -1000 : 1000])

  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        <span className="block mr-4">{children}</span>
        <span className="block mr-4">{children}</span>
        <span className="block mr-4">{children}</span>
        <span className="block">{children}</span>
      </motion.div>
    </div>
  )
}
