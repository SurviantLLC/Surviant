"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AudioVisualizerProps {
  audioUrl: string
  className?: string
  barCount?: number
  barColor?: string
  barWidth?: number
  barGap?: number
  height?: number
}

export default function AudioVisualizer({
  audioUrl,
  className = "",
  barCount = 64,
  barColor = "#5f86ff",
  barWidth = 3,
  barGap = 2,
  height = 40,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationRef = useRef<number>(0)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Initialize audio context and analyzer
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      // Create audio element
      audioRef.current = new Audio(audioUrl)
      audioRef.current.crossOrigin = "anonymous"
      audioRef.current.loop = true

      // Create audio context and analyzer
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) {
        console.error("AudioContext not supported in this browser")
        return
      }

      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      analyserRef.current = analyser
      analyser.fftSize = barCount * 2

      // Connect audio to analyzer
      const source = audioContext.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(audioContext.destination)

      // Create data array for frequency data
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      dataArrayRef.current = dataArray

      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
        cancelAnimationFrame(animationRef.current)
        audioContext.close()
      }
    } catch (error) {
      console.error("Error initializing audio:", error)
      return () => {}
    }
  }, [audioUrl, barCount])

  // Draw visualization
  const draw = () => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return

    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const analyser = analyserRef.current
      const dataArray = dataArrayRef.current
      const bufferLength = dataArray.length

      // Get frequency data
      analyser.getByteFrequencyData(dataArray)

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw bars
      const totalWidth = bufferLength * (barWidth + barGap) - barGap
      const startX = (canvas.width - totalWidth) / 2

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height
        const x = startX + i * (barWidth + barGap)
        const y = canvas.height - barHeight

        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height)
        gradient.addColorStop(0, barColor)
        gradient.addColorStop(1, `${barColor}33`) // Add transparency

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth, barHeight)
      }

      animationRef.current = requestAnimationFrame(draw)
    } catch (error) {
      console.error("Error drawing visualization:", error)
    }
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      cancelAnimationFrame(animationRef.current)
    } else {
      audioRef.current.play()
      draw()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <div className={`relative ${className}`}>
      <motion.canvas
        ref={canvasRef}
        width={barCount * (barWidth + barGap) - barGap}
        height={height}
        className="w-full cursor-pointer"
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className={`w-3 h-3 rounded-full ${isPlaying ? "bg-red-500" : "bg-green-500"}`}
          animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
          transition={{ repeat: isPlaying ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
        />
      </div>
    </div>
  )
}
