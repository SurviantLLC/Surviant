"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavbarProps {
  setSection: (section: string) => void
  currentSection: string
}

export default function Navbar({ setSection, currentSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", section: "hero" },
    { name: "Services", section: "services" },
    { name: "Portfolio", section: "portfolio" },
    { name: "About", section: "about" },
    { name: "Contact", section: "contact" },
  ]

  const handleNavClick = (section: string) => {
    setSection(section)
    setIsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 backdrop-blur-md bg-black/30">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-2xl font-bold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
          onClick={() => setSection("hero")}
        >
          Surviant
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => setSection(item.section)}
              className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                currentSection === item.section ? "text-cyan-400" : "text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/95 border-gray-800">
            <nav className="flex flex-col space-y-6 mt-12">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className={`text-lg font-medium transition-colors hover:text-cyan-400 ${
                    currentSection === item.section ? "text-cyan-400" : "text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
