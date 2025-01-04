import React from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  title: string
  content: string
  color: string
}

export const Section: React.FC<SectionProps> = ({ title, content, color }) => {
  return (
    <motion.div
      className="seccion"
      style={{
        backgroundColor: color,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.5 }}
      transition={{ duration: 0 }}
    >
      <h2>{title}</h2>
      <div>
        <p>{content}</p>
      </div>
    </motion.div>
  )
}