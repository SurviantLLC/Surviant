"use client"

import { useRef, useEffect } from "react"

interface NoiseBackgroundProps {
  opacity?: number
  className?: string
}

export default function NoiseBackground({ opacity = 0.05, className = "" }: NoiseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas dimensions
      const setCanvasDimensions = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      setCanvasDimensions()
      window.addEventListener("resize", setCanvasDimensions)

      // Create noise
      const createNoise = () => {
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const value = Math.floor(Math.random() * 255)
          data[i] = value
          data[i + 1] = value
          data[i + 2] = value
          data[i + 3] = Math.floor(Math.random() * 255 * opacity)
        }

        ctx.putImageData(imageData, 0, 0)
      }

      // Animation loop
      let animationId: number
      const animate = () => {
        createNoise()
        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener("resize", setCanvasDimensions)
        cancelAnimationFrame(animationId)
      }
    } catch (error) {
      console.error("Error creating noise background:", error)
      return () => {}
    }
  }, [opacity])

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none ${className}`} />
}
