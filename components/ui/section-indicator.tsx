"use client"

import { motion } from "framer-motion"

interface SectionIndicatorProps {
  activeSection: string
  sections: { id: string; label: string }[]
  onSectionChange?: (section: string) => void
}

export default function SectionIndicator({ activeSection, sections = [], onSectionChange }: SectionIndicatorProps) {
  // Find the index of the active section
  const activeSectionIndex = sections.findIndex((section) => section.id === activeSection)

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-4">
      {sections.map((section, index) => (
        <div key={section.id} className="relative group cursor-pointer" onClick={() => onSectionChange?.(section.id)}>
          {activeSection === section.id && (
            <motion.div
              layoutId="sectionIndicator"
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div
            className={`w-3 h-3 rounded-full ${
              activeSection === section.id ? "bg-transparent" : "bg-gray-700 hover:bg-gray-600"
            } transition-colors duration-200`}
          />

          {/* Section label that appears on hover */}
          <div className="absolute right-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            <span className="text-xs font-medium">{section.label}</span>
          </div>
        </div>
      ))}

      {/* Progress line */}
      <div className="w-px h-24 bg-gradient-to-b from-cyan-500/50 to-purple-600/50 my-2" />

      {/* Progress indicator */}
      <motion.div
        className="w-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
        initial={{ height: 0 }}
        animate={{
          height: `${(activeSectionIndex / Math.max(1, sections.length - 1)) * 100}%`,
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}
