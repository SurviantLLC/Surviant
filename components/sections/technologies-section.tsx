"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export default function TechnologiesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const technologies = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS", "Three.js", "WebGL"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "Go", "Java", "GraphQL", "REST API", "WebSockets", "Microservices"],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase", "MySQL", "DynamoDB", "Elasticsearch"],
    },
    {
      category: "DevOps",
      items: ["Docker", "Kubernetes", "AWS", "Google Cloud", "Azure", "CI/CD", "Terraform", "Monitoring"],
    },
    {
      category: "Mobile",
      items: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "PWA", "App Store", "Google Play"],
    },
    {
      category: "AI & ML",
      items: [
        "Large Language Models",
        "GPT-4",
        "Stable Diffusion",
        "TensorFlow",
        "PyTorch",
        "Computer Vision",
        "NLP",
        "Vector Databases",
      ],
    },
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
            OUR TECH STACK
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Cutting-Edge <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
              Technologies
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We leverage the latest technologies to build scalable, high-performance digital solutions that drive
            business growth.
          </p>
        </motion.div>

        {/* Scrolling Technology Names */}
        <div className="mb-20 overflow-hidden">
          <div className="py-4 bg-gray-900/50 rounded-lg">
            <div className="flex flex-wrap justify-center gap-4 px-4">
              {[
                "React",
                "Next.js",
                "Vue",
                "Angular",
                "TypeScript",
                "Three.js",
                "WebGL",
                "GSAP",
                "Node.js",
                "Python",
              ].map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-800/70 rounded-full text-sm text-gray-300 hover:bg-gray-700/70 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/20 border border-gray-800 hover:border-gray-700 transition-all duration-300 p-8"
            >
              <div
                className={cn(
                  "absolute top-0 left-0 w-full h-1",
                  index % 6 === 0 && "bg-gradient-to-r from-cyan-500 to-blue-500",
                  index % 6 === 1 && "bg-gradient-to-r from-purple-500 to-indigo-500",
                  index % 6 === 2 && "bg-gradient-to-r from-pink-500 to-rose-500",
                  index % 6 === 3 && "bg-gradient-to-r from-green-500 to-emerald-500",
                  index % 6 === 4 && "bg-gradient-to-r from-amber-500 to-orange-500",
                  index % 6 === 5 && "bg-gradient-to-r from-red-500 to-rose-500",
                )}
              />

              <h3 className="text-xl font-bold mb-4">{tech.category}</h3>

              <div className="flex flex-wrap gap-2">
                {tech.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Development Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Our Development Process</h3>

          <div className="relative">
            {/* Process Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-cyan-500 to-purple-600 transform -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {[
                {
                  number: "01",
                  title: "Discovery & Strategy",
                  description: "We analyze your business needs and create a comprehensive digital strategy.",
                  color: "from-cyan-500 to-blue-500",
                },
                {
                  number: "02",
                  title: "Design & Prototyping",
                  description: "Our designers create intuitive interfaces and interactive prototypes.",
                  color: "from-blue-500 to-indigo-500",
                },
                {
                  number: "03",
                  title: "Development & Testing",
                  description: "We build your solution with clean code and rigorous testing.",
                  color: "from-indigo-500 to-purple-500",
                },
                {
                  number: "04",
                  title: "Deployment & Optimization",
                  description: "We launch your product and continuously optimize for performance.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  number: "05",
                  title: "Maintenance & Growth",
                  description: "We provide ongoing support and implement new features for growth.",
                  color: "from-pink-500 to-rose-500",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div className={`md:text-right ${index % 2 === 1 ? "md:col-start-2" : ""}`}>
                      <div
                        className={`inline-block py-1 px-3 rounded-full text-xs bg-gradient-to-r ${step.color} mb-2`}
                      >
                        {step.number}
                      </div>
                      <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                      <p className="text-gray-400">{step.description}</p>
                    </div>

                    {/* Circle on timeline */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hidden md:block" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
