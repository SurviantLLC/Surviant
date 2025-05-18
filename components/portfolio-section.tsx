"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  interface Project {
    id: number
    title: string
    category: string
    image: string
    description: string
    technologies: string[]
    link?: string
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      image: "/dark-ecommerce-website.png",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and secure checkout.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#",
    },
    {
      id: 2,
      title: "Health & Fitness App",
      category: "mobile",
      image: "/fitness-app-workout-tracking.png",
      description:
        "Mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.",
      technologies: ["React Native", "Firebase", "Redux", "HealthKit"],
      link: "#",
    },
    {
      id: 3,
      title: "Real Estate Dashboard",
      category: "web",
      image: "/placeholder-lu4l1.png",
      description:
        "Administrative dashboard for real estate agents to manage listings, client interactions, and analytics.",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
      link: "#",
    },
    {
      id: 4,
      title: "Social Media Analytics",
      category: "web",
      image: "/social-media-analytics-dashboard.png",
      description:
        "Analytics platform for tracking social media performance across multiple platforms with detailed insights.",
      technologies: ["React", "Python", "Django", "D3.js"],
      link: "#",
    },
    {
      id: 5,
      title: "Delivery Tracking App",
      category: "mobile",
      image: "/delivery-tracking-app.png",
      description: "Mobile application for real-time tracking of deliveries with route optimization and notifications.",
      technologies: ["Flutter", "Firebase", "Google Maps API", "Node.js"],
      link: "#",
    },
    {
      id: 6,
      title: "Learning Management System",
      category: "web",
      image: "/placeholder.svg?height=600&width=800&query=learning management system with course content",
      description:
        "Comprehensive LMS for educational institutions with course management, assignments, and progress tracking.",
      technologies: ["Angular", "ASP.NET Core", "SQL Server", "Azure"],
      link: "#",
    },
  ]

  return (
    <div className="py-20 min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          Our Portfolio
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-300">
          Explore our latest projects and see how we've helped businesses transform their digital presence.
        </p>
      </motion.div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mx-auto mb-12 bg-black/50 border border-gray-800">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="web">Web Applications</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="web" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((project) => project.category === "web")
              .map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((project) => project.category === "mobile")
              .map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="bg-black/90 border-gray-800 text-white max-w-4xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  {selectedProject.category === "web" ? "Web Application" : "Mobile App"}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">About the Project</h4>
                  <p className="text-gray-300 mb-4">{selectedProject.description}</p>

                  <h4 className="text-lg font-medium mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {selectedProject.link && (
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                      View Project
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface ProjectCardProps {
  project: {
    id: number
    title: string
    category: string
    image: string
    description: string
    technologies: string[]
  }
  index: number
  onClick: () => void
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-sm text-gray-300">{project.category === "web" ? "Web Application" : "Mobile App"}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
