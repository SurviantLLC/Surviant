"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Layers, Database, Smartphone, Palette, Globe, Cpu, LineChart } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const services = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Frontend Development",
      description: "Crafting responsive, high-performance interfaces with React, Vue, and Next.js.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Backend Engineering",
      description: "Building robust APIs and server architectures with Node.js, Python, and Go.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "UI/UX Design",
      description: "Creating intuitive user experiences with Figma, Adobe XD, and prototyping tools.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications with React Native and Flutter.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI Integration",
      description: "Implementing machine learning and AI solutions to enhance digital products.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Data Visualization",
      description: "Transforming complex data into intuitive, interactive visual representations.",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Full-Stack Solutions",
      description: "End-to-end development from concept to deployment with comprehensive testing.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Digital Consulting",
      description: "Strategic guidance on architecture, performance optimization, and best practices.",
      color: "from-teal-500 to-cyan-500",
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
            OUR EXPERTISE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive Digital <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
              Development Services
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            From concept to deployment, we offer end-to-end development services tailored to your unique business needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/20 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10"
                style={
                  {
                    background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    "--tw-gradient-from": service.color.split(" ")[0].split("-")[1],
                    "--tw-gradient-to": service.color.split(" ")[2],
                  } as React.CSSProperties
                }
              />

              <div className="p-6">
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-gradient-to-br",
                    service.color,
                  )}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-500 transition-colors">{service.title}</h3>

                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>

              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 absolute bottom-0 left-0"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 p-8 rounded-xl border border-gray-800 backdrop-blur-sm bg-black/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-4">Our Development Process</h3>
              <p className="text-gray-400">
                We follow a structured approach to ensure your project is delivered on time and exceeds expectations.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="space-y-8">
                {[
                  {
                    number: "01",
                    title: "Discovery & Planning",
                    description: "We analyze your requirements and create a detailed roadmap.",
                  },
                  {
                    number: "02",
                    title: "Design & Prototyping",
                    description: "We design intuitive interfaces and create interactive prototypes.",
                  },
                  {
                    number: "03",
                    title: "Development & Testing",
                    description: "We build your solution with clean code and comprehensive testing.",
                  },
                  {
                    number: "04",
                    title: "Deployment & Support",
                    description: "We launch your product and provide ongoing maintenance.",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex">
                    <div className="mr-6">
                      <div className="text-sm font-bold text-cyan-500">{step.number}</div>
                      <div className="mt-2 h-full w-[1px] bg-gray-800 ml-2"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
