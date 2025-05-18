"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import TabIndicator from "@/components/ui/tab-indicator"

interface Project {
  id: string
  title: string
  category: string
  description: string
  technologies: string[]
  challenge: string
  solution: string
  results: string
  link?: string
}

export default function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const projects: Project[] = [
    {
      id: "project-ai",
      title: "Enterprise AI Assistant Platform",
      category: "web",
      description:
        "A comprehensive AI platform that enables businesses to create custom AI assistants trained on their proprietary data.",
      technologies: ["React", "Next.js", "LangChain", "OpenAI API", "Vector DB", "Node.js", "TypeScript"],
      challenge:
        "Develop a secure, scalable platform that allows non-technical users to create and deploy custom AI assistants with minimal setup.",
      solution:
        "We built a platform with intuitive document uploading, automatic knowledge base creation, and a visual conversation designer.",
      results:
        "Reduced customer support costs by 65%, improved response accuracy to 97%, and decreased onboarding time for new employees by 78%.",
      link: "#",
    },
    {
      id: "project-1",
      title: "Neuomorphic E-Commerce Platform",
      category: "web",
      description:
        "A cutting-edge e-commerce platform with AI-powered recommendations and immersive product visualization.",
      technologies: ["React", "Three.js", "Node.js", "MongoDB", "Stripe", "TensorFlow"],
      challenge:
        "Create a next-generation shopping experience that stands out in a crowded market while maintaining excellent performance and conversion rates.",
      solution:
        "We developed a 3D product visualization system and implemented AI-driven personalization to create a unique shopping journey for each user.",
      results:
        "43% increase in average order value, 27% improvement in conversion rate, and 65% higher customer engagement metrics.",
      link: "#",
    },
    {
      id: "project-2",
      title: "Immersive Fitness Experience",
      category: "mobile",
      description:
        "A mobile fitness application with AR workout guidance, social features, and personalized training programs.",
      technologies: ["React Native", "ARKit", "Firebase", "Redux", "HealthKit", "TensorFlow Lite"],
      challenge: "Develop a fitness app that motivates users through immersive experiences and personalized guidance.",
      solution:
        "We created an AR-powered workout assistant that provides real-time form correction and gamified fitness challenges.",
      results:
        "92% user retention after 3 months, featured in App Store's 'Apps We Love', 4.8/5 average rating from 50,000+ reviews.",
      link: "#",
    },
    {
      id: "project-3",
      title: "Intelligent Real Estate Platform",
      category: "web",
      description:
        "A comprehensive real estate platform with AI-powered property valuation, virtual tours, and predictive market analytics.",
      technologies: ["Vue.js", "WebGL", "Express", "PostgreSQL", "TensorFlow", "Three.js"],
      challenge:
        "Revolutionize the real estate market by providing unprecedented insights and immersive property exploration.",
      solution:
        "We built a platform that combines machine learning for accurate valuations with WebGL-powered virtual property tours.",
      results:
        "Reduced average time-to-sale by 35%, increased agent efficiency by 48%, and improved lead conversion by 52%.",
      link: "#",
    },
    {
      id: "project-4",
      title: "Neural Analytics Dashboard",
      category: "web",
      description:
        "An advanced analytics platform with neural network-powered insights, predictive modeling, and interactive visualizations.",
      technologies: ["React", "D3.js", "Python", "Django", "PyTorch", "WebGL"],
      challenge:
        "Transform complex data into actionable insights through intuitive visualizations and predictive analytics.",
      solution:
        "We developed a neural network system that processes vast amounts of data and presents findings through interactive 3D visualizations.",
      results: "Helped clients identify $12M in cost-saving opportunities and increased decision-making speed by 67%.",
      link: "#",
    },
    {
      id: "project-5",
      title: "Autonomous Delivery Tracker",
      category: "mobile",
      description:
        "A next-generation delivery tracking application with predictive ETAs, AR package visualization, and autonomous vehicle integration.",
      technologies: ["Flutter", "TensorFlow", "Google Maps API", "Node.js", "PostgreSQL", "ARCore"],
      challenge:
        "Create a delivery tracking system that leverages cutting-edge technology to improve accuracy and user experience.",
      solution:
        "We built a platform that integrates with autonomous delivery vehicles and uses machine learning for ultra-precise delivery estimates.",
      results:
        "Reduced delivery time uncertainty by 78%, increased customer satisfaction scores by 45%, and decreased support inquiries by 62%.",
      link: "#",
    },
    {
      id: "project-6",
      title: "Adaptive Learning System",
      category: "web",
      description:
        "An intelligent learning management system that adapts to individual learning styles and provides personalized education paths.",
      technologies: ["Angular", "ASP.NET Core", "SQL Server", "Azure", "TensorFlow.js", "WebGL"],
      challenge:
        "Develop an education platform that adapts to each student's learning style and pace to maximize knowledge retention.",
      solution:
        "We created an adaptive learning algorithm that analyzes student performance and adjusts content difficulty and presentation in real-time.",
      results:
        "Improved student test scores by 32%, reduced course completion time by 28%, and increased student engagement by 47%.",
      link: "#",
    },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Applications" },
    { id: "mobile", label: "Mobile Apps" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className="min-h-screen py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 border border-cyan-500/30 rounded-full text-cyan-500 text-xs tracking-wider mb-4">
            OUR PORTFOLIO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Innovative Digital <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
              Products & Experiences
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Explore our latest projects showcasing our expertise in creating cutting-edge digital solutions across
            various industries.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-12"
        >
          <TabIndicator
            activeTab={activeCategory}
            tabs={[
              { id: "all", label: "All Projects" },
              { id: "web", label: "Web Applications" },
              { id: "mobile", label: "Mobile Apps" },
            ]}
            onChange={setActiveCategory}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs text-cyan-500 mb-2">
                          {project.category === "web" ? "WEB APPLICATION" : "MOBILE APP"}
                        </div>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                      </div>
                      <Button size="icon" variant="ghost" className="rounded-full bg-white/10 backdrop-blur-sm">
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Project preview - animated gradient background */}
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                      background: [
                        "linear-gradient(45deg, #0088ff22, #6600ff22)",
                        "linear-gradient(45deg, #6600ff22, #ff00aa22)",
                        "linear-gradient(45deg, #ff00aa22, #0088ff22)",
                      ],
                    }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white/20">{project.title.charAt(0)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-white/10 rounded-full px-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="bg-black/95 border-gray-800 text-white max-w-5xl max-h-[90vh] overflow-auto">
          {selectedProject && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900 flex items-center justify-center">
                {/* Project preview animation */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "linear-gradient(45deg, #0088ff33, #6600ff33)",
                      "linear-gradient(45deg, #6600ff33, #ff00aa33)",
                      "linear-gradient(45deg, #ff00aa33, #0088ff33)",
                    ],
                  }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                />
                <div className="relative z-10 text-5xl font-bold text-white/20">{selectedProject.title.charAt(0)}</div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-xs text-cyan-500 mb-2">
                    {selectedProject.category === "web" ? "WEB APPLICATION" : "MOBILE APP"}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-400">{selectedProject.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(100, 200, 255, 0.2)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-cyan-500 mb-1">THE CHALLENGE</h4>
                    <p className="text-gray-300 text-sm">{selectedProject.challenge}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-cyan-500 mb-1">OUR SOLUTION</h4>
                    <p className="text-gray-300 text-sm">{selectedProject.solution}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-cyan-500 mb-1">THE RESULTS</h4>
                    <p className="text-gray-300 text-sm">{selectedProject.results}</p>
                  </div>
                </div>

                {selectedProject.link && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-full px-6">
                      View Live Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
