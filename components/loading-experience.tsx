"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface LoadingExperienceProps {
  onComplete: () => void
}

export default function LoadingExperience({ onComplete }: LoadingExperienceProps) {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const fullText = "SURVIANT TECHNOLOGIES"
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { setTheme } = useTheme()

  // Set dark theme
  useEffect(() => {
    setTheme("dark")
  }, [setTheme])

  // Text animation
  useEffect(() => {
    let index = 0
    intervalRef.current = setInterval(() => {
      setText(fullText.substring(0, index))
      index++
      if (index > fullText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, 100)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 3
        return next >= 100 ? 100 : next
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Loading steps
  const loadingSteps = [
    "Initializing 3D environment...",
    "Loading assets...",
    "Preparing shaders...",
    "Configuring physics...",
    "Optimizing performance...",
    "Finalizing setup...",
  ]

  // Update loading step based on progress
  useEffect(() => {
    const stepIndex = Math.min(Math.floor(progress / (100 / loadingSteps.length)), loadingSteps.length - 1)
    setCurrentStep(stepIndex)
  }, [progress, loadingSteps.length])

  // Complete loading
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [progress, onComplete])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="relative w-full max-w-md px-4">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="inline-block relative">
              <span className="text-3xl md:text-4xl font-bold tracking-wider text-white">{text}</span>
              <span className="absolute right-0 top-0 h-full w-1 bg-cyan-500 animate-blink"></span>
            </div>
            <p className="text-gray-400 mt-2 text-sm">DIGITAL INNOVATION STUDIO</p>
          </motion.div>
        </div>

        <div className="space-y-6 w-full">
          <div className="relative h-[2px] w-full bg-gray-800 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-600"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <motion.span
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {loadingSteps[currentStep]}
            </motion.span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 rounded-full overflow-hidden transition-all duration-300",
                  progress > (i + 1) * (100 / 6) ? "bg-gradient-to-r from-cyan-500 to-purple-600" : "bg-gray-800",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
