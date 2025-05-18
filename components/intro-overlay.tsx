"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import ThreeDButton from "@/components/ui/3d-button"
import SplitText from "@/components/ui/split-text"
import AudioVisualizer from "@/components/ui/audio-visualizer"

interface IntroOverlayProps {
  onStart: () => void
}

export default function IntroOverlay({ onStart }: IntroOverlayProps) {
  const [isReady, setIsReady] = useState(false)
  const [step, setStep] = useState(0)

  const handleStart = () => {
    setStep(1)
    setTimeout(() => {
      setIsReady(true)
      setTimeout(() => {
        onStart()
      }, 2000)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <AnimatePresence>
        {step === 0 ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              SURVIANT
            </h1>
            <div className="mb-8">
              <SplitText
                text="Welcome to an immersive 3D experience showcasing our digital innovation and web development expertise."
                className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
                type="words"
              />
            </div>

            <div className="space-y-8">
              <div className="p-6 rounded-xl bg-black/50 backdrop-blur-sm border border-gray-800 max-w-lg mx-auto">
                <h3 className="text-lg font-medium mb-4">Experience Settings</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Audio</span>
                    <AudioVisualizer
                      audioUrl="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
                      className="w-40"
                      barCount={32}
                      barColor="#5f86ff"
                      height={30}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Graphics Quality</span>
                    <div className="flex space-x-2">
                      {["Low", "Medium", "High"].map((quality, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className={i === 2 ? "bg-cyan-500/20 border-cyan-500/50" : ""}
                        >
                          {quality}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ThreeDButton size="lg" color="#5f86ff" onClick={handleStart} className="px-8">
                  Enter Experience
                </ThreeDButton>
              </div>

              <p className="text-sm text-white/40">
                For the best experience, please use headphones and a modern browser.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 0],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
            >
              S
            </motion.div>

            {!isReady && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <p className="text-gray-400 text-sm">Initializing experience...</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
