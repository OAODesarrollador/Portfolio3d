import React, { useRef, useEffect, useState } from 'react'
import { Section } from './Seccion'
import './HorizontalScroll.css'


export const HorizontalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLastSection, setIsLastSection] = useState(false)
  const lastScrollTop = useRef(0)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    
    const handleScroll = () => {
      if (!element) return
      
      const isAtEnd = Math.abs(
        element.scrollWidth - element.scrollLeft - element.clientWidth
      ) < 10
      
      setIsLastSection(isAtEnd)
    }

    const handleWheel = (e: WheelEvent) => {
      if (!element) return

      const sectionWidth = window.innerWidth
      const currentScroll = element.scrollLeft
      const maxScroll = element.scrollWidth - element.clientWidth
      const scrollingUp = e.deltaY < 0

      // Si estamos en la sección horizontal
      if (element.contains(e.target as Node)) {
        // Lógica existente para scroll horizontal...
        if (currentScroll >= maxScroll - 10 && !scrollingUp) {
          return // Permitir scroll vertical hacia Contact
        }

        e.preventDefault()
        const targetScroll = Math.round(currentScroll / sectionWidth) * sectionWidth

        element.scrollTo({
          left: scrollingUp 
            ? Math.max(targetScroll - sectionWidth, 0)
            : Math.min(targetScroll + sectionWidth, maxScroll),
          behavior: 'smooth'
        })
      }
    }

    // Manejar scroll vertical
    const handleWindowScroll = () => {
      const scrollTop = window.scrollY
      const scrollingUp = scrollTop < lastScrollTop.current
      lastScrollTop.current = scrollTop

      if (scrollingUp && scrollTop === 0) {
        setIsLastSection(true)
      }
    }

    element.addEventListener('scroll', handleScroll)
    document.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleWindowScroll)
    
    return () => {
      element.removeEventListener('scroll', handleScroll)
      document.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleWindowScroll)
    }
  }, [])

  return (
    <div 
      className="scroll-container" 
      ref={containerRef}
      style={{
        overflowY: isLastSection ? 'visible' : 'hidden'
      }}
    >
      <div className="scroll-content">
        <Section title="Seccion 1" content="lorem ipsum" color="#4d5656" />
        <Section title="Seccion 2" content="Lorem ipsum" color="#4d5656" />
        <Section title="Seccion 3" content="Lorem ipsum" color="#4d5656" />
      </div>
    </div>
  )
}
