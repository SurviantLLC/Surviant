"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Briefcase, Code, Users, Award } from "lucide-react"

export default function AboutSection() {
  const stats = [
    { icon: <Briefcase className="h-6 w-6" />, value: "50+", label: "Projects Completed" },
    { icon: <Code className="h-6 w-6" />, value: "5+", label: "Years Experience" },
    { icon: <Users className="h-6 w-6" />, value: "30+", label: "Happy Clients" },
    { icon: <Award className="h-6 w-6" />, value: "15+", label: "Industry Awards" },
  ]

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & Lead Developer",
      image: "/placeholder.svg?height=400&width=400&query=professional headshot of male tech founder with glasses",
      bio: "Full-stack developer with 10+ years of experience building scalable web applications.",
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      image: "/placeholder.svg?height=400&width=400&query=professional headshot of female designer with short hair",
      bio: "Award-winning designer focused on creating intuitive and beautiful user experiences.",
    },
    {
      name: "Marcus Williams",
      role: "Backend Developer",
      image: "/placeholder.svg?height=400&width=400&query=professional headshot of male developer with beard",
      bio: "Database expert specializing in high-performance systems and API development.",
    },
    {
      name: "Priya Patel",
      role: "Mobile Developer",
      image:
        "/placeholder.svg?height=400&width=400&query=professional headshot of female developer with long dark hair",
      bio: "Mobile specialist with expertise in React Native and native iOS/Android development.",
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
          About Surviant
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-300">
          We're a team of passionate developers, designers, and digital strategists dedicated to crafting exceptional
          web experiences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-6">Our Story</h3>
          <div className="space-y-4 text-gray-300">
            <p>
              Founded in 2018, Surviant Technologies began with a simple mission: to help businesses succeed in the
              digital world through exceptional web development and design.
            </p>
            <p>
              What started as a small freelance operation has grown into a full-service digital agency, working with
              clients ranging from ambitious startups to established enterprises.
            </p>
            <p>
              Our approach combines technical excellence with creative problem-solving. We don't just build websites and
              apps—we create digital experiences that drive business growth.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 gap-6"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-10 text-center">Meet Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                <p className="text-cyan-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
