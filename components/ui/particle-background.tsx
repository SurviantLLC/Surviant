"use client"

import { useRef, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

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

      // Particle class
      class Particle {
        x: number
        y: number
        size: number
        speedX: number
        speedY: number
        color: string

        constructor() {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.size = Math.random() * 1.5 + 0.5 // Smaller, more uniform dots
          this.speedX = (Math.random() - 0.5) * 0.3
          this.speedY = (Math.random() - 0.5) * 0.3

          // Use a more tech-focused color palette: cyan, blue, purple
          const hue = 180 + Math.random() * 90 // Range from cyan to purple
          this.color = `hsla(${hue}, 100%, 70%, ${Math.random() * 0.5 + 0.2})`
        }

        update() {
          this.x += this.speedX
          this.y += this.speedY

          // Wrap around edges
          if (this.x < 0) this.x = canvas.width
          if (this.x > canvas.width) this.x = 0
          if (this.y < 0) this.y = canvas.height
          if (this.y > canvas.height) this.y = 0
        }

        draw() {
          if (!ctx) return
          ctx.fillStyle = this.color
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Create particles - reduce count for mobile
      const particles: Particle[] = []
      const particleCount = isMobile ? 50 : 150

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }

      // Connect particles with lines - optimize for mobile
      function connectParticles() {
        if (!ctx) return
        const maxDistance = isMobile ? 80 : 150 // Shorter connections on mobile
        const maxConnections = isMobile ? 3 : 5 // Fewer connections on mobile

        for (let i = 0; i < particles.length; i++) {
          let connections = 0

          // Only connect to nearest particles to improve performance
          for (let j = i + 1; j < particles.length; j++) {
            if (connections >= maxConnections) break

            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < maxDistance) {
              connections++

              // Create a gradient opacity based on distance
              const opacity = (1 - distance / maxDistance) * (isMobile ? 0.15 : 0.2)

              // Use a tech-looking gradient for the lines
              ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }
      }

      // Animation loop with frame limiting for mobile
      let animationId: number
      let lastFrameTime = 0
      const targetFPS = isMobile ? 30 : 60 // Lower FPS target for mobile

      function animate(timestamp: number) {
        // Limit frame rate on mobile
        if (isMobile) {
          const elapsed = timestamp - lastFrameTime
          if (elapsed < 1000 / targetFPS) {
            animationId = requestAnimationFrame(animate)
            return
          }
          lastFrameTime = timestamp
        }

        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        for (const particle of particles) {
          particle.update()
          particle.draw()
        }

        connectParticles()
        animationId = requestAnimationFrame(animate)
      }

      animate(0)

      return () => {
        window.removeEventListener("resize", setCanvasDimensions)
        cancelAnimationFrame(animationId)
      }
    } catch (error) {
      console.error("Error in particle animation:", error)
      // Return an empty div as fallback
      return () => {}
    }
  }, [isMobile])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}
