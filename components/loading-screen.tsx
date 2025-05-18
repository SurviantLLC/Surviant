"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("")
  const fullText = "SURVIANT TECHNOLOGIES"
  // Remove this line
  // const [isReady, setIsReady] = useState(false)

  // Text animation - optimized
  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      setText(fullText.substring(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(intervalId)
      }
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  // Progress animation - optimized
  useEffect(() => {
    // Start with 20% progress immediately
    setProgress(20)

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Accelerate progress as we go
        const increment = prev < 50 ? 5 : prev < 80 ? 3 : 1
        const next = prev + increment
        return next >= 100 ? 100 : next
      })
    }, 30) // Faster updates

    return () => clearInterval(interval)
  }, [])

  // Preload critical resources
  useEffect(() => {
    // Preload key images
    const preloadImages = ["/team-member-1.png", "/team-member-2.png", "/client-logo-1.png", "/client-logo-2.png"]

    preloadImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Loading Surviant Technologies website"
    >
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
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {progress < 33 ? "Initializing..." : progress < 66 ? "Loading assets..." : "Preparing experience..."}
            </motion.span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full overflow-hidden transition-all duration-300 ${
                  progress > (i + 1) * (100 / 6) ? "bg-gradient-to-r from-cyan-500 to-purple-600" : "bg-gray-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
