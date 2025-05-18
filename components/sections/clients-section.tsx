"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function ClientsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonials = [
    {
      quote: "Surviant transformed our digital presence with a cutting-edge platform that exceeded our expectations.",
      author: "Sarah Johnson",
      position: "CTO, TechCorp",
    },
    {
      quote:
        "The team's technical expertise and creative approach helped us achieve a 40% increase in user engagement.",
      author: "Michael Chen",
      position: "Product Director, InnovateLabs",
    },
    {
      quote: "Working with Surviant was a game-changer for our business. Their solutions are innovative and effective.",
      author: "Priya Patel",
      position: "CEO, FutureWave",
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
            OUR CLIENTS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by Industry <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
              Leading Companies
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We've partnered with forward-thinking companies across various industries to deliver exceptional digital
            experiences.
          </p>
        </motion.div>

        {/* Client Logos */}
        <div className="mb-20 overflow-hidden">
          <div className="flex flex-wrap justify-center gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-32 h-12 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-gray-400 text-sm">Client {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/20 border border-gray-800 hover:border-gray-700 transition-all duration-300 p-8"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-600" />

              <div className="mb-6 text-4xl text-cyan-500">"</div>

              <p className="text-lg mb-8 italic text-gray-300">{testimonial.quote}</p>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">{testimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.position}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 p-8 rounded-xl border border-gray-800 backdrop-blur-sm bg-black/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "98%", label: "CLIENT SATISFACTION" },
              { value: "150+", label: "PROJECTS DELIVERED" },
              { value: "40%", label: "AVG. PERFORMANCE BOOST" },
              { value: "8+", label: "YEARS OF EXCELLENCE" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
