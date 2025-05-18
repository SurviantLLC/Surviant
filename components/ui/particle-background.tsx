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
          this.size = Math.random() * 2 + 0.5
          this.speedX = (Math.random() - 0.5) * 0.5
          this.speedY = (Math.random() - 0.5) * 0.5

          // Cyan to purple gradient colors
          const hue = 180 + Math.random() * 60
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

      // Create particles
      const particles: Particle[] = []
      const particleCount = isMobile ? 50 : 100

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }

      // Connect particles with lines
      function connectParticles() {
        if (!ctx) return
        const maxDistance = 150

        for (let i = 0; i < particles.length; i++) {
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < maxDistance) {
              const opacity = 1 - distance / maxDistance
              ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.2})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }
      }

      // Animation loop
      let animationId: number
      function animate() {
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

      animate()

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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
