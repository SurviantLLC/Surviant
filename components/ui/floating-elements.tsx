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

      // Create floating elements
      class FloatingElement {
        x: number
        y: number
        size: number
        color: string
        speed: number
        angle: number
        type: string

        constructor() {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.size = Math.random() * 30 + 10
          this.speed = Math.random() * 0.5 + 0.1
          this.angle = Math.random() * Math.PI * 2
          this.type = ["circle", "square", "triangle"][Math.floor(Math.random() * 3)]

          // Cyan to purple gradient colors
          const hue = 180 + Math.random() * 60
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
          ctx.strokeStyle = this.color
          ctx.lineWidth = 1

          if (this.type === "circle") {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()
          } else if (this.type === "square") {
            ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
          } else if (this.type === "triangle") {
            ctx.beginPath()
            ctx.moveTo(this.x, this.y - this.size / 2)
            ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2)
            ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2)
            ctx.closePath()
            ctx.fill()
          }
        }
      }

      // Create elements
      const elements: FloatingElement[] = []
      const elementCount = 15

      for (let i = 0; i < elementCount; i++) {
        elements.push(new FloatingElement())
      }

      // Animation loop
      let animationId: number
      function animate() {
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw elements
        for (const element of elements) {
          element.update()
          element.draw()
        }

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
