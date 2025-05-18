"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TabIndicatorProps {
  activeTab: string
  tabs: { id: string; label: string }[]
  onChange: (id: string) => void
  className?: string
}

export default function TabIndicator({ activeTab, tabs, onChange, className }: TabIndicatorProps) {
  return (
    <div className={cn("flex p-1 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative px-6 py-2 text-sm font-medium rounded-full transition-colors z-10",
            activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-white",
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full -z-10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
