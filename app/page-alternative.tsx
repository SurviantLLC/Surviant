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
import PageTransition from "@/components/ui/page-transition"
import SectionIndicator from "@/components/ui/section-indicator"
import ScrollControls from "@/components/ui/scroll-controls"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)
  const [isChangingSection, setIsChangingSection] = useState(false)
  const scrollDirection = useRef<"up" | "down">("down")

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
    if (section === activeSection || isChangingSection) return

    setIsChangingSection(true)
    setTimeout(() => {
      setActiveSection(section)
      setIsMenuOpen(false)
      setTimeout(() => {
        setIsChangingSection(false)
      }, 500)
    }, 300)
  }

  // Handle scroll events from ScrollControls
  const handleScroll = (direction: "up" | "down") => {
    if (isChangingSection) return

    scrollDirection.current = direction

    // Find current section index
    const currentIndex = sections.findIndex((section) => section.id === activeSection)

    // Calculate next section index
    let nextIndex = currentIndex
    if (direction === "down" && currentIndex < sections.length - 1) {
      nextIndex = currentIndex + 1
    } else if (direction === "up" && currentIndex > 0) {
      nextIndex = currentIndex - 1
    }

    // Change section if needed
    if (nextIndex !== currentIndex) {
      handleSectionChange(sections[nextIndex].id)
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ScrollControls onScroll={handleScroll} debug={true}>
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
              className={cn("absolute inset-0 pt-24 overflow-auto scrollbar-hide", isMenuOpen && "pointer-events-none")}
            >
              <PageTransition isChanging={isChangingSection} direction={scrollDirection.current}>
                {activeSection === "home" && <HomeSection onExplore={() => handleSectionChange("services")} />}
                {activeSection === "services" && <ServicesSection />}
                {activeSection === "work" && <WorkSection />}
                {activeSection === "clients" && <ClientsSection />}
                {activeSection === "technologies" && <TechnologiesSection />}
                {activeSection === "about" && <AboutSection />}
                {activeSection === "contact" && <ContactSection />}
              </PageTransition>
            </motion.div>
          </AnimatePresence>

          {/* Page Transition Overlay */}
          <AnimatePresence>
            {isChangingSection && (
              <motion.div
                initial={{ scaleY: 0, originY: scrollDirection.current === "down" ? 0 : 1 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0, originY: scrollDirection.current === "down" ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-30 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 backdrop-blur-sm pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>
        {/* Section Indicator */}
        <SectionIndicator activeSection={activeSection} sections={sections} onSectionChange={handleSectionChange} />

        {/* Debug Controls */}
        <div className="fixed bottom-4 left-4 z-50 flex gap-2">
          <button
            onClick={() => handleScroll("up")}
            className="bg-black/50 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-md"
          >
            Up
          </button>
          <button
            onClick={() => handleScroll("down")}
            className="bg-black/50 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-md"
          >
            Down
          </button>
        </div>
      </main>
    </ScrollControls>
  )
}
