"use client"

import { useRef, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function NetworkParticles() {
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
        connections: number

        constructor() {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.size = Math.random() * 1.5 + 0.5
          this.speedX = (Math.random() - 0.5) * 0.3
          this.speedY = (Math.random() - 0.5) * 0.3
          this.connections = 0

          // Tech-focused color palette
          const hue = 180 + Math.random() * 90 // Cyan to purple
          this.color = `hsla(${hue}, 100%, 70%, ${Math.random() * 0.5 + 0.3})`
        }

        update() {
          // Reset connections count
          this.connections = 0

          // Move particles
          this.x += this.speedX
          this.y += this.speedY

          // Wrap around edges with a small buffer
          if (this.x < -50) this.x = canvas.width + 50
          if (this.x > canvas.width + 50) this.x = -50
          if (this.y < -50) this.y = canvas.height + 50
          if (this.y > canvas.height + 50) this.y = -50
        }

        draw() {
          if (!ctx) return

          // Draw particle with glow effect
          ctx.shadowBlur = 5
          ctx.shadowColor = this.color
          ctx.fillStyle = this.color
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      // Create particles
      const particles: Particle[] = []
      const particleCount = isMobile ? 50 : 120

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }

      // Connect particles with lines
      function connectParticles() {
        if (!ctx) return
        const maxDistance = isMobile ? 100 : 150
        const maxConnections = isMobile ? 3 : 5

        for (let i = 0; i < particles.length; i++) {
          // Skip if this particle already has too many connections
          if (particles[i].connections >= maxConnections) continue

          // Sort other particles by distance
          const others = particles
            .map((p, index) => ({
              particle: p,
              index,
              distance: Math.hypot(particles[i].x - p.x, particles[i].y - p.y),
            }))
            .filter(
              (item) => item.index !== i && item.distance < maxDistance && item.particle.connections < maxConnections,
            )
            .sort((a, b) => a.distance - b.distance)
            .slice(0, maxConnections - particles[i].connections)

          // Connect to closest particles
          for (const { particle, distance } of others) {
            // Create a gradient opacity based on distance
            const opacity = 1 - distance / maxDistance

            // Create a gradient for the line
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particle.x, particle.y)
            gradient.addColorStop(0, `rgba(0, 200, 255, ${opacity * 0.3})`)
            gradient.addColorStop(1, `rgba(128, 0, 255, ${opacity * 0.3})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particle.x, particle.y)
            ctx.stroke()

            // Increment connection count for both particles
            particles[i].connections++
            particle.connections++
          }
        }
      }

      // Mouse interaction
      const mouse = { x: null as number | null, y: null as number | null, radius: isMobile ? 50 : 100 }

      canvas.addEventListener("mousemove", (e) => {
        mouse.x = e.x
        mouse.y = e.y
      })

      canvas.addEventListener("mouseleave", () => {
        mouse.x = null
        mouse.y = null
      })

      // Animation loop
      let animationId: number
      function animate() {
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        for (const particle of particles) {
          particle.update()

          // Mouse interaction
          if (mouse.x !== null && mouse.y !== null) {
            const dx = particle.x - mouse.x
            const dy = particle.y - mouse.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < mouse.radius) {
              // Push particles away from mouse
              const forceDirectionX = dx / distance
              const forceDirectionY = dy / distance
              const force = (mouse.radius - distance) / mouse.radius

              particle.x += forceDirectionX * force * 2
              particle.y += forceDirectionY * force * 2
            }
          }

          particle.draw()
        }

        // Connect particles with lines
        connectParticles()

        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener("resize", setCanvasDimensions)
        cancelAnimationFrame(animationId)
      }
    } catch (error) {
      console.error("Error in network particles animation:", error)
      return () => {}
    }
  }, [isMobile])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
