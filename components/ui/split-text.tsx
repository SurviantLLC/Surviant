"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface SplitTextProps {
  text: string
  className?: string
  wordClassName?: string
  charClassName?: string
  type?: "words" | "chars"
  once?: boolean
}

export default function SplitText({
  text,
  className = "",
  wordClassName = "",
  charClassName = "",
  type = "words",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  const renderWords = () => {
    return text.split(" ").map((word, i) => (
      <span key={`word-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
        <motion.span
          className={`inline-block ${wordClassName}`}
          variants={{
            hidden: { y: "100%" },
            visible: (i) => ({
              y: 0,
              transition: {
                delay: i * 0.05,
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
              },
            }),
          }}
          custom={i}
          initial="hidden"
          animate={controls}
        >
          {word}
        </motion.span>
      </span>
    ))
  }

  const renderChars = () => {
    return text.split(" ").map((word, wordIndex) => (
      <span key={`word-${wordIndex}`} className="inline-block mr-[0.25em]">
        {word.split("").map((char, charIndex) => (
          <span key={`char-${wordIndex}-${charIndex}`} className="inline-block overflow-hidden">
            <motion.span
              className={`inline-block ${charClassName}`}
              variants={{
                hidden: { y: "100%" },
                visible: (i) => ({
                  y: 0,
                  transition: {
                    delay: i * 0.03,
                    duration: 0.4,
                    ease: [0.33, 1, 0.68, 1],
                  },
                }),
              }}
              custom={wordIndex * word.length + charIndex}
              initial="hidden"
              animate={controls}
            >
              {char}
            </motion.span>
          </span>
        ))}
      </span>
    ))
  }

  return (
    <div ref={ref} className={className}>
      {type === "words" ? renderWords() : renderChars()}
    </div>
  )
}
