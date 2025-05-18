"use client"

import { useState, useEffect, useRef } from "react"
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
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({
    home: null,
    services: null,
    work: null,
    clients: null,
    technologies: null,
    about: null,
    contact: null,
  })

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

  // Simulate loading experience - slightly reduced time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800) // Reduced from 2000ms
    return () => clearTimeout(timer)
  }, [])

  // Handle section change - now just scrolls to the section
  const handleSectionChange = (section: string) => {
    // Log for debugging
    console.log(`Changing to section: ${section}`)

    // Always update the active section state
    setActiveSection(section)

    const sectionElement = sectionRefs.current[section]
    if (sectionElement && contentRef.current) {
      // Scroll to the section with a slight delay to ensure state updates
      setTimeout(() => {
        contentRef.current?.scrollTo({
          top: sectionElement.offsetTop - 96, // Adjust for header height
          behavior: "smooth",
        })
      }, 50)
    }

    setIsMenuOpen(false)
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return

      const scrollPosition = contentRef.current.scrollTop + 200 // Add offset to trigger earlier

      // Find the section that is currently most visible
      let currentSection = "home"
      let maxVisibility = 0

      Object.entries(sectionRefs.current).forEach(([id, element]) => {
        if (!element) return

        const sectionTop = element.offsetTop - 96 // Adjust for header
        const sectionHeight = element.offsetHeight
        const sectionBottom = sectionTop + sectionHeight

        // Calculate how much of the section is visible
        const visibleTop = Math.max(sectionTop, scrollPosition)
        const visibleBottom = Math.min(sectionBottom, scrollPosition + window.innerHeight)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)

        // Update current section if this one has more visibility
        if (visibleHeight > maxVisibility) {
          maxVisibility = visibleHeight
          currentSection = id
        }
      })

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    const container = contentRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [activeSection])

  // Add keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        const currentIndex = sections.findIndex((section) => section.id === activeSection)
        if (currentIndex < sections.length - 1) {
          handleSectionChange(sections[currentIndex + 1].id)
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        const currentIndex = sections.findIndex((section) => section.id === activeSection)
        if (currentIndex > 0) {
          handleSectionChange(sections[currentIndex - 1].id)
        }
      } else if (e.key === "Home") {
        handleSectionChange("home")
      } else if (e.key === "End") {
        handleSectionChange("contact")
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

        {/* Continuous scrolling container with all sections */}
        <div
          ref={contentRef}
          className={cn("absolute inset-0 pt-24 overflow-auto scroll-smooth", isMenuOpen && "pointer-events-none")}
        >
          {/* Home Section */}
          <div ref={(el) => (sectionRefs.current.home = el)} className="min-h-screen">
            <HomeSection onExplore={() => handleSectionChange("services")} />
          </div>

          {/* Services Section */}
          <div ref={(el) => (sectionRefs.current.services = el)} className="min-h-screen">
            <ServicesSection />
          </div>

          {/* Work Section */}
          <div ref={(el) => (sectionRefs.current.work = el)} className="min-h-screen">
            <WorkSection />
          </div>

          {/* Clients Section */}
          <div ref={(el) => (sectionRefs.current.clients = el)} className="min-h-screen">
            <ClientsSection />
          </div>

          {/* Technologies Section */}
          <div ref={(el) => (sectionRefs.current.technologies = el)} className="min-h-screen">
            <TechnologiesSection />
          </div>

          {/* About Section */}
          <div ref={(el) => (sectionRefs.current.about = el)} className="min-h-screen">
            <AboutSection />
          </div>

          {/* Contact Section */}
          <div ref={(el) => (sectionRefs.current.contact = el)} className="min-h-screen">
            <ContactSection />
          </div>
        </div>
      </div>

      {/* Section Indicator */}
      <SectionIndicator activeSection={activeSection} sections={sections} onSectionChange={handleSectionChange} />
    </main>
  )
}
