"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/navigation"
import HomeSection from "@/components/sections/home-section"
import ServicesSection from "@/components/services-section"
import WorkSection from "@/components/sections/work-section"
import AboutSection from "@/components/sections/about-section"
import ContactSection from "@/components/sections/contact-section"
import ClientsSection from "@/components/sections/clients-section"
import TechnologiesSection from "@/components/sections/technologies-section"
import NoiseBackground from "@/components/ui/noise-background"
import ParticleBackground from "@/components/ui/particle-background"
import LoadingScreen from "@/components/loading-screen"
import { cn } from "@/lib/utils"
import SectionIndicator from "@/components/ui/section-indicator"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const [lastScrollTime, setLastScrollTime] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const sections = [
    { id: "home", label: "HOME" },
    { id: "services", label: "SERVICES" },
    { id: "work", label: "WORK" },
    { id: "clients", label: "CLIENTS" },
    { id: "technologies", label: "TECHNOLOGIES" },
    { id: "about", label: "ABOUT" },
    { id: "contact", label: "CONTACT" },
  ]

  // Check for WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setHasWebGL(!!gl)
    } catch (e) {
      setHasWebGL(false)
      console.log("WebGL not supported, falling back to standard animations")
    }
  }, [])

  // Simulate loading experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Handle section change
  const handleSectionChange = (section: string) => {
    if (section === activeSection) return
    setActiveSection(section)
    setIsMenuOpen(false)

    // Scroll to top of the new section
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }

  // Improved scroll handler that allows scrolling within sections
  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      // Don't prevent default scrolling - let the browser handle it naturally

      // Get the current scroll container
      const container = contentRef.current
      if (!container) return

      // Check if we're at the top or bottom of the container
      const isAtTop = container.scrollTop <= 0
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5

      // Only handle section changes when at the boundaries
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        // Simple throttle for section changes
        const now = Date.now()
        if (now - lastScrollTime < 300) return
        setLastScrollTime(now)

        // Determine direction
        const direction = e.deltaY > 0 ? "down" : "up"
        setScrollDirection(direction)

        // Find current section index
        const currentIndex = sections.findIndex((section) => section.id === activeSection)

        // Calculate next section index
        let nextIndex = currentIndex
        if (direction === "down" && currentIndex < sections.length - 1 && isAtBottom) {
          nextIndex = currentIndex + 1
          e.preventDefault() // Prevent default only when changing sections
        } else if (direction === "up" && currentIndex > 0 && isAtTop) {
          nextIndex = currentIndex - 1
          e.preventDefault() // Prevent default only when changing sections
        }

        // Change section if needed
        if (nextIndex !== currentIndex) {
          handleSectionChange(sections[nextIndex].id)
        }
      }
    }

    // Handle touch events
    let touchStartY = 0
    function handleTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY
    }

    function handleTouchMove(e: TouchEvent) {
      if (!touchStartY) return

      const container = contentRef.current
      if (!container) return

      // Check if we're at the top or bottom of the container
      const isAtTop = container.scrollTop <= 0
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5

      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY

      // Only handle section changes when at the boundaries
      if ((deltaY < 0 && isAtTop) || (deltaY > 0 && isAtBottom)) {
        // Simple throttle
        const now = Date.now()
        if (now - lastScrollTime < 300) return
        setLastScrollTime(now)

        // Only trigger if significant movement
        if (Math.abs(deltaY) < 20) return

        // Determine direction
        const direction = deltaY > 0 ? "down" : "up"
        setScrollDirection(direction)

        // Find current section index
        const currentIndex = sections.findIndex((section) => section.id === activeSection)

        // Calculate next section index
        let nextIndex = currentIndex
        if (direction === "down" && currentIndex < sections.length - 1 && isAtBottom) {
          nextIndex = currentIndex + 1
        } else if (direction === "up" && currentIndex > 0 && isAtTop) {
          nextIndex = currentIndex - 1
        }

        // Change section if needed
        if (nextIndex !== currentIndex) {
          handleSectionChange(sections[nextIndex].id)
          touchStartY = 0 // Reset touch position
        }
      }
    }

    // Add event listeners
    document.addEventListener("wheel", handleWheel, { passive: true })
    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      document.removeEventListener("wheel", handleWheel)
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [activeSection, lastScrollTime, sections])

  // Add keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        const currentIndex = sections.findIndex((section) => section.id === activeSection)
        if (currentIndex < sections.length - 1) {
          setScrollDirection("down")
          handleSectionChange(sections[currentIndex + 1].id)
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        const currentIndex = sections.findIndex((section) => section.id === activeSection)
        if (currentIndex > 0) {
          setScrollDirection("up")
          handleSectionChange(sections[currentIndex - 1].id)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection, sections])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-black to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Particle Background - conditionally rendered based on WebGL support */}
      {hasWebGL && <ParticleBackground />}

      {/* Noise Texture */}
      <NoiseBackground opacity={0.03} />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        <Navigation
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: scrollDirection === "down" ? 50 : -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: scrollDirection === "down" ? -50 : 50 }}
            transition={{ duration: 0.5 }}
            className={cn("absolute inset-0 pt-24 overflow-auto scrollbar-hide", isMenuOpen && "pointer-events-none")}
            ref={contentRef}
          >
            {activeSection === "home" && <HomeSection onExplore={() => handleSectionChange("services")} />}
            {activeSection === "services" && <ServicesSection />}
            {activeSection === "work" && <WorkSection />}
            {activeSection === "clients" && <ClientsSection />}
            {activeSection === "technologies" && <TechnologiesSection />}
            {activeSection === "about" && <AboutSection />}
            {activeSection === "contact" && <ContactSection />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Section Indicator */}
      <SectionIndicator activeSection={activeSection} sections={sections} onSectionChange={handleSectionChange} />

      {/* Debug Controls */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => {
            const currentIndex = sections.findIndex((section) => section.id === activeSection)
            if (currentIndex > 0) {
              setScrollDirection("up")
              handleSectionChange(sections[currentIndex - 1].id)
            }
          }}
          className="bg-black/50 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-md"
        >
          Up
        </button>
        <button
          onClick={() => {
            const currentIndex = sections.findIndex((section) => section.id === activeSection)
            if (currentIndex < sections.length - 1) {
              setScrollDirection("down")
              handleSectionChange(sections[currentIndex + 1].id)
            }
          }}
          className="bg-black/50 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-md"
        >
          Down
        </button>
      </div>
    </main>
  )
}
