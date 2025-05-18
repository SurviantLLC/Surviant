"use client"

import { useRef, useEffect } from "react"

export default function FloatingElements() {
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

      // Replace the entire FloatingElement class and related code with this improved version
      // that focuses on connected dots rather than various shapes

      class FloatingElement {
        x: number
        y: number
        size: number
        color: string
        speed: number
        angle: number

        constructor() {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.size = Math.random() * 2 + 1 // Smaller dots
          this.speed = Math.random() * 0.3 + 0.1
          this.angle = Math.random() * Math.PI * 2

          // Tech-focused color palette: cyan, blue, purple
          const hue = 180 + Math.random() * 90
          this.color = `hsla(${hue}, 100%, 70%, ${Math.random() * 0.3 + 0.1})`
        }

        update() {
          this.x += Math.cos(this.angle) * this.speed
          this.y += Math.sin(this.angle) * this.speed

          // Bounce off edges
          if (this.x < 0 || this.x > canvas.width) {
            this.angle = Math.PI - this.angle
          }
          if (this.y < 0 || this.y > canvas.height) {
            this.angle = -this.angle
          }
        }

        draw() {
          if (!ctx) return
          ctx.fillStyle = this.color
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Create elements
      const elements: FloatingElement[] = []
      const elementCount = 25 // Increase for more dots

      for (let i = 0; i < elementCount; i++) {
        elements.push(new FloatingElement())
      }

      // Add a function to connect elements with lines
      function connectElements() {
        if (!ctx) return
        const maxDistance = 150

        for (let i = 0; i < elements.length; i++) {
          for (let j = i; j < elements.length; j++) {
            const dx = elements[i].x - elements[j].x
            const dy = elements[i].y - elements[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < maxDistance) {
              const opacity = 1 - distance / maxDistance

              // Create a gradient for the connecting lines
              const gradient = ctx.createLinearGradient(elements[i].x, elements[i].y, elements[j].x, elements[j].y)
              gradient.addColorStop(0, `rgba(0, 200, 255, ${opacity * 0.15})`)
              gradient.addColorStop(1, `rgba(128, 0, 255, ${opacity * 0.15})`)

              ctx.strokeStyle = gradient
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(elements[i].x, elements[i].y)
              ctx.lineTo(elements[j].x, elements[j].y)
              ctx.stroke()
            }
          }
        }
      }

      // Update the animation function to include connecting lines
      let animationId: number
      function animate() {
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw elements
        for (const element of elements) {
          element.update()
          element.draw()
        }

        // Connect elements with lines
        connectElements()

        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener("resize", setCanvasDimensions)
        cancelAnimationFrame(animationId)
      }
    } catch (error) {
      console.error("Error in floating elements animation:", error)
      return () => {}
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
