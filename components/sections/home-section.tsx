"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import FloatingElements from "@/components/ui/floating-elements"

interface HomeSectionProps {
  onExplore: () => void
}

export default function HomeSection({ onExplore }: HomeSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()
  const [hasWebGL, setHasWebGL] = useState(true)

  // Check for WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setHasWebGL(!!gl)
    } catch (e) {
      setHasWebGL(false)
    }
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden" ref={ref}>
      {/* 3D Floating Elements - conditionally rendered based on WebGL support */}
      {hasWebGL && <FloatingElements />}

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-5xl mx-auto text-center z-10"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block py-1 px-3 border border-cyan-500/30 rounded-full text-cyan-500 text-xs tracking-wider mb-6">
            DIGITAL INNOVATION STUDIO
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight"
        >
          <span className="block">We Create</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
            AI-Powered Experiences
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          Transforming ideas into intelligent digital products. From custom AI solutions to cutting-edge web
          applications, we build technology that drives innovation and business growth.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={onExplore}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-full px-8"
          >
            Explore Our Work
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-gray-700 text-white hover:bg-white/10 rounded-full px-8"
          >
            Get in Touch
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 mb-2 tracking-wider">SCROLL DOWN</span>
          <div className="w-6 h-10 border border-gray-700 rounded-full flex justify-center p-1">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="w-1 h-1 bg-cyan-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 backdrop-blur-sm bg-black/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-800">
            {[
              { value: "10+", label: "YEARS EXPERIENCE" },
              { value: "150+", label: "PROJECTS DELIVERED" },
              { value: "50+", label: "HAPPY CLIENTS" },
              { value: "15+", label: "INDUSTRY AWARDS" },
            ].map((stat, i) => (
              <div key={i} className="py-6 px-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
