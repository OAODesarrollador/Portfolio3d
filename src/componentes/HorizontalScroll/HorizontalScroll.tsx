import React, { useRef, useEffect } from 'react'
import { Section } from './Seccion'
//import './HorizontalScroll.css'

export const HorizontalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const sectionWidth = window.innerWidth
      const currentScroll = element.scrollLeft
      const targetScroll = Math.round(currentScroll / sectionWidth) * sectionWidth

      if (e.deltaY > 0) {
        element.scrollTo({
          left: targetScroll + sectionWidth,
          behavior: 'smooth'
        })
      } else {
        element.scrollTo({
          left: targetScroll - sectionWidth,
          behavior: 'smooth'
        })
      }
    }

    element.addEventListener('wheel', handleWheel, { passive: false })
    return () => element.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className="scroll-container" ref={containerRef}>
      <div className="scroll-content">
        <Section title="seccion 1"  color="#ff6b6b" />
        <Section title="Seccion 2"  color="#4ecdc4" />
        <Section title="Seccion 3"  color="#45b7d1" />
      </div>
    </div>
  )
}