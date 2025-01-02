import React from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  title: string
  color: string
}

export const Section: React.FC<SectionProps> = ({ title }) => {
  return (
    <motion.div
      className="section"
      style={{
        
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{title}</h2>
    </motion.div>
  )
}